# Notes

We need to refactor the Biology Quiz so that the data source is biology2-processed.json. This will necessitate an update to the quiz logic as well, so that four possible answers are presented, and distractors are sourced from sibling questions. The result will closely mirror the logic used in the AWS Quiz, so part of the refactor may be to generalize those components so that they can be shared with and implemented in both quizzes. 
