import{r as $,u as Ra,o as Rt,a as Hr,b as yn,d as jr,j as Q,g as Ur,c as Kr,e as Qr,f as _r,h as Zr,i as $r,k as Xr,s as La,l as Lt,F as Jr,m as Ft,n as Xn,p as Yr,q as Fa,t as ei,v as ni,w as Ba,x as Oa,A as ti,P as Bt,y as ai,T as ri,z as Ot,B as Nt,I as ii}from"./index-Di3YuXvY.js";function dn(e){return parseInt(e,10)||0}const oi={shadow:{visibility:"hidden",position:"absolute",overflow:"hidden",height:0,top:0,left:0,transform:"translateZ(0)"}};function si(e){for(const n in e)return!1;return!0}function qt(e){return si(e)||e.outerHeightStyle===0&&!e.overflowing}const li=$.forwardRef(function(n,t){const{onChange:a,maxRows:r,minRows:o=1,style:i,value:s,...c}=n,{current:l}=$.useRef(s!=null),d=$.useRef(null),u=Ra(t,d),h=$.useRef(null),p=$.useRef(null),f=$.useCallback(()=>{const k=d.current,W=p.current;if(!k||!W)return;const A=Rt(k).getComputedStyle(k);if(A.width==="0px")return{outerHeightStyle:0,overflowing:!1};W.style.width=A.width,W.value=k.value||n.placeholder||"x",W.value.slice(-1)===`
`&&(W.value+=" ");const T=A.boxSizing,O=dn(A.paddingBottom)+dn(A.paddingTop),U=dn(A.borderBottomWidth)+dn(A.borderTopWidth),b=W.scrollHeight;W.value="x";const D=W.scrollHeight;let z=b;o&&(z=Math.max(Number(o)*D,z)),r&&(z=Math.min(Number(r)*D,z)),z=Math.max(z,D);const G=z+(T==="border-box"?O+U:0),M=Math.abs(z-b)<=1;return{outerHeightStyle:G,overflowing:M}},[r,o,n.placeholder]),S=Hr(()=>{const k=d.current,W=f();if(!k||!W||qt(W))return!1;const E=W.outerHeightStyle;return h.current!=null&&h.current!==E}),w=$.useCallback(()=>{const k=d.current,W=f();if(!k||!W||qt(W))return;const E=W.outerHeightStyle;h.current!==E&&(h.current=E,k.style.height=`${E}px`),k.style.overflow=W.overflowing?"hidden":""},[f]),y=$.useRef(-1);yn(()=>{const k=jr(w),W=d?.current;if(!W)return;const E=Rt(W);E.addEventListener("resize",k);let A;return typeof ResizeObserver<"u"&&(A=new ResizeObserver(()=>{S()&&(A.unobserve(W),cancelAnimationFrame(y.current),w(),y.current=requestAnimationFrame(()=>{A.observe(W)}))}),A.observe(W)),()=>{k.clear(),cancelAnimationFrame(y.current),E.removeEventListener("resize",k),A&&A.disconnect()}},[f,w,S]),yn(()=>{w()});const P=k=>{l||w();const W=k.target,E=W.value.length,A=W.value.endsWith(`
`),T=W.selectionStart===E;A&&T&&W.setSelectionRange(E,E),a&&a(k)};return Q.jsxs($.Fragment,{children:[Q.jsx("textarea",{value:s,onChange:P,ref:u,rows:o,style:i,...c}),Q.jsx("textarea",{"aria-hidden":!0,className:n.className,readOnly:!0,ref:p,tabIndex:-1,style:{...oi.shadow,...i,paddingTop:0,paddingBottom:0}})]})});function Gt(e){return e!=null&&!(Array.isArray(e)&&e.length===0)}function ci(e,n=!1){return e&&(Gt(e.value)&&e.value!==""||n&&Gt(e.defaultValue)&&e.defaultValue!=="")}function ui(e){return Kr("MuiInputBase",e)}const Jn=Ur("MuiInputBase",["root","formControl","focused","disabled","adornedStart","adornedEnd","error","sizeSmall","multiline","colorSecondary","fullWidth","hiddenLabel","readOnly","input","inputTypeSearch"]);var Vt;const Yn="mui-auto-fill",Sn="mui-auto-fill-cancel",di=(e,n)=>{const{ownerState:t}=e;return[n.root,t.formControl&&n.formControl,t.startAdornment&&n.adornedStart,t.endAdornment&&n.adornedEnd,t.error&&n.error,t.size==="small"&&n.sizeSmall,t.multiline&&n.multiline,t.color&&n[`color${Xn(t.color)}`],t.fullWidth&&n.fullWidth,t.hiddenLabel&&n.hiddenLabel]},pi=(e,n)=>{const{ownerState:t}=e;return[n.input,t.type==="search"&&n.inputTypeSearch]},hi=e=>{const{classes:n,color:t,disabled:a,error:r,endAdornment:o,focused:i,formControl:s,fullWidth:c,hiddenLabel:l,multiline:d,readOnly:u,size:h,startAdornment:p,type:f}=e,S={root:["root",`color${Xn(t)}`,a&&"disabled",r&&"error",c&&"fullWidth",i&&"focused",s&&"formControl",h&&h!=="medium"&&`size${Xn(h)}`,d&&"multiline",p&&"adornedStart",o&&"adornedEnd",l&&"hiddenLabel",u&&"readOnly"],input:["input",a&&"disabled",f==="search"&&"inputTypeSearch",u&&"readOnly"]};return Yr(S,ui,n)},mi=La("div",{name:"MuiInputBase",slot:"Root",overridesResolver:di})(Fa(({theme:e})=>({...e.typography.body1,color:(e.vars||e).palette.text.primary,lineHeight:"1.4375em",boxSizing:"border-box",position:"relative",cursor:"text",display:"inline-flex",alignItems:"center",[`&.${Jn.disabled}`]:{color:(e.vars||e).palette.text.disabled,cursor:"default"},variants:[{props:({ownerState:n})=>n.multiline,style:{padding:"4px 0 5px"}},{props:({ownerState:n,size:t})=>n.multiline&&t==="small",style:{paddingTop:1}},{props:({ownerState:n})=>n.fullWidth,style:{width:"100%"}}]}))),gi=La("input",{name:"MuiInputBase",slot:"Input",overridesResolver:pi})(Fa(({theme:e})=>{const n=e.palette.mode==="light",t={color:"currentColor",...e.vars?{opacity:e.vars.opacity.inputPlaceholder}:{opacity:n?.42:.5},...ei(e,"opacity",{duration:e.transitions.duration.shorter})},a={opacity:"0 !important"},r=e.vars?{opacity:e.vars.opacity.inputPlaceholder}:{opacity:n?.42:.5};return{font:"inherit",letterSpacing:"inherit",color:"currentColor",padding:"4px 0 5px",border:0,boxSizing:"content-box",background:"none",height:"1.4375em",margin:0,WebkitTapHighlightColor:"transparent",display:"block",minWidth:0,width:"100%","&::-webkit-input-placeholder":t,"&::-moz-placeholder":t,"&::-ms-input-placeholder":t,"&:focus":{outline:0},"&:invalid":{boxShadow:"none"},"&::-webkit-search-decoration":{WebkitAppearance:"none"},[`label[data-shrink=false] + .${Jn.formControl} &`]:{"&::-webkit-input-placeholder":a,"&::-moz-placeholder":a,"&::-ms-input-placeholder":a,"&:focus::-webkit-input-placeholder":r,"&:focus::-moz-placeholder":r,"&:focus::-ms-input-placeholder":r},[`&.${Jn.disabled}`]:{opacity:1,WebkitTextFillColor:(e.vars||e).palette.text.disabled},variants:[{props:({ownerState:o})=>!o.disableInjectingGlobalStyles,style:{animationName:Sn,animationDuration:"10ms","&:-webkit-autofill":{animationDuration:"5000s",animationName:Yn}}},{props:{size:"small"},style:{paddingTop:1}},{props:({ownerState:o})=>o.multiline,style:{height:"auto",resize:"none",padding:0,paddingTop:0}},{props:{type:"search"},style:{MozAppearance:"textfield"}}]}})),Ht=Xr({[`@keyframes ${Yn}`]:{from:{animationName:Yn}},[`@keyframes ${Sn}`]:{from:{animationName:Sn}}}),fi=$.forwardRef(function(n,t){const a=Qr({props:n,name:"MuiInputBase"}),{"aria-describedby":r,"aria-label":o,autoComplete:i,autoFocus:s,className:c,color:l,defaultValue:d,disabled:u,disableInjectingGlobalStyles:h,endAdornment:p,error:f,fullWidth:S=!1,id:w,inputComponent:y="input",inputProps:P,inputRef:k,margin:W,maxRows:E,minRows:A,multiline:T=!1,name:O,onBlur:U,onChange:b,onClick:D,onFocus:z,onKeyDown:G,onKeyUp:M,placeholder:I,readOnly:V,renderSuffix:J,rows:ne,size:be,slotProps:m={},slots:oe={},startAdornment:re,type:g="text",value:ue,...Pe}=a,K={...P,...m.input},ve=K.value!=null?K.value:ue,{current:me}=$.useRef(ve!=null),se=$.useRef(),De=$.useCallback(N=>{},[]),Ue=Ra(se,k,K.ref,De),[Fe,Be]=$.useState(!1),[de,X]=_r({props:a,states:["color","disabled","error","hiddenLabel","size","required","filled"]});de.focused=X?X.focused:Fe,$.useEffect(()=>{!X&&u&&Fe&&(Be(!1),U&&U())},[X,u,Fe,U]);const Oe=X&&X.onFilled,Ne=X&&X.onEmpty,We=$.useCallback(N=>{ci(N)?Oe&&Oe():Ne&&Ne()},[Oe,Ne]);yn(()=>{me&&We({value:ve})},[ve,We,me]),yn(()=>{if(!s)return;const N=se.current;if(!N)return;const H=Zr(N),Y=$r(H),ge=Y==null||Y===H.body||Y===H.documentElement;N===Y?X&&X.onFocus?X.onFocus():Be(!0):ge&&N.focus()},[s]);const En=N=>{z&&z(N),K.onFocus&&K.onFocus(N),X&&X.onFocus?X.onFocus(N):Be(!0)},cn=N=>{U&&U(N),K.onBlur&&K.onBlur(N),X&&X.onBlur?X.onBlur(N):Be(!1)},un=(N,...H)=>{if(!me){const Y=N.target||se.current;if(Y==null)throw new Error(ni(1));We({value:Y.value})}K.onChange&&K.onChange(N,...H),b&&b(N,...H)};$.useEffect(()=>{We(se.current)},[]);const zn=N=>{se.current&&N.currentTarget===N.target&&se.current.focus(),D&&D(N)};let Ke=y,ke=K;T&&Ke==="input"&&(ne?ke={type:void 0,minRows:ne,maxRows:ne,...ke}:ke={type:void 0,maxRows:E,minRows:A,...ke},Ke=li);const Tn=N=>{We(N.animationName===Sn?se.current:{value:"x"})};$.useEffect(()=>{X&&X.setAdornedStart(!!re)},[X,re]);const Qe={...a,color:de.color||"primary",disabled:de.disabled,endAdornment:p,error:de.error,focused:de.focused,formControl:X,fullWidth:S,hiddenLabel:de.hiddenLabel,multiline:T,size:de.size,startAdornment:re,type:g},v=hi(Qe),x=oe.root||mi,L=m.root||{},B=oe.input||gi;return Q.jsxs($.Fragment,{children:[!h&&typeof Ht=="function"&&(Vt||(Vt=Q.jsx(Ht,{}))),Q.jsxs(x,{...L,ref:t,onClick:zn,...Pe,...!Ft(x)&&{ownerState:{...Qe,...L.ownerState}},className:Lt(v.root,L.className,c,V&&"MuiInputBase-readOnly"),children:[re,Q.jsx(Jr.Provider,{value:null,children:Q.jsx(B,{"aria-invalid":de.error,"aria-describedby":r,"aria-label":o,autoComplete:i,autoFocus:s,defaultValue:d,disabled:de.disabled,id:w,onAnimationStart:Tn,name:O,placeholder:I,readOnly:V,required:de.required,rows:ne,value:ve,onKeyDown:G,onKeyUp:M,type:g,...ke,...!Ft(B)&&{as:Ke,ownerState:{...Qe,...ke.ownerState}},ref:Ue,className:Lt(v.input,ke.className,V&&"MuiInputBase-readOnly"),onBlur:cn,onChange:un,onFocus:En})}),p,J?J({...de,startAdornment:re}):null]})]})});function yi(e,n){const t={};return(e[e.length-1]===""?[...e,""]:e).join((t.padRight?" ":"")+","+(t.padLeft===!1?"":" ")).trim()}const Si=/^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,bi=/^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,vi={};function jt(e,n){return(vi.jsx?bi:Si).test(e)}const Ai=/[ \t\n\f\r]/g;function wi(e){return typeof e=="object"?e.type==="text"?Ut(e.value):!1:Ut(e)}function Ut(e){return e.replace(Ai,"")===""}class on{constructor(n,t,a){this.normal=t,this.property=n,a&&(this.space=a)}}on.prototype.normal={};on.prototype.property={};on.prototype.space=void 0;function Na(e,n){const t={},a={};for(const r of e)Object.assign(t,r.property),Object.assign(a,r.normal);return new on(t,a,n)}function et(e){return e.toLowerCase()}class ce{constructor(n,t){this.attribute=t,this.property=n}}ce.prototype.attribute="";ce.prototype.booleanish=!1;ce.prototype.boolean=!1;ce.prototype.commaOrSpaceSeparated=!1;ce.prototype.commaSeparated=!1;ce.prototype.defined=!1;ce.prototype.mustUseProperty=!1;ce.prototype.number=!1;ce.prototype.overloadedBoolean=!1;ce.prototype.property="";ce.prototype.spaceSeparated=!1;ce.prototype.space=void 0;let ki=0;const F=Le(),ee=Le(),nt=Le(),C=Le(),_=Le(),Me=Le(),he=Le();function Le(){return 2**++ki}const tt=Object.freeze(Object.defineProperty({__proto__:null,boolean:F,booleanish:ee,commaOrSpaceSeparated:he,commaSeparated:Me,number:C,overloadedBoolean:nt,spaceSeparated:_},Symbol.toStringTag,{value:"Module"})),Rn=Object.keys(tt);class pt extends ce{constructor(n,t,a,r){let o=-1;if(super(n,t),Kt(this,"space",r),typeof a=="number")for(;++o<Rn.length;){const i=Rn[o];Kt(this,Rn[o],(a&tt[i])===tt[i])}}}pt.prototype.defined=!0;function Kt(e,n,t){t&&(e[n]=t)}function He(e){const n={},t={};for(const[a,r]of Object.entries(e.properties)){const o=new pt(a,e.transform(e.attributes||{},a),r,e.space);e.mustUseProperty&&e.mustUseProperty.includes(a)&&(o.mustUseProperty=!0),n[a]=o,t[et(a)]=a,t[et(o.attribute)]=a}return new on(n,t,e.space)}const qa=He({properties:{ariaActiveDescendant:null,ariaAtomic:ee,ariaAutoComplete:null,ariaBusy:ee,ariaChecked:ee,ariaColCount:C,ariaColIndex:C,ariaColSpan:C,ariaControls:_,ariaCurrent:null,ariaDescribedBy:_,ariaDetails:null,ariaDisabled:ee,ariaDropEffect:_,ariaErrorMessage:null,ariaExpanded:ee,ariaFlowTo:_,ariaGrabbed:ee,ariaHasPopup:null,ariaHidden:ee,ariaInvalid:null,ariaKeyShortcuts:null,ariaLabel:null,ariaLabelledBy:_,ariaLevel:C,ariaLive:null,ariaModal:ee,ariaMultiLine:ee,ariaMultiSelectable:ee,ariaOrientation:null,ariaOwns:_,ariaPlaceholder:null,ariaPosInSet:C,ariaPressed:ee,ariaReadOnly:ee,ariaRelevant:null,ariaRequired:ee,ariaRoleDescription:_,ariaRowCount:C,ariaRowIndex:C,ariaRowSpan:C,ariaSelected:ee,ariaSetSize:C,ariaSort:null,ariaValueMax:C,ariaValueMin:C,ariaValueNow:C,ariaValueText:null,role:null},transform(e,n){return n==="role"?n:"aria-"+n.slice(4).toLowerCase()}});function Ga(e,n){return n in e?e[n]:n}function Va(e,n){return Ga(e,n.toLowerCase())}const Ci=He({attributes:{acceptcharset:"accept-charset",classname:"class",htmlfor:"for",httpequiv:"http-equiv"},mustUseProperty:["checked","multiple","muted","selected"],properties:{abbr:null,accept:Me,acceptCharset:_,accessKey:_,action:null,allow:null,allowFullScreen:F,allowPaymentRequest:F,allowUserMedia:F,alpha:F,alt:null,as:null,async:F,autoCapitalize:null,autoComplete:_,autoFocus:F,autoPlay:F,blocking:_,capture:null,charSet:null,checked:F,cite:null,className:_,closedBy:null,colorSpace:null,cols:C,colSpan:C,command:null,commandFor:null,content:null,contentEditable:ee,controls:F,controlsList:_,coords:C|Me,crossOrigin:null,data:null,dateTime:null,decoding:null,default:F,defer:F,dir:null,dirName:null,disabled:F,download:nt,draggable:ee,encType:null,enterKeyHint:null,fetchPriority:null,form:null,formAction:null,formEncType:null,formMethod:null,formNoValidate:F,formTarget:null,headers:_,height:C,hidden:nt,high:C,href:null,hrefLang:null,htmlFor:_,httpEquiv:_,id:null,imageSizes:null,imageSrcSet:null,inert:F,inputMode:null,integrity:null,is:null,isMap:F,itemId:null,itemProp:_,itemRef:_,itemScope:F,itemType:_,kind:null,label:null,lang:null,language:null,list:null,loading:null,loop:F,low:C,manifest:null,max:null,maxLength:C,media:null,method:null,min:null,minLength:C,multiple:F,muted:F,name:null,nonce:null,noModule:F,noValidate:F,onAbort:null,onAfterPrint:null,onAuxClick:null,onBeforeMatch:null,onBeforePrint:null,onBeforeToggle:null,onBeforeUnload:null,onBlur:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onContextLost:null,onContextMenu:null,onContextRestored:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnded:null,onError:null,onFocus:null,onFormData:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLanguageChange:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadEnd:null,onLoadStart:null,onMessage:null,onMessageError:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRejectionHandled:null,onReset:null,onResize:null,onScroll:null,onScrollEnd:null,onSecurityPolicyViolation:null,onSeeked:null,onSeeking:null,onSelect:null,onSlotChange:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnhandledRejection:null,onUnload:null,onVolumeChange:null,onWaiting:null,onWheel:null,open:F,optimum:C,pattern:null,ping:_,placeholder:null,playsInline:F,popover:null,popoverTarget:null,popoverTargetAction:null,poster:null,preload:null,readOnly:F,referrerPolicy:null,rel:_,required:F,reversed:F,rows:C,rowSpan:C,sandbox:_,scope:null,scoped:F,seamless:F,selected:F,shadowRootClonable:F,shadowRootCustomElementRegistry:F,shadowRootDelegatesFocus:F,shadowRootMode:null,shadowRootSerializable:F,shape:null,size:C,sizes:null,slot:null,span:C,spellCheck:ee,src:null,srcDoc:null,srcLang:null,srcSet:null,start:C,step:null,style:null,tabIndex:C,target:null,title:null,translate:null,type:null,typeMustMatch:F,useMap:null,value:ee,width:C,wrap:null,writingSuggestions:null,align:null,aLink:null,archive:_,axis:null,background:null,bgColor:null,border:C,borderColor:null,bottomMargin:C,cellPadding:null,cellSpacing:null,char:null,charOff:null,classId:null,clear:null,code:null,codeBase:null,codeType:null,color:null,compact:F,declare:F,event:null,face:null,frame:null,frameBorder:null,hSpace:C,leftMargin:C,link:null,longDesc:null,lowSrc:null,marginHeight:C,marginWidth:C,noResize:F,noHref:F,noShade:F,noWrap:F,object:null,profile:null,prompt:null,rev:null,rightMargin:C,rules:null,scheme:null,scrolling:ee,standby:null,summary:null,text:null,topMargin:C,valueType:null,version:null,vAlign:null,vLink:null,vSpace:C,allowTransparency:null,autoCorrect:null,autoSave:null,credentialless:F,disablePictureInPicture:F,disableRemotePlayback:F,exportParts:Me,part:_,prefix:null,property:null,results:C,security:null,unselectable:null},space:"html",transform:Va}),xi=He({attributes:{accentHeight:"accent-height",alignmentBaseline:"alignment-baseline",arabicForm:"arabic-form",baselineShift:"baseline-shift",capHeight:"cap-height",className:"class",clipPath:"clip-path",clipRule:"clip-rule",colorInterpolation:"color-interpolation",colorInterpolationFilters:"color-interpolation-filters",colorProfile:"color-profile",colorRendering:"color-rendering",crossOrigin:"crossorigin",dataType:"datatype",dominantBaseline:"dominant-baseline",enableBackground:"enable-background",fillOpacity:"fill-opacity",fillRule:"fill-rule",floodColor:"flood-color",floodOpacity:"flood-opacity",fontFamily:"font-family",fontSize:"font-size",fontSizeAdjust:"font-size-adjust",fontStretch:"font-stretch",fontStyle:"font-style",fontVariant:"font-variant",fontWeight:"font-weight",glyphName:"glyph-name",glyphOrientationHorizontal:"glyph-orientation-horizontal",glyphOrientationVertical:"glyph-orientation-vertical",hrefLang:"hreflang",horizAdvX:"horiz-adv-x",horizOriginX:"horiz-origin-x",horizOriginY:"horiz-origin-y",imageRendering:"image-rendering",letterSpacing:"letter-spacing",lightingColor:"lighting-color",markerEnd:"marker-end",markerMid:"marker-mid",markerStart:"marker-start",maskType:"mask-type",navDown:"nav-down",navDownLeft:"nav-down-left",navDownRight:"nav-down-right",navLeft:"nav-left",navNext:"nav-next",navPrev:"nav-prev",navRight:"nav-right",navUp:"nav-up",navUpLeft:"nav-up-left",navUpRight:"nav-up-right",onAbort:"onabort",onActivate:"onactivate",onAfterPrint:"onafterprint",onBeforePrint:"onbeforeprint",onBegin:"onbegin",onCancel:"oncancel",onCanPlay:"oncanplay",onCanPlayThrough:"oncanplaythrough",onChange:"onchange",onClick:"onclick",onClose:"onclose",onCopy:"oncopy",onCueChange:"oncuechange",onCut:"oncut",onDblClick:"ondblclick",onDrag:"ondrag",onDragEnd:"ondragend",onDragEnter:"ondragenter",onDragExit:"ondragexit",onDragLeave:"ondragleave",onDragOver:"ondragover",onDragStart:"ondragstart",onDrop:"ondrop",onDurationChange:"ondurationchange",onEmptied:"onemptied",onEnd:"onend",onEnded:"onended",onError:"onerror",onFocus:"onfocus",onFocusIn:"onfocusin",onFocusOut:"onfocusout",onHashChange:"onhashchange",onInput:"oninput",onInvalid:"oninvalid",onKeyDown:"onkeydown",onKeyPress:"onkeypress",onKeyUp:"onkeyup",onLoad:"onload",onLoadedData:"onloadeddata",onLoadedMetadata:"onloadedmetadata",onLoadStart:"onloadstart",onMessage:"onmessage",onMouseDown:"onmousedown",onMouseEnter:"onmouseenter",onMouseLeave:"onmouseleave",onMouseMove:"onmousemove",onMouseOut:"onmouseout",onMouseOver:"onmouseover",onMouseUp:"onmouseup",onMouseWheel:"onmousewheel",onOffline:"onoffline",onOnline:"ononline",onPageHide:"onpagehide",onPageShow:"onpageshow",onPaste:"onpaste",onPause:"onpause",onPlay:"onplay",onPlaying:"onplaying",onPopState:"onpopstate",onProgress:"onprogress",onRateChange:"onratechange",onRepeat:"onrepeat",onReset:"onreset",onResize:"onresize",onScroll:"onscroll",onSeeked:"onseeked",onSeeking:"onseeking",onSelect:"onselect",onShow:"onshow",onStalled:"onstalled",onStorage:"onstorage",onSubmit:"onsubmit",onSuspend:"onsuspend",onTimeUpdate:"ontimeupdate",onToggle:"ontoggle",onUnload:"onunload",onVolumeChange:"onvolumechange",onWaiting:"onwaiting",onZoom:"onzoom",overlinePosition:"overline-position",overlineThickness:"overline-thickness",paintOrder:"paint-order",panose1:"panose-1",pointerEvents:"pointer-events",referrerPolicy:"referrerpolicy",renderingIntent:"rendering-intent",shapeRendering:"shape-rendering",stopColor:"stop-color",stopOpacity:"stop-opacity",strikethroughPosition:"strikethrough-position",strikethroughThickness:"strikethrough-thickness",strokeDashArray:"stroke-dasharray",strokeDashOffset:"stroke-dashoffset",strokeLineCap:"stroke-linecap",strokeLineJoin:"stroke-linejoin",strokeMiterLimit:"stroke-miterlimit",strokeOpacity:"stroke-opacity",strokeWidth:"stroke-width",tabIndex:"tabindex",textAnchor:"text-anchor",textDecoration:"text-decoration",textRendering:"text-rendering",transformOrigin:"transform-origin",typeOf:"typeof",underlinePosition:"underline-position",underlineThickness:"underline-thickness",unicodeBidi:"unicode-bidi",unicodeRange:"unicode-range",unitsPerEm:"units-per-em",vAlphabetic:"v-alphabetic",vHanging:"v-hanging",vIdeographic:"v-ideographic",vMathematical:"v-mathematical",vectorEffect:"vector-effect",vertAdvY:"vert-adv-y",vertOriginX:"vert-origin-x",vertOriginY:"vert-origin-y",wordSpacing:"word-spacing",writingMode:"writing-mode",xHeight:"x-height",playbackOrder:"playbackorder",timelineBegin:"timelinebegin"},properties:{about:he,accentHeight:C,accumulate:null,additive:null,alignmentBaseline:null,alphabetic:C,amplitude:C,arabicForm:null,ascent:C,attributeName:null,attributeType:null,azimuth:C,bandwidth:null,baselineShift:null,baseFrequency:null,baseProfile:null,bbox:null,begin:null,bias:C,by:null,calcMode:null,capHeight:C,className:_,clip:null,clipPath:null,clipPathUnits:null,clipRule:null,color:null,colorInterpolation:null,colorInterpolationFilters:null,colorProfile:null,colorRendering:null,content:null,contentScriptType:null,contentStyleType:null,crossOrigin:null,cursor:null,cx:null,cy:null,d:null,dataType:null,defaultAction:null,descent:C,diffuseConstant:C,direction:null,display:null,dur:null,divisor:C,dominantBaseline:null,download:F,dx:null,dy:null,edgeMode:null,editable:null,elevation:C,enableBackground:null,end:null,event:null,exponent:C,externalResourcesRequired:null,fill:null,fillOpacity:C,fillRule:null,filter:null,filterRes:null,filterUnits:null,floodColor:null,floodOpacity:null,focusable:null,focusHighlight:null,fontFamily:null,fontSize:null,fontSizeAdjust:null,fontStretch:null,fontStyle:null,fontVariant:null,fontWeight:null,format:null,fr:null,from:null,fx:null,fy:null,g1:Me,g2:Me,glyphName:Me,glyphOrientationHorizontal:null,glyphOrientationVertical:null,glyphRef:null,gradientTransform:null,gradientUnits:null,handler:null,hanging:C,hatchContentUnits:null,hatchUnits:null,height:null,href:null,hrefLang:null,horizAdvX:C,horizOriginX:C,horizOriginY:C,id:null,ideographic:C,imageRendering:null,initialVisibility:null,in:null,in2:null,intercept:C,k:C,k1:C,k2:C,k3:C,k4:C,kernelMatrix:he,kernelUnitLength:null,keyPoints:null,keySplines:null,keyTimes:null,kerning:null,lang:null,lengthAdjust:null,letterSpacing:null,lightingColor:null,limitingConeAngle:C,local:null,markerEnd:null,markerMid:null,markerStart:null,markerHeight:null,markerUnits:null,markerWidth:null,mask:null,maskContentUnits:null,maskType:null,maskUnits:null,mathematical:null,max:null,media:null,mediaCharacterEncoding:null,mediaContentEncodings:null,mediaSize:C,mediaTime:null,method:null,min:null,mode:null,name:null,navDown:null,navDownLeft:null,navDownRight:null,navLeft:null,navNext:null,navPrev:null,navRight:null,navUp:null,navUpLeft:null,navUpRight:null,numOctaves:null,observer:null,offset:null,onAbort:null,onActivate:null,onAfterPrint:null,onBeforePrint:null,onBegin:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnd:null,onEnded:null,onError:null,onFocus:null,onFocusIn:null,onFocusOut:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadStart:null,onMessage:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onMouseWheel:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRepeat:null,onReset:null,onResize:null,onScroll:null,onSeeked:null,onSeeking:null,onSelect:null,onShow:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnload:null,onVolumeChange:null,onWaiting:null,onZoom:null,opacity:null,operator:null,order:null,orient:null,orientation:null,origin:null,overflow:null,overlay:null,overlinePosition:C,overlineThickness:C,paintOrder:null,panose1:null,path:null,pathLength:C,patternContentUnits:null,patternTransform:null,patternUnits:null,phase:null,ping:_,pitch:null,playbackOrder:null,pointerEvents:null,points:null,pointsAtX:C,pointsAtY:C,pointsAtZ:C,preserveAlpha:null,preserveAspectRatio:null,primitiveUnits:null,propagate:null,property:he,r:null,radius:null,referrerPolicy:null,refX:null,refY:null,rel:he,rev:he,renderingIntent:null,repeatCount:null,repeatDur:null,requiredExtensions:he,requiredFeatures:he,requiredFonts:he,requiredFormats:he,resource:null,restart:null,result:null,rotate:null,rx:null,ry:null,scale:null,seed:null,shapeRendering:null,side:null,slope:null,snapshotTime:null,specularConstant:C,specularExponent:C,spreadMethod:null,spacing:null,startOffset:null,stdDeviation:null,stemh:null,stemv:null,stitchTiles:null,stopColor:null,stopOpacity:null,strikethroughPosition:C,strikethroughThickness:C,string:null,stroke:null,strokeDashArray:he,strokeDashOffset:null,strokeLineCap:null,strokeLineJoin:null,strokeMiterLimit:C,strokeOpacity:C,strokeWidth:null,style:null,surfaceScale:C,syncBehavior:null,syncBehaviorDefault:null,syncMaster:null,syncTolerance:null,syncToleranceDefault:null,systemLanguage:he,tabIndex:C,tableValues:null,target:null,targetX:C,targetY:C,textAnchor:null,textDecoration:null,textRendering:null,textLength:null,timelineBegin:null,title:null,transformBehavior:null,type:null,typeOf:he,to:null,transform:null,transformOrigin:null,u1:null,u2:null,underlinePosition:C,underlineThickness:C,unicode:null,unicodeBidi:null,unicodeRange:null,unitsPerEm:C,values:null,vAlphabetic:C,vMathematical:C,vectorEffect:null,vHanging:C,vIdeographic:C,version:null,vertAdvY:C,vertOriginX:C,vertOriginY:C,viewBox:null,viewTarget:null,visibility:null,width:null,widths:null,wordSpacing:null,writingMode:null,x:null,x1:null,x2:null,xChannelSelector:null,xHeight:C,y:null,y1:null,y2:null,yChannelSelector:null,z:null,zoomAndPan:null},space:"svg",transform:Ga}),Ha=He({properties:{xLinkActuate:null,xLinkArcRole:null,xLinkHref:null,xLinkRole:null,xLinkShow:null,xLinkTitle:null,xLinkType:null},space:"xlink",transform(e,n){return"xlink:"+n.slice(5).toLowerCase()}}),ja=He({attributes:{xmlnsxlink:"xmlns:xlink"},properties:{xmlnsXLink:null,xmlns:null},space:"xmlns",transform:Va}),Ua=He({properties:{xmlBase:null,xmlLang:null,xmlSpace:null},space:"xml",transform(e,n){return"xml:"+n.slice(3).toLowerCase()}}),Pi={classId:"classID",dataType:"datatype",itemId:"itemID",strokeDashArray:"strokeDasharray",strokeDashOffset:"strokeDashoffset",strokeLineCap:"strokeLinecap",strokeLineJoin:"strokeLinejoin",strokeMiterLimit:"strokeMiterlimit",typeOf:"typeof",xLinkActuate:"xlinkActuate",xLinkArcRole:"xlinkArcrole",xLinkHref:"xlinkHref",xLinkRole:"xlinkRole",xLinkShow:"xlinkShow",xLinkTitle:"xlinkTitle",xLinkType:"xlinkType",xmlnsXLink:"xmlnsXlink"},Di=/[A-Z]/g,Qt=/-[a-z]/g,Wi=/^data[-\w.:]+$/i;function Ii(e,n){const t=et(n);let a=n,r=ce;if(t in e.normal)return e.property[e.normal[t]];if(t.length>4&&t.slice(0,4)==="data"&&Wi.test(n)){if(n.charAt(4)==="-"){const o=n.slice(5).replace(Qt,zi);a="data"+o.charAt(0).toUpperCase()+o.slice(1)}else{const o=n.slice(4);if(!Qt.test(o)){let i=o.replace(Di,Ei);i.charAt(0)!=="-"&&(i="-"+i),n="data"+i}}r=pt}return new r(a,n)}function Ei(e){return"-"+e.toLowerCase()}function zi(e){return e.charAt(1).toUpperCase()}const Ti=Na([qa,Ci,Ha,ja,Ua],"html"),ht=Na([qa,xi,Ha,ja,Ua],"svg");function Mi(e){return e.join(" ").trim()}var Ge={},Ln,_t;function Ri(){if(_t)return Ln;_t=1;var e=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,n=/\n/g,t=/^\s*/,a=/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,r=/^:\s*/,o=/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,i=/^[;\s]*/,s=/^\s+|\s+$/g,c=`
`,l="/",d="*",u="",h="comment",p="declaration";function f(w,y){if(typeof w!="string")throw new TypeError("First argument must be a string");if(!w)return[];y=y||{};var P=1,k=1;function W(M){var I=M.match(n);I&&(P+=I.length);var V=M.lastIndexOf(c);k=~V?M.length-V:k+M.length}function E(){var M={line:P,column:k};return function(I){return I.position=new A(M),U(),I}}function A(M){this.start=M,this.end={line:P,column:k},this.source=y.source}A.prototype.content=w;function T(M){var I=new Error(y.source+":"+P+":"+k+": "+M);if(I.reason=M,I.filename=y.source,I.line=P,I.column=k,I.source=w,!y.silent)throw I}function O(M){var I=M.exec(w);if(I){var V=I[0];return W(V),w=w.slice(V.length),I}}function U(){O(t)}function b(M){var I;for(M=M||[];I=D();)I!==!1&&M.push(I);return M}function D(){var M=E();if(!(l!=w.charAt(0)||d!=w.charAt(1))){for(var I=2;u!=w.charAt(I)&&(d!=w.charAt(I)||l!=w.charAt(I+1));)++I;if(I+=2,u===w.charAt(I-1))return T("End of comment missing");var V=w.slice(2,I-2);return k+=2,W(V),w=w.slice(I),k+=2,M({type:h,comment:V})}}function z(){var M=E(),I=O(a);if(I){if(D(),!O(r))return T("property missing ':'");var V=O(o),J=M({type:p,property:S(I[0].replace(e,u)),value:V?S(V[0].replace(e,u)):u});return O(i),J}}function G(){var M=[];b(M);for(var I;I=z();)I!==!1&&(M.push(I),b(M));return M}return U(),G()}function S(w){return w?w.replace(s,u):u}return Ln=f,Ln}var Zt;function Li(){if(Zt)return Ge;Zt=1;var e=Ge&&Ge.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(Ge,"__esModule",{value:!0}),Ge.default=t;const n=e(Ri());function t(a,r){let o=null;if(!a||typeof a!="string")return o;const i=(0,n.default)(a),s=typeof r=="function";return i.forEach(c=>{if(c.type!=="declaration")return;const{property:l,value:d}=c;s?r(l,d,c):d&&(o=o||{},o[l]=d)}),o}return Ge}var Xe={},$t;function Fi(){if($t)return Xe;$t=1,Object.defineProperty(Xe,"__esModule",{value:!0}),Xe.camelCase=void 0;var e=/^--[a-zA-Z0-9_-]+$/,n=/-([a-z])/g,t=/^[^-]+$/,a=/^-(webkit|moz|ms|o|khtml)-/,r=/^-(ms)-/,o=function(l){return!l||t.test(l)||e.test(l)},i=function(l,d){return d.toUpperCase()},s=function(l,d){return"".concat(d,"-")},c=function(l,d){return d===void 0&&(d={}),o(l)?l:(l=l.toLowerCase(),d.reactCompat?l=l.replace(r,s):l=l.replace(a,s),l.replace(n,i))};return Xe.camelCase=c,Xe}var Je,Xt;function Bi(){if(Xt)return Je;Xt=1;var e=Je&&Je.__importDefault||function(r){return r&&r.__esModule?r:{default:r}},n=e(Li()),t=Fi();function a(r,o){var i={};return!r||typeof r!="string"||(0,n.default)(r,function(s,c){s&&c&&(i[(0,t.camelCase)(s,o)]=c)}),i}return a.default=a,Je=a,Je}var Oi=Bi();const Ni=Ba(Oi),Ka=Qa("end"),mt=Qa("start");function Qa(e){return n;function n(t){const a=t&&t.position&&t.position[e]||{};if(typeof a.line=="number"&&a.line>0&&typeof a.column=="number"&&a.column>0)return{line:a.line,column:a.column,offset:typeof a.offset=="number"&&a.offset>-1?a.offset:void 0}}}function qi(e){const n=mt(e),t=Ka(e);if(n&&t)return{start:n,end:t}}function nn(e){return!e||typeof e!="object"?"":"position"in e||"type"in e?Jt(e.position):"start"in e||"end"in e?Jt(e):"line"in e||"column"in e?at(e):""}function at(e){return Yt(e&&e.line)+":"+Yt(e&&e.column)}function Jt(e){return at(e&&e.start)+"-"+at(e&&e.end)}function Yt(e){return e&&typeof e=="number"?e:1}class ae extends Error{constructor(n,t,a){super(),typeof t=="string"&&(a=t,t=void 0);let r="",o={},i=!1;if(t&&("line"in t&&"column"in t?o={place:t}:"start"in t&&"end"in t?o={place:t}:"type"in t?o={ancestors:[t],place:t.position}:o={...t}),typeof n=="string"?r=n:!o.cause&&n&&(i=!0,r=n.message,o.cause=n),!o.ruleId&&!o.source&&typeof a=="string"){const c=a.indexOf(":");c===-1?o.ruleId=a:(o.source=a.slice(0,c),o.ruleId=a.slice(c+1))}if(!o.place&&o.ancestors&&o.ancestors){const c=o.ancestors[o.ancestors.length-1];c&&(o.place=c.position)}const s=o.place&&"start"in o.place?o.place.start:o.place;this.ancestors=o.ancestors||void 0,this.cause=o.cause||void 0,this.column=s?s.column:void 0,this.fatal=void 0,this.file="",this.message=r,this.line=s?s.line:void 0,this.name=nn(o.place)||"1:1",this.place=o.place||void 0,this.reason=this.message,this.ruleId=o.ruleId||void 0,this.source=o.source||void 0,this.stack=i&&o.cause&&typeof o.cause.stack=="string"?o.cause.stack:"",this.actual=void 0,this.expected=void 0,this.note=void 0,this.url=void 0}}ae.prototype.file="";ae.prototype.name="";ae.prototype.reason="";ae.prototype.message="";ae.prototype.stack="";ae.prototype.column=void 0;ae.prototype.line=void 0;ae.prototype.ancestors=void 0;ae.prototype.cause=void 0;ae.prototype.fatal=void 0;ae.prototype.place=void 0;ae.prototype.ruleId=void 0;ae.prototype.source=void 0;const gt={}.hasOwnProperty,Gi=new Map,Vi=/[A-Z]/g,Hi=new Set(["table","tbody","thead","tfoot","tr"]),ji=new Set(["td","th"]),_a="https://github.com/syntax-tree/hast-util-to-jsx-runtime";function Ui(e,n){if(!n||n.Fragment===void 0)throw new TypeError("Expected `Fragment` in options");const t=n.filePath||void 0;let a;if(n.development){if(typeof n.jsxDEV!="function")throw new TypeError("Expected `jsxDEV` in options when `development: true`");a=Yi(t,n.jsxDEV)}else{if(typeof n.jsx!="function")throw new TypeError("Expected `jsx` in production options");if(typeof n.jsxs!="function")throw new TypeError("Expected `jsxs` in production options");a=Ji(t,n.jsx,n.jsxs)}const r={Fragment:n.Fragment,ancestors:[],components:n.components||{},create:a,elementAttributeNameCase:n.elementAttributeNameCase||"react",evaluater:n.createEvaluater?n.createEvaluater():void 0,filePath:t,ignoreInvalidStyle:n.ignoreInvalidStyle||!1,passKeys:n.passKeys!==!1,passNode:n.passNode||!1,schema:n.space==="svg"?ht:Ti,stylePropertyNameCase:n.stylePropertyNameCase||"dom",tableCellAlignToStyle:n.tableCellAlignToStyle!==!1},o=Za(r,e,void 0);return o&&typeof o!="string"?o:r.create(e,r.Fragment,{children:o||void 0},void 0)}function Za(e,n,t){if(n.type==="element")return Ki(e,n,t);if(n.type==="mdxFlowExpression"||n.type==="mdxTextExpression")return Qi(e,n);if(n.type==="mdxJsxFlowElement"||n.type==="mdxJsxTextElement")return Zi(e,n,t);if(n.type==="mdxjsEsm")return _i(e,n);if(n.type==="root")return $i(e,n,t);if(n.type==="text")return Xi(e,n)}function Ki(e,n,t){const a=e.schema;let r=a;n.tagName.toLowerCase()==="svg"&&a.space==="html"&&(r=ht,e.schema=r),e.ancestors.push(n);const o=Xa(e,n.tagName,!1),i=eo(e,n);let s=yt(e,n);return Hi.has(n.tagName)&&(s=s.filter(function(c){return typeof c=="string"?!wi(c):!0})),$a(e,i,o,n),ft(i,s),e.ancestors.pop(),e.schema=a,e.create(n,o,i,t)}function Qi(e,n){if(n.data&&n.data.estree&&e.evaluater){const a=n.data.estree.body[0];return a.type,e.evaluater.evaluateExpression(a.expression)}rn(e,n.position)}function _i(e,n){if(n.data&&n.data.estree&&e.evaluater)return e.evaluater.evaluateProgram(n.data.estree);rn(e,n.position)}function Zi(e,n,t){const a=e.schema;let r=a;n.name==="svg"&&a.space==="html"&&(r=ht,e.schema=r),e.ancestors.push(n);const o=n.name===null?e.Fragment:Xa(e,n.name,!0),i=no(e,n),s=yt(e,n);return $a(e,i,o,n),ft(i,s),e.ancestors.pop(),e.schema=a,e.create(n,o,i,t)}function $i(e,n,t){const a={};return ft(a,yt(e,n)),e.create(n,e.Fragment,a,t)}function Xi(e,n){return n.value}function $a(e,n,t,a){typeof t!="string"&&t!==e.Fragment&&e.passNode&&(n.node=a)}function ft(e,n){if(n.length>0){const t=n.length>1?n:n[0];t&&(e.children=t)}}function Ji(e,n,t){return a;function a(r,o,i,s){const l=Array.isArray(i.children)?t:n;return s?l(o,i,s):l(o,i)}}function Yi(e,n){return t;function t(a,r,o,i){const s=Array.isArray(o.children),c=mt(a);return n(r,o,i,s,{columnNumber:c?c.column-1:void 0,fileName:e,lineNumber:c?c.line:void 0},void 0)}}function eo(e,n){const t={};let a,r;for(r in n.properties)if(r!=="children"&&gt.call(n.properties,r)){const o=to(e,r,n.properties[r]);if(o){const[i,s]=o;e.tableCellAlignToStyle&&i==="align"&&typeof s=="string"&&ji.has(n.tagName)?a=s:t[i]=s}}if(a){const o=t.style||(t.style={});o[e.stylePropertyNameCase==="css"?"text-align":"textAlign"]=a}return t}function no(e,n){const t={};for(const a of n.attributes)if(a.type==="mdxJsxExpressionAttribute")if(a.data&&a.data.estree&&e.evaluater){const o=a.data.estree.body[0];o.type;const i=o.expression;i.type;const s=i.properties[0];s.type,Object.assign(t,e.evaluater.evaluateExpression(s.argument))}else rn(e,n.position);else{const r=a.name;let o;if(a.value&&typeof a.value=="object")if(a.value.data&&a.value.data.estree&&e.evaluater){const s=a.value.data.estree.body[0];s.type,o=e.evaluater.evaluateExpression(s.expression)}else rn(e,n.position);else o=a.value===null?!0:a.value;t[r]=o}return t}function yt(e,n){const t=[];let a=-1;const r=e.passKeys?new Map:Gi;for(;++a<n.children.length;){const o=n.children[a];let i;if(e.passKeys){const c=o.type==="element"?o.tagName:o.type==="mdxJsxFlowElement"||o.type==="mdxJsxTextElement"?o.name:void 0;if(c){const l=r.get(c)||0;i=c+"-"+l,r.set(c,l+1)}}const s=Za(e,o,i);s!==void 0&&t.push(s)}return t}function to(e,n,t){const a=Ii(e.schema,n);if(!(t==null||typeof t=="number"&&Number.isNaN(t))){if(Array.isArray(t)&&(t=a.commaSeparated?yi(t):Mi(t)),a.property==="style"){let r=typeof t=="object"?t:ao(e,String(t));return e.stylePropertyNameCase==="css"&&(r=ro(r)),["style",r]}return[e.elementAttributeNameCase==="react"&&a.space?Pi[a.property]||a.property:a.attribute,t]}}function ao(e,n){try{return Ni(n,{reactCompat:!0})}catch(t){if(e.ignoreInvalidStyle)return{};const a=t,r=new ae("Cannot parse `style` attribute",{ancestors:e.ancestors,cause:a,ruleId:"style",source:"hast-util-to-jsx-runtime"});throw r.file=e.filePath||void 0,r.url=_a+"#cannot-parse-style-attribute",r}}function Xa(e,n,t){let a;if(!t)a={type:"Literal",value:n};else if(n.includes(".")){const r=n.split(".");let o=-1,i;for(;++o<r.length;){const s=jt(r[o])?{type:"Identifier",name:r[o]}:{type:"Literal",value:r[o]};i=i?{type:"MemberExpression",object:i,property:s,computed:!!(o&&s.type==="Literal"),optional:!1}:s}a=i}else a=jt(n)&&!/^[a-z]/.test(n)?{type:"Identifier",name:n}:{type:"Literal",value:n};if(a.type==="Literal"){const r=a.value;return gt.call(e.components,r)?e.components[r]:r}if(e.evaluater)return e.evaluater.evaluateExpression(a);rn(e)}function rn(e,n){const t=new ae("Cannot handle MDX estrees without `createEvaluater`",{ancestors:e.ancestors,place:n,ruleId:"mdx-estree",source:"hast-util-to-jsx-runtime"});throw t.file=e.filePath||void 0,t.url=_a+"#cannot-handle-mdx-estrees-without-createevaluater",t}function ro(e){const n={};let t;for(t in e)gt.call(e,t)&&(n[io(t)]=e[t]);return n}function io(e){let n=e.replace(Vi,oo);return n.slice(0,3)==="ms-"&&(n="-"+n),n}function oo(e){return"-"+e.toLowerCase()}const Fn={action:["form"],cite:["blockquote","del","ins","q"],data:["object"],formAction:["button","input"],href:["a","area","base","link"],icon:["menuitem"],itemId:null,manifest:["html"],ping:["a","area"],poster:["video"],src:["audio","embed","iframe","img","input","script","source","track","video"]},so={};function St(e,n){const t=so,a=typeof t.includeImageAlt=="boolean"?t.includeImageAlt:!0,r=typeof t.includeHtml=="boolean"?t.includeHtml:!0;return Ja(e,a,r)}function Ja(e,n,t){if(lo(e)){if("value"in e)return e.type==="html"&&!t?"":e.value;if(n&&"alt"in e&&e.alt)return e.alt;if("children"in e)return ea(e.children,n,t)}return Array.isArray(e)?ea(e,n,t):""}function ea(e,n,t){const a=[];let r=-1;for(;++r<e.length;)a[r]=Ja(e[r],n,t);return a.join("")}function lo(e){return!!(e&&typeof e=="object")}const na=document.createElement("i");function bt(e){const n="&"+e+";";na.innerHTML=n;const t=na.textContent;return t.charCodeAt(t.length-1)===59&&e!=="semi"||t===n?!1:t}function ye(e,n,t,a){const r=e.length;let o=0,i;if(n<0?n=-n>r?0:r+n:n=n>r?r:n,t=t>0?t:0,a.length<1e4)i=Array.from(a),i.unshift(n,t),e.splice(...i);else for(t&&e.splice(n,t);o<a.length;)i=a.slice(o,o+1e4),i.unshift(n,0),e.splice(...i),o+=1e4,n+=1e4}function fe(e,n){return e.length>0?(ye(e,e.length,0,n),e):n}const ta={}.hasOwnProperty;function Ya(e){const n={};let t=-1;for(;++t<e.length;)co(n,e[t]);return n}function co(e,n){let t;for(t in n){const r=(ta.call(e,t)?e[t]:void 0)||(e[t]={}),o=n[t];let i;if(o)for(i in o){ta.call(r,i)||(r[i]=[]);const s=o[i];uo(r[i],Array.isArray(s)?s:s?[s]:[])}}}function uo(e,n){let t=-1;const a=[];for(;++t<n.length;)(n[t].add==="after"?e:a).push(n[t]);ye(e,0,0,a)}function er(e,n){const t=Number.parseInt(e,n);return t<9||t===11||t>13&&t<32||t>126&&t<160||t>55295&&t<57344||t>64975&&t<65008||(t&65535)===65535||(t&65535)===65534||t>1114111?"�":String.fromCodePoint(t)}function Se(e){return e.replace(/[\t\n\r ]+/g," ").replace(/^ | $/g,"").toLowerCase().toUpperCase()}const ie=Ee(/[A-Za-z]/),te=Ee(/[\dA-Za-z]/),po=Ee(/[#-'*+\--9=?A-Z^-~]/);function bn(e){return e!==null&&(e<32||e===127)}const rt=Ee(/\d/),ho=Ee(/[\dA-Fa-f]/),mo=Ee(/[!-/:-@[-`{-~]/);function R(e){return e!==null&&e<-2}function Z(e){return e!==null&&(e<0||e===32)}function q(e){return e===-2||e===-1||e===32}const xn=Ee(new RegExp("\\p{P}|\\p{S}","u")),Re=Ee(/\s/);function Ee(e){return n;function n(t){return t!==null&&t>-1&&e.test(String.fromCharCode(t))}}function je(e){const n=[];let t=-1,a=0,r=0;for(;++t<e.length;){const o=e.charCodeAt(t);let i="";if(o===37&&te(e.charCodeAt(t+1))&&te(e.charCodeAt(t+2)))r=2;else if(o<128)/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(o))||(i=String.fromCharCode(o));else if(o>55295&&o<57344){const s=e.charCodeAt(t+1);o<56320&&s>56319&&s<57344?(i=String.fromCharCode(o,s),r=1):i="�"}else i=String.fromCharCode(o);i&&(n.push(e.slice(a,t),encodeURIComponent(i)),a=t+r+1,i=""),r&&(t+=r,r=0)}return n.join("")+e.slice(a)}function j(e,n,t,a){const r=a?a-1:1/0;let o=0;return i;function i(c){return q(c)?(e.enter(t),s(c)):n(c)}function s(c){return q(c)&&o++<r?(e.consume(c),s):(e.exit(t),n(c))}}function nr(e,n,t,a,r,o){let i=0;return s;function s(d){return q(d)?(e.enter(a),c(d)):l(d)}function c(d){return q(d)&&i<o?(e.consume(d),i++,c):(e.exit(a),l(d))}function l(d){return i>=r?n(d):t(d)}}const go={tokenize:fo};function fo(e){const n=e.attempt(this.parser.constructs.contentInitial,a,r);let t;return n;function a(s){if(s===null){e.consume(s);return}return e.enter("lineEnding"),e.consume(s),e.exit("lineEnding"),j(e,n,"linePrefix")}function r(s){return e.enter("paragraph"),o(s)}function o(s){const c=e.enter("chunkText",{contentType:"text",previous:t});return t&&(t.next=c),t=c,i(s)}function i(s){if(s===null){e.exit("chunkText"),e.exit("paragraph"),e.consume(s);return}return R(s)?(e.consume(s),e.exit("chunkText"),o):(e.consume(s),i)}}let vn=class{constructor(){this.index=new Map,this.map=[]}add(n,t,a){aa(this,n,t,a,!1)}addBefore(n,t,a){aa(this,n,t,a,!0)}consume(n){if(this.map.sort(function(o,i){return o[0]-i[0]}),this.map.length===0)return;let t=this.map.length;const a=[];for(;t>0;)t-=1,a.push(n.slice(this.map[t][0]+this.map[t][1]),this.map[t][2]),n.length=this.map[t][0];a.push(n.slice()),n.length=0;let r=a.pop();for(;r;){for(const o of r)n.push(o);r=a.pop()}this.map.length=0,this.index.clear()}};function aa(e,n,t,a,r){if(t===0&&a.length===0)return;const o=e.index.get(n);if(o){o[1]+=t,r?(a.push(...o[2]),o[2]=a):o[2].push(...a);return}const i=[n,t,a];e.map.push(i),e.index.set(n,i)}const yo={tokenize:So},ra={tokenize:bo};function So(e){const n=this,t=[];let a=0,r,o,i;return s;function s(k){if(a<t.length){const W=t[a];return n.containerState=W[1],e.attempt(W[0].continuation,c,l)(k)}return l(k)}function c(k){if(a++,n.containerState._closeFlow){n.containerState._closeFlow=void 0,r&&P();const W=n.events.length;let E=W,A;for(;E--;)if(n.events[E][0]==="exit"&&n.events[E][1].type==="chunkFlow"){A=n.events[E][1].end;break}y(a);let T=W;for(;T<n.events.length;)n.events[T][1].end={...A},T++;const O=new vn;return O.add(E+1,0,n.events.slice(W)),O.add(W,T-W,[]),O.consume(n.events),l(k)}return s(k)}function l(k){if(a===t.length){if(!r)return h(k);if(r.currentConstruct&&r.currentConstruct.concrete)return f(k);n.interrupt=!!(r.currentConstruct&&!r._gfmTableDynamicInterruptHack)}return n.containerState={},e.check(ra,d,u)(k)}function d(k){return r&&P(),y(a),h(k)}function u(k){return n.parser.lazy[n.now().line]=a!==t.length,i=n.now().offset,f(k)}function h(k){return n.containerState={},e.attempt(ra,p,f)(k)}function p(k){return a++,t.push([n.currentConstruct,n.containerState]),h(k)}function f(k){if(k===null){r&&P(),y(0),e.consume(k);return}return r=r||n.parser.flow(n.now()),e.enter("chunkFlow",{_tokenizer:r,contentType:"flow",previous:o}),S(k)}function S(k){if(k===null){w(e.exit("chunkFlow"),!0),y(0),e.consume(k);return}return R(k)?(e.consume(k),w(e.exit("chunkFlow")),a=0,n.interrupt=void 0,s):(e.consume(k),S)}function w(k,W){const E=n.sliceStream(k);if(W&&E.push(null),k.previous=o,o&&(o.next=k),o=k,r.defineSkip(k.start),r.write(E),n.parser.lazy[k.start.line]){let A=r.events.length;for(;A--;)if(r.events[A][1].start.offset<i&&(!r.events[A][1].end||r.events[A][1].end.offset>i))return;const T=n.events.length;let O=T,U,b;for(;O--;)if(n.events[O][0]==="exit"&&n.events[O][1].type==="chunkFlow"){if(U){b=n.events[O][1].end;break}U=!0}for(y(a),A=T;A<n.events.length;)n.events[A][1].end={...b},A++;const D=new vn;D.add(O+1,0,n.events.slice(T)),D.add(T,A-T,[]),D.consume(n.events)}}function y(k){let W=t.length;for(;W-- >k;){const E=t[W];n.containerState=E[1],E[0].exit.call(n,e)}t.length=k}function P(){r.write([null]),o=void 0,r=void 0,n.containerState._closeFlow=void 0}}function bo(e,n,t){return j(e,e.attempt(this.parser.constructs.document,n,t),"linePrefix",this.parser.constructs.disable.null.includes("codeIndented")?void 0:4)}function An(e){if(e===null||Z(e)||Re(e))return 1;if(xn(e))return 2}function Pn(e,n,t){const a=[];let r=-1;for(;++r<e.length;){const o=e[r].resolveAll;o&&!a.includes(o)&&(n=o(n,t),a.push(o))}return n}const it={name:"attention",resolveAll:vo,tokenize:Ao};function vo(e,n){let t=-1,a;for(;++t<e.length;)if(e[t][0]==="enter"&&e[t][1].type==="attentionSequence"&&e[t][1]._close){let r=t;for(;r--;)if(e[r][0]==="exit"&&e[r][1].type==="attentionSequence"&&e[r][1]._open&&n.sliceSerialize(e[r][1]).charCodeAt(0)===n.sliceSerialize(e[t][1]).charCodeAt(0)){if((e[r][1]._close||e[t][1]._open)&&(e[t][1].end.offset-e[t][1].start.offset)%3&&!((e[r][1].end.offset-e[r][1].start.offset+e[t][1].end.offset-e[t][1].start.offset)%3))continue;const o=e[r][1].end.offset-e[r][1].start.offset>1&&e[t][1].end.offset-e[t][1].start.offset>1?2:1,i={...e[r][1].end},s={...e[t][1].start};ia(i,-o),ia(s,o);const c={type:o>1?"strongSequence":"emphasisSequence",start:i,end:{...e[r][1].end}},l={type:o>1?"strongSequence":"emphasisSequence",start:{...e[t][1].start},end:s},d={type:o>1?"strongText":"emphasisText",start:{...e[r][1].end},end:{...e[t][1].start}},u={type:o>1?"strong":"emphasis",start:{...c.start},end:{...l.end}};e[r][1].end={...c.start},e[t][1].start={...l.end},a=[],e[r][1].end.offset-e[r][1].start.offset&&(a=fe(a,[["enter",e[r][1],n],["exit",e[r][1],n]])),a=fe(a,[["enter",u,n],["enter",c,n],["exit",c,n],["enter",d,n]]),a=fe(a,Pn(n.parser.constructs.insideSpan.null,e.slice(r+1,t),n)),a=fe(a,[["exit",d,n],["enter",l,n],["exit",l,n],["exit",u,n]]);let h=0;e[t][1].end.offset-e[t][1].start.offset&&(h=2,a=fe(a,[["enter",e[t][1],n],["exit",e[t][1],n]])),ye(e,r-1,t-r+3,a),t=r+a.length-h-2;break}}for(t=-1;++t<e.length;)e[t][1].type==="attentionSequence"&&(e[t][1].type="data");return e}function Ao(e,n){const t=this.parser.constructs.attentionMarkers.null,a=this.previous,r=An(a);let o;return i;function i(c){return o=c,e.enter("attentionSequence"),s(c)}function s(c){if(c===o)return e.consume(c),s;const l=e.exit("attentionSequence"),d=An(c),u=!d||d===2&&r||t.includes(c)&&c!==42&&c!==95,h=!r||r===2&&d||t.includes(a)&&a!==42&&a!==95;return l._open=!!(o===42?u:u&&(r||!h)),l._close=!!(o===42?h:h&&(d||!u)),n(c)}}function ia(e,n){e.column+=n,e.offset+=n,e._bufferIndex+=n}const wo={name:"autolink",tokenize:ko};function ko(e,n,t){let a=0;return r;function r(p){return e.enter("autolink"),e.enter("autolinkMarker"),e.consume(p),e.exit("autolinkMarker"),e.enter("autolinkProtocol"),o}function o(p){return ie(p)?(e.consume(p),i):p===64?t(p):l(p)}function i(p){return p===43||p===45||p===46||te(p)?(a=1,s(p)):l(p)}function s(p){return p===58?(e.consume(p),a=0,c):(p===43||p===45||p===46||te(p))&&a++<32?(e.consume(p),s):(a=0,l(p))}function c(p){return p===62?(e.exit("autolinkProtocol"),e.enter("autolinkMarker"),e.consume(p),e.exit("autolinkMarker"),e.exit("autolink"),n):p===null||p===32||p===60||bn(p)?t(p):(e.consume(p),c)}function l(p){return p===64?(e.consume(p),d):po(p)?(e.consume(p),l):t(p)}function d(p){return te(p)?u(p):t(p)}function u(p){return p===46?(e.consume(p),a=0,d):p===62?(e.exit("autolinkProtocol").type="autolinkEmail",e.enter("autolinkMarker"),e.consume(p),e.exit("autolinkMarker"),e.exit("autolink"),n):h(p)}function h(p){if((p===45||te(p))&&a++<63){const f=p===45?h:u;return e.consume(p),f}return t(p)}}const sn={partial:!0,tokenize:Co};function Co(e,n,t){return a;function a(o){return q(o)?j(e,r,"linePrefix")(o):r(o)}function r(o){return o===null||R(o)?n(o):t(o)}}const tr={continuation:{tokenize:Po},exit:Do,name:"blockQuote",tokenize:xo};function xo(e,n,t){const a=this;return r;function r(i){if(i===62){const s=a.containerState;return s.open||(e.enter("blockQuote",{_container:!0}),s.open=!0),e.enter("blockQuotePrefix"),e.enter("blockQuoteMarker"),e.consume(i),e.exit("blockQuoteMarker"),o}return t(i)}function o(i){return q(i)?(e.enter("blockQuotePrefixWhitespace"),e.consume(i),e.exit("blockQuotePrefixWhitespace"),e.exit("blockQuotePrefix"),n):(e.exit("blockQuotePrefix"),n(i))}}function Po(e,n,t){const a=this;return r;function r(i){return q(i)?j(e,o,"linePrefix",a.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(i):o(i)}function o(i){return e.attempt(tr,n,t)(i)}}function Do(e){e.exit("blockQuote")}const ar={name:"characterEscape",tokenize:Wo};function Wo(e,n,t){return a;function a(o){return e.enter("characterEscape"),e.enter("escapeMarker"),e.consume(o),e.exit("escapeMarker"),r}function r(o){return mo(o)?(e.enter("characterEscapeValue"),e.consume(o),e.exit("characterEscapeValue"),e.exit("characterEscape"),n):t(o)}}const rr={name:"characterReference",tokenize:Io};function Io(e,n,t){const a=this;let r=0,o,i;return s;function s(u){return e.enter("characterReference"),e.enter("characterReferenceMarker"),e.consume(u),e.exit("characterReferenceMarker"),c}function c(u){return u===35?(e.enter("characterReferenceMarkerNumeric"),e.consume(u),e.exit("characterReferenceMarkerNumeric"),l):(e.enter("characterReferenceValue"),o=31,i=te,d(u))}function l(u){return u===88||u===120?(e.enter("characterReferenceMarkerHexadecimal"),e.consume(u),e.exit("characterReferenceMarkerHexadecimal"),e.enter("characterReferenceValue"),o=6,i=ho,d):(e.enter("characterReferenceValue"),o=7,i=rt,d(u))}function d(u){if(u===59&&r){const h=e.exit("characterReferenceValue");return i===te&&!bt(a.sliceSerialize(h))?t(u):(e.enter("characterReferenceMarker"),e.consume(u),e.exit("characterReferenceMarker"),e.exit("characterReference"),n)}return i(u)&&r++<o?(e.consume(u),d):t(u)}}const ot={partial:!0,tokenize:Eo};function Eo(e,n,t){const a=this;return r;function r(i){return i===null?t(i):(e.enter("lineEnding"),e.consume(i),e.exit("lineEnding"),o)}function o(i){return a.parser.lazy[a.now().line]?t(i):n(i)}}const oa={concrete:!0,name:"codeFenced",tokenize:zo};function zo(e,n,t){const a=this,r={partial:!0,tokenize:E};let o=0,i=0,s;return c;function c(A){return l(A)}function l(A){const T=a.events[a.events.length-1];return o=T&&T[1].type==="linePrefix"?T[2].sliceSerialize(T[1],!0).length:0,s=A,e.enter("codeFenced"),e.enter("codeFencedFence"),e.enter("codeFencedFenceSequence"),d(A)}function d(A){return A===s?(i++,e.consume(A),d):i<3?t(A):(e.exit("codeFencedFenceSequence"),q(A)?j(e,u,"whitespace")(A):u(A))}function u(A){return A===null||R(A)?(e.exit("codeFencedFence"),a.interrupt?n(A):e.check(ot,S,W)(A)):(e.enter("codeFencedFenceInfo"),e.enter("chunkString",{contentType:"string"}),h(A))}function h(A){return A===null||R(A)?(e.exit("chunkString"),e.exit("codeFencedFenceInfo"),u(A)):q(A)?(e.exit("chunkString"),e.exit("codeFencedFenceInfo"),j(e,p,"whitespace")(A)):A===96&&A===s?t(A):(e.consume(A),h)}function p(A){return A===null||R(A)?u(A):(e.enter("codeFencedFenceMeta"),e.enter("chunkString",{contentType:"string"}),f(A))}function f(A){return A===null||R(A)?(e.exit("chunkString"),e.exit("codeFencedFenceMeta"),u(A)):A===96&&A===s?t(A):(e.consume(A),f)}function S(A){return e.attempt(r,W,w)(A)}function w(A){return e.enter("lineEnding"),e.consume(A),e.exit("lineEnding"),y}function y(A){return o>0&&q(A)?j(e,P,"linePrefix",o+1)(A):P(A)}function P(A){return A===null||R(A)?e.check(ot,S,W)(A):(e.enter("codeFlowValue"),k(A))}function k(A){return A===null||R(A)?(e.exit("codeFlowValue"),P(A)):(e.consume(A),k)}function W(A){return e.exit("codeFenced"),n(A)}function E(A,T,O){let U=0;return b;function b(I){return A.enter("lineEnding"),A.consume(I),A.exit("lineEnding"),D}function D(I){return A.enter("codeFencedFence"),q(I)?j(A,z,"linePrefix",a.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(I):z(I)}function z(I){return I===s?(A.enter("codeFencedFenceSequence"),G(I)):O(I)}function G(I){return I===s?(U++,A.consume(I),G):U>=i?(A.exit("codeFencedFenceSequence"),q(I)?j(A,M,"whitespace")(I):M(I)):O(I)}function M(I){return I===null||R(I)?(A.exit("codeFencedFence"),T(I)):O(I)}}}const Bn={name:"codeIndented",tokenize:Mo},To={partial:!0,tokenize:Ro};function Mo(e,n,t){return a;function a(s){return e.enter("codeIndented"),nr(e,r,t,"linePrefix",4,4)(s)}function r(s){return s===null?i(s):R(s)?e.attempt(To,r,i)(s):(e.enter("codeFlowValue"),o(s))}function o(s){return s===null||R(s)?(e.exit("codeFlowValue"),r(s)):(e.consume(s),o)}function i(s){return e.exit("codeIndented"),n(s)}}function Ro(e,n,t){const a=this;return r;function r(i){return a.parser.lazy[a.now().line]?t(i):R(i)?(e.enter("lineEnding"),e.consume(i),e.exit("lineEnding"),r):nr(e,n,o,"linePrefix",4,4)(i)}function o(i){return R(i)?r(i):t(i)}}const Lo={name:"codeText",previous:Bo,resolve:Fo,tokenize:Oo};function Fo(e){let n=e.length-4,t=3,a,r;if((e[t][1].type==="lineEnding"||e[t][1].type==="space")&&(e[n][1].type==="lineEnding"||e[n][1].type==="space")){for(a=t;++a<n;)if(e[a][1].type==="codeTextData"){e[t][1].type="codeTextPadding",e[n][1].type="codeTextPadding",t+=2,n-=2;break}}for(a=t-1,n++;++a<=n;)r===void 0?a!==n&&e[a][1].type!=="lineEnding"&&(r=a):(a===n||e[a][1].type==="lineEnding")&&(e[r][1].type="codeTextData",a!==r+2&&(e[r][1].end=e[a-1][1].end,e.splice(r+2,a-r-2),n-=a-r-2,a=r+2),r=void 0);return e}function Bo(e){return e!==96||this.events[this.events.length-1][1].type==="characterEscape"}function Oo(e,n,t){let a=0,r,o;return i;function i(u){return e.enter("codeText"),e.enter("codeTextSequence"),s(u)}function s(u){return u===96?(e.consume(u),a++,s):(e.exit("codeTextSequence"),c(u))}function c(u){return u===null?t(u):u===32?(e.enter("space"),e.consume(u),e.exit("space"),c):u===96?(o=e.enter("codeTextSequence"),r=0,d(u)):R(u)?(e.enter("lineEnding"),e.consume(u),e.exit("lineEnding"),c):(e.enter("codeTextData"),l(u))}function l(u){return u===null||u===32||u===96||R(u)?(e.exit("codeTextData"),c(u)):(e.consume(u),l)}function d(u){return u===96?(e.consume(u),r++,d):r===a?(e.exit("codeTextSequence"),e.exit("codeText"),n(u)):(o.type="codeTextData",l(u))}}class No{constructor(n){this.left=n?[...n]:[],this.right=[]}get(n){if(n<0||n>=this.left.length+this.right.length)throw new RangeError("Cannot access index `"+n+"` in a splice buffer of size `"+(this.left.length+this.right.length)+"`");return n<this.left.length?this.left[n]:this.right[this.right.length-n+this.left.length-1]}get length(){return this.left.length+this.right.length}shift(){return this.setCursor(0),this.right.pop()}slice(n,t){const a=t??Number.POSITIVE_INFINITY;return a<this.left.length?this.left.slice(n,a):n>this.left.length?this.right.slice(this.right.length-a+this.left.length,this.right.length-n+this.left.length).reverse():this.left.slice(n).concat(this.right.slice(this.right.length-a+this.left.length).reverse())}splice(n,t,a){const r=t||0;this.setCursor(Math.trunc(n));const o=this.right.splice(this.right.length-r,Number.POSITIVE_INFINITY);return a&&Ye(this.left,a),o.reverse()}pop(){return this.setCursor(Number.POSITIVE_INFINITY),this.left.pop()}push(n){this.setCursor(Number.POSITIVE_INFINITY),this.left.push(n)}pushMany(n){this.setCursor(Number.POSITIVE_INFINITY),Ye(this.left,n)}unshift(n){this.setCursor(0),this.right.push(n)}unshiftMany(n){this.setCursor(0),Ye(this.right,n.reverse())}setCursor(n){if(!(n===this.left.length||n>this.left.length&&this.right.length===0||n<0&&this.left.length===0))if(n<this.left.length){const t=this.left.splice(n,Number.POSITIVE_INFINITY);Ye(this.right,t.reverse())}else{const t=this.right.splice(this.left.length+this.right.length-n,Number.POSITIVE_INFINITY);Ye(this.left,t.reverse())}}}function Ye(e,n){let t=0;if(n.length<1e4)e.push(...n);else for(;t<n.length;)e.push(...n.slice(t,t+1e4)),t+=1e4}function ir(e){const n={};let t=-1,a,r,o,i,s,c,l;const d=new No(e);for(;++t<d.length;){for(;t in n;)t=n[t];if(a=d.get(t),t&&a[1].type==="chunkFlow"&&d.get(t-1)[1].type==="listItemPrefix"&&(c=a[1]._tokenizer.events,o=0,o<c.length&&c[o][1].type==="lineEndingBlank"&&(o+=2),o<c.length&&c[o][1].type==="content"))for(;++o<c.length&&c[o][1].type!=="content";)c[o][1].type==="chunkText"&&(c[o][1]._isInFirstContentOfListItem=!0,o++);if(a[0]==="enter")a[1].contentType&&(Object.assign(n,qo(d,t)),t=n[t],l=!0);else if(a[1]._container){for(o=t,r=void 0;o--;)if(i=d.get(o),i[1].type==="lineEnding"||i[1].type==="lineEndingBlank")i[0]==="enter"&&(r&&(d.get(r)[1].type="lineEndingBlank"),i[1].type="lineEnding",r=o);else if(!(i[1].type==="linePrefix"||i[1].type==="listItemIndent"))break;r&&(a[1].end={...d.get(r)[1].start},s=d.slice(r,t),s.unshift(a),d.splice(r,t-r+1,s))}}return ye(e,0,Number.POSITIVE_INFINITY,d.slice(0)),!l}function qo(e,n){const t=e.get(n)[1],a=e.get(n)[2];let r=n-1;const o=[];let i=t._tokenizer;i||(i=a.parser[t.contentType](t.start),t._contentTypeTextTrailing&&(i._contentTypeTextTrailing=!0));const s=i.events,c=[],l={};let d,u,h=-1,p=t,f=0,S=0;const w=[S];for(;p;){for(;e.get(++r)[1]!==p;);o.push(r),p._tokenizer||(d=a.sliceStream(p),p.next||d.push(null),u&&i.defineSkip(p.start),p._isInFirstContentOfListItem&&(i._gfmTasklistFirstContentOfListItem=!0),i.write(d),p._isInFirstContentOfListItem&&(i._gfmTasklistFirstContentOfListItem=void 0)),u=p,p=p.next}for(p=t;++h<s.length;)s[h][0]==="exit"&&s[h-1][0]==="enter"&&s[h][1].type===s[h-1][1].type&&s[h][1].start.line!==s[h][1].end.line&&(S=h+1,w.push(S),p._tokenizer=void 0,p.previous=void 0,p=p.next);for(i.events=[],p?(p._tokenizer=void 0,p.previous=void 0):w.pop(),h=w.length;h--;){const y=s.slice(w[h],w[h+1]),P=o.pop();c.push([P,P+y.length-1]),e.splice(P,2,y)}for(c.reverse(),h=-1;++h<c.length;)l[f+c[h][0]]=f+c[h][1],f+=c[h][1]-c[h][0]-1;return l}const Go={resolve:Ho,tokenize:jo},Vo={partial:!0,tokenize:Uo};function Ho(e){return ir(e),e}function jo(e,n){let t;return a;function a(s){return e.enter("content"),t=e.enter("chunkContent",{contentType:"content"}),r(s)}function r(s){return s===null?o(s):R(s)?e.check(Vo,i,o)(s):(e.consume(s),r)}function o(s){return e.exit("chunkContent"),e.exit("content"),n(s)}function i(s){return e.consume(s),e.exit("chunkContent"),t.next=e.enter("chunkContent",{contentType:"content",previous:t}),t=t.next,r}}function Uo(e,n,t){const a=this;return r;function r(i){return e.exit("chunkContent"),e.enter("lineEnding"),e.consume(i),e.exit("lineEnding"),j(e,o,"linePrefix")}function o(i){if(i===null||R(i))return t(i);const s=a.events[a.events.length-1];return!a.parser.constructs.disable.null.includes("codeIndented")&&s&&s[1].type==="linePrefix"&&s[2].sliceSerialize(s[1],!0).length>=4?n(i):e.interrupt(a.parser.constructs.flow,t,n)(i)}}function or(e,n,t,a,r,o,i,s,c){const l=c||Number.POSITIVE_INFINITY;let d=0;return u;function u(y){return y===60?(e.enter(a),e.enter(r),e.enter(o),e.consume(y),e.exit(o),h):y===null||y===32||y===41||bn(y)?t(y):(e.enter(a),e.enter(i),e.enter(s),e.enter("chunkString",{contentType:"string"}),S(y))}function h(y){return y===62?(e.enter(o),e.consume(y),e.exit(o),e.exit(r),e.exit(a),n):(e.enter(s),e.enter("chunkString",{contentType:"string"}),p(y))}function p(y){return y===62?(e.exit("chunkString"),e.exit(s),h(y)):y===null||y===60||R(y)?t(y):(e.consume(y),y===92?f:p)}function f(y){return y===60||y===62||y===92?(e.consume(y),p):p(y)}function S(y){return!d&&(y===null||y===41||Z(y))?(e.exit("chunkString"),e.exit(s),e.exit(i),e.exit(a),n(y)):d<l&&y===40?(e.consume(y),d++,S):y===41?(e.consume(y),d--,S):y===null||y===32||y===40||bn(y)?t(y):(e.consume(y),y===92?w:S)}function w(y){return y===40||y===41||y===92?(e.consume(y),S):S(y)}}function sr(e,n,t,a,r,o){const i=this;let s=0,c;return l;function l(p){return e.enter(a),e.enter(r),e.consume(p),e.exit(r),e.enter(o),d}function d(p){return s>999||p===null||p===91||p===93&&!c||p===94&&!s&&"_hiddenFootnoteSupport"in i.parser.constructs?t(p):p===93?(e.exit(o),e.enter(r),e.consume(p),e.exit(r),e.exit(a),n):R(p)?(e.enter("lineEnding"),e.consume(p),e.exit("lineEnding"),d):(e.enter("chunkString",{contentType:"string"}),u(p))}function u(p){return p===null||p===91||p===93||R(p)||s++>999?(e.exit("chunkString"),d(p)):(e.consume(p),c||(c=!q(p)),p===92?h:u)}function h(p){return p===91||p===92||p===93?(e.consume(p),s++,u):u(p)}}function lr(e,n,t,a,r,o){let i;return s;function s(h){return h===34||h===39||h===40?(e.enter(a),e.enter(r),e.consume(h),e.exit(r),i=h===40?41:h,c):t(h)}function c(h){return h===i?(e.enter(r),e.consume(h),e.exit(r),e.exit(a),n):(e.enter(o),l(h))}function l(h){return h===i?(e.exit(o),c(i)):h===null?t(h):R(h)?(e.enter("lineEnding"),e.consume(h),e.exit("lineEnding"),j(e,l,"linePrefix")):(e.enter("chunkString",{contentType:"string"}),d(h))}function d(h){return h===i||h===null||R(h)?(e.exit("chunkString"),l(h)):(e.consume(h),h===92?u:d)}function u(h){return h===i||h===92?(e.consume(h),d):d(h)}}function tn(e,n){let t;return a;function a(r){return R(r)?(e.enter("lineEnding"),e.consume(r),e.exit("lineEnding"),t=!0,a):q(r)?j(e,a,t?"linePrefix":"lineSuffix")(r):n(r)}}const Ko={name:"definition",tokenize:_o},Qo={partial:!0,tokenize:Zo};function _o(e,n,t){const a=this;let r;return o;function o(p){return e.enter("definition"),i(p)}function i(p){return sr.call(a,e,s,t,"definitionLabel","definitionLabelMarker","definitionLabelString")(p)}function s(p){return r=Se(a.sliceSerialize(a.events[a.events.length-1][1]).slice(1,-1)),p===58?(e.enter("definitionMarker"),e.consume(p),e.exit("definitionMarker"),c):t(p)}function c(p){return Z(p)?tn(e,l)(p):l(p)}function l(p){return or(e,d,t,"definitionDestination","definitionDestinationLiteral","definitionDestinationLiteralMarker","definitionDestinationRaw","definitionDestinationString")(p)}function d(p){return e.attempt(Qo,u,u)(p)}function u(p){return q(p)?j(e,h,"whitespace")(p):h(p)}function h(p){return p===null||R(p)?(e.exit("definition"),a.parser.defined.push(r),n(p)):t(p)}}function Zo(e,n,t){return a;function a(s){return Z(s)?tn(e,r)(s):t(s)}function r(s){return lr(e,o,t,"definitionTitle","definitionTitleMarker","definitionTitleString")(s)}function o(s){return q(s)?j(e,i,"whitespace")(s):i(s)}function i(s){return s===null||R(s)?n(s):t(s)}}const $o={name:"hardBreakEscape",tokenize:Xo};function Xo(e,n,t){return a;function a(o){return e.enter("hardBreakEscape"),e.consume(o),r}function r(o){return R(o)?(e.exit("hardBreakEscape"),n(o)):t(o)}}const Jo={name:"headingAtx",resolve:Yo,tokenize:es};function Yo(e,n){let t=e.length-2,a=3;if(e[a][1].type==="whitespace"&&(a+=2),t-2>a&&e[t][1].type==="whitespace"&&(t-=2),e[t][1].type==="atxHeadingSequence"&&(a===t-1||t-4>a&&e[t-2][1].type==="whitespace")&&(t-=a+1===t?2:4),t>a){const r={type:"atxHeadingText",start:e[a][1].start,end:e[t][1].end},o={type:"chunkText",start:e[a][1].start,end:e[t][1].end,contentType:"text"};ye(e,a,t-a+1,[["enter",r,n],["enter",o,n],["exit",o,n],["exit",r,n]])}return e}function es(e,n,t){let a=0;return r;function r(d){return e.enter("atxHeading"),o(d)}function o(d){return e.enter("atxHeadingSequence"),i(d)}function i(d){return d===35&&a++<6?(e.consume(d),i):d===null||Z(d)?(e.exit("atxHeadingSequence"),s(d)):t(d)}function s(d){return d===35?(e.enter("atxHeadingSequence"),c(d)):d===null||R(d)?(e.exit("atxHeading"),n(d)):q(d)?j(e,s,"whitespace")(d):(e.enter("atxHeadingText"),l(d))}function c(d){return d===35?(e.consume(d),c):(e.exit("atxHeadingSequence"),s(d))}function l(d){return d===null||d===35||Z(d)?(e.exit("atxHeadingText"),s(d)):(e.consume(d),l)}}const ns=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],sa=["pre","script","style","textarea"],ts={concrete:!0,name:"htmlFlow",resolveTo:rs,tokenize:is},as={partial:!0,tokenize:os};function rs(e){let n=e.length;for(;n--&&!(e[n][0]==="enter"&&e[n][1].type==="htmlFlow"););return n>1&&e[n-2][1].type==="linePrefix"&&(e[n][1].start=e[n-2][1].start,e[n+1][1].start=e[n-2][1].start,e.splice(n-2,2)),e}function is(e,n,t){const a=this;let r,o,i,s,c;return l;function l(g){return d(g)}function d(g){return e.enter("htmlFlow"),e.enter("htmlFlowData"),e.consume(g),u}function u(g){return g===33?(e.consume(g),h):g===47?(e.consume(g),o=!0,S):g===63?(e.consume(g),r=3,a.interrupt?n:m):ie(g)?(e.consume(g),i=String.fromCharCode(g),w):t(g)}function h(g){return g===45?(e.consume(g),r=2,p):g===91?(e.consume(g),r=5,s=0,f):ie(g)?(e.consume(g),r=4,a.interrupt?n:m):t(g)}function p(g){return g===45?(e.consume(g),a.interrupt?n:m):t(g)}function f(g){const ue="CDATA[";return g===ue.charCodeAt(s++)?(e.consume(g),s===ue.length?a.interrupt?n:z:f):t(g)}function S(g){return ie(g)?(e.consume(g),i=String.fromCharCode(g),w):t(g)}function w(g){if(g===null||g===47||g===62||Z(g)){const ue=g===47,Pe=i.toLowerCase();return!ue&&!o&&sa.includes(Pe)?(r=1,a.interrupt?n(g):z(g)):ns.includes(i.toLowerCase())?(r=6,ue?(e.consume(g),y):a.interrupt?n(g):z(g)):(r=7,a.interrupt&&!a.parser.lazy[a.now().line]?t(g):o?P(g):k(g))}return g===45||te(g)?(e.consume(g),i+=String.fromCharCode(g),w):t(g)}function y(g){return g===62?(e.consume(g),a.interrupt?n:z):t(g)}function P(g){return q(g)?(e.consume(g),P):b(g)}function k(g){return g===47?(e.consume(g),b):g===58||g===95||ie(g)?(e.consume(g),W):q(g)?(e.consume(g),k):b(g)}function W(g){return g===45||g===46||g===58||g===95||te(g)?(e.consume(g),W):E(g)}function E(g){return g===61?(e.consume(g),A):q(g)?(e.consume(g),E):k(g)}function A(g){return g===null||g===60||g===61||g===62||g===96?t(g):g===34||g===39?(e.consume(g),c=g,T):q(g)?(e.consume(g),A):O(g)}function T(g){return g===c?(e.consume(g),c=null,U):g===null||R(g)?t(g):(e.consume(g),T)}function O(g){return g===null||g===34||g===39||g===47||g===60||g===61||g===62||g===96||Z(g)?E(g):(e.consume(g),O)}function U(g){return g===47||g===62||q(g)?k(g):t(g)}function b(g){return g===62?(e.consume(g),D):t(g)}function D(g){return g===null||R(g)?z(g):q(g)?(e.consume(g),D):t(g)}function z(g){return g===45&&r===2?(e.consume(g),V):g===60&&r===1?(e.consume(g),J):g===62&&r===4?(e.consume(g),oe):g===63&&r===3?(e.consume(g),m):g===93&&r===5?(e.consume(g),be):R(g)&&(r===6||r===7)?(e.exit("htmlFlowData"),e.check(as,re,G)(g)):g===null||R(g)?(e.exit("htmlFlowData"),G(g)):(e.consume(g),z)}function G(g){return e.check(ot,M,re)(g)}function M(g){return e.enter("lineEnding"),e.consume(g),e.exit("lineEnding"),I}function I(g){return g===null||R(g)?G(g):(e.enter("htmlFlowData"),z(g))}function V(g){return g===45?(e.consume(g),m):z(g)}function J(g){return g===47?(e.consume(g),i="",ne):z(g)}function ne(g){if(g===62){const ue=i.toLowerCase();return sa.includes(ue)?(e.consume(g),oe):z(g)}return ie(g)&&i.length<8?(e.consume(g),i+=String.fromCharCode(g),ne):z(g)}function be(g){return g===93?(e.consume(g),m):z(g)}function m(g){return g===62?(e.consume(g),oe):g===45&&r===2?(e.consume(g),m):z(g)}function oe(g){return g===null||R(g)?(e.exit("htmlFlowData"),re(g)):(e.consume(g),oe)}function re(g){return e.exit("htmlFlow"),n(g)}}function os(e,n,t){return a;function a(r){return e.enter("lineEnding"),e.consume(r),e.exit("lineEnding"),e.attempt(sn,n,t)}}const ss={name:"htmlText",tokenize:ls};function ls(e,n,t){const a=this;let r,o,i;return s;function s(m){return e.enter("htmlText"),e.enter("htmlTextData"),e.consume(m),c}function c(m){return m===33?(e.consume(m),l):m===47?(e.consume(m),E):m===63?(e.consume(m),k):ie(m)?(e.consume(m),O):t(m)}function l(m){return m===45?(e.consume(m),d):m===91?(e.consume(m),o=0,f):ie(m)?(e.consume(m),P):t(m)}function d(m){return m===45?(e.consume(m),p):t(m)}function u(m){return m===null?t(m):m===45?(e.consume(m),h):R(m)?(i=u,J(m)):(e.consume(m),u)}function h(m){return m===45?(e.consume(m),p):u(m)}function p(m){return m===62?V(m):m===45?h(m):u(m)}function f(m){const oe="CDATA[";return m===oe.charCodeAt(o++)?(e.consume(m),o===oe.length?S:f):t(m)}function S(m){return m===null?t(m):m===93?(e.consume(m),w):R(m)?(i=S,J(m)):(e.consume(m),S)}function w(m){return m===93?(e.consume(m),y):S(m)}function y(m){return m===62?V(m):m===93?(e.consume(m),y):S(m)}function P(m){return m===null||m===62?V(m):R(m)?(i=P,J(m)):(e.consume(m),P)}function k(m){return m===null?t(m):m===63?(e.consume(m),W):R(m)?(i=k,J(m)):(e.consume(m),k)}function W(m){return m===62?V(m):k(m)}function E(m){return ie(m)?(e.consume(m),A):t(m)}function A(m){return m===45||te(m)?(e.consume(m),A):T(m)}function T(m){return R(m)?(i=T,J(m)):q(m)?(e.consume(m),T):V(m)}function O(m){return m===45||te(m)?(e.consume(m),O):m===47||m===62||Z(m)?U(m):t(m)}function U(m){return m===47?(e.consume(m),V):m===58||m===95||ie(m)?(e.consume(m),b):R(m)?(i=U,J(m)):q(m)?(e.consume(m),U):V(m)}function b(m){return m===45||m===46||m===58||m===95||te(m)?(e.consume(m),b):D(m)}function D(m){return m===61?(e.consume(m),z):R(m)?(i=D,J(m)):q(m)?(e.consume(m),D):U(m)}function z(m){return m===null||m===60||m===61||m===62||m===96?t(m):m===34||m===39?(e.consume(m),r=m,G):R(m)?(i=z,J(m)):q(m)?(e.consume(m),z):(e.consume(m),M)}function G(m){return m===r?(e.consume(m),r=void 0,I):m===null?t(m):R(m)?(i=G,J(m)):(e.consume(m),G)}function M(m){return m===null||m===34||m===39||m===60||m===61||m===96?t(m):m===47||m===62||Z(m)?U(m):(e.consume(m),M)}function I(m){return m===47||m===62||Z(m)?U(m):t(m)}function V(m){return m===62?(e.consume(m),e.exit("htmlTextData"),e.exit("htmlText"),n):t(m)}function J(m){return e.exit("htmlTextData"),e.enter("lineEnding"),e.consume(m),e.exit("lineEnding"),ne}function ne(m){return q(m)?j(e,be,"linePrefix",a.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(m):be(m)}function be(m){return e.enter("htmlTextData"),i(m)}}const vt={name:"labelEnd",resolveAll:ps,resolveTo:hs,tokenize:ms},cs={tokenize:gs},us={tokenize:fs},ds={tokenize:ys};function ps(e){let n=-1;const t=[];for(;++n<e.length;){const a=e[n][1];if(t.push(e[n]),a.type==="labelImage"||a.type==="labelLink"||a.type==="labelEnd"){const r=a.type==="labelImage"?4:2;a.type="data",n+=r}}return e.length!==t.length&&ye(e,0,e.length,t),e}function hs(e,n){let t=e.length,a=0,r,o,i;for(;t--;){const d=e[t][1];if(r){if(d.type==="link"||d.type==="labelLink"&&d._inactive)break;e[t][0]==="enter"&&d.type==="labelLink"&&(d._inactive=!0)}else if(o){if(e[t][0]==="enter"&&(d.type==="labelImage"||d.type==="labelLink")&&!d._balanced&&(r=t,d.type!=="labelLink")){a=2;break}}else d.type==="labelEnd"&&(o=t)}const s={type:e[r][1].type==="labelLink"?"link":"image",start:{...e[r][1].start},end:{...e[e.length-1][1].end}},c={type:"label",start:{...e[r][1].start},end:{...e[o][1].end}},l={type:"labelText",start:{...e[r+a+2][1].end},end:{...e[o-2][1].start}};return i=[["enter",s,n],["enter",c,n]],i=fe(i,e.slice(r+1,r+a+3)),i=fe(i,[["enter",l,n]]),i=fe(i,Pn(n.parser.constructs.insideSpan.null,e.slice(r+a+4,o-3),n)),i=fe(i,[["exit",l,n],e[o-2],e[o-1],["exit",c,n]]),i=fe(i,e.slice(o+1)),i=fe(i,[["exit",s,n]]),ye(e,r,e.length,i),e}function ms(e,n,t){const a=this,r=a._labelStarts;let o,i;if(r){for(;r.length>0&&r[r.length-1]._balanced;)r.pop();o=r[r.length-1]}return s;function s(h){return o?o._inactive?u(h):(i=a.parser.defined.includes(Se(a.sliceSerialize({start:o.end,end:a.now()}))),e.enter("labelEnd"),e.enter("labelMarker"),e.consume(h),e.exit("labelMarker"),e.exit("labelEnd"),c):t(h)}function c(h){return h===40?e.attempt(cs,d,i?d:u)(h):h===91?e.attempt(us,d,i?l:u)(h):i?d(h):u(h)}function l(h){return e.attempt(ds,d,u)(h)}function d(h){return r.pop(),n(h)}function u(h){return o._balanced=!0,t(h)}}function gs(e,n,t){return a;function a(u){return e.enter("resource"),e.enter("resourceMarker"),e.consume(u),e.exit("resourceMarker"),r}function r(u){return Z(u)?tn(e,o)(u):o(u)}function o(u){return u===41?d(u):or(e,i,s,"resourceDestination","resourceDestinationLiteral","resourceDestinationLiteralMarker","resourceDestinationRaw","resourceDestinationString",32)(u)}function i(u){return Z(u)?tn(e,c)(u):d(u)}function s(u){return t(u)}function c(u){return u===34||u===39||u===40?lr(e,l,t,"resourceTitle","resourceTitleMarker","resourceTitleString")(u):d(u)}function l(u){return Z(u)?tn(e,d)(u):d(u)}function d(u){return u===41?(e.enter("resourceMarker"),e.consume(u),e.exit("resourceMarker"),e.exit("resource"),n):t(u)}}function fs(e,n,t){const a=this;return r;function r(s){return sr.call(a,e,o,i,"reference","referenceMarker","referenceString")(s)}function o(s){return a.parser.defined.includes(Se(a.sliceSerialize(a.events[a.events.length-1][1]).slice(1,-1)))?n(s):t(s)}function i(s){return t(s)}}function ys(e,n,t){return a;function a(o){return e.enter("reference"),e.enter("referenceMarker"),e.consume(o),e.exit("referenceMarker"),r}function r(o){return o===93?(e.enter("referenceMarker"),e.consume(o),e.exit("referenceMarker"),e.exit("reference"),n):t(o)}}const Ss={name:"labelStartImage",resolveAll:vt.resolveAll,tokenize:bs};function bs(e,n,t){const a=this;let r;return o;function o(c){return e.enter("labelImage"),e.enter("labelImageMarker"),e.consume(c),e.exit("labelImageMarker"),i}function i(c){return c===91?(e.enter("labelMarker"),e.consume(c),e.exit("labelMarker"),r=e.exit("labelImage"),s):t(c)}function s(c){return c===94&&"_hiddenFootnoteSupport"in a.parser.constructs?t(c):(a._labelStarts=a._labelStarts||[],a._labelStarts.push(r),n(c))}}const vs={name:"labelStartLink",resolveAll:vt.resolveAll,tokenize:As};function As(e,n,t){const a=this;let r;return o;function o(s){return e.enter("labelLink"),e.enter("labelMarker"),e.consume(s),e.exit("labelMarker"),r=e.exit("labelLink"),i}function i(s){return s===94&&"_hiddenFootnoteSupport"in a.parser.constructs?t(s):(a._labelStarts=a._labelStarts||[],a._labelStarts.push(r),n(s))}}const On={name:"lineEnding",tokenize:ws};function ws(e,n){return t;function t(a){return e.enter("lineEnding"),e.consume(a),e.exit("lineEnding"),j(e,n,"linePrefix")}}const fn={name:"thematicBreak",tokenize:ks};function ks(e,n,t){let a=0,r;return o;function o(l){return e.enter("thematicBreak"),i(l)}function i(l){return r=l,s(l)}function s(l){return l===r?(e.enter("thematicBreakSequence"),c(l)):a>=3&&(l===null||R(l))?(e.exit("thematicBreak"),n(l)):t(l)}function c(l){return l===r?(e.consume(l),a++,c):(e.exit("thematicBreakSequence"),q(l)?j(e,s,"whitespace")(l):s(l))}}const le={continuation:{tokenize:Ds},exit:Is,name:"list",tokenize:Ps},Cs={partial:!0,tokenize:Es},xs={partial:!0,tokenize:Ws};function Ps(e,n,t){const a=this,r=a.events[a.events.length-1];let o=r&&r[1].type==="linePrefix"?r[2].sliceSerialize(r[1],!0).length:0,i=0;return s;function s(p){const f=a.containerState.type||(p===42||p===43||p===45?"listUnordered":"listOrdered");if(f==="listUnordered"?!a.containerState.marker||p===a.containerState.marker:rt(p)){if(a.containerState.type||(a.containerState.type=f,e.enter(f,{_container:!0})),f==="listUnordered")return e.enter("listItemPrefix"),p===42||p===45?e.check(fn,t,l)(p):l(p);if(!a.interrupt||p===49)return e.enter("listItemPrefix"),e.enter("listItemValue"),c(p)}return t(p)}function c(p){return rt(p)&&++i<10?(e.consume(p),c):(!a.interrupt||i<2)&&(a.containerState.marker?p===a.containerState.marker:p===41||p===46)?(e.exit("listItemValue"),l(p)):t(p)}function l(p){return e.enter("listItemMarker"),e.consume(p),e.exit("listItemMarker"),a.containerState.marker=a.containerState.marker||p,e.check(sn,a.interrupt?t:d,e.attempt(Cs,h,u))}function d(p){return a.containerState.initialBlankLine=!0,o++,h(p)}function u(p){return q(p)?(e.enter("listItemPrefixWhitespace"),e.consume(p),e.exit("listItemPrefixWhitespace"),h):t(p)}function h(p){return a.containerState.size=o+a.sliceSerialize(e.exit("listItemPrefix"),!0).length,n(p)}}function Ds(e,n,t){const a=this;return a.containerState._closeFlow=void 0,e.check(sn,r,o);function r(s){return a.containerState.furtherBlankLines=a.containerState.furtherBlankLines||a.containerState.initialBlankLine,j(e,n,"listItemIndent",a.containerState.size+1)(s)}function o(s){return a.containerState.furtherBlankLines||!q(s)?(a.containerState.furtherBlankLines=void 0,a.containerState.initialBlankLine=void 0,i(s)):(a.containerState.furtherBlankLines=void 0,a.containerState.initialBlankLine=void 0,e.attempt(xs,n,i)(s))}function i(s){return a.containerState._closeFlow=!0,a.interrupt=void 0,j(e,e.attempt(le,n,t),"linePrefix",a.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(s)}}function Ws(e,n,t){const a=this;return j(e,r,"listItemIndent",a.containerState.size+1);function r(o){const i=a.events[a.events.length-1];return i&&i[1].type==="listItemIndent"&&i[2].sliceSerialize(i[1],!0).length===a.containerState.size?n(o):t(o)}}function Is(e){e.exit(this.containerState.type)}function Es(e,n,t){const a=this;return j(e,r,"listItemPrefixWhitespace",a.parser.constructs.disable.null.includes("codeIndented")?void 0:5);function r(o){const i=a.events[a.events.length-1];return!q(o)&&i&&i[1].type==="listItemPrefixWhitespace"?n(o):t(o)}}const la={name:"setextUnderline",resolveTo:zs,tokenize:Ts};function zs(e,n){const t=new vn;let a=e.length,r,o,i;for(;a--;)if(e[a][0]==="enter"){if(e[a][1].type==="content"){r=a;break}e[a][1].type==="paragraph"&&(o=a)}else e[a][1].type==="content"&&t.add(a,1,[]),!i&&e[a][1].type==="definition"&&(i=a);const s={type:"setextHeading",start:{...e[r][1].start},end:{...e[e.length-1][1].end}};return e[o][1].type="setextHeadingText",i?(t.add(o,0,[["enter",s,n]]),t.add(i+1,0,[["exit",e[r][1],n]]),e[r][1].end={...e[i][1].end}):e[r][1]=s,t.add(e.length,0,[["exit",s,n]]),t.consume(e),e}function Ts(e,n,t){const a=this;let r;return o;function o(l){let d=a.events.length,u;for(;d--;)if(a.events[d][1].type!=="lineEnding"&&a.events[d][1].type!=="linePrefix"&&a.events[d][1].type!=="content"){u=a.events[d][1].type==="paragraph";break}return!a.parser.lazy[a.now().line]&&(a.interrupt||u)?(e.enter("setextHeadingLine"),r=l,i(l)):t(l)}function i(l){return e.enter("setextHeadingLineSequence"),s(l)}function s(l){return l===r?(e.consume(l),s):(e.exit("setextHeadingLineSequence"),q(l)?j(e,c,"lineSuffix")(l):c(l))}function c(l){return l===null||R(l)?(e.exit("setextHeadingLine"),n(l)):t(l)}}const Ms={tokenize:Rs};function Rs(e){const n=this,t=e.attempt(sn,a,e.attempt(this.parser.constructs.flowInitial,r,j(e,e.attempt(this.parser.constructs.flow,r,e.attempt(Go,r)),"linePrefix")));return t;function a(o){if(o===null){e.consume(o);return}return e.enter("lineEndingBlank"),e.consume(o),e.exit("lineEndingBlank"),n.currentConstruct=void 0,t}function r(o){if(o===null){e.consume(o);return}return e.enter("lineEnding"),e.consume(o),e.exit("lineEnding"),n.currentConstruct=void 0,t}}const Ls={resolveAll:ur()},Fs=cr("string"),Bs=cr("text");function cr(e){return{resolveAll:ur(e==="text"?Os:void 0),tokenize:n};function n(t){const a=this,r=this.parser.constructs[e],o=t.attempt(r,i,s);return i;function i(d){return l(d)?o(d):s(d)}function s(d){if(d===null){t.consume(d);return}return t.enter("data"),t.consume(d),c}function c(d){return l(d)?(t.exit("data"),o(d)):(t.consume(d),c)}function l(d){if(d===null)return!0;const u=r[d];let h=-1;if(u)for(;++h<u.length;){const p=u[h];if(!p.previous||p.previous.call(a,a.previous))return!0}return!1}}}function ur(e){return n;function n(t,a){let r=-1,o;for(;++r<=t.length;)o===void 0?t[r]&&t[r][1].type==="data"&&(o=r,r++):(!t[r]||t[r][1].type!=="data")&&(r!==o+2&&(t[o][1].end=t[r-1][1].end,t.splice(o+2,r-o-2),r=o+2),o=void 0);return e?e(t,a):t}}function Os(e,n){const t=new vn;let a=0;for(;++a<=e.length;)if((a===e.length||e[a][1].type==="lineEnding")&&e[a-1][1].type==="data"){const r=e[a-1][1],o=n.sliceStream(r);let i=o.length,s=-1,c=0,l;for(;i--;){const d=o[i];if(typeof d=="string"){for(s=d.length;d.charCodeAt(s-1)===32;)c++,s--;if(s)break;s=-1}else if(d===-2)l=!0,c++;else if(d!==-1){i++;break}}if(n._contentTypeTextTrailing&&a===e.length&&(c=0),c){const d={type:a===e.length||l||c<2?"lineSuffix":"hardBreakTrailing",start:{_bufferIndex:i?s:r.start._bufferIndex+s,_index:r.start._index+i,line:r.end.line,column:r.end.column-c,offset:r.end.offset-c},end:{...r.end}};r.end={...d.start},r.start.offset===r.end.offset?Object.assign(r,d):t.add(a,0,[["enter",d,n],["exit",d,n]])}a++}return t.consume(e),e}const Ns={42:le,43:le,45:le,48:le,49:le,50:le,51:le,52:le,53:le,54:le,55:le,56:le,57:le,62:tr},qs={91:Ko},Gs={[-2]:Bn,[-1]:Bn,32:Bn},Vs={35:Jo,42:fn,45:[la,fn],60:ts,61:la,95:fn,96:oa,126:oa},Hs={38:rr,92:ar},js={[-5]:On,[-4]:On,[-3]:On,33:Ss,38:rr,42:it,60:[wo,ss],91:vs,92:[$o,ar],93:vt,95:it,96:Lo},Us={null:[it,Ls]},Ks={null:[42,95]},Qs={null:[]},_s=Object.freeze(Object.defineProperty({__proto__:null,attentionMarkers:Ks,contentInitial:qs,disable:Qs,document:Ns,flow:Vs,flowInitial:Gs,insideSpan:Us,string:Hs,text:js},Symbol.toStringTag,{value:"Module"}));function Zs(e,n,t){let a={_bufferIndex:-1,_index:0,line:t&&t.line||1,column:t&&t.column||1,offset:t&&t.offset||0};const r={},o=[];let i=[],s=[];const c={attempt:T(E),check:T(A),consume:P,enter:k,exit:W,interrupt:T(A,{interrupt:!0})},l={code:null,containerState:{},defineSkip:S,events:[],now:f,parser:e,previous:null,sliceSerialize:h,sliceStream:p,write:u};let d=n.tokenize.call(l,c);return n.resolveAll&&o.push(n),l;function u(D){return i=fe(i,D),w(),i[i.length-1]!==null?[]:(O(n,0),l.events=Pn(o,l.events,l),l.events)}function h(D,z){return Xs(p(D),z)}function p(D){return $s(i,D)}function f(){const{_bufferIndex:D,_index:z,line:G,column:M,offset:I}=a;return{_bufferIndex:D,_index:z,line:G,column:M,offset:I}}function S(D){r[D.line]=D.column,b()}function w(){for(;a._index<i.length;){const D=i[a._index];if(typeof D=="string"){const z=a._index;for(a._bufferIndex<0&&(a._bufferIndex=0);a._index===z&&a._bufferIndex<D.length;)y(D.charCodeAt(a._bufferIndex))}else y(D)}}function y(D){d=d(D)}function P(D){R(D)?(a.line++,a.column=1,a.offset+=D===-3?2:1,b()):D!==-1&&(a.column++,a.offset++),a._bufferIndex<0?a._index++:(a._bufferIndex++,a._bufferIndex===i[a._index].length&&(a._bufferIndex=-1,a._index++)),l.previous=D}function k(D,z){const G=z||{};return G.type=D,G.start=f(),l.events.push(["enter",G,l]),s.push(G),G}function W(D){const z=s.pop();return z.end=f(),l.events.push(["exit",z,l]),z}function E(D,z){O(D,z.from)}function A(D,z){z.restore()}function T(D,z){return G;function G(M,I,V){let J,ne,be,m;return Array.isArray(M)?re(M):"tokenize"in M?re([M]):oe(M);function oe(K){return ve;function ve(me){const se=me!==null&&K[me],De=me!==null&&K.null,Ue=[...Array.isArray(se)?se:se?[se]:[],...Array.isArray(De)?De:De?[De]:[]];return re(Ue)(me)}}function re(K){return J=K,ne=0,K.length===0?V:g(K[ne])}function g(K){return ve;function ve(me){return m=U(),be=K,K.partial||(l.currentConstruct=K),K.name&&l.parser.constructs.disable.null.includes(K.name)?Pe():K.tokenize.call(z?Object.assign(Object.create(l),z):l,c,ue,Pe)(me)}}function ue(K){return D(be,m),I}function Pe(K){return m.restore(),++ne<J.length?g(J[ne]):V}}}function O(D,z){D.resolveAll&&!o.includes(D)&&o.push(D),D.resolve&&ye(l.events,z,l.events.length-z,D.resolve(l.events.slice(z),l)),D.resolveTo&&(l.events=D.resolveTo(l.events,l))}function U(){const D=f(),z=l.previous,G=l.currentConstruct,M=l.events.length,I=Array.from(s);return{from:M,restore:V};function V(){a=D,l.previous=z,l.currentConstruct=G,l.events.length=M,s=I,b()}}function b(){a.line in r&&a.column<2&&(a.column=r[a.line],a.offset+=r[a.line]-1)}}function $s(e,n){const t=n.start._index,a=n.start._bufferIndex,r=n.end._index,o=n.end._bufferIndex;let i;if(t===r)i=[e[t].slice(a,o)];else{if(i=e.slice(t,r),a>-1){const s=i[0];typeof s=="string"?i[0]=s.slice(a):i.shift()}o>0&&i.push(e[r].slice(0,o))}return i}function Xs(e,n){let t=-1;const a=[];let r;for(;++t<e.length;){const o=e[t];let i;if(typeof o=="string")i=o;else switch(o){case-5:{i="\r";break}case-4:{i=`
`;break}case-3:{i=`\r
`;break}case-2:{i=n?" ":"	";break}case-1:{if(!n&&r)continue;i=" ";break}default:i=String.fromCharCode(o)}r=o===-2,a.push(i)}return a.join("")}function Js(e){const a={constructs:Ya([_s,...(e||{}).extensions||[]]),content:r(go),defined:[],document:r(yo),flow:r(Ms),lazy:{},string:r(Fs),text:r(Bs)};return a;function r(o){return i;function i(s){return Zs(a,o,s)}}}function Ys(e){for(;!ir(e););return e}const ca=/[\0\t\n\r]/g;function el(){let e=1,n="",t=!0,a;return r;function r(o,i,s){o=n+(typeof o=="string"?o.toString():new TextDecoder(i||void 0).decode(o));const c=[];let l=0;for(n="",t&&(o.charCodeAt(0)===65279&&l++,t=void 0);l<o.length;){ca.lastIndex=l;const d=ca.exec(o),u=d&&d.index!==void 0?d.index:o.length,h=o.charCodeAt(u);if(!d){n=o.slice(l);break}if(h===10&&l===u&&a)c.push(-3),a=void 0;else switch(a&&(c.push(-5),a=void 0),l<u&&(c.push(o.slice(l,u)),e+=u-l),h){case 0:{c.push(65533),e++;break}case 9:{const p=Math.ceil(e/4)*4;for(c.push(-2);e++<p;)c.push(-1);break}case 10:{c.push(-4),e=1;break}default:a=!0,e=1}l=u+1}return s&&(a&&c.push(-5),n&&c.push(n),c.push(null)),c}}const nl=/\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;function tl(e){return e.replace(nl,al)}function al(e,n,t){if(n)return n;if(t.charCodeAt(0)===35){const r=t.charCodeAt(1),o=r===120||r===88;return er(t.slice(o?2:1),o?16:10)}return bt(t)||e}const dr={}.hasOwnProperty;function rl(e,n,t){return n&&typeof n=="object"&&(t=n,n=void 0),il(t)(Ys(Js(t).document().write(el()(e,n,!0))))}function il(e){const n={afterExit:[],beforeEnter:[],transforms:[],canContainEols:["emphasis","fragment","heading","paragraph","strong"],enter:{autolink:i(cn),autolinkProtocol:b,autolinkEmail:b,atxHeading:i(Oe),blockQuote:i(Ue),characterEscape:b,characterReference:b,codeFenced:i(Fe),codeFencedFenceInfo:s,codeFencedFenceMeta:s,codeIndented:i(Fe,s),codeText:i(Be,s),codeTextData:b,data:b,codeFlowValue:b,definition:i(de),definitionDestinationString:s,definitionLabelString:s,definitionTitleString:s,emphasis:i(X),hardBreakEscape:i(Ne),hardBreakTrailing:i(Ne),htmlFlow:i(We,s),htmlFlowData:b,htmlText:i(We,s),htmlTextData:b,image:i(En),label:s,link:i(cn),listItem:i(zn),listItemValue:p,listOrdered:i(un,h),listUnordered:i(un),paragraph:i(Ke),reference:ue,referenceString:s,resourceDestinationString:s,resourceTitleString:s,setextHeading:i(Oe),strong:i(ke),thematicBreak:i(Qe)},exit:{atxHeading:l(),atxHeadingSequence:A,autolink:l(),autolinkEmail:De,autolinkProtocol:se,blockQuote:l(),characterEscapeValue:D,characterReferenceMarkerHexadecimal:K,characterReferenceMarkerNumeric:K,characterReferenceValue:ve,characterReference:me,codeFenced:l(y),codeFencedFence:w,codeFencedFenceInfo:f,codeFencedFenceMeta:S,codeFlowValue:D,codeIndented:l(P),codeText:l(V),codeTextData:D,data:D,definition:l(),definitionDestinationString:E,definitionLabelString:k,definitionTitleString:W,emphasis:l(),hardBreakEscape:l(G),hardBreakTrailing:l(G),htmlFlow:l(M),htmlFlowData:D,htmlText:l(I),htmlTextData:D,image:l(ne),label:m,labelText:be,lineEnding:z,link:l(J),listItem:l(),listOrdered:l(),listUnordered:l(),paragraph:l(),referenceString:Pe,resourceDestinationString:oe,resourceTitleString:re,resource:g,setextHeading:l(U),setextHeadingLineSequence:O,setextHeadingText:T,strong:l(),thematicBreak:l()}};pr(n,(e||{}).mdastExtensions||[]);const t={};return a;function a(v){let x={type:"root",children:[],position:void 0};const L={stack:[x],tokenStack:[],config:n,enter:c,exit:d,buffer:s,resume:u,data:t},B=[],N=[];let H=-1;for(;++H<v.length;)if(N.push(v[H]),v[H][1].type==="listOrdered"||v[H][1].type==="listUnordered")if(v[H][0]==="enter")B.push(N.length-1);else{const Y=B.pop();o(N,Y)}for(v=N,H=-1;++H<v.length;){const Y=n[v[H][0]];v[H][0]==="enter"&&n.beforeEnter.length>0&&r(n.beforeEnter,{...L,sliceSerialize:v[H][2].sliceSerialize},v[H][1]),dr.call(Y,v[H][1].type)&&Y[v[H][1].type].call({...L,sliceSerialize:v[H][2].sliceSerialize},v[H][1]),v[H][0]==="exit"&&n.afterExit.length>0&&r(n.afterExit,{...L,sliceSerialize:v[H][2].sliceSerialize},v[H][1])}if(L.tokenStack.length>0){const Y=L.tokenStack[L.tokenStack.length-1];(Y[1]||ua).call(L,void 0,Y[0])}for(x.position={start:Ie(v.length>0?v[0][1].start:{line:1,column:1,offset:0}),end:Ie(v.length>0?v[v.length-2][1].end:{line:1,column:1,offset:0})},H=-1;++H<n.transforms.length;)x=n.transforms[H](x)||x;return x}function r(v,x,L){let B=-1;for(;++B<v.length;)v[B].call(x,L)}function o(v,x){const L=v.length-1;let B=x-1,N=-1,H=!1,Y,ge,_e,Ze;const $e=[];for(;++B<=L;){const pe=v[B];switch(pe[1].type){case"listUnordered":case"listOrdered":case"blockQuote":{pe[0]==="enter"?N++:N--,Ze=void 0;break}case"lineEndingBlank":{pe[0]==="enter"&&(Y&&!Ze&&!N&&!_e&&(_e=B),Ze=void 0);break}case"linePrefix":case"listItemValue":case"listItemMarker":case"listItemPrefix":case"listItemPrefixWhitespace":break;default:Ze=void 0}if(!N&&pe[0]==="enter"&&pe[1].type==="listItemPrefix"||N===-1&&pe[0]==="exit"&&(pe[1].type==="listUnordered"||pe[1].type==="listOrdered")){if(Y){let qe=B;for(ge=void 0;qe--;){const Ce=v[qe];if(Ce[1].type==="lineEnding"||Ce[1].type==="lineEndingBlank"){if(Ce[0]==="exit")continue;ge&&(v[ge][1].type="lineEndingBlank",H=!0),Ce[1].type="lineEnding",ge=qe}else if(!(Ce[1].type==="linePrefix"||Ce[1].type==="blockQuotePrefix"||Ce[1].type==="blockQuotePrefixWhitespace"||Ce[1].type==="blockQuoteMarker"||Ce[1].type==="listItemIndent"))break}_e&&(!ge||_e<ge)&&(Y._spread=!0),Y.end=Object.assign({},ge?v[ge][1].start:pe[1].end),$e.push({at:ge||B,event:["exit",Y,pe[2]]})}if(pe[1].type==="listItemPrefix"){const qe={type:"listItem",_spread:!1,start:Object.assign({},pe[1].start),end:void 0};Y=qe,$e.push({at:B,event:["enter",qe,pe[2]]}),_e=void 0,Ze=!0}}}const Mt=v.splice(x);let Mn=0;for(B=-1;++B<Mt.length;){for(;Mn<$e.length&&$e[Mn].at===x+B;)v.push($e[Mn++].event);v.push(Mt[B])}v[x][1]._spread=H}function i(v,x){return L;function L(B){c.call(this,v(B),B),x&&x.call(this,B)}}function s(){this.stack.push({type:"fragment",children:[]})}function c(v,x,L){this.stack[this.stack.length-1].children.push(v),this.stack.push(v),this.tokenStack.push([x,L||void 0]),v.position={start:Ie(x.start),end:void 0}}function l(v){return x;function x(L){v&&v.call(this,L),d.call(this,L)}}function d(v,x){const L=this.stack.pop(),B=this.tokenStack.pop();if(!B)throw new Error("Cannot close `"+v.type+"` ("+nn({start:v.start,end:v.end})+"): it’s not open");B[0].type!==v.type&&(x?x.call(this,v,B[0]):(B[1]||ua).call(this,v,B[0])),L.position.end=Ie(v.end)}function u(){return St(this.stack.pop())}function h(){this.data.expectingFirstListItemValue=!0}function p(v){if(this.data.expectingFirstListItemValue){const x=this.stack[this.stack.length-2];x.start=Number.parseInt(this.sliceSerialize(v),10),this.data.expectingFirstListItemValue=void 0}}function f(){const v=this.resume(),x=this.stack[this.stack.length-1];x.lang=v}function S(){const v=this.resume(),x=this.stack[this.stack.length-1];x.meta=v}function w(){this.data.flowCodeInside||(this.buffer(),this.data.flowCodeInside=!0)}function y(){const v=this.resume(),x=this.stack[this.stack.length-1];x.value=v.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g,""),this.data.flowCodeInside=void 0}function P(){const v=this.resume(),x=this.stack[this.stack.length-1];x.value=v.replace(/(\r?\n|\r)$/g,"")}function k(v){const x=this.resume(),L=this.stack[this.stack.length-1];L.label=x,L.identifier=Se(this.sliceSerialize(v)).toLowerCase()}function W(){const v=this.resume(),x=this.stack[this.stack.length-1];x.title=v}function E(){const v=this.resume(),x=this.stack[this.stack.length-1];x.url=v}function A(v){const x=this.stack[this.stack.length-1];if(!x.depth){const L=this.sliceSerialize(v).length;x.depth=L}}function T(){this.data.setextHeadingSlurpLineEnding=!0}function O(v){const x=this.stack[this.stack.length-1];x.depth=this.sliceSerialize(v).codePointAt(0)===61?1:2}function U(){this.data.setextHeadingSlurpLineEnding=void 0}function b(v){const L=this.stack[this.stack.length-1].children;let B=L[L.length-1];(!B||B.type!=="text")&&(B=Tn(),B.position={start:Ie(v.start),end:void 0},L.push(B)),this.stack.push(B)}function D(v){const x=this.stack.pop();x.value+=this.sliceSerialize(v),x.position.end=Ie(v.end)}function z(v){const x=this.stack[this.stack.length-1];if(this.data.atHardBreak){const L=x.children[x.children.length-1];L.position.end=Ie(v.end),this.data.atHardBreak=void 0;return}!this.data.setextHeadingSlurpLineEnding&&n.canContainEols.includes(x.type)&&(b.call(this,v),D.call(this,v))}function G(){this.data.atHardBreak=!0}function M(){const v=this.resume(),x=this.stack[this.stack.length-1];x.value=v}function I(){const v=this.resume(),x=this.stack[this.stack.length-1];x.value=v}function V(){const v=this.resume(),x=this.stack[this.stack.length-1];x.value=v}function J(){const v=this.stack[this.stack.length-1];if(this.data.inReference){const x=this.data.referenceType||"shortcut";v.type+="Reference",v.referenceType=x,delete v.url,delete v.title}else delete v.identifier,delete v.label;this.data.referenceType=void 0}function ne(){const v=this.stack[this.stack.length-1];if(this.data.inReference){const x=this.data.referenceType||"shortcut";v.type+="Reference",v.referenceType=x,delete v.url,delete v.title}else delete v.identifier,delete v.label;this.data.referenceType=void 0}function be(v){const x=this.sliceSerialize(v),L=this.stack[this.stack.length-2];L.label=tl(x),L.identifier=Se(x).toLowerCase()}function m(){const v=this.stack[this.stack.length-1],x=this.resume(),L=this.stack[this.stack.length-1];if(this.data.inReference=!0,L.type==="link"){const B=v.children;L.children=B}else L.alt=x}function oe(){const v=this.resume(),x=this.stack[this.stack.length-1];x.url=v}function re(){const v=this.resume(),x=this.stack[this.stack.length-1];x.title=v}function g(){this.data.inReference=void 0}function ue(){this.data.referenceType="collapsed"}function Pe(v){const x=this.resume(),L=this.stack[this.stack.length-1];L.label=x,L.identifier=Se(this.sliceSerialize(v)).toLowerCase(),this.data.referenceType="full"}function K(v){this.data.characterReferenceType=v.type}function ve(v){const x=this.sliceSerialize(v),L=this.data.characterReferenceType;let B;L?(B=er(x,L==="characterReferenceMarkerNumeric"?10:16),this.data.characterReferenceType=void 0):B=bt(x);const N=this.stack[this.stack.length-1];N.value+=B}function me(v){const x=this.stack.pop();x.position.end=Ie(v.end)}function se(v){D.call(this,v);const x=this.stack[this.stack.length-1];x.url=this.sliceSerialize(v)}function De(v){D.call(this,v);const x=this.stack[this.stack.length-1];x.url="mailto:"+this.sliceSerialize(v)}function Ue(){return{type:"blockquote",children:[],position:void 0}}function Fe(){return{type:"code",lang:null,meta:null,value:"",position:void 0}}function Be(){return{type:"inlineCode",value:"",position:void 0}}function de(){return{type:"definition",identifier:"",label:null,title:null,url:"",position:void 0}}function X(){return{type:"emphasis",children:[],position:void 0}}function Oe(){return{type:"heading",depth:0,children:[],position:void 0}}function Ne(){return{type:"break",position:void 0}}function We(){return{type:"html",value:"",position:void 0}}function En(){return{type:"image",title:null,url:"",alt:null,position:void 0}}function cn(){return{type:"link",title:null,url:"",children:[],position:void 0}}function un(v){return{type:"list",ordered:v.type==="listOrdered",start:null,spread:v._spread,children:[],position:void 0}}function zn(v){return{type:"listItem",spread:v._spread,checked:null,children:[],position:void 0}}function Ke(){return{type:"paragraph",children:[],position:void 0}}function ke(){return{type:"strong",children:[],position:void 0}}function Tn(){return{type:"text",value:"",position:void 0}}function Qe(){return{type:"thematicBreak",position:void 0}}}function Ie(e){return{line:e.line,column:e.column,offset:e.offset}}function pr(e,n){let t=-1;for(;++t<n.length;){const a=n[t];Array.isArray(a)?pr(e,a):ol(e,a)}}function ol(e,n){let t;for(t in n)if(dr.call(n,t))switch(t){case"canContainEols":{const a=n[t];a&&e[t].push(...a);break}case"transforms":{const a=n[t];a&&e[t].push(...a);break}case"afterExit":case"beforeEnter":{const a=n[t];a&&e[t].push(a);break}case"enter":case"exit":{const a=n[t];a&&Object.assign(e[t],a);break}}}function ua(e,n){throw e?new Error("Cannot close `"+e.type+"` ("+nn({start:e.start,end:e.end})+"): a different token (`"+n.type+"`, "+nn({start:n.start,end:n.end})+") is open"):new Error("Cannot close document, a token (`"+n.type+"`, "+nn({start:n.start,end:n.end})+") is still open")}function sl(e){const n=this;n.parser=t;function t(a){return rl(a,{...n.data("settings"),...e,extensions:n.data("micromarkExtensions")||[],mdastExtensions:n.data("fromMarkdownExtensions")||[]})}}function ll(e,n){const t={type:"element",tagName:"blockquote",properties:{},children:e.wrap(e.all(n),!0)};return e.patch(n,t),e.applyData(n,t)}function cl(e,n){const t={type:"element",tagName:"br",properties:{},children:[]};return e.patch(n,t),[e.applyData(n,t),{type:"text",value:`
`}]}function ul(e,n){const t=n.value?n.value+`
`:"",a={},r=n.lang?n.lang.split(/\s+/):[];r.length>0&&(a.className=["language-"+r[0]]);let o={type:"element",tagName:"code",properties:a,children:[{type:"text",value:t}]};return n.meta&&(o.data={meta:n.meta}),e.patch(n,o),o=e.applyData(n,o),o={type:"element",tagName:"pre",properties:{},children:[o]},e.patch(n,o),o}function dl(e,n){const t={type:"element",tagName:"del",properties:{},children:e.all(n)};return e.patch(n,t),e.applyData(n,t)}function pl(e,n){const t={type:"element",tagName:"em",properties:{},children:e.all(n)};return e.patch(n,t),e.applyData(n,t)}function hl(e,n){const t=typeof e.options.clobberPrefix=="string"?e.options.clobberPrefix:"user-content-",a=String(n.identifier).toUpperCase(),r=je(a.toLowerCase()),o=e.footnoteOrder.indexOf(a);let i,s=e.footnoteCounts.get(a);s===void 0?(s=0,e.footnoteOrder.push(a),i=e.footnoteOrder.length):i=o+1,s+=1,e.footnoteCounts.set(a,s);const c={type:"element",tagName:"a",properties:{href:"#"+t+"fn-"+r,id:t+"fnref-"+r+(s>1?"-"+s:""),dataFootnoteRef:!0,ariaDescribedBy:["footnote-label"]},children:[{type:"text",value:String(i)}]};e.patch(n,c);const l={type:"element",tagName:"sup",properties:{},children:[c]};return e.patch(n,l),e.applyData(n,l)}function ml(e,n){const t={type:"element",tagName:"h"+n.depth,properties:{},children:e.all(n)};return e.patch(n,t),e.applyData(n,t)}function gl(e,n){if(e.options.allowDangerousHtml){const t={type:"raw",value:n.value};return e.patch(n,t),e.applyData(n,t)}}function hr(e,n){const t=n.referenceType;let a="]";if(t==="collapsed"?a+="[]":t==="full"&&(a+="["+(n.label||n.identifier)+"]"),n.type==="imageReference")return[{type:"text",value:"!["+n.alt+a}];const r=e.all(n),o=r[0];o&&o.type==="text"?o.value="["+o.value:r.unshift({type:"text",value:"["});const i=r[r.length-1];return i&&i.type==="text"?i.value+=a:r.push({type:"text",value:a}),r}function fl(e,n){const t=String(n.identifier).toUpperCase(),a=e.definitionById.get(t);if(!a)return hr(e,n);const r={src:je(a.url||""),alt:n.alt};a.title!==null&&a.title!==void 0&&(r.title=a.title);const o={type:"element",tagName:"img",properties:r,children:[]};return e.patch(n,o),e.applyData(n,o)}function yl(e,n){const t={src:je(n.url)};n.alt!==null&&n.alt!==void 0&&(t.alt=n.alt),n.title!==null&&n.title!==void 0&&(t.title=n.title);const a={type:"element",tagName:"img",properties:t,children:[]};return e.patch(n,a),e.applyData(n,a)}function Sl(e,n){const t={type:"text",value:n.value.replace(/\r?\n|\r/g," ")};e.patch(n,t);const a={type:"element",tagName:"code",properties:{},children:[t]};return e.patch(n,a),e.applyData(n,a)}function bl(e,n){const t=String(n.identifier).toUpperCase(),a=e.definitionById.get(t);if(!a)return hr(e,n);const r={href:je(a.url||"")};a.title!==null&&a.title!==void 0&&(r.title=a.title);const o={type:"element",tagName:"a",properties:r,children:e.all(n)};return e.patch(n,o),e.applyData(n,o)}function vl(e,n){const t={href:je(n.url)};n.title!==null&&n.title!==void 0&&(t.title=n.title);const a={type:"element",tagName:"a",properties:t,children:e.all(n)};return e.patch(n,a),e.applyData(n,a)}function Al(e,n,t){const a=e.all(n),r=t?wl(t):mr(n),o={},i=[];if(typeof n.checked=="boolean"){const d=a[0];let u;d&&d.type==="element"&&d.tagName==="p"?u=d:(u={type:"element",tagName:"p",properties:{},children:[]},a.unshift(u)),u.children.length>0&&u.children.unshift({type:"text",value:" "}),u.children.unshift({type:"element",tagName:"input",properties:{type:"checkbox",checked:n.checked,disabled:!0},children:[]}),o.className=["task-list-item"]}let s=-1;for(;++s<a.length;){const d=a[s];(r||s!==0||d.type!=="element"||d.tagName!=="p")&&i.push({type:"text",value:`
`}),d.type==="element"&&d.tagName==="p"&&!r?i.push(...d.children):i.push(d)}const c=a[a.length-1];c&&(r||c.type!=="element"||c.tagName!=="p")&&i.push({type:"text",value:`
`});const l={type:"element",tagName:"li",properties:o,children:i};return e.patch(n,l),e.applyData(n,l)}function wl(e){let n=!1;if(e.type==="list"){n=e.spread||!1;const t=e.children;let a=-1;for(;!n&&++a<t.length;)n=mr(t[a])}return n}function mr(e){const n=e.spread;return n??e.children.length>1}function kl(e,n){const t={},a=e.all(n);let r=-1;for(typeof n.start=="number"&&n.start!==1&&(t.start=n.start);++r<a.length;){const i=a[r];if(i.type==="element"&&i.tagName==="li"&&i.properties&&Array.isArray(i.properties.className)&&i.properties.className.includes("task-list-item")){t.className=["contains-task-list"];break}}const o={type:"element",tagName:n.ordered?"ol":"ul",properties:t,children:e.wrap(a,!0)};return e.patch(n,o),e.applyData(n,o)}function Cl(e,n){const t={type:"element",tagName:"p",properties:{},children:e.all(n)};return e.patch(n,t),e.applyData(n,t)}function xl(e,n){const t={type:"root",children:e.wrap(e.all(n))};return e.patch(n,t),e.applyData(n,t)}function Pl(e,n){const t={type:"element",tagName:"strong",properties:{},children:e.all(n)};return e.patch(n,t),e.applyData(n,t)}function Dl(e,n){const t=e.all(n),a=t.shift(),r=[];if(a){const i={type:"element",tagName:"thead",properties:{},children:e.wrap([a],!0)};e.patch(n.children[0],i),r.push(i)}if(t.length>0){const i={type:"element",tagName:"tbody",properties:{},children:e.wrap(t,!0)},s=mt(n.children[1]),c=Ka(n.children[n.children.length-1]);s&&c&&(i.position={start:s,end:c}),r.push(i)}const o={type:"element",tagName:"table",properties:{},children:e.wrap(r,!0)};return e.patch(n,o),e.applyData(n,o)}function Wl(e,n,t){const a=t?t.children:void 0,o=(a?a.indexOf(n):1)===0?"th":"td",i=t&&t.type==="table"?t.align:void 0,s=i?i.length:n.children.length;let c=-1;const l=[];for(;++c<s;){const u=n.children[c],h={},p=i?i[c]:void 0;p&&(h.align=p);let f={type:"element",tagName:o,properties:h,children:[]};u&&(f.children=e.all(u),e.patch(u,f),f=e.applyData(u,f)),l.push(f)}const d={type:"element",tagName:"tr",properties:{},children:e.wrap(l,!0)};return e.patch(n,d),e.applyData(n,d)}function Il(e,n){const t={type:"element",tagName:"td",properties:{},children:e.all(n)};return e.patch(n,t),e.applyData(n,t)}const da=9,pa=32;function El(e){const n=String(e),t=/\r?\n|\r/g;let a=t.exec(n),r=0;const o=[];for(;a;)o.push(ha(n.slice(r,a.index),r>0,!0),a[0]),r=a.index+a[0].length,a=t.exec(n);return o.push(ha(n.slice(r),r>0,!1)),o.join("")}function ha(e,n,t){let a=0,r=e.length;if(n){let o=e.codePointAt(a);for(;o===da||o===pa;)a++,o=e.codePointAt(a)}if(t){let o=e.codePointAt(r-1);for(;o===da||o===pa;)r--,o=e.codePointAt(r-1)}return r>a?e.slice(a,r):""}function zl(e,n){const t={type:"text",value:El(String(n.value))};return e.patch(n,t),e.applyData(n,t)}function Tl(e,n){const t={type:"element",tagName:"hr",properties:{},children:[]};return e.patch(n,t),e.applyData(n,t)}const Ml={blockquote:ll,break:cl,code:ul,delete:dl,emphasis:pl,footnoteReference:hl,heading:ml,html:gl,imageReference:fl,image:yl,inlineCode:Sl,linkReference:bl,link:vl,listItem:Al,list:kl,paragraph:Cl,root:xl,strong:Pl,table:Dl,tableCell:Il,tableRow:Wl,text:zl,thematicBreak:Tl,toml:pn,yaml:pn,definition:pn,footnoteDefinition:pn};function pn(){}const gr=-1,Dn=0,an=1,wn=2,At=3,wt=4,kt=5,Ct=6,fr=7,yr=8,{defineProperty:Rl}=Object,Sr=typeof self=="object"?self:globalThis,ma=(e,n)=>{switch(e){case"Function":case"SharedWorker":case"Worker":case"eval":case"setInterval":case"setTimeout":throw new TypeError("unable to deserialize "+e)}return new Sr[e](n)},Ll=(e,n)=>{const t=(r,o)=>(e.set(o,r),r),a=r=>{if(e.has(r))return e.get(r);const[o,i]=n[r];switch(o){case Dn:case gr:return t(i,r);case an:{const s=t([],r);for(const c of i)s.push(a(c));return s}case wn:{const s=t({},r);for(const[c,l]of i){const d=a(c),u=a(l);d==="__proto__"?Rl(s,d,{value:u,configurable:!0,enumerable:!0,writable:!0}):s[d]=u}return s}case At:return t(new Date(i),r);case wt:{const{source:s,flags:c}=i;return t(new RegExp(s,c),r)}case kt:{const s=t(new Map,r);for(const[c,l]of i)s.set(a(c),a(l));return s}case Ct:{const s=t(new Set,r);for(const c of i)s.add(a(c));return s}case fr:{const{name:s,message:c}=i;return t(typeof Sr[s]=="function"?ma(s,c):new Error(c),r)}case yr:return t(BigInt(i),r);case"BigInt":return t(Object(BigInt(i)),r);case"ArrayBuffer":return t(new Uint8Array(i).buffer,i);case"DataView":{const{buffer:s}=new Uint8Array(i);return t(new DataView(s),i)}case"-0":return-0}return t(ma(o,i),r)};return a},ga=e=>Ll(new Map,e)(0),Te="",{toString:Fl}={},{keys:Bl,is:Ol}=Object,en=e=>{const n=typeof e;if(n!=="object"||!e)return[Dn,n];const t=Fl.call(e).slice(8,-1);switch(t){case"Array":return[an,Te];case"Object":return[wn,Te];case"Date":return[At,Te];case"RegExp":return[wt,Te];case"Map":return[kt,Te];case"Set":return[Ct,Te];case"DataView":return[an,t]}return t.includes("Array")?[an,t]:e instanceof Error?[fr,e.name||"Error"]:[wn,t]},hn=([e,n])=>e===Dn&&(n==="function"||n==="symbol"),Nl=(e,n,t,a)=>{const r=(i,s)=>{const c=a.push(i)-1;return t.set(s,c),c},o=i=>{if(t.has(i))return t.get(i);let[s,c]=en(i);switch(s){case Dn:{let d=i;switch(c){case"bigint":s=yr,d=i.toString();break;case"number":if(!i&&Ol(i,-0))return a.push(["-0"])-1;break;case"function":case"symbol":if(e)throw new TypeError("unable to serialize "+c);d=null;break;case"undefined":return r([gr],i)}return r([s,d],i)}case an:{if(c){let h=i;return c==="DataView"?h=new Uint8Array(i.buffer):c==="ArrayBuffer"&&(h=new Uint8Array(i)),r([c,[...h]],i)}const d=[],u=r([s,d],i);for(const h of i)d.push(o(h));return u}case wn:{if(c)switch(c){case"BigInt":return r([c,i.toString()],i);case"Boolean":case"Number":case"String":return r([c,i.valueOf()],i)}if(n&&"toJSON"in i)return o(i.toJSON());const d=[],u=r([s,d],i);for(const h of Bl(i))(e||!hn(en(i[h])))&&d.push([o(h),o(i[h])]);return u}case At:return r([s,isNaN(i.getTime())?Te:i.toISOString()],i);case wt:{const{source:d,flags:u}=i;return r([s,{source:d,flags:u}],i)}case kt:{const d=[],u=r([s,d],i);for(const[h,p]of i)(e||!(hn(en(h))||hn(en(p))))&&d.push([o(h),o(p)]);return u}case Ct:{const d=[],u=r([s,d],i);for(const h of i)(e||!hn(en(h)))&&d.push(o(h));return u}}const{message:l}=i;return r([s,{name:c,message:l}],i)};return o},fa=(e,{json:n,lossy:t}={})=>{const a=[];return Nl(!(n||t),!!n,new Map,a)(e),a},kn=typeof structuredClone=="function"?(e,n)=>n&&("json"in n||"lossy"in n)?ga(fa(e,n)):structuredClone(e):(e,n)=>ga(fa(e,n));function ql(e,n){const t=[{type:"text",value:"↩"}];return n>1&&t.push({type:"element",tagName:"sup",properties:{},children:[{type:"text",value:String(n)}]}),t}function Gl(e,n){return"Back to reference "+(e+1)+(n>1?"-"+n:"")}function Vl(e){const n=typeof e.options.clobberPrefix=="string"?e.options.clobberPrefix:"user-content-",t=e.options.footnoteBackContent||ql,a=e.options.footnoteBackLabel||Gl,r=e.options.footnoteLabel||"Footnotes",o=e.options.footnoteLabelTagName||"h2",i=e.options.footnoteLabelProperties||{className:["sr-only"]},s=[];let c=-1;for(;++c<e.footnoteOrder.length;){const l=e.footnoteById.get(e.footnoteOrder[c]);if(!l)continue;const d=e.all(l),u=String(l.identifier).toUpperCase(),h=je(u.toLowerCase());let p=0;const f=[],S=e.footnoteCounts.get(u);for(;S!==void 0&&++p<=S;){f.length>0&&f.push({type:"text",value:" "});let P=typeof t=="string"?t:t(c,p);typeof P=="string"&&(P={type:"text",value:P}),f.push({type:"element",tagName:"a",properties:{href:"#"+n+"fnref-"+h+(p>1?"-"+p:""),dataFootnoteBackref:"",ariaLabel:typeof a=="string"?a:a(c,p),className:["data-footnote-backref"]},children:Array.isArray(P)?P:[P]})}const w=d[d.length-1];if(w&&w.type==="element"&&w.tagName==="p"){const P=w.children[w.children.length-1];P&&P.type==="text"?P.value+=" ":w.children.push({type:"text",value:" "}),w.children.push(...f)}else d.push(...f);const y={type:"element",tagName:"li",properties:{id:n+"fn-"+h},children:e.wrap(d,!0)};e.patch(l,y),s.push(y)}if(s.length!==0)return{type:"element",tagName:"section",properties:{dataFootnotes:!0,className:["footnotes"]},children:[{type:"element",tagName:o,properties:{...kn(i),id:"footnote-label"},children:[{type:"text",value:r}]},{type:"text",value:`
`},{type:"element",tagName:"ol",properties:{},children:e.wrap(s,!0)},{type:"text",value:`
`}]}}const Wn=(function(e){if(e==null)return Kl;if(typeof e=="function")return In(e);if(typeof e=="object")return Array.isArray(e)?Hl(e):jl(e);if(typeof e=="string")return Ul(e);throw new Error("Expected function, string, or object as test")});function Hl(e){const n=[];let t=-1;for(;++t<e.length;)n[t]=Wn(e[t]);return In(a);function a(...r){let o=-1;for(;++o<n.length;)if(n[o].apply(this,r))return!0;return!1}}function jl(e){const n=e;return In(t);function t(a){const r=a;let o;for(o in e)if(r[o]!==n[o])return!1;return!0}}function Ul(e){return In(n);function n(t){return t&&t.type===e}}function In(e){return n;function n(t,a,r){return!!(Ql(t)&&e.call(this,t,typeof a=="number"?a:void 0,r||void 0))}}function Kl(){return!0}function Ql(e){return e!==null&&typeof e=="object"&&"type"in e}const br=[],_l=!0,st=!1,Zl="skip";function vr(e,n,t,a){let r;typeof n=="function"&&typeof t!="function"?(a=t,t=n):r=n;const o=Wn(r),i=a?-1:1;s(e,void 0,[])();function s(c,l,d){const u=c&&typeof c=="object"?c:{};if(typeof u.type=="string"){const p=typeof u.tagName=="string"?u.tagName:typeof u.name=="string"?u.name:void 0;Object.defineProperty(h,"name",{value:"node ("+(c.type+(p?"<"+p+">":""))+")"})}return h;function h(){let p=br,f,S,w;if((!n||o(c,l,d[d.length-1]||void 0))&&(p=$l(t(c,d)),p[0]===st))return p;if("children"in c&&c.children){const y=c;if(y.children&&p[0]!==Zl)for(S=(a?y.children.length:-1)+i,w=d.concat(y);S>-1&&S<y.children.length;){const P=y.children[S];if(f=s(P,S,w)(),f[0]===st)return f;S=typeof f[1]=="number"?f[1]:S+i}}return p}}}function $l(e){return Array.isArray(e)?e:typeof e=="number"?[_l,e]:e==null?br:[e]}function xt(e,n,t,a){let r,o,i;typeof n=="function"&&typeof t!="function"?(o=void 0,i=n,r=t):(o=n,i=t,r=a),vr(e,o,s,r);function s(c,l){const d=l[l.length-1],u=d?d.children.indexOf(c):void 0;return i(c,u,d)}}const lt={}.hasOwnProperty,Xl={};function Jl(e,n){const t=n||Xl,a=new Map,r=new Map,o=new Map,i={...Ml,...t.handlers},s={all:l,applyData:ec,definitionById:a,footnoteById:r,footnoteCounts:o,footnoteOrder:[],handlers:i,one:c,options:t,patch:Yl,wrap:tc};return xt(e,function(d){if(d.type==="definition"||d.type==="footnoteDefinition"){const u=d.type==="definition"?a:r,h=String(d.identifier).toUpperCase();u.has(h)||u.set(h,d)}}),s;function c(d,u){const h=d.type,p=s.handlers[h];if(lt.call(s.handlers,h)&&p)return p(s,d,u);if(s.options.passThrough&&s.options.passThrough.includes(h)){if("children"in d){const{children:S,...w}=d,y=kn(w);return y.children=s.all(d),y}return kn(d)}return(s.options.unknownHandler||nc)(s,d,u)}function l(d){const u=[];if("children"in d){const h=d.children;let p=-1;for(;++p<h.length;){const f=s.one(h[p],d);if(f){if(p&&h[p-1].type==="break"&&(!Array.isArray(f)&&f.type==="text"&&(f.value=ya(f.value)),!Array.isArray(f)&&f.type==="element")){const S=f.children[0];S&&S.type==="text"&&(S.value=ya(S.value))}Array.isArray(f)?u.push(...f):u.push(f)}}}return u}}function Yl(e,n){e.position&&(n.position=qi(e))}function ec(e,n){let t=n;if(e&&e.data){const a=e.data.hName,r=e.data.hChildren,o=e.data.hProperties;if(typeof a=="string")if(t.type==="element")t.tagName=a;else{const i="children"in t?t.children:[t];t={type:"element",tagName:a,properties:{},children:i}}t.type==="element"&&o&&Object.assign(t.properties,kn(o)),"children"in t&&t.children&&r!==null&&r!==void 0&&(t.children=r)}return t}function nc(e,n){const t=n.data||{},a="value"in n&&!(lt.call(t,"hProperties")||lt.call(t,"hChildren"))?{type:"text",value:n.value}:{type:"element",tagName:"div",properties:{},children:e.all(n)};return e.patch(n,a),e.applyData(n,a)}function tc(e,n){const t=[];let a=-1;for(n&&t.push({type:"text",value:`
`});++a<e.length;)a&&t.push({type:"text",value:`
`}),t.push(e[a]);return n&&e.length>0&&t.push({type:"text",value:`
`}),t}function ya(e){let n=0,t=e.charCodeAt(n);for(;t===9||t===32;)n++,t=e.charCodeAt(n);return e.slice(n)}function Sa(e,n){const t=Jl(e,n),a=t.one(e,void 0),r=Vl(t),o=Array.isArray(a)?{type:"root",children:a}:a||{type:"root",children:[]};return r&&o.children.push({type:"text",value:`
`},r),o}function ac(e,n){return e&&"run"in e?async function(t,a){const r=Sa(t,{file:a,...n});await e.run(r,a)}:function(t,a){return Sa(t,{file:a,...e||n})}}function ba(e){if(e)throw e}var Nn,va;function rc(){if(va)return Nn;va=1;var e=Object.prototype.hasOwnProperty,n=Object.prototype.toString,t=Object.defineProperty,a=Object.getOwnPropertyDescriptor,r=function(l){return typeof Array.isArray=="function"?Array.isArray(l):n.call(l)==="[object Array]"},o=function(l){if(!l||n.call(l)!=="[object Object]")return!1;var d=e.call(l,"constructor"),u=l.constructor&&l.constructor.prototype&&e.call(l.constructor.prototype,"isPrototypeOf");if(l.constructor&&!d&&!u)return!1;var h;for(h in l);return typeof h>"u"||e.call(l,h)},i=function(l,d){t&&d.name==="__proto__"?t(l,d.name,{enumerable:!0,configurable:!0,value:d.newValue,writable:!0}):l[d.name]=d.newValue},s=function(l,d){if(d==="__proto__")if(e.call(l,d)){if(a)return a(l,d).value}else return;return l[d]};return Nn=function c(){var l,d,u,h,p,f,S=arguments[0],w=1,y=arguments.length,P=!1;for(typeof S=="boolean"&&(P=S,S=arguments[1]||{},w=2),(S==null||typeof S!="object"&&typeof S!="function")&&(S={});w<y;++w)if(l=arguments[w],l!=null)for(d in l)u=s(S,d),h=s(l,d),S!==h&&(P&&h&&(o(h)||(p=r(h)))?(p?(p=!1,f=u&&r(u)?u:[]):f=u&&o(u)?u:{},i(S,{name:d,newValue:c(P,f,h)})):typeof h<"u"&&i(S,{name:d,newValue:h}));return S},Nn}var ic=rc();const qn=Ba(ic);function ct(e){if(typeof e!="object"||e===null)return!1;const n=Object.getPrototypeOf(e);return(n===null||n===Object.prototype||Object.getPrototypeOf(n)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function oc(){const e=[],n={run:t,use:a};return n;function t(...r){let o=-1;const i=r.pop();if(typeof i!="function")throw new TypeError("Expected function as last argument, not "+i);s(null,...r);function s(c,...l){const d=e[++o];let u=-1;if(c){i(c);return}for(;++u<r.length;)(l[u]===null||l[u]===void 0)&&(l[u]=r[u]);r=l,d?sc(d,s)(...l):i(null,...l)}}function a(r){if(typeof r!="function")throw new TypeError("Expected `middelware` to be a function, not "+r);return e.push(r),n}}function sc(e,n){let t;return a;function a(...i){const s=e.length>i.length;let c;s&&i.push(r);try{c=e.apply(this,i)}catch(l){const d=l;if(s&&t)throw d;return r(d)}s||(c&&c.then&&typeof c.then=="function"?c.then(o,r):c instanceof Error?r(c):o(c))}function r(i,...s){t||(t=!0,n(i,...s))}function o(i){r(null,i)}}const Ae={basename:lc,dirname:cc,extname:uc,join:dc,sep:"/"};function lc(e,n){if(n!==void 0&&typeof n!="string")throw new TypeError('"ext" argument must be a string');ln(e);let t=0,a=-1,r=e.length,o;if(n===void 0||n.length===0||n.length>e.length){for(;r--;)if(e.codePointAt(r)===47){if(o){t=r+1;break}}else a<0&&(o=!0,a=r+1);return a<0?"":e.slice(t,a)}if(n===e)return"";let i=-1,s=n.length-1;for(;r--;)if(e.codePointAt(r)===47){if(o){t=r+1;break}}else i<0&&(o=!0,i=r+1),s>-1&&(e.codePointAt(r)===n.codePointAt(s--)?s<0&&(a=r):(s=-1,a=i));return t===a?a=i:a<0&&(a=e.length),e.slice(t,a)}function cc(e){if(ln(e),e.length===0)return".";let n=-1,t=e.length,a;for(;--t;)if(e.codePointAt(t)===47){if(a){n=t;break}}else a||(a=!0);return n<0?e.codePointAt(0)===47?"/":".":n===1&&e.codePointAt(0)===47?"//":e.slice(0,n)}function uc(e){ln(e);let n=e.length,t=-1,a=0,r=-1,o=0,i;for(;n--;){const s=e.codePointAt(n);if(s===47){if(i){a=n+1;break}continue}t<0&&(i=!0,t=n+1),s===46?r<0?r=n:o!==1&&(o=1):r>-1&&(o=-1)}return r<0||t<0||o===0||o===1&&r===t-1&&r===a+1?"":e.slice(r,t)}function dc(...e){let n=-1,t;for(;++n<e.length;)ln(e[n]),e[n]&&(t=t===void 0?e[n]:t+"/"+e[n]);return t===void 0?".":pc(t)}function pc(e){ln(e);const n=e.codePointAt(0)===47;let t=hc(e,!n);return t.length===0&&!n&&(t="."),t.length>0&&e.codePointAt(e.length-1)===47&&(t+="/"),n?"/"+t:t}function hc(e,n){let t="",a=0,r=-1,o=0,i=-1,s,c;for(;++i<=e.length;){if(i<e.length)s=e.codePointAt(i);else{if(s===47)break;s=47}if(s===47){if(!(r===i-1||o===1))if(r!==i-1&&o===2){if(t.length<2||a!==2||t.codePointAt(t.length-1)!==46||t.codePointAt(t.length-2)!==46){if(t.length>2){if(c=t.lastIndexOf("/"),c!==t.length-1){c<0?(t="",a=0):(t=t.slice(0,c),a=t.length-1-t.lastIndexOf("/")),r=i,o=0;continue}}else if(t.length>0){t="",a=0,r=i,o=0;continue}}n&&(t=t.length>0?t+"/..":"..",a=2)}else t.length>0?t+="/"+e.slice(r+1,i):t=e.slice(r+1,i),a=i-r-1;r=i,o=0}else s===46&&o>-1?o++:o=-1}return t}function ln(e){if(typeof e!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(e))}const mc={cwd:gc};function gc(){return"/"}function ut(e){return!!(e!==null&&typeof e=="object"&&"href"in e&&e.href&&"protocol"in e&&e.protocol&&e.auth===void 0)}function fc(e){if(typeof e=="string")e=new URL(e);else if(!ut(e)){const n=new TypeError('The "path" argument must be of type string or an instance of URL. Received `'+e+"`");throw n.code="ERR_INVALID_ARG_TYPE",n}if(e.protocol!=="file:"){const n=new TypeError("The URL must be of scheme file");throw n.code="ERR_INVALID_URL_SCHEME",n}return yc(e)}function yc(e){if(e.hostname!==""){const a=new TypeError('File URL host must be "localhost" or empty on darwin');throw a.code="ERR_INVALID_FILE_URL_HOST",a}const n=e.pathname;let t=-1;for(;++t<n.length;)if(n.codePointAt(t)===37&&n.codePointAt(t+1)===50){const a=n.codePointAt(t+2);if(a===70||a===102){const r=new TypeError("File URL path must not include encoded / characters");throw r.code="ERR_INVALID_FILE_URL_PATH",r}}return decodeURIComponent(n)}const Gn=["history","path","basename","stem","extname","dirname"];class Ar{constructor(n){let t;n?ut(n)?t={path:n}:typeof n=="string"||Sc(n)?t={value:n}:t=n:t={},this.cwd="cwd"in t?"":mc.cwd(),this.data={},this.history=[],this.messages=[],this.value,this.map,this.result,this.stored;let a=-1;for(;++a<Gn.length;){const o=Gn[a];o in t&&t[o]!==void 0&&t[o]!==null&&(this[o]=o==="history"?[...t[o]]:t[o])}let r;for(r in t)Gn.includes(r)||(this[r]=t[r])}get basename(){return typeof this.path=="string"?Ae.basename(this.path):void 0}set basename(n){Hn(n,"basename"),Vn(n,"basename"),this.path=Ae.join(this.dirname||"",n)}get dirname(){return typeof this.path=="string"?Ae.dirname(this.path):void 0}set dirname(n){Aa(this.basename,"dirname"),this.path=Ae.join(n||"",this.basename)}get extname(){return typeof this.path=="string"?Ae.extname(this.path):void 0}set extname(n){if(Vn(n,"extname"),Aa(this.dirname,"extname"),n){if(n.codePointAt(0)!==46)throw new Error("`extname` must start with `.`");if(n.includes(".",1))throw new Error("`extname` cannot contain multiple dots")}this.path=Ae.join(this.dirname,this.stem+(n||""))}get path(){return this.history[this.history.length-1]}set path(n){ut(n)&&(n=fc(n)),Hn(n,"path"),this.path!==n&&this.history.push(n)}get stem(){return typeof this.path=="string"?Ae.basename(this.path,this.extname):void 0}set stem(n){Hn(n,"stem"),Vn(n,"stem"),this.path=Ae.join(this.dirname||"",n+(this.extname||""))}fail(n,t,a){const r=this.message(n,t,a);throw r.fatal=!0,r}info(n,t,a){const r=this.message(n,t,a);return r.fatal=void 0,r}message(n,t,a){const r=new ae(n,t,a);return this.path&&(r.name=this.path+":"+r.name,r.file=this.path),r.fatal=!1,this.messages.push(r),r}toString(n){return this.value===void 0?"":typeof this.value=="string"?this.value:new TextDecoder(n||void 0).decode(this.value)}}function Vn(e,n){if(e&&e.includes(Ae.sep))throw new Error("`"+n+"` cannot be a path: did not expect `"+Ae.sep+"`")}function Hn(e,n){if(!e)throw new Error("`"+n+"` cannot be empty")}function Aa(e,n){if(!e)throw new Error("Setting `"+n+"` requires `path` to be set too")}function Sc(e){return!!(e&&typeof e=="object"&&"byteLength"in e&&"byteOffset"in e)}const bc=(function(e){const a=this.constructor.prototype,r=a[e],o=function(){return r.apply(o,arguments)};return Object.setPrototypeOf(o,a),o}),vc={}.hasOwnProperty;class Pt extends bc{constructor(){super("copy"),this.Compiler=void 0,this.Parser=void 0,this.attachers=[],this.compiler=void 0,this.freezeIndex=-1,this.frozen=void 0,this.namespace={},this.parser=void 0,this.transformers=oc()}copy(){const n=new Pt;let t=-1;for(;++t<this.attachers.length;){const a=this.attachers[t];n.use(...a)}return n.data(qn(!0,{},this.namespace)),n}data(n,t){return typeof n=="string"?arguments.length===2?(Kn("data",this.frozen),this.namespace[n]=t,this):vc.call(this.namespace,n)&&this.namespace[n]||void 0:n?(Kn("data",this.frozen),this.namespace=n,this):this.namespace}freeze(){if(this.frozen)return this;const n=this;for(;++this.freezeIndex<this.attachers.length;){const[t,...a]=this.attachers[this.freezeIndex];if(a[0]===!1)continue;a[0]===!0&&(a[0]=void 0);const r=t.call(n,...a);typeof r=="function"&&this.transformers.use(r)}return this.frozen=!0,this.freezeIndex=Number.POSITIVE_INFINITY,this}parse(n){this.freeze();const t=mn(n),a=this.parser||this.Parser;return jn("parse",a),a(String(t),t)}process(n,t){const a=this;return this.freeze(),jn("process",this.parser||this.Parser),Un("process",this.compiler||this.Compiler),t?r(void 0,t):new Promise(r);function r(o,i){const s=mn(n),c=a.parse(s);a.run(c,s,function(d,u,h){if(d||!u||!h)return l(d);const p=u,f=a.stringify(p,h);kc(f)?h.value=f:h.result=f,l(d,h)});function l(d,u){d||!u?i(d):o?o(u):t(void 0,u)}}}processSync(n){let t=!1,a;return this.freeze(),jn("processSync",this.parser||this.Parser),Un("processSync",this.compiler||this.Compiler),this.process(n,r),ka("processSync","process",t),a;function r(o,i){t=!0,ba(o),a=i}}run(n,t,a){wa(n),this.freeze();const r=this.transformers;return!a&&typeof t=="function"&&(a=t,t=void 0),a?o(void 0,a):new Promise(o);function o(i,s){const c=mn(t);r.run(n,c,l);function l(d,u,h){const p=u||n;d?s(d):i?i(p):a(void 0,p,h)}}}runSync(n,t){let a=!1,r;return this.run(n,t,o),ka("runSync","run",a),r;function o(i,s){ba(i),r=s,a=!0}}stringify(n,t){this.freeze();const a=mn(t),r=this.compiler||this.Compiler;return Un("stringify",r),wa(n),r(n,a)}use(n,...t){const a=this.attachers,r=this.namespace;if(Kn("use",this.frozen),n!=null)if(typeof n=="function")c(n,t);else if(typeof n=="object")Array.isArray(n)?s(n):i(n);else throw new TypeError("Expected usable value, not `"+n+"`");return this;function o(l){if(typeof l=="function")c(l,[]);else if(typeof l=="object")if(Array.isArray(l)){const[d,...u]=l;c(d,u)}else i(l);else throw new TypeError("Expected usable value, not `"+l+"`")}function i(l){if(!("plugins"in l)&&!("settings"in l))throw new Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");s(l.plugins),l.settings&&(r.settings=qn(!0,r.settings,l.settings))}function s(l){let d=-1;if(l!=null)if(Array.isArray(l))for(;++d<l.length;){const u=l[d];o(u)}else throw new TypeError("Expected a list of plugins, not `"+l+"`")}function c(l,d){let u=-1,h=-1;for(;++u<a.length;)if(a[u][0]===l){h=u;break}if(h===-1)a.push([l,...d]);else if(d.length>0){let[p,...f]=d;const S=a[h][1];ct(S)&&ct(p)&&(p=qn(!0,S,p)),a[h]=[l,p,...f]}}}}const Ac=new Pt().freeze();function jn(e,n){if(typeof n!="function")throw new TypeError("Cannot `"+e+"` without `parser`")}function Un(e,n){if(typeof n!="function")throw new TypeError("Cannot `"+e+"` without `compiler`")}function Kn(e,n){if(n)throw new Error("Cannot call `"+e+"` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.")}function wa(e){if(!ct(e)||typeof e.type!="string")throw new TypeError("Expected node, got `"+e+"`")}function ka(e,n,t){if(!t)throw new Error("`"+e+"` finished async. Use `"+n+"` instead")}function mn(e){return wc(e)?e:new Ar(e)}function wc(e){return!!(e&&typeof e=="object"&&"message"in e&&"messages"in e)}function kc(e){return typeof e=="string"||Cc(e)}function Cc(e){return!!(e&&typeof e=="object"&&"byteLength"in e&&"byteOffset"in e)}const xc="https://github.com/remarkjs/react-markdown/blob/main/changelog.md",Ca=[],xa={allowDangerousHtml:!0},Pc=/^(https?|ircs?|mailto|xmpp)$/i,Dc=[{from:"astPlugins",id:"remove-buggy-html-in-markdown-parser"},{from:"allowDangerousHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"allowNode",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowElement"},{from:"allowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowedElements"},{from:"className",id:"remove-classname"},{from:"disallowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"disallowedElements"},{from:"escapeHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"includeElementIndex",id:"#remove-includeelementindex"},{from:"includeNodeIndex",id:"change-includenodeindex-to-includeelementindex"},{from:"linkTarget",id:"remove-linktarget"},{from:"plugins",id:"change-plugins-to-remarkplugins",to:"remarkPlugins"},{from:"rawSourcePos",id:"#remove-rawsourcepos"},{from:"renderers",id:"change-renderers-to-components",to:"components"},{from:"source",id:"change-source-to-children",to:"children"},{from:"sourcePos",id:"#remove-sourcepos"},{from:"transformImageUri",id:"#add-urltransform",to:"urlTransform"},{from:"transformLinkUri",id:"#add-urltransform",to:"urlTransform"}];function Wc(e){const n=Ic(e),t=Ec(e);return zc(n.runSync(n.parse(t),t),e)}function Ic(e){const n=e.rehypePlugins||Ca,t=e.remarkPlugins||Ca,a=e.remarkRehypeOptions?{...e.remarkRehypeOptions,...xa}:xa;return Ac().use(sl).use(t).use(ac,a).use(n)}function Ec(e){const n=e.children||"",t=new Ar;return typeof n=="string"&&(t.value=n),t}function zc(e,n){const t=n.allowedElements,a=n.allowElement,r=n.components,o=n.disallowedElements,i=n.skipHtml,s=n.unwrapDisallowed,c=n.urlTransform||Tc;for(const d of Dc)Object.hasOwn(n,d.from)&&(""+d.from+(d.to?"use `"+d.to+"` instead":"remove it")+xc+d.id,void 0);return xt(e,l),Ui(e,{Fragment:Q.Fragment,components:r,ignoreInvalidStyle:!0,jsx:Q.jsx,jsxs:Q.jsxs,passKeys:!0,passNode:!0});function l(d,u,h){if(d.type==="raw"&&h&&typeof u=="number")return i?h.children.splice(u,1):h.children[u]={type:"text",value:d.value},u;if(d.type==="element"){let p;for(p in Fn)if(Object.hasOwn(Fn,p)&&Object.hasOwn(d.properties,p)){const f=d.properties[p],S=Fn[p];(S===null||S.includes(d.tagName))&&(d.properties[p]=c(String(f||""),p,d))}}if(d.type==="element"){let p=t?!t.includes(d.tagName):o?o.includes(d.tagName):!1;if(!p&&a&&typeof u=="number"&&(p=!a(d,u,h)),p&&h&&typeof u=="number")return s&&d.children?h.children.splice(u,1,...d.children):h.children.splice(u,1),u}}}function Tc(e){const n=e.indexOf(":"),t=e.indexOf("?"),a=e.indexOf("#"),r=e.indexOf("/");return n===-1||r!==-1&&n>r||t!==-1&&n>t||a!==-1&&n>a||Pc.test(e.slice(0,n))?e:""}function Pa(e,n){const t=String(e);if(typeof n!="string")throw new TypeError("Expected character");let a=0,r=t.indexOf(n);for(;r!==-1;)a++,r=t.indexOf(n,r+n.length);return a}function Mc(e){if(typeof e!="string")throw new TypeError("Expected a string");return e.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&").replace(/-/g,"\\x2d")}function Rc(e,n,t){const r=Wn((t||{}).ignore||[]),o=Lc(n);let i=-1;for(;++i<o.length;)vr(e,"text",s);function s(l,d){let u=-1,h;for(;++u<d.length;){const p=d[u],f=h?h.children:void 0;if(r(p,f?f.indexOf(p):void 0,h))return;h=p}if(h)return c(l,d)}function c(l,d){const u=d[d.length-1],h=o[i][0],p=o[i][1];let f=0;const w=u.children.indexOf(l);let y=!1,P=[];h.lastIndex=0;let k=h.exec(l.value);for(;k;){const E=k.index,A={index:k.index,input:k.input,stack:[...d,l]};let T=p(...k,A);if(typeof T=="string"&&(T=T.length>0?{type:"text",value:T}:void 0),T===!1)h.lastIndex=E+1;else{if(f!==E&&W({type:"text",value:l.value.slice(f,E)}),Array.isArray(T))for(const O of T)W(O);else T&&W(T);f=E+k[0].length,y=!0}if(!h.global)break;k=h.exec(l.value)}return y?(f<l.value.length&&W({type:"text",value:l.value.slice(f)}),u.children.splice(w,1,...P)):P=[l],w+P.length;function W(E){const A=P[P.length-1];A&&A.type==="text"&&E.type==="text"?A.value+=E.value:P.push(E)}}}function Lc(e){if(!Array.isArray(e))throw new TypeError("Expected find and replace tuple or list of tuples");const n=[],t=!e[0]||Array.isArray(e[0])?e:[e];let a=-1;for(;++a<t.length;){const r=t[a];n.push([Fc(r[0]),Bc(r[1])])}return n}function Fc(e){return typeof e=="string"?new RegExp(Mc(e),"g"):e}function Bc(e){return typeof e=="function"?e:function(){return e}}const Qn="phrasing",_n=["autolink","link","image","label"];function Oc(){return{transforms:[Uc],enter:{literalAutolink:qc,literalAutolinkEmail:Zn,literalAutolinkHttp:Zn,literalAutolinkWww:Zn},exit:{literalAutolink:jc,literalAutolinkEmail:Hc,literalAutolinkHttp:Gc,literalAutolinkWww:Vc}}}function Nc(){return{unsafe:[{character:"@",before:"[+\\-.\\w]",after:"[\\-.\\w]",inConstruct:Qn,notInConstruct:_n},{character:".",before:"[Ww]",after:"[\\-.\\w]",inConstruct:Qn,notInConstruct:_n},{character:":",before:"[ps]",after:"\\/",inConstruct:Qn,notInConstruct:_n}]}}function qc(e){this.enter({type:"link",title:null,url:"",children:[]},e)}function Zn(e){this.config.enter.autolinkProtocol.call(this,e)}function Gc(e){this.config.exit.autolinkProtocol.call(this,e)}function Vc(e){this.config.exit.data.call(this,e);const n=this.stack[this.stack.length-1];n.type,n.url="http://"+this.sliceSerialize(e)}function Hc(e){this.config.exit.autolinkEmail.call(this,e)}function jc(e){this.exit(e)}function Uc(e){Rc(e,[[/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi,Kc],[new RegExp("(?<=^|\\s|\\p{P}|\\p{S})([-.\\w+]+)@([-\\w]+(?:\\.[-\\w]+)+)","gu"),Qc]],{ignore:["link","linkReference"]})}function Kc(e,n,t,a,r){let o="";if(!wr(r)||(/^w/i.test(n)&&(t=n+t,n="",o="http://"),!_c(t)))return!1;const i=Zc(t+a);if(!i[0])return!1;const s={type:"link",title:null,url:o+n+i[0],children:[{type:"text",value:n+i[0]}]};return i[1]?[s,{type:"text",value:i[1]}]:s}function Qc(e,n,t,a){return!wr(a,!0)||/[-\d_]$/.test(t)?!1:{type:"link",title:null,url:"mailto:"+n+"@"+t,children:[{type:"text",value:n+"@"+t}]}}function _c(e){const n=e.split(".");return!(n.length<2||n[n.length-1]&&(/_/.test(n[n.length-1])||!/[a-zA-Z\d]/.test(n[n.length-1]))||n[n.length-2]&&(/_/.test(n[n.length-2])||!/[a-zA-Z\d]/.test(n[n.length-2])))}function Zc(e){const n=/[!"&'),.:;<>?\]}]+$/.exec(e);if(!n)return[e,void 0];e=e.slice(0,n.index);let t=n[0],a=t.indexOf(")");const r=Pa(e,"(");let o=Pa(e,")");for(;a!==-1&&r>o;)e+=t.slice(0,a+1),t=t.slice(a+1),a=t.indexOf(")"),o++;return[e,t]}function wr(e,n){const t=e.input.charCodeAt(e.index-1);return(e.index===0||Re(t)||xn(t))&&(!n||t!==47)}kr.peek=ru;function $c(){this.buffer()}function Xc(e){this.enter({type:"footnoteReference",identifier:"",label:""},e)}function Jc(){this.buffer()}function Yc(e){this.enter({type:"footnoteDefinition",identifier:"",label:"",children:[]},e)}function eu(e){const n=this.resume(),t=this.stack[this.stack.length-1];t.type,t.identifier=Se(this.sliceSerialize(e)).toLowerCase(),t.label=n}function nu(e){this.exit(e)}function tu(e){const n=this.resume(),t=this.stack[this.stack.length-1];t.type,t.identifier=Se(this.sliceSerialize(e)).toLowerCase(),t.label=n}function au(e){this.exit(e)}function ru(){return"["}function kr(e,n,t,a){const r=t.createTracker(a);let o=r.move("[^");const i=t.enter("footnoteReference"),s=t.enter("reference");return o+=r.move(t.safe(t.associationId(e),{after:"]",before:o})),s(),i(),o+=r.move("]"),o}function iu(){return{enter:{gfmFootnoteCallString:$c,gfmFootnoteCall:Xc,gfmFootnoteDefinitionLabelString:Jc,gfmFootnoteDefinition:Yc},exit:{gfmFootnoteCallString:eu,gfmFootnoteCall:nu,gfmFootnoteDefinitionLabelString:tu,gfmFootnoteDefinition:au}}}function ou(e){let n=!1;return e&&e.firstLineBlank&&(n=!0),{handlers:{footnoteDefinition:t,footnoteReference:kr},unsafe:[{character:"[",inConstruct:["label","phrasing","reference"]}]};function t(a,r,o,i){const s=o.createTracker(i);let c=s.move("[^");const l=o.enter("footnoteDefinition"),d=o.enter("label");return c+=s.move(o.safe(o.associationId(a),{before:c,after:"]"})),d(),c+=s.move("]:"),a.children&&a.children.length>0&&(s.shift(4),c+=s.move((n?`
`:" ")+o.indentLines(o.containerFlow(a,s.current()),n?Cr:su))),l(),c}}function su(e,n,t){return n===0?e:Cr(e,n,t)}function Cr(e,n,t){return(t?"":"    ")+e}const lu=["autolink","destinationLiteral","destinationRaw","reference","titleQuote","titleApostrophe"];Dt.attention=hu;Dt.peek=mu;function cu(){return{canContainEols:["delete"],enter:{strikethrough:du},exit:{strikethrough:pu}}}function uu(){return{handlers:{delete:Dt},unsafe:[{character:"~",inConstruct:"phrasing",notInConstruct:lu}]}}function du(e){this.enter({type:"delete",children:[],position:void 0},e)}function pu(e){this.exit(e)}function Dt(e,n,t,a){const r=t.createTracker(a),o=t.stack.includes("strikethrough")?"~":"~~",i=t.enter("strikethrough");let s=r.move(o);return s+=t.containerPhrasing(e,{...r.current(),before:s,after:"~"}),s+=r.move(o),i(),s}function hu(){return{construct:"strikethrough",markers:["~"],sizes:[2,1]}}function mu(){return"~"}function gu(e){return e.length}function fu(e,n){const t=n||{},a=(t.align||[]).concat(),r=t.stringLength||gu,o=[],i=[],s=[],c=[];let l=0,d=-1;for(;++d<e.length;){const S=[],w=[];let y=-1;for(e[d].length>l&&(l=e[d].length);++y<e[d].length;){const P=yu(e[d][y]);if(t.alignDelimiters!==!1){const k=r(P);w[y]=k,(c[y]===void 0||k>c[y])&&(c[y]=k)}S.push(P)}i[d]=S,s[d]=w}let u=-1;if(typeof a=="object"&&"length"in a)for(;++u<l;)o[u]=Da(a[u]);else{const S=Da(a);for(;++u<l;)o[u]=S}u=-1;const h=[],p=[];for(;++u<l;){const S=o[u];let w="",y="";S===99?(w=":",y=":"):S===108?w=":":S===114&&(y=":");let P=t.alignDelimiters===!1?1:Math.max(1,c[u]-w.length-y.length);const k=w+"-".repeat(P)+y;t.alignDelimiters!==!1&&(P=w.length+P+y.length,P>c[u]&&(c[u]=P),p[u]=P),h[u]=k}i.splice(1,0,h),s.splice(1,0,p),d=-1;const f=[];for(;++d<i.length;){const S=i[d],w=s[d];u=-1;const y=[];for(;++u<l;){const P=S[u]||"";let k="",W="";if(t.alignDelimiters!==!1){const E=c[u]-(w[u]||0),A=o[u];A===114?k=" ".repeat(E):A===99?E%2?(k=" ".repeat(E/2+.5),W=" ".repeat(E/2-.5)):(k=" ".repeat(E/2),W=k):W=" ".repeat(E)}t.delimiterStart!==!1&&!u&&y.push("|"),t.padding!==!1&&!(t.alignDelimiters===!1&&P==="")&&(t.delimiterStart!==!1||u)&&y.push(" "),t.alignDelimiters!==!1&&y.push(k),y.push(P),t.alignDelimiters!==!1&&y.push(W),t.padding!==!1&&y.push(" "),(t.delimiterEnd!==!1||u!==l-1)&&y.push("|")}f.push(t.delimiterEnd===!1?y.join("").replace(/ +$/,""):y.join(""))}return f.join(`
`)}function yu(e){return e==null?"":String(e)}function Da(e){const n=typeof e=="string"?e.codePointAt(0):0;return n===67||n===99?99:n===76||n===108?108:n===82||n===114?114:0}const Su=Wn(["break","delete","emphasis","footnote","footnoteReference","image","imageReference","inlineCode","inlineMath","link","linkReference","mdxJsxTextElement","mdxTextExpression","strong","text","textDirective"]);function bu(e,n,t,a){const r=t.enter("blockquote"),o=t.createTracker(a);o.move("> "),o.shift(2);const i=t.indentLines(t.containerFlow(e,o.current()),vu);return r(),i}function vu(e,n,t){return">"+(t?"":" ")+e}function Au(e,n){return Wa(e,n.inConstruct,!0)&&!Wa(e,n.notInConstruct,!1)}function Wa(e,n,t){if(typeof n=="string"&&(n=[n]),!n||n.length===0)return t;let a=-1;for(;++a<n.length;)if(e.includes(n[a]))return!0;return!1}function Ia(e,n,t,a){let r=-1;for(;++r<t.unsafe.length;){const o=t.unsafe[r];if(o.character===`
`&&!o.before&&!o.after&&Au(t.stack,o))return/[\t ]/.test(a.before)?"":" "}return`\\
`}function wu(e,n){const t=String(e);let a=t.indexOf(n),r=a,o=0,i=0;if(typeof n!="string")throw new TypeError("Expected substring");for(;a!==-1;)a===r?++o>i&&(i=o):o=1,r=a+n.length,a=t.indexOf(n,r);return i}function ku(e,n){return!!(n.options.fences===!1&&e.value&&!e.lang&&/[^\n\r ]/.test(e.value)&&!/^[\t ]*(?:[\n\r]|$)|(?:^|[\n\r])[\t ]*$/.test(e.value))}function Cu(e){const n=e.options.fence||"`";if(n!=="`"&&n!=="~")throw new Error("Cannot serialize code with `"+n+"` for `options.fence`, expected `` ` `` or `~`");return n}function xu(e,n,t,a){const r=Cu(t),o=e.value||"";if(ku(e,t)){const u=t.enter("codeIndented"),h=t.indentLines(o,Pu);return u(),h}const i=t.createTracker(a),s=r.repeat(Math.max(wu(o,r)+1,3)),c=t.enter("codeFenced"),l=r==="`"?"GraveAccent":"Tilde";let d=i.move(s);if(e.lang){const u=t.enter(`codeFencedLang${l}`);d+=i.move(t.safe(e.lang,{before:d,after:" ",encode:["`"],...i.current()})),u()}if(e.lang&&e.meta){const u=t.enter(`codeFencedMeta${l}`);d+=i.move(" "),d+=i.move(t.safe(e.meta,{before:d,after:`
`,encode:["`"],...i.current()})),u()}return d+=i.move(`
`),o&&(d+=i.move(o+`
`)),d+=i.move(s),c(),d}function Pu(e,n,t){return(t?"":"    ")+e}function Wt(e){const n=e.options.quote||'"';if(n!=='"'&&n!=="'")throw new Error("Cannot serialize title with `"+n+"` for `options.quote`, expected `\"`, or `'`");return n}function Du(e,n,t,a){const r=Wt(t),o=r==='"'?"Quote":"Apostrophe",i=t.enter("definition");let s=t.enter("label");const c=t.createTracker(a);let l=c.move("[");return l+=c.move(t.safe(t.associationId(e),{before:l,after:"]",...c.current()})),l+=c.move("]: "),s(),!e.url||/[\0- \u007F]/.test(e.url)?(s=t.enter("destinationLiteral"),l+=c.move("<"),l+=c.move(t.safe(e.url,{before:l,after:">",...c.current()})),l+=c.move(">")):(s=t.enter("destinationRaw"),l+=c.move(t.safe(e.url,{before:l,after:e.title?" ":`
`,...c.current()}))),s(),e.title&&(s=t.enter(`title${o}`),l+=c.move(" "+r),l+=c.move(t.safe(e.title,{before:l,after:r,...c.current()})),l+=c.move(r),s()),i(),l}function Wu(e){const n=e.options.emphasis||"*";if(n!=="*"&&n!=="_")throw new Error("Cannot serialize emphasis with `"+n+"` for `options.emphasis`, expected `*`, or `_`");return n}It.attention=Iu;It.peek=Eu;function It(e,n,t,a){const r=t.enter("phrasing"),o=t.containerPhrasing({type:"root",children:[e]},a);return r(),o}function Iu(e,n){return{construct:"emphasis",markers:Wu(n)==="*"?["*","_"]:["_","*"],sizes:[1]}}function Eu(e,n,t){return t.options.emphasis||"*"}function zu(e){return"&#x"+e.toString(16).toUpperCase()+";"}function Tu(e,n){let t=!1;return xt(e,function(a){if("value"in a&&/\r?\n|\r/.test(a.value)||a.type==="break")return t=!0,st}),!!((!e.depth||e.depth<3)&&St(e)&&(n.options.setext||t))}function Mu(e,n,t,a){const r=Math.max(Math.min(6,e.depth||1),1),o=t.createTracker(a);if(Tu(e,t)){const u=t.enter("headingSetext"),h=t.enter("phrasing"),p=t.containerPhrasing(e,{...o.current(),before:`
`,after:`
`});return h(),u(),p+`
`+(r===1?"=":"-").repeat(p.length-(Math.max(p.lastIndexOf("\r"),p.lastIndexOf(`
`))+1))}const i="#".repeat(r),s=t.enter("headingAtx"),c=t.enter("phrasing");o.move(i+" ");let l=t.containerPhrasing(e,{before:"# ",after:`
`,...o.current()});const d=l.charCodeAt(0);return(d===9||d===32)&&(l=zu(d)+l.slice(1)),l=l?i+" "+l:i,t.options.closeAtx&&(l+=" "+i),c(),s(),l}xr.peek=Ru;function xr(e){return e.value||""}function Ru(){return"<"}Pr.peek=Lu;function Pr(e,n,t,a){const r=Wt(t),o=r==='"'?"Quote":"Apostrophe",i=t.enter("image");let s=t.enter("label");const c=t.createTracker(a);let l=c.move("![");return l+=c.move(t.safe(e.alt,{before:l,after:"]",...c.current()})),l+=c.move("]("),s(),!e.url&&e.title||/[\0- \u007F]/.test(e.url)?(s=t.enter("destinationLiteral"),l+=c.move("<"),l+=c.move(t.safe(e.url,{before:l,after:">",...c.current()})),l+=c.move(">")):(s=t.enter("destinationRaw"),l+=c.move(t.safe(e.url,{before:l,after:e.title?" ":")",...c.current()}))),s(),e.title&&(s=t.enter(`title${o}`),l+=c.move(" "+r),l+=c.move(t.safe(e.title,{before:l,after:r,...c.current()})),l+=c.move(r),s()),l+=c.move(")"),i(),l}function Lu(){return"!"}Dr.peek=Fu;function Dr(e,n,t,a){const r=e.referenceType,o=t.enter("imageReference");let i=t.enter("label");const s=t.createTracker(a);let c=s.move("![");const l=t.safe(e.alt,{before:c,after:"]",...s.current()});c+=s.move(l+"]["),i();const d=t.stack;t.stack=d.filter(function(h){return h!=="phrasing"}),i=t.enter("reference");const u=t.safe(t.associationId(e),{before:c,after:"]",...s.current()});return i(),t.stack=d,o(),r==="full"||!l||l!==u?c+=s.move(u+"]"):r==="shortcut"?c=c.slice(0,-1):c+=s.move("]"),c}function Fu(){return"!"}Wr.peek=Bu;function Wr(e,n,t){let a=e.value||"",r="`",o=-1;for(;new RegExp("(^|[^`])"+r+"([^`]|$)").test(a);)r+="`";for(/[^\n\r ]/.test(a)&&(/^[\n\r ]/.test(a)&&/[\n\r ]$/.test(a)||/^`|`$/.test(a))&&(a=" "+a+" ");++o<t.unsafe.length;){const i=t.unsafe[o],s=t.compilePattern(i);if(!i.atBreak)continue;let c;for(;c=s.exec(a);){let l=c.index;a.charCodeAt(l)===10&&a.charCodeAt(l-1)===13&&l--,a=a.slice(0,l)+" "+a.slice(c.index+1)}}return r+a+r}function Bu(){return"`"}function Ir(e,n){const t=St(e);return!!(!n.options.resourceLink&&e.url&&!e.title&&e.children&&e.children.length===1&&e.children[0].type==="text"&&(t===e.url||"mailto:"+t===e.url)&&/^[a-z][+\-.a-z]+:/i.test(e.url)&&!/[\0- <>\u007F]/.test(e.url))}Er.peek=Ou;function Er(e,n,t,a){const r=Wt(t),o=r==='"'?"Quote":"Apostrophe",i=t.createTracker(a);if(Ir(e,t)){const d=t.stack;t.stack=d.filter(function(p){return p!=="phrasing"});const u=t.enter("autolink");let h=i.move("<");return h+=i.move(t.containerPhrasing(e,{before:h,after:">",...i.current()})),h+=i.move(">"),u(),t.stack=d,h}const s=t.enter("link");let c=t.enter("label"),l=i.move("[");return l+=i.move(t.containerPhrasing(e,{before:l,after:"](",...i.current()})),l+=i.move("]("),c(),!e.url&&e.title||/[\0- \u007F]/.test(e.url)?(c=t.enter("destinationLiteral"),l+=i.move("<"),l+=i.move(t.safe(e.url,{before:l,after:">",...i.current()})),l+=i.move(">")):(c=t.enter("destinationRaw"),l+=i.move(t.safe(e.url,{before:l,after:e.title?" ":")",...i.current()}))),c(),e.title&&(c=t.enter(`title${o}`),l+=i.move(" "+r),l+=i.move(t.safe(e.title,{before:l,after:r,...i.current()})),l+=i.move(r),c()),l+=i.move(")"),s(),l}function Ou(e,n,t){return Ir(e,t)?"<":"["}zr.peek=Nu;function zr(e,n,t,a){const r=e.referenceType,o=t.enter("linkReference");let i=t.enter("label");const s=t.createTracker(a);let c=s.move("[");const l=t.containerPhrasing(e,{before:c,after:"]",...s.current()});c+=s.move(l+"]["),i();const d=t.stack;t.stack=d.filter(function(h){return h!=="phrasing"}),i=t.enter("reference");const u=t.safe(t.associationId(e),{before:c,after:"]",...s.current()});return i(),t.stack=d,o(),r==="full"||!l||l!==u?c+=s.move(u+"]"):r==="shortcut"?c=c.slice(0,-1):c+=s.move("]"),c}function Nu(){return"["}function Et(e){const n=e.options.bullet||"*";if(n!=="*"&&n!=="+"&&n!=="-")throw new Error("Cannot serialize items with `"+n+"` for `options.bullet`, expected `*`, `+`, or `-`");return n}function qu(e){const n=Et(e),t=e.options.bulletOther;if(!t)return n==="*"?"-":"*";if(t!=="*"&&t!=="+"&&t!=="-")throw new Error("Cannot serialize items with `"+t+"` for `options.bulletOther`, expected `*`, `+`, or `-`");if(t===n)throw new Error("Expected `bullet` (`"+n+"`) and `bulletOther` (`"+t+"`) to be different");return t}function Gu(e){const n=e.options.bulletOrdered||".";if(n!=="."&&n!==")")throw new Error("Cannot serialize items with `"+n+"` for `options.bulletOrdered`, expected `.` or `)`");return n}function Tr(e){const n=e.options.rule||"*";if(n!=="*"&&n!=="-"&&n!=="_")throw new Error("Cannot serialize rules with `"+n+"` for `options.rule`, expected `*`, `-`, or `_`");return n}function Vu(e,n,t,a){const r=t.enter("list"),o=t.bulletCurrent;let i=e.ordered?Gu(t):Et(t);const s=e.ordered?i==="."?")":".":qu(t);let c=n&&t.bulletLastUsed?i===t.bulletLastUsed:!1;if(!e.ordered){const d=e.children?e.children[0]:void 0;if((i==="*"||i==="-")&&d&&(!d.children||!d.children[0])&&t.stack[t.stack.length-1]==="list"&&t.stack[t.stack.length-2]==="listItem"&&t.stack[t.stack.length-3]==="list"&&t.stack[t.stack.length-4]==="listItem"&&t.indexStack[t.indexStack.length-1]===0&&t.indexStack[t.indexStack.length-2]===0&&t.indexStack[t.indexStack.length-3]===0&&(c=!0),Tr(t)===i&&d){let u=-1;for(;++u<e.children.length;){const h=e.children[u];if(h&&h.type==="listItem"&&h.children&&h.children[0]&&h.children[0].type==="thematicBreak"){c=!0;break}}}}c&&(i=s),t.bulletCurrent=i;const l=t.containerFlow(e,a);return t.bulletLastUsed=i,t.bulletCurrent=o,r(),l}function Hu(e){const n=e.options.listItemIndent||"one";if(n!=="tab"&&n!=="one"&&n!=="mixed")throw new Error("Cannot serialize items with `"+n+"` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`");return n}function ju(e,n,t,a){const r=Hu(t);let o=t.bulletCurrent||Et(t);n&&n.type==="list"&&n.ordered&&(o=(typeof n.start=="number"&&n.start>-1?n.start:1)+(t.options.incrementListMarker===!1?0:n.children.indexOf(e))+o);let i=o.length+1;(r==="tab"||r==="mixed"&&(n&&n.type==="list"&&n.spread||e.spread))&&(i=Math.ceil(i/4)*4);const s=t.createTracker(a);s.move(o+" ".repeat(i-o.length)),s.shift(i);const c=t.enter("listItem"),l=t.indentLines(t.containerFlow(e,s.current()),d);return c(),l;function d(u,h,p){return h?(p?"":" ".repeat(i))+u:(p?o:o+" ".repeat(i-o.length))+u}}function Uu(e,n,t,a){const r=t.enter("paragraph"),o=t.enter("phrasing"),i=t.containerPhrasing(e,a);return o(),r(),i}function Ku(e,n,t,a){if(!e.children.some(function(s){return Su(s)}))return t.containerFlow(e,a);const o=t.enter("phrasing"),i=t.containerPhrasing(e,a);return o(),i}function Qu(e){const n=e.options.strong||"*";if(n!=="*"&&n!=="_")throw new Error("Cannot serialize strong with `"+n+"` for `options.strong`, expected `*`, or `_`");return n}zt.attention=_u;zt.peek=Zu;function zt(e,n,t,a){const r=t.enter("phrasing"),o=t.containerPhrasing({type:"root",children:[e]},a);return r(),o}function _u(e,n){return{construct:"strong",markers:Qu(n)==="*"?["*","_"]:["_","*"],sizes:[2]}}function Zu(e,n,t){return t.options.strong||"*"}function $u(e,n,t,a){const r=n?n.children:[],o=r.indexOf(e);return t.safe(e.value,{...a,afterNode:r[o+1],beforeNode:r[o-1]})}function Xu(e){const n=e.options.ruleRepetition||3;if(n<3)throw new Error("Cannot serialize rules with repetition `"+n+"` for `options.ruleRepetition`, expected `3` or more");return n}function Ju(e,n,t){const a=(Tr(t)+(t.options.ruleSpaces?" ":"")).repeat(Xu(t));return t.options.ruleSpaces?a.slice(0,-1):a}const Mr={blockquote:bu,break:Ia,code:xu,definition:Du,emphasis:It,hardBreak:Ia,heading:Mu,html:xr,image:Pr,imageReference:Dr,inlineCode:Wr,link:Er,linkReference:zr,list:Vu,listItem:ju,paragraph:Uu,root:Ku,strong:zt,text:$u,thematicBreak:Ju};function Yu(){return{enter:{table:ed,tableData:Ea,tableHeader:Ea,tableRow:td},exit:{codeText:ad,table:nd,tableData:$n,tableHeader:$n,tableRow:$n}}}function ed(e){const n=e._align;this.enter({type:"table",align:n.map(function(t){return t==="none"?null:t}),children:[]},e),this.data.inTable=!0}function nd(e){this.exit(e),this.data.inTable=void 0}function td(e){this.enter({type:"tableRow",children:[]},e)}function $n(e){this.exit(e)}function Ea(e){this.enter({type:"tableCell",children:[]},e)}function ad(e){let n=this.resume();this.data.inTable&&(n=n.replace(/\\([\\|])/g,rd));const t=this.stack[this.stack.length-1];t.type,t.value=n,this.exit(e)}function rd(e,n){return n==="|"?n:e}function id(e){const n=e||{},t=n.tableCellPadding,a=n.tablePipeAlign,r=n.stringLength,o=t?" ":"|";return{unsafe:[{character:"\r",inConstruct:"tableCell"},{character:`
`,inConstruct:"tableCell"},{atBreak:!0,character:"|",after:"[	 :-]"},{character:"|",inConstruct:"tableCell"},{atBreak:!0,character:":",after:"-"},{atBreak:!0,character:"-",after:"[:|-]"}],handlers:{inlineCode:h,table:i,tableCell:c,tableRow:s}};function i(p,f,S,w){return l(d(p,S,w),p.align)}function s(p,f,S,w){const y=u(p,S,w),P=l([y]);return P.slice(0,P.indexOf(`
`))}function c(p,f,S,w){const y=S.enter("tableCell"),P=S.enter("phrasing"),k=S.containerPhrasing(p,{...w,before:o,after:o});return P(),y(),k}function l(p,f){return fu(p,{align:f,alignDelimiters:a,padding:t,stringLength:r})}function d(p,f,S){const w=p.children;let y=-1;const P=[],k=f.enter("table");for(;++y<w.length;)P[y]=u(w[y],f,S);return k(),P}function u(p,f,S){const w=p.children;let y=-1;const P=[],k=f.enter("tableRow");for(;++y<w.length;)P[y]=c(w[y],p,f,S);return k(),P}function h(p,f,S){let w=Mr.inlineCode(p,f,S);return S.stack.includes("tableCell")&&(w=w.replace(/\|/g,"\\$&")),w}}function od(){return{exit:{taskListCheckValueChecked:za,taskListCheckValueUnchecked:za,paragraph:ld}}}function sd(){return{unsafe:[{atBreak:!0,character:"-",after:"[:|-]"}],handlers:{listItem:cd}}}function za(e){const n=this.stack[this.stack.length-2];n.type,n.checked=e.type==="taskListCheckValueChecked"}function ld(e){const n=this.stack[this.stack.length-2];if(n&&n.type==="listItem"&&typeof n.checked=="boolean"){const t=this.stack[this.stack.length-1];t.type;const a=t.children[0];if(a&&a.type==="text"){const r=n.children;let o=-1,i;for(;++o<r.length;){const s=r[o];if(s.type==="paragraph"){i=s;break}}i===t&&(a.value=a.value.slice(1),a.value.length===0?t.children.shift():t.position&&a.position&&typeof a.position.start.offset=="number"&&(a.position.start.column++,a.position.start.offset++,t.position.start=Object.assign({},a.position.start)))}}this.exit(e)}function cd(e,n,t,a){const r=e.children[0],o=typeof e.checked=="boolean"&&r&&r.type==="paragraph",i="["+(e.checked?"x":" ")+"] ",s=t.createTracker(a);o&&s.move(i);let c=Mr.listItem(e,n,t,{...a,...s.current()});return o&&(c=c.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/,l)),c;function l(d){return d+i}}function ud(){return[Oc(),iu(),cu(),Yu(),od()]}function dd(e){return{extensions:[Nc(),ou(e),uu(),id(e),sd()]}}const pd={tokenize:Sd,partial:!0},Rr={tokenize:bd,partial:!0},Lr={tokenize:vd,partial:!0},Fr={tokenize:Ad,partial:!0},hd={tokenize:wd,partial:!0},Br={name:"wwwAutolink",tokenize:fd,previous:Nr},Or={name:"protocolAutolink",tokenize:yd,previous:qr},xe={name:"emailAutolink",tokenize:gd,previous:Gr},we={};function md(){return{text:we}}let ze=48;for(;ze<123;)we[ze]=xe,ze++,ze===58?ze=65:ze===91&&(ze=97);we[43]=xe;we[45]=xe;we[46]=xe;we[95]=xe;we[72]=[xe,Or];we[104]=[xe,Or];we[87]=[xe,Br];we[119]=[xe,Br];function gd(e,n,t){const a=this;let r,o;return i;function i(u){return!dt(u)||!Gr.call(a,a.previous)||Tt(a.events)?t(u):(e.enter("literalAutolink"),e.enter("literalAutolinkEmail"),s(u))}function s(u){return dt(u)?(e.consume(u),s):u===64?(e.consume(u),c):t(u)}function c(u){return u===46?e.check(hd,d,l)(u):u===45||u===95||te(u)?(o=!0,e.consume(u),c):d(u)}function l(u){return e.consume(u),r=!0,c}function d(u){return o&&r&&ie(a.previous)?(e.exit("literalAutolinkEmail"),e.exit("literalAutolink"),n(u)):t(u)}}function fd(e,n,t){const a=this;return r;function r(i){return i!==87&&i!==119||!Nr.call(a,a.previous)||Tt(a.events)?t(i):(e.enter("literalAutolink"),e.enter("literalAutolinkWww"),e.check(pd,e.attempt(Rr,e.attempt(Lr,o),t),t)(i))}function o(i){return e.exit("literalAutolinkWww"),e.exit("literalAutolink"),n(i)}}function yd(e,n,t){const a=this;let r="",o=!1;return i;function i(u){return(u===72||u===104)&&qr.call(a,a.previous)&&!Tt(a.events)?(e.enter("literalAutolink"),e.enter("literalAutolinkHttp"),r+=String.fromCodePoint(u),e.consume(u),s):t(u)}function s(u){if(ie(u)&&r.length<5)return r+=String.fromCodePoint(u),e.consume(u),s;if(u===58){const h=r.toLowerCase();if(h==="http"||h==="https")return e.consume(u),c}return t(u)}function c(u){return u===47?(e.consume(u),o?l:(o=!0,c)):t(u)}function l(u){return u===null||bn(u)||Z(u)||Re(u)||xn(u)?t(u):e.attempt(Rr,e.attempt(Lr,d),t)(u)}function d(u){return e.exit("literalAutolinkHttp"),e.exit("literalAutolink"),n(u)}}function Sd(e,n,t){let a=0;return r;function r(i){return(i===87||i===119)&&a<3?(a++,e.consume(i),r):i===46&&a===3?(e.consume(i),o):t(i)}function o(i){return i===null?t(i):n(i)}}function bd(e,n,t){let a,r,o;return i;function i(l){return l===46||l===95?e.check(Fr,c,s)(l):l===null||Z(l)||Re(l)||l!==45&&xn(l)?c(l):(o=!0,e.consume(l),i)}function s(l){return l===95?a=!0:(r=a,a=void 0),e.consume(l),i}function c(l){return r||a||!o?t(l):n(l)}}function vd(e,n){let t=0,a=0;return r;function r(i){return i===40?(t++,e.consume(i),r):i===41&&a<t?o(i):i===33||i===34||i===38||i===39||i===41||i===42||i===44||i===46||i===58||i===59||i===60||i===63||i===93||i===95||i===126?e.check(Fr,n,o)(i):i===null||Z(i)||Re(i)?n(i):(e.consume(i),r)}function o(i){return i===41&&a++,e.consume(i),r}}function Ad(e,n,t){return a;function a(s){return s===33||s===34||s===39||s===41||s===42||s===44||s===46||s===58||s===59||s===63||s===95||s===126?(e.consume(s),a):s===38?(e.consume(s),o):s===93?(e.consume(s),r):s===60||s===null||Z(s)||Re(s)?n(s):t(s)}function r(s){return s===null||s===40||s===91||Z(s)||Re(s)?n(s):a(s)}function o(s){return ie(s)?i(s):t(s)}function i(s){return s===59?(e.consume(s),a):ie(s)?(e.consume(s),i):t(s)}}function wd(e,n,t){return a;function a(o){return e.consume(o),r}function r(o){return te(o)?t(o):n(o)}}function Nr(e){return e===null||e===40||e===42||e===95||e===91||e===93||e===126||Z(e)}function qr(e){return!ie(e)}function Gr(e){return!(e===47||dt(e))}function dt(e){return e===43||e===45||e===46||e===95||te(e)}function Tt(e){let n=e.length,t=!1;for(;n--;){const a=e[n][1];if((a.type==="labelLink"||a.type==="labelImage")&&!a._balanced){t=!0;break}if(a._gfmAutolinkLiteralWalkedInto){t=!1;break}}return e.length>0&&!t&&(e[e.length-1][1]._gfmAutolinkLiteralWalkedInto=!0),t}const kd={tokenize:zd,partial:!0};function Cd(){return{document:{91:{name:"gfmFootnoteDefinition",tokenize:Wd,continuation:{tokenize:Id},exit:Ed}},text:{91:{name:"gfmFootnoteCall",tokenize:Dd},93:{name:"gfmPotentialFootnoteCall",add:"after",tokenize:xd,resolveTo:Pd}}}}function xd(e,n,t){const a=this;let r=a.events.length;const o=a.parser.gfmFootnotes||(a.parser.gfmFootnotes=[]);let i;for(;r--;){const c=a.events[r][1];if(c.type==="labelImage"){i=c;break}if(c.type==="gfmFootnoteCall"||c.type==="labelLink"||c.type==="label"||c.type==="image"||c.type==="link")break}return s;function s(c){if(!i||!i._balanced)return t(c);const l=Se(a.sliceSerialize({start:i.end,end:a.now()}));return l.codePointAt(0)!==94||!o.includes(l.slice(1))?t(c):(e.enter("gfmFootnoteCallLabelMarker"),e.consume(c),e.exit("gfmFootnoteCallLabelMarker"),n(c))}}function Pd(e,n){let t=e.length;for(;t--;)if(e[t][1].type==="labelImage"&&e[t][0]==="enter"){e[t][1];break}e[t+1][1].type="data",e[t+3][1].type="gfmFootnoteCallLabelMarker";const a={type:"gfmFootnoteCall",start:Object.assign({},e[t+3][1].start),end:Object.assign({},e[e.length-1][1].end)},r={type:"gfmFootnoteCallMarker",start:Object.assign({},e[t+3][1].end),end:Object.assign({},e[t+3][1].end)};r.end.column++,r.end.offset++,r.end._bufferIndex++;const o={type:"gfmFootnoteCallString",start:Object.assign({},r.end),end:Object.assign({},e[e.length-1][1].start)},i={type:"chunkString",contentType:"string",start:Object.assign({},o.start),end:Object.assign({},o.end)},s=[e[t+1],e[t+2],["enter",a,n],e[t+3],e[t+4],["enter",r,n],["exit",r,n],["enter",o,n],["enter",i,n],["exit",i,n],["exit",o,n],e[e.length-2],e[e.length-1],["exit",a,n]];return e.splice(t,e.length-t+1,...s),e}function Dd(e,n,t){const a=this,r=a.parser.gfmFootnotes||(a.parser.gfmFootnotes=[]);let o=0,i;return s;function s(u){return e.enter("gfmFootnoteCall"),e.enter("gfmFootnoteCallLabelMarker"),e.consume(u),e.exit("gfmFootnoteCallLabelMarker"),c}function c(u){return u!==94?t(u):(e.enter("gfmFootnoteCallMarker"),e.consume(u),e.exit("gfmFootnoteCallMarker"),e.enter("gfmFootnoteCallString"),e.enter("chunkString").contentType="string",l)}function l(u){if(o>999||u===93&&!i||u===null||u===91||Z(u))return t(u);if(u===93){e.exit("chunkString");const h=e.exit("gfmFootnoteCallString");return r.includes(Se(a.sliceSerialize(h)))?(e.enter("gfmFootnoteCallLabelMarker"),e.consume(u),e.exit("gfmFootnoteCallLabelMarker"),e.exit("gfmFootnoteCall"),n):t(u)}return Z(u)||(i=!0),o++,e.consume(u),u===92?d:l}function d(u){return u===91||u===92||u===93?(e.consume(u),o++,l):l(u)}}function Wd(e,n,t){const a=this,r=a.parser.gfmFootnotes||(a.parser.gfmFootnotes=[]);let o,i=0,s;return c;function c(f){return e.enter("gfmFootnoteDefinition")._container=!0,e.enter("gfmFootnoteDefinitionLabel"),e.enter("gfmFootnoteDefinitionLabelMarker"),e.consume(f),e.exit("gfmFootnoteDefinitionLabelMarker"),l}function l(f){return f===94?(e.enter("gfmFootnoteDefinitionMarker"),e.consume(f),e.exit("gfmFootnoteDefinitionMarker"),e.enter("gfmFootnoteDefinitionLabelString"),e.enter("chunkString").contentType="string",d):t(f)}function d(f){if(i>999||f===93&&!s||f===null||f===91||Z(f))return t(f);if(f===93){e.exit("chunkString");const S=e.exit("gfmFootnoteDefinitionLabelString");return o=Se(a.sliceSerialize(S)),e.enter("gfmFootnoteDefinitionLabelMarker"),e.consume(f),e.exit("gfmFootnoteDefinitionLabelMarker"),e.exit("gfmFootnoteDefinitionLabel"),h}return Z(f)||(s=!0),i++,e.consume(f),f===92?u:d}function u(f){return f===91||f===92||f===93?(e.consume(f),i++,d):d(f)}function h(f){return f===58?(e.enter("definitionMarker"),e.consume(f),e.exit("definitionMarker"),r.includes(o)||r.push(o),j(e,p,"gfmFootnoteDefinitionWhitespace")):t(f)}function p(f){return n(f)}}function Id(e,n,t){return e.check(sn,n,e.attempt(kd,n,t))}function Ed(e){e.exit("gfmFootnoteDefinition")}function zd(e,n,t){const a=this;return j(e,r,"gfmFootnoteDefinitionIndent",5);function r(o){const i=a.events[a.events.length-1];return i&&i[1].type==="gfmFootnoteDefinitionIndent"&&i[2].sliceSerialize(i[1],!0).length===4?n(o):t(o)}}function Td(e){let t=(e||{}).singleTilde;const a={name:"strikethrough",tokenize:o,resolveAll:r};return t==null&&(t=!0),{text:{126:a},insideSpan:{null:[a]},attentionMarkers:{null:[126]}};function r(i,s){let c=-1;for(;++c<i.length;)if(i[c][0]==="enter"&&i[c][1].type==="strikethroughSequenceTemporary"&&i[c][1]._close){let l=c;for(;l--;)if(i[l][0]==="exit"&&i[l][1].type==="strikethroughSequenceTemporary"&&i[l][1]._open&&i[c][1].end.offset-i[c][1].start.offset===i[l][1].end.offset-i[l][1].start.offset){i[c][1].type="strikethroughSequence",i[l][1].type="strikethroughSequence";const d={type:"strikethrough",start:Object.assign({},i[l][1].start),end:Object.assign({},i[c][1].end)},u={type:"strikethroughText",start:Object.assign({},i[l][1].end),end:Object.assign({},i[c][1].start)},h=[["enter",d,s],["enter",i[l][1],s],["exit",i[l][1],s],["enter",u,s]],p=s.parser.constructs.insideSpan.null;p&&ye(h,h.length,0,Pn(p,i.slice(l+1,c),s)),ye(h,h.length,0,[["exit",u,s],["enter",i[c][1],s],["exit",i[c][1],s],["exit",d,s]]),ye(i,l-1,c-l+3,h),c=l+h.length-2;break}}for(c=-1;++c<i.length;)i[c][1].type==="strikethroughSequenceTemporary"&&(i[c][1].type="data");return i}function o(i,s,c){const l=this.previous,d=this.events;let u=0;return h;function h(f){return l===126&&d[d.length-1][1].type!=="characterEscape"?c(f):(i.enter("strikethroughSequenceTemporary"),p(f))}function p(f){const S=An(l);if(f===126)return u>1?c(f):(i.consume(f),u++,p);if(u<2&&!t)return c(f);const w=i.exit("strikethroughSequenceTemporary"),y=An(f);return w._open=!y||y===2&&!!S,w._close=!S||S===2&&!!y,s(f)}}}class Md{constructor(){this.map=[],this.index=new Map}add(n,t,a){Rd(this,n,t,a)}consume(n){if(this.map.sort(function(o,i){return o[0]-i[0]}),this.map.length===0)return;let t=this.map.length;const a=[];for(;t>0;)t-=1,a.push(n.slice(this.map[t][0]+this.map[t][1]),this.map[t][2]),n.length=this.map[t][0];a.push(n.slice()),n.length=0;let r=a.pop();for(;r;){for(const o of r)n.push(o);r=a.pop()}this.map.length=0,this.index.clear()}}function Rd(e,n,t,a){if(t===0&&a.length===0)return;const r=e.index.get(n);if(r){r[1]+=t,r[2].push(...a);return}const o=[n,t,a];e.map.push(o),e.index.set(n,o)}function Ld(e,n){let t=!1;const a=[];for(;n<e.length;){const r=e[n];if(t){if(r[0]==="enter")r[1].type==="tableContent"&&a.push(e[n+1][1].type==="tableDelimiterMarker"?"left":"none");else if(r[1].type==="tableContent"){if(e[n-1][1].type==="tableDelimiterMarker"){const o=a.length-1;a[o]=a[o]==="left"?"center":"right"}}else if(r[1].type==="tableDelimiterRow")break}else r[0]==="enter"&&r[1].type==="tableDelimiterRow"&&(t=!0);n+=1}return a}function Fd(){return{flow:{null:{name:"table",tokenize:Bd,resolveAll:Od}}}}function Bd(e,n,t){const a=this;let r=0,o=0,i;return s;function s(b){let D=a.events.length-1;for(;D>-1;){const{type:M}=a.events[D][1];if(M==="lineEnding"||M==="linePrefix")D--;else break}const z=D>-1?a.events[D][1].type:null,G=z==="tableHead"||z==="tableRow"?A:c;return G===A&&a.parser.lazy[a.now().line]?t(b):G(b)}function c(b){return e.enter("tableHead"),e.enter("tableRow"),l(b)}function l(b){return b===124||(i=!0,o+=1),d(b)}function d(b){return b===null?t(b):R(b)?o>1?(o=0,a.interrupt=!0,e.exit("tableRow"),e.enter("lineEnding"),e.consume(b),e.exit("lineEnding"),p):t(b):q(b)?j(e,d,"whitespace")(b):(o+=1,i&&(i=!1,r+=1),b===124?(e.enter("tableCellDivider"),e.consume(b),e.exit("tableCellDivider"),i=!0,d):(e.enter("data"),u(b)))}function u(b){return b===null||b===124||Z(b)?(e.exit("data"),d(b)):(e.consume(b),b===92?h:u)}function h(b){return b===92||b===124?(e.consume(b),u):u(b)}function p(b){return a.interrupt=!1,a.parser.lazy[a.now().line]?t(b):(e.enter("tableDelimiterRow"),i=!1,q(b)?j(e,f,"linePrefix",a.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(b):f(b))}function f(b){return b===45||b===58?w(b):b===124?(i=!0,e.enter("tableCellDivider"),e.consume(b),e.exit("tableCellDivider"),S):E(b)}function S(b){return q(b)?j(e,w,"whitespace")(b):w(b)}function w(b){return b===58?(o+=1,i=!0,e.enter("tableDelimiterMarker"),e.consume(b),e.exit("tableDelimiterMarker"),y):b===45?(o+=1,y(b)):b===null||R(b)?W(b):E(b)}function y(b){return b===45?(e.enter("tableDelimiterFiller"),P(b)):E(b)}function P(b){return b===45?(e.consume(b),P):b===58?(i=!0,e.exit("tableDelimiterFiller"),e.enter("tableDelimiterMarker"),e.consume(b),e.exit("tableDelimiterMarker"),k):(e.exit("tableDelimiterFiller"),k(b))}function k(b){return q(b)?j(e,W,"whitespace")(b):W(b)}function W(b){return b===124?f(b):b===null||R(b)?!i||r!==o?E(b):(e.exit("tableDelimiterRow"),e.exit("tableHead"),n(b)):E(b)}function E(b){return t(b)}function A(b){return e.enter("tableRow"),T(b)}function T(b){return b===124?(e.enter("tableCellDivider"),e.consume(b),e.exit("tableCellDivider"),T):b===null||R(b)?(e.exit("tableRow"),n(b)):q(b)?j(e,T,"whitespace")(b):(e.enter("data"),O(b))}function O(b){return b===null||b===124||Z(b)?(e.exit("data"),T(b)):(e.consume(b),b===92?U:O)}function U(b){return b===92||b===124?(e.consume(b),O):O(b)}}function Od(e,n){let t=-1,a=!0,r=0,o=[0,0,0,0],i=[0,0,0,0],s=!1,c=0,l,d,u;const h=new Md;for(;++t<e.length;){const p=e[t],f=p[1];p[0]==="enter"?f.type==="tableHead"?(s=!1,c!==0&&(Ta(h,n,c,l,d),d=void 0,c=0),l={type:"table",start:Object.assign({},f.start),end:Object.assign({},f.end)},h.add(t,0,[["enter",l,n]])):f.type==="tableRow"||f.type==="tableDelimiterRow"?(a=!0,u=void 0,o=[0,0,0,0],i=[0,t+1,0,0],s&&(s=!1,d={type:"tableBody",start:Object.assign({},f.start),end:Object.assign({},f.end)},h.add(t,0,[["enter",d,n]])),r=f.type==="tableDelimiterRow"?2:d?3:1):r&&(f.type==="data"||f.type==="tableDelimiterMarker"||f.type==="tableDelimiterFiller")?(a=!1,i[2]===0&&(o[1]!==0&&(i[0]=i[1],u=gn(h,n,o,r,void 0,u),o=[0,0,0,0]),i[2]=t)):f.type==="tableCellDivider"&&(a?a=!1:(o[1]!==0&&(i[0]=i[1],u=gn(h,n,o,r,void 0,u)),o=i,i=[o[1],t,0,0])):f.type==="tableHead"?(s=!0,c=t):f.type==="tableRow"||f.type==="tableDelimiterRow"?(c=t,o[1]!==0?(i[0]=i[1],u=gn(h,n,o,r,t,u)):i[1]!==0&&(u=gn(h,n,i,r,t,u)),r=0):r&&(f.type==="data"||f.type==="tableDelimiterMarker"||f.type==="tableDelimiterFiller")&&(i[3]=t)}for(c!==0&&Ta(h,n,c,l,d),h.consume(n.events),t=-1;++t<n.events.length;){const p=n.events[t];p[0]==="enter"&&p[1].type==="table"&&(p[1]._align=Ld(n.events,t))}return e}function gn(e,n,t,a,r,o){const i=a===1?"tableHeader":a===2?"tableDelimiter":"tableData",s="tableContent";t[0]!==0&&(o.end=Object.assign({},Ve(n.events,t[0])),e.add(t[0],0,[["exit",o,n]]));const c=Ve(n.events,t[1]);if(o={type:i,start:Object.assign({},c),end:Object.assign({},c)},e.add(t[1],0,[["enter",o,n]]),t[2]!==0){const l=Ve(n.events,t[2]),d=Ve(n.events,t[3]),u={type:s,start:Object.assign({},l),end:Object.assign({},d)};if(e.add(t[2],0,[["enter",u,n]]),a!==2){const h=n.events[t[2]],p=n.events[t[3]];if(h[1].end=Object.assign({},p[1].end),h[1].type="chunkText",h[1].contentType="text",t[3]>t[2]+1){const f=t[2]+1,S=t[3]-t[2]-1;e.add(f,S,[])}}e.add(t[3]+1,0,[["exit",u,n]])}return r!==void 0&&(o.end=Object.assign({},Ve(n.events,r)),e.add(r,0,[["exit",o,n]]),o=void 0),o}function Ta(e,n,t,a,r){const o=[],i=Ve(n.events,t);r&&(r.end=Object.assign({},i),o.push(["exit",r,n])),a.end=Object.assign({},i),o.push(["exit",a,n]),e.add(t+1,0,o)}function Ve(e,n){const t=e[n],a=t[0]==="enter"?"start":"end";return t[1][a]}const Nd={name:"tasklistCheck",tokenize:Gd};function qd(){return{text:{91:Nd}}}function Gd(e,n,t){const a=this;return r;function r(c){return a.previous!==null||!a._gfmTasklistFirstContentOfListItem?t(c):(e.enter("taskListCheck"),e.enter("taskListCheckMarker"),e.consume(c),e.exit("taskListCheckMarker"),o)}function o(c){return Z(c)?(e.enter("taskListCheckValueUnchecked"),e.consume(c),e.exit("taskListCheckValueUnchecked"),i):c===88||c===120?(e.enter("taskListCheckValueChecked"),e.consume(c),e.exit("taskListCheckValueChecked"),i):t(c)}function i(c){return c===93?(e.enter("taskListCheckMarker"),e.consume(c),e.exit("taskListCheckMarker"),e.exit("taskListCheck"),s):t(c)}function s(c){return R(c)?n(c):q(c)?e.check({tokenize:Vd},n,t)(c):t(c)}}function Vd(e,n,t){return j(e,a,"whitespace");function a(r){return r===null?t(r):n(r)}}function Hd(e){return Ya([md(),Cd(),Td(e),Fd(),qd()])}const jd={};function Ud(e){const n=this,t=e||jd,a=n.data(),r=a.micromarkExtensions||(a.micromarkExtensions=[]),o=a.fromMarkdownExtensions||(a.fromMarkdownExtensions=[]),i=a.toMarkdownExtensions||(a.toMarkdownExtensions=[]);r.push(Hd(t)),o.push(ud()),i.push(dd(t))}const Kd=`# AWS Notes Summaries

## AWS Global Infrastructure Hierarchy Summary

1. Regions (3+ AZs) // Geographic areas made up of 3 or more isolated, physically separate Availability Zones
2. Availability Zones (1+ DCs) // Areas inside Regions made of one or more discrete data centers

## AWS Global Services

- AWS IAM (Identity and Access Management) // Access management
- Amazon CloudFront // Content delivery network
- Amazon Route 53 // DNS routing
- AWS WAF (Web Application Firewall) // Application firewall

## Cloud Computing Benefits Summary

- Agility // Quickly spin up resources as needed
- Elasticity // Provision amount of resources needed; scale up and down as needed
- Cost Savings // Trade fixed expenses for variable expenses
- Deploy Globally in Minutes // Global infrastructure means apps can be closer to end users, reducing latency
- IAAS (Infrastructure As A Service) // Access to networking features, computers (virtual or on dedicated hardware), data storage; think Ec2
- PAAS (Platform As A Service) // Deployment and management concerns without concern for underlying infrastructure; think Elastic Beanstalk
- SAAS (Software As A Service) // Complete product is run and managed by the service provider without concern for maintenance or infrastructure; think Amazon Rekognition

## Other Concepts

- Reliability // System recovery from disruptions; describes ability of system to recover from infrastructure or service disruptions, by dynamically acquiring computing resources to meet demand, and mitigate disruptions
- Resiliency // System recovery from attacks or failures; concerns the ability of a system to recover from a failure induced by the load (data or network), by hardware or software failures, or by attacks on the system itself.
- Durability // Data preservation and quality; refers to the ability of a system to assure data is stored and data remains consistently on the system as long as it is not changed by legitimate access; that is, data should not become corrupted or disappear from the cloud because of a system malfunction

## Three Fundamental Drivers of Cost on AWS

- Compute
- Storage
- Outbound Data Transfer

## Six Advantages of Cloud Computing

- Trade capital expense for variable expense
- Benefit from massive economies of scale
- Stop guessing capacity
- Increase speed and agility
- Stop spending money running and maintaining data centers
- Go global in minutes

## Six Pillars of Well-Architected Framework

- Operational Excellence
- Security
- Reliability
- Performance Efficiency
- Cost Optimization
- Sustainability

## AWS Cloud Transformation Phases Summary

- Envision Phase // Demonstrate how cloud accelerates business outcomes
- Align Phase // Identify capability gaps across CAF perspectives, surfacing stakeholder concerns
- Launch Phase // Deliver pilot initiatives; demonstrate incremental business value
- Scale Phase // Expand production pilots and business value; ensure cloud investments pay off

## AWS Cloud Adoption Framework Perspectives Capabilities Summary

- Business Capabilities // Strategy management; portfolio management; innovation management; product management; strategic partnership; data monetization; business insights; data science
- People Capabilities // Culture evolution; transformational leadership; cloud fluency; workforce transformation; change acceleration; organization design; organizational alignment
- Governance Capabilities // Program and project management; benefits management; risk management; cloud financial management; application portfolio management; data governance; data curation
- Platform Capabilities // Platform architecture; data architecture; platform engineering; data engineering; provisioning and orchestration; mordern application development; CI/CD
- Security Capabilities // Security governance; security assistance; identity and access management; threat detection; vulnerability management; infrastructure protection; data protection; application security; incident response
- Operations Capabilities // Observability; event management/AIOps; incident and problem management; change and release management; performance and capacity management; configuration management; patch management; availability and continuity management; application management

## AWS Cloud Adoption Framework Perspectives Stakeholders Summary

- Business Perspective // Stakeholders include CEO, CFO, COO, CIO, and CTO
- People Perspective // Stakeholders include CIO, COO, CTO, Cloud Director, and cross-functional/enterprise-wide leaders
- Governance Perspective // Stakeholders include Chief Transformation Officer, CIO, CTO, CFO, Chief Data Officer, Chief Risk Officer
- Platform Perspective // Stakeholders include CTO, technology leaders, architects and engineers
- Security Perspective // Stakeholders include Chief Information Security Officer, Chief Compliance Officer, internal audit leaders, security architects and engineers
- Operations Perspective // Stakeholders include infrastructure and operations leaders, site reliability engineers, information technology service managers

## AWS Account Credit Application Order

- Credits are applied in the following order
	- Soonest expiring
	- Least number of applicable products
	- Oldest credit

## OSI Layer Architecture Summary

- Layer 7 // Application Layer (HTTP, HTTPS requests occur here / AWS WAF applies here)
- Layer 6 // Presentation Layer
- Layer 5 // Session Layer
- Layer 4 // Transport Layer (TCP, UDP data transmission occurs here / AWS Shield applies here)
- Layer 3 // Network Layer (Physical movement through network determined / AWS Shield applies here)
- Layer 2 // Data Link Layer 
- Layer 1 // Physical Layer

## Cloud Migration - The 7 R's Summary
- Retire // Turn things off if you don't need them
- Retain // Do nothing for now
- Relocate // Move apps from on-prem to Cloud version, or EC2 instances between VPC, regions, etc.
- Rehost ("Lift and shift") // Simple migrations via re-hosting on AWS, or migrate machines to AWS cloud
- Replatform ("Lift and reshape") // Leverage cloud optimizations such as migrating database to RDS or app to Elastic Beanstalk
- Repurchase ("Drop and shop") // Move to different product while also moving to cloud (e.g., HR -> Workday)
- Refactor/Re-architect // Reimagine application architecture using cloud native features (move to serverless, etc.)

## Reservations to Optimize Costs Summary

_A three-year term is always more cost-effective than a one-year term_  
_Within a given term, all upfront is more cost effective than partial upfront, and partial upfront is more cost-effective than no upfront_

- EC2 // Reserved Instances (RI); discount applied to running on-demand instances
- DynamoDB // Reserved Capacity; if predicting read/write throughput is possible, savings are significant over normal provisioned capacity
- ElastiCache // Reserved Nodes; low, one-time payment for each cache node to reserve, discounts hourly charge for node
- RDS // Reserved Instances (RI); no upfront, partial upfront, all upfront with all reserved instance types available
- Redshift // Reserved Nodes; commit to paying for 1- or 3-year duration

## Encryption by Default Summary

- AWS S3 // All S3 buckets are encrypted by default; objects also encrypted server-side by default with SSE-S3 keys
- AWS Storage Gateway // All data transferred between gateway and AWS storage is encrypted with SSL by default
- CloudTrail Logs // Log files delivered to S3 bucket from CloudTrail have SSE-S3 server-side encryption by default
- EFS // Optional, user-enabled encryption in-flight and encryption at-rest available
- EBS // Optional, user-enabled encryption in-flight and encryption at-rest available
- RDS // Additional feature requiring user to enable
- Redshift // Optional setting

## Multi-AZ Deployments vs Multi-Region Deployments vs Read Replicas Summary

- Multi-AZ Deployments // High availability; span at least two AZs in a region
- Multi-Region Deployments // Disaster recovery, local performance; each region can have a multi-AZ deployment
- Read Replicas // Scalability; can be within AZ, cross-AZ or cross-region

## Storage Gateways Summary

- AWS Storage Gateways // Bridge between on-prem and cloud data; used for disaster recoverr, backup & restore, on-prem caching
- AWS File Gateway // Recent data cached in file gateway; plug app server into S3 gateway piped to non-Glacier S3 bucket
- AWS Volume Gateway // Block storage; cached volumes provide low latency access to recent data; stored volumes keep entire dataset on-prem with scheduled backups to S3
- AWS Tape Gateway // Used for physical tapes; Virtual Tape Library (VTL) backed by S3 and Glacier

## S3 Storage Retrieval by Storage Class Summary

- _Because S3 buckets are regional, all S3 Storage Classes store data in a minimum of 3 AZs_
- _S3 Intelligent Tiering can move objects between tiers based on usage_

- Amazon S3 Standard // Frequently accessed data
- Amazon S3 Standard - Infrequent Access // Less costly than Standard; less frequent access, rapid retrieval
- Amazon S3 One Zone - Infrequent Access (S3 One Zone - IA) // 20% less cost than S3 Standard-IA; Less frequent access but rapid retrieval
- Amazon S3 Glacier - Instant Retrieval // Archived data, retrieved in milliseconds
- Amazon S3 Glacier - Flexible Retrieval // Archived data, retrieval times between 1m-12h
- Amazon S3 Glacier - Deep Archive // Archived data, retrieval time between 12h-48h

## AWS Route 53 Routing Policies Summary

- Simple Routing // For single resource performing a given domain function; web server to serve content for example.com website
- Failover Routing // Configure active-passive failover
- Geolocation Routing // User location determines routing
- Latency Routing // With resources in multiple AWS regions, route traffic to region with lowest latency
- Multivalue Answer Routing // Use when Route 53s response to DNS queries with up to 8 healthy records is desired
- Weighted Routing // Route traffic to multiple resources in proportions specified

## IAM Policy Architecture

- Version // Version of policy language to use
- Statement
  - Sid (optional) // Statement ID can differentiate statements
  - Effect // Allow or Deny
  - Principal (optional) // Required if policy is resource-based to indicate whose access is described here
  - Action // List of actions the policy allows or denies
  - Resource (optional) // Required if policy is permissions-based, specifies resources to which policy applies
  - Condition (optional) // Specify circumstances under which this policy grants permission

---

## IAM Summary

_IAM is free to use_

- Users // Mapped to physical users, have password for AWS Console
- Groups // Contains users exclusively
- Policies // JSON document outlining permissions for users or groups
- Roles // Used for EC2 Instances or AWS Services
- Security // MFA + Password Policy
- AWS CLI // Manage AWS services using the command line
- AWS SDK // Manage your AWS services using a programming language
- Access Keys // Access AWS using CLI or SDK
- IAM Credential Report // Lists all account's users and status of their credentials 
- IAM Access Advisor // Shows service permissions granted to a user and when they were last accessed

## EC2 Summary 

- EC2 Instance // AMI (OS) + Instance Size (CPU + RAM) + Storage + Security Groups + EC2 User Data
- Security Groups // Firewall attached to the EC2 Instance
- EC2 User Data // Script launched at first start of an instance
- SSH // Start terminal into EC2 Instance on port 22
- EC2 Instance Role // Link to IAM Roles
- On-Demand Instances // Short workload, predictable pricing, pay by the second
- Spot Instances // Short workloads, cheap, can lose instances (less reliable than on-demand)
- Dedicated Hosts // Most expensive; physical server booked; good for server-bound software licenses
- Dedicated Instance // No other customers share hardware
- Capacity Reservations // Reserve capacity in specific AZ for any duration
- Reserved Instances (RIs) // Maximum 72% billing discount applied to on-demand instances; 1- or 3-year terms; for long workloads; convertible RIs with flexible instances exist
- Savings Plans // 1- or 3-year terms; commitment to amount of usage; good for long workloads

## EC2 Instance Summary

- EBS (Elastic Block Store) Volumes // Network drives attached to one EC2 instance at a time; mapped to availability zones; can use EBS Snapshots for backups/transfer of EBS Volumes across AZ; persist after EC2 instance is terminated
- EBS Snapshots // Stored incrementally; users billed only for changed blocks stored
- AMI (Amazon Machine Image) // Create ready-to-use EC2 instances with our customizations in place
- EC2 Image Builder // Automatically build, test, distribute AMIs
- EC2 Instance Store // High performance hardware disk attached to our EC2 instance; lost if our instance is stopped/terminated
- EFS // Network file system, can be attached to hundreds of instances in the same region; works across AZs
- EFS-IA // Cost-optimized storage clas for infrequently accessed files
- FSx for Windows // Network file system for Windows servers
- FSx for Lustre // High performance computing Linux file system

## ELB & ASG Summary

- Agility // Quickly spin up and deploy resources in the cloud
- Elasticity // Provision resources based on actual need; scale resources up and down to fit needs
- Vertical Scalability (Scaling up or down) // Think elasticity; Allocate more or less resources (CPU, RAM) to one instance
- Horizontal Scalabililty (Scaling out or in) // Think elasticity; increase or decrease number of instances; duplicating resources, implies distributed systems
- High Availability // Running an app/system in at least 2 AZs
- Elastic Load Balancers (ELB) // Distribute traffic across backend EC2 instances; can be multi-AZ; supports health checks
  - Application Load Balancer // Layer 7; application layer
  - Network Load Balancer // Layer 4; network layer; ultra-high performance; allows for TCP
  - Gateway Load Balancer // Layer 3
  - Classic Load Balancer // L4 + L7; retired in 2023
- Auto Scaling Groups (ASG) // Free to use; implements elasticity based on demand on system; can be multi-AZ; integrated with ELB; cannot change instance types

## S3 Summary

_Outbound data tranfers to the Internet from all AWS regions is billed at a tiered, region-specific rate_
_Inbound data tranfers into AWS regions from the Internet is free_

- Buckets // Global unique names; tied to region; best thought of as folders in file directory analogy
- Objects // Contents of buckets; best thought of as files in file directory analogy
- Security // IAM policy; S3 bucket policy; S3 encryption
- Websites // Host static website on S3
- Versioning // Multiple versions for files; prevent accidental deletes
- Replication // Same-region or cross-region; must enable versioning
- Storage Classes // Lifecycle rules can move objects between storage classes
  - Amazon S3 Standard - General Purpose
  - Amazon S3 Standard - Infrequent Access (IA)
  - Amazon S3 One Zone - Infrequent Access
  - Amazon S3 Glacier - Instant Retrieval
  - Amazon S3 Glacier - Flexible Retrieval
  - Amazon S3 Glacier - Deep Archive // retrieve data in 12 or 48 hours
- Snowball // Import data into S3 through physical device; example of edge computing
- Storage Gateway // Hybrid solution to extend on-prem storage to S3
- S3 Replication // Versioning must be enabled in source and destination buckets; asynchronous copying; cross-region replication (CRR) or same-region replication (SRR)
- S3 CRR (Cross-Region Replication) // Copy bucket contents across regions; meet compliance requirements; minimize latency; increase operational efficiency
- S3 SRR (Same-Region Replication) // Copy bucket contents within region; aggregate logs; configure live replication between prod and test accounts; abide by data sovereignty laws


## Databases & Analytics Summary in AWS Summary

- RDS (Relational Database Service) // OLTP; Managed DB service using SQL as query language; Postgres; MySQL; Oracle; MariaDB; Microsoft SQL Server
- Aurora // AWS implementation of PostgreSQL or MySQL as AuroraDb; "cloud-optimized" versions of same
- DocumentDb // AWS implementation of MongoDb (NoSQL database)
- Athena // Serverless query service to analyze data stored in Amazon S3 using SQL language
- DynamoDb // Serverless; fully managed NoSQL database replicated across 3 AZs; distributed "serverless database"; not relational database
- DynamodDb Accelerator - DAX // Fully managed in-memory cache for DynamoDb only
- DynamoDb Global Tables // Makes DynamoDb table accessible in multiple regions; active-active replication enables read/write to any AWS region
- ElastiCache // AWS fully managed Redis or Memcached equivalent; in-memory database for read-intensive workloads
- Relational Databases (OLTP / Online Transaction Processing) // RDS & Aurora (SQL)
- Warehouse (OLAP / Online Analytical Processing) // Redshift (SQL)
- EMR (Elastic MapReduce) // Creates Hadoop clusters of hundreds of Ec2 instances to process big datasets
- QuickSight // Serverless ML-powered business intelligence service to create interactive dashboards
- Neptune // Graph database, highly available
- Timestream // Time series database
- QLDB (Quantum Ledger Database) // Review history of all changes made to application data over time; immutable
- Amazon Managed Blockchain // Join public blockchain networks or create scalable private network
- AWS Glue // Serverless ETL (extract, transform, load); prepare data for analytics
- DMS (Database Migration Service) // Homogenous or heterogenous migrations supported; source DB is available during migration

## Other Compute Summary 

- Docker // Like ECS; run applications using containers
- ECS (Elastic Container Service) // Like Docker; run applications on EC2 instances
- AWS Fargate // Serverless; run Docker containers without provisioning infrastructure
- ECR (Elastic Container Registry) // Like DockerHub; private Docker image repository
- AWS Batch // Run batch jobs on AWS across managed EC2 instances
- Lightsail // Predictable and low pricing for simple, preconfigured apps and database stacks

## AWS Lambda Summary 

- AWS Lambda // Serverless; FAAS (Function As A Service); run functions on-demand; billed by time run x RAM provisioned and by number of invocations; invocations capped at 15 minutes in length; use API Gateway to expose Lambda functions as HTTP API

## Deployment Summary

- CloudFormation (AWS) // Like Terraform; infrastructure as code, works with almost all AWS resources; repeat across regions and accounts
- Elastic Beanstalk (AWS) // Platform as a Service, limited to certain programming languages or Docker; PHP, Java, .NET, Node, Python, etc.; Deploy code consistently with known architecture (ALB + EC2 + RDS)
- CodeDeploy (Hybrid) // Deploy and upgrade application onto servers
- Systems Manager (Hybrid) // Patch, configure, run commands at scale
- Systems Manager Session Manager // Fully managed, browser-based shell and CLI; access across instances
- CodeCommit // Store code in private git repo
- CodeBuild // Build and test code in AWS
- CodeDeploy // Deploy code onto servers
- CodePipeline // Orchestration of pipeline (CICD)
- CodeArtifact // Store packages/dependencies on AWS
- AWS CDK // Define cloud infra using specific programming language

## Cloud Monitoring Summary

- CloudWatch // Resource performance monitoring, events and alerts
	- CloudWatch Metrics // Monitor performance of AWS services and billing metrics
	- CloudWatch Alarms // Automate notifications, perform EC2 actions, notify to SNS based on metric
	- CloudWatch Logs // Collect log files from EC2 instances, on-prem servers, Lambda functions
	- EventBridge // Scheduling processes; react to events in AWS, or trigger a rule/process on a schedule using Amazon EventBridge Scheduler
- CloudTrail // Account-specific activity and audit; audit API calls made within your AWS account, investigate after the fact
  - CloudTrail Insights // Automated analysis of CloudTrail events
- X-Ray // Trace requests made through your distributed applications, investigate in real-time
- AWS Health Dashboard // Status of all AWS services across all regions
- AWS Account Health Dashboard // AWS events that impact your infrastructure
- Amazon CodeGuru // Automated code reviews, application performance recommendations

## VPC Summary

- VPC (Virtual Private Cloud) // Spans all AZs in region; provisioned logically isolated section of AWS cloud in which to launch resources in virtual network; can create subnets, select IP address range, and configure routing and network gateways; cannot connect on-prem network to cloud
  - Internet Gateway // Connects VPC to public internet, provides Internet access to VPC
  - VPC Peering // Connect two VPCs with non-overlapping IP ranges, nontransitive
  - Transit Gateway // Connect thousands of VPC and on-premises networks together
  - VPC Endpoints // Provide private access to AWS services within VPC: two types are interface endpoints and gateway endpoints
    - VPC Gateway Endpoint // AWS S3 & DynamoDb only; gateway specified by user as target for route in route table for traffic bound to AWS service
    - VPC Interface Endpoint // All other AWS services (includes S3); elastic network interface with private subnet IP; entry point for traffic to supported AWS service
  - PrivateLink // Private connection to service in a 3rd party VPC
  - VPC Flow Logs // Network traffic logs
- Subnets // Spans one AZ in region; part of a VPC; tied to AZ, represents network partition of VPC
  - NAT Gateway (AWS Managed) & NAT Instances (Self-managed) // Give internet access to private subnets
  - NACL (Network Access Control List) // Stateless, subnet rules for inbound and outbound; IP addresses only, supports DENY and ALLOW rules
  - Security Groups // Stateful, operate at EC2 Instance level or ENI level; IP addresses and other security groups, ALLOW rules only
- AWS VPN // Establish secure connection from on-prem, remote offices or client devices to AWS global network; consists of Site-to-site VPN or Client VPN
  - Site-to-Site VPN // VPN over public internet between on-premises DC and AWS
  - Client VPN // OpenVPN connection from your computer into your VPC
- Direct Connect // Direct private connection from on-prem straight to AWS, public internet not involved
- Elastic IP // Fixed public IPV4, ongoing cost if not in-use

---

## Shared Responsibility Model

- AWS Responsibility // Security OF the Cloud
  - Protecting infrastructure (hardward, software, facilities and network) that runs all AWS Services
  - Managed services like S3, DynamoDb, RDS, etc.
- Customer Responsibility // Security IN the Cloud
  - For EC2 Instance, customer is responsible for management of
    - Guest OS, including security patching and updates
    - Firewall & network configuration
    - IAM 
    - Encryption; encrypting application data
- Shared Controls
  - Patch management
  - Configuration management
  - Awareness and training

## RDS Example of Shared Responsibility Model

- AWS Responsibility
  - Manage underlying EC2 Instance, disable SSH access
  - Automated DB patching
  - Automated OS patching
  - Audit underlying instance and disks, guarantee functionality
- Your Responsibility
  - Check ports / IP / security group inbound rules in DB's security group
  - In-database user creation, permissions
  - Create database with or without public access
  - Ensure parameter groups or DB is configured to only allow SSL connections

## S3 Example of Shared Responsibility Model

- AWS Responsibility
  - Guarantee storage is unlimited
  - Gurantee data is encrypted
  - Ensure separation of data between customers
  - Ensure AWS employees cannot access data
- Your Responsibility
  - Bucket configuration
  - Bucket policy / public settings
  - IAM user and roles
	- Enabling encryption

## Security and Compliance Summary

- Shared responsibility on AWS
- Shield // Automatic DDoS Protection + 24/7 support for advanced
  - Shield Standard // Enabled for all customers at no cost; protects against typical DDoS attacks
  - Shield Advanced // Additional fee; 24x7 DDoS response team on standby; detailed real-time metrics and reports available
- WAF // Firewall to filter incoming requests based on rules
  - Protects against common web exploits affecting availability, compromising security, or consume excessive resources
- KMS // Encryption keys managed by AWS
- CloudHSM (Hardware Security Module) // Hardware encryption, we manage encryption keys
- AWS Certificate Manager // Provision, manage, deploy SSL/TLS Certificates
- Artifact // Get access to compliance reports like PCI, ISO, etc.
- GuardDuty // Protects AWS Account by checking VPC, DNS & CloudTrail logs to assess malicious activity/unauthorized behavior
- Inspector // Automated protection of EC2 instances, ECR images and Lambda functions against exposure, vulnerabilities and deviations from best practices; also tests network accessibility of EC2 instances and security state of apps running on instances
- Network Firewall // Protect VPC against network attacks
- Config // Track config changes and compliance against rules
- Macie // Find sensitive data (ex: PII or personally identificable information) in Amazon S3 buckets
- CloudTrail // Account-specific activity and audit; track API calls made by users within account
- AWS Security Hub // Gather security findings from multiple AWS accounts
- Amazon Detective // Find the root cause of security issues or suspicious activities
- AWS Abuse // Report AWS Resources used for abusive or illegal purposes
- Root User Privileges // 
  - Change account settings
  - Close your AWS account
  - Change or cancel your AWS support plan
  - Register as a seller in the Reserved Instance Marketplace
- IAM Access Analyzer // Identify which resources shares externally outside zone of trust
- Firewall Manager // Manage security rules across an Organization (WAF, Shield, etc...)
- AWS Secrets Manager // Rotate, manage and retrieve database credentials, API keys, etc. throughout lifecycle

---

## Machine Learning Summary

- Rekognition // Face detection, labeling, celebrity recognition
- Transcribe // Audio to text (subtitles)
- Polly // Text to audio
- Translate // Translations
- Lex // Build conversational chatbots
- Connect // Cloud contact center
- Comprehend // Natural language processing to find meaning, insights in text
- SageMaker // Machine Learning (build, train, deploy) for every developer and data scientist
- Kendra // ML-powered search engine
- Personalize // Real-time personalized recommendations
- Textract // Detect text and data in documents

---

## AWS Support Plans

### Basic Support Plan
- Customer Service & Communities // 24x7 access to customer service, documentation, white papers and support forums
- AWS Trusted Advisor // Access to 7 core Trusted Advisor checks and guidance to provision resources following best practices
- AWS Personal Health Dashboard // Personalized view of health of AWS services, alerts when resources are impacted

### Developer Support Plan
- All Basic Support Plan Features plus...
- Business Hours Email Access // To Cloud Support Associates (unlimited cases / unlimited contacts)
  - Case severity / response times
    - General Guidance // Within 24 business hours
    - System Impairments // Within 12 business hours

## Business Support Plan (24/7) 

- Intended for use with production workloads
- AWS Trusted Advisor // Full set of checks and API access
- 24x7 phone, email and chat access to Cloud Support Engineers
  - Unlimited cases / unlimited contacts
  - Access to Infrastructure Event Management for additional fee
  - Case severity / response times
    - General Guidance // Within 24 business hours
    - System Impairments // Within 12 business hours
    - Production system impaired // Within four hours
    - Production system down // Within the hour

## Enterprise On-Ramp Support Plan (24/7) 

- Intended for use with production or business critical workloads
- All of Business Support Plan plus...
- Access to pool of Technical Account Managers (TAM)
- Concierge Support Team // For billing and account best practices
- Infrastructure Event Management, Well-Architected & Operations Reviews
  - Case severity / response times
    - General Guidance // Within 24 business hours
    - System Impairments // Within 12 business hours
    - Production system impaired // Within four hours
    - Production system down // Within the hour
		- Business-critical system down // Within a half hour

## Enterprise Support Plan (24/7)

- Intended for use with mission-critical workloads
- All of Business Support Plan plus...
- Access to designated Technical Account Manager (TAM)
- Concierge Support Team // For billing and account best practices
- Infrastructure Event Management, Well-Architected & Operations Reviews
- Access to AWS Incident Detection and Response (for additional fee)
  - Case severity / response times
    - General Guidance // Within 24 business hours
    - System Impairments // Within 12 business hours
    - Production system impaired // Within four hours
    - Production system down // Within the hour
		- Business-critical system down // Within fifteen minutes

## Account Best Practices Summary

- Organizations // Centrally manage billing; control access, compliance and security; share resources across AWS accounts; automate account creation; create groups of accounts to reflect business needs; apply governance policies to groups
- SCP (Service Control Policies) // Restrict account power (affects root user, unlike IAM)
- AWS Control Tower // Easily setup multiple accounts with best-practices
- Use Tags & Cost Allocation Tags // Easy management and billing (!)
- IAM Guidelines // MFA, least-privilege, password policy, password rotation
- Config // Resource-specific change history, audit and compliance; record all resources' configurations & compliance, over time
- CloudFormation // Like Terraform; deploy stacks across accounts or across regions
- Trusted Advisor // High-level AWS account assessment provides insights, support plan adapted to your needs; helps provision resources following best practices for cost optimization, performance, security, fault tolerance, and service limits; full set of checks on Business or Enterprise Support Plan
- S3 or CloudWatch Logs // Destination for service logs or access logs
- CloudTrail // Account-specific activity and audit; record API calls made within your account
- AWS Service Catalog // Users and organizations can create and manage catalogs of IT services approved for use on AWS; virtual machine images, servers, software
- APN (AWS Partner Network) Consulting Partner // Professional services firm to help customers design, architect, build, migrate and manage workloads on AWS
- APN (AWS Partner Network) Technology Partner // Provide hardware, connectivity services, or software solutions hosted on or integrated with AWS Cloud
- If your account is compromised // Change root password; delete and rotate all passwords / keys; contact AWS support

## Billing Summary

- Compute Optimizer // Uses machine learning to recommend optimal resource configurations to reduce cost; applies to some types of Ec2 instances, EC2 auto scaling groups, EBS volumes, and Lamda functions
- Simple Monthly Calculator / Pricing Calculator // Determine cost of services on AWS
- Billing Dashboard // High level overview
- Cost Allocation Tags // Tag resources to create detailed reports; each tag key must be unique, and each tag key can have only one value; user must activate AWS-generated and user-defined tags separately to appear in Cost Explorer or reports
- Cost Explorer // View current usage in detail and forecast future usage
- Cost and Usage Reports // Most comprehensive billing dataset; more involved than Cost Explorer
- Billing Alarms // In \`us-east-1\`, track overall and per-service billing
  - Only sends alerts when costs and usage actually exceed budget
- Budgets // More advanced than Billing Alarms, track usages, costs, RI, and get alerts; sends alerts as CloudWatch Billing Alarms and also when cost and usage are forecast to exceed budget; four budget types are Cost Budget, Usage Budget, Reservation Budget, and Savings Plans Budget
- Savings Plans // Easy way to save based on long-term usage of AWS
- Cost Anomaly Detection // Detect unusual spends with machine learning
- Service Quotas // Notify when you're close to a service quote threshold

---

## Advanced Identity Summary 

- IAM // Identity and Access Management 
- IAM Identity Center // One login for multiple AWS accounts and applications
- Organizations // Manage multiple accounts
- Security Token Service (STS) // Temporary, limited privileges credentials to access AWS resources
- Cognito // Create a database of users for your mobile & web applications
  - Also add user sign-up, sign-in and access control to web/mobile apps
- Directory Services // Integrate Microsoft Active Directory (AD) in AWS

---

## Other Services Summary

- Amazon Workspaces // Desktop as a Service to provision Windows or Linux desktops
  - Eliminate management of on-premise VDI (Virtual Desktop Infrastructure)
- Amazon AppStream 2.0 // Desktop Application Streaming service delivered from within a web browser
	- Configurable compared to Workspaces
- IOT Core // Connect IoT devices to AWS Cloud, serverless
- Elastic Transcoder // Converts media files stored in S3 into media file formats required by consumer playback devices
- AWS AppSync // Store and sync data across mobile and web apps in real time with GraphQL
- AWS Amplify // Set of tools and services to develop and deploy full-stack web and mobile apps
- AWS Infrastructure Composer // Visually design and build serverless apps quickly on AWS
- AWS Device Farm // Fully managed service to concurrently test web and mobile apps against desktop browsers, real mobile devices, tablets, etc.
- AWS Backup // Centrally manage and automated backups across AWS services, can be scheduled and restored
- AWS Elastic Disaster Recovery (DRS) // Quickly recover physical, virtual and cloud-based servers into AWS with continuous block-level replication for servers
- AWS DataSync // Move lots of data from on-prem to AWS, supports scheduling, replication is incremental after first load
- AWS Application Discovery Service // Plan migration projects by gathering info about on-prem data centers and dependency mapping
  - AWS Agentless Discovery Connector // VM inventory, config, performance history
  - AWS Application Discovery Agent // System config, perofmrance, processes, details of network connections between systems
  - View results in AWS Migration Hub
- AWS Application Migration Service // Rehost solution simplifies migration apps to AWS
- AWS Migration Evaluator // Builds data-driven business case for migration to AWS with baseline of current architecture
- AWS Migration Hub // Central location collects servers and app inventory data for assessing, planning, tracking mgirations to AWS
  - AWS Migration Hub Orchestrator // Provides pre-build templates to save time
  - Status updates from Application Migration Service and Database Migration Service 
- AWS Fault Injection Simulator // Chaos engineering, runs fault injection experiments on AWS workloads
- AWS Step Functions // Serverless visual workflow to orchestrate lambda functions
- AWS Ground Station // Fully managed service to control satellite communications, process data, scale satellite operations
- AWS Pinpoint // Scalable two-way (outbound/inbound) marketing communications service
- AWS Global Accelerator // Availability and performance improvements; uses AWS global network to optimize path from users to applications; traffic improvements up to 60%
- Amazon MQ // Fully managed message broker service for RabbitMQ or ActiveMQ
- AWS Marketplace // Any AWS account can be buyer (subscriber); register AWS account to become a seller (provider); digital catalog with thousands of software listings from independent software vendors; simplifies finding, testing, buying and deploying software to run on AWS
- AWS OpsWorks // Configuration management service that provides managed instances of Chef and Puppet to automate how servers are configured, deployed and managed across EC2 instances or on-prem
- AWS Knowledge Center // Troubleshooting starting point; contains most frequent & common questions and request, and AWS-provided solutions for the same
- AWS Support Center // Hub for managing your support cases; Developer Support Plans and higher can chat or call engineers; Enterprise-level customers have dedicated TAM

## Cram Summary 

- Savings Plans // Applies to EC2 instances; Compute Savings Plans (66% cost reduction); EC2 Instance Savings Plan (up to 72% savings)
- Compute Savings Plan // Cost reduction up to 66%, apply automatically to EC2 instances, Fargate and Lambda
- EC2 Instance Savings Plan // Lowest prices; cost reduction up to 72%; selected instance family in a region
- Security Group // Think EC2 instances; virtual firewall to control incoming and outgoing traffic
- Network Access Control List (NACL) // Think VPC; virtual firewall for incoming and outgoing subnet traffic
- AWS CloudTrail Insights // Think API Calls; continuously analzes CloudTrail management events
- AWS Management Console // Think MFA, U+P for best practices
- Cost Allocation Tags // Think customer-enabled; organize cost by billing dimensions
- Amazon Detective // Think internal security, GuardDuty plus; analyze VPC flow logs, CloudTrail and GuardDuty; examine resources, users and interactions between
- Amazon Inspector // Think external security, not "Detective"; test network accessibility of EC2 instances, security state of apps on those instances
- AWS CloudTrail // Think history, logging; provides visibility into user activity by recording actions taken on account
- AWS Trusted Advisor // Think provisioned optimization; guidance to help provision resources following best practices
- AWS OpsHub // Think Snowball; GUI to manage Snowball devices
- AppStream 2.0 // Think desktop streaming; centrally manage desktop applications, stream to any computer
- AWS Transfer Family // Think FTP; aggregated name for "AWS Transfer for SFTP", "AWS Transfer for FPTS", and "AWS Transfer for FTP"
- Backup and Restore Strategy // Think "redeploy"; replicate data to other regions
- Pilot Light Strategy // Think "waiting to ignite"; waiting copy of infra in different region
- Warm Standby Strategy // Think "ready to go"; scaled down functional copy in secondary region waiting for scale up
- Multi-Site, Active-Active Strategy // Think "simultaneous"; running workoad in multiple regions
- EC2 Instance Types // Compute-optimized, Memory-optimized, Storage-optimized, Accelerated computing-optimized
- Compute-Optimized Instance Types // Think "HPC"; designed for machine learning, high-perf web servers, scientific modeling, etc.
- Storage-Optimized Instance Types // Think "read/write big data"; used for data warehousing, log processing, very large datasets
- Accelerated compting-Optimized Instance Types // Think "graphics"; GPU compute, GPU graphics, and FPGA programmable hardware types available
- AWS Resource Groups // Think "organizing resources"; manage, automate resources simultaneously
- AWS Organizations // Think "organizing accounts"; can only make, organize and decorate accounts with minor billing capability (Consolidated Billing combines member accounts into management account for single bill)
- Amazon DynamoDb Accelerator (DAX) // Think "DynamoDb cache"; AWS recommends this over ElastiCache for DynamoDb itself
- CloudTrail Events // Record of activity in an AWS account, has three types: management events (default), data events (opt-in, additional cost), CloudTrail Insights events (opt-in, additional cost)
- Management Events // Default CloudTrail event type; describes management operations in account like setting up logging, registering devices, configuring routing; "control plane operations" 
- Data Events // High-volume events; opt-in CloudTrail event type at additional cost; describes operations on resources; S3 API, Lambda execution, S3 activity on AWS Outposts; "data plan operations"
- CloudTrail Insight Events // Opt-in CloudTrail event type; describe unusual activity in AWS account; disabled when trail is created, must be enabled
- AWS Control Tower // Think "landing zones"; deploy and govern multi-account AWS environment, day-to-day reminders
- AWS Elastic Beanstalk // Think "Free, easy EC2"; no charge to deploy AWS Elastic Beanstalk, just pay for underlying resources consumed
- AWS Partner Solutions (Quick Starts) // Think "reference deployments"; compress procedures into several steps for specific workloads
- AWS Architecture Center // Think "architecture center"; contains diagrams, solutions, patterns, and best practices for reference architectures
- Infrastructure Event Management // Think "bespoke Enterprise O-R plus"; short-term engagement with AWS support for deeper understanding of customer use cases
- AWS Global Services // Think "IAM, Route 53, and Work- stuff"; Route 53, Chime, WorkDocs, WorkMail, WorkSpaces, and WorkLink
- AWS WAF Coverage // Think "WAF CDN"; tightly integrated with CloudFront, Application Load Balancer, API Gateway and AppSync which are all content delivery solutions
- AWS Edge Locations // Think "CDN caching"; data centers strategically located for content delivery`,Qd=`# AWS SAA-C03 Study Guide

Organized by AWS product: each service appears once, with its definitions, features, limits and exam cues as bullets.

## Compute

### Amazon EC2


Amazon Elastic Compute Cloud provides resizable virtual machines with control over operating system, CPU, memory, storage, and networking. Choose EC2 when an application needs server-level control, custom software, or long-running compute.

#### What it is
- **Infrastructure as a service**: AWS supplies virtual machines; you choose and manage the OS, applications, and instance configuration.
- EC2 commonly combines with **EBS or instance store** for storage, **Elastic Load Balancing** to distribute traffic, and **Amazon EC2 Auto Scaling** to adjust fleet size.
- Instances run in a selected **Region and Availability Zone** and can use Linux, Windows, or macOS images where supported.

#### Instance types
- Instance names encode **family, generation, and size**; for example, \`m5.2xlarge\` is an M-family, fifth-generation, 2xlarge instance.
- **General purpose** M/T instances balance CPU, memory, and networking for web servers, application servers, and development environments.
- **Compute optimized** C instances suit CPU-bound work such as batch processing, media transcoding, scientific modeling, high-performance web servers, and gaming.
- **Memory optimized** R/X instances suit in-memory databases, caches, large data sets, and real-time analytics.
- **Storage optimized** I/D/H instances emphasize high local-storage I/O for NoSQL or OLTP databases, data warehouses, and distributed file systems.
- **Accelerated computing** instances use GPUs or other specialized accelerators for machine learning, graphics, and parallel processing; **HPC optimized** instances target tightly coupled high-performance computing.
- **Burstable T instances** accumulate CPU credits while below their baseline and spend credits to burst above it; sustained CPU use can exhaust credits or incur surplus-credit charges in Unlimited mode.
- **Nitro System** offloads virtualization, storage, and networking functions to dedicated hardware and supports high I/O performance, bare-metal options, and hardware-based security.

#### Purchase options and capacity
- **On-Demand** has no term or upfront commitment and is suitable for short-lived, unpredictable, or interruption-intolerant workloads; Linux and Windows instances are generally billed per second with a 60-second minimum, while some licensed OS charges are hourly.
- **Standard Reserved Instances** commit for **1 or 3 years** to matching attributes and can discount steady-state use by up to **72%** versus On-Demand; Regional reservations provide billing flexibility, while Zonal reservations also reserve capacity in one AZ.
- **Convertible Reserved Instances** can be exchanged for different instance families, operating systems, or tenancy, with less discount than Standard RIs (up to **66%** in the course comparison); RIs are billing discounts, not automatically capacity reservations unless Zonal.
- **Savings Plans** commit to a steady hourly spend for **1 or 3 years** and can discount eligible use by up to **72%**; an EC2 Instance Savings Plan is tied to an instance family and Region but allows size, OS, and tenancy flexibility, while a Compute Savings Plan is broader.
- **Spot Instances** use spare capacity and can cost up to **90% less** than On-Demand; use them for fault-tolerant, distributed, batch, or flexible-time work, not critical uninterrupted services or databases. A one-time request is fulfilled once, while a persistent request can be reopened after interruption; canceling a request does not terminate an already-running instance.
- A Spot interruption can give a **two-minute warning** before stop or termination; design jobs for interruption and checkpoint/retry. Spot Fleets can combine Spot and optional On-Demand capacity across pools and optimize for lowest price, diversification, capacity, or price-capacity (the recommended general strategy).
- **Dedicated Hosts** reserve a physical server for your use, provide visibility/control over placement, and support socket/core-based BYOL licensing and compliance; they are usually the most expensive option and can be On-Demand or Reserved, with 1- or 3-year reservations offering up to 70% off in the course comparison.
- **Dedicated Instances** run on hardware dedicated to one account but may share it with that account's other instances; placement is not controlled and can change after stop/start, and they generally cost less than Dedicated Hosts when host-level placement and license visibility are unnecessary.
- **Capacity Reservations** reserve matching On-Demand capacity (including instance type and platform) in a specific AZ for any duration and can be created or canceled at any time; they have no discount and are billed at On-Demand rates even when unused, but can combine with RIs or Savings Plans for discounts.

#### Networking and security
- A **security group** is a stateful, instance-level virtual firewall containing allow rules for inbound and outbound traffic; inbound is blocked by default and outbound is allowed by default until changed.
- Security groups can be attached to multiple instances, reference other security groups, and permit IPv4/IPv6 CIDRs; they are scoped to a VPC and Region, and blocked packets do not reach the instance.
- Common ports: **22 SSH/SFTP**, **21 FTP**, **80 HTTP**, **443 HTTPS**, and **3389 RDP**; a timeout often points to network filtering, while connection-refused usually means the application or listener is not running.
- An **ENI** is a movable virtual network card in one AZ with private IPv4 addresses, security groups, a MAC address, and optional public IPv4/Elastic IP addressing; attaching a prepared ENI to another instance can support failover.
- **ENA / Enhanced Networking** provides higher bandwidth and lower latency through network-interface hardware offload; **EFA** adds OS-bypass communication for tightly coupled HPC and machine-learning workloads.
- **Instance store** is fast, host-attached ephemeral storage suited to cache or scratch data; it cannot be detached and moved, is not captured in an AMI, and should not be the only copy of durable data. An instance's auto-assigned public IPv4 can change after stop/start; an **Elastic IP** is a static public IPv4 address that can be remapped to another instance, but avoid it when DNS or a load balancer is a better design. The default account quota is **5 Elastic IPs** and can be raised by request.
- **IMDS** provides instance-local metadata and temporary credentials; prefer **IMDSv2**, which requires a session token, and do not expose metadata endpoints to untrusted workloads.
- An **instance profile** associates an IAM role with an EC2 instance so applications can obtain temporary credentials instead of embedding long-lived access keys.

#### Images, bootstrap, and lifecycle
- An **AMI** is a Region-scoped machine image containing an OS and optional software/configuration; public, private, and Marketplace AMIs can launch instances, and an AMI can be copied to another Region.
- Creating an AMI from an instance after stopping it for data integrity captures its configuration and creates EBS snapshots, enabling repeatable launches and faster bootstrapping from a prebuilt image.
- **User data** runs bootstrap commands as root, typically only on first boot; use it for initial setup such as installing packages, updates, or common files.
- **Stop** preserves EBS data for a later start; termination deletes EBS volumes whose DeleteOnTermination setting is enabled (the root volume is enabled by default).
- **Hibernate** writes memory state to an encrypted EBS root volume so the OS and applications resume without a full initialization; supported configurations require EBS-backed encrypted root storage, RAM below **150 GB**, and hibernation for no more than **60 days**.
- Hibernation supports selected instance families (including **C3/C4/C5, I3, M3/M4, R3/R4, and T2/T3**) and Amazon Linux, Ubuntu, RHEL, CentOS, and Windows AMIs; RAM must be no greater than **150 GiB**, and the encrypted EBS root volume must have enough space for its memory image. It is available with On-Demand, Reserved, and Spot instances, but not bare-metal sizes.

#### Placement groups
- A **Cluster** placement group packs instances in one AZ for low latency and high throughput; with Enhanced Networking, inter-instance bandwidth can reach **10 Gbps** in the course examples, but an AZ failure can affect the whole group.
- A **Spread** placement group places instances on distinct underlying hardware, can span AZs, and is limited to **7 instances per AZ per group**; use it for a small number of critical, failure-isolated instances.
- A **Partition** placement group separates racks into partitions, supports up to **7 partitions per AZ** and hundreds of instances, can span AZs, and exposes partition information through metadata; use it for distributed systems such as Kafka, Cassandra, or HDFS.

#### Availability and recovery
- **Instance status checks** cover both instance reachability (OS/software/network configuration) and system reachability (underlying AWS host/network); inspect the failed layer before troubleshooting.
- **System status-check auto recovery** can move a supported EBS-backed instance to healthy hardware while retaining its instance ID, private and Elastic IP addresses, metadata, and public IPv4; it does not preserve RAM and does not apply to instance-store-backed instances. A **reboot alarm action** addresses instance status-check failures instead of moving the instance to new hardware.
- An instance status-check failure generally requires guest OS or application remediation; automatic recovery targets eligible underlying-system failures, not every unhealthy application.

#### Compared with
- Use **AWS Lambda** for short event-driven functions without server management, **AWS Batch** for queued jobs with flexible runtimes and no Lambda execution-time ceiling, and **AWS Fargate** for containers without managing hosts.
- Use **Amazon Lightsail** for a simpler bundled VPS experience, and **AWS Elastic Beanstalk** when deploying application code through a managed platform that provisions common EC2 infrastructure.
- **See also:** Amazon EC2 Auto Scaling, Elastic Load Balancing, Amazon ECS, Amazon EKS, AWS Batch

### Amazon EC2 Auto Scaling


Amazon EC2 Auto Scaling maintains an EC2 fleet at a desired capacity and scales it in response to demand or schedules. Choose it for resilient, elastic EC2 fleets that must recover unhealthy instances and balance capacity across AZs.

#### What it is
- An **Auto Scaling group (ASG)** defines minimum, desired, and maximum capacity, launches EC2 instances to meet desired capacity, and replaces instances it considers unhealthy.
- ASGs can automatically register instances with a load balancer and distribute the fleet across selected subnets/AZs; the service has no separate charge beyond its AWS resources.
- A **launch template** specifies AMI, instance type, user data, EBS volumes, security groups, key pair, IAM instance profile, network/subnets, and other launch settings; it supports versioning and overrides for mixed instance groups. Older launch configurations are deprecated in favor of launch templates.

#### Scaling policies
- **Target tracking** adjusts capacity to keep a metric near a target, such as average CPU utilization or ALB requests per target; it is the simplest dynamic policy for maintaining a stable metric.
- **Step scaling** responds to CloudWatch alarm thresholds with different capacity changes for different levels of demand; **simple scaling** is an older alarm-based option.
- **Scheduled scaling** changes minimum, maximum, or desired capacity at known times; **predictive scaling** forecasts recurring future demand and schedules capacity in advance, and can be combined with dynamic scaling.
- Useful signals include average CPU, network throughput, custom CloudWatch metrics, and **ALB RequestCountPerTarget**; pick a metric that reflects application load rather than an unrelated resource.
- **Cooldown** allows launched/terminated instances and metrics to stabilize before another simple scaling action; the default cooldown is **300 seconds**. Target tracking and step scaling use instance warmup behavior rather than the simple-scaling cooldown.

#### Health and lifecycle
- EC2 health checks detect instance/host problems; enabling **ELB health checks** also lets the group replace an instance the load balancer marks unhealthy.
- The **health-check grace period** lets a newly launched instance finish startup before ASG health evaluation; set it to match real application initialization time.
- **Lifecycle hooks** pause launch or termination in a wait state so automation can install software, register, drain connections, or save state before the instance proceeds; heartbeats can extend the wait within the hook's configured timeout.
- **Instance refresh** replaces instances in a rolling manner after a launch-template or AMI update; configure minimum healthy capacity, instance warmup, checkpoints, and optional rollback to control risk.
- **Warm pools** keep initialized stopped, hibernated, or running instances ready to enter the group, reducing scale-out startup latency at additional storage/compute cost.

#### Balancing and termination
- **AZ rebalancing** redistributes instances when the group becomes uneven across AZs, including after capacity changes; it launches replacement capacity before terminating instances in overrepresented AZs to preserve availability, unlike unhealthy-instance replacement which terminates the unhealthy instance first.
- The **termination policy** selects which instances to remove during scale-in; the default first selects an AZ with the most instances and generally chooses an instance using the oldest launch template/configuration in that AZ, helping rebalance the fleet.
- **Standby** places an instance in the group but removes it from service so it can be patched or investigated; suspended processes can selectively pause actions such as ReplaceUnhealthy.
- **See also:** Amazon EC2, Elastic Load Balancing

### Elastic Load Balancing


Elastic Load Balancing distributes incoming connections across healthy targets and provides a managed, highly available endpoint. Choose a load balancer to spread traffic, perform health checks and TLS termination, and integrate with EC2 Auto Scaling, ECS, ACM, CloudWatch, Route 53, and WAF.

#### What it is
- A **listener** accepts a protocol/port and applies a default action plus optional rules; a **target group** contains registered destinations and its own health-check configuration.
- Load balancers can be **internet-facing or internal**; AWS manages the load balancer fleet, maintenance, and availability, while you configure listeners, targets, routing, and security.
- Health checks probe a configured protocol, port, and path; unhealthy targets stop receiving new traffic until healthy again.

#### Application Load Balancer
- **Application Load Balancer (ALB)** operates at Layer 7 for HTTP/HTTPS and supports HTTP/2, WebSockets, redirects, and content-based listener rules.
- ALB rules can route on **host, path, HTTP headers, query strings, and source IP**, making ALB a strong fit for microservices, web apps, and container services.
- ALB target groups support EC2 instances, ECS tasks, private IP addresses, and **Lambda functions**; ALB translates HTTP requests into Lambda JSON events and can use dynamic port mapping for ECS.
- ALB supports **AWS WAF**, security groups, and multiple target groups; HTTPS listeners can authenticate users with Amazon Cognito before forwarding, and health checks are configured at target-group level.
- The target application does not directly see the original client connection; ALB provides the client address and request details in **X-Forwarded-For**, **X-Forwarded-Port**, and **X-Forwarded-Proto** headers.

#### Network Load Balancer
- **Network Load Balancer (NLB)** operates at Layer 4 for TCP, TLS, UDP, and TCP_UDP traffic and targets very high throughput with very low latency.
- NLB provides a **static IP address per AZ** and supports an Elastic IP per enabled AZ, useful for IP allowlists and fixed-address requirements.
- NLB target groups support instances, private IP addresses, and an ALB; health checks can use TCP, HTTP, or HTTPS.
- NLB supports **Proxy Protocol v2** for passing connection metadata to targets that need it; configure target software to parse the protocol where enabled.
- NLB can use security groups when created with security groups; one created without them cannot later have security groups attached.

#### Gateway Load Balancer
- **Gateway Load Balancer (GWLB)** operates at Layer 3 and combines a transparent network gateway with load balancing for third-party virtual appliances.
- GWLB distributes IP traffic to fleets such as firewalls, intrusion detection/prevention, and deep packet inspection appliances using **GENEVE on port 6081**.
- GWLB target groups accept instances or private IP addresses; route tables steer traffic through the gateway for inspection and onward forwarding.

#### Classic Load Balancer
- **Classic Load Balancer (CLB)** is the legacy generation; it supports TCP/SSL at Layer 4 and HTTP/HTTPS at Layer 7 with TCP/HTTP health checks.
- CLB has a fixed AWS hostname and supports only one SSL certificate, so it lacks newer ALB host/path rules and multi-certificate SNI behavior; prefer ALB or NLB for new designs.

#### Shared features and selection
- **Sticky sessions** use cookies to send a client repeatedly to the same target; they can preserve target-local session state but may create uneven load. ALB/CLB duration cookies are named **AWSALB/AWSELB**; ALB application cookies include **AWSALBAPP**, and custom target-generated cookie names must not use reserved ELB names. The cookie expiration can be configured.
- - **Security groups** — For a public application, the load balancer security group admits client traffic while target security groups should admit application traffic only from the load balancer security group.
- **Cross-zone load balancing** distributes each node's requests across targets in all enabled AZs; it is enabled by default for ALB (disable at target-group level), disabled by default for NLB/GWLB/CLB, and enabling it incurs inter-AZ data charges for NLB/GWLB but not ALB/CLB in the course behavior.
- **Connection draining / deregistration delay** stops new requests to a deregistering target while existing requests finish; the configurable period is **1-3600 seconds** and defaults to **300 seconds** for the classic/ALB/NLB behavior described in the course.
- TLS listeners use an **X.509 certificate** managed by ACM or uploaded by you; HTTPS listeners need a default certificate and can attach additional certificates.
- **SNI** lets one listener choose the right certificate from the requested hostname; ALB and NLB support multiple certificates with SNI, while CLB does not.
- Choose **ALB** for HTTP-aware routing, **NLB** for static IPs, TCP/UDP, and extreme performance, and **GWLB** for transparent network appliance inspection; CLB is mainly encountered in legacy systems.
- **See also:** Amazon EC2, Amazon EC2 Auto Scaling, AWS WAF, AWS Certificate Manager

### AWS Lambda


AWS Lambda runs code on demand without managing servers and scales with event volume. Choose it for short, event-driven functions and service integrations; use containers or EC2 for long-running work, arbitrary runtimes, or greater host control.

#### What it is
- **Function as a service**: upload code or a supported container image, configure memory, timeout, and an execution role, then invoke it directly or from an event source.
- Lambda scales execution environments automatically and charges mainly for requests and execution duration; adding memory also increases allocated CPU and network performance. The course pricing example includes **1 million requests and 400,000 GB-seconds per month** in its free tier, then **$0.20 per million requests** plus duration charges metered in **1-ms increments** (the example rate is **$1 per 600,000 GB-seconds**; rates vary by architecture and Region).
- Supported managed runtimes include Node.js, Python, Java, .NET, and Ruby; custom runtimes use the Lambda Runtime API. CloudWatch provides execution metrics, logs, alarms, and monitoring integrations.

#### Limits and deployment
- Memory is configurable from **128 MB to 10,240 MB** in 1-MB increments, and a single invocation can run for at most **900 seconds (15 minutes)**.
- Ephemeral \`/tmp\` storage is configurable from **512 MB to 10,240 MB**; environment variables are limited to **4 KB**.
- A direct ZIP upload is limited to **50 MB compressed**; the uncompressed package plus layers is limited to **250 MB**. Container images can be up to **10 GB** and must implement the Lambda Runtime API.
- Synchronous request and response payloads are normally limited to **6 MB** each; asynchronous invocation payloads are limited to **1 MB**. Event-source-specific batch and record limits also apply.
- Lambda has a default regional concurrency quota of **1,000** concurrent executions, adjustable by request; each account's available unreserved concurrency is shared across functions.
- Function code runs in a managed execution environment; Lambda is not a fit for indefinitely running processes or arbitrary Docker images that do not implement its runtime interface.

#### Invocation and event sources
- **Synchronous invocation** (for example API Gateway, ALB, Function URLs, or SDK calls) waits for the function response and returns execution errors to the caller; callers control their own retry behavior.
- **Asynchronous invocation** (for example S3, SNS, or EventBridge) queues an event and returns before execution; Lambda retries function errors by default and can deliver exhausted events to a dead-letter queue or destination.
- **Event source mappings** poll services such as SQS, Kinesis Data Streams, DynamoDB Streams, and Kafka, batch records, and invoke the function; successful records are checkpointed or deleted according to the source.
- For an SQS mapping, messages are deleted after successful processing; failures become visible for retry after the visibility timeout and can use queue redrive/DLQ policies, so handlers should be idempotent.
- **S3, EventBridge, and SNS** are push-based asynchronous sources, whereas SQS/Kinesis/DynamoDB Streams mappings poll the source; the invocation model affects ordering, retries, and scaling. Other common integrations include API Gateway, CloudFront, Cognito, and CloudWatch Logs/Events; an S3 upload can trigger thumbnail creation and metadata writes to DynamoDB.

#### Errors and delivery
- Asynchronous function errors are retried **twice by default**; throttling and system errors may be retried for up to **6 hours**, with backoff, before expiry or failure handling.
- An asynchronous **DLQ** receives failed event payloads; **destinations** can route success or failure invocation records to services such as SQS, SNS, EventBridge, or another Lambda. Synchronous throttles are returned to the caller as **HTTP 429**; asynchronous failures are queued for retry.
- Event source mappings have source-specific retry, visibility, checkpoint, and redrive behavior; configure partial batch responses where supported to avoid retrying already successful records.
- Lambda handlers should be **idempotent** because events may be delivered more than once, and asynchronous retries can reprocess work.

#### Concurrency and latency
- **Reserved concurrency** sets a function's concurrency ceiling and reserves that amount from the account pool, isolating capacity and limiting downstream pressure; excess synchronous requests are throttled.
- **Provisioned concurrency** keeps a configured number of execution environments initialized to reduce cold-start latency; it incurs charges while provisioned and can be scaled by Application Auto Scaling.
- A **cold start** initializes a new environment, loads code, and runs initialization outside the handler; smaller packages and initialization work reduce its impact.
- **SnapStart** publishes a snapshot of initialized memory/disk state for supported runtimes, reducing initialization latency without a full cold start; the course examples cite Java, Python, and .NET and up to **10x** faster startup at no additional SnapStart charge.

#### Versions, aliases, and shared code
- A **published version** is an immutable snapshot of function code and configuration; \`$LATEST\` remains the mutable working version.
- An **alias** is a stable named pointer to a version and can split traffic between versions for gradual rollout or rollback.
- **Lambda layers** package shared libraries or other dependencies for reuse; a function can attach up to **5 layers**, mounted under \`/opt\`, and layer contents count toward deployment-size limits.
- **Function URLs** provide a built-in HTTPS endpoint for a function, with \`AWS_IAM\` or \`NONE\` authentication; use API Gateway when richer API management, authorization, or request transformation is required.

#### Security, networking, and databases
- The **execution role** grants the running function permission to call AWS services; a trigger or caller may separately need a resource-based policy allowing invocation. Cross-account S3 access requires both the function role and bucket policy to allow the requested access.
- By default a function runs outside your VPC and cannot reach private VPC resources; configure VPC ID, subnets, and security groups to access private RDS, ElastiCache, or internal load balancers.
- VPC attachment creates network interfaces in selected subnets; private-subnet internet access requires NAT or an appropriate endpoint, and the function's security group must allow traffic to the destination.
- Lambda functions that open many database connections can overwhelm RDS; **RDS Proxy** pools and reuses connections and requires the function to reach the proxy in the VPC.
- RDS for PostgreSQL and Aurora MySQL can invoke Lambda for database-event workflows when outbound connectivity and both IAM/resource-based permissions are configured.

#### Edge computing
- **CloudFront Functions** are lightweight JavaScript handlers for viewer request/response events, with sub-millisecond execution and very high request rates; use them for header, URL, cookie, and cache-key changes.
- **Lambda@Edge** uses Node.js or Python for viewer and origin request/response events and supports longer-running logic, network access, and larger packages; author the function in **us-east-1** for CloudFront replication.
- CloudFront Functions cannot access the network, filesystem, or request body; they have sub-millisecond execution, a **2 MB** memory limit, and a **10 KB** package limit. Lambda@Edge supports network/filesystem/body access and viewer plus origin events, with **5-10 seconds** execution and packages of roughly **1-50 MB**; it has higher latency/cost and lower scale than CloudFront Functions.
- **See also:** Amazon EC2, Amazon API Gateway, Amazon S3, Amazon SQS, Amazon ECS, Amazon RDS Proxy

### AWS Batch


AWS Batch schedules and runs large numbers of batch jobs using managed compute environments. Choose it for queued, finite jobs whose compute needs vary or whose runtime exceeds Lambda's limits.

#### What it is
- A **job definition** describes the container image, resources, and job settings; a **job queue** holds work and a **compute environment** supplies capacity.
- Batch schedules dependencies and priorities, provisions suitable compute, and can use EC2, Spot Instances, or Fargate-backed environments; jobs commonly run as ECS/EKS tasks.
- Jobs have a start and finish rather than continuously serving requests; packaged Docker runtimes can use EBS or instance-store disk and have no Lambda-style 15-minute timeout.
- Use Spot for interruption-tolerant work and On-Demand/Fargate for jobs that require more predictable availability; implement retries/checkpointing for interrupted work.
- AWS Batch can run **hundreds of thousands of jobs** at scale. Common workloads include data processing, scientific modeling, media processing, and scheduled file transformations; Batch handles scheduling and capacity rather than application-specific job logic.
- **See also:** Amazon EC2, Amazon ECS, Amazon EKS, AWS Lambda, AWS Fargate

### AWS Elastic Beanstalk


AWS Elastic Beanstalk deploys application code through a managed application platform while exposing the underlying AWS configuration. Choose it when you want AWS to provision common web-application components without writing their orchestration yourself.

#### What it is
- Beanstalk manages capacity provisioning, load balancing, scaling, instance configuration, and application health monitoring using resources such as EC2, Auto Scaling, ELB, and optionally RDS.
- The service itself has no additional charge; you pay for the EC2, load balancer, database, and other resources it creates.
- An **application** groups environments, versions, and configurations; an **application version** is a code iteration, and an **environment** runs one application version at a time.
- **Web server environments** serve requests through a load balancer or single instance; **worker environments** consume SQS messages and can scale based on queue depth.
- A single-instance environment suits development; a load-balanced Auto Scaling environment suits production and high availability.
- Supported platforms include Go, Java, .NET, Node.js, PHP, Python, Ruby, and Docker variants; platform versions and deployment options depend on the chosen platform.
- Developers remain responsible for application code and can customize underlying resources; Beanstalk is not a fully serverless runtime and does not remove all infrastructure decisions.
- **See also:** Amazon EC2, Amazon EC2 Auto Scaling, Elastic Load Balancing, Amazon SQS

### Amazon Lightsail


Amazon Lightsail packages virtual servers and common application infrastructure into a simplified, predictable-price service. Choose it for small websites, development, and simple workloads that do not need the full EC2 configuration surface.

#### What it is
- Lightsail provides bundled virtual private servers (instances) with plans that include a set amount of compute, SSD storage, and data transfer; plan features and prices vary by Region.
- Blueprints and preconfigured applications make it quick to launch common operating systems and web stacks; optional services include managed databases, containers, block storage, snapshots, DNS, static IPs, and load balancers.
- Lightsail manages much of the networking and server setup, while instance-level OS patching and application administration remain the customer's responsibility.
- Use EC2 for specialized instance families, detailed networking/IAM controls, large-scale architectures, or precise placement and capacity needs; Lightsail instances can be connected to or migrated toward broader AWS services.
- **See also:** Amazon EC2, AWS Elastic Beanstalk

### AWS Outposts, Local Zones, and Wavelength


These AWS infrastructure extensions place selected services closer to users, on-premises systems, or 5G devices. Outposts examples include EC2, EBS, S3, EKS, ECS, RDS, and EMR; choose the option based on whether the requirement is a customer data center, a metro area, or a carrier edge.

#### What it is
- **AWS Outposts** installs AWS-managed infrastructure in a customer's data center, extending supported AWS services and APIs on premises for low-latency access, local processing, data residency, and migration; the customer remains responsible for physical security and site readiness.
- **AWS Local Zones** extend selected compute, storage, and other services into a metro area to serve latency-sensitive users or workloads that need data processing near a city but do not require a customer-owned data center.
- **AWS Wavelength** embeds AWS infrastructure in telecommunications providers' 5G networks so mobile applications can reach compute with very low latency without leaving the carrier network.
- The three options provide subsets of regional AWS services, not every service or feature; verify supported services and locations before designing a workload.
- **See also:** Amazon EC2, Amazon ECS, Amazon EKS

### AWS Serverless Application Model (SAM)


AWS SAM is an open-source framework for defining and deploying serverless applications as infrastructure as code. Choose it to simplify repeatable CloudFormation deployments of Lambda-centric applications.

#### What it is
- A SAM template extends **AWS CloudFormation** with concise resource types for functions, APIs, and other serverless components; a transform expands the shorthand into CloudFormation resources.
- The **SAM CLI** can build, test, invoke, and package applications locally or for deployment, including container-based local testing for supported runtimes.
- SAM deploys through CloudFormation, so stacks, change sets, IAM permissions, and CloudFormation rollback behavior apply.
- **See also:** AWS Lambda, Amazon API Gateway, AWS CloudFormation

### Choosing a compute service


Choose the service that best matches the control, runtime, duration, and operational effort the workload requires.

#### Exam cues
- Choose **Amazon EC2** when the requirement names OS/host control, persistent server processes, custom software, or a specific instance family, placement, or purchase model.
- Choose **Amazon EC2 Auto Scaling** with EC2 when capacity must track demand, recover failed instances, or remain balanced across AZs; use a load balancer when requests must reach only healthy targets.
- Choose **AWS Lambda** for short, event-driven code with automatic scaling and no server management; choose **AWS Batch** for queued, finite jobs with long runtimes or arbitrary container runtimes.
- Choose **Amazon ECS** for AWS-native container orchestration and **Amazon EKS** when Kubernetes API compatibility or existing Kubernetes operations are required.
- Choose **AWS Fargate** when ECS/EKS containers should run without provisioning worker instances; choose EC2 launch types when host access, specialized hardware, or cost control requires managing nodes.
- Choose **AWS Elastic Beanstalk** for managed deployment of conventional application code, **Amazon Lightsail** for a straightforward bundled VPS, and **AWS App Runner** for a managed web app/API from source or a container image.
- Choose **AWS Outposts** for AWS services in a customer's data center, **Local Zones** for metro-area latency, and **Wavelength** for 5G carrier-edge applications.
- **See also:** Amazon EC2, Amazon EC2 Auto Scaling, AWS Lambda, AWS Batch, Amazon ECS, Amazon EKS

## Containers

### Amazon ECS


Amazon Elastic Container Service is AWS's managed container orchestrator for scheduling and operating containerized applications. Choose it for AWS-native task and service management, with either customer-managed EC2 capacity or serverless Fargate capacity.

#### What it is
- An **ECS cluster** is a logical grouping of capacity; a **task definition** specifies one or more containers, image, CPU/memory, ports, logging, volumes, and IAM settings.
- A **task** is a running instance of a task definition; an ECS **service** maintains a desired number of tasks and replaces failed tasks.
- With the **EC2 launch type**, you provision EC2 instances and run the ECS agent on each host; AWS schedules and starts/stops containers, but you own host patching and capacity.
- With the **Fargate launch type**, define task CPU and memory and AWS runs tasks without customer-managed EC2 hosts; scale by changing the task count.

#### Identity and access
- The **task role** is assumed by application code inside a task and grants access to services such as S3 or DynamoDB; it is set in the task definition and can differ by service.
- The **task execution role** is used by ECS/Fargate agents to pull images from ECR, send logs to CloudWatch Logs, and retrieve referenced secrets; it is not the application's task role.
- On EC2 launch type, the host **instance profile** is used by the ECS agent and host; avoid using host credentials as a substitute for per-task roles.

#### Scaling and integrations
- **ECS Service Auto Scaling** changes the desired task count using target tracking, step, or scheduled scaling; common metrics include service CPU/memory and ALB requests per target.
- EC2 capacity is scaled separately through an Auto Scaling group; an ECS **capacity provider** can connect the cluster to an ASG and add hosts when tasks need more CPU or memory.
- **ALB** is the common choice for HTTP/HTTPS routing to ECS tasks and supports dynamic host port mapping; **NLB** suits high-throughput TCP/UDP or PrivateLink scenarios, while CLB lacks modern features and does not support Fargate.
- **EventBridge** rules or schedules can run one-off ECS tasks for file processing, periodic batch work, and other event-driven workflows; SQS-backed services can scale workers with queue demand.
- EventBridge can also observe task state changes, such as stopped tasks, and trigger notifications or remediation.

#### Storage and hybrid
- ECS tasks can mount **EFS** on EC2 or Fargate for persistent shared files across AZs; Fargate with EFS offers shared storage without managing servers. ECS also supports **S3 Files** mounts for Fargate and ECS Managed Instances (not the EC2 launch type); changes synchronize to the S3 bucket.
- ECS supports task storage options including EBS volumes where configured; select storage based on whether data must persist, be shared, or be disposable with the task. Use EFS when tasks across AZs need shared files and a task-scoped EBS volume when block storage is required.
- **ECS Anywhere** registers customer-managed external instances (including on-premises servers) into ECS using the ECS agent and Systems Manager connectivity; customers maintain the external host infrastructure.
- **See also:** AWS Fargate, Amazon ECR, Elastic Load Balancing, AWS Batch, Amazon EKS

### Amazon EKS


Amazon Elastic Kubernetes Service provides a managed Kubernetes control plane on AWS. Choose it when Kubernetes compatibility, existing Kubernetes skills, or portability across environments matters more than using the ECS API.

#### What it is
- **Kubernetes** orchestrates container workloads using objects such as Pods, Deployments, Services, and namespaces; a Deployment maintains replicas and supports controlled rollouts.
- EKS manages the Kubernetes control plane; worker capacity can use EC2 nodes or Fargate, and each Region requires its own EKS cluster for regional deployments.
- EKS is an alternative to ECS with Kubernetes APIs and ecosystem; use CloudWatch Container Insights or compatible tools for cluster logs and metrics.

#### Node types and scaling
- **Managed node groups** create and manage EC2 worker nodes in an EKS-managed Auto Scaling group and support On-Demand or Spot capacity.
- **Self-managed nodes** are customer-created EC2 instances registered to the cluster, usually in an Auto Scaling group; EKS-optimized AMIs are available, and nodes can use On-Demand or Spot Instances.
- **Fargate profiles** select Pods to run on serverless Fargate capacity without managing worker nodes; use EC2 nodes when host access or specialized node configuration is needed.

#### Storage and hybrid
- Kubernetes storage uses a **StorageClass** and CSI driver; EKS supports EBS, EFS, FSx for Lustre, and FSx for NetApp ONTAP through appropriate drivers. The Kubernetes Cluster Autoscaler can adjust an EC2 Auto Scaling group when Pods cannot be scheduled for lack of worker capacity.
- **EBS** is AZ-scoped block storage for eligible Pods on EC2 nodes; **EFS** provides shared file storage and can be used with Fargate Pods.
- **EKS Anywhere** provisions and operates Kubernetes clusters on customer-managed on-premises or edge infrastructure using EKS tooling; it is distinct from the AWS-managed EKS control plane.
- **See also:** Amazon ECS, AWS Fargate, Amazon ECR, AWS Outposts

### AWS Fargate


AWS Fargate is serverless compute for containers used by Amazon ECS and Amazon EKS. Choose it when you want task- or Pod-level capacity without provisioning or maintaining worker instances.

#### What it is
- Specify container CPU and memory and Fargate runs the task or selected Pod; there are no customer-managed EC2 hosts to patch or scale.
- Billing is based on requested vCPU, memory, and execution duration, with platform-specific minimums and additional ephemeral-storage options.
- Fargate removes host administration but does not replace ECS/EKS orchestration, task definitions, IAM roles, networking, or application operations.
- **See also:** Amazon ECS, Amazon EKS, AWS Batch

### Amazon ECR


Amazon Elastic Container Registry is a managed registry for storing and distributing container images. Choose it to keep container artifacts near AWS compute services with IAM-controlled access.

#### What it is
- ECR provides **private and public repositories** for container images and integrates with ECS, EKS, and AWS Batch; images are stored durably using Amazon S3-backed infrastructure.
- IAM policies control repository and image access; task execution roles commonly authorize ECS/Fargate image pulls.
- ECR supports image tags and immutable digests, image scanning, lifecycle policies, and repository replication; configure scanning and policies to match security and retention needs.
- **See also:** Amazon ECS, Amazon EKS, AWS Fargate, AWS Batch

### AWS App Runner


AWS App Runner builds and runs web applications and APIs from source code or a container image without requiring you to manage load balancers or container clusters. Choose it for a straightforward managed web service rather than custom orchestration.

#### What it is
- App Runner can deploy from a source repository or Amazon ECR image, build with managed runtimes or a configuration file, and automatically deploy new revisions when configured to track source changes.
- It provisions and scales the web service, provides an HTTPS endpoint and managed TLS integration, and can connect outbound to private VPC resources through a VPC connector.
- App Runner is optimized for web applications and APIs, not general-purpose batch jobs, arbitrary background services, or workloads requiring direct control of hosts and cluster scheduling.
- **See also:** Amazon ECR, Amazon ECS, AWS Elastic Beanstalk

## Storage

### Amazon S3


Amazon S3 is highly durable, scalable object storage for backups, archives, data lakes, media, software distribution, application assets, and static websites. Choose it for objects accessed through APIs rather than a mounted POSIX file system or block device.

#### What it is
- A **bucket** is created in a Region; its name is unique within the applicable S3 namespace, while object keys are full names such as \`folder/file\` rather than real directories; bucket names use lowercase letters/numbers and hyphens, not underscores or IP-address form.
- An **object** comprises a key, content, metadata, optional tags (up to **10**), and a version ID when versioning is enabled; maximum object size is **5 TB**.
- S3 is designed for **99.999999999% (11 nines) durability**; the slide equates that rate to one lost object per 10 million objects on average every 10,000 years, while One Zone classes keep data in one AZ.
- **Availability** varies by class; Standard at **99.99%** corresponds to about **53 minutes/year** unavailable, and all classes retain the cited 11-nines durability.
- S3 is a managed **object** store, not an attached block device or general-purpose shared file system.

#### Storage classes and lifecycle
- **S3 Standard** is for frequently accessed data, with low latency, high throughput, **99.99% availability**, and multi-AZ resilience; examples include analytics, gaming, and content distribution.
- **S3 Intelligent-Tiering** automatically shifts objects among access tiers based on use, has a small per-object monitoring fee, and charges no retrieval fee; its Frequent tier is the default, with automatic Infrequent after **30 days** and Archive Instant after **90 days** without access.
- Intelligent-Tiering's optional **Archive Access** tier can be configured from **90 to 700+ days** and optional **Deep Archive Access** from **180 to 700+ days**; objects must be restored before access from the asynchronous archive tiers, with retrieval commonly taking **3-5 hours** for Archive Access or **12-48 hours** for Deep Archive Access.
- **S3 Standard-IA** is multi-AZ for infrequently accessed data that still needs millisecond retrieval; it has **99.9% availability**, a **30-day** minimum duration, **128 KB** minimum billable object size, and per-GB retrieval charges.
- **S3 One Zone-IA** has the same millisecond access pattern and 30-day/128-KB minimums, but stores data in one AZ, has **99.5% availability**, and can lose data if that AZ is destroyed; use it for recreatable or secondary-copy data.
- **S3 Glacier Instant Retrieval** provides millisecond access for rarely accessed archives, with a **90-day** minimum, **128 KB** minimum billable object size, and per-GB retrieval charges.
- **S3 Glacier Flexible Retrieval** (formerly S3 Glacier) offers free Bulk retrieval in **5-12 hours**, Standard in **3-5 hours**, or paid Expedited in **1-5 minutes**; it has a **90-day** minimum and **40 KB** minimum billable object size.
- **S3 Glacier Deep Archive** is for long-term archives; Standard retrieval takes about **12 hours**, Bulk about **48 hours**, and the minimum duration is **180 days** with **40 KB** minimum billable object size.
- Archive storage pricing includes storage plus retrieval charges; Intelligent-Tiering's monitoring fee and S3 requests are separate cost considerations.
- A regional price comparison lists monthly storage examples per GB of **$0.023 Standard**, **$0.0025-$0.023 Intelligent-Tiering**, **$0.0125 Standard-IA**, **$0.010 One Zone-IA**, **$0.004 Glacier Instant Retrieval**, **$0.0036 Glacier Flexible Retrieval**, and **$0.00099 Deep Archive**; regional pricing can change.
- Storage-class availability differs: Standard is **99.99%**, Standard-IA and Glacier Instant Retrieval **99.9%**, One Zone-IA **99.5%**, and Flexible Retrieval and Deep Archive **99.99%**; all retain 11-nines object durability.
- **S3 Express One Zone** stores objects in a single-AZ directory bucket and is designed for hundreds of thousands of requests per second with single-digit-millisecond latency; the slide describes up to **10x** Standard performance and **99.95%** availability.
- Express One Zone is for latency-sensitive, data-intensive, AI/ML, financial-modeling, media-processing, and HPC workloads; co-locate compute in its AZ, and use integrations such as SageMaker training, Athena, EMR, and Glue.
- **Lifecycle rules** transition objects between eligible classes or expire them; rules can filter by prefix or tags and can target current/noncurrent versions or incomplete multipart uploads.
- Lifecycle rules support scheduled tiering (for example, move to Standard-IA after 60 days or Glacier after six months) and deletion (for example, expire logs after 365 days); archived data can be transitioned without immediate retrieval.
- Use versioning plus lifecycle rules to retain deleted versions for a recovery window, transition noncurrent versions to cheaper tiers, and later expire them; lifecycle transitions must follow supported class paths.
- **Storage Class Analysis** helps decide when Standard data should move to Standard-IA; reports update daily, may take **24-48 hours** to begin, and do not support One Zone-IA or Glacier classes.

#### Versioning, replication, and protection
- **Versioning** is enabled at the bucket level; overwriting a key creates another version, deletion usually creates a delete marker, and prior versions can be restored.
- Objects created before versioning is enabled retain a \`null\` version ID; suspending versioning does not remove existing versions.
- **Cross-Region Replication (CRR)** and **Same-Region Replication (SRR)** require versioning on source and destination and appropriate S3 permissions; replication is asynchronous and can cross accounts.
- Replication normally covers new objects; **S3 Batch Replication** can copy existing or previously failed objects, and replication is not chained through an intermediate bucket.
- Replication of delete markers is optional; permanent deletion of a particular version is not replicated, helping protect against malicious deletes.
- **Object Lock** requires versioning and provides WORM protection by version, using a fixed retention period or an indefinite legal hold.
- **Compliance mode** prevents any user, including root, from deleting or overwriting a locked version or shortening its retention; **Governance mode** permits specially authorized users to bypass or change the lock.
- **MFA Delete** requires MFA to permanently delete a version or suspend versioning; it does not require MFA to enable versioning or list deleted versions, and only the bucket owner/root can enable or disable it.
- **S3 Glacier Vault Lock** locks a vault policy into an unchangeable WORM retention policy; after locking, the policy cannot be edited or deleted.

#### Security and access
- Access can be granted through **IAM policies**, **bucket policies**, and object or bucket ACLs; an explicit deny overrides an allow, and ACLs can be disabled through Object Ownership's bucket-owner-enforced setting.
- **Bucket policies** are resource-based JSON policies for bucket/object resources; they can grant cross-account or public access and require encryption headers, while account- or bucket-level **Block Public Access** prevents accidental public exposure.
- S3 applies **SSE-S3** by default to new objects; bucket policies can reject uploads lacking required encryption headers, and policy evaluation happens before default encryption is applied.
- **SSE-S3** uses AWS-owned and managed **AES-256** keys; **SSE-KMS** uses KMS keys for user control and CloudTrail key-use auditing and consumes KMS API quota on uploads and downloads.
- **DSSE-KMS** applies two server-side encryption layers (KMS and an S3-managed key) for compliance needs, with higher cost and latency than SSE-KMS.
- **SSE-C** uses a customer-managed key supplied in every HTTPS request; S3 does not retain the key, and HTTPS is mandatory.
- With **client-side encryption**, the client encrypts before upload, decrypts after download, and manages the keys and encryption lifecycle itself.
- S3 supports HTTP and HTTPS endpoints; use HTTPS for encryption in transit and a bucket policy condition on \`aws:SecureTransport\` to deny insecure requests.
- **Presigned URLs** grant temporary GET or PUT access using the permissions of the signing principal; the console allows **1 minute-12 hours**, while CLI/SDK expiration can be up to **604,800 seconds (7 days)** (CLI default **3,600 seconds**).
- **Access Points** provide separate DNS names and policies for different applications, teams, or prefixes; a VPC-origin access point requires a VPC endpoint whose policy also allows the requested access.
- **S3 Object Lambda** uses a Lambda function behind an Object Lambda Access Point to transform an object on retrieval, such as redacting data, converting formats, or resizing/watermarking images.
- **CORS** configuration allows browser requests from specified origins and methods (or \`*\`); an origin is the scheme, host, and port, and browsers may first send an OPTIONS preflight request.

#### Performance and data operations
- S3 automatically scales; each key **prefix** supports at least **3,500 PUT/COPY/POST/DELETE** or **5,500 GET/HEAD requests per second**, with no limit on the number of prefixes; distributing traffic across prefixes raises aggregate throughput.
- **Multipart upload** is recommended for objects larger than **100 MB**, required above **5 GB**, and sends parts independently, often in parallel, so failed parts can be retried.
- **Transfer Acceleration** routes transfers through a nearby AWS edge location and the AWS network to the destination bucket; it supports multipart upload and is useful for long-distance transfers.
- **Byte-range GET** requests retrieve only selected byte intervals, enabling partial reads or parallel downloads; use HTTP Range to inspect a small header or segment of a large object.
- **S3 Select** and **Glacier Select** use SQL expressions to retrieve selected records/columns from supported CSV, JSON, or Parquet objects instead of transferring an entire object; Glacier Select operates on archived data and returns query results to S3.
- **S3 Event Notifications** support events such as object creation, removal, restoration, and replication, with prefix/suffix filters and Lambda, SQS, or SNS destinations; delivery is usually in seconds but can take a minute or longer.
- S3 notifications need destination resource permissions; **EventBridge** supports richer JSON filtering, multiple destinations, archive/replay, and reliable event delivery.
- **Server access logging** can record authorized and denied requests from any account into another S3 bucket in the same Region; never use the monitored bucket as its own logging target or logs will recursively grow.
- **Requester Pays** shifts request and download charges to an authenticated requester rather than the bucket owner; anonymous access is not supported.
- **S3 Storage Lens** aggregates usage, activity, data-protection, access, event, performance, and status-code metrics by organization/account/Region/bucket/prefix; its default multi-account, multi-Region dashboard can be disabled but not deleted.
- Storage Lens free metrics cover about **28 usage metrics** and are queryable for **14 days**; paid advanced metrics add activity, cost optimization, data protection, status codes, prefix aggregation, recommendations, and **15 months** of history, with optional daily CSV/Parquet exports.
- **S3 Storage Class Analysis** is a distinct daily report for Standard-to-Standard-IA transition decisions; **S3 Inventory** supplies object lists and metadata that can be queried with Athena and used as an S3 Batch Operations manifest.
- **S3 Batch Operations** runs a single action over a manifest, including metadata/tag/ACL changes, copies, encryption, Glacier restores, or per-object Lambda actions; it manages retries, progress, completion notifications, and reports.

#### Website hosting and related services
- Static website hosting serves bucket content from a Region-specific S3 website endpoint; the bucket must allow public reads for direct access, and S3 website endpoints use HTTP rather than HTTPS.
- **Multi-Region Access Points (MRAPs)** give applications a global S3 endpoint that routes requests to an active bucket in an eligible Region; configure replication separately to keep buckets synchronized and use failover controls for regional continuity.
- Use **S3** for objects, **CloudFront** for global edge caching, **EFS/FSx** for shared file-system semantics, and **EBS** for instance-attached block storage; CRR is replication, not a CDN cache.
- **See also:** Amazon EBS, Amazon EFS, Amazon FSx, AWS DataSync, AWS Snow Family

### Amazon EBS


Amazon Elastic Block Store (EBS) provides persistent, network-attached block volumes for EC2 instances. Choose it for boot disks and low-latency block storage that must persist independently of an instance's local hardware.

#### What it is
- EBS volumes have provisioned capacity and are **scoped to one Availability Zone**; an instance in another AZ cannot attach the volume directly, but a snapshot can be restored there.
- A volume can be detached and attached to another instance in the same AZ; ordinary volumes attach to one instance at a time, except supported Multi-Attach volumes.
- You pay for provisioned capacity (and provisioned performance where applicable), not merely the occupied bytes; volume size can be increased.
- EBS is network storage, so it has some network latency; data persists when an EC2 instance is stopped or terminated unless the volume is deleted.
- The root EBS volume is deleted on instance termination by default; other attached EBS volumes are retained by default, controlled by DeleteOnTermination.

#### Volume types and performance
- **gp3** General Purpose SSD supports **1 GiB-64 TiB**, starts at **3,000 IOPS and 125 MiB/s**, and can be provisioned independently up to **80,000 IOPS and 2,000 MiB/s**.
- **gp2** General Purpose SSD supports **1 GiB-16 TiB** and scales at **3 IOPS/GiB** to a maximum **16,000 IOPS**; small volumes can burst to **3,000 IOPS**, and IOPS scale with size.
- **io1** Provisioned IOPS SSD supports **4 GiB-16 TiB**, up to **64,000 IOPS on Nitro** or **32,000** on other instances, with independently provisioned IOPS and a maximum **50:1 IOPS-to-GiB** ratio.
- **io2 Block Express** supports **4 GiB-64 TiB**, sub-millisecond latency, up to **256,000 IOPS** and a **1,000:1 IOPS-to-GiB** ratio; it supports Multi-Attach.
- **st1** Throughput Optimized HDD is for frequently accessed, throughput-intensive data such as big data, warehouses, and logs; it supports **125 GiB-16 TiB**, up to **500 MiB/s** and **500 IOPS**.
- **sc1** Cold HDD is for infrequently accessed data where lowest cost matters; it supports **125 GiB-16 TiB**, up to **250 MiB/s** and **250 IOPS**.
- HDD types **st1/sc1 cannot be boot volumes**; only gp2/gp3 and io1/io2 SSD families can be used as boot volumes.
- Choose gp3 for general-purpose SSD with independently tuned throughput/IOPS, gp2 when baseline performance may track size, io1/io2 for sustained high IOPS, st1 for sequential throughput, and sc1 for cold HDD data.

#### Snapshots and recovery
- **EBS Snapshots** are point-in-time backups; creating one does not require detaching the volume, though quiescing writes improves consistency, snapshots consume I/O, and snapshots can be copied across AZs or Regions.
- Snapshots are incremental and independent of an AZ; create a volume from a snapshot in any AZ or copy it to another Region for regional recovery.
- **Snapshot Archive** reduces snapshot storage cost by about **75%**, but restore takes **24-72 hours**.
- **EBS Snapshot Recycle Bin** applies retention rules of **1 day-1 year** to deleted snapshots so they can be recovered before permanent removal.
- **Fast Snapshot Restore (FSR)** fully initializes a restored volume to avoid first-read lazy-loading latency; enable it per snapshot and AZ at additional cost.

#### Security and Multi-Attach
- EBS encryption uses **KMS AES-256** and transparently encrypts data at rest, data moving between instance and volume, snapshots, and volumes created from encrypted snapshots, with minimal latency impact.
- An unencrypted volume can be encrypted by snapshotting it, copying the snapshot with encryption, and creating a new encrypted volume from that copy.
- **Multi-Attach** is supported for io1/io2 volumes in the same AZ, up to **16 Nitro EC2 instances**; all have read/write access, so the application must coordinate concurrent writes and use a cluster-aware file system.
- **See also:** Amazon EC2 Instance Store, Amazon S3, Amazon EFS, AWS Backup

### Amazon EC2 Instance Store


EC2 Instance Store provides very high-performance physical storage attached to the host running an EC2 instance. Use it for temporary data when latency and IOPS matter more than persistence.

#### What it is
- Instance Store is **local, ephemeral hardware** rather than a network volume and can deliver very high IOPS and low latency, up to millions of IOPS for suitable instances.
- Data is lost when the instance is stopped or the underlying hardware fails; it is not durable storage for data that must survive instance lifecycle events.
- Use it for caches, buffers, scratch space, temporary files, or replicated working data; customers are responsible for backup and replication.
- **Compared with EBS:** Instance Store can provide better local I/O but is tied to the host and ephemeral; EBS is network-attached, persistent, and snapshot-capable.
- **See also:** Amazon EBS, Amazon S3

### Amazon EFS


Amazon Elastic File System is a managed, elastic NFS file system shared by Linux compute across multiple AZs. Choose it for shared POSIX files, such as web content or application data, without sizing file-system capacity in advance.

#### What it is
- EFS provides a standard **POSIX** file API over **NFSv4.1**, scales automatically to petabytes, and is billed based on use; it supports thousands of concurrent clients.
- EFS is designed for Linux-based clients and is **not compatible with Windows instances** as a native Windows file system; use FSx for Windows for SMB/NTFS workloads. The slide compares EFS Standard as roughly **3x gp2** in price, while EFS is elastic and billed by use.
- EFS mount targets provide VPC access; create a mount target in each AZ with clients and use the local-AZ target to reduce cross-AZ latency and transfer charges.
- Mount-target security groups control client access; NFS uses **TCP 2049**, and EFS can encrypt data at rest with KMS and in transit with TLS.
- **Standard** EFS storage is multi-AZ for production availability; **One Zone** stores data in one AZ for development or recoverable data and has automatic backup enabled by default.

#### Performance and throughput
- **General Purpose** performance mode is the default and is suited to latency-sensitive web serving, CMS, and similar workloads.
- **Max I/O** supports higher aggregate throughput and parallel operations for big-data or media processing, at the cost of higher operation latency.
- **Bursting** throughput scales with file-system size and accumulates burst credits; the slide's example is **50 MiB/s per TiB** baseline and bursts up to **100 MiB/s per TiB**.
- **Provisioned** throughput sets throughput independently of stored size, useful when a small file system needs sustained high throughput.
- **Elastic** throughput scales up or down automatically for unpredictable workloads; the cited limits are up to **3 GiB/s reads** and **1 GiB/s writes**.

#### Storage classes and availability
- **Standard** is for frequently accessed files; **EFS Infrequent Access (IA)** has lower storage cost but retrieval charges, while keeping file data immediately available through the same file system.
- **EFS Archive** targets files accessed only a few times per year and is described as about **50% cheaper** than Standard; lifecycle management moves files among tiers after configured inactivity periods.
- **One Zone-IA** combines the lower-cost IA tier with single-AZ storage; use it where AZ loss is acceptable and recovery/backup is available.
- EFS Standard provides multi-AZ availability; EFS One Zone is a single-AZ option and can save over **90%** in the slide's comparison.
- Compared with EBS, EFS supports shared concurrent file access across instances and AZs but generally costs more; EBS is block storage for an instance, while S3 stores objects.
- **See also:** Amazon EBS, Amazon FSx, Amazon S3, AWS Backup

### Amazon FSx


Amazon FSx is a fully managed family of file systems that brings Windows, Lustre, NetApp ONTAP, and OpenZFS file-system capabilities to AWS. Choose a flavor based on the required protocol, operating environment, performance, and compatibility.

#### What it is
- FSx offers four distinct engines: **Windows File Server**, **Lustre**, **NetApp ONTAP**, and **OpenZFS**; FSx file systems provide file/block protocols and semantics unlike S3 object storage.
- FSx for Windows can be configured Multi-AZ; the other deployment and availability characteristics depend on the flavor and configuration.

#### FSx for Windows File Server
- Provides managed **SMB** shares with **NTFS**, Microsoft Active Directory integration, ACLs, user quotas, and Distributed File System (DFS) Namespaces.
- Windows clients and Linux EC2 instances can mount the shares; on-premises clients can access them over VPN or Direct Connect.
- Offers SSD for latency-sensitive databases/analytics/media and HDD for broad workloads such as home directories and CMS; the slide describes scaling to tens of GB/s, millions of IOPS, and hundreds of PB.
- Multi-AZ is available for high availability, and the service backs up data daily to S3.

#### FSx for Lustre
- Lustre is a parallel distributed file system for Linux-oriented HPC, ML, video processing, financial modeling, and electronic design automation.
- It scales to hundreds of GB/s, millions of IOPS, and sub-millisecond latencies; SSD fits small/random I/O and HDD fits large/sequential throughput.
- Integrates with S3 so an S3 bucket can be a file-system data repository and computation output can be written back to S3; on-premises servers can connect over VPN or Direct Connect.
- **Scratch** file systems are temporary, unreplicated, and do not persist through file-server failure; they offer high burst performance (the cited example is **6x**, **200 MB/s per TiB**) for short-term processing.
- **Persistent** file systems replicate within an AZ, replace failed files within minutes, and suit longer-term processing or sensitive data.

#### FSx for NetApp ONTAP
- Provides managed NetApp ONTAP with **NFS, SMB, and iSCSI**; it supports Linux, Windows, macOS, VMware Cloud on AWS, WorkSpaces, AppStream 2.0, EC2, ECS, and EKS.
- Storage can grow or shrink automatically; features include snapshots, replication, compression, deduplication, and point-in-time instantaneous clones for testing.
- Use it to move existing ONTAP/NAS workloads to AWS or share files across mixed operating systems and protocols.

#### FSx for OpenZFS
- Provides managed OpenZFS and **NFSv3, v4, v4.1, and v4.2**, supporting Linux, Windows, macOS, VMware Cloud on AWS, WorkSpaces, AppStream 2.0, EC2, ECS, and EKS.
- Supports up to **1,000,000 IOPS** with **less than 0.5 ms latency**, plus snapshots, compression, and point-in-time instantaneous clones.
- **Compared with EFS:** FSx supplies specialized Windows/HPC/ONTAP/ZFS compatibility and protocols; choose EFS for simpler elastic shared NFS for Linux clients.
- **See also:** Amazon EFS, Amazon S3, AWS DataSync, AWS Backup

### AWS Storage Gateway


AWS Storage Gateway connects on-premises applications to AWS storage while preserving familiar file, block, or tape workflows. Choose it for hybrid access, local caching, backup, restore, or staged migration.

#### What it is
- Storage Gateway is a hybrid service for disaster recovery, backup/restore, tiered storage, and low-latency on-premises access to cloud-backed data.
- The gateway runs as a VM (VMware, Hyper-V, or KVM) or supported appliance and encrypts transfers in transit over the internet or Direct Connect.

#### File Gateway
- **S3 File Gateway** presents configured S3 buckets as NFS/SMB file shares and keeps recently used data in a local cache; bucket access uses IAM roles.
- SMB File Gateway can authenticate users with Active Directory; objects are stored in S3, and lifecycle policies can transition them to Glacier classes.
- The slide lists Standard, Standard-IA, One Zone-IA, and Intelligent-Tiering as directly supported file-gateway classes; Glacier tiers are reached through lifecycle.
- **FSx File Gateway** presents FSx for Windows File Server shares to on-premises clients using SMB while caching frequently accessed data locally.

#### Volume Gateway
- Volume Gateway exposes **iSCSI** block volumes backed by AWS storage; cached and stored are alternative volume modes.
- **Cached volumes** keep the primary dataset in AWS and cache the most recently accessed data locally for low-latency reads.
- **Stored volumes** keep the entire dataset on premises and asynchronously back up volume snapshots to S3; EBS snapshots can restore local volumes.

#### Tape Gateway
- Tape Gateway presents a virtual tape library (VTL) over iSCSI to existing backup software and preserves tape-based workflows without physical tape handling.
- Virtual tapes are backed by S3; archived tapes move to Glacier/Deep Archive, and retrieval returns tapes to the virtual library.
- **See also:** Amazon S3, Amazon EBS, Amazon FSx, AWS Backup

### AWS Snow Family


AWS Snow Family provides rugged, secure devices for transferring large datasets when networks are constrained and for running edge compute in disconnected locations. Choose physical transfer when network time, bandwidth, stability, or cost makes online transfer impractical.

#### What it is
- Snow Family devices collect, process, and move data into or out of AWS; Snowball is designed for transfers up to petabytes, and Snowmobile addresses exabyte-scale migrations.
- **Snowcone** is the smallest portable rugged device for constrained field sites; it provides up to **8 TB HDD** or **14 TB SSD** storage with **2 vCPUs and 4 GB RAM** and supports limited edge compute.
- **Snowball Edge Storage Optimized** is listed with **104 vCPUs, 416 GB memory, and 210 TB storage**; **Compute Optimized** is listed with **104 vCPUs, 416 GB memory, and 28 TB storage**.
- Snowball Edge usable storage and compute availability depend on the device generation, options, and region; select a current device configuration in the Snow job workflow rather than assuming all stated capacity is usable.
- **Snowmobile** is a shipping-container-scale transfer service for very large migrations, commonly up to about **100 PB per device**; it moves data physically rather than providing an online storage target.
- **AWS OpsHub** is a graphical application for managing Snow devices, configuring services, and monitoring transfers, including disconnected operations.

#### Data transfer and edge compute
- Ship a Snowball device when network transfer would take more than about a week; one slide's example estimates **200 TB over 100 Mbps at 185 days**, **1 Gbps at 18.5 days**, versus about **one week end-to-end with Snowball**.
- Snowball Edge Compute Optimized and Storage Optimized devices can run EC2 instances or Lambda at edge locations; use them to preprocess data, run ML inference/training, or transcode media when connectivity or local compute is limited.
- Snowball data must land in **S3 first**; it cannot be imported directly into Glacier, so apply an S3 lifecycle policy to archive it.
- **Compared with DataSync:** Snow devices suit one-time, very large offline transfers; DataSync is the managed online choice for recurring or scheduled synchronization.
- **See also:** Amazon S3, AWS DataSync, AWS Storage Gateway

### AWS DataSync


AWS DataSync automates high-speed file and object transfers between on-premises, other-cloud, and AWS storage. Choose it for managed, scheduled bulk transfer with integrity checks and metadata preservation.

#### What it is
- DataSync transfers data to/from S3, EFS, and FSx; supported sources/protocols include NFS, SMB, HDFS, and S3-compatible APIs.
- An on-premises or other-cloud source requires a **DataSync agent** with access to the source; supported AWS-to-AWS transfers can be agentless.
- DataSync supports S3 storage classes including archive classes, EFS, and FSx for Windows, Lustre, NetApp ONTAP, and OpenZFS.
- Tasks can run once or on schedules such as hourly, daily, or weekly; DataSync preserves file permissions and metadata (including NFS POSIX and SMB metadata).
- A single agent task can use up to **10 Gbps**; a bandwidth limit can constrain transfer impact on other workloads.
- Use DataSync for online migration or ongoing synchronization, including private paths over VPN or Direct Connect; it can verify transfer integrity.
- **Compared with Storage Gateway:** DataSync moves/synchronizes files; Storage Gateway continuously presents local file/block/tape interfaces backed by AWS.
- **See also:** Amazon S3, Amazon EFS, Amazon FSx, AWS Storage Gateway, AWS Transfer Family

### AWS Transfer Family


AWS Transfer Family is a managed FTP-family endpoint for moving files into or out of Amazon S3 or Amazon EFS. Choose it when partners or legacy clients require standard file-transfer protocols without operating transfer servers.

#### What it is
- Supports **SFTP**, **FTPS**, and **FTP**; the slide notes FTP endpoints are available only within a VPC.
- Managed endpoints are scalable, reliable, and highly available across multiple AZs; endpoint-hour provisioning and data transferred in GB are billed.
- Files land in or are served from S3 or EFS, with users mapped to IAM roles and supported home directories/permissions.
- User credentials can be managed by Transfer Family or authenticated through existing systems such as Microsoft Active Directory, LDAP, Okta, Amazon Cognito, or a custom identity provider.
- Use it for secure partner file exchange, public datasets, and business integrations such as CRM or ERP; managed workflows can trigger post-upload processing.
- **Compared with DataSync:** Transfer Family offers interactive client-based file transfer; DataSync is for automated bulk copy and recurring synchronization.
- **See also:** Amazon S3, Amazon EFS, AWS DataSync

### Choosing a storage service


Choose by the storage interface, access pattern, durability, and hybrid/transfer requirement rather than by raw capacity alone.

#### What it is
- Choose **S3** for durable object storage, archives, data lakes, or static content; choose a Glacier class when lower cost is worth retrieval delay or minimum-duration constraints.
- Choose **EBS** for a persistent block device attached to EC2 in one AZ; choose **Instance Store** for temporary, very high-performance local scratch/cache data.
- Choose **EFS** for shared POSIX/NFS access from Linux clients across AZs; choose **FSx** when Windows SMB/NTFS, Lustre/HPC, ONTAP, or OpenZFS compatibility is required.
- Choose **Storage Gateway** to retain on-premises NFS/SMB, iSCSI, or tape workflows with cloud-backed storage and local caching.
- Choose **DataSync** for managed online transfers and recurring sync, **Transfer Family** for partner SFTP/FTPS/FTP access, and **Snow Family** when offline physical transfer or edge compute is needed.
- **See also:** Amazon S3, Amazon EBS, Amazon EC2 Instance Store, Amazon EFS, Amazon FSx, AWS Storage Gateway, AWS Snow Family, AWS DataSync, AWS Transfer Family

## Backup and disaster recovery

### AWS Backup


AWS Backup centrally automates backup policies and recovery points for supported AWS resources. Choose it for consistent schedules, retention, lifecycle, and cross-account or cross-Region protection across services.

#### What it is
- A **Backup Plan** defines schedule/frequency, backup window, lifecycle, retention, and optional copy rules; plans can be assigned to tagged resources.
- Schedules can run every **12 hours**, daily, weekly, monthly, or by cron expression; retention and cold-storage transitions are configurable.
- A **backup vault** stores and organizes recovery points and can apply access controls and encryption; vaults can be copied across Regions and accounts.
- AWS Backup supports on-demand and scheduled backup, point-in-time recovery for supported services, and cross-Region and cross-account backup/copy.
- **Vault Lock** enforces WORM retention for backups; it protects against malicious or accidental deletion and retention changes, and even root cannot delete locked recovery points.

#### Services and recovery
- The slide-listed services include EC2/EBS, S3, RDS engines, Aurora, DynamoDB, DocumentDB, Neptune, EFS, FSx for Lustre and Windows File Server, and Storage Gateway Volume Gateway.
- Supported resources and capabilities vary by service: confirm PITR, continuous backup, cold-storage transition, and restore options for the specific resource type.
- Restore creates service-specific recovery resources; combine AWS Backup with service-native features such as EBS snapshots, S3 versioning/replication, or database replication where required.
- Cross-account copies place recovery points in a separately controlled account, while cross-Region copies support regional recovery; use both when both failure domains matter.
- AWS Backup complements rather than replaces application/database replication when near-zero RPO or fast regional failover is required.
- **See also:** Amazon EBS, Amazon S3, Amazon EFS, Amazon FSx, AWS Storage Gateway, AWS Elastic Disaster Recovery

### AWS Elastic Disaster Recovery


AWS Elastic Disaster Recovery (AWS DRS, formerly CloudEndure Disaster Recovery) continuously replicates server disks to a low-cost AWS staging area so physical, virtual, or cloud servers can be launched in AWS after an outage.

#### What it is
- Install the AWS Replication Agent on supported source servers; it continuously replicates block-level disk changes to AWS, with replication typically occurring within seconds.
- Replicated servers are held in a staging area using low-cost EC2 and EBS resources; launch target EC2 instances and volumes for recovery drills or failover.
- DRS supports recovery of server workloads such as Oracle/MySQL/SQL Server databases and enterprise applications; protect source data from site, server, or ransomware failures.
- Recovery can bring target servers online in minutes; after the primary environment is restored, DRS supports failback.
- DRS replicates server disks and helps launch servers; it does not replace database-native replication when the required consistency or recovery design depends on database-level mechanisms.
- **Compared with AWS Backup:** DRS continuously replicates server blocks for rapid server recovery; AWS Backup retains point-in-time recovery points for supported resources.
- **See also:** AWS Backup, Amazon EBS, Amazon EC2, AWS Storage Gateway

### Disaster recovery strategies


Disaster recovery prepares for business disruption by defining acceptable data loss and service downtime, then selecting a recovery design that balances cost, complexity, and speed.

#### What it is
- **RPO (Recovery Point Objective)** is the maximum acceptable age of recoverable data at failure, expressed as tolerated data loss over time; more frequent backups or continuous replication lower RPO.
- **RTO (Recovery Time Objective)** is the maximum acceptable interval from disruption until service is restored; pre-provisioned resources and automated failover lower RTO.
- Disaster recovery can protect on-premises systems to another site, on-premises systems to AWS, or one AWS Region to another; hybrid recovery combines local infrastructure with cloud recovery.

#### Strategies and trade-offs
- **Backup and restore** stores backups and rebuilds/restores after disaster; it usually has the lowest ongoing cost and highest RPO/longest RTO because infrastructure and data must be recovered after the event.
- **Pilot light** keeps essential components (typically databases and replicated data) running in the recovery Region while application compute remains off; it costs more than backups but recovers faster because core services are ready.
- **Warm standby** runs a fully functional but reduced-size system in the recovery Region; scaling it to production after failover yields faster recovery than pilot light at higher ongoing cost.
- **Multi-site active-active (hot site)** runs full production capacity in multiple locations and serves traffic from both; it offers very low RTO (minutes or seconds) and lowest interruption but has the highest infrastructure, replication, and operations cost.
- The usual progression from backup/restore through pilot light and warm standby to active-active trades increasing operating cost and complexity for lower recovery time and less disruption.

#### Data and failover options
- Use scheduled backups and snapshots (including EBS, RDS, and S3 lifecycle/replication) for recovery points; use cross-Region replication or backup copies when a Region failure is in scope.
- Use database-native replication for tighter objectives: RDS cross-Region replication or Aurora Global Database can replicate continuously, with Aurora Global Database typically under **one-second** lag and recovery in under **one minute** when a secondary is ready.
- Use EFS, S3 replication, Storage Gateway, and Snow devices to match file/object/block or offline migration needs; Route 53 can redirect DNS during a regional recovery.
- Automate rebuilding and recovery with CloudFormation/Elastic Beanstalk, health alarms, and Lambda where appropriate; retain a backup path for configuration and data even when replication is enabled.
- Use Site-to-Site VPN as a recovery path for Direct Connect where independent connectivity is required.
- **See also:** AWS Backup, AWS Elastic Disaster Recovery, Amazon EBS, Amazon S3, Amazon EFS, AWS Storage Gateway, AWS Snow Family

## Databases

### Amazon DynamoDB


Fully managed, serverless NoSQL key-value and document database that gives single-digit-millisecond access at any scale. Choose it for massive, variable, key-based workloads with no servers to manage; it is not a relational or analytical store.

#### What it is
- **Fully managed and highly available**, with data replicated across multiple AZs; there are **no servers to provision, patch, or maintain**.
- **NoSQL, not relational**: no joins and no SQL-style schema, so moving from RDS or Aurora means rewriting queries and application logic. It does support **ACID transactions**.
- Scales horizontally to **millions of requests per second**, **trillions of items**, and **hundreds of TB**, while keeping **single-digit millisecond** latency.
- Access is controlled with **IAM**. Applications on EC2 or Lambda get temporary credentials from an instance profile or execution role instead of embedded keys.
- Fine-grained, **row-level access** is possible with IAM policy conditions, for example by tying the partition key to the caller's identity from a Cognito identity pool.
- Two table classes: **Standard** and **Standard-Infrequent Access (IA)** for rarely read data.
- It is an **operational primary datastore**, not a cache. It is a poor fit for full-text search (use OpenSearch) or analytics warehousing (use Redshift).
- Often used to hold session state as an alternative to ElastiCache, and as the data tier of serverless APIs (API Gateway, Lambda, DynamoDB).

#### Data model
- A **table** contains **items** (rows); each item has **attributes** that can be added over time or left null, so the schema evolves easily.
- The **primary key** must be chosen when the table is created: a **partition key** alone, or a **partition key plus sort key**.
- **Maximum item size is 400 KB.** Larger objects (images, big documents) belong in S3, with only the object key stored in DynamoDB.
- Data types: **scalar** (String, Number, Binary, Boolean, Null), **document** (List, Map), and **set** (String, Number, Binary sets).
- A **global secondary index (GSI)** adds an alternative partition key (and optional sort key) so a table can be queried by a different access pattern.
- A GSI does not solve unpredictable load or hot-key problems; it only changes how items can be queried.

#### Capacity modes and cost
- **Provisioned mode** (the default) means you set **read capacity units (RCUs)** and **write capacity units (WCUs)** in advance and pay for them.
- **Auto scaling** can be added to provisioned mode: you set **minimum**, **maximum**, and **target utilization** for RCU and WCU.
- **On-demand mode** needs no capacity planning, scales instantly with traffic, and charges **per request**.
- Choose on-demand for **unknown, unpredictable, or sharply spiking** traffic; choose provisioned with auto scaling for **steady, predictable** traffic, where it is usually cheaper.
- On-demand costs more than provisioned at sustained high volume.
- Auto scaling reacts to load over time, so it is not a substitute for on-demand when spikes are sudden.

#### Caching with DAX
- **DynamoDB Accelerator (DAX)** is a managed, highly available, **in-memory cache built only for DynamoDB**, taking read latency from milliseconds to **microseconds** (up to about 10x faster) even at millions of requests per second.
- It is **API-compatible** with DynamoDB: provision a DAX cluster and point the existing DynamoDB SDK calls at it, so **no application logic changes**, cache invalidation code, or data population code are needed.
- It caches **individual item reads** and **Query/Scan results**; the default cache **TTL is 5 minutes**.
- It solves **read congestion and hot keys** by serving repeated reads from memory.
- It does **not** cache relational databases or S3 objects, and it does nothing for **write scaling** or **cross-Region replication**.
- **ElastiCache** can also sit in front of DynamoDB, but the application has to implement the caching logic; it suits storing **aggregated results** and non-DynamoDB data.

#### Streams and change capture
- **DynamoDB Streams** is an **ordered, per-item log** of creates, updates, and deletes in a table, retained for **24 hours**, with a limited number of consumers.
- Consume it with **Lambda triggers** or the DynamoDB Streams Kinesis adapter.
- **Kinesis Data Streams for DynamoDB** is the newer option: up to **1 year** retention and many more consumers (Lambda, Data Firehose, Managed Service for Apache Flink, Glue streaming ETL).
- Typical uses: **react to changes in real time** (welcome emails), real-time analytics, populating derived tables, and custom cross-Region replication.
- Streams is a change feed, not a restore mechanism, and it does not relieve hot keys.
- DynamoDB has no built-in rule that rewrites an item when it is written; run a **Lambda function from the stream** to cleanse or transform items.
- **Kinesis Data Firehose cannot write directly to DynamoDB**; use Lambda (from SQS or Kinesis Data Streams) to write items.

#### Global tables (multi-Region)
- **Global tables** are a fully managed, **multi-Region, multi-writer (active-active)** setup: every replica Region serves **local reads and writes**.
- Replication is automatic and typically completes in **under a second**; **DynamoDB Streams** must be enabled as a prerequisite.
- Concurrent writes to the same item are reconciled with **last-writer-wins**, and the default multi-Region consistency is **eventual**.
- Delivers **high availability and resilience to a Region failure** plus low latency for global users.
- It replicates the whole table; **partial replication of selected items is not supported**.
- It does not fix an unpredictable load problem; capacity mode (on-demand, or provisioned with auto scaling) still has to be chosen for each replica.

#### Backup and recovery
- **Point-in-time recovery (PITR)** keeps continuous backups and restores to **any second within the last 35 days**; it must be enabled, and the restore always **creates a new table**.
- PITR is the answer to accidental writes or a mistaken \`DeleteItem\`, because it restores the table to just before the bad write.
- **On-demand backups** are full backups kept until you delete them; they cause **no performance impact** and can be managed in **AWS Backup** (including cross-Region and cross-account copies).
- **Deletion protection** blocks a table from being deleted until it is turned off; it does not retain earlier item versions, so combine it with PITR or backups.
- Regularly exporting to S3 is not a substitute for PITR: it adds operational work and leaves a gap between exports.

#### Time to Live (TTL)
- TTL deletes items automatically once a **per-item expiry timestamp** (Unix epoch seconds) in a designated attribute has passed.
- Deletion runs in the **background** at no extra write cost and is **asynchronous**: it may lag the timestamp by days, so it is not exact-time deletion or an access-control tool.
- Common uses: **session data**, temporary records, keeping only current data, and meeting **retention limits** (for example expiring analysis results after a year).

#### Import, export, and integrations
- **Export to S3** requires **PITR**, works for any point in the last **35 days**, uses **DynamoDB JSON or ION**, and **does not consume read capacity**; query the export with Athena or run ETL on it.
- **Import from S3** accepts **CSV, DynamoDB JSON, or ION**, always creates a **new table**, consumes **no write capacity**, and logs import errors to CloudWatch Logs.
- **Gateway VPC endpoints** give private access from a VPC to DynamoDB through route-table entries at **no charge**, avoiding NAT gateway costs; **S3 and DynamoDB are the only services** with gateway endpoints.
- **Serverless API pattern:** client -> API Gateway -> Lambda -> DynamoDB for CRUD, optionally with CloudFront in front and DAX for cached reads.
- Common ingestion patterns: SQS or Kinesis -> Lambda -> DynamoDB, and S3 event -> Lambda -> (Comprehend/Textract/Rekognition) -> DynamoDB lookup.

#### Exam cues
- "Unpredictable or spiking traffic, no capacity planning" -> **on-demand** capacity.
- "Microsecond reads without changing the application" -> **DAX**.
- "Local reads and writes in several Regions" or "survive a Region outage" -> **global tables**.
- "Restore to just before bad data was written" -> **PITR**.
- "Automatically expire old items" -> **TTL**.
- "React to item changes" -> **DynamoDB Streams + Lambda**.
- Items of many MB (for example 20 MB) -> do not store in DynamoDB (400 KB limit); keep the object in S3.
- "Migrate from a relational database with minimal code change" -> keep RDS/Aurora; DynamoDB needs an application rewrite.

- **See also:** Amazon ElastiCache, Amazon Aurora, Amazon Kinesis Data Streams, AWS Backup, Amazon VPC, Amazon S3, AWS Lambda, Amazon API Gateway, Amazon Cognito

### Amazon RDS


Amazon Relational Database Service (RDS) is a managed relational database service for SQL and OLTP workloads. Choose it to run familiar relational engines without managing database hosts and routine operations.

#### What it is
- **Managed SQL databases** — AWS provisions and manages supported database instances, operating-system maintenance, backups, monitoring, and scheduled maintenance; you cannot SSH to a standard RDS host.
- **Engines** — RDS supports PostgreSQL, MySQL, MariaDB, Oracle, Microsoft SQL Server, and IBM Db2; Aurora is AWS's separate compatible relational engine.
- **Workload fit** — Use RDS for relational schemas, transactions, and joins; select a NoSQL or purpose-built database when its data model better fits the workload.
- **Capacity** — Choose the DB instance size and EBS storage type and size; scale compute vertically and scale reads with read replicas.
- **Maintenance** — RDS schedules maintenance in a configured window; engine and operating-system maintenance may cause downtime or failover.

#### Availability and DR
- **Multi-AZ DB instance** — RDS synchronously maintains a standby in another AZ and automatically fails over to it through the same DB endpoint; the standby is for availability, not read scaling.
- **Enable Multi-AZ** — Converting a single-AZ instance can be done without stopping the DB: RDS snapshots it, restores a standby in another AZ, and establishes synchronization.
- **Multi-AZ DB cluster** — A cluster deployment has a writer and two readable standby instances in three AZs; unlike the traditional passive standby, its readers can serve read traffic and provide faster failover.
- **Read replicas** — Asynchronous replicas scale read-only queries and can be placed in the same AZ, another AZ, or another Region; replication lag means reads can be stale.
- **Replica operations** — Up to 15 read replicas are supported for eligible engines; applications must direct reads to replicas, and a replica can be promoted to a standalone DB. Same-Region replica traffic has no inter-AZ data transfer charge; cross-Region replication can incur transfer charges.
- **Regional resilience** — Multi-AZ protects within a Region; use a cross-Region read replica or copied backups for regional recovery. Cross-Region replication is asynchronous and may lag.

#### Backups and snapshots
- **Automated backups** — RDS takes a daily full backup during the backup window and saves transaction logs about every five minutes, enabling point-in-time restore to approximately five minutes before the current time within the retention period.
- **Retention** — Automated backup retention is configurable from **1 to 35 days**; setting retention to **0** disables automated backups and point-in-time restore.
- **Manual snapshots** — User-created DB snapshots persist until deleted and support longer-term recovery; they do not expire with the automated-backup window.
- **Restore behavior** — Restoring a snapshot or point in time creates a new DB instance rather than overwriting the source. Stopping a DB instance does not eliminate its storage charges; snapshot and restore is an option for long-term inactivity.
- **MySQL restore from S3** — A MySQL backup stored in S3 can be restored to a new RDS for MySQL instance.
- **Central backup management** — AWS Backup can centrally manage RDS backups and support cross-Region and cross-account backup copies.
- **Snapshot sharing** — To share an encrypted snapshot across accounts, share it and grant the recipient access to the KMS key; backup copies can also support cross-Region recovery.

#### Storage autoscaling
- **Automatic growth** — RDS can increase allocated storage up to a configured maximum when free space is below **10%** for at least **5 minutes**, provided at least **6 hours** have passed since the previous storage modification.
- **Scope** — Storage autoscaling is supported across RDS engines and is useful for unpredictable growth; it does not reduce allocated storage or exceed the configured maximum.

#### Security
- **At-rest encryption** — Enable KMS encryption when creating the DB; an unencrypted source cannot have encrypted read replicas. To encrypt an unencrypted DB, snapshot it and restore the snapshot with encryption enabled.
- **In-transit encryption** — RDS supports TLS connections; configure clients with the appropriate AWS certificate authority.
- **Network controls** — Use VPC security groups to control database access; standard RDS instances do not expose SSH access.
- **IAM database authentication** — For supported MySQL-, MariaDB-, and PostgreSQL-compatible engines, IAM database authentication can replace database passwords with IAM-authenticated tokens.
- **Audit logs** — Supported database audit and engine logs can be published to CloudWatch Logs for retention and analysis.

#### RDS Custom
- **Supported engines** — RDS Custom provides managed Oracle and SQL Server databases while allowing access to the underlying database and operating system.
- **Customization access** — Use SSH or Systems Manager Session Manager to configure settings, install patches, or enable native features; standard RDS does not provide this host-level access.
- **Automation mode** — Deactivate automation mode before making custom changes, and take a DB snapshot first so the instance can be recovered if customization fails.

#### Configuration and licensing
- **Parameter groups** — DB parameter groups control engine configuration for DB instances; cluster parameter groups apply to supported cluster deployments. AWS supplies defaults, while custom groups let you set supported engine parameters.
- **Parameter changes** — Whether a changed parameter takes effect immediately or after a reboot depends on the parameter and engine; a parameter group is distinct from an option group.
- **License model** — License terms and costs depend on the engine and version. Where offered, choose license-included or bring-your-own-license (BYOL); compare commercial-engine licensing with a compatible open-source engine such as Aurora PostgreSQL or Aurora MySQL.

#### Integrations
- **Invoke Lambda from the database** — RDS for PostgreSQL and Aurora MySQL can invoke Lambda to process database events, such as a new row; allow outbound connectivity and grant the DB and Lambda resource policies permission to invoke the function.
- **RDS event notifications** — SNS or EventBridge can notify subscribers about DB-instance, snapshot, parameter-group, security-group, RDS Proxy, and custom-engine-version events; notifications concern the DB resource, not row-level data, and can take up to **5 minutes**.
- **Reporting** — RDS relational data can feed analytics services such as QuickSight and Glue; use a read replica to isolate reporting reads from a production writer where appropriate.

#### Exam cues
- **Relational engine with managed operations** -> RDS; choose the specific engine based on compatibility, features, and license requirements.
- **Automatic failover within one Region** -> Multi-AZ; **read-only scale-out** -> asynchronous read replicas.
- **Just-before-corruption recovery** -> point-in-time restore; **long-lived recovery point** -> manual snapshot.
- **Unpredictable database storage growth** -> storage autoscaling with a maximum threshold.

- **See also:** Amazon RDS Proxy, Amazon Aurora, Amazon ElastiCache, Amazon DynamoDB, AWS Database Migration Service

### Amazon RDS Proxy


Amazon RDS Proxy is a managed, highly available database proxy that pools and reuses connections between applications and RDS or Aurora. Choose it when short-lived or bursty clients, especially Lambda functions, would otherwise exhaust database connections.

#### What it is
- **Connection pooling** — The proxy shares established database connections across application sessions, reducing connection overhead, open-connection counts, and pressure on database memory and CPU.
- **Lambda workloads** — It helps serverless applications handle concurrency spikes without overwhelming database connection limits; it does not queue or persist application work.
- **Failover** — RDS Proxy is multi-AZ and can preserve connections through failover, reducing RDS and Aurora failover time by up to **66%**.
- **Compatibility** — It supports RDS for MySQL, PostgreSQL, MariaDB, and SQL Server, plus Aurora MySQL and PostgreSQL.
- **Application changes** — Most applications can use the proxy endpoint with little or no code change.

#### Security and networking
- **Authentication** — RDS Proxy can enforce IAM authentication for clients and retrieve database credentials securely from AWS Secrets Manager.
- **Private access** — A proxy is not publicly accessible; applications must reach it from the VPC, and Lambda functions using it must be attached to that VPC.

#### Compared with
- **RDS read replicas** — A proxy pools connections to the database; a read replica serves read-only queries and does not solve connection storms at the writer.
- **SQS** — Use RDS Proxy for synchronous connection management; use SQS when requests should be buffered and processed asynchronously.

- **See also:** Amazon RDS, Amazon Aurora, AWS Lambda, AWS Secrets Manager, Amazon SQS

### Amazon Aurora


Amazon Aurora is AWS's managed relational engine, compatible with MySQL and PostgreSQL. Choose it when a relational workload needs high availability, shared-storage read scaling, or Aurora-specific scaling and recovery features.

#### What it is
- **Compatibility** — Aurora MySQL and Aurora PostgreSQL work with their respective database drivers and much existing application code; Aurora is proprietary AWS technology rather than an open-source database engine.
- **Performance** — AWS positions Aurora as cloud-optimized and has described up to **5x MySQL** and **3x PostgreSQL** performance versus RDS engines; results depend on workload and configuration.
- **Shared storage** — The cluster volume stores six copies across three AZs; four copies are needed for writes and three for reads. The storage layer self-heals and expands automatically, independently of DB-instance compute.
- **Storage growth** — Aurora storage grows in **10-GB increments** up to **256 TiB** per cluster volume and is striped across hundreds of storage volumes.
- **Compute layout** — Each cluster has a writer and can have reader instances; storage is shared rather than separately copied to each reader.

#### Availability and replicas
- **Aurora Replicas** — Up to **15** read replicas share the cluster volume, have low replication lag, and can be distributed across AZs; they scale reads and can be promoted during writer failover.
- **Automatic failover** — Aurora can promote a replica to writer, with failover typically completing in under **30 seconds**.
- **Maintenance and monitoring** — Aurora provides automated backups, security and compliance controls, advanced monitoring, routine maintenance, and push-button scaling; engine patching is designed for minimal downtime.
- **Reader endpoint** — The reader endpoint load-balances connections across available replicas; use it for read traffic rather than hard-coding an individual reader.
- **Writer endpoint** — The writer endpoint tracks the current primary instance and is the connection endpoint for writes.
- **Custom endpoints** — Define a selected subset of cluster instances behind a custom endpoint, for example to route analytical reads to larger replicas; this provides more control than the general reader endpoint.
- **Replica autoscaling** — Aurora can add or remove read replicas as demand changes, subject to configured scaling policies.

#### Aurora Global Database
- **Regional topology** — A Global Database has one primary read/write Region and up to **10** secondary read-only Regions; each secondary can have up to **16 DB instances** (a primary instance plus replicas).
- **Replication** — Storage-based cross-Region replication typically has less than **1 second** of lag and supports local read latency for users near secondary Regions.
- **Recovery** — A secondary Region can be promoted for disaster recovery with a stated recovery time under **1 minute**; Global Database is not a multi-writer design.
- **Cross-Region read replicas** — These are another DR option; Global Database is the managed multi-Region choice when low-lag regional reads are also needed.

#### Aurora Serverless
- **Automatic capacity** — Serverless adjusts database capacity to actual demand, avoiding fixed-capacity planning for intermittent, infrequent, or unpredictable workloads.
- **Versions** — Serverless v1 is a legacy version; v2 is the current scaling model for new deployments and adjusts capacity more granularly while retaining Aurora-compatible instances and features.
- **Billing and fit** — Capacity is billed as used; Serverless can be more cost-effective when demand varies substantially, but steady workloads may suit provisioned instances better.

#### Other Aurora features
- **Backtrack** — For supported Aurora MySQL clusters, Backtrack rewinds the database to an earlier point without restoring from a backup; its configurable rewind window can be up to **72 hours**, and it is not a replacement for backups.
- **Cloning** — Copy-on-write cloning creates a separate cluster quickly from an existing cluster without copying the entire volume upfront; additional storage is allocated as the clone diverges, making staging copies efficient.
- **Parallel query** — Aurora MySQL Parallel Query can push eligible query processing down to the storage layer, accelerating analytical queries over large tables; not every query can be offloaded.
- **Multi-Master** — Aurora Multi-Master was an older capability and is not offered for current Aurora clusters; use the supported single-writer cluster with read replicas instead.
- **Machine learning** — Aurora ML exposes SageMaker predictions and Amazon Comprehend sentiment analysis through SQL integrations, enabling predictions such as fraud risk, recommendations, and sentiment without building an ML platform into the application.
- **I/O-Optimized** — Aurora I/O-Optimized removes per-I/O charges in exchange for a higher storage price, which can make total cost more predictable for I/O-intensive clusters.
- **Babelfish** — Babelfish for Aurora PostgreSQL lets applications use supported SQL Server T-SQL and the SQL Server wire protocol with reduced code changes; SCT and DMS can help with objects and data that still need conversion or migration.

#### Migration from MySQL or PostgreSQL
- **RDS to Aurora** — Restore an RDS MySQL or PostgreSQL snapshot as a new Aurora cluster, or create an Aurora read replica and promote it after replication lag reaches zero; replica migration can take time and add cost.
- **External MySQL** — Restore a Percona XtraBackup file stored in S3 to a new Aurora MySQL cluster, or load with \`mysqldump\`, which is slower; use DMS when both databases are online.
- **External PostgreSQL** — Back up to S3 and import with the Aurora \`aws_s3\` extension, or use DMS when both source and target are running.

#### Backups and security
- **Automated backups** — Aurora continuously backs up cluster data and supports point-in-time recovery for **1–35 days**; unlike standard RDS automated backups, Aurora automated backups cannot be disabled.
- **Snapshots and restore** — Manual cluster snapshots persist until deleted; restoring a backup or snapshot creates a new cluster. An external Aurora MySQL cluster can also be restored from an S3 backup made with Percona XtraBackup.
- **Encryption** — KMS encryption must be selected when creating the cluster; an unencrypted cluster must be snapshot-restored to an encrypted cluster. TLS, security groups, IAM database authentication for supported engines, and CloudWatch audit logs provide additional controls.
- **Maintenance** — Aurora automates routine maintenance and patching, and offers push-button scaling and monitoring features.

#### Compared with
- **RDS** — Choose RDS for a standard supported engine deployment; choose Aurora for compatible MySQL/PostgreSQL workloads needing its distributed storage, reader endpoints, or Aurora-specific capabilities. Aurora can cost more than standard RDS, so compare workload-specific total cost.
- **Aurora Serverless vs. provisioned** — Prefer Serverless for intermittent or hard-to-predict demand; provisioned instances fit steady workloads that need fixed capacity or have predictable utilization.

- **See also:** Amazon RDS, Amazon RDS Proxy, AWS Database Migration Service, Amazon CloudWatch

### Amazon ElastiCache


Amazon ElastiCache is a managed in-memory cache service for Redis and Memcached. Choose it to serve frequently accessed or rapidly changing data with sub-millisecond latency, reduce database read pressure, or share temporary application state.

#### What it is
- **Managed cache** — AWS manages setup, configuration, monitoring, patching, failure recovery, and supported backup features; applications still need to integrate cache reads and writes.
- **Latency and fit** — In-memory access provides sub-millisecond performance; ElastiCache is generally suited to frequent reads and fewer writes, not as a substitute for a durable relational database.
- **Scaling** — Choose cache node types and, where supported, clustering or sharding to distribute capacity and workload.
- **Database cache pattern** — On a cache miss, read from the database and populate the cache; a cache hit serves the saved result and reduces database load.

#### Redis and Memcached
- **Redis capabilities** — Redis supports replication, Multi-AZ automatic failover, read replicas, backup and restore, and data persistence using append-only files (AOF) for supported configurations.
- **Redis data structures** — Redis supports sets and sorted sets; sorted sets maintain unique, ordered scores for real-time leaderboards, and Redis geospatial commands support location lookup and distance queries.
- **Redis TTL** — Set a time-to-live on cache keys to expire stale or temporary values, including sessions and current location data.
- **Memcached** — Memcached is a multithreaded cache that can shard data across nodes; it is nonpersistent and does not provide replication-based high availability.
- **Memcached authentication** — Memcached supports SASL-based authentication in supported configurations.

#### Caching patterns
- **Lazy loading** — Read from cache first, fetch from the database on a miss, then populate the cache; it caches only requested data but can serve stale values until invalidated or expired.
- **Write-through** — Update the cache when data is written to the database, keeping cached values fresher at the cost of adding cache work to writes.
- **Session store** — Keep shared, temporary session state in Redis with a TTL so any application instance can retrieve it and sessions can expire automatically.
- **Leaderboard and geospatial uses** — Use Redis sorted sets for ranked leaderboards and its geospatial commands for rapidly updated location lookups.

#### Security and availability
- **Network protection** — Place clients and the cache in appropriate VPC networking and restrict access with security groups; TLS supports encryption in transit.
- **Redis authentication** — Redis supports IAM authentication in supported configurations and Redis AUTH tokens/passwords as an additional cache-level control.
- **Persistence** — Redis backup/snapshot and AOF capabilities support recovery or durability needs, but ElastiCache remains a cache service and should not be treated as the authoritative durable database.

#### Compared with
- **Redis vs. Memcached** — Choose Redis for persistence, sorted sets, geospatial commands, replication, or failover; choose Memcached for a simpler multithreaded, sharded, nonpersistent cache.
- **ElastiCache vs. DAX** — ElastiCache is a general-purpose cache for application data and query results; DAX is the transparent in-memory cache specifically for DynamoDB.
- **ElastiCache vs. MemoryDB** — Use ElastiCache to accelerate a primary database; use MemoryDB when the Redis-compatible in-memory store itself must be the durable primary database.

- **See also:** Amazon MemoryDB for Redis, Amazon RDS, Amazon DynamoDB, Amazon CloudFront

### Amazon MemoryDB for Redis


Amazon MemoryDB for Redis is a durable in-memory database compatible with Redis OSS data structures, APIs, and commands. Choose it when an application needs very fast in-memory access with a durable primary data store rather than a disposable cache.

#### What it is
- **Primary database** — MemoryDB combines in-memory performance with durability, so microservices can use it as their primary database instead of separately operating a cache and a durable database.
- **Redis compatibility** — Applications can use familiar Redis-compatible data structures, APIs, and commands; MemoryDB is distinct from ElastiCache, which is designed primarily to cache another data store.
- **Durability** — MemoryDB stores data in memory and maintains a durable transactional log across multiple AZs; the log supports recovery, failover, and node restarts.
- **Performance** — MemoryDB provides microsecond reads, single-digit millisecond writes, and high throughput.
- **Availability** — Multi-AZ durability and automatic recovery support high availability; use it when durable in-memory data is more important than a cache's disposable state.

#### Compared with
- **MemoryDB vs. ElastiCache** — MemoryDB is a durable primary database; ElastiCache is an in-memory cache used to accelerate an application or backing database.
- **MemoryDB vs. Redis on a server** — MemoryDB provides managed infrastructure and durable multi-AZ operation while retaining Redis-compatible application interfaces.

- **See also:** Amazon ElastiCache, Amazon DynamoDB, Amazon RDS

### Amazon DocumentDB


Amazon DocumentDB is a managed, MongoDB-compatible document database for JSON-oriented data. Choose it when an application needs document storage and queries without translating document structures into relational tables.

#### What it is
- **Document model** — DocumentDB stores, queries, and indexes JSON documents using MongoDB-compatible APIs; it is a NoSQL document database rather than a relational SQL engine.
- **Managed deployment** — Its deployment concepts resemble Aurora: AWS manages the service and replicates data across three AZs for availability.
- **Storage scaling** — DocumentDB storage automatically grows in **10-GB increments** as the database expands.
- **Scale** — The service is designed to scale to workloads with millions of requests per second.
- **Workload fit** — Use it for applications built around MongoDB-compatible document access; choose a relational database when joins and relational transactions are central.

#### Compared with
- **DocumentDB vs. Aurora** — DocumentDB targets MongoDB-compatible JSON documents; Aurora targets relational PostgreSQL- or MySQL-compatible SQL workloads.
- **Migration** — DMS supports DocumentDB as a source and target; use SCT when a heterogeneous source-to-target schema requires conversion.

- **See also:** Amazon RDS, Amazon Aurora, Amazon Neptune, AWS Database Migration Service

### Amazon Neptune


Amazon Neptune is a managed graph database optimized for highly connected data and relationship traversals. Choose it for applications such as social networks, fraud detection, recommendations, and knowledge graphs.

#### What it is
- **Graph model** — Neptune represents entities and their relationships as a graph, so queries can traverse connections more naturally than relational joins for deeply linked data.
- **Scale and latency** — It can store billions of relationships and query connected data with millisecond latency.
- **Availability** — Neptune replicates across multiple AZs and supports up to **15 read replicas** for read scaling.
- **Graph use cases** — Common applications include social networks, recommendation engines, fraud detection, and knowledge graphs such as encyclopedia relationships.
- **Query technologies** — Neptune supports graph query languages including Gremlin, openCypher, and SPARQL for supported graph models.

#### Neptune Streams
- **Ordered change stream** — Neptune Streams exposes an ordered sequence of graph changes shortly after writes, without duplicates.
- **Access and use** — Applications read stream data through an HTTP REST API to send change notifications, synchronize another data store, or replicate graph changes across Regions.

#### Compared with
- **Neptune vs. relational databases** — Use Neptune when the key query is traversing many relationships; use RDS or Aurora when the data is relational and joins are the natural access pattern.
- **Neptune vs. search** — Neptune answers graph relationship queries; a search index is better for free-text and document search.

- **See also:** Amazon DocumentDB, Amazon RDS, Amazon Aurora, AWS Database Migration Service

### Amazon Keyspaces (for Apache Cassandra)


Amazon Keyspaces is a serverless, managed Apache Cassandra-compatible database that uses Cassandra Query Language (CQL). Choose it for distributed wide-column workloads that need Cassandra compatibility without operating Cassandra clusters.

#### What it is
- **Compatibility** — Keyspaces supports Apache Cassandra-compatible APIs and CQL, allowing Cassandra applications to use a managed AWS service.
- **Availability** — Tables are replicated three times across multiple AZs, and AWS manages the database infrastructure.
- **Scaling and latency** — Keyspaces scales tables up or down with traffic and provides single-digit millisecond latency at workloads of thousands of requests per second.
- **Capacity modes** — Choose on-demand capacity or provisioned capacity with auto scaling.
- **Data protection** — Keyspaces encrypts data, supports backups, and provides point-in-time recovery for up to **35 days**.
- **Workload fit** — Common uses include IoT device records and time-series data that fit Cassandra's distributed wide-column model.

#### Compared with
- **Keyspaces vs. RDS** — Choose Keyspaces for Cassandra/CQL-compatible distributed workloads; choose RDS for relational SQL, joins, and transactional relational schemas.

- **See also:** Amazon DynamoDB, Amazon Timestream, AWS Database Migration Service

### Amazon Timestream


Amazon Timestream is a managed, serverless time-series database for high-volume event data. Choose it for IoT, operational telemetry, and real-time analytics with time-based queries and retention tiers.

#### What it is
- **Time-series data** — Timestream stores and analyzes timestamped records and can handle trillions of events per day.
- **Managed scaling** — The service scales capacity up or down automatically without database-server provisioning.
- **Query features** — Timestream supports SQL, scheduled queries, multi-measure records, and built-in time-series analytics for identifying patterns.
- **Tiered storage** — Recent data is retained in a fast memory tier while historical data moves to cost-optimized storage.
- **Performance and cost** — For suitable time-series workloads, Timestream can be thousands of times faster and one-tenth the cost of relational databases; actual results depend on workload and query pattern.
- **Security** — Timestream encrypts data in transit and at rest.

#### Integrations
- **Ingestion** — Sources and integrations include AWS IoT, Kinesis Data Streams, Lambda, Prometheus, and Amazon MSK.
- **Analytics and visualization** — Timestream can feed QuickSight, SageMaker, Kinesis Data Analytics for Apache Flink, and JDBC-connected applications.

#### Compared with
- **Timestream vs. RDS** — Use Timestream for high-volume timestamped data and time-series analysis; use RDS for general relational transactions and joins.
- **Timestream vs. Keyspaces** — Choose Timestream for managed time-series analytics and time-tiered storage; choose Keyspaces when Cassandra/CQL compatibility is required.

- **See also:** Amazon Keyspaces (for Apache Cassandra), Amazon RDS, Amazon Kinesis Data Streams, Amazon QuickSight

### Amazon QLDB


Amazon Quantum Ledger Database (QLDB) was a managed ledger database designed to maintain an immutable, cryptographically verifiable history of application data. AWS ended QLDB support on **July 31, 2025**; retain this entry as historical service knowledge, not as a new deployment choice.

#### What it is
- **Immutable journal** — QLDB maintained a transaction journal whose history could not be overwritten or deleted, making it suitable for a complete record of changes.
- **Cryptographic verification** — The journal's cryptographic digest could be used to verify that a document's history had not been altered.
- **Centralized ownership** — Unlike a blockchain network, QLDB was controlled by a central authority and did not require multiple independent participants to reach consensus.
- **Ledger queries** — QLDB exposed a SQL-like query interface for searching ledger data and its history.
- **Use cases** — Examples include financial, supply-chain, and other systems that need an auditable, verifiable change history.

#### Compared with
- **QLDB vs. blockchain** — Choose a blockchain when independent parties need a decentralized shared ledger and consensus; QLDB was a centrally managed ledger with verifiable history.
- **QLDB vs. ordinary database** — A conventional database can update current values but does not inherently provide QLDB's immutable, cryptographically verifiable transaction history.

- **See also:** Amazon DynamoDB, Amazon RDS, AWS Database Migration Service

### AWS Database Migration Service


AWS Database Migration Service (AWS DMS) migrates database data while the source remains available and supports initial loads as well as ongoing change data capture. Use DMS for homogeneous or heterogeneous migrations and continuous database replication.

#### What it is
- **Homogeneous migration** — DMS moves data between databases using the same engine, such as Oracle to Oracle; schema conversion is generally unnecessary.
- **Heterogeneous migration** — DMS can move data between different engines, such as SQL Server to Aurora; use AWS Schema Conversion Tool (SCT) to convert schemas and code that are incompatible with the target.
- **Initial load and CDC** — A DMS task can load existing data and use change data capture (CDC) to replicate changes made after the load begins.
- **Source availability** — The source database can remain online during migration or replication, allowing applications to continue operating while changes are copied.
- **Replication capacity** — Provisioned DMS tasks run on a replication instance; DMS Serverless can provision and scale replication capacity automatically for variable workloads.

#### AWS Schema Conversion Tool
- **Schema conversion** — SCT converts database schemas and code objects from one engine to another, such as Oracle or SQL Server to MySQL, PostgreSQL, or Aurora for OLTP, and Teradata or Oracle to Redshift for OLAP.
- **When to use SCT** — Same-engine moves such as on-premises PostgreSQL to RDS PostgreSQL do not require conversion; SCT can still help assess compatibility issues.
- **Conversion compute** — Schema conversion can be compute-intensive, so use an appropriately sized compute instance for large conversion jobs.
- **Division of work** — SCT converts schema and code; DMS moves the table data and can replicate ongoing changes.

#### Sources and targets
- **Sources** — DMS sources include on-premises and EC2-hosted Oracle, SQL Server, MySQL, MariaDB, PostgreSQL, MongoDB, SAP, and Db2; Azure SQL Database; Amazon RDS engines including Aurora; Amazon S3; and DocumentDB.
- **Targets** — DMS targets include on-premises and EC2-hosted Oracle, SQL Server, MySQL, MariaDB, PostgreSQL, and SAP; Amazon RDS; Redshift; DynamoDB; S3; OpenSearch Service; Kinesis Data Streams; Apache Kafka; DocumentDB; Neptune; Redis; and Babelfish.

#### Availability
- **Multi-AZ replication instance** — When Multi-AZ is enabled, DMS maintains a synchronous standby replication instance in another AZ, providing redundancy, avoiding I/O freezes, and minimizing latency spikes during instance failure.
- **Migration scope** — DMS supports migrations from on-premises to AWS, between AWS databases, and from AWS to on-premises environments.

#### Compared with
- **DMS vs. SCT** — DMS copies and replicates data; SCT converts schemas and code. Heterogeneous migrations commonly use both, while a same-engine move commonly needs DMS alone.
- **DMS vs. backup restore** — Use DMS when ongoing changes must be replicated or a low-downtime migration is needed; use snapshots or engine-native backups for point-in-time restoration or suitable offline moves.

- **See also:** Amazon RDS, Amazon Aurora, Amazon DocumentDB, Amazon Neptune

### Choosing a database


Choose a database by its data model, query patterns, consistency and durability needs, latency, throughput variability, scale, and licensing cost.

#### Workload -> service
- **Relational OLTP, SQL, joins, and transactions** -> Amazon RDS for familiar managed engines; Amazon Aurora for compatible MySQL/PostgreSQL workloads needing Aurora's distributed storage, read scaling, or global features.
- **Intermittent or unpredictable relational demand** -> Aurora Serverless; prefer provisioned RDS or Aurora when demand is steady and known.
- **Lambda connection bursts to RDS or Aurora** -> Amazon RDS Proxy to pool connections; use SQS instead when work should be queued asynchronously.
- **Frequently read results, sessions, leaderboards, or live geospatial lookups** -> Amazon ElastiCache for Redis; use Memcached for a simpler multithreaded, nonpersistent sharded cache.
- **Durable Redis-compatible in-memory primary store** -> Amazon MemoryDB for Redis rather than a disposable cache.
- **MongoDB-compatible JSON documents** -> Amazon DocumentDB.
- **Highly connected relationships and graph traversals** -> Amazon Neptune.
- **Cassandra-compatible wide-column data and CQL** -> Amazon Keyspaces (for Apache Cassandra).
- **Timestamped IoT or operational events with time-series analytics** -> Amazon Timestream.
- **Immutable, cryptographically verifiable ledger history** -> Amazon QLDB for historical service knowledge; confirm AWS availability before selecting a replacement for a new project.
- **Database migration with initial load plus ongoing changes** -> AWS DMS; add SCT when source and target engines differ.
- **General key-value/document data with serverless scaling** -> Amazon DynamoDB; use DAX for transparent DynamoDB caching rather than using ElastiCache as a native drop-in cache.
- **Choose from requirements, not labels** — Confirm the query language, schema flexibility, joins, access paths, retention, recovery objective, multi-Region needs, license model, and expected read/write mix before selecting a service.

- **See also:** Amazon DynamoDB, Amazon RDS, Amazon RDS Proxy, Amazon Aurora, Amazon ElastiCache, Amazon MemoryDB for Redis, Amazon DocumentDB, Amazon Neptune, Amazon Keyspaces (for Apache Cassandra), Amazon Timestream, Amazon QLDB, AWS Database Migration Service

## Networking and content delivery

### Amazon VPC


A Virtual Private Cloud is a logically isolated network in an AWS Region where you choose IP ranges, subnets, routing, and network controls. Use it to place AWS resources on private network paths and control how they communicate with each other, AWS services, on-premises networks, and the internet.

#### What it is
- **Regional network** — A VPC is an isolated network boundary within one AWS Region; default VPC quota is **5 per Region** and can be increased.
- **Private addressing** — Select IPv4 and optional IPv6 CIDR ranges for the network, then divide them into AZ-scoped subnets.

#### Addressing and subnets
- **VPC scope** — A VPC spans a Region; each subnet is confined to one Availability Zone, so use subnets in multiple AZs for zonal resilience.
- **IPv4 CIDRs** — A VPC can have up to five IPv4 CIDR blocks; each block ranges from **/16** (65,536 addresses) to **/28** (16 addresses). Plan non-overlapping ranges across VPCs and connected corporate networks.
- **Private IPv4 ranges** — RFC 1918 ranges are **10.0.0.0/8**, **172.16.0.0/12**, and **192.168.0.0/16**; other IPv4 ranges are public.
- **CIDR interpretation** — **/32** identifies one IPv4 address, **/24** spans 256 addresses, **/16** spans 65,536, and **/0** covers all IPv4 addresses.
- **Subnet reservations** — AWS reserves the first four and last IPv4 addresses in every subnet. In a \`10.0.0.0/24\`, these are \`10.0.0.0\` (network), \`.1\` (VPC router), \`.2\` (Amazon-provided DNS), \`.3\` (future use), and \`.255\` (broadcast, unsupported in a VPC); a /24 therefore has 251 assignable addresses.
- **Default VPC** — New accounts receive a default VPC; an EC2 instance launched without an explicitly selected subnet goes there. It has internet connectivity, and instances receive public IPv4 addresses plus public and private IPv4 DNS names.
- **Public subnet** — A subnet is public only when its associated route table has a route to an attached Internet Gateway; an instance also needs a public address and permissive security rules to be internet reachable.
- **DHCP and DNS** — A VPC DHCP options set supplies network settings such as domain name and DNS servers. The Amazon-provided resolver handles VPC DNS and private hosted zones when \`enableDnsSupport\` and \`enableDnsHostnames\` are enabled; custom DHCP DNS settings can point clients at other resolvers.

#### Routing and internet access
- **Route tables** — Each subnet uses one route table, explicitly or through the main table. Routes select a destination CIDR and target; add routes for internet gateways, NAT gateways, peering, endpoints, VPNs, or transit gateways as appropriate.
- **Internet Gateway (IGW)** — Attach an IGW to a VPC for IPv4 and IPv6 internet routing; it is horizontally scaled, redundant, and highly available. An IGW alone does not provide internet access: routes and suitable instance addresses and security rules are also required.
- **IGW attachment** — An IGW attaches to one VPC, and a VPC can have only one attached IGW at a time.
- **Bastion host** — A bastion is an EC2 jump host in a public subnet used to SSH to private instances. Restrict its inbound SSH rule to a trusted corporate CIDR; allow private instances to accept SSH from the bastion security group or its private IP.
- **NAT Gateway** — A public NAT Gateway lets instances in private IPv4 subnets initiate internet connections while preventing unsolicited inbound connections. It uses an Elastic IP, requires an IGW and route-table entries, and has no security group; it is intended for clients in other subnets, not instances in its own subnet.
- **NAT Gateway capacity and cost** — A zonal NAT Gateway is created in one AZ, starts at **5 Gbps** and scales automatically to **100 Gbps**; AWS manages it, and charges apply per hour and per GB processed.
- **NAT Gateway resilience** — A NAT Gateway is resilient within its AZ but is not cross-AZ resilient. Deploy one per used AZ and route each private subnet through its same-AZ gateway to avoid cross-AZ dependency and traffic charges.
- **Regional NAT Gateway** — A Regional NAT Gateway is associated with a VPC, has its own route tables, and expands automatically into newly used AZs, avoiding per-AZ NAT deployments and the need for public subnets to host it.
- **NAT instance** — The older customer-managed alternative runs in a public subnet, needs an Elastic IP, disabled EC2 source/destination checking, routes from private subnets, and security-group rules; bandwidth depends on instance type, and you manage patching and failover. Allow HTTP/HTTPS from private subnets, SSH only from a trusted network, and HTTP/HTTPS outbound. A preconfigured Amazon Linux NAT AMI existed, but its standard support ended on **December 31, 2020**.
- **NAT comparison** — Prefer NAT Gateway for AWS-managed scaling and availability; use a NAT instance only when its instance-level control or custom configuration justifies operating and scaling it yourself. NAT Gateway costs per hour and data processed; a NAT instance also incurs EC2 instance and network charges. A NAT instance can also serve as a bastion host, unlike a NAT Gateway.
- **IPv6 egress** — An egress-only IGW lets IPv6 instances initiate outbound internet connections but blocks connections initiated from the internet; it is IPv6-only and requires a route-table entry.

#### Network controls
- **Security groups** — Security groups are stateful, allow-only firewalls attached to network interfaces or instances; return traffic is automatically permitted, and all applicable rules are evaluated together.
- **Network ACLs (NACLs)** — NACLs are stateless subnet-level allow/deny filters. They apply to every resource in the associated subnet, so explicitly allow both request and response directions.
- **NACL ordering** — Rules are numbered **1–32766**, evaluated from the lowest number upward, and the first match wins; the terminal \`*\` rule denies traffic with no match. New custom NACLs deny all traffic, while the default NACL allows inbound and outbound traffic; AWS recommends incrementing rule numbers by 100 rather than editing the default NACL.
- **Security group vs. NACL** — Use security groups for stateful per-interface access control and NACLs for stateless subnet-wide filtering, including explicit deny rules or blocking a source IP. Both routing and security rules must permit a flow.
- **Ephemeral ports** — A client connects to a server's fixed destination port and receives replies on a client-selected ephemeral port. Example ranges are **49152–65535** for IANA/Windows 10 and **32768–60999** for many Linux kernels; NACLs must permit the return range used by the clients (the course example uses **1024–65535**).

#### Connectivity between VPCs and services
- **VPC peering** — Peering privately connects two VPCs over AWS networking, including across accounts or Regions, only when their CIDRs do not overlap. It is **not transitive**: create a separate peering connection for every communicating pair and add routes in both VPCs.
- **Shared subnets** — AWS RAM can share VPC subnets across accounts in the same AWS Organization, allowing participant accounts to place resources in a centrally managed VPC instead of creating many peering links.
- **Peering limits and rules** — AWS recommends no more than **125 peering connections per VPC**; peering does not provide a hub, shared internet/NAT, or transitive routing through another VPC, so a growing full mesh requires many pairwise links. A security group in a peered VPC can be referenced across accounts when the peers are in the same Region.
- **VPC endpoints** — Endpoints provide private connectivity to supported AWS services without sending service traffic through an IGW or NAT Gateway; see AWS PrivateLink for endpoint types and provider services. Examples include S3, DynamoDB, CloudFormation, Systems Manager, CloudWatch, and SNS; check VPC DNS settings and route tables when endpoint access fails.
- **VPC Flow Logs** — Flow Logs capture IP traffic metadata at VPC, subnet, or ENI level, including traffic for managed interfaces such as load balancers, RDS, ElastiCache, Redshift, WorkSpaces, NAT Gateways, and Transit Gateways; they do not capture packet payloads.
- **Flow Log destinations and analysis** — Send logs to S3, CloudWatch Logs, or Kinesis Data Firehose; analyze S3 data with Athena or CloudWatch data with Logs Insights. Records can include source/destination addresses and ports, protocol, packet/byte counts, times, and \`ACCEPT\`/\`REJECT\` action.
- **Flow Log troubleshooting** — A rejected inbound or outbound flow can indicate a security-group or NACL block; an accepted request followed by a rejected response points to a stateless NACL return rule. The \`action\` field identifies the logged decision.
- **Flow Logs permissions** — Publishing to CloudWatch Logs requires an IAM service role with permissions such as \`logs:CreateLogGroup\`, \`logs:CreateLogStream\`, and \`logs:PutLogEvents\`.
- **Traffic Mirroring** — Copy selected inbound or outbound packets from source ENIs to a target ENI or Network Load Balancer for security inspection, threat monitoring, or troubleshooting; capture all packets or filter and truncate them.
- **Traffic Mirroring scope** — Sources and targets can be in the same VPC or in VPCs connected by peering; the mirrored traffic can be sent to security appliances that you operate.
- **Private-IP costs** — Same-AZ traffic and inbound data transfer are shown as free in the simplified pricing model; cross-AZ transfer is lower over private IP (**$0.01/GB**) than public or Elastic IP paths (**$0.02/GB**), and inter-Region transfer is shown at **$0.02/GB**.
- **Egress costs** — Internet egress is generally charged while ingress is typically free; keep traffic within AWS where practical, and a Direct Connect location in the same Region can reduce egress cost.

#### IPv6
- **Dual stack** — IPv4 cannot be disabled in a VPC or subnet; add IPv6 and operate in dual-stack mode. AWS IPv6 addresses are globally unique and internet-routable, not private addresses.
- **IPv6 internet routing** — An IGW supports IPv4 and IPv6 routes; an egress-only IGW is the outbound-only choice for private IPv6 workloads. IPv4 private-subnet egress still uses NAT Gateway when accessing IPv4 destinations.

#### Diagnostics and exam cues
- **Reachability Analyzer** — Analyze a modeled path between supported network resources to identify configuration blockers such as routes, security groups, or NACLs; it evaluates configuration rather than sending test packets.
- **Choose VPC controls** — A public address by itself is insufficient for internet reachability; verify the subnet route, IGW attachment, security-group rules, and NACL rules together.
- **See also:** AWS PrivateLink, AWS Transit Gateway, AWS Site-to-Site VPN, AWS Client VPN, AWS Network Firewall, Amazon Route 53, Elastic Fabric Adapter

### AWS PrivateLink


AWS PrivateLink provides private connectivity to AWS services and services that you expose from your own VPC, without requiring public IP routing or VPC peering. Use an interface endpoint for most supported services or publish a private endpoint service for consumers.

#### What it is
- **Private connectivity** — PrivateLink connects consumers to services over AWS private networking without public IP routing or VPC peering.
- **Interface endpoint** — Creates private IP addresses on endpoint network interfaces (ENIs) in selected subnets; attach a security group to control traffic to those ENIs.
- **AWS service access** — Interface endpoints use PrivateLink to reach many AWS services privately, including examples such as CloudWatch, SNS, CloudFormation, and Systems Manager, without an IGW or NAT Gateway; endpoints are redundant and scale horizontally.

#### Choosing an endpoint
- **Endpoint charges** — Interface endpoints are charged per endpoint-hour and per GB processed; compare those costs with NAT Gateway processing for the expected traffic volume.
- **Gateway endpoints** — S3 and DynamoDB are the gateway-endpoint services; a gateway endpoint adds a route-table target, uses no security group, and has no endpoint hourly or data-processing charge. A gateway endpoint can avoid example NAT Gateway charges of **$0.045/hour** and **$0.045/GB** processed; same-Region S3 transfer is shown at **$0/GB**, versus **$0.09/GB** cross-Region.
- **Choosing S3 access** — Prefer a gateway endpoint for workloads in its VPC and Region; use an interface endpoint when access is needed from on-premises, another VPC, or another Region.
- **Endpoint policies** — An endpoint policy can further limit which principals and resources are reachable through that endpoint; IAM and resource policies still apply.

#### Endpoint services
- **Provider setup** — Expose a service from a provider VPC as an endpoint service behind a Network Load Balancer, then grant selected AWS principals permission to connect.
- **Consumer setup** — A consumer creates an interface endpoint to the provider service; the connection stays on AWS private networking and avoids VPC peering, public internet, NAT, and provider-side inbound access from the consumer.
- **Service acceptance** — Endpoint services can require provider acceptance of connection requests; consumers can connect across accounts and supported Regions when the provider permits it.
- **On-premises access** — On-premises networks can reach an interface endpoint over Direct Connect or Site-to-Site VPN when routing and endpoint security groups permit it.
- **Limitations** — PrivateLink provides private consumer-to-provider service connectivity, not general transitive VPC routing; use Transit Gateway for a routed hub between networks.
- **See also:** Amazon VPC, AWS Transit Gateway, AWS Direct Connect

### AWS Transit Gateway


AWS Transit Gateway is a managed regional hub that connects VPCs and hybrid networks through attachments and centrally controlled route tables. Choose it instead of a large non-transitive VPC peering mesh when many VPCs or on-premises networks must communicate.

#### What it is
- **Hub-and-spoke** — Attach VPCs, Site-to-Site VPNs, and Direct Connect connectivity to a Transit Gateway to enable transitive routing among many networks.
- **Regional and cross-Region** — A Transit Gateway is regional; peer Transit Gateways to route between Regions.
- **Cross-account sharing** — Share a Transit Gateway with other accounts using AWS Resource Access Manager (RAM).
- **Route tables** — Associate attachments with Transit Gateway route tables and control reachability by installing, propagating, or isolating routes; separate tables support segmented networks and shared-services patterns.
- **Direct Connect integration** — Connect a Direct Connect Gateway to a Transit Gateway through a transit virtual interface; a Direct Connect Gateway is the DX integration point, not itself the VPC-to-VPC transit router.
- **Multicast** — Transit Gateway is the AWS networking service that supports IP multicast.

#### VPN throughput and ECMP
- **ECMP** — Equal-cost multi-path routing distributes traffic across equally preferred paths; Transit Gateway can use it across multiple dynamically routed Site-to-Site VPN tunnels.
- **VPN throughput example** — A Site-to-Site VPN tunnel to a virtual private gateway is limited to **1.25 Gbps**; a Transit Gateway VPN attachment can aggregate two tunnels to **2.5 Gbps**, with examples of two connections totaling **5 Gbps** and three totaling **7.5 Gbps** when ECMP is used.
- **Routing requirement** — Use dynamic BGP routing and eligible equal-cost paths for VPN ECMP; a virtual private gateway does not provide Transit Gateway ECMP.

#### Compared with
- **Transit Gateway vs. peering** — Transit Gateway is transitive and centrally routes among many attachments; VPC peering is a direct, non-transitive connection between a pair of VPCs.
- **See also:** Amazon VPC, AWS PrivateLink, AWS Direct Connect, AWS Site-to-Site VPN

### AWS Direct Connect


AWS Direct Connect establishes a dedicated private network connection from a customer network to an AWS Direct Connect location. Choose it for consistent hybrid connectivity and higher throughput; it is not encrypted by default and can take significant time to provision.

#### What it is
- **Dedicated path** — A physical Ethernet connection runs from a customer or partner router at a Direct Connect location to AWS; use a virtual interface (VIF) to reach AWS resources.
- **IP support** — Direct Connect supports both IPv4 and IPv6.
- **Use cases** — Connect on-premises networks to AWS for large data sets, bandwidth-intensive applications, real-time feeds, or a more consistent network experience; public AWS services and private VPC resources can use separate VIFs on the connection.
- **Dedicated connections** — A dedicated connection provides a physical Ethernet port for one customer; the course lists capacities from **1 Gbps to 400 Gbps**, requested from AWS and completed by a Direct Connect Partner.
- **Hosted connections** — A hosted connection is provisioned through a Direct Connect Partner; the course lists **50 Mbps to 25 Gbps**, with capacity that can be added or removed on demand.
- **Provisioning time** — Establishing a new connection can take longer than a month, so Direct Connect is not the fastest option for an urgent connection.

#### Virtual interfaces and gateways
- **Private VIF** — Use a private virtual interface to reach private VPC addresses through a Virtual Private Gateway, or through a Direct Connect Gateway for multi-Region designs.
- **Public VIF** — Use a public virtual interface to reach public AWS service endpoints, such as S3, over Direct Connect without sending traffic over the public internet.
- **Transit VIF** — Use a transit virtual interface to connect a Direct Connect Gateway to a Transit Gateway for hybrid routing across multiple VPC attachments.
- **Direct Connect Gateway** — This global resource associates a Direct Connect connection/VIF with Virtual Private Gateways in multiple Regions, or with a Transit Gateway using a transit VIF; it does not replace Transit Gateway for VPC-to-VPC transit routing.
- **BGP and VLANs** — VIFs use VLAN tagging and BGP to establish and exchange routes with AWS; advertise only prefixes appropriate to the selected public, private, or transit VIF.
- **Link Aggregation Group (LAG)** — Combine multiple eligible Direct Connect ports into one logical connection for greater aggregate bandwidth and link-level resilience; member connections must meet AWS LAG compatibility requirements.
- **SiteLink** — SiteLink lets supported Direct Connect locations communicate with each other over the AWS global network without routing the traffic through a VPC; it is configured on eligible VIFs and is distinct from a Transit Gateway hub.

#### Security and resilience
- **Encryption** — Direct Connect traffic is private but is not encrypted in transit by default; run Site-to-Site VPN over Direct Connect when IPsec encryption is required.
- **Redundant connections** — For high resilience, use redundant connections at separate Direct Connect locations; maximum resilience uses separate connections terminating on separate devices in more than one location.
- **Backup connectivity** — A Site-to-Site VPN can provide a lower-cost encrypted backup path if Direct Connect fails; a second Direct Connect connection is another, more expensive option.
- **Compared with VPN** — Direct Connect provides a dedicated, consistent private path but takes longer to establish and does not encrypt by default; VPN is quicker to set up and encrypts traffic over the public internet.
- **See also:** AWS Transit Gateway, AWS Site-to-Site VPN

### AWS Site-to-Site VPN


AWS Site-to-Site VPN creates IPsec tunnels between an on-premises network and an AWS-side gateway over the public internet. Use it for encrypted hybrid connectivity, rapid setup, or as a backup to Direct Connect.

#### What it is
- **Customer Gateway (CGW)** — Represents the customer-side VPN device; it can be a physical appliance or software, and AWS needs its public, internet-routable IP address.
- **NAT traversal** — If the customer gateway is behind a NAT device with NAT traversal enabled, configure the public IP address of that NAT device.
- **Virtual Private Gateway (VGW)** — The AWS-side VPN concentrator is attached to the VPC; its ASN can be customized.

#### Routing and security
- **Transit Gateway option** — Attach VPN connections to Transit Gateway when the VPN must reach multiple VPCs or use Transit Gateway route tables and ECMP.
- **Redundancy** — A VPN connection provides two tunnels for availability; configure both tunnel paths and appropriate routing rather than depending on a single tunnel.
- **Routing** — Enable route propagation for a VGW in the subnet route table, or configure the appropriate static routes; security groups and NACLs still control the permitted traffic.
- **Static vs. dynamic routing** — Static routing requires you to enter remote network prefixes; dynamic routing uses BGP to exchange routes and react to path changes, and is required for Transit Gateway VPN ECMP.
- **IPsec encryption** — VPN tunnels encrypt traffic in transit; they traverse the public internet, so performance and latency can vary compared with Direct Connect.

#### Options and patterns
- **Accelerated Site-to-Site VPN** — Uses AWS Global Accelerator at the VPN entry point to improve availability and performance over the AWS global network; it is an option when a regular internet VPN path is not sufficient.
- **AWS VPN CloudHub** — Connect multiple Site-to-Site VPN connections to one VGW with dynamic routing and route tables to create a low-cost hub-and-spoke network among remote sites; it still uses the public internet.
- **Direct Connect backup or encryption** — Use VPN as a backup to Direct Connect, or overlay VPN on Direct Connect when private connectivity must also be IPsec-encrypted.
- **Reachability requirements** — For an on-premises host to ping an EC2 instance, the route and security group must also permit ICMP; a VPN tunnel alone does not grant application access.
- **See also:** AWS Direct Connect, AWS Transit Gateway, Amazon VPC

### AWS Client VPN


AWS Client VPN is a managed remote-access VPN for individual users and devices, providing encrypted connectivity to VPC and on-premises resources. Choose it for user-to-network access rather than connecting an entire data center with Site-to-Site VPN.

#### What it is
- **Client-based access** — Users connect with an OpenVPN-based client to a Client VPN endpoint; the service terminates client connections and routes authorized traffic to associated networks.
- **Authentication** — Supports mutual certificate authentication and user-based authentication through Active Directory or federated SAML 2.0; authentication can be combined with mutual authentication.
- **Network association** — Associate target subnets in one or more AZs for availability and resource access; configure endpoint routes and authorization rules separately.
- **Client address pool** — Assign a client CIDR that does not overlap with the VPC or networks the endpoint will reach; clients receive addresses from this range.
- **Split tunnel** — With split tunneling enabled, only traffic for routes configured on the endpoint goes through the VPN; otherwise client traffic can be sent through the VPN endpoint.
- **Hybrid access** — Client VPN can reach on-premises networks through Site-to-Site VPN or Direct Connect when routes and authorization permit.
- **Compared with Site-to-Site VPN** — Client VPN is for individual remote users; Site-to-Site VPN connects whole customer and AWS networks through customer and virtual private gateways.
- **See also:** AWS Site-to-Site VPN, AWS Direct Connect, Amazon VPC

### Amazon Route 53


Amazon Route 53 is a highly available, scalable, managed authoritative DNS service that also supports domain registration and resource health checks. Use it to answer DNS queries with records, health-based failover, and location- or latency-aware routing; DNS answers direct clients but do not proxy their application traffic.

#### What it is
- **Authoritative DNS** — Route 53 is a managed authoritative DNS service, domain registrar, and resource-health-check service; it advertises a **100% availability SLA** for its DNS service.
- **Hosted-zone pricing** — A hosted zone is listed at **$0.50 per month**.

#### DNS records and zones
- **Record contents** — A record identifies a name, type, value, routing policy, and TTL; record types include **A**, **AAAA**, **CNAME**, **NS**, **CAA**, **DS**, **MX**, **NAPTR**, **PTR**, **SOA**, **TXT**, **SPF**, and **SRV**.
- **A and AAAA** — A maps a name to an IPv4 address; AAAA maps a name to an IPv6 address.
- **CNAME** — Maps a non-apex hostname to another hostname, whose target must resolve to an A or AAAA record; it cannot be used at the zone apex.
- **Hosted zones** — A hosted zone is a container for the records for a domain and its subdomains; a public hosted zone answers for internet DNS, and a private hosted zone answers within associated VPCs.
- **Private hosted zones** — Associate a private hosted zone with one or more VPCs and enable both \`enableDnsSupport\` and \`enableDnsHostnames\` on each VPC that must resolve its records.
- **TTL** — DNS resolvers cache a record for its TTL; a high TTL reduces DNS query volume but can preserve stale answers longer, while a low TTL makes changes take effect sooner but increases queries. TTL is required for ordinary records.

#### Alias and routing
- **Alias records** — An Alias points a DNS name to a supported AWS resource and tracks changing resource addresses; AWS-resource aliases use **A or AAAA** records, can be used at the zone apex or a subdomain, are free, and have no configurable TTL.
- **Alias targets** — Supported targets include ELBs, CloudFront distributions, API Gateway, Elastic Beanstalk environments, S3 website endpoints, VPC interface endpoints, Global Accelerator, and another record in the same hosted zone; an EC2 DNS name is not an Alias target.
- **Alias vs. CNAME** — Use Alias for AWS resources and zone-apex names; CNAME can point to any hostname but only at a non-apex name. Alias records support native target-health evaluation.
- **Simple routing** — Return one resource or multiple record values, from which the client chooses a random value; simple records cannot be associated with health checks, and an Alias simple record targets one AWS resource.
- **Weighted routing** — Send a relative share of DNS responses to same-name, same-type records using weights that need not sum to 100; use for traffic distribution or version tests, and set a record weight to zero to stop selecting it. If every record has weight zero, Route 53 returns them equally; weighted records can use health checks.
- **Latency-based routing** — Answer with the Region offering the lowest measured latency for the client; it can use health checks for failover.
- **Failover routing** — Use a health check on the primary record and return a secondary record for active-passive disaster recovery.
- **Geolocation routing** — Select a response based on the user's continent, country, or US state; when locations overlap, the most specific match wins. Create a default record for unmatched locations, and use it for localization or country-based policy; health checks can be associated with these records.
- **Geoproximity routing** — Route based on the geographic locations of users and resources, then shift traffic by a bias from **-99** (shrink) to **+99** (expand); use Route 53 Traffic Flow to configure it.
- **IP-based routing** — Map client CIDR collections to endpoint records, for example to steer an ISP's address range to a selected location.
- **Multi-value answer** — Return multiple healthy resource values, up to **eight** per query, with optional health checks; it is not a substitute for a load balancer.

#### Health checks and hybrid DNS
- **Health-check types** — Check public endpoints over HTTP, HTTPS, or TCP; combine child checks with calculated checks using **AND**, **OR**, or **NOT**; or monitor a CloudWatch alarm for metrics and private resources. Health checks integrate with CloudWatch metrics and can be used with weighted, latency, geolocation, and failover routing.
- **Endpoint health-check defaults** — About 15 global checkers monitor an endpoint; the default interval is **30 seconds** and the healthy/unhealthy threshold is **3**. A **10-second** interval is available at higher cost.
- **Health-check results** — More than **18%** of checkers must report healthy for the endpoint to be considered healthy; HTTP(S) checks pass on **2xx** or **3xx** responses and can match text in the first **5,120 bytes**. Choose checker locations as needed and allow inbound probes from Route 53 health-checker IP ranges in network firewalls.
- **Calculated checks** — Combine up to **255** child health checks and set how many must pass; this can suppress failover during planned maintenance.
- **Private-resource checks** — Public Route 53 health checkers cannot reach private VPC or on-premises endpoints; publish a metric to CloudWatch and check its alarm instead.
- **Route 53 Resolver** — The VPC Resolver answers for EC2 hostnames, private hosted zones, and public names; Resolver endpoints provide DNS forwarding between VPCs and on-premises networks over VPN or Direct Connect.
- **Inbound Resolver endpoint** — Lets on-premises DNS resolvers send queries into a VPC to resolve AWS private names.
- **Outbound Resolver endpoint** — Lets the VPC Resolver forward selected queries to on-premises DNS servers; use forwarding rules to select domains and destinations.

#### Domains and security
- **Domain registration** — A registrar registers the domain name, typically for an annual fee; the DNS service hosts and answers its records. They can be separate providers; when Route 53 hosts a third-party-registered domain, update the registrar's NS records to Route 53 name servers.
- **DNSSEC** — DNSSEC signing of a public hosted zone lets validating resolvers verify DNS response authenticity and integrity; configure the DS record with the domain registrar to establish the chain of trust.
- **Compared with load balancing** — Route 53 returns DNS answers, not application traffic; use a load balancer to distribute connections after name resolution.
- **See also:** Amazon CloudFront, AWS Global Accelerator, Amazon VPC, AWS Site-to-Site VPN

### Amazon CloudFront


Amazon CloudFront is a global content delivery network that caches and serves HTTP(S) content from edge locations, reducing viewer latency and origin load. Use it for static assets, dynamic web delivery, and protected content; it is not a general-purpose TCP/UDP accelerator.

#### What it is
- **Global edge network** — CloudFront caches content at hundreds of global Points of Presence to improve read performance and viewer experience while reducing origin load.
- **DDoS protection** — CloudFront integrates with AWS Shield and AWS WAF.

#### Origins and access
- **Origin choices** — Origins include S3 buckets, S3 static website endpoints, public HTTP servers, public load balancers, and supported private VPC origins.
- **Private VPC origins** — CloudFront VPC origins can deliver to private ALBs, NLBs, or EC2 instances in VPC subnets without exposing those origins to the public internet.
- **Custom origins** — A custom origin is any reachable HTTP(S) backend, including an on-premises server or public ALB; CloudFront can sit in front of dynamic applications as well as static files.
- **S3 origin access** — Use Origin Access Control (OAC) with a bucket policy to make an S3 bucket private and allow requests only from the CloudFront distribution; OAC also supports modern S3 features such as SSE-KMS.
- **Origin Access Identity** — OAI is the legacy S3-origin access mechanism; prefer OAC for new distributions, while recognizing that existing OAI distributions may still be in use.
- **S3 website origins** — An S3 static website endpoint must have static website hosting enabled and is treated as a custom origin; it does not use OAC like an S3 REST origin.
- **Uploads** — CloudFront can forward uploads to an S3 origin as well as serve downloads.
- **Origin groups** — Configure a primary and secondary origin for origin failover; CloudFront can switch to the secondary when configured response status codes from the primary trigger failover. Origin-group failover supports GET, HEAD, and OPTIONS requests.

#### Caching and delivery
- **Edge caching** — CloudFront caches content at global edge locations for a TTL; the default TTL is **one day** when the origin provides no cache-control directive, and caching serves repeat requests near viewers and reduces origin requests.
- **CloudFront vs. S3 Cross-Region Replication** — CloudFront caches content at global edges and suits static content served worldwide; S3 Cross-Region Replication must be configured per destination Region, replicates updates near real time, is read-only at the replica, and suits dynamic content in a few Regions.
- **Cache policy** — Configure minimum, default, and maximum TTL plus which query strings, headers, and cookies form the cache key; origin cache-control headers influence freshness within those bounds.
- **Invalidations** — If content changes before its TTL expires, invalidate all objects or selected paths such as \`/images/*\`; versioned object names are another way to publish changed content.
- **Price classes** — Choose **Price Class All** for all edge locations or **Price Class 100** for the least expensive locations; **Price Class 200** adds more geographic regions at higher cost.
- **Geo restriction** — Allowlist or blocklist countries for a distribution using a third-party Geo-IP database; use it for country-based content restrictions.
- **Signed URLs and cookies** — Use a signed URL for access to an individual restricted object or a signed cookie to authorize multiple restricted objects; CloudFront validates the signature before serving content.
- **CloudFront vs. S3 pre-signed URLs** — An S3 pre-signed URL grants temporary access directly to an S3 object; CloudFront signed URLs/cookies authorize delivery through the distribution and its cache.
- **Origin failover vs. DNS failover** — Origin groups fail over inside a distribution for configured requests and status codes; Route 53 failover returns a different DNS answer and depends on DNS caching.

#### Security and edge processing
- **HTTPS and SNI** — CloudFront supports HTTPS between viewers and the distribution and can use Server Name Indication to serve the correct certificate for multiple hostnames; custom CloudFront ACM certificates must be in **us-east-1**.
- **AWS WAF and Shield** — Associate AWS WAF with a distribution to filter HTTP(S) requests at the edge; CloudFront also integrates with AWS Shield for DDoS protection.
- **Field-level encryption** — Encrypt selected sensitive fields in an HTTP POST body at the edge using a public key so that only the intended application component can decrypt them.
- **CloudFront Functions** — Lightweight JavaScript runs at viewer request or viewer response for high-scale, latency-sensitive changes such as redirects, header edits, authorization, or cache-key normalization; it starts in under **1 ms** and scales to millions of requests per second.
- **Lambda@Edge** — Node.js or Python functions run at viewer-request, origin-request, origin-response, or viewer-response events; author functions in **us-east-1** and CloudFront replicates them to edge locations.
- **Functions vs. Lambda@Edge** — CloudFront Functions are the low-latency option without network, filesystem, or request-body access; Lambda@Edge supports longer work, network/filesystem access, and request-body access, but scales to thousands rather than millions of requests per second.
- **Real-time logs** — CloudFront real-time logs stream selected distribution request records to Kinesis Data Streams for near-real-time monitoring and analysis; choose fields and sampling rate.
- **Delivery cost example** — Example US rates show S3-to-CloudFront transfer at **$0/GB**, CloudFront-to-internet delivery at **$0.085/GB**, and direct S3-to-internet delivery at **$0.09/GB**; caching can also reduce S3 request charges. S3 Transfer Acceleration is shown improving transfer times by **50–500%** for an extra **$0.04–$0.08/GB**, and S3 Cross-Region Replication at **$0.02/GB**; actual charges vary by Region and current pricing.
- **See also:** Amazon Route 53, AWS Global Accelerator, AWS WAF

### AWS Global Accelerator


AWS Global Accelerator provides static anycast IP addresses and routes user traffic from nearby AWS edge locations over the AWS global network to healthy regional endpoints. Use it for global TCP or UDP applications, stable IP allowlists, and fast regional failover rather than edge caching.

#### What it is
- **Anycast addresses** — A standard accelerator provides two static anycast IPv4 addresses; clients reach a nearby edge location using the same fixed addresses around the world.
- **AWS backbone** — Traffic enters at an edge and travels over the AWS global network to the selected regional endpoint, avoiding variable public-internet paths for much of the journey.
- **Supported endpoints** — Endpoint types include Elastic IP addresses, EC2 instances, and Application or Network Load Balancers, including supported public or private endpoint configurations.

#### Traffic steering
- **Endpoint groups** — Create endpoint groups per AWS Region and add regional endpoints; health checks guide the selection of healthy endpoints.
- **Traffic shifting** — Set a traffic dial per endpoint group to shift traffic between Regions, and endpoint weights to divide traffic among endpoints in a group.
- **Client affinity** — Configure source-IP client affinity when repeated connections from the same client should be directed to the same endpoint; without affinity, endpoint selection can vary.
- **Protocols and ports** — Listeners accept configured TCP or UDP port ranges and forward matching traffic to endpoints that support those protocols.

#### Availability and security
- **Health and failover** — Global Accelerator health checks remove unhealthy endpoints from service and can fail over regionally in less than a minute; fixed IPs avoid delays caused by DNS-cache changes.
- **Security** — The two fixed addresses simplify firewall allowlists, and AWS Shield provides DDoS protection.

#### Compared with CloudFront
- **CloudFront** — Caches and serves HTTP(S) content at edge locations, supporting static and dynamic web delivery.
- **Global Accelerator** — Proxies TCP or UDP traffic through the edge to regional applications without caching content; choose it for non-HTTP protocols, static IP requirements, or deterministic fast regional failover.
- **See also:** Amazon CloudFront, Amazon Route 53, AWS Site-to-Site VPN

### AWS Network Firewall


AWS Network Firewall is a managed Layer 3–7 firewall for inspecting and filtering traffic entering, leaving, or moving through a VPC. Use it for centrally governed network inspection across VPC, internet, Direct Connect, and Site-to-Site VPN paths.

#### What it is
- **Traffic directions** — Inspect VPC ingress and egress, VPC-to-VPC traffic, and traffic to or from Direct Connect and Site-to-Site VPN.
- **Rule controls** — Apply IP address, port, protocol, domain-list, and regular-expression pattern rules; stateful domain lists can restrict outbound access to approved domains.
- **Actions** — Allow, drop, or alert on matching traffic and use active flow inspection for intrusion-prevention capabilities.
- **Scale and integration** — Supports thousands of rules and uses AWS Gateway Load Balancer internally to scale inspection.
- **Logging** — Send rule-match logs to S3, CloudWatch Logs, or Kinesis Data Firehose.
- **Central management** — AWS Firewall Manager can centrally manage Network Firewall policies across accounts and VPCs.
- **Compared with VPC controls** — Security groups and NACLs provide instance/interface or subnet filtering; Network Firewall provides centralized, deeper network inspection, while AWS WAF filters web requests at Layer 7.
- **See also:** Amazon VPC, AWS Transit Gateway, AWS Firewall Manager

### AWS Cloud Map


AWS Cloud Map is a managed service registry and service-discovery tool for cloud resources and application services. Use it to register service instances and let applications discover healthy endpoints by DNS name or API.

#### What it is
- **Service registry** — Create namespaces and services, then register resource instances with attributes that clients can query.
- **Discovery** — Applications can discover instances through DNS queries or the Cloud Map API; health status can be used to avoid unhealthy instances.
- **Integrations** — Cloud Map supports service discovery for containerized and other cloud workloads, including Amazon ECS service discovery.
- **Compared with DNS hosting** — Cloud Map provides application-oriented registration and discovery; Route 53 hosted zones provide general DNS record management.
- **See also:** Amazon Route 53, Amazon VPC, AWS App Mesh

### AWS App Mesh


AWS App Mesh is a service mesh for controlling and observing communication among microservices running on AWS. Use it when services need consistent traffic routing and telemetry across supported compute platforms.

#### What it is
- **Service mesh** — App Mesh configures Envoy proxies to control service-to-service traffic without embedding routing logic in each application.
- **Capabilities** — Define virtual services, routes, and backends for service discovery, traffic control, and observability across supported ECS, EKS, and EC2 workloads.
- **Lifecycle** — AWS App Mesh support ended on **September 30, 2026**; treat it as a legacy service and do not select it for new deployments.
- **See also:** AWS Cloud Map, Amazon VPC

### Hybrid connectivity options


Choose the connection based on required encryption, bandwidth, setup time, and whether connectivity is between one site and a VPC or many networks.

#### What it is
- **Decision factors** — Choose among public-internet VPN, dedicated Direct Connect, both together, or a Transit Gateway hub based on encryption, throughput, setup time, and number of networks.

#### Choosing a path
- **Site-to-Site VPN** — Choose IPsec VPN for encrypted connectivity that can be set up quickly over the public internet; expect internet-dependent latency and throughput.
- **Direct Connect** — Choose a dedicated private connection for consistent performance and higher throughput when a longer provisioning lead time is acceptable; add VPN over DX if encryption is required.
- **Both DX and VPN** — Use Direct Connect as the primary path and VPN as a lower-cost encrypted backup, or overlay VPN on DX to encrypt the private connection.
- **Transit Gateway** — Choose a Transit Gateway for transitive hub-and-spoke routing across many VPCs, VPNs, and Direct Connect-connected networks; use its route tables to segment reachability.
- **CloudHub** — Use VPN CloudHub when several remote sites need low-cost hub-and-spoke communication through VPN connections on one VGW.
- **PrivateLink** — Choose PrivateLink when a consumer needs private access to a specific provider service, not general network routing between VPCs.
- **See also:** AWS Site-to-Site VPN, AWS Direct Connect, AWS Transit Gateway, AWS PrivateLink

### IP addressing and ports quick reference


Use this quick reference for the address and protocol facts emphasized in the networking material; allow only the protocols and return ports required by the workload.

#### What it is
- **Address and protocol cues** — The networking material emphasizes IPv4 CIDRs, subnet-reserved addresses, ephemeral return ports, and the ports/protocols used by DNS, SSH, and database examples.

#### Addresses and ports
- **Private IPv4 CIDRs** — \`10.0.0.0/8\`, \`172.16.0.0/12\`, and \`192.168.0.0/16\` are private ranges; \`0.0.0.0/0\` means all IPv4 addresses and \`/32\` means one address. IPv6 addresses in AWS are public and internet-routable, so private IPv6 egress relies on an egress-only IGW.
- **Subnet reservations** — AWS reserves the first four and final IPv4 addresses in each subnet; none can be assigned to an instance.
- **SSH** — Bastion-host inbound SSH uses port **22**; limit the source to a trusted CIDR.
- **DNS** — DNS traditionally uses port **53**, the namesake of Route 53.
- **Database traffic** — The networking example uses **TCP 3306** for MySQL between web and database subnets.
- **Ephemeral reply ports** — Example client ranges are **49152–65535** (IANA/Windows 10) and **32768–60999** (many Linux kernels); NACL return rules must match the clients' actual ephemeral range.
- **ICMP** — Permit ICMP in the security group when on-premises systems must ping EC2 instances across a VPN.
- **TCP and UDP** — Global Accelerator supports both transport protocols; choose it for UDP workloads such as gaming, IoT, or voice as well as TCP applications.
- **See also:** Amazon VPC, AWS Site-to-Site VPN, AWS Global Accelerator

## Security, identity, and compliance

### AWS IAM


AWS Identity and Access Management (IAM) is the global service for defining identities and permissions in an AWS account. Use it to grant the least privilege required to people, workloads, and services; use roles and temporary credentials instead of long-lived keys wherever possible.

#### Identities and credentials
- **Root user** — created with each account and has unrestricted account access; do not use or share it for daily work, enable MFA, and avoid creating root access keys.
- **IAM users** — represent people or legacy workloads and can authenticate to the console with a password or make API calls with access keys; prefer federated access and roles for people and workloads.
- **IAM groups** — contain users only, never other groups; users may belong to multiple groups or none, and permissions are commonly assigned to groups.
- **IAM roles** — assumed identities with temporary credentials; use them for EC2, Lambda, CloudFormation, other AWS services, applications, and cross-account access.
- **EC2 instance profiles** — deliver an attached IAM role's temporary credentials to software on an EC2 instance; do not place access keys in instance files or application code.
- **Access keys** — consist of an access key ID and secret access key for CLI, SDK, or API use; treat the secret like a password, never share or commit keys, and rotate or remove them when no longer needed. AWS access paths include the password-and-MFA-protected console, the CLI, and language-specific SDKs embedded in applications.
- **MFA** — combines a memorized password with a device or authenticator; require it for the root user and IAM users, and use MFA conditions for sensitive actions. Options include virtual authenticators such as Google Authenticator or Authy, U2F security keys such as YubiKey, and hardware fobs.
- **Password policy** — can set minimum length, required uppercase/lowercase/numeric/non-alphanumeric characters, allow self-service password changes, enforce expiration, and prevent reuse.

#### Policies and evaluation
- **IAM policies** — JSON documents with a version, statements, effect, action, resource, and optional principal, statement ID, and conditions; use the \`2012-10-17\` policy language version.
- **Identity-based policies** attach to users, groups, or roles and grant or deny actions on resources; managed policies can be reused, while inline policies are embedded in one identity.
- **Resource-based policies** attach to resources such as S3 buckets, SNS topics, and SQS queues, name the principal, and can enable direct or cross-account access; cross-account access generally requires an allow in both the principal account and the resource policy.
- **Role versus resource policy** — assuming a role replaces the caller's permissions with the role session permissions; a resource policy can grant access without the principal giving up its own permissions.
- **Implicit deny is the default**; an applicable Allow is required, and an applicable **explicit Deny always wins** over an Allow.
- **Policy evaluation** — access is implicitly denied unless an applicable policy allows it, and an applicable explicit Deny overrides every Allow. Identity-based allows can be limited by permissions boundaries, session policies, and Organizations SCPs; resource-based policy evaluation depends on the named principal, and cross-account access requires authorization on both sides. A boundary or SCP never grants permissions.
- **Permissions boundaries** are managed policies that set the maximum permissions a user or role can receive; they apply to users and roles, not groups, and are useful for delegated administration and preventing privilege escalation.
- **Conditions** constrain when policies apply; \`aws:SourceIp\` limits source addresses, \`aws:RequestedRegion\` limits API Regions, \`aws:PrincipalOrgID\` restricts resource-policy access to organization principals, \`aws:MultiFactorAuthPresent\` can require MFA, and resource-tag keys can support tag-based access.
- **Least privilege** — grant only necessary actions on the narrowest applicable resources, and regularly remove permissions that are not used.

#### Auditing and best practices
- **IAM credentials report** — account-level report showing users and the status of their credentials; use it to identify unused or weakly protected credentials.
- **IAM Access Advisor** — user-level view of granted service permissions and last-accessed information; use it to right-size policies.
- **IAM Access Analyzer** — identifies resources shared with external principals and can validate policies; use its findings to review unintended access.
- **One person, one identity** — create an individual identity, assign it to groups, and grant group permissions rather than sharing user accounts.
- **Workload access** — grant AWS services roles, and use temporary credentials from those roles rather than long-lived access keys.
- **Root account protection** — reserve root for account-level tasks that require it, enable MFA, secure its credentials, and do not create root access keys.
- **See also:** AWS STS, AWS IAM Identity Center, AWS Organizations, Amazon Cognito

### AWS STS


AWS Security Token Service (STS) issues short-lived credentials for a trusted user, workload, or federated identity to access AWS. Choose it for temporary access, role assumption, and identity federation rather than distributing permanent access keys.

#### Temporary credentials and roles
- **Temporary credentials** — an access key ID, secret access key, and session token expire after a bounded session and are authorized by the assumed role's permissions and trust policy.
- **AssumeRole** — exchanges the caller's valid credentials for a role session; the role trust policy controls who may assume it, and the role's permissions policy controls what the session can do.
- **Cross-account access** — configure the target role's trust policy to trust the source principal, then allow that principal to call \`sts:AssumeRole\`; both sides must be configured.
- **Role chaining** — assuming a second role from an existing role session is limited to a maximum one-hour session.
- **Session duration** — role sessions default to one hour; a role can set a maximum from one to twelve hours, subject to the requesting API and role-chaining limit.

#### Federation
- **AssumeRoleWithWebIdentity** — exchanges an OIDC-compatible web identity token for temporary role credentials; common identity providers include Amazon Cognito and supported external providers.
- **AssumeRoleWithSAML** — exchanges a SAML assertion from a trusted identity provider for temporary role credentials, including console federation.
- **External ID** — a unique value a third-party SaaS provider supplies when assuming a customer role; the customer puts it in the trust-policy condition to mitigate the confused-deputy problem, and it is not a password or substitute for least privilege.
- **Regional STS endpoints** — use the endpoint in the workload's Region where possible to reduce latency and improve endpoint resiliency.
- **See also:** AWS IAM, AWS IAM Identity Center, Amazon Cognito

### AWS IAM Identity Center


AWS IAM Identity Center (formerly AWS Single Sign-On) provides centralized single sign-on for workforce users across AWS accounts and supported business applications. Use it to manage workforce identities and account access without creating a separate IAM user in every account.

#### Access and assignments
- **AWS accounts** — connect Identity Center to AWS Organizations and assign users or groups to accounts through permission sets.
- **Permission sets** — collections of IAM policies that define the access provisioned to a user or group in each assigned account.
- **Applications** — provide SSO to SAML 2.0 business and custom applications by configuring their URLs, certificates, and metadata.
- **Identity sources** — use the built-in Identity Center directory or connect supported external identity providers such as Active Directory, OneLogin, or Okta.
- **Active Directory** — connect to AWS Managed Microsoft AD directly; a self-managed directory can use a two-way trust through Managed Microsoft AD or an AD Connector.
- **ABAC** — use user attributes such as cost center, title, or locale from the Identity Center identity store to define access and update access by changing attributes.
- **Additional sign-in targets** — Identity Center can provide access to EC2 Windows instances as well as AWS accounts and supported applications.
- **See also:** AWS IAM, AWS STS, AWS Organizations, AWS Directory Service

### AWS Organizations


AWS Organizations centrally manages multiple AWS accounts under one organization, with accounts grouped into organizational units (OUs). Use it for account governance, consolidated billing, and organization-wide permission guardrails.

#### Accounts, billing, and governance
- **Management account** — owns the organization; other accounts are member accounts, and a member account can belong to only one organization.
- **OUs** — group accounts hierarchically by business unit, environment, or project so policies can be applied at different levels.
- **Consolidated billing** — combines charges into one payer and can aggregate usage for volume pricing; eligible Reserved Instance and Savings Plans discounts can be shared across accounts.
- **Account automation** — Organizations APIs can create accounts programmatically; separate accounts can isolate workloads and support central logging and cross-account administration.
- **Service control policies (SCPs)** — set the maximum permissions available to users and roles in member accounts; SCPs do not grant permissions, do not apply to the management account, and do not restrict service-linked roles.
- **SCP evaluation** — an action needs an explicit allow through the root and every OU on its path as well as an IAM/resource-policy allow; an explicit SCP deny blocks it. Use allow-list or block-list designs carefully.
- **Tag policies** — standardize tag keys and allowed values, audit noncompliant tagged resources, and support cost allocation and ABAC; they can prevent noncompliant tag operations for specified services but do not affect untagged resources.
- **Tag monitoring** — tag-policy reports identify tagged and noncompliant resources; EventBridge can monitor noncompliant tags.
- **Central operations** — common patterns include organization-wide CloudTrail with logs delivered to a central S3 account, central CloudWatch Logs, and cross-account administrator roles.
- **Resource sharing** — AWS RAM can share supported resources with accounts or OUs in an organization; RAM is a separate service.
- **See also:** AWS IAM, AWS IAM Identity Center, AWS Resource Access Manager

### Amazon Cognito


Amazon Cognito provides sign-in and identity federation for web and mobile application users. Use user pools to authenticate application users and identity pools when those users need temporary AWS credentials to access AWS resources.

#### User pools
- **User pool** — serverless user directory and sign-in service for an application; supports username or email and password, password reset, and email or phone verification.
- **MFA and adaptive authentication** — user pools support MFA; advanced security features can assess sign-in risk and apply adaptive responses.
- **Federation and hosted UI** — federate users from social providers, SAML, or other supported identity providers; the hosted UI/managed login provides a ready-made sign-in experience.
- **Application integration** — user pools integrate with Amazon API Gateway and Application Load Balancers, which can authenticate a request with a Cognito token before forwarding it to a backend.

#### Identity pools and authorization
- **Identity pool** — exchanges a user-pool or supported third-party identity token for temporary AWS credentials tied to IAM roles.
- **Direct resource access** — credentials can let an application user access AWS services directly or through an API, rather than routing every data operation through a custom backend.
- **Fine-grained permissions** — identity-pool IAM policies can be customized using the identity ID, for example to limit each user to their own S3 prefix or DynamoDB partition-key rows.
- **Guest and authenticated access** — identity pools can assign distinct default IAM roles to unauthenticated guest users and authenticated users.
- **Cognito versus IAM** — use Cognito for large populations of application, mobile, or federated users; IAM primarily manages workforce and workload access to AWS.
- **See also:** AWS IAM, AWS STS, AWS IAM Identity Center, Amazon DynamoDB, Amazon API Gateway

### AWS Directory Service


AWS Directory Service offers managed directory options for Microsoft Active Directory-compatible workloads and connections to existing directories. Choose the option based on whether AWS or the on-premises directory should manage users and whether domain trust is required.

#### Directory options
- **AWS Managed Microsoft AD** — runs a Microsoft AD directory in AWS; users can be managed locally, MFA is supported, and trust relationships can connect it to on-premises AD.
- **AD Connector** — a directory gateway/proxy that redirects authentication to an existing on-premises AD; user accounts remain managed on premises, and MFA is supported.
- **Simple AD** — an AWS-managed AD-compatible directory for simpler directory needs; it cannot be joined to on-premises AD.
- **Identity Center integration** — connect Identity Center directly to Managed Microsoft AD, establish a two-way trust for a self-managed directory, or use AD Connector.
- **Microsoft AD concepts** — directory objects include users, computers, printers, file shares, and security groups; domains are organized into trees, and a group of trees is a forest.
- **See also:** AWS IAM Identity Center, AWS IAM

### AWS Resource Access Manager


AWS Resource Access Manager (AWS RAM) shares supported AWS resources across accounts, OUs, or an organization without duplicating the resources. Use it for centrally managed resources that must be consumed by workloads in other accounts.

#### Sharing
- **Cross-account sharing** — share supported resources such as Transit Gateways with other accounts; consumers use the shared resource while the owner retains centralized control.
- **Organizations integration** — share with accounts or OUs in an organization to simplify resource sharing at scale.
- **Transit Gateway example** — RAM can share a regional Transit Gateway with other accounts; the Transit Gateway remains a regional resource and can also be peered across Regions.
- **See also:** AWS Organizations, Amazon VPC

### AWS KMS


AWS Key Management Service (AWS KMS) creates and controls cryptographic keys used by AWS services and applications. Choose it for managed encryption keys, authorization and audit controls, and envelope encryption; use CloudHSM when dedicated HSM hardware and direct key control are required.

#### Key types and costs
- **AWS-owned keys** — keys AWS owns and operates for integrated services, such as SSE-S3, SSE-SQS, and the default DynamoDB key; they have no key fee.
- **AWS-managed keys** — keys created and managed by AWS for a service in a customer's account, commonly named \`aws/service\`; the slide examples include \`aws/rds\` and \`aws/ebs\`, with no key fee.
- **Customer-managed keys** — keys customers create and control in KMS; the slide pricing is **$1 per month** for a created or imported key, plus **$0.03 per 10,000 KMS API calls**.
- **Symmetric keys** — use one AES-256 key for encryption and decryption; most AWS service integrations use symmetric KMS keys, and key material is not exposed unencrypted to the caller.
- **Asymmetric keys** — use RSA or ECC public/private key pairs for encryption/decryption or signing/verification; the public key can be downloaded, but private key operations remain in KMS.
- **External encryption** — asymmetric public keys can encrypt or verify outside AWS where the caller cannot make a KMS API request.

#### Authorization, grants, and audit
- **Key policies** — every KMS key has a key policy; it is the primary resource policy controlling who can use or administer the key.
- **Default key policy** — if no custom policy is supplied, the default policy gives the account root principal authority to delegate access to the account.
- **Custom key policies** — define key administrators and key users; for cross-account use, allow the external principal in the key policy and grant that principal IAM permission in its own account.
- **Grants** — provide delegated, often temporary or service-integrated, permissions to use a key without changing the key policy.
- **IAM and CloudTrail** — KMS integrates with IAM, and CloudTrail records KMS key usage for auditing.
- **Cross-account encrypted snapshots** — authorize the target account in the source customer-managed key policy, share the encrypted snapshot, then copy and re-encrypt it with a key in the target account.
- **Encrypted AMI sharing** — share the image and its KMS key; the target principal needs key and image permissions such as \`DescribeKey\`, \`ReEncrypt*\`, \`CreateGrant\`, and \`Decrypt\` as applicable.

#### Rotation and multi-Region keys
- **Rotation** — AWS-managed keys rotate automatically every year; customer-managed keys can be configured for automatic or on-demand rotation; imported key material requires manual rotation, commonly using an alias to move to a new key.
- **Multi-Region keys** — related primary and replica keys share key ID, key material, and rotation state across selected Regions and can encrypt in one Region and decrypt in another without re-encryption or cross-Region KMS calls.
- **Not global** — each multi-Region key is managed independently in its Region; it is a coordinated set of regional keys, not one globally available key.
- **Client-side encryption** — multi-Region keys can provide low-latency local decryption for data replicated by DynamoDB Global Tables or global databases; client-side field encryption can keep selected fields unreadable to database operators.
- **S3 replication** — SSE-S3 and unencrypted objects replicate by default; SSE-C objects can replicate, while SSE-KMS requires enabling replication, choosing a destination key, granting source decrypt and destination encrypt permissions, and adjusting key policies.
- **Throttling** — KMS API quotas are regional; high-rate operations such as encryption during replication can be throttled, so request a Service Quotas increase when needed. Multi-Region keys are treated as independent keys by S3 replication.

#### Envelope encryption and limits
- **Envelope encryption** — KMS protects a data key; the data key encrypts the payload, and the encrypted data key is stored with the ciphertext. The service or application need not send large payloads through KMS.
- **4 KB limit** — direct KMS \`Encrypt\` operations support plaintext up to 4 KB; use \`GenerateDataKey\` and envelope encryption for larger data.
- **Integrated services** — KMS is used by services including EBS, S3, RDS, and Systems Manager; a KMS key can also be used through SDK or CLI API calls.
- **Secret handling** — do not store plaintext secrets in code; encrypt secret values before storing them or use a secrets service designed for lifecycle management.
- **External key store (XKS)** — lets KMS use key material held in an external key manager through a proxy; it is for organizations that require external custody/control, and adds dependency on the external system's availability and latency.
- **See also:** AWS CloudHSM, AWS Secrets Manager, AWS Systems Manager Parameter Store, Amazon S3, Amazon EBS

### AWS CloudHSM


AWS CloudHSM provides dedicated hardware security modules in a customer's VPC for workloads that need direct control of cryptographic keys or HSM-backed operations. Choose it when single-tenant HSM hardware or specific compliance and cryptographic requirements exceed the KMS managed-key model.

#### Hardware, control, and integration
- **Dedicated HSMs** — AWS provisions tamper-resistant hardware while the customer manages keys, HSM users, and cryptographic operations through CloudHSM client software.
- **FIPS** — the slides identify CloudHSM as FIPS 140-2 Level 3 compliant; there is no free tier.
- **Key types and uses** — supports symmetric and asymmetric cryptography, digital signing and hashing, SSL/TLS keys, and cryptographic acceleration; Redshift supports CloudHSM for database encryption and key management.
- **High availability** — deploy multiple HSMs across Availability Zones in a cluster for availability and durability.
- **KMS custom key store** — integrate CloudHSM with KMS so supported services such as EBS, S3, and RDS can use KMS APIs with key material held in the HSM cluster; CloudTrail logs key use.
- **Compared with KMS** — KMS is a multi-tenant managed service with AWS-managed key operations and IAM-based authorization; CloudHSM is single-tenant, deployed in a VPC, and customers manage HSM users and keys.
- **See also:** AWS KMS, Amazon Redshift

### AWS Secrets Manager


AWS Secrets Manager stores sensitive values such as database credentials and manages their lifecycle. Choose it for managed secret rotation and database credential integration rather than general configuration storage.

#### Secret lifecycle and integrations
- **Encryption** — secrets are encrypted with AWS KMS.
- **Rotation** — configure rotation on a schedule; Secrets Manager can generate new credentials through a Lambda rotation function.
- **Database integration** — supports rotation integrations for Amazon RDS databases including MySQL, PostgreSQL, and Aurora.
- **Multi-Region secrets** — replicate a primary secret to read replicas in other Regions, keep replicas synchronized, and promote a replica to a standalone secret for regional applications or recovery.
- **Compared with Parameter Store** — Secrets Manager is purpose-built for secrets and managed rotation and has a service charge; Systems Manager Parameter Store also stores configuration and secrets, supports optional KMS encryption and hierarchical paths, and has standard/advanced tiers and parameter policies.
- **See also:** AWS KMS, AWS Systems Manager Parameter Store, AWS Lambda, Amazon RDS

### AWS Certificate Manager (ACM)


AWS Certificate Manager provisions and manages TLS certificates for supported AWS endpoints. Choose it to enable HTTPS and automate certificates for load balancers, CloudFront, and API Gateway; ACM certificates cannot be installed directly on EC2 instances.

#### Certificates and renewal
- **Public and private certificates** — ACM supports TLS certificates for public and private use; public ACM-issued certificates are free, while private certificate authority use can incur separate charges.
- **DNS or email validation** — public certificate requests identify the fully qualified domain name or wildcard name; DNS validation is preferred for automation and uses a CNAME, while email validation uses WHOIS contact addresses.
- **Automatic renewal** — ACM automatically renews ACM-issued certificates that remain eligible and validated; the slides state renewal begins 60 days before expiration.
- **Imported certificates** — ACM does not automatically renew imported certificates; it sends daily EventBridge expiration events beginning 45 days before expiry (the interval is configurable), and AWS Config has a managed expiration-check rule.
- **Load balancers** — deploy certificates on Classic, Application, or Network Load Balancers; an ALB can terminate HTTPS and redirect HTTP requests to HTTPS.
- **CloudFront** — the certificate for a CloudFront distribution must be in \`us-east-1\`.
- **API Gateway** — for an edge-optimized endpoint, the certificate is in \`us-east-1\`; for a Regional endpoint, use a certificate in the API's Region. Configure a Route 53 CNAME or alias for the custom domain.
- **Not for EC2** — ACM does not provide a deployable certificate private key for direct installation on an EC2 instance; use a supported TLS termination service or another certificate source for EC2.
- **See also:** AWS KMS, Amazon CloudFront, Elastic Load Balancing, Amazon API Gateway, Amazon Route 53

### AWS WAF


AWS WAF is a web application firewall that inspects HTTP(S) requests and filters common application-layer attacks. Choose it for Layer 7 request filtering, rate controls, and web application protection at supported AWS entry points.

#### Web ACLs and rules
- **Web ACL** — associate a set of rules with an application endpoint; a rule group is a reusable collection of rules that can be added to a web ACL.
- **Request matching** — rules can inspect IP sets, HTTP headers, body content, URI strings, and geo-location; common protections include SQL injection and cross-site scripting.
- **IP sets** — support up to **10,000 IP addresses** per IP set; use multiple rules when more addresses must be matched.
- **Rate-based rules** — count request occurrences using a configured aggregation key and block excessive rates, including abusive traffic during application-layer floods.
- **Managed rule groups** — use AWS-managed or supported third-party rules for common vulnerabilities, IP reputation, or anonymous IP sources.
- **Scope and integrations** — web ACLs are regional except for CloudFront; WAF can protect ALB, API Gateway, CloudFront, AppSync GraphQL APIs, and Cognito user pools.
- **Load balancer limitation** — WAF does not attach to a Network Load Balancer; use an ALB for WAF inspection, or Global Accelerator with a fixed IP in front of an ALB when fixed addressing is also required.
- **See also:** AWS Shield, AWS Firewall Manager, Amazon CloudFront, Elastic Load Balancing, Amazon API Gateway

### AWS Shield


AWS Shield protects AWS applications from distributed denial-of-service attacks. Shield Standard is automatic baseline network protection; Shield Advanced adds enhanced protections, response support, and cost protection for eligible resources.

#### Protection tiers
- **Shield Standard** — free and automatically enabled for AWS customers; protects against common Layer 3 and Layer 4 attacks such as SYN floods, UDP floods, and reflection attacks.
- **Shield Advanced** — optional paid protection for resources including EC2, Elastic Load Balancing, CloudFront, Global Accelerator, and Route 53; the slides cite **$3,000 per month per organization**.
- **DDoS Response Team** — Advanced provides 24/7 access to AWS's DDoS response specialists (DRT/SRT) and advanced reporting.
- **Cost protection** — Advanced can protect against certain higher AWS usage charges caused by DDoS traffic spikes.
- **Layer 7 mitigation** — automatic application-layer mitigation can create, evaluate, and deploy AWS WAF rules to mitigate Layer 7 DDoS attacks.
- **Compared with WAF** — Shield targets DDoS resilience; WAF supplies granular web request rules. They are commonly used together, with Firewall Manager for organization-wide policy deployment.
- **See also:** AWS WAF, AWS Firewall Manager, Amazon CloudFront, Amazon Route 53

### AWS Firewall Manager


AWS Firewall Manager centrally deploys and audits security policies across accounts in an AWS Organization. Choose it to apply consistent protections to existing and newly created resources at scale.

#### Organization-wide policies
- **Security policies** — define a common set of rules at the Region level and apply them to accounts and resources across an organization.
- **WAF and Shield** — manage WAF rules for ALB, API Gateway, and CloudFront, and Shield Advanced protections for ALB, CLB, NLB, Elastic IP, and CloudFront.
- **Other controls** — manage security-group policies for EC2, ALB, and ENI resources, AWS Network Firewall policies at the VPC level, and Route 53 Resolver DNS Firewall policies.
- **Automatic coverage** — policies can apply to new resources as they are created, supporting compliance across current and future organization accounts; Firewall Manager manages firewall policies, not threat-detection services such as GuardDuty or Inspector.
- **Compared with WAF** — use WAF itself for granular web ACL rules on an application; use Firewall Manager to deploy and govern those rules across accounts and resources.
- **See also:** AWS Organizations, AWS WAF, AWS Shield

### Amazon GuardDuty


Amazon GuardDuty continuously analyzes AWS activity for threats using anomaly detection, machine learning, and third-party threat intelligence. Use it for managed threat detection without installing software for its core data sources.

#### Detection sources and response
- **Core sources** — analyzes CloudTrail management events, VPC Flow Logs, and DNS logs to detect unusual API activity, unauthorized deployments, suspicious network traffic, and compromised instances.
- **S3 activity** — CloudTrail S3 data events can identify suspicious object access such as GetObject, ListObjects, or DeleteObject when the relevant protection is enabled.
- **Optional protections** — additional data sources/features include EKS audit logs and runtime monitoring, RDS and Aurora login activity, EBS malware protection, Lambda network activity, and S3 protection.
- **Findings** — GuardDuty uses machine learning, anomaly detection, and third-party data; it includes findings for cryptocurrency-mining activity.
- **Notifications and remediation** — send findings to EventBridge rules, which can notify SNS or invoke Lambda for response workflows.
- **Multi-account** — use an administrator account and AWS Organizations integration to centrally manage GuardDuty across member accounts and Regions.
- **Enablement** — the slides describe one-click setup, no software installation for core analysis, and a 30-day trial.
- **See also:** Amazon Detective, AWS Security Hub, Amazon EventBridge

### Amazon Inspector


Amazon Inspector automatically assesses supported compute workloads for software vulnerabilities and network exposure. Choose it for continuous vulnerability management across EC2, ECR container images, and Lambda functions.

#### Assessment coverage
- **EC2 instances** — use the Systems Manager (SSM) agent to inspect software and the running operating system for known vulnerabilities and assess unintended network reachability.
- **ECR images** — assess container images as they are pushed to Amazon ECR for package vulnerabilities.
- **Lambda functions** — assess deployed function code and package dependencies for software vulnerabilities.
- **CVE findings** — scan package vulnerabilities against a CVE database and associate a risk score with findings to help prioritize remediation.
- **Continuous assessment** — scans the supported infrastructure when needed and reports findings rather than applying fixes automatically.
- **Integrations** — send assessment state and findings to EventBridge and AWS Security Hub.
- **Scope** — Inspector evaluates EC2 instances, ECR container images, and Lambda functions; it is not a general-purpose application penetration-testing service.
- **See also:** AWS Systems Manager, Amazon ECR, AWS Security Hub, Amazon EventBridge

### Amazon Macie


Amazon Macie is a managed data security and privacy service that discovers sensitive data in Amazon S3 using machine learning and pattern matching. Use it to identify and alert on data such as personally identifiable information (PII) in S3 buckets.

#### S3 discovery
- **Sensitive data discovery** — analyze S3 objects to identify PII and other sensitive data types, then produce findings for review.
- **Notifications** — send Macie findings to EventBridge for alerting and integrations.
- **See also:** Amazon S3, Amazon EventBridge, AWS Security Hub

### Amazon Detective


Amazon Detective investigates security findings by collecting and correlating security-related data into linked visualizations. Use it to explore the context and likely root cause of GuardDuty findings; it helps investigate but does not prevent attacks.

#### Investigation
- **Finding analysis** — examine entities and activity relationships over time to understand suspicious behavior and scope an incident.
- **Service relationship** — use Detective with GuardDuty and other security findings; it complements detection and response rather than replacing them.
- **See also:** Amazon GuardDuty, AWS Security Hub

### AWS Security Hub


AWS Security Hub provides a centralized view of security posture and findings across AWS accounts and Regions. Use it to aggregate and prioritize findings from services such as GuardDuty, Inspector, and Macie and to check security controls against standards.

#### Findings and posture
- **Finding aggregation** — centralize supported security findings and manage them across member accounts.
- **Standards and controls** — evaluate security posture against supported security standards and controls; use findings to prioritize remediation, not as a substitute for fixing the underlying resource.
- **Integrations** — receives findings from services including GuardDuty and Inspector and can route findings to EventBridge or response workflows.
- **See also:** Amazon GuardDuty, Amazon Inspector, Amazon Macie, Amazon Detective

### AWS Audit Manager


AWS Audit Manager helps continuously collect and organize evidence relevant to AWS usage and selected compliance frameworks. Use it to prepare audit evidence and reports; it does not certify that an environment is compliant.

#### Evidence
- **Automated evidence collection** — gather evidence from supported AWS services and map it to controls in an assessment.
- **Audit preparation** — organize evidence and generate reports for auditors; customers remain responsible for interpreting requirements and correcting noncompliance.
- **See also:** AWS Artifact, AWS Config

### AWS Artifact


AWS Artifact is the self-service portal for AWS compliance documentation and agreements. Use it to download AWS audit reports or review and accept eligible agreements; it does not assess or remediate a customer's resources.

#### Reports and agreements
- **Artifact Reports** — retrieve AWS compliance reports and certifications, such as third-party audit documentation.
- **Artifact Agreements** — review, accept, and manage eligible AWS agreements for an account or organization.
- **See also:** AWS Audit Manager

### AWS Verified Access


AWS Verified Access provides application access without requiring a traditional VPN connection. It evaluates each access request using identity and device security context against configured policies.

#### Zero-trust access
- **Per-request evaluation** — grant access based on user identity and device posture rather than trusting network location alone.
- **Identity providers** — use supported identity and device trust providers and centrally managed access policies for private applications.
- **See also:** AWS IAM Identity Center, AWS Directory Service

### Encryption at rest and in transit


AWS encryption can be applied in transit, at rest on a service, or client-side before data reaches a service. Choose the termination point and key owner based on who must be able to read the plaintext and how much key control is required.

#### Encryption patterns
- **TLS in transit** — TLS/SSL encrypts data before sending and decrypts it at the receiving endpoint, protecting traffic against interception; certificates enable HTTPS.
- **TLS termination** — ACM certificates commonly terminate HTTPS at an ALB/NLB/CLB, CloudFront distribution, or API Gateway endpoint; traffic from that endpoint to a backend is a separate hop and may use HTTP or HTTPS.
- **SSE-S3** — Amazon S3 encrypts objects at rest with S3-managed AES-256 keys; it is enabled by default for new objects and the slides classify it as using AWS-owned keys. It does not provide the customer-managed KMS key-use audit trail of SSE-KMS.
- **SSE-KMS** — S3 uses KMS keys for encryption and key-use authorization/auditing; replication requires destination-key configuration and KMS permissions. S3 Bucket Keys can reduce KMS requests and associated costs by up to 99 percent.
- **SSE-C** — S3 uses a customer-provided key for server-side encryption; the customer supplies and manages the key, and S3 does not store it.
- **DSSE-KMS** — applies two independent server-side encryption layers, one using KMS and one using an S3-managed key; it has higher cost and latency than SSE-KMS and does not support S3 Bucket Keys.
- **Other service encryption** — EBS, RDS, DynamoDB, and other integrated services can use KMS for encryption at rest; select the key when the service requires it at resource creation.
- **Client-side encryption** — encrypt data on the client and keep the server from decrypting it; the receiving client decrypts it.
- **Envelope encryption** — encrypt data with a data key and protect the data key with KMS or another key-encryption key; store the encrypted data key alongside ciphertext.
- **Key choice** — AWS-owned keys offer low operational overhead, customer-managed KMS keys add control over policy and rotation, and CloudHSM or XKS supports stricter external or dedicated key custody needs.
- **See also:** AWS KMS, AWS CloudHSM, AWS Secrets Manager, AWS Certificate Manager (ACM)

### DDoS protection patterns


Build layered DDoS resilience by absorbing traffic at the edge, filtering malicious HTTP requests, distributing legitimate load, and scaling backend capacity. No single control replaces the others because network/transport and application-layer attacks require different mitigations.

#### Layered defenses
- **Layers 3 and 4** — Shield Standard automatically mitigates common network and transport attacks such as SYN floods, UDP floods, and reflection attacks; Shield Advanced adds enhanced protection for supported resources.
- **CloudFront and Route 53** — deliver and resolve traffic at AWS edge locations, absorb common attacks, and reduce direct exposure of application origins; CloudFront caching also protects backends by serving static content at the edge.
- **AWS WAF at Layer 7** — attach web ACLs to CloudFront or an ALB to inspect and filter HTTP requests; managed rules, geo/IP matches, and rate-based rules block common exploits and excessive request rates.
- **Shield Advanced and WAF** — Advanced automatic application-layer mitigation can create and deploy WAF rules; WAF rate rules can block IPs generating abusive traffic.
- **ELB and Auto Scaling** — Elastic Load Balancing distributes traffic across many EC2 instances and scales with demand; Auto Scaling adds EC2 capacity during sudden traffic increases, including flash crowds or attacks.
- **Global Accelerator** — provides edge ingress and integrates with Shield; it can help when a backend cannot use CloudFront and can provide fixed IPs in front of an ALB protected by WAF.
- **Reduce attack surface** — place CloudFront, API Gateway, or ELB in front of private backends, restrict traffic with security groups and network ACLs, and apply API Gateway burst limits and request filtering.
- **See also:** AWS Shield, AWS WAF, Amazon CloudFront, Amazon Route 53, Elastic Load Balancing, Amazon EC2 Auto Scaling

### Shared responsibility model


AWS and the customer share responsibility for security: AWS secures the infrastructure that runs AWS services, while customers secure their data, identities, configurations, and workloads. The division shifts toward AWS for managed services, but customers always retain responsibility for appropriate data access and configuration.

#### Responsibility boundaries
- **Security of the cloud** — AWS is responsible for physical facilities, hardware, networking, and the virtualization layer that operates AWS infrastructure.
- **Security in the cloud** — customers control data, IAM users and policies, encryption choices, network rules, and service configurations.
- **EC2 workloads** — customers manage the guest operating system, patches, applications, and security groups; AWS manages the underlying physical host and virtualization.
- **Managed services** — AWS operates more of the platform for services such as S3, RDS, and Lambda, but customers still configure access, protect data, and select appropriate settings.
- **See also:** AWS IAM, AWS KMS, AWS Organizations

## Integration and messaging

### Amazon SQS


Amazon Simple Queue Service is a managed message queue that buffers work between producers and consumers. Choose it for durable asynchronous processing, traffic smoothing, retries, and independent scaling of application tiers.

#### What it is
- **Pull-based queue** — producers send messages; consumers poll, process, and delete them, so messages remain until deleted or their retention expires.
- SQS decouples application tiers and buffers bursts or downstream outages; producers and consumers can scale independently without provisioning queue throughput.
- A consumer can receive up to **10 messages per call**; Lambda can poll through an event source mapping and invoke a function with message batches.
- **Standard queues** provide virtually unlimited throughput and at-least-once delivery; duplicates and best-effort ordering are possible.
- **FIFO queues** preserve order within each **MessageGroupId** and support deduplication for exactly-once processing semantics; separate groups can be processed concurrently.
- FIFO queue names must end in **\`.fifo\`**; a standard queue cannot be converted to FIFO in place.

#### Limits and numbers
- Message retention is **4 days by default**, configurable from **1 minute to 14 days**; a DLQ should use the same queue type as its source.
- The visibility timeout defaults to **30 seconds** and can be extended with \`ChangeMessageVisibility\`; the maximum is **12 hours**.
- A received message is hidden from other consumers until the visibility timeout ends; delete it after successful processing or it can be delivered again.
- Long polling waits up to **20 seconds** for a message, reducing empty receives, API calls, and cost; it can be enabled per queue or per \`ReceiveMessage\` call.
- Delay queues defer first delivery for up to **15 minutes**; unlike visibility timeout, the delay starts when the message is sent.
- The historic SQS message-size limit is **256 KB**; current queues can be configured to accept messages up to **1 MiB**. Use the SQS Extended Client Library with S3 payload offloading for larger bodies.
- FIFO throughput is **300 messages/second without batching** or **3,000 messages/second with batching** in the standard throughput model; higher-throughput FIFO mode has separate quotas.
- A batch API request can carry up to **10 messages**; batching reduces request overhead but does not remove the queue's throughput quota.
- FIFO deduplication uses a **5-minute deduplication interval** and either an explicit deduplication ID or optional content-based deduplication.
- **Batch send and delete** operations accept up to 10 entries per request; each message is still handled and acknowledged individually.
- Message bodies are text payloads; use message attributes for small metadata and keep large binary objects in S3.

#### Reliability and scaling
- A redrive policy moves messages that exceed the configured receive-count threshold to a **dead-letter queue (DLQ)** for diagnosis or later redrive; set the threshold to allow transient failures to retry first.
- At-least-once delivery means handlers should be **idempotent**, especially when processing takes longer than the visibility timeout or a consumer fails before deletion.
- Use CloudWatch's \`ApproximateNumberOfMessages\` or backlog per in-service instance to alarm on queue growth and scale an **EC2 Auto Scaling group** of consumers.
- Target tracking can scale consumers from **backlog per instance** (visible queue messages divided by running workers), with the target chosen from worker capacity and acceptable queuing delay.
- Separate queues by work priority or processing stage so workers can prioritize important jobs and each tier can absorb backlogs independently.

#### Security and integrations
- SQS encrypts messages in transit over HTTPS; server-side encryption uses **AWS KMS**, and applications can encrypt message contents client-side.
- **IAM policies** govern API actions; queue resource policies enable cross-account access and allow services such as SNS or S3 to send messages.
- **SNS-to-SQS fan-out** sends one published event to multiple durable queues, where subscribers can retry or process independently; allow the SNS topic in each queue's access policy.
- SQS works with Lambda, EC2 and container consumers, EventBridge targets, S3 notifications, and database-ingestion patterns such as SQS -> Lambda -> DynamoDB.

#### Compared with
- Choose SQS over SNS when consumers need to poll, messages must wait durably for later processing, or work should be retried and independently paced.
- Choose SNS when one publisher must push the same event to many subscribers; subscribe SQS queues to SNS when you need both fan-out and durable per-subscriber buffering.
- Choose Kinesis Data Streams for ordered shard-based streaming, replay, and multiple stream consumers rather than an ordinary work queue.
- **See also:** Amazon SNS, Amazon EventBridge, AWS Step Functions

### Amazon SNS


Amazon Simple Notification Service is a managed publish/subscribe service that pushes messages from a topic to many subscribers. Choose it for event fan-out, notifications, and mobile or application messaging.

#### What it is
- A publisher sends a message to an **SNS topic**; each subscription receives the message unless its filter policy excludes it.
- Subscription endpoints include **SQS, Lambda, HTTP/S, email, SMS, Kinesis Data Firehose, and mobile push** endpoints.
- Standard topics provide high-scale fan-out without provisioning throughput; service quotas include **100,000 topics** and **12.5 million subscriptions per topic**, subject to account quota settings.
- AWS services including CloudWatch alarms, S3, Auto Scaling, CloudFormation, budgets, and database events can publish notifications to SNS.
- **Topic publishing** uses the SDK or service integration; mobile applications can use a platform application and platform endpoint for direct push publishing.

#### Filtering and delivery
- A subscription filter policy is a **JSON policy** that selects messages using message attributes or supported message-body fields; a subscription without a filter receives all messages.
- SNS pushes messages to endpoints rather than providing a consumer-polled work queue; use SQS subscriptions when messages need durable buffering and independent retries.
- Configure a **dead-letter queue** for supported subscriptions to retain messages SNS could not deliver after its delivery retries.
- SNS supports delivery to SQS queues in other Regions; queue resource policies must authorize the topic.

#### FIFO topics and fan-out
- **FIFO topics** preserve order within a **MessageGroupId** and deduplicate using a deduplication ID or content-based deduplication.
- FIFO topics can subscribe SQS standard or FIFO queues; use SQS FIFO subscribers when the downstream consumer must preserve FIFO ordering.
- SNS FIFO has throughput limits in the same **300 messages/second without batching and 3,000 with batching** model as SQS FIFO.
- **SNS + SQS fan-out** publishes once to a topic and distributes a durable copy to each subscribed queue, allowing independent processing, retries, delayed work, and new subscribers without changing the publisher.

#### Security and use cases
- SNS supports HTTPS in transit, KMS server-side encryption, optional client-side encryption, IAM permissions, and topic resource policies for cross-account access or service publishers.
- Mobile push integrations include **Apple APNs, Google Firebase Cloud Messaging (formerly GCM), and Amazon Device Messaging**.
- Use SNS for email or SMS notification delivery; use **SES** for managed email sending and **Amazon Pinpoint** when campaigns, audience segmentation, templates, and coordinated delivery schedules are required.
- **See also:** Amazon SQS, Amazon EventBridge, Amazon SES

### Amazon EventBridge


Amazon EventBridge routes structured events between AWS services, applications, and supported SaaS partners using rules on event buses. Choose it for event-driven integrations, event-pattern filtering, scheduled invocations, and event replay.

#### What it is
- An **event bus** receives JSON events and evaluates **rules** that match event patterns and route matching events to targets.
- Event buses include the **default bus** for AWS service events, **custom buses** for application events, and **partner buses** for supported SaaS-provider events.
- Rules can target services such as Lambda, SQS, SNS, Step Functions, ECS tasks, AWS Batch, Kinesis Data Streams, CodeBuild, and Systems Manager actions.
- EventBridge is the successor and extension of **CloudWatch Events**; existing CloudWatch Events rules and event patterns are supported, while EventBridge adds partner and custom buses, schema tools, and archive/replay capabilities.
- Events from AWS services, custom applications, and SaaS partners can be routed to multiple consumers without the producers making direct calls to each consumer.

#### Rules, schedules, and targets
- Event patterns filter on JSON fields such as event source, detail type, and event details; schedules can also invoke rule targets on a rate or cron expression.
- **EventBridge Scheduler** supports one-time, rate-based, and cron-based schedules with managed delivery and flexible target integrations, including ECS tasks on Fargate.
- Use a scheduled rule for a simple recurring event-bus trigger; choose Scheduler for dedicated schedule management, one-time schedules, or direct service invocations at scale.
- EventBridge can invoke workflows, run container tasks, send queue/topic messages, and automate responses to AWS API or resource-state events.

#### Archive, replay, and schemas
- An **archive** stores all events or only events matching a pattern for a configured duration or indefinitely.
- **Replay** sends archived events back through the event bus so matching rules and targets can reprocess them after a change or outage.
- The **schema registry** can infer schemas from events on a bus, version schemas, and generate application code that reflects event structure.

#### Security and comparisons
- Event-bus resource policies control which AWS accounts or Regions can call \`PutEvents\`; they support centralized cross-account event aggregation, including organization-wide designs.
- Use IAM roles and resource permissions so EventBridge can invoke its targets; a target DLQ can retain events that could not be delivered.
- Compared with CloudWatch Events, EventBridge retains the core scheduled-rule behavior but adds event buses for custom and partner sources, schema discovery, and archive/replay.
- Compared with SQS, an event bus routes events by rules but does not provide a consumer-polled durable work backlog by default; configure an archive or a queue target when persistence and retries are needed.
- **See also:** Amazon SQS, Amazon SNS, AWS Step Functions

### AWS Step Functions


AWS Step Functions orchestrates multi-step workflows as managed state machines, coordinating AWS services and application logic. Choose it when a process needs visible sequencing, branching, parallel work, retries, or long-running workflow state.

#### What it is
- A workflow is a **state machine** whose states describe tasks and control flow; the service maintains execution state rather than requiring application code to coordinate every step.
- **Standard workflows** support long-running, durable executions (up to **one year**) with execution history and exactly-once workflow execution semantics unless retries are configured.
- **Express workflows** are designed for high-volume, short-lived event processing (up to **five minutes**); asynchronous Express uses at-least-once execution and synchronous Express uses at-most-once execution semantics.
- Choose Standard for auditable, durable orchestration; choose Express for high-throughput, short-duration workflows where request-driven execution is preferred.

#### State types and error handling
- Common states include **Task**, **Choice**, **Parallel**, **Map**, **Wait**, **Pass**, **Succeed**, and **Fail** for work, branching, concurrency, iteration, delays, and termination.
- Task states can invoke Lambda, ECS/Fargate, AWS Batch, DynamoDB, SQS, SNS, API Gateway, and other services through optimized integrations or AWS SDK integrations.
- **Retry** rules handle transient errors with configurable backoff and attempt limits; **Catch** routes failures to recovery or compensation states.
- Workflows support timeouts, parallel branches, map-based processing, and human approval steps that pause for an external callback.

#### Compared with
- Step Functions makes workflow structure, state, retries, and execution history explicit; chaining Lambda functions manually spreads orchestration logic and recovery behavior across code.
- Use Lambda for a single short task, not as the only orchestrator for a complex workflow; Lambda execution is capped at **15 minutes**, while Standard workflows can run much longer.
- **Amazon SWF** is an older workflow service with activity workers and deciders that application teams implement and operate; Step Functions provides a managed visual workflow model and native service integrations.
- **See also:** Amazon EventBridge, Amazon SQS, Amazon Simple Workflow Service

### Amazon MQ


Amazon MQ is a managed message broker for applications that already depend on open messaging protocols or broker APIs. Choose it to migrate compatible ActiveMQ or RabbitMQ workloads without redesigning every client around SQS or SNS.

#### What it is
- Supports managed **Apache ActiveMQ** and **RabbitMQ** broker engines, exposing familiar queue and topic patterns.
- Supports established protocols including **AMQP, MQTT, STOMP, OpenWire, and WebSocket (WSS)**, with protocol support depending on broker engine.
- Traditional applications can connect using existing broker clients and messaging formats, avoiding a rewrite to AWS-specific queue/topic APIs.
- Amazon MQ brokers run on managed instances; deployments can use a single instance or multi-AZ high availability with a standby or clustered broker arrangement.

#### Availability and operations
- Multi-AZ deployments provide a standby/failover or broker cluster arrangement, depending on engine and deployment mode; clients should support reconnect and failover.
- Amazon MQ handles broker provisioning, patching, and managed availability, but capacity and broker sizing still matter.
- Amazon MQ is not infinitely scalable: broker throughput and operational scaling are more constrained than SQS or SNS.

#### Compared with
- Choose Amazon MQ when protocol, client, or broker compatibility is the constraint; choose SQS/SNS for cloud-native applications that benefit from elastic managed queue or topic APIs.
- Amazon MQ does not turn a legacy broker into an unlimited serverless queue; refactoring to SQS/SNS can improve scaling and simplify operations when protocol compatibility is unnecessary.
- **See also:** Amazon SQS, Amazon SNS

### Amazon API Gateway


Amazon API Gateway is a managed service for creating, publishing, securing, throttling, and monitoring APIs. Choose it as a managed HTTP or WebSocket front door for Lambda, HTTP backends, AWS services, and private services.

#### What it is
- **REST APIs** offer the broadest API management features, including request/response transformation, validation, caching, usage plans, and API keys.
- **HTTP APIs** provide lower-cost, lower-latency HTTP endpoints with common routing, JWT authorization, and Lambda or HTTP integrations, but fewer advanced REST API management features.
- **WebSocket APIs** provide persistent, stateful, full-duplex communication; routes commonly include \`$connect\`, \`$disconnect\`, and \`$default\`.
- REST API endpoint types are **edge-optimized** (CloudFront edge locations for globally distributed clients), **Regional** (clients primarily in one Region), and **private** (reachable from a VPC through an interface endpoint).
- An edge-optimized API is hosted in one Region and uses CloudFront to improve global client latency; Regional APIs can be paired with a distribution when more CloudFront control is needed.
- Private APIs use an **interface VPC endpoint** and resource policies to restrict access to selected VPCs or principals.

#### Stages, deployments, and traffic management
- A **deployment** snapshots API configuration; a **stage** names an environment such as dev, test, or prod and points to a deployment.
- API configuration changes do not affect a live stage until a deployment is created and associated with that stage.
- Stage variables and separate stages support environment-specific settings and API versioning; OpenAPI/Swagger definitions can be imported and APIs can generate client SDKs.
- **Canary deployments** send a configured share of stage traffic to a new deployment before promotion or rollback.
- API-level throttling and quotas protect backends; **usage plans** associate API keys with per-client rate limits and quotas on REST APIs.
- API keys identify clients for usage plans; they are not a substitute for authentication or authorization.
- **Versioning** can use separate API resources or stages so callers can move between compatible API versions.
- Stage settings support per-environment throttling, logging, metrics, and cache configuration.
- Monitor a canary deployment separately for errors and latency before promoting it to all stage traffic.

#### Integrations, validation, and browser support
- Integration types include **Lambda proxy/non-proxy**, HTTP endpoints, AWS service actions (such as sending an SQS message or starting a Step Functions execution), and private/VPC-linked backends.
- **Lambda proxy integration** passes the request context to the function; non-proxy integrations can use mapping templates to shape requests and responses.
- A **VPC Link** can connect supported API integrations to private load balancers and services without exposing the backend publicly.
- API Gateway can add authentication, request rate control, and caching in front of an HTTP service, including on-premises endpoints or load balancers.
- Request validators can check required parameters and request-body schemas before forwarding; mapping templates can transform requests and responses.
- Configure **CORS** response headers and preflight handling when browser clients call an API from a different origin.
- REST API response caching reduces repeated backend calls for read-heavy APIs; cache TTL is configurable and caching is not available for every API type.
- **WebSocket routes** can invoke integrations on connect, disconnect, or application-defined route keys; backend callbacks can send messages to connected clients.
- OpenAPI/Swagger import can define API resources and methods, while generated SDKs help application clients call those APIs.

#### Security, limits, and observability
- Authorizers include **IAM/SigV4**, **Cognito user-pool**, **Lambda/custom**, and HTTP API **JWT** authorizers; resource policies can restrict invocation by principal, account, VPC, or source IP.
- Custom domains use TLS certificates from **AWS Certificate Manager**; edge-optimized API certificates must be in **us-east-1**, while Regional API certificates must be in the API's Region.
- REST API integration timeout is **29 seconds by default**; longer timeouts can be requested for supported Regional or private REST APIs. Limits vary by API type and Region.
- REST and HTTP API request payloads have a **10 MB** maximum; API request rates are quota-controlled and vary by API type and Region.
- Access and execution logs can be sent to **CloudWatch Logs**; metrics and alarms expose latency, errors, throttling, and request volume.
- **See also:** AWS Step Functions, Amazon SQS, Amazon Cognito

### AWS AppSync


AWS AppSync is a managed GraphQL API service that connects application clients to data sources through a schema and resolvers. Choose it when clients need a flexible query API, real-time subscriptions, or offline-aware application synchronization.

#### What it is
- A GraphQL schema defines available types and operations; **resolvers** connect fields to sources such as DynamoDB, Lambda, OpenSearch, HTTP services, and supported relational data paths.
- One GraphQL endpoint lets a client request the fields it needs, reducing the need to build and maintain many narrowly shaped REST endpoints.
- **Subscriptions** deliver real-time updates to clients when related mutations occur; AppSync manages the connection and notification path.

#### Security and integrations
- Authorization options include API keys, IAM, Cognito user pools, OpenID Connect, and Lambda authorizers; select an option appropriate to the app's identity model.
- AppSync can be used with AWS Amplify to build web and mobile applications; AWS WAF can protect an AppSync GraphQL API.
- **See also:** Amazon API Gateway, Amazon DynamoDB

### Amazon AppFlow


Amazon AppFlow is a managed integration service for securely transferring data between SaaS applications and AWS or other destinations. Choose it to configure repeatable SaaS data flows without writing and operating custom connector code.

#### What it is
- Supported SaaS sources include **Salesforce, SAP, Zendesk, Slack, and ServiceNow**; destinations include Amazon S3, Amazon Redshift, Snowflake, and Salesforce.
- Flows can run **on a schedule, in response to events, or on demand**.
- Built-in data transformation includes filtering and validation, avoiding custom integration code for common transfer operations.

#### Security and use cases
- Data can be encrypted over the public internet or transferred privately through **AWS PrivateLink** where supported.
- Use AppFlow to move SaaS application data into S3 or Redshift for reporting and analysis, or to transfer data between supported SaaS endpoints.
- **See also:** Amazon S3, Amazon Redshift

### Amazon SES


Amazon Simple Email Service is a managed service for sending and receiving email securely at scale. Choose it for application-driven transactional, marketing, or bulk email rather than building mail-delivery infrastructure.

#### What it is
- SES supports **inbound and outbound email** and can be called through AWS APIs, the console, or SMTP.
- Use cases include transactional messages, marketing email, and bulk communications; an application can invoke SES through an IAM-authorized role.
- **DKIM** and **SPF** support domain authentication and sender reputation; IP options include shared, dedicated, and customer-owned addresses.
- Reputation dashboards and delivery statistics track delivery, bounces, feedback-loop results, and opens.
- SES focuses on email delivery; use SNS for event notifications and mobile/SMS push, or Pinpoint for targeted customer campaigns.
- **See also:** Amazon SNS, Amazon EventBridge

### Amazon Simple Workflow Service


Amazon Simple Workflow Service (Amazon SWF) is an older managed workflow service for coordinating distributed application tasks. It is most relevant when an existing system already uses SWF's worker-and-decider programming model.

#### What it is
- SWF coordinates long-running workflows by recording workflow history and distributing **activity tasks** to workers.
- Application-managed **deciders** inspect workflow history and decide which activity or decision should run next; activity workers execute the tasks.
- Workers can run on AWS infrastructure or outside AWS, but the application team owns more workflow-worker code than with Step Functions.
- SWF persists workflow execution history so deciders can make decisions after worker tasks complete or fail.

#### Compared with
- Prefer Step Functions for managed visual state machines, built-in AWS service integrations, and less custom orchestration code; retain SWF when compatibility with an established SWF workflow is required.
- **See also:** AWS Step Functions

### Decoupling and messaging patterns


Choose the communication primitive by how data is consumed, retained, and replayed. A queue, topic, stream, and event bus solve related but distinct coordination problems.

#### What it is
- Choose a **queue (SQS)** for one-work-item-to-a-consumer processing, durable buffering, back-pressure, retries, and independent worker scaling.
- Choose a **topic (SNS)** to push the same notification to many subscribers; attach queues for durable fan-out and separately controlled retry/processing.
- Choose a **stream (Kinesis Data Streams)** for ordered records, sustained event ingestion, multiple independent consumers, and replay within a retention window.
- Choose an **event bus (EventBridge)** to route structured events from AWS services, applications, and SaaS partners by rule to different targets, with optional archive/replay.
- Use **Step Functions** when the core problem is coordinating a multi-step workflow with branching, waits, retries, and explicit execution state rather than simply moving a message.
- **See also:** Amazon SQS, Amazon SNS, Amazon EventBridge, AWS Step Functions

## Analytics and streaming

### Amazon Kinesis Data Streams


A managed, durable streaming-data service that collects records from producers and makes them available to multiple consumers in real time. Choose it when records must be retained for replay or consumed independently by processing applications.

#### What it is
- **Producers** include applications, SDK clients, Kinesis Producer Library (KPL), and AWS services; consumers include Lambda, Data Firehose, Managed Service for Apache Flink, and custom applications.
- Records are stored in a stream and can be **replayed by consumers** during the retention period; a consumer's read does not delete the record.
- Multiple independent consumers can process the same source records; for example, Lambda can filter or redact a copy and write it to DynamoDB while another application reads the original stream.
- Standard consumers pull records; **enhanced fan-out** pushes records to each registered consumer over a dedicated connection.
- Typical inputs include clickstreams, IoT events, metrics, and logs; common uses include real-time analytics, event processing, and ETL.
- DynamoDB can publish item changes to Kinesis Data Streams for up to **365 days** of retention and many consumers, including Lambda, Firehose, Flink, and Glue streaming ETL; this is longer-lived and more broadly consumable than DynamoDB Streams.

#### Capacity and cost
- In **provisioned mode**, choose the shard count and pay per shard-hour; a shard supports **1 MB/s or 1,000 records/s ingress** and **2 MB/s egress** shared by standard consumers.
- Provisioned streams require manual shard increases or decreases; splitting and merging shards is called **resharding**.
- In **on-demand mode**, capacity is managed automatically and charges are based on stream-hours and data in/out; the slide baseline is **4 MB/s or 4,000 records/s**.
- On-demand mode scales based on the observed throughput peak over the **previous 30 days**, making it useful when traffic is unpredictable or spiky.
- **Enhanced fan-out** provides each consumer up to **2 MB/s per shard** independently of other consumers.

#### Ordering and limits
- Records are ordered within a shard; records with the same **partition key** are routed to the same shard and retain their relative order.
- A poorly distributed partition key can concentrate traffic on one shard, creating a **hot shard** while other shards are underused.
- A record is limited to **1 MB by default**; the maximum can be configured up to **10 MB**, subject to the associated throughput requirements.
- Retention defaults to **24 hours** and can be extended to **365 days**; expired records are removed automatically.
- Data cannot be deleted from the stream before its retention period expires; consumers can reread it while it remains available.

#### Security
- Data is encrypted **in transit with HTTPS/TLS** and **at rest with AWS KMS** encryption.
- **KPL** batches and aggregates producer records to reduce per-request overhead and use shard throughput efficiently; **KCL** coordinates consumer applications and their shard processing.

#### Compared with
- Choose Data Firehose for fully managed delivery to supported destinations without managing consumer code; it does not provide retained records or replay.
- Choose Amazon MSK when applications need the Apache Kafka API and its ecosystem; Kinesis uses shards, while Kafka uses topics and partitions.
- **See also:** Amazon Data Firehose, Amazon Managed Service for Apache Flink, Amazon MSK, AWS Glue

### Amazon Data Firehose


A fully managed, automatically scaling delivery service that loads streaming records into analytics destinations with configurable buffering. Choose it for near-real-time delivery without operating stream consumers or managing delivery infrastructure.

#### What it is
- Formerly named **Kinesis Data Firehose**; it is serverless, scales automatically, and charges for data delivered.
- Sources include applications, SDKs, Kinesis Data Streams, CloudWatch Logs and metrics, VPC Flow Logs, AWS Network Firewall logs, EventBridge, and AWS IoT; supported record size is up to **1 MB** in the source material.
- **Near-real-time delivery** is controlled by configurable buffering based on data size and time; a common pipeline flushes about every **1 minute**.
- A stream from Kinesis Data Streams can feed Firehose when both retained replayable ingestion and managed destination delivery are needed.

#### Destinations and transformation
- Supported destinations include **Amazon S3, Amazon Redshift, Amazon OpenSearch Service**, supported third-party partners such as Splunk, MongoDB, Datadog, and New Relic, and custom HTTP endpoints.
- Firehose can invoke **AWS Lambda** to transform each batch, for example converting CSV records to JSON.
- It supports CSV, JSON, ORC, Parquet, Avro, raw text, and binary data; it can convert data to **Parquet or ORC** and compress it with gzip or Snappy.
- An S3 backup bucket can retain **all records or failed records**, in addition to delivery to the primary destination.
- CloudWatch Logs subscription filters can select events for Firehose delivery, and CloudWatch metric streams can filter which metrics are delivered.

#### Compared with
- Firehose has **no stream retention and no replay capability**; use Kinesis Data Streams when consumers need to reread records or independently process a retained stream.
- Firehose cannot write directly to DynamoDB; a Lambda or another consumer must perform DynamoDB writes.
- **See also:** Amazon Kinesis Data Streams, Amazon Redshift, Amazon OpenSearch Service, AWS Glue

### Amazon Managed Service for Apache Flink


A managed runtime for Apache Flink stream-processing applications written in Java, Scala, or SQL. Choose it to perform continuous, stateful transformations and analysis on streams without operating the Flink cluster.

#### What it is
- Formerly **Kinesis Data Analytics for Apache Flink**; it runs Apache Flink applications on managed AWS compute.
- Flink applications can be written in **Java, Scala, or SQL** to transform and analyze streaming data.

#### Features
- The managed runtime provides parallel computation on provisioned compute resources and supports automatic scaling.
- Application backups use **checkpoints and snapshots**, helping recover application state.

#### Integrations
- Common inputs include Kinesis Data Streams and Amazon MSK/Kafka; applications can send processed records to other streaming or storage services.

#### Compared with
- Managed Flink is for custom stateful stream processing; Firehose focuses on buffered delivery to destinations with optional Lambda transformation.
- Managed Flink **does not read from Amazon Data Firehose**; use a supported stream source such as Kinesis Data Streams or Kafka/MSK.
- **See also:** Amazon Kinesis Data Streams, Amazon Data Firehose, Amazon MSK

### Amazon Kinesis Video Streams


A managed service for securely ingesting, storing, and processing video streams from connected devices. Choose it for live or recorded video workflows that need AWS-managed streaming and playback or analysis integrations.

#### What it is
- Devices and applications can send live video to Kinesis Video Streams for storage and retrieval by consumer applications.
- It supports real-time video-processing and machine-learning workflows, as well as playback of stored media fragments.
- Streams are made up of time-indexed media fragments that applications can retrieve for playback or processing.
- Producers can send media from cameras and other edge devices using supported producer libraries and APIs.
- Stream retention and encryption settings can be configured to meet application requirements.
- **See also:** Amazon Kinesis Data Streams, Amazon Rekognition

### Amazon MSK


Amazon Managed Streaming for Apache Kafka (Amazon MSK) is a managed Apache Kafka service that runs Kafka clusters in an AWS VPC. Choose it when workloads need Kafka compatibility, topics, partitions, or Kafka client integrations without managing the broker fleet.

#### What it is
- AWS creates and manages the **Kafka broker nodes** and cluster coordination, including ZooKeeper nodes for ZooKeeper-based clusters; provisioned clusters can be created, updated, and deleted through the service.
- Provisioned MSK clusters run in a VPC and can span up to **three Availability Zones** for high availability; AWS automatically recovers from common Kafka failures.
- Kafka data is stored on **EBS volumes** for as long as the cluster retains it, rather than expiring after a fixed Kinesis retention window.
- **MSK Serverless** provisions resources and scales compute and storage automatically, so customers need not size broker capacity.
- Producers write records to Kafka **topics**; consumers poll topics, and Kafka replicates data across brokers.

#### Security
- Kafka client traffic can use **TLS**; clusters may also support PLAINTEXT where configured, but TLS is the encrypted transport option.
- **AWS KMS** can encrypt data at rest on EBS-backed storage.
- MSK supports Kafka authentication and authorization options including IAM, SASL/SCRAM, and TLS client authentication, with Kafka ACLs used to control topic access where applicable.

#### Compared with
- Kinesis Data Streams uses **shards** and supports shard splitting and merging; Kafka/MSK uses **topics with partitions**, to which partitions can be added.
- Kinesis records have a **1 MB default limit** that can be configured higher, for example to 10 MB; Kafka record sizes are configurable in Kafka.
- Kinesis Data Streams has built-in managed retention up to 365 days and replay; MSK retains Kafka records according to topic and storage configuration.
- Choose MSK for Kafka APIs and its ecosystem; choose Kinesis for a native AWS stream when automatic integration and shard-based operation are preferred.
- **See also:** Amazon Kinesis Data Streams, Amazon Managed Service for Apache Flink, AWS Glue

### Amazon Athena


A serverless SQL query service that reads data directly from Amazon S3. Choose it for ad hoc SQL analytics on data lakes, logs, and files without loading data into a database cluster.

#### What it is
- Athena uses standard SQL and is based on **Presto**; table schemas commonly come from the AWS Glue Data Catalog.
- Supported data formats include CSV, JSON, ORC, Avro, and Parquet; Athena can query VPC Flow Logs, load balancer logs, CloudTrail data, and other S3 datasets.
- **Federated queries** run SQL across S3 and relational, non-relational, object, or custom data sources, including AWS and on-premises sources.
- Federated query connectors run on **AWS Lambda**; query results are written to S3.

#### Performance and cost
- The source pricing is **$5 per TB scanned**; pricing is based on scanned data, so reducing bytes read reduces query cost.
- Use columnar **Parquet or ORC**, compression, and well-designed S3 partitions to reduce the amount scanned and improve performance.
- Compression options include bzip2, gzip, LZ4, Snappy, zlib, and Zstandard; larger files, typically **over 128 MB**, reduce file-management overhead.
- Partitioned S3 paths expose partition values as virtual columns, allowing queries to skip irrelevant partitions.
- **Workgroups** separate users and workloads, set query configuration, publish metrics, and can impose per-query or per-workgroup scan limits to govern cost.

#### Compared with
- Choose Athena for serverless SQL over data already in S3; choose Redshift for a provisioned or serverless warehouse optimized for repeated analytics, joins, and aggregations.
- Athena is not an operational database and does not store a warehouse copy of the source data; it queries files in place.
- **See also:** AWS Glue, Amazon Redshift, Amazon S3, Amazon QuickSight

### AWS Glue


A managed, serverless data integration service for discovering, cataloging, preparing, and transforming data for analytics. Choose it for managed ETL workflows and shared metadata used by services such as Athena and Redshift.

#### What it is
- AWS Glue is a managed, serverless service for discovering, cataloging, preparing, and transforming data for analytics.

#### Catalog and discovery
- **AWS Glue Data Catalog** stores dataset metadata, including databases, tables, and schemas used by Athena, Redshift Spectrum, EMR, and Glue jobs.
- **Crawlers** discover data sources such as S3, JDBC databases, and DynamoDB, infer schemas, and register or update table metadata in the Data Catalog.

#### ETL and preparation
- **Glue ETL jobs** extract, transform, and load data, including converting CSV data to columnar Parquet or ORC for efficient Athena queries.
- **Job bookmarks** track processed data so a job can avoid reprocessing previously handled input.
- **Glue DataBrew** offers a visual, no-code way to profile, clean, and normalize data using reusable recipes; profiling surfaces statistics, nulls, and data types, and recipes can be shared and audited.
- **Glue Studio** is a graphical interface to create, run, and monitor Glue ETL jobs.
- **Glue streaming ETL** uses Apache Spark Structured Streaming and supports Kinesis Data Streams, Kafka, and Amazon MSK.

#### Compared with
- Choose Glue for managed cataloging and ETL jobs; choose EMR when you need broad control over cluster-based Hadoop, Spark, or other big-data frameworks.
- Glue's catalog can provide schemas for Athena without copying data; crawlers catalog metadata, while ETL jobs perform data transformations.
- **See also:** Amazon Athena, Amazon EMR, Amazon Redshift, AWS Lake Formation

### Amazon Redshift


A massively parallel, columnar SQL data warehouse for online analytical processing (OLAP), reporting, and large-scale analytics. Choose it for repeated warehouse queries, joins, and aggregations rather than transactional OLTP workloads.

#### What it is
- Redshift is based on PostgreSQL but is designed for **OLAP, not OLTP**; it supports SQL and parallel query execution over columnar storage, scaling to petabytes.
- A provisioned cluster has a **leader node** for query planning and result aggregation and compute nodes that execute queries.
- **RA3 nodes** separate compute from managed storage, allowing compute and storage to scale more independently; frequently accessed data is cached locally.
- **Redshift Serverless** runs a warehouse without requiring a fixed provisioned cluster and adjusts capacity to workload demand.
- **Redshift ML** lets analysts create and use machine-learning models through SQL with SageMaker integration.
- Business intelligence tools including Amazon QuickSight and Tableau can connect through JDBC/ODBC.

#### Loading, querying, and distribution
- Use **COPY** to load data efficiently in bulk from S3; large batched loads are preferable to many small inserts.
- Data Firehose can deliver to Redshift, generally staging data in S3 before Redshift loads it.
- **UNLOAD** writes query results from Redshift to S3 for downstream use or sharing.
- **Redshift Spectrum** queries data stored in S3 without loading it into Redshift, but a Redshift cluster must be available to initiate the query.
- Distribution styles determine how table rows are placed across compute nodes: **AUTO** lets Redshift choose, **KEY** co-locates matching join keys, **ALL** copies a small dimension table to each node, and **EVEN** spreads rows evenly.

#### Performance and availability
- **Workload Management (WLM)** routes and prioritizes queries in queues, with configuration for memory and concurrency; query priorities and concurrency scaling help manage changing workloads.
- **Concurrency scaling** adds transient cluster capacity for eligible concurrent workloads and scales it back when demand subsides.
- Some cluster configurations support **Multi-AZ** deployment for availability across Availability Zones.
- Snapshots are incremental point-in-time backups stored in S3 and can be restored into a new cluster.
- Automated snapshots occur every **8 hours, every 5 GB of changes, or on a schedule**, with **1-35 days** retention; manual snapshots persist until deleted.
- Automated or manual snapshots can be copied to another AWS Region to support disaster recovery.

#### Pricing and comparison
- Provisioned clusters require selecting node types and capacity in advance; reserved instances can reduce cost for steady usage.
- Redshift is generally faster for recurring warehouse queries, joins, and aggregations; Athena avoids maintaining a cluster when SQL over S3 is sufficient.
- Redshift Spectrum still uses Redshift compute to query S3; it is not a standalone serverless replacement for Athena.
- **See also:** Amazon Athena, Amazon Data Firehose, Amazon QuickSight, Amazon S3

### Amazon EMR


A managed environment for running distributed big-data frameworks such as Hadoop and Spark on clusters that can scale to hundreds of EC2 instances. Choose it for flexible cluster-based data processing, machine learning, web indexing, and other large-data workloads.

#### What it is
- **EMR** means Elastic MapReduce; AWS handles cluster provisioning and configuration.
- EMR bundles frameworks including Apache Spark, HBase, Presto, and Flink, and supports automatic scaling and Spot Instances.
- **Master nodes** coordinate the cluster and track health; **core nodes** run tasks and store data; optional **task nodes** run tasks without storing cluster data.
- Master and core nodes are generally long-running; task nodes are often a fit for interruptible Spot capacity.
- **EMRFS** lets EMR applications use Amazon S3 as a storage layer alongside cluster storage.

#### Capacity and lifecycle
- **On-Demand Instances** provide predictable capacity that is not terminated by Spot reclamation.
- **Reserved Instances** with a term of at least **one year** can reduce cost; EMR uses them automatically when available.
- **Spot Instances** cost less but can be interrupted, so use them where workloads tolerate task-node loss.
- Clusters can be **long-running** for persistent services or **transient** for temporary jobs that terminate when processing completes.

#### Compared with
- Choose EMR for control of cluster resources and a broad open-source framework environment; choose Glue for serverless, managed ETL and catalog workflows.
- EMR can use the Glue Data Catalog for metadata and can query data in S3; it is not itself a data warehouse like Redshift.
- **See also:** AWS Glue, Amazon Athena, Amazon Redshift, Amazon S3

### Amazon OpenSearch Service


A managed search and analytics service for indexing events and documents so users can search across fields, including partial text matches. Choose it to add full-text search or log analytics alongside an operational database or streaming pipeline.

#### What it is
- Amazon OpenSearch Service succeeds Amazon Elasticsearch Service and offers managed clusters or a **serverless** option.
- It searches arbitrary indexed fields and partial matches, unlike a DynamoDB query that is constrained to its primary key or indexes.
- **OpenSearch Dashboards** provides visualization and exploration of indexed data; SQL is not natively the primary interface, though a plugin can enable SQL.
- Common ingestion sources include Kinesis Data Firehose, AWS IoT, and CloudWatch Logs.

#### Integrations and security
- A DynamoDB pattern uses a stream-triggered Lambda function to index records in OpenSearch while the application continues using DynamoDB for CRUD access.
- CloudWatch Logs can feed OpenSearch through a subscription filter and Lambda for real-time processing, or through Data Firehose for near-real-time delivery.
- Kinesis Data Streams or Data Firehose can supply streaming events for indexing and search analytics.
- Security integrations include **IAM and Amazon Cognito**; data can be encrypted with **KMS** at rest and protected with **TLS** in transit.

#### Compared with
- Use a database for authoritative transactional records and OpenSearch as a complementary search index; it is not a general-purpose relational database.
- Choose OpenSearch for text search and interactive log analytics, not for SQL data warehousing (Redshift) or SQL-in-place analytics over S3 (Athena).
- **See also:** Amazon DynamoDB, Amazon Kinesis Data Streams, Amazon Data Firehose, Amazon CloudWatch Logs

### Amazon QuickSight


A serverless, machine-learning-powered business intelligence service for interactive dashboards, visualizations, and ad hoc analysis. Choose it to present analytics from AWS, SaaS, imported, or JDBC-connected data sources to business users.

#### What it is
- QuickSight scales automatically, supports embedded analytics, and offers per-session pricing.
- ML-powered insights help users explore data and surface business trends.

#### Data sources and SPICE
- QuickSight connects to sources including S3, RDS, Aurora, Athena, Redshift, OpenSearch, Timestream, log formats, SaaS sources, imports, and on-premises databases over JDBC.
- **SPICE** is QuickSight's in-memory calculation engine for data imported into QuickSight.

#### Access and dashboards
- **Enterprise Edition** supports column-level security and row-level security for restricting which data users can see.
- QuickSight users and groups are defined within QuickSight and are distinct from IAM users and groups.
- A dashboard is a **read-only snapshot of an analysis** that preserves its filters, parameters, controls, and sort settings; publish a dashboard before sharing it.
- A dashboard viewer can see its underlying data, so apply appropriate data permissions and row/column controls before sharing.
- Analyses and published dashboards can be shared with QuickSight users or groups.
- **See also:** Amazon Athena, Amazon Redshift, AWS Lake Formation

### AWS Lake Formation


A managed service for creating and governing a centralized data lake, typically stored in Amazon S3. Choose it to simplify data ingestion and preparation and centrally apply fine-grained permissions across data-lake consumers.

#### What it is
- Lake Formation is built on AWS Glue and automates data-lake setup tasks such as collecting, cleansing, moving, and cataloging data.
- It discovers, transforms, and ingests data from sources such as S3, RDS, Aurora, and on-premises relational or NoSQL databases.
- A data lake can combine structured and unstructured data; Lake Formation provides source blueprints and data crawlers, ETL preparation, and a Data Catalog.
- **Fine-grained access controls** include row- and column-level permissions for data accessed through analytics services such as Athena and Redshift.
- Lake Formation centralizes permissions and governance; Glue jobs perform ETL transformations and S3 holds the data-lake objects.
- **See also:** AWS Glue, Amazon S3, Amazon Athena, Amazon Redshift, Amazon QuickSight

### AWS Data Exchange


A service for discovering, subscribing to, and using third-party datasets shared through AWS. Choose it when an organization needs governed access to external data products rather than building a one-off provider integration.

#### What it is
- Subscribers can find eligible data products, review the provider's offer, and subscribe to datasets through AWS Data Exchange.
- Providers can publish and manage data products and subscriptions; delivery options include Amazon S3 and supported data APIs.
- Products can include file-based datasets or API-based datasets, with provider-defined terms for access.
- Dataset updates are published as revisions that subscribers can access under their subscription.
- Subscribers can use shared data products without operating the data provider's infrastructure.
- **See also:** Amazon S3, AWS Marketplace

### AWS Data Pipeline


A managed orchestration service for scheduling and coordinating data movement and transformation between AWS compute and storage resources and on-premises sources. Choose it for dependency-aware, scheduled data workflows.

#### What it is
- A pipeline defines data sources, activities, schedules, and dependencies so work runs in the required order.
- It can coordinate processing with services such as S3, EC2, and EMR and can retry or alert on failed activities.
- Activities can run on AWS-managed resources or on resources in an on-premises environment.
- Pipelines can copy data between supported stores and schedule computation after its inputs are ready.
- Data nodes describe pipeline inputs and outputs, while activities define the work to run on those data.
- **See also:** Amazon EMR, Amazon S3, AWS Glue

### Amazon CloudSearch


A managed search service for deploying search domains and indexing application content for full-text search. Choose it for a straightforward managed search capability when a dedicated search cluster is unnecessary.

#### What it is
- CloudSearch indexes application documents and supports text search and search-result filtering.
- AWS manages the search domain infrastructure, allowing applications to submit documents for indexing and query the domain.
- A search domain defines the index and search configuration for an application's content.
- Search fields and their indexing options can be configured to match the document schema.
- Search queries return ranked results that applications can filter for their users.
- **See also:** Amazon OpenSearch Service

### Analytics pipeline patterns


A streaming analytics pipeline separates ingestion, durable storage, processing, querying, and visualization so each stage can scale independently.

#### What it is
- **Ingest:** IoT devices or applications send real-time events to Kinesis Data Streams; use MSK when Kafka compatibility is required.
- **Store and deliver:** Kinesis Data Streams retains replayable records; Data Firehose buffers and delivers streaming data to an S3 ingestion bucket in near real time.
- **Process:** Lambda can transform Firehose records, while Glue ETL can batch-convert and catalog data; Managed Flink processes continuous stateful streams.
- **Query:** Athena runs serverless SQL over S3 and stores results in S3; Redshift provides a warehouse for repeated analytics and joins.
- **Visualize:** QuickSight builds dashboards from Athena, Redshift, S3, and other supported sources; an S3 reporting bucket can hold query outputs.
- **See also:** Amazon Kinesis Data Streams, Amazon Data Firehose, AWS Glue, Amazon Athena, Amazon Redshift, Amazon QuickSight

## Application and ML services

### Amazon Rekognition


Amazon Rekognition applies managed machine learning to images and videos to detect objects, people, text, scenes, and faces. Choose it for visual analysis, content moderation, face search, or media metadata without building computer-vision models.

#### What it is
- Detects **objects, people, labels, text, scenes, and faces** in images and videos; face analysis can return attributes such as age range and emotions.
- Supports face search and verification, comparison with known face collections, and celebrity recognition.
- **Content moderation** detects inappropriate or unwanted visual material; a configurable confidence threshold determines which results are flagged.
- Moderation results can be sent to **Amazon Augmented AI (A2I)** for human review when automated confidence needs a manual check.
- Uses include image labeling, user verification, people counting, text detection, media moderation, and sports pathing analysis.
- **See also:** Amazon Textract, Amazon SageMaker

### Amazon Textract


Amazon Textract extracts printed text, handwriting, and structured data from scanned documents using managed AI and machine learning. Choose it for document ingestion when forms, tables, or key-value fields need to become machine-readable.

#### What it is
- Processes scanned **PDFs and images**, extracting text as well as data from forms and tables.
- Handles handwriting and returns structured results that downstream applications can transform, index, or store.
- Common inputs include invoices, financial reports, medical records, insurance claims, tax forms, identity documents, and passports.
- Combine S3 uploads with Lambda and Textract for document processing; Comprehend can further analyze extracted text.
- OCR-style extraction turns document content into machine-readable text and structured results for downstream processing.
- **See also:** Amazon Comprehend, Amazon Rekognition

### Amazon Comprehend


Amazon Comprehend is a managed, serverless natural-language processing service that finds information and relationships in text. Choose it for common language, sentiment, entity, key-phrase, and topic analysis without operating NLP infrastructure.

#### What it is
- Identifies a text's **language**, extracts key phrases and named entities such as people, places, brands, or events, and detects positive or negative sentiment.
- Analyzes tokenization and parts of speech and can organize a collection of documents by discovered topics.
- **Custom entity recognition** learns domain-specific labels from customer-provided labeled examples, such as specialized product or ingredient names.
- Comprehend can analyze text extracted by Textract or Transcribe; results can be stored in S3 or application databases.

#### Comprehend Medical
- **Amazon Comprehend Medical** extracts useful information from unstructured clinical text such as physician notes, discharge summaries, test results, and case notes.
- Its **DetectPHI** capability identifies protected health information (PHI) in clinical text.
- Medical text can come from S3, Kinesis Data Firehose, or speech transcribed by Amazon Transcribe before analysis.
- **See also:** Amazon Textract, Amazon Transcribe, Amazon SageMaker

### Amazon Transcribe


Amazon Transcribe converts speech in audio recordings into text using automatic speech recognition (ASR). Choose it for searchable call transcripts, captions, subtitles, or downstream text analysis.

#### What it is
- Transcribes recorded audio and customer-service calls, and can generate closed captions or subtitles for media.
- **PII redaction** can automatically remove personally identifiable information from transcript output.
- **Automatic language identification** supports multilingual audio without requiring the caller to declare the language first.
- Speaker diarization can distinguish speakers in supported audio; configurations can identify **2 to 10 speakers**.
- Transcripts can be stored and indexed for later search or queried in S3 with Athena; Transcribe performs speech recognition, not SQL analysis.
- **See also:** Amazon Comprehend, Amazon Polly

### Amazon Polly


Amazon Polly turns text into lifelike synthesized speech. Choose it for applications that speak, audio versions of content, or voice output without operating speech-generation models.

#### What it is
- Converts plain text or **Speech Synthesis Markup Language (SSML)** documents into audio using the \`SynthesizeSpeech\` operation.
- SSML can control emphasis, phonetic pronunciation, pauses, breathing sounds, whispering, and supported speaking styles such as Newscaster.
- **Pronunciation lexicons** customize how particular words, names, or acronyms are spoken.
- Use Polly to create voice responses for conversational applications and audio content for websites or apps.
- Applications can synthesize speech on demand rather than recording and serving every possible spoken response as a separate asset.
- **See also:** Amazon Lex, Amazon Transcribe

### Amazon Translate


Amazon Translate is a managed neural machine-translation service for translating text between languages. Choose it to localize application or website content and process large text volumes without building translation infrastructure.

#### What it is
- Produces natural translations for text that applications can incorporate into user-facing content.
- Translation is a text-language task; use Comprehend when the requirement is sentiment, entity, or topic analysis rather than translating words.
- Supports localization of websites and applications for international users and batch translation of large text volumes.
- Real-time translation can be embedded in application workflows, while asynchronous batch jobs suit collections of stored documents.
- Custom terminology can help preserve domain-specific translations for configured terms.
- **See also:** Amazon Comprehend, Amazon Polly

### Amazon Lex


Amazon Lex builds conversational bots using the speech-recognition and language-understanding technology behind Alexa. Choose it for text or voice interfaces that identify user intent and invoke application logic.

#### What it is
- Uses **automatic speech recognition (ASR)** to convert speech to text and **natural language understanding (NLU)** to determine intent from text or caller speech.
- Bots model **intents** and associated information needed to fulfill a request; they can support chat or voice conversations.
- A bot can elicit the information needed to fulfill an intent, then use an integration to complete the requested operation.
- Lex integrates with Lambda for fulfillment logic and with Amazon Connect for contact-center voice flows.
- Lex supplies the conversational bot and intent recognition; Connect supplies the cloud contact-center telephony and contact-flow environment.
- **See also:** Amazon Connect, Amazon Polly, Amazon Transcribe

### Amazon Connect


Amazon Connect is a cloud-based contact-center service for handling customer calls and building contact flows. Choose it to create a managed contact center that can integrate with AWS services and existing CRM systems.

#### What it is
- Receives calls and uses configurable **contact flows** to route interactions and invoke the required business logic.
- Integrates with Amazon Lex for conversational bots, Lambda for workflow logic, and external CRM systems.
- Contact routing and queues can distribute interactions to agents based on the configured contact flow.
- Contact flows configure the sequence of prompts, routing decisions, and service integrations for an interaction.
- Pricing is usage-based without traditional contact-center infrastructure or large up-front deployments; potential savings are often estimated at up to **80%** versus traditional contact-center solutions, though actual savings vary.
- **See also:** Amazon Lex, Amazon Transcribe, Amazon Polly

### Amazon Kendra


Amazon Kendra is a managed, machine-learning-powered enterprise search service for finding answers within organizational documents. Choose it for natural-language search across a connected document collection rather than building a search index and relevance model yourself.

#### What it is
- Indexes documents such as text, PDFs, HTML, PowerPoint, Word files, and FAQs, then returns relevant passages or answers to natural-language queries.
- Connectors can ingest content from sources such as S3, RDS, Google Drive, SharePoint, OneDrive, and supported third-party or custom repositories.
- **Incremental learning** uses user interactions and feedback to improve preferred results; administrators can also manually tune result relevance and freshness.
- Kendra focuses on answers and relevance over connected enterprise documents; use OpenSearch when the need is a configurable full-text search and analytics index.
- Search results can be grounded in connected enterprise content, helping users find answers without manually browsing each source.
- **See also:** Amazon OpenSearch Service, Amazon SageMaker

### Amazon SageMaker


Amazon SageMaker is a managed platform for developers and data scientists to build, train, tune, and deploy machine-learning models. Choose it when a team needs a managed ML workflow rather than hand-operating its own model infrastructure.

#### What it is
- A typical ML process trains a model from **historical data and labels**, tunes it, and applies the trained model to new inputs to produce predictions.
- SageMaker provides managed tools for building and training models and deploying them for inference; the service reduces the infrastructure work of an end-to-end ML process.
- SageMaker is distinct from prebuilt task-specific services such as Rekognition, Textract, and Comprehend, which expose ready-made image, document, or text capabilities.
- Teams can use SageMaker when they need control over model selection, training data, tuning, and deployment rather than a fixed task-specific API.
- For a common prebuilt task such as face analysis or sentiment, a purpose-built AI service avoids building a custom model pipeline.
- **See also:** Amazon Rekognition, Amazon Comprehend, Amazon Personalize

### Amazon Personalize


Amazon Personalize builds real-time personalized recommendations and ranking experiences using managed machine learning. Choose it when an application needs user-specific recommendations without creating and operating recommendation models itself.

#### What it is
- Uses interaction and catalog data to provide recommendations, personalize rankings, and support customized direct marketing.
- Historical input can be read from S3, with real-time data integration available for updated user activity.
- Integrates with websites, applications, mobile apps, SMS, and email systems; the service uses the same recommendation technology as Amazon.com.
- Use cases include retail recommendations and media or entertainment personalization.
- The service manages recommendation-model development and deployment so teams can integrate personalization without building the full ML pipeline.
- **See also:** Amazon SageMaker, Amazon S3

### Amazon Forecast


Amazon Forecast is a managed time-series forecasting service that uses machine learning to predict future values from historical time-dependent data. Choose it for demand or resource forecasts when a time-series forecast is needed without building the forecasting pipeline from scratch.

#### What it is
- Forecasting uses historical observations and associated time-series information to generate future-value predictions for use in planning.
- Common use cases include predicting product demand, inventory needs, or other recurring quantities over time.
- Forecasts help planning systems make forward-looking decisions from historical time-stamped records rather than treating observations as independent rows.
- Forecast quality depends on representative historical data and relevant time-series inputs.
- Forecast predicts future values over time; it is not a real-time transaction classifier or an event-routing service.
- **See also:** Amazon SageMaker, Amazon Personalize

### Amazon Fraud Detector


Amazon Fraud Detector is a managed service for identifying potentially fraudulent online activity using machine learning. Choose it for transaction or account-risk detection when a purpose-built fraud model is preferable to building detection infrastructure from scratch.

#### What it is
- A detector evaluates activity against a trained fraud-detection model and returns a risk result that an application can use in its decision process.
- Fraud scoring can be integrated into application workflows so suspicious activity can be reviewed or blocked while legitimate activity continues.
- Detector logic can combine model predictions with decision rules to return outcomes used by the calling application.
- Historical labeled events help train models to distinguish fraudulent from legitimate activity.
- Use cases include online payment and account activity risk, where a fraud score can inform additional verification or review.
- **See also:** Amazon SageMaker, Amazon Comprehend

### Amazon Bedrock


Amazon Bedrock is a managed service for building generative-AI applications with foundation models through AWS APIs. Choose it to use supported foundation models without provisioning model-serving infrastructure.

#### What it is
- Provides access to multiple foundation models for tasks such as text generation, summarization, and question answering.
- Managed capabilities include retrieval-augmented generation, agents, and guardrails for grounding or controlling application responses.
- Model choice lets builders select a foundation model that fits the application's language, modality, and response needs.
- IAM and service-level controls let applications integrate model calls into AWS environments without hosting model endpoints themselves.
- Bedrock exposes managed foundation-model inference; SageMaker is the broader platform when teams need custom model-building and training control.
- **See also:** Amazon SageMaker, Amazon Q

### Amazon Q


Amazon Q is AWS's generative-AI assistant family for business users and software developers. Choose the applicable Q assistant for enterprise information and task assistance or development help.

#### What it is
- **Amazon Q Business** helps users find and summarize information across connected enterprise content sources, subject to access permissions.
- **Amazon Q Developer** assists with software development tasks such as code explanation, generation, and AWS development workflows.
- Q Business connects enterprise knowledge sources and respects configured user permissions when returning information.
- Q Developer can help explain code, suggest implementations, and answer questions about AWS development.
- Q's enterprise and developer assistants are packaged experiences; Bedrock is the model-building platform for developers creating their own generative-AI applications.
- **See also:** Amazon Bedrock, Amazon SageMaker

## Management and governance

### Amazon CloudWatch


A monitoring and observability service for AWS resources and applications. Choose CloudWatch to collect metrics and logs, visualize behavior, and trigger alarms or operational workflows.

#### What it is
- **Metrics** are timestamped measurements organized into **namespaces**; a **dimension** is a metric attribute such as instance ID or environment, with up to **30 dimensions** per metric.
- AWS services publish standard metrics; custom metrics can report application or host data such as memory, which EC2 does not provide by default.
- **Standard resolution** custom metrics are generally published at one-minute intervals; **high-resolution** metrics can be published as frequently as one second and support alarm periods of 10 or 30 seconds or multiples of 60 seconds.
- EC2 basic monitoring publishes metrics at five-minute intervals; detailed monitoring publishes them at one-minute intervals. Higher-frequency metrics do not automatically include guest OS measurements.
- **CloudWatch dashboards** display metrics and other monitoring views, including data across accounts and Regions when configured.
- **Metric streams** continuously deliver selected metrics with near-real-time latency to Kinesis Data Firehose and its destinations, including S3, Redshift, OpenSearch, or third-party monitoring tools.

#### Alarms and anomaly detection
- **Metric alarms** evaluate a metric over a configured period and threshold; states are **OK**, **ALARM**, and **INSUFFICIENT_DATA**.
- High-resolution custom metrics support 10-second and 30-second alarm periods; standard periods are one minute or longer.
- Alarm actions can notify **Amazon SNS**, trigger an **EC2 stop, terminate, reboot, or recover action**, or invoke an **EC2 Auto Scaling** action.
- EC2 recovery alarms commonly use \`StatusCheckFailed_System\`; recovery retains the instance's private and public IP addresses, Elastic IP, metadata, and placement group.
- **Composite alarms** combine states of other alarms with AND/OR logic, helping reduce alert noise; a standard alarm monitors one metric.
- **Anomaly detection** models expected metric behavior and alarms on deviations rather than requiring a fixed threshold.
- A **metric filter** can extract a metric from log events and feed an alarm; CloudWatch alarm state can be set for testing.

#### Logs and Insights
- **Log groups** typically represent applications; **log streams** represent their instances, files, or containers.
- Log data is encrypted by default; customer-managed KMS keys can be configured. Retention is configurable from **one day to ten years**, or logs can be kept indefinitely.
- Log sources include AWS services, Lambda, ECS, API Gateway, VPC Flow Logs, Route 53 DNS query logs, and CloudTrail when configured.
- EC2 and on-premises hosts do not automatically send their local logs to CloudWatch; install and configure an agent and grant the necessary IAM permissions.
- The older **CloudWatch Logs agent** sends logs; the **CloudWatch Agent (Unified Agent)** collects logs plus host metrics such as RAM, disk, network, processes, and swap.
- Unified Agent configuration can be centralized with Systems Manager Parameter Store; its detailed guest metrics complement EC2's built-in CPU, disk, and network metrics.
- **Logs Insights** searches and analyzes log groups with a purpose-built query language, discovers fields in AWS and JSON logs, filters and aggregates events, and can query across log groups and accounts.
- Logs Insights queries can be saved and placed on dashboards; it is an interactive query engine, not a real-time stream processor.
- **S3 export tasks** can take up to **12 hours** before log data is available and are not suitable for real-time delivery.
- **Subscription filters** select log events for near-real-time processing by Lambda, Kinesis Data Streams, or Kinesis Data Firehose; cross-account destinations require a permitted subscription destination.

#### Operational insights
- **Contributor Insights** analyzes log records and creates time series for top-N contributors, counts, and usage; use it to identify noisy hosts, heavy network users, or error-generating URLs.
- Contributor Insights can use custom or sample rules over CloudWatch Logs and includes rules for selected AWS service metrics.
- **Synthetics canaries** run scheduled scripts to test endpoints and user paths, identifying availability or performance problems from the user's perspective.
- **CloudWatch RUM** collects real-user experience data from web applications; it complements synthetic tests with actual user sessions.
- **CloudWatch Evidently** supports feature launches and experiments, including controlled rollouts and analysis of user impact.
- **Container Insights** collects, aggregates, and summarizes metrics and logs for ECS, EKS, Kubernetes on EC2, and Fargate; Kubernetes deployments use a containerized CloudWatch Agent.
- **Lambda Insights** adds system-level metrics and diagnostic data such as cold starts through a Lambda layer; **Application Insights**, powered by SageMaker, provides automated application-health dashboards and sends findings to EventBridge and Systems Manager OpsCenter.

#### Integrations and comparisons
- **Amazon EventBridge** reacts to service events, schedules, and CloudTrail API events; CloudWatch focuses on metrics, logs, dashboards, and metric alarms, while EventBridge routes events to targets.
- CloudTrail records who made API calls; AWS Config records resource configuration and evaluates compliance; CloudWatch measures operational performance and aggregates logs.
- **See also:** Amazon EventBridge, AWS CloudTrail, AWS Config, AWS Systems Manager, AWS Systems Manager Parameter Store

### AWS CloudTrail


An account-governance and audit service that records AWS API activity. Use CloudTrail to establish who did what, when, and from which source, and to retain an audit history.

#### What it is
- CloudTrail is enabled by default and captures account activity through the console, SDKs, CLI, and AWS services; its **Event history** provides the most recent **90 days** of management events.
- A **trail** delivers selected events to an S3 bucket for retention beyond 90 days and analysis with tools such as Athena; a trail can also send events to CloudWatch Logs. Trails can cover one Region or all Regions, with all-Region coverage the default.
- Trails can cover one Region or all Regions; an **organization trail** applies centrally across the accounts in an AWS Organization.
- **Management events** record control-plane operations on resources, such as changing IAM permissions, creating a subnet, or configuring a trail; trails log management events by default.
- Management events can be selected as read-only, write-only, or both.
- **Data events** record high-volume resource operations such as S3 object reads/writes and Lambda function invocations; they are not logged by default and must be selected for applicable resources.
- **CloudTrail Insights** analyzes management write activity against a baseline to identify unusual patterns such as bursts of IAM activity, unexpected provisioning, or service-limit pressure.
- Insights findings appear in CloudTrail, can be delivered to S3, and generate EventBridge events for automated response.
- **Log file validation** uses digest files and cryptographic hashes to help detect whether delivered CloudTrail log files have been changed or deleted.
- Integrate trails with **CloudWatch Logs** for log analysis and alerting, or **EventBridge** for event-driven actions on API activity.
- **CloudTrail Lake** provides a managed event data store for collecting, retaining, and querying CloudTrail events with SQL, rather than requiring users to build their own S3/Athena query pipeline.

#### Compared with
- CloudTrail answers **which identity called which API and when**; AWS Config answers how a resource was configured and whether it meets rules; CloudWatch answers how a system is performing.
- CloudTrail event history is limited to 90 days; configure a trail or CloudTrail Lake event data store for longer retention.
- **See also:** Amazon CloudWatch, AWS Config, Amazon EventBridge, AWS Organizations

### AWS Config


A per-Region resource inventory, configuration-history, and compliance service. Use Config to evaluate AWS resource settings against required rules and track how those settings change over time.

#### What it is
- Config records resource configurations and changes, allowing configuration and compliance timelines to be reviewed over time.
- **Managed rules** are AWS-provided checks (the supplied course material lists more than 75); **custom rules** are implemented with Lambda. Rules can run on each configuration change, periodically, or both.
- Example checks include detecting unrestricted SSH access, public S3 buckets, untagged resources, or an unwanted resource type or setting.
- Config rules report compliance; they **do not prevent** an action or deny a resource change.
- Config has no free tier in the supplied pricing material; the reference rates are **$0.003 per configuration item recorded** and **$0.001 per rule evaluation per Region**. Check current regional pricing before estimating costs.
- **Conformance packs** package related Config rules and remediation actions as a reusable compliance framework.
- Config can aggregate data across Regions and accounts using a **configuration aggregator**, enabling central compliance views without changing the source recorders.
- Configuration data can be delivered to S3 for longer-term analysis, including with Athena.
- Config can notify through SNS or EventBridge when configuration or compliance state changes; EventBridge rules can route selected noncompliance events to Lambda, SQS, or SNS.
- **Remediation** can invoke Systems Manager Automation documents, including AWS-managed or custom documents; retries can be configured if a resource remains noncompliant.
- Config can show related CloudTrail API calls in a resource timeline, but CloudTrail remains the audit source for identity and API activity.

#### Compared with
- **CloudWatch** monitors metrics, logs, and operational alarms; **CloudTrail** records API activity; **Config** records resource state and evaluates compliance.
- Config rules are detective, not preventive; use organization policies or service permissions when an action must be blocked before it occurs.
- **See also:** Amazon CloudWatch, AWS CloudTrail, AWS Systems Manager, AWS Control Tower

### AWS CloudFormation


A declarative infrastructure-as-code service that provisions and updates AWS resources from templates. Choose CloudFormation to create repeatable environments with reviewable, dependency-aware changes.

#### What it is
- A **template** describes desired resources and their configuration; CloudFormation creates them in dependency order as a **stack**.
- Templates can be version-controlled and reviewed, and resources created by a stack can be managed as a coordinated unit; CloudFormation itself has no additional charge, but provisioned resources incur their normal charges. Stack-created resources carry stack identifiers that help attribute cost, and templates can be used to estimate resource costs before deployment.
- **Parameters** accept deployment-time values; **Mappings** hold static lookup values; **Conditions** control conditional resource creation; **Outputs** expose values after deployment.
- Intrinsic functions such as \`Ref\`, \`Fn::GetAtt\`, \`Fn::Sub\`, \`Fn::Join\`, and \`Fn::ImportValue\` reference or compose values and connect stack resources.
- **Change sets** preview proposed updates and likely replacements before applying them; a change set does not modify resources until executed.
- **Drift detection** compares supported live resource settings with the template's expected settings; it identifies drift but does not automatically repair it.
- **StackSets** deploy a template across multiple accounts and Regions, including organization-managed deployments.
- **Nested stacks** organize reusable templates into parent/child stacks; use them to decompose large templates.
- CloudFormation supports most AWS resource types; a **custom resource** lets a stack invoke a Lambda function or supported provider to perform work or manage resources not natively represented by CloudFormation types.
- **DeletionPolicy** controls what happens to a resource when removed from a template or its stack is deleted; common choices are \`Delete\`, \`Retain\`, and \`Snapshot\` where supported.
- On a failed create or update, CloudFormation can roll back the stack to its prior state; stack policies and termination protection can further protect resources and stacks.
- **CloudFormation helper scripts**, including \`cfn-init\`, configure EC2 instances from template metadata; \`cfn-signal\` can report successful completion for coordinated stack creation. Infrastructure Composer can visualize template resources and their relationships.
- A CloudFormation **service role** lets CloudFormation create, update, and delete resources on behalf of stack users who need not have each resource permission themselves; users need \`iam:PassRole\` to pass it.
- **AWS Service Catalog** can expose approved CloudFormation templates as governed products for users to provision.

#### Compared with
- **AWS CDK** lets developers define infrastructure in familiar programming languages and synthesizes CloudFormation templates for deployment; CloudFormation is the underlying deployment and stack engine.
- **See also:** AWS Cloud Development Kit, AWS Service Catalog, AWS Systems Manager

### AWS Cloud Development Kit


The AWS CDK is an infrastructure-as-code framework for defining AWS resources in programming languages and deploying them through CloudFormation.

#### What it is
- CDK applications compose reusable **constructs** in supported languages, then synthesize a CloudFormation template for deployment.
- CDK provides higher-level abstractions than writing every template resource by hand; synthesized templates can still be reviewed as CloudFormation.
- **See also:** AWS CloudFormation

### AWS Systems Manager


A collection of operational capabilities for managing AWS and hybrid infrastructure. Use Systems Manager to automate fleet operations, maintain compliance, and access managed instances without opening inbound administration ports.

#### What it is
- Managed instances need the **SSM Agent**, appropriate IAM permissions, and network connectivity to Systems Manager endpoints; on-premises servers can be registered as managed nodes.
- **Run Command** runs a command or Systems Manager document on one or many managed nodes, including nodes selected through resource groups; output can go to the console, S3, or CloudWatch Logs.
- Run Command integrates with IAM and CloudTrail, can notify SNS of command status, and can be started by EventBridge.
- **Session Manager** provides auditable shell access to Linux, macOS, and Windows EC2 or on-premises managed nodes without SSH keys, inbound port 22, or bastion hosts; sessions can be logged to S3 or CloudWatch Logs.
- **Patch Manager** scans and patches supported Linux, macOS, and Windows managed nodes for OS, application, and security updates, on demand or on a schedule.
- **Maintenance Windows** schedule actions such as patching and software installation using a schedule, duration, registered instances or other targets, and registered tasks.
- **State Manager** maintains a desired configuration by applying document associations to managed nodes on a schedule or when triggered.
- **Automation** runs predefined or custom runbooks to orchestrate maintenance and deployment actions on EC2 and other AWS resources, such as restarting instances or creating AMIs and EBS snapshots.
- Automation can be started manually, by EventBridge, by Maintenance Windows, or by AWS Config remediation.
- **Inventory** collects metadata about managed nodes, such as installed applications and system details, to support fleet visibility and compliance.
- **OpsCenter** centralizes operational issues as OpsItems and relates them to resources and investigation data; CloudWatch Application Insights can send findings there.
- **See also:** AWS Systems Manager Parameter Store, AWS Config, Amazon CloudWatch, Amazon EventBridge

### AWS Systems Manager Parameter Store


A managed parameter store for application configuration and secrets. Use it to centrally organize values by environment and retrieve them through Systems Manager APIs or SDKs.

#### What it is
- Parameters can be plain \`String\`, \`StringList\`, or encrypted \`SecureString\` values; **KMS** can encrypt and decrypt secure values subject to IAM permissions.
- Parameter Store is serverless, scalable, durable, and supports parameter versions and hierarchical paths such as \`/application/environment/database-url\`.
- Standard and Advanced tiers provide different parameter-count and size quotas; Standard supports **10,000 parameters per account per Region** and values up to **4 KB**, while Advanced supports **100,000** and values up to **8 KB**.
- Applications retrieve one or multiple parameters, including recursively by path; IAM controls who can read or write parameters.
- Parameter changes can notify EventBridge; CloudFormation can reference Parameter Store values, and the CloudWatch Unified Agent can use it for centralized configuration.
- Parameter Store can expose selected Secrets Manager values and public AWS parameters such as current Amazon Linux AMI IDs through reserved paths.
- **See also:** AWS Systems Manager, AWS CloudFormation, Amazon CloudWatch, AWS Secrets Manager

### AWS Trusted Advisor


An account assessment service that checks AWS usage against recommended practices and returns actionable findings without requiring agents on workloads.

#### What it is
- Trusted Advisor evaluates **cost optimization, performance, security, fault tolerance, service limits, and operational excellence**.
- The **Basic and Developer** support plans include a limited core set, including public S3 buckets, risky security-group ports, IAM use, root-user MFA, public EBS/RDS snapshots, and service limits; **Business, Enterprise On-Ramp, and Enterprise** plans provide the full check set, with programmatic access through the AWS Support API where supported by the plan.
- Findings can identify common issues such as exposed resources, underused capacity, service-limit pressure, or resilience gaps.
- **See also:** AWS Support plans, AWS Compute Optimizer, AWS Health Dashboard

### AWS Health Dashboard


The AWS Health Dashboard communicates service health and account-specific events that may affect AWS resources.

#### What it is
- The public **Service health** view reports broad AWS service events; the **Personal Health Dashboard** (account-specific Health Dashboard) reports events relevant to the account and its resources.
- Account-specific notifications can identify scheduled changes, service issues, or actions needed to protect workloads; organizational views can aggregate relevant health events across accounts.
- **See also:** Amazon EventBridge, AWS Trusted Advisor

### AWS Control Tower


A guided service for establishing and governing a secure multi-account AWS landing zone. Use it to apply consistent account setup and guardrails across an AWS Organization.

#### What it is
- **Landing zone** establishes a baseline multi-account environment using AWS Organizations and integrated governance services.
- **Account Factory** standardizes creation and enrollment of accounts in the governed environment.
- **Guardrails** provide ongoing controls: preventive guardrails use service control policies, while detective guardrails use AWS Config to identify noncompliance.
- Control Tower provides a governance dashboard to monitor account compliance; detective findings can be routed for notification or remediation.
- **See also:** AWS Organizations, AWS Config, AWS Service Catalog

### AWS Service Catalog


A governance service for publishing approved IT products for self-service provisioning. Use it when users need a controlled catalog instead of unrestricted resource creation.

#### What it is
- Administrators publish **portfolios** containing approved **products**, commonly backed by CloudFormation templates.
- Access, versions, constraints, and launch roles can be governed centrally while users provision permitted products without holding all underlying resource permissions.
- Products can be shared across accounts and integrated into a Control Tower account-provisioning process.
- **See also:** AWS CloudFormation, AWS Control Tower

### AWS Compute Optimizer


A recommendation service that analyzes resource utilization and configuration to identify potential rightsizing and performance improvements.

#### What it is
- Compute Optimizer uses utilization history and machine-learning analysis to recommend suitable resource configurations for supported resources such as EC2 instances, Auto Scaling groups, EBS volumes, and Lambda functions.
- Recommendations help identify over-provisioned resources that may be downsized and under-provisioned resources that may need additional capacity; they do not automatically change resources.
- **See also:** AWS Cost management tools, AWS Trusted Advisor, Amazon CloudWatch

### AWS cost management tools


AWS billing and cost-management tools help understand spending, set controls, allocate costs, and reduce recurring charges. Use them together: Cost Explorer analyzes trends, Budgets alerts on thresholds, and CUR supports detailed independent analysis.

#### What it is
- **Cost Explorer** visualizes historical cost and usage by account, service, and other dimensions, supports monthly, hourly, or resource-level views where available, and forecasts usage up to **18 months** from historical patterns.
- Cost Explorer can compare purchasing options and provide **Savings Plans** recommendations based on observed usage.
- **AWS Budgets** tracks actual or forecasted cost, usage, or commitment against a configured threshold and can send notifications or invoke supported actions.
- **Cost and Usage Report (CUR)** provides detailed billing line items and usage data for delivery to S3 for analysis with Athena, Redshift, or other tools.
- **Cost Allocation Tags** categorize usage and costs by application, environment, team, or owner; activate tags for billing reports, and use consistent tagging to support chargeback and governance.
- **Cost Anomaly Detection** continuously applies machine learning to historical spending patterns to identify unusual one-time spikes or sustained increases without requiring a fixed threshold; it can monitor services, member accounts, tags, or cost categories and send reports with root-cause analysis.
- **Savings Plans** exchange a one- or three-year hourly usage commitment for discounted eligible compute usage; they are flexible across eligible usage within their plan family, but unused commitment is still paid.
- **Reserved Instance and Savings Plans recommendations** help identify commitment opportunities; verify expected workload duration and utilization before committing.
- **Consolidated billing** combines member-account charges into one payer bill and can share eligible volume discounts and Savings Plans or Reserved Instance benefits across accounts, subject to sharing settings.
- Billing tools show costs and usage; AWS Support handles technical support, and billing data is not a substitute for CloudWatch operational monitoring.
- **See also:** AWS Organizations, AWS Budgets, Amazon CloudWatch, AWS Compute Optimizer

### AWS Support plans


AWS Support plans provide different levels of technical guidance, response targets, and proactive support. Choose a tier based on workload criticality and the need for rapid escalation or a Technical Account Manager.

#### What it is
- **Basic** is included at no additional charge and provides account, billing, and service-limit assistance plus public documentation and basic health resources; it does not include technical support cases.
- **Developer** is for development and test workloads and provides business-hours technical guidance; response targets are up to **24 hours** for general guidance and **12 hours** for system-impaired cases.
- **Business** adds 24/7 access to technical support and support for production workloads; typical targets are **4 hours** for production system impairment and **1 hour** for a production system down.
- **Enterprise On-Ramp** adds faster business-critical response targets, proactive guidance, and access to a pool of Technical Account Managers; its business-critical target is **30 minutes**.
- **Enterprise** provides the most comprehensive proactive support, a designated **Technical Account Manager (TAM)**, and a **15-minute** target for business-critical system-down cases.
- Response targets depend on the plan and severity classification; they are targets for initial response, not guaranteed resolution times.
- **See also:** AWS Trusted Advisor, AWS Health Dashboard

### AWS Well-Architected Tool


A free workload-review tool that helps evaluate an architecture against the AWS Well-Architected Framework and record improvement plans.

#### What it is
- Select a workload, answer questions organized by the six pillars, review identified risks, and receive guidance and a report that can be tracked in a dashboard.
- **See also:** Architecture principles

### AWS Resource Groups and Tag Editor


Resource Groups and Tag Editor help organize resources and apply or review tags across AWS resources.

#### What it is
- **Resource Groups** create logical collections of resources, often using shared tags or properties, for coordinated viewing and operations.
- **Tag Editor** searches resources across supported Regions and services and helps add, edit, or remove tags in bulk.
- Consistent tags support cost allocation, inventory, automation, and access-control patterns; tags do not automatically restrict access unless policies enforce them.
- **See also:** AWS cost management tools, AWS Systems Manager

### AWS License Manager


A service for managing software-license usage and reducing the risk of exceeding license terms across AWS and hybrid environments.

#### What it is
- Define license configurations and track usage of supported commercial software across managed resources and accounts.
- License Manager can help apply license rules and coordinate with AWS services used to provision or manage the licensed software.
- **See also:** AWS Systems Manager, AWS Organizations

### AWS OpsWorks


A managed configuration-management service for deploying and operating applications using Chef or Puppet.

#### What it is
- OpsWorks Stacks models applications as stacks, layers, instances, and deployments; OpsWorks for Chef Automate and Puppet Enterprise provide managed configuration-management environments.
- Use it for existing Chef/Puppet workflows rather than as the default choice for new general-purpose fleet automation; Systems Manager provides broader current operational tools.
- **See also:** AWS Systems Manager

### AWS X-Ray


A distributed tracing service for analyzing requests that cross application components and AWS services.

#### What it is
- Instrumented applications record **segments** and **subsegments** that describe request work, timing, errors, and downstream calls.
- X-Ray visualizes service maps and traces to locate latency, faults, and bottlenecks across distributed applications.
- Sampling limits trace volume and cost; trace context is propagated between supported services and instrumented clients.
- **See also:** Amazon CloudWatch, AWS Lambda, Amazon API Gateway

## Migration and transfer

### AWS Application Migration Service (MGN)


AWS Application Migration Service (MGN) automates lift-and-shift server migration to AWS with continuous replication of source disks. Choose it to rehost physical, virtual, or cloud-based servers with minimal downtime rather than redesigning applications before moving.

#### What it is
- MGN is the evolution of CloudEndure Migration and replaced AWS Server Migration Service (SMS).
- Install the **AWS Replication Agent** on supported source servers; it continuously replicates disk-level changes to a low-cost staging area in AWS.
- MGN converts supported physical, virtual, and cloud-based servers to run natively on AWS EC2 using replicated EBS volumes.
- Launch test instances to validate applications, then perform cutover to production instances when replication is current.
- It supports a wide range of platforms, operating systems, and databases, aiming to reduce migration effort, cost, and downtime.
- **See also:** AWS Application Discovery Service, AWS Migration Hub

### AWS Application Discovery Service


A migration-planning service that collects inventory and utilization information about on-premises servers and their dependencies. Choose it to understand the existing environment before grouping and moving workloads to AWS.

#### What it is
- **Agentless Discovery** uses the AWS Agentless Discovery Connector to collect VM inventory, configuration, and performance history such as CPU, memory, and disk usage.
- **Agent-based Discovery** uses the AWS Application Discovery Agent to collect system configuration, performance, running processes, and network-connection details between systems.
- Server utilization and dependency maps help determine migration plans and which servers should move together.
- Collected discovery data can be viewed in AWS Migration Hub.
- Using inventory, utilization, and dependency information together helps define application groupings and migration waves.
- **See also:** AWS Migration Hub, AWS Application Migration Service (MGN)

### AWS Migration Hub


A central place to plan and track application migration progress across AWS and partner migration tools. Choose it to view migration status across related servers and coordinate a migration project.

#### What it is
- Discovery results from AWS Application Discovery Service are viewable in Migration Hub and help organize servers into applications.
- Migration Hub tracks migration status and progress for server migrations performed with AWS Application Migration Service and other supported tools.
- The service provides a consolidated view rather than performing the underlying server replication or database migration itself.
- Migration teams can use the dashboard to review progress across application groups and identify work that remains.
- **See also:** AWS Application Discovery Service, AWS Application Migration Service (MGN), AWS Database Migration Service (DMS)

### AWS Migration Evaluator


A migration assessment service that helps build a data-driven business case for moving on-premises workloads to AWS. Choose it to estimate current resource utilization and compare projected AWS costs before planning migration waves.

#### What it is
- Migration Evaluator collects server inventory and utilization information to model right-sized AWS configurations and cost estimates.
- Its assessment can support total-cost-of-ownership comparisons and prioritization of migration candidates.
- Utilization data helps right-size proposed EC2 instances rather than basing the estimate only on provisioned on-premises capacity.
- The assessment output helps build a migration business case and plan next steps.
- The service is available at no additional charge as an AWS migration assessment offering.
- **See also:** AWS Application Discovery Service, AWS Migration Hub

### Cloud migration strategies


The **7 Rs** describe choices for an application or workload based on business constraints, technical effort, and desired cloud benefits. Select a migration approach per application rather than forcing every workload into the same path.

#### What it is
- **Rehost (lift and shift):** move a workload largely as-is; use it for speed, minimal application change, or when modernization can wait. MGN is the AWS server migration tool for this path.
- **Relocate:** move an existing virtualized environment without redesigning individual applications; VMware Cloud on AWS supports moving VMware vSphere workloads while retaining VMware operations.
- **Replatform (lift, tinker, and shift):** make limited optimizations, such as moving to a managed database, while keeping the core application architecture.
- **Repurchase:** replace the existing application with a different product, often a SaaS offering, when adopting a new product is preferable to migrating the old one.
- **Refactor / re-architect:** substantially redesign or rewrite an application to use cloud-native capabilities when the business benefit justifies the engineering effort.
- **Retain:** keep a workload where it is for now when dependencies, compliance, economics, or business timing make migration unsuitable.
- **Retire:** decommission applications that are no longer needed, avoiding the cost of migrating unused workloads.

#### Migration tooling map
- **Servers:** AWS Application Migration Service (MGN) performs continuous server replication and rehosting; AWS Application Discovery Service collects inventory and dependency data, and Migration Hub tracks progress.
- **Databases:** AWS Database Migration Service (DMS), covered in Databases, migrates database data and can replicate ongoing changes; use AWS SCT when schema conversion between engines is needed.
- **Files:** AWS DataSync and AWS Transfer Family, covered in Storage, move or provide protocol-based access to files in AWS storage.
- **Physical bulk data:** AWS Snow Family, covered in Storage, uses secure portable devices to move datasets up to petabytes when network transfer is impractical; use devices when a network transfer would take **more than a week**. For example, at 100 Mbps, 10 TB takes about 12 days, 100 TB about 124 days, and 1 PB about 3 years; at 1 Gbps the same transfers take about 30 hours, 12 days, and 124 days; at 10 Gbps they take about 3 hours, 30 hours, and 12 days. Snowball data must land in S3 before an S3 lifecycle policy moves it to Glacier.
- **VMware environments:** VMware Cloud on AWS relocates or extends vSphere-based data centers while retaining VMware tooling.
- **Discovery-to-migration flow:** use Application Discovery Service to collect server inventory, performance, and dependencies; group and track workloads in Migration Hub; migrate server replicas with MGN and validate before cutover.
- **See also:** AWS Application Discovery Service, AWS Migration Hub, AWS Application Migration Service (MGN), AWS Database Migration Service (DMS), AWS DataSync, AWS Transfer Family, AWS Snow Family, VMware Cloud on AWS

### VMware Cloud on AWS


A VMware vSphere-based cloud service that lets organizations extend or move their VMware data-center environment into AWS while continuing to use VMware software. Choose it for large-scale VMware workload migration, hybrid capacity, or disaster recovery.

#### What it is
- It runs vSphere-based private-cloud environments in AWS and can connect an on-premises vCenter environment to AWS services.
- Organizations can migrate vSphere workloads, run production workloads across private, public, and hybrid environments, or establish a disaster-recovery strategy.
- It can integrate with AWS services such as EC2, S3, Direct Connect, FSx, RDS, and Redshift.
- It supports retaining VMware administration and operational practices while extending data-center capacity into AWS.
- It is a relocation path for VMware-based infrastructure, not a requirement to refactor each guest application before migration.
- **See also:** AWS Application Migration Service (MGN), AWS Application Discovery Service, AWS Migration Hub

## Architecture principles

### AWS Well-Architected Framework pillars


The Well-Architected Framework is a set of architectural best practices for evaluating workloads. Its six pillars reinforce one another rather than represent competing goals.

#### What it is
- General principles include stop guessing capacity, test systems at production scale, automate experimentation, allow architecture to evolve with requirements, make decisions using data, and improve through game days and simulations.

#### Six pillars and design principles
- **Operational Excellence** — run and monitor systems to deliver business value and continually improve processes; operate as code, make frequent small reversible changes, refine procedures often, anticipate failure, and learn from operational events.
- Operational cues include automation of deployment and monitoring, observable operations, and game days that validate responses to failure.
- **Security** — protect systems, information, and assets while delivering business value; establish strong identity foundations, enable traceability, apply security at every layer, automate security best practices, protect data in transit and at rest, keep people away from direct data access, and prepare for security events.
- Security cues include least privilege, centralized identity, encryption, audit trails, and automated detection and response.
- **Reliability** — recover from failures, meet demand, and mitigate disruption; test recovery procedures, automatically recover, scale horizontally, stop guessing capacity, and manage change through automation.
- Reliability cues include multi-AZ designs, health checks, backups, resilient queues, tested failover, and explicit recovery objectives.
- **Performance Efficiency** — use computing resources efficiently as demand and technology change; democratize advanced technologies, go global quickly, use serverless architectures, experiment more often, and consider mechanical sympathy.
- Performance cues include choosing the right resource type, measuring bottlenecks, and using managed or purpose-built services rather than over-provisioning.
- **Cost Optimization** — deliver business value at the lowest appropriate price; adopt consumption models, measure overall efficiency, stop paying for undifferentiated heavy lifting, analyze expenditures, and use managed services.
- Cost cues include rightsizing, scheduling nonproduction capacity, commitment discounts for stable use, and matching storage class to access patterns.
- **Sustainability** — minimize the environmental impact of running cloud workloads; understand impact, establish goals, maximize utilization, anticipate and adopt efficient hardware/software, and use managed services.
- Sustainability cues include avoiding idle capacity, increasing utilization, selecting efficient architectures, and reducing unnecessary data movement and storage.
- **See also:** AWS Well-Architected Tool, AWS Trusted Advisor

### High availability, fault tolerance, and disaster recovery


These concepts describe different levels of continuity when infrastructure or an entire Region fails. Match the design to the workload's tolerated downtime and data loss.

#### What it is
- **High availability (HA)** reduces downtime through redundancy and automated detection or failover, commonly across multiple Availability Zones; brief interruptions can still occur during recovery.
- **Fault tolerance** keeps service operating through component failure with little or no interruption, typically using continuously available redundant components and synchronization; it is usually more complex and costly than HA.
- **Disaster recovery (DR)** restores service after a larger outage, such as a Region loss; it requires a recovery strategy, replicated or backed-up data, and tested procedures.
- **RTO (Recovery Time Objective)** is the maximum acceptable time to restore service; **RPO (Recovery Point Objective)** is the maximum acceptable amount of data loss measured in time.
- DR choices trade cost against RTO/RPO: backup and restore is generally cheapest and slower; pilot light and warm standby keep progressively more infrastructure ready; multi-site active/active can provide the fastest recovery at the highest cost and operational complexity.
- Multi-AZ resilience addresses failures within a Region; cross-Region backup or replication is needed for Regional disaster recovery.
- **See also:** AWS Well-Architected Framework pillars, Amazon CloudWatch, AWS CloudTrail

### Loose coupling and stateless design


Loosely coupled, stateless components can be changed, replaced, and scaled independently. They limit the blast radius of failure and avoid binding application state to one server.

#### What it is
- Put asynchronous boundaries such as SQS, SNS, or EventBridge between producers and consumers to buffer load and reduce direct dependencies.
- Use APIs and event contracts rather than hard-coding service internals; design consumers to handle retries and duplicate delivery safely.
- Store durable shared state outside replaceable compute, such as in DynamoDB, RDS, or S3; keep session state in a shared store or client token instead of a single EC2 instance.
- Use Auto Scaling and load balancers to replace or add application instances without relying on sticky local state.
- **See also:** Amazon SQS, Amazon EventBridge, AWS Lambda, Amazon DynamoDB

### Scaling: vertical and horizontal


Scaling changes available capacity as workload demand changes. Prefer horizontal scaling for resilient, distributed workloads; use vertical scaling when the application or data tier requires larger individual nodes.

#### What it is
- **Vertical scaling (scale up/down)** changes the size of one resource, such as moving to a larger EC2 instance or database class; it is constrained by available sizes and can require interruption.
- **Horizontal scaling (scale out/in)** adds or removes resource instances, commonly with load balancing and Auto Scaling; it can improve fault isolation but requires a distributed, preferably stateless application.
- Plan capacity from observed demand, use scaling policies and health checks, and test at production scale rather than guessing peak size.
- Queue-based buffering can decouple incoming bursts from worker capacity; scale consumers based on backlog or workload metrics.
- **See also:** AWS Auto Scaling, Elastic Load Balancing, Amazon SQS

### AWS global infrastructure and Region selection


AWS Regions contain isolated Availability Zones, while edge and extension locations bring selected services closer to users or workloads. Select geography based on workload requirements, not only proximity.

#### What it is
- A **Region** is a separate geographic area; services and features are not available in every Region, and many resource deployments are Region-scoped.
- An **Availability Zone (AZ)** is an isolated location within a Region, composed of one or more data centers; distribute production workloads across AZs for in-Region resilience.
- **Edge locations** serve content and network services close to users, including CloudFront; they are not equivalent to a full Region or AZ.
- **Local Zones** extend selected AWS services nearer to a metropolitan area for latency-sensitive workloads; **Wavelength Zones** place AWS infrastructure in telecommunications networks for low-latency 5G applications.
- **AWS Outposts** provides AWS-managed infrastructure in a customer's facility for local processing, low latency, data residency, or migration needs; customers remain responsible for physical security of the facility and Outposts racks.
- Choose a Region by data residency and legal requirements, proximity and latency, service and feature availability, cost, connectivity, and disaster-recovery strategy.
- **See also:** Amazon CloudFront, AWS Global Accelerator, AWS Outposts

### Caching strategies across AWS services


Caching reduces repeated work and latency by keeping reusable data closer to its consumers. Select a cache based on the content, consistency needs, and layer of the application.

#### What it is
- **Amazon CloudFront** caches HTTP content at edge locations for global delivery; configure cache keys and TTLs, and use invalidations or versioned objects when content changes.
- **API Gateway caching** caches eligible API responses at the API stage for a configured TTL, reducing repeated backend calls; it is not a general-purpose application cache.
- **Amazon ElastiCache** provides managed Redis or Memcached-compatible in-memory caches; application code controls cache keys, population, expiration, and invalidation.
- **DynamoDB Accelerator (DAX)** is an API-compatible, managed in-memory cache for DynamoDB reads; it offers microsecond read latency, caches item and query results, and does not accelerate writes.
- **S3 byte-range requests** retrieve portions of large objects rather than downloading the whole object, useful for parallel downloads or accessing selected ranges; this is partial retrieval, not a cache.
- **AWS Global Accelerator** is not a content cache: it uses static anycast IP addresses and the AWS global network to route traffic to healthy endpoints for performance and availability.
- **See also:** Amazon CloudFront, Amazon API Gateway, Amazon ElastiCache, Amazon DynamoDB, AWS Global Accelerator

### Cost optimization principles


Cost optimization is an ongoing process of matching resources to measured demand and choosing appropriate purchasing and storage models. Include network transfer and operational overhead in total cost.

#### What it is
- **Right-size** compute, databases, and storage from measured utilization; shut down or schedule nonproduction resources that are not needed continuously.
- Match purchasing to workload predictability: On-Demand for flexible or uncertain demand, Spot for fault-tolerant interruptible work, and Savings Plans or Reserved Instances for stable eligible usage.
- Use storage lifecycle policies and tiers that match access frequency, retrieval latency, and retention; avoid paying premium rates for data that is rarely accessed.
- Data transfer **into AWS is generally free**; transfers between resources in the same AZ are generally free when using private addressing, while inter-AZ, inter-Region, and outbound-to-internet transfers can incur charges.
- Compare **NAT Gateway** processing and hourly costs with private service access through VPC endpoints; gateway endpoints for S3 and DynamoDB avoid NAT processing for those destinations, while interface endpoints have their own hourly and data-processing charges.
- Reduce unnecessary cross-AZ and cross-Region traffic, and use CloudFront or regional services when they reduce repeated origin transfer costs.
- Apply consistent **cost allocation tags** and analyze Cost Explorer, Budgets, CUR, and anomaly findings to assign and investigate spend.
- **See also:** AWS cost management tools, AWS Compute Optimizer, Amazon CloudFront

### Serverless architecture patterns


Serverless services remove or abstract server provisioning and scale managed capacity in response to demand; serverless does not mean that applications have no limits, latency, or costs.

#### What it is
- Common serverless building blocks include **AWS Lambda**, API Gateway, DynamoDB, S3, Cognito, SNS, SQS, Kinesis Data Firehose, Step Functions, Aurora Serverless, and AWS Fargate; S3 and DynamoDB are serverless storage services.
- A common REST pattern is client -> API Gateway -> Lambda -> DynamoDB; Cognito can authenticate users and issue temporary credentials for restricted direct access to S3, while a public API may not need Cognito. CloudFront can sit in front for global content delivery, with DAX for DynamoDB reads and API Gateway response caching for repeated API requests.
- Event patterns use EventBridge or S3 events to invoke Lambda; S3 can also notify SQS or SNS. A DynamoDB Stream can invoke Lambda to send a welcome email through SES, generate derived data, or react to item changes.
- Serverless is a strong fit for variable or spiky demand, event-driven processing, and teams that want to focus on application code rather than server maintenance.
- Lambda runs on demand, scales automatically, and charges for requests and compute time, but functions have execution-duration and runtime limits; ECS or Fargate better suits arbitrary long-running container images. Design for quotas, retries, duplicate events, cold starts, observability, and least-privilege execution roles.
- **See also:** AWS Lambda, Amazon API Gateway, Amazon DynamoDB, Amazon S3, Amazon EventBridge

### Static website, three-tier, microservices, and event-driven architectures


Reference architectures combine services into repeatable application patterns. Choose a pattern according to the interaction model, scaling needs, and operational boundaries.

#### What it is
- A **static website** stores HTML, CSS, JavaScript, and assets in S3 and commonly delivers them through CloudFront; Route 53 can provide DNS and HTTPS is configured with an appropriate certificate.
- A **three-tier application** separates presentation, application logic, and data: for example, CloudFront or an ALB for web traffic, EC2/containers/Lambda for application logic, and RDS/Aurora or DynamoDB for data. A classic architecture commonly combines EC2, Elastic Load Balancing, RDS, and ElastiCache.
- A **microservices architecture** divides business capabilities into independently deployable services connected synchronously through API Gateway or load balancers, or asynchronously through SQS, Kinesis, SNS, and Lambda triggers. Each service can use a different architecture, but duplication of operational work, poor server utilization, coordinating versions, and many client integrations add complexity.
- An **event-driven architecture** uses producers, event buses or queues, and consumers; EventBridge routes service or application events, while SQS provides durable buffering and SNS fans notifications out to subscribers.
- A global website can serve static S3 content through CloudFront with Origin Access Control and a bucket policy that permits CloudFront only; a serverless REST API can add API Gateway, Lambda, DynamoDB, and DAX, and DynamoDB Global Tables can serve regional users.
- A **big-data ingestion pattern** can send device events to Kinesis Data Streams, then Firehose for near-real-time delivery (about one minute) to S3; Lambda can transform records, and Athena can query the data with results stored in S3 for QuickSight or Redshift reporting. S3 notifications can route through SQS to Lambda for additional processing.
- A serverless variant commonly combines S3, Lambda, DynamoDB, CloudFront, and API Gateway.
- **See also:** Amazon CloudFront, Amazon S3, Amazon API Gateway, Amazon EventBridge, Amazon SQS
`,_d=Oa(Q.jsx("path",{d:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14"})),Zd=Oa(Q.jsx("path",{d:"M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}));function Cn(e){return typeof e=="string"||typeof e=="number"?String(e):Array.isArray(e)?e.map(Cn).join(""):e&&typeof e=="object"&&"props"in e?Cn(e.props.children):""}function Vr(e){return e?e.type==="text"?e.value??"":(e.children??[]).map(Vr).join(""):""}function $d(e){return e.split(/\r?\n/).map(n=>{const t=n.match(/^(\s*)([-*+]\s+)(.+?)\s*\/\/\s*(.+)$/);if(!t)return n;const[,a,r,o,i]=t;return`${a}${r}**${o.trim()}**

${a}  ${i.trim()}`}).join(`
`)}function Xd(e,n){const t=n.trim().toLowerCase();if(!t)return e;const a=e.split(/\r?\n/),r=[],o=/^([-*+]|\d+\.)\s/;let i=null,s=!1,c=!1,l=null;const d=()=>{if(l){const h=[];let p=null,f=!1,S=!1;for(const w of l.chunks){if(w.kind==="facet"){p=w,f=!1,S=w.lines[0].toLowerCase().includes(t);continue}(l.titleHit||S||w.lines.join(" ").toLowerCase().includes(t))&&(p&&!f&&(h.push(...p.lines,""),f=!0),h.push(...w.lines,""))}h.length>0&&(i&&!s&&(r.push(i,""),s=!0),l.title&&r.push(l.title,""),r.push(...h))}l=null};let u=0;for(;u<a.length;){const h=a[u];if(h.startsWith("## ")){d(),i=h,s=!1,c=h.toLowerCase().includes(t),l={title:null,titleHit:c,chunks:[]},u++;continue}if(h.startsWith("### ")){d(),l={title:h,titleHit:c||h.toLowerCase().includes(t),chunks:[]},u++;continue}if(l&&h.startsWith("#### ")){l.chunks.push({kind:"facet",lines:[h]}),u++;continue}if(l&&o.test(h)){const p=[h];for(u++;u<a.length&&!o.test(a[u])&&!a[u].startsWith("#")&&(/^\s+\S/.test(a[u])||a[u].trim()==="");)p.push(a[u]),u++;l.chunks.push({kind:"entry",lines:p});continue}if(l&&h.trim()!==""){const p=[h];for(u++;u<a.length&&a[u].trim()!==""&&!a[u].startsWith("#")&&!o.test(a[u]);)p.push(a[u]),u++;l.chunks.push({kind:"para",lines:p});continue}u++}return d(),r.join(`
`)}function Ma(e,n){const t=n.trim();if(!t)return e;const a=new RegExp(`(${t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})`,"ig"),r=o=>typeof o=="string"?o.split(a).map((i,s)=>s%2===1?Q.jsx("mark",{style:{background:"#fff176",color:"#000",borderRadius:2},children:i},s):i):Array.isArray(o)?o.map((i,s)=>Q.jsx("span",{style:{display:"contents"},children:r(i)},s)):o;return r(e)}function ep({mode:e,focus:n,restore:t}){const a=e==="saa",r=a?"SAA-C03 Study Guide":"CLF-C02 Study Guide",o=a?Qd:Kd,i=$.useRef(null),[s,c]=$.useState(t?.query??""),l=$.useMemo(()=>Xd(o,s),[o,s]),d=$.useMemo(()=>$d(l),[l]),u=s.trim()!==""&&l.trim()==="";$.useEffect(()=>{const S=i.current;S&&(t?.scroll?window.scrollTo(0,t.scroll):S.querySelector('[data-focus="true"]')?.scrollIntoView({block:"start"}))},[]),$.useEffect(()=>{let S;const w=()=>{window.clearTimeout(S),S=window.setTimeout(()=>Ot({scroll:window.scrollY}),200)};return window.addEventListener("scroll",w,{passive:!0}),()=>{window.clearTimeout(S),window.removeEventListener("scroll",w)}},[]);function h(S){c(S),Ot({query:S,scroll:0}),window.scrollTo(0,0)}const p=n?{h3:({children:S})=>{const w=Cn(S),y=n.sections.includes(w);return Q.jsx("h3",{id:Nt(w),"data-focus":y?"true":void 0,className:y?"studyFocusHeading":void 0,children:S})},li:({node:S,children:w})=>{const k=(S?.children??[]).find(E=>E.type==="element"&&E.tagName==="p")?.children?.find(E=>E.type==="element"&&E.tagName==="strong"),W=!!k&&n.terms.includes(Vr(k).trim());return Q.jsx("li",{className:W?"studyFocusTerm":void 0,children:w})}}:{h3:({children:S})=>Q.jsx("h3",{id:Nt(Cn(S)),children:S})},f=Q.jsxs(Bt,{elevation:0,sx:{display:"flex",alignItems:"center",px:1.5,borderRadius:6,bgcolor:"background.paper"},children:[Q.jsx(_d,{fontSize:"small",color:"action"}),Q.jsx(fi,{type:"search",value:s,onChange:S=>h(S.target.value),placeholder:"Search terms and definitions",slotProps:{input:{"aria-label":"Search the study guide"}},sx:{flex:1,ml:1,py:.5,color:"text.primary","& input:focus::placeholder":{opacity:"0 !important",color:"transparent"},"& input::-webkit-search-cancel-button":{display:"none"}}}),s&&Q.jsx(ii,{size:"small","aria-label":"Clear search",onClick:()=>h(""),children:Q.jsx(Zd,{fontSize:"small"})})]});return Q.jsx(ti,{title:r,extra:f,children:Q.jsx(Bt,{ref:i,sx:S=>({p:{xs:2,sm:3},lineHeight:1.6,"& h2":{fontSize:"1.35rem",mt:3,"&:first-of-type":{mt:0}},"& h3":{fontSize:"1.1rem",mt:3,color:"primary.main",scrollMarginTop:"150px"},"& ul":{pl:2.5},"& li":{mb:1},"& h4":{fontSize:"0.8rem",mt:2.5,mb:.5,color:"text.secondary",textTransform:"uppercase",letterSpacing:"0.06em"},"& li > p":{my:.25},"& h3.studyFocusHeading":{borderLeft:`4px solid ${S.palette.warning.main}`,pl:1.5},"& li.studyFocusTerm":{borderLeft:`4px solid ${S.palette.warning.main}`,bgcolor:ai(S.palette.warning.main,.18),pl:1,listStylePosition:"inside"}}),children:u?Q.jsxs(ri,{children:["No terms match “",s.trim(),"”."]}):Q.jsx(Wc,{remarkPlugins:[Ud],components:{...p,p:({children:S})=>Q.jsx("p",{children:Ma(S,s)}),strong:({children:S})=>Q.jsx("strong",{children:Ma(S,s)})},children:d})})})}export{ep as default};
