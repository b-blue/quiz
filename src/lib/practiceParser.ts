export interface PracticeOption {
  text: string;
  correct: boolean;
}

export interface PracticeQuestion {
  id: number;
  prompt: string;
  options: PracticeOption[];
  multi: boolean;
  requiredCount: number;
  explanation: string;
  domain: string;
}

const TAG = /^Correct (answer|selection)$/;
// Questions whose option count can't be inferred from the "(Select N)" hint.
const OPTION_COUNT_OVERRIDES: Record<string, number> = {
  'What does this AWS CloudFormation snippet do?': 7,
};

const SELECT_COUNT: Record<string, number> = { two: 2, three: 3, four: 4 };

function splitOptions(body: string, optionCount: number): { prompt: string; options: PracticeOption[] } {
  const paras = body.trim().split(/\n\s*\n/).map(p => p.trim());
  const first = paras.length - optionCount;
  if (first >= 1) {
    const optionParas = paras.slice(first);
    const tagged = optionParas.filter(p => TAG.test(p.split('\n')[0])).length;
    if (tagged > 0) {
      return {
        prompt: paras.slice(0, first).join('\n\n'),
        options: optionParas.map(toOption),
      };
    }
  }
  return splitCodeOptions(body);
}

function toOption(p: string): PracticeOption {
  const lines = p.split('\n');
  const correct = TAG.test(lines[0]);
  return { correct, text: (correct ? lines.slice(1) : lines).join('\n').trim() };
}

// Options that are code blocks (e.g. IAM policies) have no blank-line separators.
function splitCodeOptions(body: string): { prompt: string; options: PracticeOption[] } {
  const lines = body.trim().split('\n');
  let start = lines.findIndex((l, i) => i > 0 && (l === '{' || TAG.test(l)) && lines[i - 1].trim() === '');
  if (start < 0) start = lines.length;
  const prompt = lines.slice(0, start).join('\n').trim();
  const options: PracticeOption[] = [];
  let cur: string[] = [];
  let correct = false;
  const flush = () => {
    if (cur.length) options.push({ correct, text: cur.join('\n').trim() });
    cur = [];
    correct = false;
  };
  let prev = '';
  for (const l of lines.slice(start)) {
    if (TAG.test(l)) {
      flush();
      correct = true;
    } else if (l === '{' && prev === '}') {
      flush();
      cur.push(l);
    } else if (l.trim() !== '' || cur.length) {
      cur.push(l);
    }
    prev = l;
  }
  flush();
  return { prompt, options };
}

export function parseTest(raw: string): PracticeQuestion[] {
  const text = raw.replace(/\r/g, '');
  const blocks = text.split(/\n(?=Question \d+\n[A-Za-z]+\n)/).slice(1);
  return blocks.map((block, idx) => {
    const explIdx = block.indexOf('\nOverall explanation');
    const head = block.slice(0, explIdx);
    const tail = block.slice(explIdx + '\nOverall explanation'.length);
    const domainIdx = tail.lastIndexOf('\nDomain\n');
    const explanation = (domainIdx >= 0 ? tail.slice(0, domainIdx) : tail)
      .split('\n')
      .filter(l => !/^\s*via - /.test(l))
      .join('\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
    const domain = domainIdx >= 0 ? tail.slice(domainIdx + '\nDomain\n'.length).split('\n')[0].trim() : '';

    const body = head.split('\n').slice(2).join('\n');
    const m = body.match(/Select (two|three|four)/i);
    const requiredCount = m ? SELECT_COUNT[m[1].toLowerCase()] : 1;
    const { prompt, options } = splitOptions(
      body,
      OPTION_COUNT_OVERRIDES[body.trim().split('\n')[0].replace(/\s*\(Select.*$/, '')] ?? (m ? requiredCount + 3 : 4),
    );
    return {
      id: idx + 1,
      prompt,
      options,
      multi: requiredCount > 1,
      requiredCount: options.filter(o => o.correct).length || requiredCount,
      explanation,
      domain,
    };
  });
}
