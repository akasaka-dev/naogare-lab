(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Pl="185",Ss={ROTATE:0,DOLLY:1,PAN:2},xs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Fd=0,_c=1,Ud=2,jr=1,Od=2,Zs=3,bn=0,jt=1,Ti=2,Zi=0,Ji=1,bs=2,vc=3,xc=4,Bd=5,On=100,zd=101,kd=102,Hd=103,Vd=104,Gd=200,Wd=201,Xd=202,Yd=203,La=204,Ia=205,qd=206,$d=207,Kd=208,Zd=209,Jd=210,Qd=211,jd=212,ef=213,tf=214,Na=0,Fa=1,Ua=2,Es=3,Oa=4,Ba=5,za=6,ka=7,mh=0,nf=1,sf=2,Ri=0,gh=1,_h=2,vh=3,xh=4,Sh=5,yh=6,Mh=7,bh=300,Yn=301,ws=302,Fo=303,Uo=304,yo=306,Ha=1e3,Ki=1001,Va=1002,Ht=1003,rf=1004,xr=1005,Mt=1006,Oo=1007,Hn=1008,ci=1009,Eh=1010,wh=1011,sr=1012,Dl=1013,vi=1014,Oi=1015,xi=1016,Ll=1017,Il=1018,rr=1020,Th=35902,Ah=35899,Ch=1021,Rh=1022,Ci=1023,ji=1026,Vn=1027,Ph=1028,Nl=1029,qn=1030,Fl=1031,Ul=1033,eo=33776,to=33777,io=33778,no=33779,Ga=35840,Wa=35841,Xa=35842,Ya=35843,qa=36196,$a=37492,Ka=37496,Za=37488,Ja=37489,ao=37490,Qa=37491,ja=37808,el=37809,tl=37810,il=37811,nl=37812,sl=37813,rl=37814,ol=37815,al=37816,ll=37817,cl=37818,ul=37819,hl=37820,dl=37821,fl=36492,pl=36494,ml=36495,gl=36283,_l=36284,lo=36285,vl=36286,of=3200,Sc=0,af=1,gn="",si="srgb",co="srgb-linear",uo="linear",rt="srgb",is=7680,yc=519,lf=512,cf=513,uf=514,Ol=515,hf=516,df=517,Bl=518,ff=519,Mc=35044,ni=35048,bc="300 es",Bi=2e3,or=2001;function pf(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function ho(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function mf(){const n=ho("canvas");return n.style.display="block",n}const Ec={};function wc(...n){const e="THREE."+n.shift();console.log(e,...n)}function Dh(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Re(...n){n=Dh(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Ze(...n){n=Dh(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function ys(...n){const e=n.join(" ");e in Ec||(Ec[e]=!0,Re(...n))}function gf(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const _f={[Na]:Fa,[Ua]:za,[Oa]:ka,[Es]:Ba,[Fa]:Na,[za]:Ua,[ka]:Oa,[Ba]:Es};class Tn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const Gt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Tc=1234567;const er=Math.PI/180,ar=180/Math.PI;function Cs(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Gt[n&255]+Gt[n>>8&255]+Gt[n>>16&255]+Gt[n>>24&255]+"-"+Gt[e&255]+Gt[e>>8&255]+"-"+Gt[e>>16&15|64]+Gt[e>>24&255]+"-"+Gt[t&63|128]+Gt[t>>8&255]+"-"+Gt[t>>16&255]+Gt[t>>24&255]+Gt[i&255]+Gt[i>>8&255]+Gt[i>>16&255]+Gt[i>>24&255]).toLowerCase()}function Ge(n,e,t){return Math.max(e,Math.min(t,n))}function zl(n,e){return(n%e+e)%e}function vf(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function xf(n,e,t){return n!==e?(t-n)/(e-n):0}function tr(n,e,t){return(1-t)*n+t*e}function Sf(n,e,t,i){return tr(n,e,1-Math.exp(-t*i))}function yf(n,e=1){return e-Math.abs(zl(n,e*2)-e)}function Mf(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function bf(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function Ef(n,e){return n+Math.floor(Math.random()*(e-n+1))}function wf(n,e){return n+Math.random()*(e-n)}function Tf(n){return n*(.5-Math.random())}function Af(n){n!==void 0&&(Tc=n);let e=Tc+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Cf(n){return n*er}function Rf(n){return n*ar}function Pf(n){return(n&n-1)===0&&n!==0}function Df(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Lf(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function If(n,e,t,i,s){const r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+i)/2),h=o((e+i)/2),d=r((e-i)/2),u=o((e-i)/2),p=r((i-e)/2),g=o((i-e)/2);switch(s){case"XYX":n.set(a*h,l*d,l*u,a*c);break;case"YZY":n.set(l*u,a*h,l*d,a*c);break;case"ZXZ":n.set(l*d,l*u,a*h,a*c);break;case"XZX":n.set(a*h,l*g,l*p,a*c);break;case"YXY":n.set(l*p,a*h,l*g,a*c);break;case"ZYZ":n.set(l*g,l*p,a*h,a*c);break;default:Re("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function vs(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function qt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const _i={DEG2RAD:er,RAD2DEG:ar,generateUUID:Cs,clamp:Ge,euclideanModulo:zl,mapLinear:vf,inverseLerp:xf,lerp:tr,damp:Sf,pingpong:yf,smoothstep:Mf,smootherstep:bf,randInt:Ef,randFloat:wf,randFloatSpread:Tf,seededRandom:Af,degToRad:Cf,radToDeg:Rf,isPowerOfTwo:Pf,ceilPowerOfTwo:Df,floorPowerOfTwo:Lf,setQuaternionFromProperEuler:If,normalize:qt,denormalize:vs};class Ce{static{Ce.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ge(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ge(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*i-o*s+e.x,this.y=r*s+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ki{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,o,a){let l=i[s+0],c=i[s+1],h=i[s+2],d=i[s+3],u=r[o+0],p=r[o+1],g=r[o+2],x=r[o+3];if(d!==x||l!==u||c!==p||h!==g){let m=l*u+c*p+h*g+d*x;m<0&&(u=-u,p=-p,g=-g,x=-x,m=-m);let f=1-a;if(m<.9995){const M=Math.acos(m),E=Math.sin(M);f=Math.sin(f*M)/E,a=Math.sin(a*M)/E,l=l*f+u*a,c=c*f+p*a,h=h*f+g*a,d=d*f+x*a}else{l=l*f+u*a,c=c*f+p*a,h=h*f+g*a,d=d*f+x*a;const M=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=M,c*=M,h*=M,d*=M}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,s,r,o){const a=i[s],l=i[s+1],c=i[s+2],h=i[s+3],d=r[o],u=r[o+1],p=r[o+2],g=r[o+3];return e[t]=a*g+h*d+l*p-c*u,e[t+1]=l*g+h*u+c*d-a*p,e[t+2]=c*g+h*p+a*u-l*d,e[t+3]=h*g-a*d-l*u-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),h=a(s/2),d=a(r/2),u=l(i/2),p=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=u*h*d+c*p*g,this._y=c*p*d-u*h*g,this._z=c*h*g+u*p*d,this._w=c*h*d-u*p*g;break;case"YXZ":this._x=u*h*d+c*p*g,this._y=c*p*d-u*h*g,this._z=c*h*g-u*p*d,this._w=c*h*d+u*p*g;break;case"ZXY":this._x=u*h*d-c*p*g,this._y=c*p*d+u*h*g,this._z=c*h*g+u*p*d,this._w=c*h*d-u*p*g;break;case"ZYX":this._x=u*h*d-c*p*g,this._y=c*p*d+u*h*g,this._z=c*h*g-u*p*d,this._w=c*h*d+u*p*g;break;case"YZX":this._x=u*h*d+c*p*g,this._y=c*p*d+u*h*g,this._z=c*h*g-u*p*d,this._w=c*h*d-u*p*g;break;case"XZY":this._x=u*h*d-c*p*g,this._y=c*p*d-u*h*g,this._z=c*h*g+u*p*d,this._w=c*h*d+u*p*g;break;default:Re("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=i+a+d;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(o-s)*p}else if(i>a&&i>d){const p=2*Math.sqrt(1+i-a-d);this._w=(h-l)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+c)/p}else if(a>d){const p=2*Math.sqrt(1+a-i-d);this._w=(r-c)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+d-i-a);this._w=(o-s)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ge(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=i*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-i*c,this._z=r*h+o*c+i*l-s*a,this._w=o*h-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,o=e._w,a=this.dot(e);a<0&&(i=-i,s=-s,r=-r,o=-o,a=-a);let l=1-t;if(a<.9995){const c=Math.acos(a),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class C{static{C.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ac.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ac.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*i),h=2*(a*t-r*s),d=2*(r*i-o*t);return this.x=t+l*c+o*d-a*h,this.y=i+l*h+a*c-r*d,this.z=s+l*d+r*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this.z=Ge(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this.z=Ge(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ge(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Bo.copy(this).projectOnVector(e),this.sub(Bo)}reflect(e){return this.sub(Bo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ge(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Bo=new C,Ac=new ki;class Ue{static{Ue.prototype.isMatrix3=!0}constructor(e,t,i,s,r,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,l,c)}set(e,t,i,s,r,o,a,l,c){const h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=i,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],h=i[4],d=i[7],u=i[2],p=i[5],g=i[8],x=s[0],m=s[3],f=s[6],M=s[1],E=s[4],y=s[7],w=s[2],A=s[5],R=s[8];return r[0]=o*x+a*M+l*w,r[3]=o*m+a*E+l*A,r[6]=o*f+a*y+l*R,r[1]=c*x+h*M+d*w,r[4]=c*m+h*E+d*A,r[7]=c*f+h*y+d*R,r[2]=u*x+p*M+g*w,r[5]=u*m+p*E+g*A,r[8]=u*f+p*y+g*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-i*r*h+i*a*l+s*r*c-s*o*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],d=h*o-a*c,u=a*l-h*r,p=c*r-o*l,g=t*d+i*u+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return e[0]=d*x,e[1]=(s*c-h*i)*x,e[2]=(a*i-s*o)*x,e[3]=u*x,e[4]=(h*t-s*l)*x,e[5]=(s*r-a*t)*x,e[6]=p*x,e[7]=(i*l-c*t)*x,e[8]=(o*t-i*r)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return ys("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(zo.makeScale(e,t)),this}rotate(e){return ys("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(zo.makeRotation(-e)),this}translate(e,t){return ys("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(zo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const zo=new Ue,Cc=new Ue().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Rc=new Ue().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Nf(){const n={enabled:!0,workingColorSpace:co,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===rt&&(s.r=Qi(s.r),s.g=Qi(s.g),s.b=Qi(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===rt&&(s.r=Ms(s.r),s.g=Ms(s.g),s.b=Ms(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===gn?uo:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return ys("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return ys("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[co]:{primaries:e,whitePoint:i,transfer:uo,toXYZ:Cc,fromXYZ:Rc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:si},outputColorSpaceConfig:{drawingBufferColorSpace:si}},[si]:{primaries:e,whitePoint:i,transfer:rt,toXYZ:Cc,fromXYZ:Rc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:si}}}),n}const Ye=Nf();function Qi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ms(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ns;class Ff{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{ns===void 0&&(ns=ho("canvas")),ns.width=e.width,ns.height=e.height;const s=ns.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=ns}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ho("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Qi(r[o]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Qi(t[i]/255)*255):t[i]=Qi(t[i]);return{data:t,width:e.width,height:e.height}}else return Re("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Uf=0;class kl{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Uf++}),this.uuid=Cs(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(ko(s[o].image)):r.push(ko(s[o]))}else r=ko(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function ko(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Ff.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Re("Texture: Unable to serialize Texture."),{})}let Of=0;const Ho=new C;class Xt extends Tn{constructor(e=Xt.DEFAULT_IMAGE,t=Xt.DEFAULT_MAPPING,i=Ki,s=Ki,r=Mt,o=Hn,a=Ci,l=ci,c=Xt.DEFAULT_ANISOTROPY,h=gn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Of++}),this.uuid=Cs(),this.name="",this.source=new kl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ce(0,0),this.repeat=new Ce(1,1),this.center=new Ce(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ue,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ho).x}get height(){return this.source.getSize(Ho).y}get depth(){return this.source.getSize(Ho).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Re(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Re(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==bh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ha:e.x=e.x-Math.floor(e.x);break;case Ki:e.x=e.x<0?0:1;break;case Va:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ha:e.y=e.y-Math.floor(e.y);break;case Ki:e.y=e.y<0?0:1;break;case Va:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Xt.DEFAULT_IMAGE=null;Xt.DEFAULT_MAPPING=bh;Xt.DEFAULT_ANISOTROPY=1;class _t{static{_t.prototype.isVector4=!0}constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*i+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],p=l[5],g=l[9],x=l[2],m=l[6],f=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(c+1)/2,y=(p+1)/2,w=(f+1)/2,A=(h+u)/4,R=(d+x)/4,v=(g+m)/4;return E>y&&E>w?E<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(E),s=A/i,r=R/i):y>w?y<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),i=A/s,r=v/s):w<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),i=R/r,s=v/r),this.set(i,s,r,t),this}let M=Math.sqrt((m-g)*(m-g)+(d-x)*(d-x)+(u-h)*(u-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(d-x)/M,this.z=(u-h)/M,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this.z=Ge(this.z,e.z,t.z),this.w=Ge(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this.z=Ge(this.z,e,t),this.w=Ge(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ge(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Bf extends Tn{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Mt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new _t(0,0,e,t),this.scissorTest=!1,this.viewport=new _t(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:i.depth},r=new Xt(s),o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Mt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new kl(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ui extends Bf{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Lh extends Xt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Ht,this.minFilter=Ht,this.wrapR=Ki,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class zf extends Xt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Ht,this.minFilter=Ht,this.wrapR=Ki,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class qe{static{qe.prototype.isMatrix4=!0}constructor(e,t,i,s,r,o,a,l,c,h,d,u,p,g,x,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,l,c,h,d,u,p,g,x,m)}set(e,t,i,s,r,o,a,l,c,h,d,u,p,g,x,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=i,f[12]=s,f[1]=r,f[5]=o,f[9]=a,f[13]=l,f[2]=c,f[6]=h,f[10]=d,f[14]=u,f[3]=p,f[7]=g,f[11]=x,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new qe().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,s=1/ss.setFromMatrixColumn(e,0).length(),r=1/ss.setFromMatrixColumn(e,1).length(),o=1/ss.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const u=o*h,p=o*d,g=a*h,x=a*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=p+g*c,t[5]=u-x*c,t[9]=-a*l,t[2]=x-u*c,t[6]=g+p*c,t[10]=o*l}else if(e.order==="YXZ"){const u=l*h,p=l*d,g=c*h,x=c*d;t[0]=u+x*a,t[4]=g*a-p,t[8]=o*c,t[1]=o*d,t[5]=o*h,t[9]=-a,t[2]=p*a-g,t[6]=x+u*a,t[10]=o*l}else if(e.order==="ZXY"){const u=l*h,p=l*d,g=c*h,x=c*d;t[0]=u-x*a,t[4]=-o*d,t[8]=g+p*a,t[1]=p+g*a,t[5]=o*h,t[9]=x-u*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const u=o*h,p=o*d,g=a*h,x=a*d;t[0]=l*h,t[4]=g*c-p,t[8]=u*c+x,t[1]=l*d,t[5]=x*c+u,t[9]=p*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const u=o*l,p=o*c,g=a*l,x=a*c;t[0]=l*h,t[4]=x-u*d,t[8]=g*d+p,t[1]=d,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=p*d+g,t[10]=u-x*d}else if(e.order==="XZY"){const u=o*l,p=o*c,g=a*l,x=a*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+x,t[5]=o*h,t[9]=p*d-g,t[2]=g*d-p,t[6]=a*h,t[10]=x*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(kf,e,Hf)}lookAt(e,t,i){const s=this.elements;return ai.subVectors(e,t),ai.lengthSq()===0&&(ai.z=1),ai.normalize(),an.crossVectors(i,ai),an.lengthSq()===0&&(Math.abs(i.z)===1?ai.x+=1e-4:ai.z+=1e-4,ai.normalize(),an.crossVectors(i,ai)),an.normalize(),Sr.crossVectors(ai,an),s[0]=an.x,s[4]=Sr.x,s[8]=ai.x,s[1]=an.y,s[5]=Sr.y,s[9]=ai.y,s[2]=an.z,s[6]=Sr.z,s[10]=ai.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],h=i[1],d=i[5],u=i[9],p=i[13],g=i[2],x=i[6],m=i[10],f=i[14],M=i[3],E=i[7],y=i[11],w=i[15],A=s[0],R=s[4],v=s[8],T=s[12],D=s[1],P=s[5],F=s[9],G=s[13],Z=s[2],O=s[6],Y=s[10],z=s[14],J=s[3],j=s[7],ce=s[11],fe=s[15];return r[0]=o*A+a*D+l*Z+c*J,r[4]=o*R+a*P+l*O+c*j,r[8]=o*v+a*F+l*Y+c*ce,r[12]=o*T+a*G+l*z+c*fe,r[1]=h*A+d*D+u*Z+p*J,r[5]=h*R+d*P+u*O+p*j,r[9]=h*v+d*F+u*Y+p*ce,r[13]=h*T+d*G+u*z+p*fe,r[2]=g*A+x*D+m*Z+f*J,r[6]=g*R+x*P+m*O+f*j,r[10]=g*v+x*F+m*Y+f*ce,r[14]=g*T+x*G+m*z+f*fe,r[3]=M*A+E*D+y*Z+w*J,r[7]=M*R+E*P+y*O+w*j,r[11]=M*v+E*F+y*Y+w*ce,r[15]=M*T+E*G+y*z+w*fe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],p=e[14],g=e[3],x=e[7],m=e[11],f=e[15],M=l*p-c*u,E=a*p-c*d,y=a*u-l*d,w=o*p-c*h,A=o*u-l*h,R=o*d-a*h;return t*(x*M-m*E+f*y)-i*(g*M-m*w+f*A)+s*(g*E-x*w+f*R)-r*(g*y-x*A+m*R)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],o=e[5],a=e[9],l=e[2],c=e[6],h=e[10];return t*(o*h-a*c)-i*(r*h-a*l)+s*(r*c-o*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],p=e[11],g=e[12],x=e[13],m=e[14],f=e[15],M=t*a-i*o,E=t*l-s*o,y=t*c-r*o,w=i*l-s*a,A=i*c-r*a,R=s*c-r*l,v=h*x-d*g,T=h*m-u*g,D=h*f-p*g,P=d*m-u*x,F=d*f-p*x,G=u*f-p*m,Z=M*G-E*F+y*P+w*D-A*T+R*v;if(Z===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const O=1/Z;return e[0]=(a*G-l*F+c*P)*O,e[1]=(s*F-i*G-r*P)*O,e[2]=(x*R-m*A+f*w)*O,e[3]=(u*A-d*R-p*w)*O,e[4]=(l*D-o*G-c*T)*O,e[5]=(t*G-s*D+r*T)*O,e[6]=(m*y-g*R-f*E)*O,e[7]=(h*R-u*y+p*E)*O,e[8]=(o*F-a*D+c*v)*O,e[9]=(i*D-t*F-r*v)*O,e[10]=(g*A-x*y+f*M)*O,e[11]=(d*y-h*A-p*M)*O,e[12]=(a*T-o*P-l*v)*O,e[13]=(t*P-i*T+s*v)*O,e[14]=(x*E-g*w-m*M)*O,e[15]=(h*w-d*E+u*M)*O,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+i,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,o){return this.set(1,i,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,d=a+a,u=r*c,p=r*h,g=r*d,x=o*h,m=o*d,f=a*d,M=l*c,E=l*h,y=l*d,w=i.x,A=i.y,R=i.z;return s[0]=(1-(x+f))*w,s[1]=(p+y)*w,s[2]=(g-E)*w,s[3]=0,s[4]=(p-y)*A,s[5]=(1-(u+f))*A,s[6]=(m+M)*A,s[7]=0,s[8]=(g+E)*R,s[9]=(m-M)*R,s[10]=(1-(u+x))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let o=ss.set(s[0],s[1],s[2]).length();const a=ss.set(s[4],s[5],s[6]).length(),l=ss.set(s[8],s[9],s[10]).length();r<0&&(o=-o),yi.copy(this);const c=1/o,h=1/a,d=1/l;return yi.elements[0]*=c,yi.elements[1]*=c,yi.elements[2]*=c,yi.elements[4]*=h,yi.elements[5]*=h,yi.elements[6]*=h,yi.elements[8]*=d,yi.elements[9]*=d,yi.elements[10]*=d,t.setFromRotationMatrix(yi),i.x=o,i.y=a,i.z=l,this}makePerspective(e,t,i,s,r,o,a=Bi,l=!1){const c=this.elements,h=2*r/(t-e),d=2*r/(i-s),u=(t+e)/(t-e),p=(i+s)/(i-s);let g,x;if(l)g=r/(o-r),x=o*r/(o-r);else if(a===Bi)g=-(o+r)/(o-r),x=-2*o*r/(o-r);else if(a===or)g=-o/(o-r),x=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,o,a=Bi,l=!1){const c=this.elements,h=2/(t-e),d=2/(i-s),u=-(t+e)/(t-e),p=-(i+s)/(i-s);let g,x;if(l)g=1/(o-r),x=o/(o-r);else if(a===Bi)g=-2/(o-r),x=-(o+r)/(o-r);else if(a===or)g=-1/(o-r),x=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const ss=new C,yi=new qe,kf=new C(0,0,0),Hf=new C(1,1,1),an=new C,Sr=new C,ai=new C,Pc=new qe,Dc=new ki;class $n{constructor(e=0,t=0,i=0,s=$n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(Ge(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ge(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ge(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ge(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ge(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Ge(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:Re("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Pc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Pc,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Dc.setFromEuler(this),this.setFromQuaternion(Dc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}$n.DEFAULT_ORDER="XYZ";class Ih{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Vf=0;const Lc=new C,rs=new ki,Vi=new qe,yr=new C,Ns=new C,Gf=new C,Wf=new ki,Ic=new C(1,0,0),Nc=new C(0,1,0),Fc=new C(0,0,1),Uc={type:"added"},Xf={type:"removed"},os={type:"childadded",child:null},Vo={type:"childremoved",child:null};class Lt extends Tn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Vf++}),this.uuid=Cs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Lt.DEFAULT_UP.clone();const e=new C,t=new $n,i=new ki,s=new C(1,1,1);function r(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new qe},normalMatrix:{value:new Ue}}),this.matrix=new qe,this.matrixWorld=new qe,this.matrixAutoUpdate=Lt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ih,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return rs.setFromAxisAngle(e,t),this.quaternion.multiply(rs),this}rotateOnWorldAxis(e,t){return rs.setFromAxisAngle(e,t),this.quaternion.premultiply(rs),this}rotateX(e){return this.rotateOnAxis(Ic,e)}rotateY(e){return this.rotateOnAxis(Nc,e)}rotateZ(e){return this.rotateOnAxis(Fc,e)}translateOnAxis(e,t){return Lc.copy(e).applyQuaternion(this.quaternion),this.position.add(Lc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ic,e)}translateY(e){return this.translateOnAxis(Nc,e)}translateZ(e){return this.translateOnAxis(Fc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Vi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?yr.copy(e):yr.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Ns.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Vi.lookAt(Ns,yr,this.up):Vi.lookAt(yr,Ns,this.up),this.quaternion.setFromRotationMatrix(Vi),s&&(Vi.extractRotation(s.matrixWorld),rs.setFromRotationMatrix(Vi),this.quaternion.premultiply(rs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ze("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Uc),os.child=e,this.dispatchEvent(os),os.child=null):Ze("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Xf),Vo.child=e,this.dispatchEvent(Vo),Vo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Vi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Vi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Vi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Uc),os.child=e,this.dispatchEvent(os),os.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ns,e,Gf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ns,Wf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),d=o(e.shapes),u=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=s,i;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}Lt.DEFAULT_UP=new C(0,1,0);Lt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Mr extends Lt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Yf={type:"move"};class Go{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Mr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Mr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Mr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const x of e.hand.values()){const m=t.getJointPose(x,i),f=this._getHandJoint(c,x);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),p=.02,g=.005;c.inputState.pinching&&u>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Yf)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Mr;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Nh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ln={h:0,s:0,l:0},br={h:0,s:0,l:0};function Wo(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class de{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=si){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ye.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=Ye.workingColorSpace){return this.r=e,this.g=t,this.b=i,Ye.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=Ye.workingColorSpace){if(e=zl(e,1),t=Ge(t,0,1),i=Ge(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,o=2*i-r;this.r=Wo(o,r,e+1/3),this.g=Wo(o,r,e),this.b=Wo(o,r,e-1/3)}return Ye.colorSpaceToWorking(this,s),this}setStyle(e,t=si){function i(r){r!==void 0&&parseFloat(r)<1&&Re("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Re("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);Re("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=si){const i=Nh[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Re("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Qi(e.r),this.g=Qi(e.g),this.b=Qi(e.b),this}copyLinearToSRGB(e){return this.r=Ms(e.r),this.g=Ms(e.g),this.b=Ms(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=si){return Ye.workingToColorSpace(Wt.copy(this),e),Math.round(Ge(Wt.r*255,0,255))*65536+Math.round(Ge(Wt.g*255,0,255))*256+Math.round(Ge(Wt.b*255,0,255))}getHexString(e=si){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ye.workingColorSpace){Ye.workingToColorSpace(Wt.copy(this),t);const i=Wt.r,s=Wt.g,r=Wt.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=h<=.5?d/(o+a):d/(2-o-a),o){case i:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-i)/d+2;break;case r:l=(i-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Ye.workingColorSpace){return Ye.workingToColorSpace(Wt.copy(this),t),e.r=Wt.r,e.g=Wt.g,e.b=Wt.b,e}getStyle(e=si){Ye.workingToColorSpace(Wt.copy(this),e);const t=Wt.r,i=Wt.g,s=Wt.b;return e!==si?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(ln),this.setHSL(ln.h+e,ln.s+t,ln.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(ln),e.getHSL(br);const i=tr(ln.h,br.h,t),s=tr(ln.s,br.s,t),r=tr(ln.l,br.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Wt=new de;de.NAMES=Nh;class qf extends Lt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new $n,this.environmentIntensity=1,this.environmentRotation=new $n,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Mi=new C,Gi=new C,Xo=new C,Wi=new C,as=new C,ls=new C,Oc=new C,Yo=new C,qo=new C,$o=new C,Ko=new _t,Zo=new _t,Jo=new _t;class Ai{constructor(e=new C,t=new C,i=new C){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Mi.subVectors(e,t),s.cross(Mi);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Mi.subVectors(s,t),Gi.subVectors(i,t),Xo.subVectors(e,t);const o=Mi.dot(Mi),a=Mi.dot(Gi),l=Mi.dot(Xo),c=Gi.dot(Gi),h=Gi.dot(Xo),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;const u=1/d,p=(c*l-a*h)*u,g=(o*h-a*l)*u;return r.set(1-p-g,g,p)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,Wi)===null?!1:Wi.x>=0&&Wi.y>=0&&Wi.x+Wi.y<=1}static getInterpolation(e,t,i,s,r,o,a,l){return this.getBarycoord(e,t,i,s,Wi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Wi.x),l.addScaledVector(o,Wi.y),l.addScaledVector(a,Wi.z),l)}static getInterpolatedAttribute(e,t,i,s,r,o){return Ko.setScalar(0),Zo.setScalar(0),Jo.setScalar(0),Ko.fromBufferAttribute(e,t),Zo.fromBufferAttribute(e,i),Jo.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Ko,r.x),o.addScaledVector(Zo,r.y),o.addScaledVector(Jo,r.z),o}static isFrontFacing(e,t,i,s){return Mi.subVectors(i,t),Gi.subVectors(e,t),Mi.cross(Gi).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Mi.subVectors(this.c,this.b),Gi.subVectors(this.a,this.b),Mi.cross(Gi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ai.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Ai.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return Ai.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return Ai.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ai.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let o,a;as.subVectors(s,i),ls.subVectors(r,i),Yo.subVectors(e,i);const l=as.dot(Yo),c=ls.dot(Yo);if(l<=0&&c<=0)return t.copy(i);qo.subVectors(e,s);const h=as.dot(qo),d=ls.dot(qo);if(h>=0&&d<=h)return t.copy(s);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(i).addScaledVector(as,o);$o.subVectors(e,r);const p=as.dot($o),g=ls.dot($o);if(g>=0&&p<=g)return t.copy(r);const x=p*c-l*g;if(x<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(i).addScaledVector(ls,a);const m=h*g-p*d;if(m<=0&&d-h>=0&&p-g>=0)return Oc.subVectors(r,s),a=(d-h)/(d-h+(p-g)),t.copy(s).addScaledVector(Oc,a);const f=1/(m+x+u);return o=x*f,a=u*f,t.copy(i).addScaledVector(as,o).addScaledVector(ls,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class pr{constructor(e=new C(1/0,1/0,1/0),t=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(bi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(bi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=bi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,bi):bi.fromBufferAttribute(r,o),bi.applyMatrix4(e.matrixWorld),this.expandByPoint(bi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Er.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Er.copy(i.boundingBox)),Er.applyMatrix4(e.matrixWorld),this.union(Er)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,bi),bi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Fs),wr.subVectors(this.max,Fs),cs.subVectors(e.a,Fs),us.subVectors(e.b,Fs),hs.subVectors(e.c,Fs),cn.subVectors(us,cs),un.subVectors(hs,us),Dn.subVectors(cs,hs);let t=[0,-cn.z,cn.y,0,-un.z,un.y,0,-Dn.z,Dn.y,cn.z,0,-cn.x,un.z,0,-un.x,Dn.z,0,-Dn.x,-cn.y,cn.x,0,-un.y,un.x,0,-Dn.y,Dn.x,0];return!Qo(t,cs,us,hs,wr)||(t=[1,0,0,0,1,0,0,0,1],!Qo(t,cs,us,hs,wr))?!1:(Tr.crossVectors(cn,un),t=[Tr.x,Tr.y,Tr.z],Qo(t,cs,us,hs,wr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,bi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(bi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Xi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Xi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Xi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Xi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Xi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Xi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Xi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Xi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Xi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Xi=[new C,new C,new C,new C,new C,new C,new C,new C],bi=new C,Er=new pr,cs=new C,us=new C,hs=new C,cn=new C,un=new C,Dn=new C,Fs=new C,wr=new C,Tr=new C,Ln=new C;function Qo(n,e,t,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){Ln.fromArray(n,r);const a=s.x*Math.abs(Ln.x)+s.y*Math.abs(Ln.y)+s.z*Math.abs(Ln.z),l=e.dot(Ln),c=t.dot(Ln),h=i.dot(Ln);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const Ct=new C,Ar=new Ce;let $f=0;class je extends Tn{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:$f++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Mc,this.updateRanges=[],this.gpuType=Oi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Ar.fromBufferAttribute(this,t),Ar.applyMatrix3(e),this.setXY(t,Ar.x,Ar.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Ct.fromBufferAttribute(this,t),Ct.applyMatrix3(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Ct.fromBufferAttribute(this,t),Ct.applyMatrix4(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Ct.fromBufferAttribute(this,t),Ct.applyNormalMatrix(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Ct.fromBufferAttribute(this,t),Ct.transformDirection(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=vs(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=qt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=vs(t,this.array)),t}setX(e,t){return this.normalized&&(t=qt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=vs(t,this.array)),t}setY(e,t){return this.normalized&&(t=qt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=vs(t,this.array)),t}setZ(e,t){return this.normalized&&(t=qt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=vs(t,this.array)),t}setW(e,t){return this.normalized&&(t=qt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=qt(t,this.array),i=qt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=qt(t,this.array),i=qt(i,this.array),s=qt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=qt(t,this.array),i=qt(i,this.array),s=qt(s,this.array),r=qt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Mc&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class Fh extends je{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Uh extends je{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Yt extends je{constructor(e,t,i){super(new Float32Array(e),t,i)}}const Kf=new pr,Us=new C,jo=new C;class mr{constructor(e=new C,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Kf.setFromPoints(e).getCenter(i);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Us.subVectors(e,this.center);const t=Us.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Us,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(jo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Us.copy(e.center).add(jo)),this.expandByPoint(Us.copy(e.center).sub(jo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Zf=0;const pi=new qe,ea=new Lt,ds=new C,li=new pr,Os=new pr,Ot=new C;class It extends Tn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Zf++}),this.uuid=Cs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(pf(e)?Uh:Fh)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Ue().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return pi.makeRotationFromQuaternion(e),this.applyMatrix4(pi),this}rotateX(e){return pi.makeRotationX(e),this.applyMatrix4(pi),this}rotateY(e){return pi.makeRotationY(e),this.applyMatrix4(pi),this}rotateZ(e){return pi.makeRotationZ(e),this.applyMatrix4(pi),this}translate(e,t,i){return pi.makeTranslation(e,t,i),this.applyMatrix4(pi),this}scale(e,t,i){return pi.makeScale(e,t,i),this.applyMatrix4(pi),this}lookAt(e){return ea.lookAt(e),ea.updateMatrix(),this.applyMatrix4(ea.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ds).negate(),this.translate(ds.x,ds.y,ds.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Yt(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Re("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new pr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ze("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];li.setFromBufferAttribute(r),this.morphTargetsRelative?(Ot.addVectors(this.boundingBox.min,li.min),this.boundingBox.expandByPoint(Ot),Ot.addVectors(this.boundingBox.max,li.max),this.boundingBox.expandByPoint(Ot)):(this.boundingBox.expandByPoint(li.min),this.boundingBox.expandByPoint(li.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ze('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new mr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ze("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(e){const i=this.boundingSphere.center;if(li.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];Os.setFromBufferAttribute(a),this.morphTargetsRelative?(Ot.addVectors(li.min,Os.min),li.expandByPoint(Ot),Ot.addVectors(li.max,Os.max),li.expandByPoint(Ot)):(li.expandByPoint(Os.min),li.expandByPoint(Os.max))}li.getCenter(i);let s=0;for(let r=0,o=e.count;r<o;r++)Ot.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Ot));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Ot.fromBufferAttribute(a,c),l&&(ds.fromBufferAttribute(e,c),Ot.add(ds)),s=Math.max(s,i.distanceToSquared(Ot))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ze('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ze("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;let o=this.getAttribute("tangent");(o===void 0||o.count!==i.count)&&(o=new je(new Float32Array(4*i.count),4),this.setAttribute("tangent",o));const a=[],l=[];for(let v=0;v<i.count;v++)a[v]=new C,l[v]=new C;const c=new C,h=new C,d=new C,u=new Ce,p=new Ce,g=new Ce,x=new C,m=new C;function f(v,T,D){c.fromBufferAttribute(i,v),h.fromBufferAttribute(i,T),d.fromBufferAttribute(i,D),u.fromBufferAttribute(r,v),p.fromBufferAttribute(r,T),g.fromBufferAttribute(r,D),h.sub(c),d.sub(c),p.sub(u),g.sub(u);const P=1/(p.x*g.y-g.x*p.y);isFinite(P)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(P),m.copy(d).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(P),a[v].add(x),a[T].add(x),a[D].add(x),l[v].add(m),l[T].add(m),l[D].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let v=0,T=M.length;v<T;++v){const D=M[v],P=D.start,F=D.count;for(let G=P,Z=P+F;G<Z;G+=3)f(e.getX(G+0),e.getX(G+1),e.getX(G+2))}const E=new C,y=new C,w=new C,A=new C;function R(v){w.fromBufferAttribute(s,v),A.copy(w);const T=a[v];E.copy(T),E.sub(w.multiplyScalar(w.dot(T))).normalize(),y.crossVectors(A,T);const P=y.dot(l[v])<0?-1:1;o.setXYZW(v,E.x,E.y,E.z,P)}for(let v=0,T=M.length;v<T;++v){const D=M[v],P=D.start,F=D.count;for(let G=P,Z=P+F;G<Z;G+=3)R(e.getX(G+0)),R(e.getX(G+1)),R(e.getX(G+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new je(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,p=i.count;u<p;u++)i.setXYZ(u,0,0,0);const s=new C,r=new C,o=new C,a=new C,l=new C,c=new C,h=new C,d=new C;if(e)for(let u=0,p=e.count;u<p;u+=3){const g=e.getX(u+0),x=e.getX(u+1),m=e.getX(u+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,x),o.fromBufferAttribute(t,m),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,m),a.add(h),l.add(h),c.add(h),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,p=t.count;u<p;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),o.fromBufferAttribute(t,u+2),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Ot.fromBufferAttribute(e,t),Ot.normalize(),e.setXYZ(t,Ot.x,Ot.y,Ot.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,d=a.normalized,u=new c.constructor(l.length*h);let p=0,g=0;for(let x=0,m=l.length;x<m;x++){a.isInterleavedBufferAttribute?p=l[x]*a.data.stride+a.offset:p=l[x]*h;for(let f=0;f<h;f++)u[g++]=c[p++]}return new je(u,h,d)}if(this.index===null)return Re("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new It,i=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=e(l,i);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,d=c.length;h<d;h++){const u=c[h],p=e(u,i);l.push(p)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const p=c[d];h.push(p.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],d=r[c];for(let u=0,p=d.length;u<p;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,h=o.length;c<h;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let Jf=0;class Rs extends Tn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Jf++}),this.uuid=Cs(),this.name="",this.type="Material",this.blending=Ji,this.side=bn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=La,this.blendDst=Ia,this.blendEquation=On,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new de(0,0,0),this.blendAlpha=0,this.depthFunc=Es,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=yc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=is,this.stencilZFail=is,this.stencilZPass=is,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Re(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Re(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ji&&(i.blending=this.blending),this.side!==bn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==La&&(i.blendSrc=this.blendSrc),this.blendDst!==Ia&&(i.blendDst=this.blendDst),this.blendEquation!==On&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Es&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==yc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==is&&(i.stencilFail=this.stencilFail),this.stencilZFail!==is&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==is&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new de().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Ce().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ce().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Yi=new C,ta=new C,Cr=new C,hn=new C,ia=new C,Rr=new C,na=new C;class Mo{constructor(e=new C,t=new C(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Yi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Yi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Yi.copy(this.origin).addScaledVector(this.direction,t),Yi.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){ta.copy(e).add(t).multiplyScalar(.5),Cr.copy(t).sub(e).normalize(),hn.copy(this.origin).sub(ta);const r=e.distanceTo(t)*.5,o=-this.direction.dot(Cr),a=hn.dot(this.direction),l=-hn.dot(Cr),c=hn.lengthSq(),h=Math.abs(1-o*o);let d,u,p,g;if(h>0)if(d=o*l-a,u=o*a-l,g=r*h,d>=0)if(u>=-g)if(u<=g){const x=1/h;d*=x,u*=x,p=d*(d+o*u+2*a)+u*(o*d+u+2*l)+c}else u=r,d=Math.max(0,-(o*u+a)),p=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(o*u+a)),p=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-o*r+a)),u=d>0?-r:Math.min(Math.max(-r,-l),r),p=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-r,-l),r),p=u*(u+2*l)+c):(d=Math.max(0,-(o*r+a)),u=d>0?r:Math.min(Math.max(-r,-l),r),p=-d*d+u*(u+2*l)+c);else u=o>0?-r:r,d=Math.max(0,-(o*u+a)),p=-d*d+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(ta).addScaledVector(Cr,u),p}intersectSphere(e,t){Yi.subVectors(e.center,this.origin);const i=Yi.dot(this.direction),s=Yi.dot(Yi)-i*i,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(i=(e.min.x-u.x)*c,s=(e.max.x-u.x)*c):(i=(e.max.x-u.x)*c,s=(e.min.x-u.x)*c),h>=0?(r=(e.min.y-u.y)*h,o=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,o=(e.min.y-u.y)*h),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(a=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,Yi)!==null}intersectTriangle(e,t,i,s,r){ia.subVectors(t,e),Rr.subVectors(i,e),na.crossVectors(ia,Rr);let o=this.direction.dot(na),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;hn.subVectors(this.origin,e);const l=a*this.direction.dot(Rr.crossVectors(hn,Rr));if(l<0)return null;const c=a*this.direction.dot(ia.cross(hn));if(c<0||l+c>o)return null;const h=-a*hn.dot(na);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Hl extends Rs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new de(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $n,this.combine=mh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Bc=new qe,In=new Mo,Pr=new mr,zc=new C,Dr=new C,Lr=new C,Ir=new C,sa=new C,Nr=new C,kc=new C,Fr=new C;class ei extends Lt{constructor(e=new It,t=new Hl){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){Nr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],d=r[l];h!==0&&(sa.fromBufferAttribute(d,e),o?Nr.addScaledVector(sa,h):Nr.addScaledVector(sa.sub(t),h))}t.add(Nr)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Pr.copy(i.boundingSphere),Pr.applyMatrix4(r),In.copy(e.ray).recast(e.near),!(Pr.containsPoint(In.origin)===!1&&(In.intersectSphere(Pr,zc)===null||In.origin.distanceToSquared(zc)>(e.far-e.near)**2))&&(Bc.copy(r).invert(),In.copy(e.ray).applyMatrix4(Bc),!(i.boundingBox!==null&&In.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,In)))}_computeIntersections(e,t,i){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=u.length;g<x;g++){const m=u[g],f=o[m.materialIndex],M=Math.max(m.start,p.start),E=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let y=M,w=E;y<w;y+=3){const A=a.getX(y),R=a.getX(y+1),v=a.getX(y+2);s=Ur(this,f,e,i,c,h,d,A,R,v),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),x=Math.min(a.count,p.start+p.count);for(let m=g,f=x;m<f;m+=3){const M=a.getX(m),E=a.getX(m+1),y=a.getX(m+2);s=Ur(this,o,e,i,c,h,d,M,E,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,x=u.length;g<x;g++){const m=u[g],f=o[m.materialIndex],M=Math.max(m.start,p.start),E=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let y=M,w=E;y<w;y+=3){const A=y,R=y+1,v=y+2;s=Ur(this,f,e,i,c,h,d,A,R,v),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let m=g,f=x;m<f;m+=3){const M=m,E=m+1,y=m+2;s=Ur(this,o,e,i,c,h,d,M,E,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Qf(n,e,t,i,s,r,o,a){let l;if(e.side===jt?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,e.side===bn,a),l===null)return null;Fr.copy(a),Fr.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Fr);return c<t.near||c>t.far?null:{distance:c,point:Fr.clone(),object:n}}function Ur(n,e,t,i,s,r,o,a,l,c){n.getVertexPosition(a,Dr),n.getVertexPosition(l,Lr),n.getVertexPosition(c,Ir);const h=Qf(n,e,t,i,Dr,Lr,Ir,kc);if(h){const d=new C;Ai.getBarycoord(kc,Dr,Lr,Ir,d),s&&(h.uv=Ai.getInterpolatedAttribute(s,a,l,c,d,new Ce)),r&&(h.uv1=Ai.getInterpolatedAttribute(r,a,l,c,d,new Ce)),o&&(h.normal=Ai.getInterpolatedAttribute(o,a,l,c,d,new C),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:l,c,normal:new C,materialIndex:0};Ai.getNormal(Dr,Lr,Ir,u.normal),h.face=u,h.barycoord=d}return h}class jf extends Xt{constructor(e=null,t=1,i=1,s,r,o,a,l,c=Ht,h=Ht,d,u){super(null,o,a,l,c,h,s,r,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ra=new C,ep=new C,tp=new Ue;class pn{constructor(e=new C(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=ra.subVectors(i,t).cross(ep.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const s=e.delta(ra),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(s,o)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||tp.getNormalMatrix(e),s=this.coplanarPoint(ra).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Nn=new mr,ip=new Ce(.5,.5),Or=new C;class Vl{constructor(e=new pn,t=new pn,i=new pn,s=new pn,r=new pn,o=new pn){this.planes=[e,t,i,s,r,o]}set(e,t,i,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Bi,i=!1){const s=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],p=r[7],g=r[8],x=r[9],m=r[10],f=r[11],M=r[12],E=r[13],y=r[14],w=r[15];if(s[0].setComponents(c-o,p-h,f-g,w-M).normalize(),s[1].setComponents(c+o,p+h,f+g,w+M).normalize(),s[2].setComponents(c+a,p+d,f+x,w+E).normalize(),s[3].setComponents(c-a,p-d,f-x,w-E).normalize(),i)s[4].setComponents(l,u,m,y).normalize(),s[5].setComponents(c-l,p-u,f-m,w-y).normalize();else if(s[4].setComponents(c-l,p-u,f-m,w-y).normalize(),t===Bi)s[5].setComponents(c+l,p+u,f+m,w+y).normalize();else if(t===or)s[5].setComponents(l,u,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Nn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Nn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Nn)}intersectsSprite(e){Nn.center.set(0,0,0);const t=ip.distanceTo(e.center);return Nn.radius=.7071067811865476+t,Nn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Nn)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(Or.x=s.normal.x>0?e.max.x:e.min.x,Or.y=s.normal.y>0?e.max.y:e.min.y,Or.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Or)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class np extends Rs{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new de(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const fo=new C,po=new C,Hc=new qe,Bs=new Mo,Br=new mr,oa=new C,Vc=new C;class sp extends Lt{constructor(e=new It,t=new np){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)fo.fromBufferAttribute(t,s-1),po.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=fo.distanceTo(po);e.setAttribute("lineDistance",new Yt(i,1))}else Re("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Br.copy(i.boundingSphere),Br.applyMatrix4(s),Br.radius+=r,e.ray.intersectsSphere(Br)===!1)return;Hc.copy(s).invert(),Bs.copy(e.ray).applyMatrix4(Hc);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=i.index,u=i.attributes.position;if(h!==null){const p=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let x=p,m=g-1;x<m;x+=c){const f=h.getX(x),M=h.getX(x+1),E=zr(this,e,Bs,l,f,M,x);E&&t.push(E)}if(this.isLineLoop){const x=h.getX(g-1),m=h.getX(p),f=zr(this,e,Bs,l,x,m,g-1);f&&t.push(f)}}else{const p=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let x=p,m=g-1;x<m;x+=c){const f=zr(this,e,Bs,l,x,x+1,x);f&&t.push(f)}if(this.isLineLoop){const x=zr(this,e,Bs,l,g-1,p,g-1);x&&t.push(x)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function zr(n,e,t,i,s,r,o){const a=n.geometry.attributes.position;if(fo.fromBufferAttribute(a,s),po.fromBufferAttribute(a,r),t.distanceSqToSegment(fo,po,oa,Vc)>i)return;oa.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(oa);if(!(c<e.near||c>e.far))return{distance:c,point:Vc.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}const Gc=new C,Wc=new C;class rp extends sp{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let s=0,r=t.count;s<r;s+=2)Gc.fromBufferAttribute(t,s),Wc.fromBufferAttribute(t,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Gc.distanceTo(Wc);e.setAttribute("lineDistance",new Yt(i,1))}else Re("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class op extends Rs{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new de(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Xc=new qe,xl=new Mo,kr=new mr,Hr=new C;class lr extends Lt{constructor(e=new It,t=new op){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),kr.copy(i.boundingSphere),kr.applyMatrix4(s),kr.radius+=r,e.ray.intersectsSphere(kr)===!1)return;Xc.copy(s).invert(),xl.copy(e.ray).applyMatrix4(Xc);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,d=i.attributes.position;if(c!==null){const u=Math.max(0,o.start),p=Math.min(c.count,o.start+o.count);for(let g=u,x=p;g<x;g++){const m=c.getX(g);Hr.fromBufferAttribute(d,m),Yc(Hr,m,l,s,e,t,this)}}else{const u=Math.max(0,o.start),p=Math.min(d.count,o.start+o.count);for(let g=u,x=p;g<x;g++)Hr.fromBufferAttribute(d,g),Yc(Hr,g,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Yc(n,e,t,i,s,r,o){const a=xl.distanceSqToPoint(n);if(a<t){const l=new C;xl.closestPointToPoint(n,l),l.applyMatrix4(i);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class Oh extends Xt{constructor(e=[],t=Yn,i,s,r,o,a,l,c,h){super(e,t,i,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class qc extends Xt{constructor(e,t,i,s,r,o,a,l,c){super(e,t,i,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class En extends Xt{constructor(e,t,i=vi,s,r,o,a=Ht,l=Ht,c,h=ji,d=1){if(h!==ji&&h!==Vn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:d};super(u,s,r,o,a,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new kl(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class ap extends En{constructor(e,t=vi,i=Yn,s,r,o=Ht,a=Ht,l,c=ji){const h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,t,i,s,r,o,a,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Bh extends Xt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class gr extends It{constructor(e=1,t=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],d=[];let u=0,p=0;g("z","y","x",-1,-1,i,t,e,o,r,0),g("z","y","x",1,-1,i,t,-e,o,r,1),g("x","z","y",1,1,e,i,t,s,o,2),g("x","z","y",1,-1,e,i,-t,s,o,3),g("x","y","z",1,-1,e,t,i,s,r,4),g("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Yt(c,3)),this.setAttribute("normal",new Yt(h,3)),this.setAttribute("uv",new Yt(d,2));function g(x,m,f,M,E,y,w,A,R,v,T){const D=y/R,P=w/v,F=y/2,G=w/2,Z=A/2,O=R+1,Y=v+1;let z=0,J=0;const j=new C;for(let ce=0;ce<Y;ce++){const fe=ce*P-G;for(let _e=0;_e<O;_e++){const Se=_e*D-F;j[x]=Se*M,j[m]=fe*E,j[f]=Z,c.push(j.x,j.y,j.z),j[x]=0,j[m]=0,j[f]=A>0?1:-1,h.push(j.x,j.y,j.z),d.push(_e/R),d.push(1-ce/v),z+=1}}for(let ce=0;ce<v;ce++)for(let fe=0;fe<R;fe++){const _e=u+fe+O*ce,Se=u+fe+O*(ce+1),Oe=u+(fe+1)+O*(ce+1),Fe=u+(fe+1)+O*ce;l.push(_e,Se,Fe),l.push(Se,Oe,Fe),J+=6}a.addGroup(p,J,T),p+=J,u+=z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class lp{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Re("Curve: .getPoint() not implemented.")}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),r+=i.distanceTo(s),t.push(r),s=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const i=this.getLengths();let s=0;const r=i.length;let o;t?o=t:o=e*i[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=i[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===o)return s/(r-1);const h=i[s],u=i[s+1]-h,p=(o-h)/u;return(s+p)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=t||(o.isVector2?new Ce:new C);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){const i=new C,s=[],r=[],o=[],a=new C,l=new qe;for(let p=0;p<=e;p++){const g=p/e;s[p]=this.getTangentAt(g,new C)}r[0]=new C,o[0]=new C;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),d=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=c&&(c=h,i.set(1,0,0)),d<=c&&(c=d,i.set(0,1,0)),u<=c&&i.set(0,0,1),a.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let p=1;p<=e;p++){if(r[p]=r[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(s[p-1],s[p]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Ge(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(l.makeRotationAxis(a,g))}o[p].crossVectors(s[p],r[p])}if(t===!0){let p=Math.acos(Ge(r[0].dot(r[e]),-1,1));p/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(p=-p);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],p*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}function Gl(){let n=0,e=0,t=0,i=0;function s(r,o,a,l){n=r,e=a,t=-3*r+3*o-2*a-l,i=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,d){let u=(o-r)/c-(a-r)/(c+h)+(a-o)/h,p=(a-o)/h-(l-o)/(h+d)+(l-a)/d;u*=h,p*=h,s(o,a,u,p)},calc:function(r){const o=r*r,a=o*r;return n+e*r+t*o+i*a}}}const $c=new C,Kc=new C,aa=new Gl,la=new Gl,ca=new Gl;class cp extends lp{constructor(e=[],t=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=s}getPoint(e,t=new C){const i=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(Kc.subVectors(s[0],s[1]).add(s[0]),c=Kc);const d=s[a%r],u=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:($c.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=$c),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(d),p),x=Math.pow(d.distanceToSquared(u),p),m=Math.pow(u.distanceToSquared(h),p);x<1e-4&&(x=1),g<1e-4&&(g=x),m<1e-4&&(m=x),aa.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,g,x,m),la.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,g,x,m),ca.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,g,x,m)}else this.curveType==="catmullrom"&&(aa.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),la.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),ca.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return i.set(aa.calc(l),la.calc(l),ca.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new C().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}class en extends It{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(i),l=Math.floor(s),c=a+1,h=l+1,d=e/a,u=t/l,p=[],g=[],x=[],m=[];for(let f=0;f<h;f++){const M=f*u-o;for(let E=0;E<c;E++){const y=E*d-r;g.push(y,-M,0),x.push(0,0,1),m.push(E/a),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let M=0;M<a;M++){const E=M+c*f,y=M+c*(f+1),w=M+1+c*(f+1),A=M+1+c*f;p.push(E,y,A),p.push(y,w,A)}this.setIndex(p),this.setAttribute("position",new Yt(g,3)),this.setAttribute("normal",new Yt(x,3)),this.setAttribute("uv",new Yt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new en(e.width,e.height,e.widthSegments,e.heightSegments)}}class Wl extends It{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const h=[],d=new C,u=new C,p=[],g=[],x=[],m=[];for(let f=0;f<=i;f++){const M=[],E=f/i,y=o+E*a,w=e*Math.cos(y),A=Math.sqrt(e*e-w*w);let R=0;f===0&&o===0?R=.5/t:f===i&&l===Math.PI&&(R=-.5/t);for(let v=0;v<=t;v++){const T=v/t,D=s+T*r;d.x=-A*Math.cos(D),d.y=w,d.z=A*Math.sin(D),g.push(d.x,d.y,d.z),u.copy(d).normalize(),x.push(u.x,u.y,u.z),m.push(T+R,1-E),M.push(c++)}h.push(M)}for(let f=0;f<i;f++)for(let M=0;M<t;M++){const E=h[f][M+1],y=h[f][M],w=h[f+1][M],A=h[f+1][M+1];(f!==0||o>0)&&p.push(E,y,A),(f!==i-1||l<Math.PI)&&p.push(y,w,A)}this.setIndex(p),this.setAttribute("position",new Yt(g,3)),this.setAttribute("normal",new Yt(x,3)),this.setAttribute("uv",new Yt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wl(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function Ts(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];if(Zc(s))s.isRenderTargetTexture?(Re("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(Zc(s[0])){const r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function Kt(n){const e={};for(let t=0;t<n.length;t++){const i=Ts(n[t]);for(const s in i)e[s]=i[s]}return e}function Zc(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function up(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function zh(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ye.workingColorSpace}const hp={clone:Ts,merge:Kt};var dp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,fp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class dt extends Rs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=dp,this.fragmentShader=fp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ts(e.uniforms),this.uniformsGroups=up(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new de().setHex(s.value);break;case"v2":this.uniforms[i].value=new Ce().fromArray(s.value);break;case"v3":this.uniforms[i].value=new C().fromArray(s.value);break;case"v4":this.uniforms[i].value=new _t().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Ue().fromArray(s.value);break;case"m4":this.uniforms[i].value=new qe().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class pp extends dt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class mp extends Rs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=of,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class gp extends Rs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class kh extends Lt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new de(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class _p extends kh{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Lt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new de(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const ua=new qe,Jc=new C,Qc=new C;class vp{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ce(512,512),this.mapType=ci,this.map=null,this.mapPass=null,this.matrix=new qe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Vl,this._frameExtents=new Ce(1,1),this._viewportCount=1,this._viewports=[new _t(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Jc.setFromMatrixPosition(e.matrixWorld),t.position.copy(Jc),Qc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Qc),t.updateMatrixWorld(),ua.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ua,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===or||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(ua)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Vr=new C,Gr=new ki,Ni=new C;class Hh extends Lt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new qe,this.projectionMatrix=new qe,this.projectionMatrixInverse=new qe,this.coordinateSystem=Bi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Vr,Gr,Ni),Ni.x===1&&Ni.y===1&&Ni.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Vr,Gr,Ni.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Vr,Gr,Ni),Ni.x===1&&Ni.y===1&&Ni.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Vr,Gr,Ni.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const dn=new C,jc=new Ce,eu=new Ce;class gi extends Hh{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ar*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(er*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ar*2*Math.atan(Math.tan(er*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){dn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(dn.x,dn.y).multiplyScalar(-e/dn.z),dn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(dn.x,dn.y).multiplyScalar(-e/dn.z)}getViewSize(e,t){return this.getViewBounds(e,jc,eu),t.subVectors(eu,jc)}setViewOffset(e,t,i,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(er*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class bo extends Hh{constructor(e=-1,t=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,o=i+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class xp extends vp{constructor(){super(new bo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Vh extends kh{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Lt.DEFAULT_UP),this.updateMatrix(),this.target=new Lt,this.shadow=new xp}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}const fs=-90,ps=1;class Sp extends Lt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new gi(fs,ps,e,t);s.layers=this.layers,this.add(s);const r=new gi(fs,ps,e,t);r.layers=this.layers,this.add(r);const o=new gi(fs,ps,e,t);o.layers=this.layers,this.add(o);const a=new gi(fs,ps,e,t);a.layers=this.layers,this.add(a);const l=new gi(fs,ps,e,t);l.layers=this.layers,this.add(l);const c=new gi(fs,ps,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===Bi)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===or)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(d,u,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class yp extends gi{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class tu{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Ge(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Ge(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Gh{static{Gh.prototype.isMatrix2=!0}constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}}class Mp extends Tn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){Re("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function iu(n,e,t,i){const s=bp(i);switch(t){case Ch:return n*e;case Ph:return n*e/s.components*s.byteLength;case Nl:return n*e/s.components*s.byteLength;case qn:return n*e*2/s.components*s.byteLength;case Fl:return n*e*2/s.components*s.byteLength;case Rh:return n*e*3/s.components*s.byteLength;case Ci:return n*e*4/s.components*s.byteLength;case Ul:return n*e*4/s.components*s.byteLength;case eo:case to:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case io:case no:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Wa:case Ya:return Math.max(n,16)*Math.max(e,8)/4;case Ga:case Xa:return Math.max(n,8)*Math.max(e,8)/2;case qa:case $a:case Za:case Ja:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ka:case ao:case Qa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ja:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case el:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case tl:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case il:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case nl:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case sl:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case rl:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case ol:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case al:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case ll:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case cl:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case ul:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case hl:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case dl:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case fl:case pl:case ml:return Math.ceil(n/4)*Math.ceil(e/4)*16;case gl:case _l:return Math.ceil(n/4)*Math.ceil(e/4)*8;case lo:case vl:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function bp(n){switch(n){case ci:case Eh:return{byteLength:1,components:1};case sr:case wh:case xi:return{byteLength:2,components:1};case Ll:case Il:return{byteLength:2,components:4};case vi:case Dl:case Oi:return{byteLength:4,components:1};case Th:case Ah:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Pl}}));typeof window<"u"&&(window.__THREE__?Re("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Pl);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Wh(){let n=null,e=!1,t=null,i=null;function s(r,o){t(r,o),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function Ep(n){const e=new WeakMap;function t(a,l){const c=a.array,h=a.usage,d=c.byteLength,u=n.createBuffer();n.bindBuffer(l,u),n.bufferData(l,c,h),a.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,l,c){const h=l.array,d=l.updateRanges;if(n.bindBuffer(c,a),d.length===0)n.bufferSubData(c,0,h);else{d.sort((p,g)=>p.start-g.start);let u=0;for(let p=1;p<d.length;p++){const g=d[u],x=d[p];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++u,d[u]=x)}d.length=u+1;for(let p=0,g=d.length;p<g;p++){const x=d[p];n.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var wp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Tp=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Ap=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Cp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Rp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Pp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Dp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Lp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ip=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Np=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Fp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Up=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Op=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Bp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,zp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,kp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Hp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Vp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Gp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Wp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Xp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Yp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,qp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,$p=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Kp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Zp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Jp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Qp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,jp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,em=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,tm="gl_FragColor = linearToOutputTexel( gl_FragColor );",im=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,nm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,sm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,rm=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,om=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,am=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,lm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,cm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,um=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,hm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,dm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,fm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,pm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,mm=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,gm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,_m=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,vm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,xm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Sm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ym=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Mm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,bm=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Em=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,wm=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Tm=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Am=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Cm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Rm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Pm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Dm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Lm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Im=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Nm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Fm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Um=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Om=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Bm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,zm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,km=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Hm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Vm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Gm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Wm=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Xm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ym=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,qm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,$m=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Km=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Zm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Jm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Qm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,jm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,e0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,t0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,i0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,n0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,s0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,r0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,o0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,a0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,l0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,c0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,u0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,h0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,d0=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,f0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,p0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,m0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,g0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,_0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,v0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,x0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,S0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,y0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,M0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,b0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,E0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const w0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,T0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,A0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,C0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,R0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,P0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,D0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,L0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,I0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,N0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,F0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,U0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,O0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,B0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,z0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,k0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,H0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,V0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,G0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,W0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,X0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Y0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,q0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,K0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Z0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,J0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Q0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,j0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,eg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,tg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ig=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ng=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ve={alphahash_fragment:wp,alphahash_pars_fragment:Tp,alphamap_fragment:Ap,alphamap_pars_fragment:Cp,alphatest_fragment:Rp,alphatest_pars_fragment:Pp,aomap_fragment:Dp,aomap_pars_fragment:Lp,batching_pars_vertex:Ip,batching_vertex:Np,begin_vertex:Fp,beginnormal_vertex:Up,bsdfs:Op,iridescence_fragment:Bp,bumpmap_pars_fragment:zp,clipping_planes_fragment:kp,clipping_planes_pars_fragment:Hp,clipping_planes_pars_vertex:Vp,clipping_planes_vertex:Gp,color_fragment:Wp,color_pars_fragment:Xp,color_pars_vertex:Yp,color_vertex:qp,common:$p,cube_uv_reflection_fragment:Kp,defaultnormal_vertex:Zp,displacementmap_pars_vertex:Jp,displacementmap_vertex:Qp,emissivemap_fragment:jp,emissivemap_pars_fragment:em,colorspace_fragment:tm,colorspace_pars_fragment:im,envmap_fragment:nm,envmap_common_pars_fragment:sm,envmap_pars_fragment:rm,envmap_pars_vertex:om,envmap_physical_pars_fragment:_m,envmap_vertex:am,fog_vertex:lm,fog_pars_vertex:cm,fog_fragment:um,fog_pars_fragment:hm,gradientmap_pars_fragment:dm,lightmap_pars_fragment:fm,lights_lambert_fragment:pm,lights_lambert_pars_fragment:mm,lights_pars_begin:gm,lights_toon_fragment:vm,lights_toon_pars_fragment:xm,lights_phong_fragment:Sm,lights_phong_pars_fragment:ym,lights_physical_fragment:Mm,lights_physical_pars_fragment:bm,lights_fragment_begin:Em,lights_fragment_maps:wm,lights_fragment_end:Tm,lightprobes_pars_fragment:Am,logdepthbuf_fragment:Cm,logdepthbuf_pars_fragment:Rm,logdepthbuf_pars_vertex:Pm,logdepthbuf_vertex:Dm,map_fragment:Lm,map_pars_fragment:Im,map_particle_fragment:Nm,map_particle_pars_fragment:Fm,metalnessmap_fragment:Um,metalnessmap_pars_fragment:Om,morphinstance_vertex:Bm,morphcolor_vertex:zm,morphnormal_vertex:km,morphtarget_pars_vertex:Hm,morphtarget_vertex:Vm,normal_fragment_begin:Gm,normal_fragment_maps:Wm,normal_pars_fragment:Xm,normal_pars_vertex:Ym,normal_vertex:qm,normalmap_pars_fragment:$m,clearcoat_normal_fragment_begin:Km,clearcoat_normal_fragment_maps:Zm,clearcoat_pars_fragment:Jm,iridescence_pars_fragment:Qm,opaque_fragment:jm,packing:e0,premultiplied_alpha_fragment:t0,project_vertex:i0,dithering_fragment:n0,dithering_pars_fragment:s0,roughnessmap_fragment:r0,roughnessmap_pars_fragment:o0,shadowmap_pars_fragment:a0,shadowmap_pars_vertex:l0,shadowmap_vertex:c0,shadowmask_pars_fragment:u0,skinbase_vertex:h0,skinning_pars_vertex:d0,skinning_vertex:f0,skinnormal_vertex:p0,specularmap_fragment:m0,specularmap_pars_fragment:g0,tonemapping_fragment:_0,tonemapping_pars_fragment:v0,transmission_fragment:x0,transmission_pars_fragment:S0,uv_pars_fragment:y0,uv_pars_vertex:M0,uv_vertex:b0,worldpos_vertex:E0,background_vert:w0,background_frag:T0,backgroundCube_vert:A0,backgroundCube_frag:C0,cube_vert:R0,cube_frag:P0,depth_vert:D0,depth_frag:L0,distance_vert:I0,distance_frag:N0,equirect_vert:F0,equirect_frag:U0,linedashed_vert:O0,linedashed_frag:B0,meshbasic_vert:z0,meshbasic_frag:k0,meshlambert_vert:H0,meshlambert_frag:V0,meshmatcap_vert:G0,meshmatcap_frag:W0,meshnormal_vert:X0,meshnormal_frag:Y0,meshphong_vert:q0,meshphong_frag:$0,meshphysical_vert:K0,meshphysical_frag:Z0,meshtoon_vert:J0,meshtoon_frag:Q0,points_vert:j0,points_frag:eg,shadow_vert:tg,shadow_frag:ig,sprite_vert:ng,sprite_frag:sg},he={common:{diffuse:{value:new de(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ue}},envmap:{envMap:{value:null},envMapRotation:{value:new Ue},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ue}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ue}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ue},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ue},normalScale:{value:new Ce(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ue},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ue}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ue}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ue}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new de(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new C},probesMax:{value:new C},probesResolution:{value:new C}},points:{diffuse:{value:new de(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0},uvTransform:{value:new Ue}},sprite:{diffuse:{value:new de(16777215)},opacity:{value:1},center:{value:new Ce(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}}},Ui={basic:{uniforms:Kt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.fog]),vertexShader:Ve.meshbasic_vert,fragmentShader:Ve.meshbasic_frag},lambert:{uniforms:Kt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new de(0)},envMapIntensity:{value:1}}]),vertexShader:Ve.meshlambert_vert,fragmentShader:Ve.meshlambert_frag},phong:{uniforms:Kt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new de(0)},specular:{value:new de(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphong_vert,fragmentShader:Ve.meshphong_frag},standard:{uniforms:Kt([he.common,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.roughnessmap,he.metalnessmap,he.fog,he.lights,{emissive:{value:new de(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag},toon:{uniforms:Kt([he.common,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.gradientmap,he.fog,he.lights,{emissive:{value:new de(0)}}]),vertexShader:Ve.meshtoon_vert,fragmentShader:Ve.meshtoon_frag},matcap:{uniforms:Kt([he.common,he.bumpmap,he.normalmap,he.displacementmap,he.fog,{matcap:{value:null}}]),vertexShader:Ve.meshmatcap_vert,fragmentShader:Ve.meshmatcap_frag},points:{uniforms:Kt([he.points,he.fog]),vertexShader:Ve.points_vert,fragmentShader:Ve.points_frag},dashed:{uniforms:Kt([he.common,he.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ve.linedashed_vert,fragmentShader:Ve.linedashed_frag},depth:{uniforms:Kt([he.common,he.displacementmap]),vertexShader:Ve.depth_vert,fragmentShader:Ve.depth_frag},normal:{uniforms:Kt([he.common,he.bumpmap,he.normalmap,he.displacementmap,{opacity:{value:1}}]),vertexShader:Ve.meshnormal_vert,fragmentShader:Ve.meshnormal_frag},sprite:{uniforms:Kt([he.sprite,he.fog]),vertexShader:Ve.sprite_vert,fragmentShader:Ve.sprite_frag},background:{uniforms:{uvTransform:{value:new Ue},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ve.background_vert,fragmentShader:Ve.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ue}},vertexShader:Ve.backgroundCube_vert,fragmentShader:Ve.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ve.cube_vert,fragmentShader:Ve.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ve.equirect_vert,fragmentShader:Ve.equirect_frag},distance:{uniforms:Kt([he.common,he.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ve.distance_vert,fragmentShader:Ve.distance_frag},shadow:{uniforms:Kt([he.lights,he.fog,{color:{value:new de(0)},opacity:{value:1}}]),vertexShader:Ve.shadow_vert,fragmentShader:Ve.shadow_frag}};Ui.physical={uniforms:Kt([Ui.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ue},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ue},clearcoatNormalScale:{value:new Ce(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ue},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ue},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ue},sheen:{value:0},sheenColor:{value:new de(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ue},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ue},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ue},transmissionSamplerSize:{value:new Ce},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ue},attenuationDistance:{value:0},attenuationColor:{value:new de(0)},specularColor:{value:new de(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ue},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ue},anisotropyVector:{value:new Ce},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ue}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag};const Wr={r:0,b:0,g:0},rg=new qe,Xh=new Ue;Xh.set(-1,0,0,0,1,0,0,0,1);function og(n,e,t,i,s,r){const o=new de(0);let a=s===!0?0:1,l,c,h=null,d=0,u=null;function p(M){let E=M.isScene===!0?M.background:null;if(E&&E.isTexture){const y=M.backgroundBlurriness>0;E=e.get(E,y)}return E}function g(M){let E=!1;const y=p(M);y===null?m(o,a):y&&y.isColor&&(m(y,1),E=!0);const w=n.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||E)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function x(M,E){const y=p(E);y&&(y.isCubeTexture||y.mapping===yo)?(c===void 0&&(c=new ei(new gr(1,1,1),new dt({name:"BackgroundCubeMaterial",uniforms:Ts(Ui.backgroundCube.uniforms),vertexShader:Ui.backgroundCube.vertexShader,fragmentShader:Ui.backgroundCube.fragmentShader,side:jt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,A,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(rg.makeRotationFromEuler(E.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Xh),c.material.toneMapped=Ye.getTransfer(y.colorSpace)!==rt,(h!==y||d!==y.version||u!==n.toneMapping)&&(c.material.needsUpdate=!0,h=y,d=y.version,u=n.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new ei(new en(2,2),new dt({name:"BackgroundMaterial",uniforms:Ts(Ui.background.uniforms),vertexShader:Ui.background.vertexShader,fragmentShader:Ui.background.fragmentShader,side:bn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=Ye.getTransfer(y.colorSpace)!==rt,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||d!==y.version||u!==n.toneMapping)&&(l.material.needsUpdate=!0,h=y,d=y.version,u=n.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function m(M,E){M.getRGB(Wr,zh(n)),t.buffers.color.setClear(Wr.r,Wr.g,Wr.b,E,r)}function f(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(M,E=1){o.set(M),a=E,m(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(M){a=M,m(o,a)},render:g,addToRenderList:x,dispose:f}}function ag(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=u(null);let r=s,o=!1;function a(P,F,G,Z,O){let Y=!1;const z=d(P,Z,G,F);r!==z&&(r=z,c(r.object)),Y=p(P,Z,G,O),Y&&g(P,Z,G,O),O!==null&&e.update(O,n.ELEMENT_ARRAY_BUFFER),(Y||o)&&(o=!1,y(P,F,G,Z),O!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function l(){return n.createVertexArray()}function c(P){return n.bindVertexArray(P)}function h(P){return n.deleteVertexArray(P)}function d(P,F,G,Z){const O=Z.wireframe===!0;let Y=i[F.id];Y===void 0&&(Y={},i[F.id]=Y);const z=P.isInstancedMesh===!0?P.id:0;let J=Y[z];J===void 0&&(J={},Y[z]=J);let j=J[G.id];j===void 0&&(j={},J[G.id]=j);let ce=j[O];return ce===void 0&&(ce=u(l()),j[O]=ce),ce}function u(P){const F=[],G=[],Z=[];for(let O=0;O<t;O++)F[O]=0,G[O]=0,Z[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:G,attributeDivisors:Z,object:P,attributes:{},index:null}}function p(P,F,G,Z){const O=r.attributes,Y=F.attributes;let z=0;const J=G.getAttributes();for(const j in J)if(J[j].location>=0){const fe=O[j];let _e=Y[j];if(_e===void 0&&(j==="instanceMatrix"&&P.instanceMatrix&&(_e=P.instanceMatrix),j==="instanceColor"&&P.instanceColor&&(_e=P.instanceColor)),fe===void 0||fe.attribute!==_e||_e&&fe.data!==_e.data)return!0;z++}return r.attributesNum!==z||r.index!==Z}function g(P,F,G,Z){const O={},Y=F.attributes;let z=0;const J=G.getAttributes();for(const j in J)if(J[j].location>=0){let fe=Y[j];fe===void 0&&(j==="instanceMatrix"&&P.instanceMatrix&&(fe=P.instanceMatrix),j==="instanceColor"&&P.instanceColor&&(fe=P.instanceColor));const _e={};_e.attribute=fe,fe&&fe.data&&(_e.data=fe.data),O[j]=_e,z++}r.attributes=O,r.attributesNum=z,r.index=Z}function x(){const P=r.newAttributes;for(let F=0,G=P.length;F<G;F++)P[F]=0}function m(P){f(P,0)}function f(P,F){const G=r.newAttributes,Z=r.enabledAttributes,O=r.attributeDivisors;G[P]=1,Z[P]===0&&(n.enableVertexAttribArray(P),Z[P]=1),O[P]!==F&&(n.vertexAttribDivisor(P,F),O[P]=F)}function M(){const P=r.newAttributes,F=r.enabledAttributes;for(let G=0,Z=F.length;G<Z;G++)F[G]!==P[G]&&(n.disableVertexAttribArray(G),F[G]=0)}function E(P,F,G,Z,O,Y,z){z===!0?n.vertexAttribIPointer(P,F,G,O,Y):n.vertexAttribPointer(P,F,G,Z,O,Y)}function y(P,F,G,Z){x();const O=Z.attributes,Y=G.getAttributes(),z=F.defaultAttributeValues;for(const J in Y){const j=Y[J];if(j.location>=0){let ce=O[J];if(ce===void 0&&(J==="instanceMatrix"&&P.instanceMatrix&&(ce=P.instanceMatrix),J==="instanceColor"&&P.instanceColor&&(ce=P.instanceColor)),ce!==void 0){const fe=ce.normalized,_e=ce.itemSize,Se=e.get(ce);if(Se===void 0)continue;const Oe=Se.buffer,Fe=Se.type,q=Se.bytesPerElement,se=Fe===n.INT||Fe===n.UNSIGNED_INT||ce.gpuType===Dl;if(ce.isInterleavedBufferAttribute){const ee=ce.data,Ne=ee.stride,Be=ce.offset;if(ee.isInstancedInterleavedBuffer){for(let Pe=0;Pe<j.locationSize;Pe++)f(j.location+Pe,ee.meshPerAttribute);P.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let Pe=0;Pe<j.locationSize;Pe++)m(j.location+Pe);n.bindBuffer(n.ARRAY_BUFFER,Oe);for(let Pe=0;Pe<j.locationSize;Pe++)E(j.location+Pe,_e/j.locationSize,Fe,fe,Ne*q,(Be+_e/j.locationSize*Pe)*q,se)}else{if(ce.isInstancedBufferAttribute){for(let ee=0;ee<j.locationSize;ee++)f(j.location+ee,ce.meshPerAttribute);P.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let ee=0;ee<j.locationSize;ee++)m(j.location+ee);n.bindBuffer(n.ARRAY_BUFFER,Oe);for(let ee=0;ee<j.locationSize;ee++)E(j.location+ee,_e/j.locationSize,Fe,fe,_e*q,_e/j.locationSize*ee*q,se)}}else if(z!==void 0){const fe=z[J];if(fe!==void 0)switch(fe.length){case 2:n.vertexAttrib2fv(j.location,fe);break;case 3:n.vertexAttrib3fv(j.location,fe);break;case 4:n.vertexAttrib4fv(j.location,fe);break;default:n.vertexAttrib1fv(j.location,fe)}}}}M()}function w(){T();for(const P in i){const F=i[P];for(const G in F){const Z=F[G];for(const O in Z){const Y=Z[O];for(const z in Y)h(Y[z].object),delete Y[z];delete Z[O]}}delete i[P]}}function A(P){if(i[P.id]===void 0)return;const F=i[P.id];for(const G in F){const Z=F[G];for(const O in Z){const Y=Z[O];for(const z in Y)h(Y[z].object),delete Y[z];delete Z[O]}}delete i[P.id]}function R(P){for(const F in i){const G=i[F];for(const Z in G){const O=G[Z];if(O[P.id]===void 0)continue;const Y=O[P.id];for(const z in Y)h(Y[z].object),delete Y[z];delete O[P.id]}}}function v(P){for(const F in i){const G=i[F],Z=P.isInstancedMesh===!0?P.id:0,O=G[Z];if(O!==void 0){for(const Y in O){const z=O[Y];for(const J in z)h(z[J].object),delete z[J];delete O[Y]}delete G[Z],Object.keys(G).length===0&&delete i[F]}}}function T(){D(),o=!0,r!==s&&(r=s,c(r.object))}function D(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:T,resetDefaultState:D,dispose:w,releaseStatesOfGeometry:A,releaseStatesOfObject:v,releaseStatesOfProgram:R,initAttributes:x,enableAttribute:m,disableUnusedAttributes:M}}function lg(n,e,t){let i;function s(l){i=l}function r(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function o(l,c,h){h!==0&&(n.drawArraysInstanced(i,l,c,h),t.update(c,i,h))}function a(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,h);let u=0;for(let p=0;p<h;p++)u+=c[p];t.update(u,i,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function cg(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(R){return!(R!==Ci&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){const v=R===xi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==ci&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Oi&&!v)}function l(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(Re("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Re("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),f=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),E=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),w=n.getParameter(n.MAX_SAMPLES),A=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:M,maxVaryings:E,maxFragmentUniforms:y,maxSamples:w,samples:A}}function ug(n){const e=this;let t=null,i=0,s=!1,r=!1;const o=new pn,a=new Ue,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const p=d.length!==0||u||i!==0||s;return s=u,i=d.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,p){const g=d.clippingPlanes,x=d.clipIntersection,m=d.clipShadows,f=n.get(d);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{const M=r?0:i,E=M*4;let y=f.clippingState||null;l.value=y,y=h(g,u,E,p);for(let w=0;w!==E;++w)y[w]=t[w];f.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(d,u,p,g){const x=d!==null?d.length:0;let m=null;if(x!==0){if(m=l.value,g!==!0||m===null){const f=p+x*4,M=u.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<f)&&(m=new Float32Array(f));for(let E=0,y=p;E!==x;++E,y+=4)o.copy(d[E]).applyMatrix4(M,a),o.normal.toArray(m,y),m[y+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}const vn=4,nu=[.125,.215,.35,.446,.526,.582],Bn=20,hg=256,zs=new bo,su=new de;let ha=null,da=0,fa=0,pa=!1;const dg=new C;class ru{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){const{size:o=256,position:a=dg}=r;ha=this._renderer.getRenderTarget(),da=this._renderer.getActiveCubeFace(),fa=this._renderer.getActiveMipmapLevel(),pa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=lu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=au(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(ha,da,fa),this._renderer.xr.enabled=pa,e.scissorTest=!1,ms(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Yn||e.mapping===ws?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ha=this._renderer.getRenderTarget(),da=this._renderer.getActiveCubeFace(),fa=this._renderer.getActiveMipmapLevel(),pa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Mt,minFilter:Mt,generateMipmaps:!1,type:xi,format:Ci,colorSpace:co,depthBuffer:!1},s=ou(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ou(e,t,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=fg(r)),this._blurMaterial=mg(r,e,t),this._ggxMaterial=pg(r,e,t)}return s}_compileMaterial(e){const t=new ei(new It,e);this._renderer.compile(t,zs)}_sceneToCubeUV(e,t,i,s,r){const l=new gi(90,1,t,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,p=d.toneMapping;d.getClearColor(su),d.toneMapping=Ri,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ei(new gr,new Hl({name:"PMREM.Background",side:jt,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,m=x.material;let f=!1;const M=e.background;M?M.isColor&&(m.color.copy(M),e.background=null,f=!0):(m.color.copy(su),f=!0);for(let E=0;E<6;E++){const y=E%3;y===0?(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[E],r.y,r.z)):y===1?(l.up.set(0,0,c[E]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[E],r.z)):(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[E]));const w=this._cubeSize;ms(s,y*w,E>2?w:0,w,w),d.setRenderTarget(s),f&&d.render(x,l),d.render(e,l)}d.toneMapping=p,d.autoClear=u,e.background=M}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===Yn||e.mapping===ws;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=lu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=au());const r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;const a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;ms(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,zs)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){const s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;const l=o.uniforms,c=i/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=0+c*1.25,p=d*u,{_lodMax:g}=this,x=this._sizeLods[i],m=3*x*(i>g-vn?i-g+vn:0),f=4*(this._cubeSize-x);l.envMap.value=e.texture,l.roughness.value=p,l.mipInt.value=g-t,ms(r,m,f,3*x,2*x),s.setRenderTarget(r),s.render(a,zs),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-i,ms(e,m,f,3*x,2*x),s.setRenderTarget(e),s.render(a,zs)}_blur(e,t,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,s,"latitudinal",r),this._halfBlur(o,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&Ze("blur direction must be either latitudinal or longitudinal!");const h=3,d=this._lodMeshes[s];d.material=c;const u=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Bn-1),x=r/g,m=isFinite(r)?1+Math.floor(h*x):Bn;m>Bn&&Re(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Bn}`);const f=[];let M=0;for(let R=0;R<Bn;++R){const v=R/x,T=Math.exp(-v*v/2);f.push(T),R===0?M+=T:R<m&&(M+=2*T)}for(let R=0;R<f.length;R++)f[R]=f[R]/M;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=f,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);const{_lodMax:E}=this;u.dTheta.value=g,u.mipInt.value=E-i;const y=this._sizeLods[s],w=3*y*(s>E-vn?s-E+vn:0),A=4*(this._cubeSize-y);ms(t,w,A,3*y,2*y),l.setRenderTarget(t),l.render(d,zs)}}function fg(n){const e=[],t=[],i=[];let s=n;const r=n-vn+1+nu.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>n-vn?l=nu[o-n+vn-1]:o===0&&(l=0),t.push(l);const c=1/(a-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],p=6,g=6,x=3,m=2,f=1,M=new Float32Array(x*g*p),E=new Float32Array(m*g*p),y=new Float32Array(f*g*p);for(let A=0;A<p;A++){const R=A%3*2/3-1,v=A>2?0:-1,T=[R,v,0,R+2/3,v,0,R+2/3,v+1,0,R,v,0,R+2/3,v+1,0,R,v+1,0];M.set(T,x*g*A),E.set(u,m*g*A);const D=[A,A,A,A,A,A];y.set(D,f*g*A)}const w=new It;w.setAttribute("position",new je(M,x)),w.setAttribute("uv",new je(E,m)),w.setAttribute("faceIndex",new je(y,f)),i.push(new ei(w,null)),s>vn&&s--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function ou(n,e,t){const i=new ui(n,e,t);return i.texture.mapping=yo,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ms(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function pg(n,e,t){return new dt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:hg,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Eo(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Zi,depthTest:!1,depthWrite:!1})}function mg(n,e,t){const i=new Float32Array(Bn),s=new C(0,1,0);return new dt({name:"SphericalGaussianBlur",defines:{n:Bn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Eo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Zi,depthTest:!1,depthWrite:!1})}function au(){return new dt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Eo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Zi,depthTest:!1,depthWrite:!1})}function lu(){return new dt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Eo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Zi,depthTest:!1,depthWrite:!1})}function Eo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class Yh extends ui{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new Oh(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new gr(5,5,5),r=new dt({name:"CubemapFromEquirect",uniforms:Ts(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:jt,blending:Zi});r.uniforms.tEquirect.value=t;const o=new ei(s,r),a=t.minFilter;return t.minFilter===Hn&&(t.minFilter=Mt),new Sp(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,s);e.setRenderTarget(r)}}function gg(n){let e=new WeakMap,t=new WeakMap,i=null;function s(u,p=!1){return u==null?null:p?o(u):r(u)}function r(u){if(u&&u.isTexture){const p=u.mapping;if(p===Fo||p===Uo)if(e.has(u)){const g=e.get(u).texture;return a(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const x=new Yh(g.height);return x.fromEquirectangularTexture(n,u),e.set(u,x),u.addEventListener("dispose",c),a(x.texture,u.mapping)}else return null}}return u}function o(u){if(u&&u.isTexture){const p=u.mapping,g=p===Fo||p===Uo,x=p===Yn||p===ws;if(g||x){let m=t.get(u);const f=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==f)return i===null&&(i=new ru(n)),m=g?i.fromEquirectangular(u,m):i.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),m.texture;if(m!==void 0)return m.texture;{const M=u.image;return g&&M&&M.height>0||x&&M&&l(M)?(i===null&&(i=new ru(n)),m=g?i.fromEquirectangular(u):i.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function a(u,p){return p===Fo?u.mapping=Yn:p===Uo&&(u.mapping=ws),u}function l(u){let p=0;const g=6;for(let x=0;x<g;x++)u[x]!==void 0&&p++;return p===g}function c(u){const p=u.target;p.removeEventListener("dispose",c);const g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function h(u){const p=u.target;p.removeEventListener("dispose",h);const g=t.get(p);g!==void 0&&(t.delete(p),g.dispose())}function d(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:d}}function _g(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&ys("WebGLRenderer: "+i+" extension not supported."),s}}}function vg(n,e,t,i){const s={},r=new WeakMap;function o(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",o),delete s[u.id];const p=r.get(u);p&&(e.remove(p),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function a(d,u){return s[u.id]===!0||(u.addEventListener("dispose",o),s[u.id]=!0,t.memory.geometries++),u}function l(d){const u=d.attributes;for(const p in u)e.update(u[p],n.ARRAY_BUFFER)}function c(d){const u=[],p=d.index,g=d.attributes.position;let x=0;if(g===void 0)return;if(p!==null){const M=p.array;x=p.version;for(let E=0,y=M.length;E<y;E+=3){const w=M[E+0],A=M[E+1],R=M[E+2];u.push(w,A,A,R,R,w)}}else{const M=g.array;x=g.version;for(let E=0,y=M.length/3-1;E<y;E+=3){const w=E+0,A=E+1,R=E+2;u.push(w,A,A,R,R,w)}}const m=new(g.count>=65535?Uh:Fh)(u,1);m.version=x;const f=r.get(d);f&&e.remove(f),r.set(d,m)}function h(d){const u=r.get(d);if(u){const p=d.index;p!==null&&u.version<p.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:h}}function xg(n,e,t){let i;function s(d){i=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,u){n.drawElements(i,u,r,d*o),t.update(u,i,1)}function c(d,u,p){p!==0&&(n.drawElementsInstanced(i,u,r,d*o,p),t.update(u,i,p))}function h(d,u,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,r,d,0,p);let x=0;for(let m=0;m<p;m++)x+=u[m];t.update(x,i,1)}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function Sg(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(r/3);break;case n.LINES:t.lines+=a*(r/2);break;case n.LINE_STRIP:t.lines+=a*(r-1);break;case n.LINE_LOOP:t.lines+=a*r;break;case n.POINTS:t.points+=a*r;break;default:Ze("WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function yg(n,e,t){const i=new WeakMap,s=new _t;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0;let u=i.get(a);if(u===void 0||u.count!==d){let D=function(){v.dispose(),i.delete(a),a.removeEventListener("dispose",D)};var p=D;u!==void 0&&u.texture.dispose();const g=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],M=a.morphAttributes.normal||[],E=a.morphAttributes.color||[];let y=0;g===!0&&(y=1),x===!0&&(y=2),m===!0&&(y=3);let w=a.attributes.position.count*y,A=1;w>e.maxTextureSize&&(A=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const R=new Float32Array(w*A*4*d),v=new Lh(R,w,A,d);v.type=Oi,v.needsUpdate=!0;const T=y*4;for(let P=0;P<d;P++){const F=f[P],G=M[P],Z=E[P],O=w*A*4*P;for(let Y=0;Y<F.count;Y++){const z=Y*T;g===!0&&(s.fromBufferAttribute(F,Y),R[O+z+0]=s.x,R[O+z+1]=s.y,R[O+z+2]=s.z,R[O+z+3]=0),x===!0&&(s.fromBufferAttribute(G,Y),R[O+z+4]=s.x,R[O+z+5]=s.y,R[O+z+6]=s.z,R[O+z+7]=0),m===!0&&(s.fromBufferAttribute(Z,Y),R[O+z+8]=s.x,R[O+z+9]=s.y,R[O+z+10]=s.z,R[O+z+11]=Z.itemSize===4?s.w:1)}}u={count:d,texture:v,size:new Ce(w,A)},i.set(a,u),a.addEventListener("dispose",D)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const x=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",x),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:r}}function Mg(n,e,t,i,s){let r=new WeakMap;function o(c){const h=s.render.frame,d=c.geometry,u=e.get(c,d);if(r.get(u)!==h&&(e.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){const p=c.skeleton;r.get(p)!==h&&(p.update(),r.set(p,h))}return u}function a(){r=new WeakMap}function l(c){const h=c.target;h.removeEventListener("dispose",l),i.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:o,dispose:a}}const bg={[gh]:"LINEAR_TONE_MAPPING",[_h]:"REINHARD_TONE_MAPPING",[vh]:"CINEON_TONE_MAPPING",[xh]:"ACES_FILMIC_TONE_MAPPING",[yh]:"AGX_TONE_MAPPING",[Mh]:"NEUTRAL_TONE_MAPPING",[Sh]:"CUSTOM_TONE_MAPPING"};function Eg(n,e,t,i,s,r){const o=new ui(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,depthTexture:s?new En(e,t):void 0}),a=new ui(e,t,{type:xi,depthBuffer:!1,stencilBuffer:!1}),l=new It;l.setAttribute("position",new Yt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Yt([0,2,0,0,2,0],2));const c=new pp({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),h=new ei(l,c),d=new bo(-1,1,1,-1,0,1);let u=null,p=null,g=!1,x,m=null,f=[],M=!1;this.setSize=function(E,y){o.setSize(E,y),a.setSize(E,y);for(let w=0;w<f.length;w++){const A=f[w];A.setSize&&A.setSize(E,y)}},this.setEffects=function(E){f=E,M=f.length>0&&f[0].isRenderPass===!0;const y=o.width,w=o.height;for(let A=0;A<f.length;A++){const R=f[A];R.setSize&&R.setSize(y,w)}},this.begin=function(E,y){if(g||E.toneMapping===Ri&&f.length===0)return!1;if(m=y,y!==null){const w=y.width,A=y.height;(o.width!==w||o.height!==A)&&this.setSize(w,A)}return M===!1&&E.setRenderTarget(o),x=E.toneMapping,E.toneMapping=Ri,!0},this.hasRenderPass=function(){return M},this.end=function(E,y){E.toneMapping=x,g=!0;let w=o,A=a;for(let R=0;R<f.length;R++){const v=f[R];if(v.enabled!==!1&&(v.render(E,A,w,y),v.needsSwap!==!1)){const T=w;w=A,A=T}}if(u!==E.outputColorSpace||p!==E.toneMapping){u=E.outputColorSpace,p=E.toneMapping,c.defines={},Ye.getTransfer(u)===rt&&(c.defines.SRGB_TRANSFER="");const R=bg[p];R&&(c.defines[R]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=w.texture,E.setRenderTarget(m),E.render(h,d),m=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){o.depthTexture&&o.depthTexture.dispose(),o.dispose(),a.dispose(),l.dispose(),c.dispose()}}const qh=new Xt,Sl=new En(1,1),$h=new Lh,Kh=new zf,Zh=new Oh,cu=[],uu=[],hu=new Float32Array(16),du=new Float32Array(9),fu=new Float32Array(4);function Ps(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=cu[s];if(r===void 0&&(r=new Float32Array(s),cu[s]=r),e!==0){i.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(r,a)}return r}function Nt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Ft(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function wo(n,e){let t=uu[e];t===void 0&&(t=new Int32Array(e),uu[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function wg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Tg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;n.uniform2fv(this.addr,e),Ft(t,e)}}function Ag(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Nt(t,e))return;n.uniform3fv(this.addr,e),Ft(t,e)}}function Cg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;n.uniform4fv(this.addr,e),Ft(t,e)}}function Rg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Nt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Ft(t,e)}else{if(Nt(t,i))return;fu.set(i),n.uniformMatrix2fv(this.addr,!1,fu),Ft(t,i)}}function Pg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Nt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Ft(t,e)}else{if(Nt(t,i))return;du.set(i),n.uniformMatrix3fv(this.addr,!1,du),Ft(t,i)}}function Dg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Nt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Ft(t,e)}else{if(Nt(t,i))return;hu.set(i),n.uniformMatrix4fv(this.addr,!1,hu),Ft(t,i)}}function Lg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Ig(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;n.uniform2iv(this.addr,e),Ft(t,e)}}function Ng(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;n.uniform3iv(this.addr,e),Ft(t,e)}}function Fg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;n.uniform4iv(this.addr,e),Ft(t,e)}}function Ug(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Og(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;n.uniform2uiv(this.addr,e),Ft(t,e)}}function Bg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;n.uniform3uiv(this.addr,e),Ft(t,e)}}function zg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;n.uniform4uiv(this.addr,e),Ft(t,e)}}function kg(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Sl.compareFunction=t.isReversedDepthBuffer()?Bl:Ol,r=Sl):r=qh,t.setTexture2D(e||r,s)}function Hg(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||Kh,s)}function Vg(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||Zh,s)}function Gg(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||$h,s)}function Wg(n){switch(n){case 5126:return wg;case 35664:return Tg;case 35665:return Ag;case 35666:return Cg;case 35674:return Rg;case 35675:return Pg;case 35676:return Dg;case 5124:case 35670:return Lg;case 35667:case 35671:return Ig;case 35668:case 35672:return Ng;case 35669:case 35673:return Fg;case 5125:return Ug;case 36294:return Og;case 36295:return Bg;case 36296:return zg;case 35678:case 36198:case 36298:case 36306:case 35682:return kg;case 35679:case 36299:case 36307:return Hg;case 35680:case 36300:case 36308:case 36293:return Vg;case 36289:case 36303:case 36311:case 36292:return Gg}}function Xg(n,e){n.uniform1fv(this.addr,e)}function Yg(n,e){const t=Ps(e,this.size,2);n.uniform2fv(this.addr,t)}function qg(n,e){const t=Ps(e,this.size,3);n.uniform3fv(this.addr,t)}function $g(n,e){const t=Ps(e,this.size,4);n.uniform4fv(this.addr,t)}function Kg(n,e){const t=Ps(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Zg(n,e){const t=Ps(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Jg(n,e){const t=Ps(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Qg(n,e){n.uniform1iv(this.addr,e)}function jg(n,e){n.uniform2iv(this.addr,e)}function e_(n,e){n.uniform3iv(this.addr,e)}function t_(n,e){n.uniform4iv(this.addr,e)}function i_(n,e){n.uniform1uiv(this.addr,e)}function n_(n,e){n.uniform2uiv(this.addr,e)}function s_(n,e){n.uniform3uiv(this.addr,e)}function r_(n,e){n.uniform4uiv(this.addr,e)}function o_(n,e,t){const i=this.cache,s=e.length,r=wo(t,s);Nt(i,r)||(n.uniform1iv(this.addr,r),Ft(i,r));let o;this.type===n.SAMPLER_2D_SHADOW?o=Sl:o=qh;for(let a=0;a!==s;++a)t.setTexture2D(e[a]||o,r[a])}function a_(n,e,t){const i=this.cache,s=e.length,r=wo(t,s);Nt(i,r)||(n.uniform1iv(this.addr,r),Ft(i,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Kh,r[o])}function l_(n,e,t){const i=this.cache,s=e.length,r=wo(t,s);Nt(i,r)||(n.uniform1iv(this.addr,r),Ft(i,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Zh,r[o])}function c_(n,e,t){const i=this.cache,s=e.length,r=wo(t,s);Nt(i,r)||(n.uniform1iv(this.addr,r),Ft(i,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||$h,r[o])}function u_(n){switch(n){case 5126:return Xg;case 35664:return Yg;case 35665:return qg;case 35666:return $g;case 35674:return Kg;case 35675:return Zg;case 35676:return Jg;case 5124:case 35670:return Qg;case 35667:case 35671:return jg;case 35668:case 35672:return e_;case 35669:case 35673:return t_;case 5125:return i_;case 36294:return n_;case 36295:return s_;case 36296:return r_;case 35678:case 36198:case 36298:case 36306:case 35682:return o_;case 35679:case 36299:case 36307:return a_;case 35680:case 36300:case 36308:case 36293:return l_;case 36289:case 36303:case 36311:case 36292:return c_}}class h_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Wg(t.type)}}class d_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=u_(t.type)}}class f_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],i)}}}const ma=/(\w+)(\])?(\[|\.)?/g;function pu(n,e){n.seq.push(e),n.map[e.id]=e}function p_(n,e,t){const i=n.name,s=i.length;for(ma.lastIndex=0;;){const r=ma.exec(i),o=ma.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){pu(t,c===void 0?new h_(a,n,e):new d_(a,n,e));break}else{let d=t.map[a];d===void 0&&(d=new f_(a),pu(t,d)),t=d}}}class so{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const a=e.getActiveUniform(t,o),l=e.getUniformLocation(t,a.name);p_(a,l,this)}const s=[],r=[];for(const o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&i.push(o)}return i}}function mu(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const m_=37297;let g_=0;function __(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}const gu=new Ue;function v_(n){Ye._getMatrix(gu,Ye.workingColorSpace,n);const e=`mat3( ${gu.elements.map(t=>t.toFixed(4))} )`;switch(Ye.getTransfer(n)){case uo:return[e,"LinearTransferOETF"];case rt:return[e,"sRGBTransferOETF"];default:return Re("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function _u(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+__(n.getShaderSource(e),a)}else return r}function x_(n,e){const t=v_(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const S_={[gh]:"Linear",[_h]:"Reinhard",[vh]:"Cineon",[xh]:"ACESFilmic",[yh]:"AgX",[Mh]:"Neutral",[Sh]:"Custom"};function y_(n,e){const t=S_[e];return t===void 0?(Re("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Xr=new C;function M_(){Ye.getLuminanceCoefficients(Xr);const n=Xr.x.toFixed(4),e=Xr.y.toFixed(4),t=Xr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function b_(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Js).join(`
`)}function E_(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function w_(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Js(n){return n!==""}function vu(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function xu(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const T_=/^[ \t]*#include +<([\w\d./]+)>/gm;function yl(n){return n.replace(T_,C_)}const A_=new Map;function C_(n,e){let t=Ve[e];if(t===void 0){const i=A_.get(e);if(i!==void 0)t=Ve[i],Re('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return yl(t)}const R_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Su(n){return n.replace(R_,P_)}function P_(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function yu(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const D_={[jr]:"SHADOWMAP_TYPE_PCF",[Zs]:"SHADOWMAP_TYPE_VSM"};function L_(n){return D_[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const I_={[Yn]:"ENVMAP_TYPE_CUBE",[ws]:"ENVMAP_TYPE_CUBE",[yo]:"ENVMAP_TYPE_CUBE_UV"};function N_(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":I_[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const F_={[ws]:"ENVMAP_MODE_REFRACTION"};function U_(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":F_[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const O_={[mh]:"ENVMAP_BLENDING_MULTIPLY",[nf]:"ENVMAP_BLENDING_MIX",[sf]:"ENVMAP_BLENDING_ADD"};function B_(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":O_[n.combine]||"ENVMAP_BLENDING_NONE"}function z_(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function k_(n,e,t,i){const s=n.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=L_(t),c=N_(t),h=U_(t),d=B_(t),u=z_(t),p=b_(t),g=E_(r),x=s.createProgram();let m,f,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Js).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Js).join(`
`),f.length>0&&(f+=`
`)):(m=[yu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Js).join(`
`),f=[yu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ri?"#define TONE_MAPPING":"",t.toneMapping!==Ri?Ve.tonemapping_pars_fragment:"",t.toneMapping!==Ri?y_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ve.colorspace_pars_fragment,x_("linearToOutputTexel",t.outputColorSpace),M_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Js).join(`
`)),o=yl(o),o=vu(o,t),o=xu(o,t),a=yl(a),a=vu(a,t),a=xu(a,t),o=Su(o),a=Su(a),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===bc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===bc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const E=M+m+o,y=M+f+a,w=mu(s,s.VERTEX_SHADER,E),A=mu(s,s.FRAGMENT_SHADER,y);s.attachShader(x,w),s.attachShader(x,A),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function R(P){if(n.debug.checkShaderErrors){const F=s.getProgramInfoLog(x)||"",G=s.getShaderInfoLog(w)||"",Z=s.getShaderInfoLog(A)||"",O=F.trim(),Y=G.trim(),z=Z.trim();let J=!0,j=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(J=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,x,w,A);else{const ce=_u(s,w,"vertex"),fe=_u(s,A,"fragment");Ze("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+O+`
`+ce+`
`+fe)}else O!==""?Re("WebGLProgram: Program Info Log:",O):(Y===""||z==="")&&(j=!1);j&&(P.diagnostics={runnable:J,programLog:O,vertexShader:{log:Y,prefix:m},fragmentShader:{log:z,prefix:f}})}s.deleteShader(w),s.deleteShader(A),v=new so(s,x),T=w_(s,x)}let v;this.getUniforms=function(){return v===void 0&&R(this),v};let T;this.getAttributes=function(){return T===void 0&&R(this),T};let D=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=s.getProgramParameter(x,m_)),D},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=g_++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=w,this.fragmentShader=A,this}let H_=0;class V_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new G_(e),t.set(e,i)),i}}class G_{constructor(e){this.id=H_++,this.code=e,this.usedTimes=0}}function W_(n){return n===qn||n===ao||n===lo}function X_(n,e,t,i,s,r){const o=new Ih,a=new V_,l=new Set,c=[],h=new Map,d=i.logarithmicDepthBuffer;let u=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(v){return l.add(v),v===0?"uv":`uv${v}`}function x(v,T,D,P,F,G){const Z=P.fog,O=F.geometry,Y=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?P.environment:null,z=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,J=e.get(v.envMap||Y,z),j=J&&J.mapping===yo?J.image.height:null,ce=p[v.type];v.precision!==null&&(u=i.getMaxPrecision(v.precision),u!==v.precision&&Re("WebGLProgram.getParameters:",v.precision,"not supported, using",u,"instead."));const fe=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,_e=fe!==void 0?fe.length:0;let Se=0;O.morphAttributes.position!==void 0&&(Se=1),O.morphAttributes.normal!==void 0&&(Se=2),O.morphAttributes.color!==void 0&&(Se=3);let Oe,Fe,q,se;if(ce){const ye=Ui[ce];Oe=ye.vertexShader,Fe=ye.fragmentShader}else{Oe=v.vertexShader,Fe=v.fragmentShader;const ye=a.getVertexShaderStage(v),St=a.getFragmentShaderStage(v);a.update(v,ye,St),q=ye.id,se=St.id}const ee=n.getRenderTarget(),Ne=n.state.buffers.depth.getReversed(),Be=F.isInstancedMesh===!0,Pe=F.isBatchedMesh===!0,bt=!!v.map,Xe=!!v.matcap,lt=!!J,tt=!!v.aoMap,$e=!!v.lightMap,Tt=!!v.bumpMap&&v.wireframe===!1,Pt=!!v.normalMap,Ut=!!v.displacementMap,Bt=!!v.emissiveMap,xt=!!v.metalnessMap,At=!!v.roughnessMap,I=v.anisotropy>0,ti=v.clearcoat>0,nt=v.dispersion>0,b=v.iridescence>0,_=v.sheen>0,U=v.transmission>0,H=I&&!!v.anisotropyMap,W=ti&&!!v.clearcoatMap,te=ti&&!!v.clearcoatNormalMap,re=ti&&!!v.clearcoatRoughnessMap,X=b&&!!v.iridescenceMap,K=b&&!!v.iridescenceThicknessMap,oe=_&&!!v.sheenColorMap,Ee=_&&!!v.sheenRoughnessMap,ue=!!v.specularMap,ae=!!v.specularColorMap,Ae=!!v.specularIntensityMap,De=U&&!!v.transmissionMap,ze=U&&!!v.thicknessMap,L=!!v.gradientMap,ie=!!v.alphaMap,$=v.alphaTest>0,le=!!v.alphaHash,ge=!!v.extensions;let Q=Ri;v.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(Q=n.toneMapping);const be={shaderID:ce,shaderType:v.type,shaderName:v.name,vertexShader:Oe,fragmentShader:Fe,defines:v.defines,customVertexShaderID:q,customFragmentShaderID:se,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:u,batching:Pe,batchingColor:Pe&&F._colorsTexture!==null,instancing:Be,instancingColor:Be&&F.instanceColor!==null,instancingMorph:Be&&F.morphTexture!==null,outputColorSpace:ee===null?n.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:Ye.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:bt,matcap:Xe,envMap:lt,envMapMode:lt&&J.mapping,envMapCubeUVHeight:j,aoMap:tt,lightMap:$e,bumpMap:Tt,normalMap:Pt,displacementMap:Ut,emissiveMap:Bt,normalMapObjectSpace:Pt&&v.normalMapType===af,normalMapTangentSpace:Pt&&v.normalMapType===Sc,packedNormalMap:Pt&&v.normalMapType===Sc&&W_(v.normalMap.format),metalnessMap:xt,roughnessMap:At,anisotropy:I,anisotropyMap:H,clearcoat:ti,clearcoatMap:W,clearcoatNormalMap:te,clearcoatRoughnessMap:re,dispersion:nt,iridescence:b,iridescenceMap:X,iridescenceThicknessMap:K,sheen:_,sheenColorMap:oe,sheenRoughnessMap:Ee,specularMap:ue,specularColorMap:ae,specularIntensityMap:Ae,transmission:U,transmissionMap:De,thicknessMap:ze,gradientMap:L,opaque:v.transparent===!1&&v.blending===Ji&&v.alphaToCoverage===!1,alphaMap:ie,alphaTest:$,alphaHash:le,combine:v.combine,mapUv:bt&&g(v.map.channel),aoMapUv:tt&&g(v.aoMap.channel),lightMapUv:$e&&g(v.lightMap.channel),bumpMapUv:Tt&&g(v.bumpMap.channel),normalMapUv:Pt&&g(v.normalMap.channel),displacementMapUv:Ut&&g(v.displacementMap.channel),emissiveMapUv:Bt&&g(v.emissiveMap.channel),metalnessMapUv:xt&&g(v.metalnessMap.channel),roughnessMapUv:At&&g(v.roughnessMap.channel),anisotropyMapUv:H&&g(v.anisotropyMap.channel),clearcoatMapUv:W&&g(v.clearcoatMap.channel),clearcoatNormalMapUv:te&&g(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:re&&g(v.clearcoatRoughnessMap.channel),iridescenceMapUv:X&&g(v.iridescenceMap.channel),iridescenceThicknessMapUv:K&&g(v.iridescenceThicknessMap.channel),sheenColorMapUv:oe&&g(v.sheenColorMap.channel),sheenRoughnessMapUv:Ee&&g(v.sheenRoughnessMap.channel),specularMapUv:ue&&g(v.specularMap.channel),specularColorMapUv:ae&&g(v.specularColorMap.channel),specularIntensityMapUv:Ae&&g(v.specularIntensityMap.channel),transmissionMapUv:De&&g(v.transmissionMap.channel),thicknessMapUv:ze&&g(v.thicknessMap.channel),alphaMapUv:ie&&g(v.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(Pt||I),vertexNormals:!!O.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!O.attributes.uv&&(bt||ie),fog:!!Z,useFog:v.fog===!0,fogExp2:!!Z&&Z.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||O.attributes.normal===void 0&&Pt===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Ne,skinning:F.isSkinnedMesh===!0,hasPositionAttribute:O.attributes.position!==void 0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:_e,morphTextureStride:Se,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:G.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:n.shadowMap.enabled&&D.length>0,shadowMapType:n.shadowMap.type,toneMapping:Q,decodeVideoTexture:bt&&v.map.isVideoTexture===!0&&Ye.getTransfer(v.map.colorSpace)===rt,decodeVideoTextureEmissive:Bt&&v.emissiveMap.isVideoTexture===!0&&Ye.getTransfer(v.emissiveMap.colorSpace)===rt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Ti,flipSided:v.side===jt,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:ge&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ge&&v.extensions.multiDraw===!0||Pe)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return be.vertexUv1s=l.has(1),be.vertexUv2s=l.has(2),be.vertexUv3s=l.has(3),l.clear(),be}function m(v){const T=[];if(v.shaderID?T.push(v.shaderID):(T.push(v.customVertexShaderID),T.push(v.customFragmentShaderID)),v.defines!==void 0)for(const D in v.defines)T.push(D),T.push(v.defines[D]);return v.isRawShaderMaterial===!1&&(f(T,v),M(T,v),T.push(n.outputColorSpace)),T.push(v.customProgramCacheKey),T.join()}function f(v,T){v.push(T.precision),v.push(T.outputColorSpace),v.push(T.envMapMode),v.push(T.envMapCubeUVHeight),v.push(T.mapUv),v.push(T.alphaMapUv),v.push(T.lightMapUv),v.push(T.aoMapUv),v.push(T.bumpMapUv),v.push(T.normalMapUv),v.push(T.displacementMapUv),v.push(T.emissiveMapUv),v.push(T.metalnessMapUv),v.push(T.roughnessMapUv),v.push(T.anisotropyMapUv),v.push(T.clearcoatMapUv),v.push(T.clearcoatNormalMapUv),v.push(T.clearcoatRoughnessMapUv),v.push(T.iridescenceMapUv),v.push(T.iridescenceThicknessMapUv),v.push(T.sheenColorMapUv),v.push(T.sheenRoughnessMapUv),v.push(T.specularMapUv),v.push(T.specularColorMapUv),v.push(T.specularIntensityMapUv),v.push(T.transmissionMapUv),v.push(T.thicknessMapUv),v.push(T.combine),v.push(T.fogExp2),v.push(T.sizeAttenuation),v.push(T.morphTargetsCount),v.push(T.morphAttributeCount),v.push(T.numDirLights),v.push(T.numPointLights),v.push(T.numSpotLights),v.push(T.numSpotLightMaps),v.push(T.numHemiLights),v.push(T.numRectAreaLights),v.push(T.numDirLightShadows),v.push(T.numPointLightShadows),v.push(T.numSpotLightShadows),v.push(T.numSpotLightShadowsWithMaps),v.push(T.numLightProbes),v.push(T.shadowMapType),v.push(T.toneMapping),v.push(T.numClippingPlanes),v.push(T.numClipIntersection),v.push(T.depthPacking)}function M(v,T){o.disableAll(),T.instancing&&o.enable(0),T.instancingColor&&o.enable(1),T.instancingMorph&&o.enable(2),T.matcap&&o.enable(3),T.envMap&&o.enable(4),T.normalMapObjectSpace&&o.enable(5),T.normalMapTangentSpace&&o.enable(6),T.clearcoat&&o.enable(7),T.iridescence&&o.enable(8),T.alphaTest&&o.enable(9),T.vertexColors&&o.enable(10),T.vertexAlphas&&o.enable(11),T.vertexUv1s&&o.enable(12),T.vertexUv2s&&o.enable(13),T.vertexUv3s&&o.enable(14),T.vertexTangents&&o.enable(15),T.anisotropy&&o.enable(16),T.alphaHash&&o.enable(17),T.batching&&o.enable(18),T.dispersion&&o.enable(19),T.batchingColor&&o.enable(20),T.gradientMap&&o.enable(21),T.packedNormalMap&&o.enable(22),T.vertexNormals&&o.enable(23),v.push(o.mask),o.disableAll(),T.fog&&o.enable(0),T.useFog&&o.enable(1),T.flatShading&&o.enable(2),T.logarithmicDepthBuffer&&o.enable(3),T.reversedDepthBuffer&&o.enable(4),T.skinning&&o.enable(5),T.morphTargets&&o.enable(6),T.morphNormals&&o.enable(7),T.morphColors&&o.enable(8),T.premultipliedAlpha&&o.enable(9),T.shadowMapEnabled&&o.enable(10),T.doubleSided&&o.enable(11),T.flipSided&&o.enable(12),T.useDepthPacking&&o.enable(13),T.dithering&&o.enable(14),T.transmission&&o.enable(15),T.sheen&&o.enable(16),T.opaque&&o.enable(17),T.pointsUvs&&o.enable(18),T.decodeVideoTexture&&o.enable(19),T.decodeVideoTextureEmissive&&o.enable(20),T.alphaToCoverage&&o.enable(21),T.numLightProbeGrids>0&&o.enable(22),T.hasPositionAttribute&&o.enable(23),v.push(o.mask)}function E(v){const T=p[v.type];let D;if(T){const P=Ui[T];D=hp.clone(P.uniforms)}else D=v.uniforms;return D}function y(v,T){let D=h.get(T);return D!==void 0?++D.usedTimes:(D=new k_(n,T,v,s),c.push(D),h.set(T,D)),D}function w(v){if(--v.usedTimes===0){const T=c.indexOf(v);c[T]=c[c.length-1],c.pop(),h.delete(v.cacheKey),v.destroy()}}function A(v){a.remove(v)}function R(){a.dispose()}return{getParameters:x,getProgramCacheKey:m,getUniforms:E,acquireProgram:y,releaseProgram:w,releaseShaderCache:A,programs:c,dispose:R}}function Y_(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function q_(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Mu(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function bu(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function o(u){let p=0;return u.isInstancedMesh&&(p+=2),u.isSkinnedMesh&&(p+=1),p}function a(u,p,g,x,m,f){let M=n[e];return M===void 0?(M={id:u.id,object:u,geometry:p,material:g,materialVariant:o(u),groupOrder:x,renderOrder:u.renderOrder,z:m,group:f},n[e]=M):(M.id=u.id,M.object=u,M.geometry=p,M.material=g,M.materialVariant=o(u),M.groupOrder=x,M.renderOrder=u.renderOrder,M.z=m,M.group=f),e++,M}function l(u,p,g,x,m,f){const M=a(u,p,g,x,m,f);g.transmission>0?i.push(M):g.transparent===!0?s.push(M):t.push(M)}function c(u,p,g,x,m,f){const M=a(u,p,g,x,m,f);g.transmission>0?i.unshift(M):g.transparent===!0?s.unshift(M):t.unshift(M)}function h(u,p,g){t.length>1&&t.sort(u||q_),i.length>1&&i.sort(p||Mu),s.length>1&&s.sort(p||Mu),g&&(t.reverse(),i.reverse(),s.reverse())}function d(){for(let u=e,p=n.length;u<p;u++){const g=n[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:l,unshift:c,finish:d,sort:h}}function $_(){let n=new WeakMap;function e(i,s){const r=n.get(i);let o;return r===void 0?(o=new bu,n.set(i,[o])):s>=r.length?(o=new bu,r.push(o)):o=r[s],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function K_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new C,color:new de};break;case"SpotLight":t={position:new C,direction:new C,color:new de,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new C,color:new de,distance:0,decay:0};break;case"HemisphereLight":t={direction:new C,skyColor:new de,groundColor:new de};break;case"RectAreaLight":t={color:new de,position:new C,halfWidth:new C,halfHeight:new C};break}return n[e.id]=t,t}}}function Z_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let J_=0;function Q_(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function j_(n){const e=new K_,t=Z_(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new C);const s=new C,r=new qe,o=new qe;function a(c){let h=0,d=0,u=0;for(let T=0;T<9;T++)i.probe[T].set(0,0,0);let p=0,g=0,x=0,m=0,f=0,M=0,E=0,y=0,w=0,A=0,R=0;c.sort(Q_);for(let T=0,D=c.length;T<D;T++){const P=c[T],F=P.color,G=P.intensity,Z=P.distance;let O=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===qn?O=P.shadow.map.texture:O=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)h+=F.r*G,d+=F.g*G,u+=F.b*G;else if(P.isLightProbe){for(let Y=0;Y<9;Y++)i.probe[Y].addScaledVector(P.sh.coefficients[Y],G);R++}else if(P.isDirectionalLight){const Y=e.get(P);if(Y.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const z=P.shadow,J=t.get(P);J.shadowIntensity=z.intensity,J.shadowBias=z.bias,J.shadowNormalBias=z.normalBias,J.shadowRadius=z.radius,J.shadowMapSize=z.mapSize,i.directionalShadow[p]=J,i.directionalShadowMap[p]=O,i.directionalShadowMatrix[p]=P.shadow.matrix,M++}i.directional[p]=Y,p++}else if(P.isSpotLight){const Y=e.get(P);Y.position.setFromMatrixPosition(P.matrixWorld),Y.color.copy(F).multiplyScalar(G),Y.distance=Z,Y.coneCos=Math.cos(P.angle),Y.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),Y.decay=P.decay,i.spot[x]=Y;const z=P.shadow;if(P.map&&(i.spotLightMap[w]=P.map,w++,z.updateMatrices(P),P.castShadow&&A++),i.spotLightMatrix[x]=z.matrix,P.castShadow){const J=t.get(P);J.shadowIntensity=z.intensity,J.shadowBias=z.bias,J.shadowNormalBias=z.normalBias,J.shadowRadius=z.radius,J.shadowMapSize=z.mapSize,i.spotShadow[x]=J,i.spotShadowMap[x]=O,y++}x++}else if(P.isRectAreaLight){const Y=e.get(P);Y.color.copy(F).multiplyScalar(G),Y.halfWidth.set(P.width*.5,0,0),Y.halfHeight.set(0,P.height*.5,0),i.rectArea[m]=Y,m++}else if(P.isPointLight){const Y=e.get(P);if(Y.color.copy(P.color).multiplyScalar(P.intensity),Y.distance=P.distance,Y.decay=P.decay,P.castShadow){const z=P.shadow,J=t.get(P);J.shadowIntensity=z.intensity,J.shadowBias=z.bias,J.shadowNormalBias=z.normalBias,J.shadowRadius=z.radius,J.shadowMapSize=z.mapSize,J.shadowCameraNear=z.camera.near,J.shadowCameraFar=z.camera.far,i.pointShadow[g]=J,i.pointShadowMap[g]=O,i.pointShadowMatrix[g]=P.shadow.matrix,E++}i.point[g]=Y,g++}else if(P.isHemisphereLight){const Y=e.get(P);Y.skyColor.copy(P.color).multiplyScalar(G),Y.groundColor.copy(P.groundColor).multiplyScalar(G),i.hemi[f]=Y,f++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=he.LTC_FLOAT_1,i.rectAreaLTC2=he.LTC_FLOAT_2):(i.rectAreaLTC1=he.LTC_HALF_1,i.rectAreaLTC2=he.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=d,i.ambient[2]=u;const v=i.hash;(v.directionalLength!==p||v.pointLength!==g||v.spotLength!==x||v.rectAreaLength!==m||v.hemiLength!==f||v.numDirectionalShadows!==M||v.numPointShadows!==E||v.numSpotShadows!==y||v.numSpotMaps!==w||v.numLightProbes!==R)&&(i.directional.length=p,i.spot.length=x,i.rectArea.length=m,i.point.length=g,i.hemi.length=f,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=E,i.pointShadowMap.length=E,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=E,i.spotLightMatrix.length=y+w-A,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=R,v.directionalLength=p,v.pointLength=g,v.spotLength=x,v.rectAreaLength=m,v.hemiLength=f,v.numDirectionalShadows=M,v.numPointShadows=E,v.numSpotShadows=y,v.numSpotMaps=w,v.numLightProbes=R,i.version=J_++)}function l(c,h){let d=0,u=0,p=0,g=0,x=0;const m=h.matrixWorldInverse;for(let f=0,M=c.length;f<M;f++){const E=c[f];if(E.isDirectionalLight){const y=i.directional[d];y.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),d++}else if(E.isSpotLight){const y=i.spot[p];y.position.setFromMatrixPosition(E.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),p++}else if(E.isRectAreaLight){const y=i.rectArea[g];y.position.setFromMatrixPosition(E.matrixWorld),y.position.applyMatrix4(m),o.identity(),r.copy(E.matrixWorld),r.premultiply(m),o.extractRotation(r),y.halfWidth.set(E.width*.5,0,0),y.halfHeight.set(0,E.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),g++}else if(E.isPointLight){const y=i.point[u];y.position.setFromMatrixPosition(E.matrixWorld),y.position.applyMatrix4(m),u++}else if(E.isHemisphereLight){const y=i.hemi[x];y.direction.setFromMatrixPosition(E.matrixWorld),y.direction.transformDirection(m),x++}}}return{setup:a,setupView:l,state:i}}function Eu(n){const e=new j_(n),t=[],i=[],s=[];function r(u){d.camera=u,t.length=0,i.length=0,s.length=0}function o(u){t.push(u)}function a(u){i.push(u)}function l(u){s.push(u)}function c(){e.setup(t)}function h(u){e.setupView(t,u)}const d={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:h,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function ev(n){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new Eu(n),e.set(s,[a])):r>=o.length?(a=new Eu(n),o.push(a)):a=o[r],a}function i(){e=new WeakMap}return{get:t,dispose:i}}const tv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,iv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,nv=[new C(1,0,0),new C(-1,0,0),new C(0,1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1)],sv=[new C(0,-1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1),new C(0,-1,0),new C(0,-1,0)],wu=new qe,ks=new C,ga=new C;function rv(n,e,t){let i=new Vl;const s=new Ce,r=new Ce,o=new _t,a=new mp,l=new gp,c={},h=t.maxTextureSize,d={[bn]:jt,[jt]:bn,[Ti]:Ti},u=new dt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ce},radius:{value:4}},vertexShader:tv,fragmentShader:iv}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const g=new It;g.setAttribute("position",new je(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new ei(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=jr;let f=this.type;this.render=function(A,R,v){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;this.type===Od&&(Re("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=jr);const T=n.getRenderTarget(),D=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),F=n.state;F.setBlending(Zi),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const G=f!==this.type;G&&R.traverse(function(Z){Z.material&&(Array.isArray(Z.material)?Z.material.forEach(O=>O.needsUpdate=!0):Z.material.needsUpdate=!0)});for(let Z=0,O=A.length;Z<O;Z++){const Y=A[Z],z=Y.shadow;if(z===void 0){Re("WebGLShadowMap:",Y,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;s.copy(z.mapSize);const J=z.getFrameExtents();s.multiply(J),r.copy(z.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/J.x),s.x=r.x*J.x,z.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/J.y),s.y=r.y*J.y,z.mapSize.y=r.y));const j=n.state.buffers.depth.getReversed();if(z.camera._reversedDepth=j,z.map===null||G===!0){if(z.map!==null&&(z.map.depthTexture!==null&&(z.map.depthTexture.dispose(),z.map.depthTexture=null),z.map.dispose()),this.type===Zs){if(Y.isPointLight){Re("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}z.map=new ui(s.x,s.y,{format:qn,type:xi,minFilter:Mt,magFilter:Mt,generateMipmaps:!1}),z.map.texture.name=Y.name+".shadowMap",z.map.depthTexture=new En(s.x,s.y,Oi),z.map.depthTexture.name=Y.name+".shadowMapDepth",z.map.depthTexture.format=ji,z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Ht,z.map.depthTexture.magFilter=Ht}else Y.isPointLight?(z.map=new Yh(s.x),z.map.depthTexture=new ap(s.x,vi)):(z.map=new ui(s.x,s.y),z.map.depthTexture=new En(s.x,s.y,vi)),z.map.depthTexture.name=Y.name+".shadowMap",z.map.depthTexture.format=ji,this.type===jr?(z.map.depthTexture.compareFunction=j?Bl:Ol,z.map.depthTexture.minFilter=Mt,z.map.depthTexture.magFilter=Mt):(z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Ht,z.map.depthTexture.magFilter=Ht);z.camera.updateProjectionMatrix()}const ce=z.map.isWebGLCubeRenderTarget?6:1;for(let fe=0;fe<ce;fe++){if(z.map.isWebGLCubeRenderTarget)n.setRenderTarget(z.map,fe),n.clear();else{fe===0&&(n.setRenderTarget(z.map),n.clear());const _e=z.getViewport(fe);o.set(r.x*_e.x,r.y*_e.y,r.x*_e.z,r.y*_e.w),F.viewport(o)}if(Y.isPointLight){const _e=z.camera,Se=z.matrix,Oe=Y.distance||_e.far;Oe!==_e.far&&(_e.far=Oe,_e.updateProjectionMatrix()),ks.setFromMatrixPosition(Y.matrixWorld),_e.position.copy(ks),ga.copy(_e.position),ga.add(nv[fe]),_e.up.copy(sv[fe]),_e.lookAt(ga),_e.updateMatrixWorld(),Se.makeTranslation(-ks.x,-ks.y,-ks.z),wu.multiplyMatrices(_e.projectionMatrix,_e.matrixWorldInverse),z._frustum.setFromProjectionMatrix(wu,_e.coordinateSystem,_e.reversedDepth)}else z.updateMatrices(Y);i=z.getFrustum(),y(R,v,z.camera,Y,this.type)}z.isPointLightShadow!==!0&&this.type===Zs&&M(z,v),z.needsUpdate=!1}f=this.type,m.needsUpdate=!1,n.setRenderTarget(T,D,P)};function M(A,R){const v=e.update(x);u.defines.VSM_SAMPLES!==A.blurSamples&&(u.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new ui(s.x,s.y,{format:qn,type:xi})),u.uniforms.shadow_pass.value=A.map.depthTexture,u.uniforms.resolution.value=A.mapSize,u.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(R,null,v,u,x,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(R,null,v,p,x,null)}function E(A,R,v,T){let D=null;const P=v.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(P!==void 0)D=P;else if(D=v.isPointLight===!0?l:a,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const F=D.uuid,G=R.uuid;let Z=c[F];Z===void 0&&(Z={},c[F]=Z);let O=Z[G];O===void 0&&(O=D.clone(),Z[G]=O,R.addEventListener("dispose",w)),D=O}if(D.visible=R.visible,D.wireframe=R.wireframe,T===Zs?D.side=R.shadowSide!==null?R.shadowSide:R.side:D.side=R.shadowSide!==null?R.shadowSide:d[R.side],D.alphaMap=R.alphaMap,D.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,D.map=R.map,D.clipShadows=R.clipShadows,D.clippingPlanes=R.clippingPlanes,D.clipIntersection=R.clipIntersection,D.displacementMap=R.displacementMap,D.displacementScale=R.displacementScale,D.displacementBias=R.displacementBias,D.wireframeLinewidth=R.wireframeLinewidth,D.linewidth=R.linewidth,v.isPointLight===!0&&D.isMeshDistanceMaterial===!0){const F=n.properties.get(D);F.light=v}return D}function y(A,R,v,T,D){if(A.visible===!1)return;if(A.layers.test(R.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&D===Zs)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,A.matrixWorld);const G=e.update(A),Z=A.material;if(Array.isArray(Z)){const O=G.groups;for(let Y=0,z=O.length;Y<z;Y++){const J=O[Y],j=Z[J.materialIndex];if(j&&j.visible){const ce=E(A,j,T,D);A.onBeforeShadow(n,A,R,v,G,ce,J),n.renderBufferDirect(v,null,G,ce,A,J),A.onAfterShadow(n,A,R,v,G,ce,J)}}}else if(Z.visible){const O=E(A,Z,T,D);A.onBeforeShadow(n,A,R,v,G,O,null),n.renderBufferDirect(v,null,G,O,A,null),A.onAfterShadow(n,A,R,v,G,O,null)}}const F=A.children;for(let G=0,Z=F.length;G<Z;G++)y(F[G],R,v,T,D)}function w(A){A.target.removeEventListener("dispose",w);for(const v in c){const T=c[v],D=A.target.uuid;D in T&&(T[D].dispose(),delete T[D])}}}function ov(n,e){function t(){let L=!1;const ie=new _t;let $=null;const le=new _t(0,0,0,0);return{setMask:function(ge){$!==ge&&!L&&(n.colorMask(ge,ge,ge,ge),$=ge)},setLocked:function(ge){L=ge},setClear:function(ge,Q,be,ye,St){St===!0&&(ge*=ye,Q*=ye,be*=ye),ie.set(ge,Q,be,ye),le.equals(ie)===!1&&(n.clearColor(ge,Q,be,ye),le.copy(ie))},reset:function(){L=!1,$=null,le.set(-1,0,0,0)}}}function i(){let L=!1,ie=!1,$=null,le=null,ge=null;return{setReversed:function(Q){if(ie!==Q){const be=e.get("EXT_clip_control");Q?be.clipControlEXT(be.LOWER_LEFT_EXT,be.ZERO_TO_ONE_EXT):be.clipControlEXT(be.LOWER_LEFT_EXT,be.NEGATIVE_ONE_TO_ONE_EXT),ie=Q;const ye=ge;ge=null,this.setClear(ye)}},getReversed:function(){return ie},setTest:function(Q){Q?ee(n.DEPTH_TEST):Ne(n.DEPTH_TEST)},setMask:function(Q){$!==Q&&!L&&(n.depthMask(Q),$=Q)},setFunc:function(Q){if(ie&&(Q=_f[Q]),le!==Q){switch(Q){case Na:n.depthFunc(n.NEVER);break;case Fa:n.depthFunc(n.ALWAYS);break;case Ua:n.depthFunc(n.LESS);break;case Es:n.depthFunc(n.LEQUAL);break;case Oa:n.depthFunc(n.EQUAL);break;case Ba:n.depthFunc(n.GEQUAL);break;case za:n.depthFunc(n.GREATER);break;case ka:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}le=Q}},setLocked:function(Q){L=Q},setClear:function(Q){ge!==Q&&(ge=Q,ie&&(Q=1-Q),n.clearDepth(Q))},reset:function(){L=!1,$=null,le=null,ge=null,ie=!1}}}function s(){let L=!1,ie=null,$=null,le=null,ge=null,Q=null,be=null,ye=null,St=null;return{setTest:function(pt){L||(pt?ee(n.STENCIL_TEST):Ne(n.STENCIL_TEST))},setMask:function(pt){ie!==pt&&!L&&(n.stencilMask(pt),ie=pt)},setFunc:function(pt,Di,Li){($!==pt||le!==Di||ge!==Li)&&(n.stencilFunc(pt,Di,Li),$=pt,le=Di,ge=Li)},setOp:function(pt,Di,Li){(Q!==pt||be!==Di||ye!==Li)&&(n.stencilOp(pt,Di,Li),Q=pt,be=Di,ye=Li)},setLocked:function(pt){L=pt},setClear:function(pt){St!==pt&&(n.clearStencil(pt),St=pt)},reset:function(){L=!1,ie=null,$=null,le=null,ge=null,Q=null,be=null,ye=null,St=null}}}const r=new t,o=new i,a=new s,l=new WeakMap,c=new WeakMap;let h={},d={},u={},p=new WeakMap,g=[],x=null,m=!1,f=null,M=null,E=null,y=null,w=null,A=null,R=null,v=new de(0,0,0),T=0,D=!1,P=null,F=null,G=null,Z=null,O=null;const Y=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,J=0;const j=n.getParameter(n.VERSION);j.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(j)[1]),z=J>=1):j.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),z=J>=2);let ce=null,fe={};const _e=n.getParameter(n.SCISSOR_BOX),Se=n.getParameter(n.VIEWPORT),Oe=new _t().fromArray(_e),Fe=new _t().fromArray(Se);function q(L,ie,$,le){const ge=new Uint8Array(4),Q=n.createTexture();n.bindTexture(L,Q),n.texParameteri(L,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(L,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let be=0;be<$;be++)L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY?n.texImage3D(ie,0,n.RGBA,1,1,le,0,n.RGBA,n.UNSIGNED_BYTE,ge):n.texImage2D(ie+be,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ge);return Q}const se={};se[n.TEXTURE_2D]=q(n.TEXTURE_2D,n.TEXTURE_2D,1),se[n.TEXTURE_CUBE_MAP]=q(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),se[n.TEXTURE_2D_ARRAY]=q(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),se[n.TEXTURE_3D]=q(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ee(n.DEPTH_TEST),o.setFunc(Es),Tt(!1),Pt(_c),ee(n.CULL_FACE),tt(Zi);function ee(L){h[L]!==!0&&(n.enable(L),h[L]=!0)}function Ne(L){h[L]!==!1&&(n.disable(L),h[L]=!1)}function Be(L,ie){return u[L]!==ie?(n.bindFramebuffer(L,ie),u[L]=ie,L===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=ie),L===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=ie),!0):!1}function Pe(L,ie){let $=g,le=!1;if(L){$=p.get(ie),$===void 0&&($=[],p.set(ie,$));const ge=L.textures;if($.length!==ge.length||$[0]!==n.COLOR_ATTACHMENT0){for(let Q=0,be=ge.length;Q<be;Q++)$[Q]=n.COLOR_ATTACHMENT0+Q;$.length=ge.length,le=!0}}else $[0]!==n.BACK&&($[0]=n.BACK,le=!0);le&&n.drawBuffers($)}function bt(L){return x!==L?(n.useProgram(L),x=L,!0):!1}const Xe={[On]:n.FUNC_ADD,[zd]:n.FUNC_SUBTRACT,[kd]:n.FUNC_REVERSE_SUBTRACT};Xe[Hd]=n.MIN,Xe[Vd]=n.MAX;const lt={[Gd]:n.ZERO,[Wd]:n.ONE,[Xd]:n.SRC_COLOR,[La]:n.SRC_ALPHA,[Jd]:n.SRC_ALPHA_SATURATE,[Kd]:n.DST_COLOR,[qd]:n.DST_ALPHA,[Yd]:n.ONE_MINUS_SRC_COLOR,[Ia]:n.ONE_MINUS_SRC_ALPHA,[Zd]:n.ONE_MINUS_DST_COLOR,[$d]:n.ONE_MINUS_DST_ALPHA,[Qd]:n.CONSTANT_COLOR,[jd]:n.ONE_MINUS_CONSTANT_COLOR,[ef]:n.CONSTANT_ALPHA,[tf]:n.ONE_MINUS_CONSTANT_ALPHA};function tt(L,ie,$,le,ge,Q,be,ye,St,pt){if(L===Zi){m===!0&&(Ne(n.BLEND),m=!1);return}if(m===!1&&(ee(n.BLEND),m=!0),L!==Bd){if(L!==f||pt!==D){if((M!==On||w!==On)&&(n.blendEquation(n.FUNC_ADD),M=On,w=On),pt)switch(L){case Ji:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case bs:n.blendFunc(n.ONE,n.ONE);break;case vc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case xc:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Ze("WebGLState: Invalid blending: ",L);break}else switch(L){case Ji:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case bs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case vc:Ze("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case xc:Ze("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ze("WebGLState: Invalid blending: ",L);break}E=null,y=null,A=null,R=null,v.set(0,0,0),T=0,f=L,D=pt}return}ge=ge||ie,Q=Q||$,be=be||le,(ie!==M||ge!==w)&&(n.blendEquationSeparate(Xe[ie],Xe[ge]),M=ie,w=ge),($!==E||le!==y||Q!==A||be!==R)&&(n.blendFuncSeparate(lt[$],lt[le],lt[Q],lt[be]),E=$,y=le,A=Q,R=be),(ye.equals(v)===!1||St!==T)&&(n.blendColor(ye.r,ye.g,ye.b,St),v.copy(ye),T=St),f=L,D=!1}function $e(L,ie){L.side===Ti?Ne(n.CULL_FACE):ee(n.CULL_FACE);let $=L.side===jt;ie&&($=!$),Tt($),L.blending===Ji&&L.transparent===!1?tt(Zi):tt(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),o.setFunc(L.depthFunc),o.setTest(L.depthTest),o.setMask(L.depthWrite),r.setMask(L.colorWrite);const le=L.stencilWrite;a.setTest(le),le&&(a.setMask(L.stencilWriteMask),a.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),a.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Bt(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?ee(n.SAMPLE_ALPHA_TO_COVERAGE):Ne(n.SAMPLE_ALPHA_TO_COVERAGE)}function Tt(L){P!==L&&(L?n.frontFace(n.CW):n.frontFace(n.CCW),P=L)}function Pt(L){L!==Fd?(ee(n.CULL_FACE),L!==F&&(L===_c?n.cullFace(n.BACK):L===Ud?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ne(n.CULL_FACE),F=L}function Ut(L){L!==G&&(z&&n.lineWidth(L),G=L)}function Bt(L,ie,$){L?(ee(n.POLYGON_OFFSET_FILL),(Z!==ie||O!==$)&&(Z=ie,O=$,o.getReversed()&&(ie=-ie),n.polygonOffset(ie,$))):Ne(n.POLYGON_OFFSET_FILL)}function xt(L){L?ee(n.SCISSOR_TEST):Ne(n.SCISSOR_TEST)}function At(L){L===void 0&&(L=n.TEXTURE0+Y-1),ce!==L&&(n.activeTexture(L),ce=L)}function I(L,ie,$){$===void 0&&(ce===null?$=n.TEXTURE0+Y-1:$=ce);let le=fe[$];le===void 0&&(le={type:void 0,texture:void 0},fe[$]=le),(le.type!==L||le.texture!==ie)&&(ce!==$&&(n.activeTexture($),ce=$),n.bindTexture(L,ie||se[L]),le.type=L,le.texture=ie)}function ti(){const L=fe[ce];L!==void 0&&L.type!==void 0&&(n.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function nt(){try{n.compressedTexImage2D(...arguments)}catch(L){Ze("WebGLState:",L)}}function b(){try{n.compressedTexImage3D(...arguments)}catch(L){Ze("WebGLState:",L)}}function _(){try{n.texSubImage2D(...arguments)}catch(L){Ze("WebGLState:",L)}}function U(){try{n.texSubImage3D(...arguments)}catch(L){Ze("WebGLState:",L)}}function H(){try{n.compressedTexSubImage2D(...arguments)}catch(L){Ze("WebGLState:",L)}}function W(){try{n.compressedTexSubImage3D(...arguments)}catch(L){Ze("WebGLState:",L)}}function te(){try{n.texStorage2D(...arguments)}catch(L){Ze("WebGLState:",L)}}function re(){try{n.texStorage3D(...arguments)}catch(L){Ze("WebGLState:",L)}}function X(){try{n.texImage2D(...arguments)}catch(L){Ze("WebGLState:",L)}}function K(){try{n.texImage3D(...arguments)}catch(L){Ze("WebGLState:",L)}}function oe(L){return d[L]!==void 0?d[L]:n.getParameter(L)}function Ee(L,ie){d[L]!==ie&&(n.pixelStorei(L,ie),d[L]=ie)}function ue(L){Oe.equals(L)===!1&&(n.scissor(L.x,L.y,L.z,L.w),Oe.copy(L))}function ae(L){Fe.equals(L)===!1&&(n.viewport(L.x,L.y,L.z,L.w),Fe.copy(L))}function Ae(L,ie){let $=c.get(ie);$===void 0&&($=new WeakMap,c.set(ie,$));let le=$.get(L);le===void 0&&(le=n.getUniformBlockIndex(ie,L.name),$.set(L,le))}function De(L,ie){const le=c.get(ie).get(L);l.get(ie)!==le&&(n.uniformBlockBinding(ie,le,L.__bindingPointIndex),l.set(ie,le))}function ze(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),h={},d={},ce=null,fe={},u={},p=new WeakMap,g=[],x=null,m=!1,f=null,M=null,E=null,y=null,w=null,A=null,R=null,v=new de(0,0,0),T=0,D=!1,P=null,F=null,G=null,Z=null,O=null,Oe.set(0,0,n.canvas.width,n.canvas.height),Fe.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ee,disable:Ne,bindFramebuffer:Be,drawBuffers:Pe,useProgram:bt,setBlending:tt,setMaterial:$e,setFlipSided:Tt,setCullFace:Pt,setLineWidth:Ut,setPolygonOffset:Bt,setScissorTest:xt,activeTexture:At,bindTexture:I,unbindTexture:ti,compressedTexImage2D:nt,compressedTexImage3D:b,texImage2D:X,texImage3D:K,pixelStorei:Ee,getParameter:oe,updateUBOMapping:Ae,uniformBlockBinding:De,texStorage2D:te,texStorage3D:re,texSubImage2D:_,texSubImage3D:U,compressedTexSubImage2D:H,compressedTexSubImage3D:W,scissor:ue,viewport:ae,reset:ze}}function av(n,e,t,i,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ce,h=new WeakMap,d=new Set;let u;const p=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(b,_){return g?new OffscreenCanvas(b,_):ho("canvas")}function m(b,_,U){let H=1;const W=nt(b);if((W.width>U||W.height>U)&&(H=U/Math.max(W.width,W.height)),H<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const te=Math.floor(H*W.width),re=Math.floor(H*W.height);u===void 0&&(u=x(te,re));const X=_?x(te,re):u;return X.width=te,X.height=re,X.getContext("2d").drawImage(b,0,0,te,re),Re("WebGLRenderer: Texture has been resized from ("+W.width+"x"+W.height+") to ("+te+"x"+re+")."),X}else return"data"in b&&Re("WebGLRenderer: Image in DataTexture is too big ("+W.width+"x"+W.height+")."),b;return b}function f(b){return b.generateMipmaps}function M(b){n.generateMipmap(b)}function E(b){return b.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?n.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function y(b,_,U,H,W,te=!1){if(b!==null){if(n[b]!==void 0)return n[b];Re("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let re;H&&(re=e.get("EXT_texture_norm16"),re||Re("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let X=_;if(_===n.RED&&(U===n.FLOAT&&(X=n.R32F),U===n.HALF_FLOAT&&(X=n.R16F),U===n.UNSIGNED_BYTE&&(X=n.R8),U===n.UNSIGNED_SHORT&&re&&(X=re.R16_EXT),U===n.SHORT&&re&&(X=re.R16_SNORM_EXT)),_===n.RED_INTEGER&&(U===n.UNSIGNED_BYTE&&(X=n.R8UI),U===n.UNSIGNED_SHORT&&(X=n.R16UI),U===n.UNSIGNED_INT&&(X=n.R32UI),U===n.BYTE&&(X=n.R8I),U===n.SHORT&&(X=n.R16I),U===n.INT&&(X=n.R32I)),_===n.RG&&(U===n.FLOAT&&(X=n.RG32F),U===n.HALF_FLOAT&&(X=n.RG16F),U===n.UNSIGNED_BYTE&&(X=n.RG8),U===n.UNSIGNED_SHORT&&re&&(X=re.RG16_EXT),U===n.SHORT&&re&&(X=re.RG16_SNORM_EXT)),_===n.RG_INTEGER&&(U===n.UNSIGNED_BYTE&&(X=n.RG8UI),U===n.UNSIGNED_SHORT&&(X=n.RG16UI),U===n.UNSIGNED_INT&&(X=n.RG32UI),U===n.BYTE&&(X=n.RG8I),U===n.SHORT&&(X=n.RG16I),U===n.INT&&(X=n.RG32I)),_===n.RGB_INTEGER&&(U===n.UNSIGNED_BYTE&&(X=n.RGB8UI),U===n.UNSIGNED_SHORT&&(X=n.RGB16UI),U===n.UNSIGNED_INT&&(X=n.RGB32UI),U===n.BYTE&&(X=n.RGB8I),U===n.SHORT&&(X=n.RGB16I),U===n.INT&&(X=n.RGB32I)),_===n.RGBA_INTEGER&&(U===n.UNSIGNED_BYTE&&(X=n.RGBA8UI),U===n.UNSIGNED_SHORT&&(X=n.RGBA16UI),U===n.UNSIGNED_INT&&(X=n.RGBA32UI),U===n.BYTE&&(X=n.RGBA8I),U===n.SHORT&&(X=n.RGBA16I),U===n.INT&&(X=n.RGBA32I)),_===n.RGB&&(U===n.UNSIGNED_SHORT&&re&&(X=re.RGB16_EXT),U===n.SHORT&&re&&(X=re.RGB16_SNORM_EXT),U===n.UNSIGNED_INT_5_9_9_9_REV&&(X=n.RGB9_E5),U===n.UNSIGNED_INT_10F_11F_11F_REV&&(X=n.R11F_G11F_B10F)),_===n.RGBA){const K=te?uo:Ye.getTransfer(W);U===n.FLOAT&&(X=n.RGBA32F),U===n.HALF_FLOAT&&(X=n.RGBA16F),U===n.UNSIGNED_BYTE&&(X=K===rt?n.SRGB8_ALPHA8:n.RGBA8),U===n.UNSIGNED_SHORT&&re&&(X=re.RGBA16_EXT),U===n.SHORT&&re&&(X=re.RGBA16_SNORM_EXT),U===n.UNSIGNED_SHORT_4_4_4_4&&(X=n.RGBA4),U===n.UNSIGNED_SHORT_5_5_5_1&&(X=n.RGB5_A1)}return(X===n.R16F||X===n.R32F||X===n.RG16F||X===n.RG32F||X===n.RGBA16F||X===n.RGBA32F)&&e.get("EXT_color_buffer_float"),X}function w(b,_){let U;return b?_===null||_===vi||_===rr?U=n.DEPTH24_STENCIL8:_===Oi?U=n.DEPTH32F_STENCIL8:_===sr&&(U=n.DEPTH24_STENCIL8,Re("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===vi||_===rr?U=n.DEPTH_COMPONENT24:_===Oi?U=n.DEPTH_COMPONENT32F:_===sr&&(U=n.DEPTH_COMPONENT16),U}function A(b,_){return f(b)===!0||b.isFramebufferTexture&&b.minFilter!==Ht&&b.minFilter!==Mt?Math.log2(Math.max(_.width,_.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?_.mipmaps.length:1}function R(b){const _=b.target;_.removeEventListener("dispose",R),T(_),_.isVideoTexture&&h.delete(_),_.isHTMLTexture&&d.delete(_)}function v(b){const _=b.target;_.removeEventListener("dispose",v),P(_)}function T(b){const _=i.get(b);if(_.__webglInit===void 0)return;const U=b.source,H=p.get(U);if(H){const W=H[_.__cacheKey];W.usedTimes--,W.usedTimes===0&&D(b),Object.keys(H).length===0&&p.delete(U)}i.remove(b)}function D(b){const _=i.get(b);n.deleteTexture(_.__webglTexture);const U=b.source,H=p.get(U);delete H[_.__cacheKey],o.memory.textures--}function P(b){const _=i.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),i.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let H=0;H<6;H++){if(Array.isArray(_.__webglFramebuffer[H]))for(let W=0;W<_.__webglFramebuffer[H].length;W++)n.deleteFramebuffer(_.__webglFramebuffer[H][W]);else n.deleteFramebuffer(_.__webglFramebuffer[H]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[H])}else{if(Array.isArray(_.__webglFramebuffer))for(let H=0;H<_.__webglFramebuffer.length;H++)n.deleteFramebuffer(_.__webglFramebuffer[H]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let H=0;H<_.__webglColorRenderbuffer.length;H++)_.__webglColorRenderbuffer[H]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[H]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const U=b.textures;for(let H=0,W=U.length;H<W;H++){const te=i.get(U[H]);te.__webglTexture&&(n.deleteTexture(te.__webglTexture),o.memory.textures--),i.remove(U[H])}i.remove(b)}let F=0;function G(){F=0}function Z(){return F}function O(b){F=b}function Y(){const b=F;return b>=s.maxTextures&&Re("WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+s.maxTextures),F+=1,b}function z(b){const _=[];return _.push(b.wrapS),_.push(b.wrapT),_.push(b.wrapR||0),_.push(b.magFilter),_.push(b.minFilter),_.push(b.anisotropy),_.push(b.internalFormat),_.push(b.format),_.push(b.type),_.push(b.generateMipmaps),_.push(b.premultiplyAlpha),_.push(b.flipY),_.push(b.unpackAlignment),_.push(b.colorSpace),_.join()}function J(b,_){const U=i.get(b);if(b.isVideoTexture&&I(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&U.__version!==b.version){const H=b.image;if(H===null)Re("WebGLRenderer: Texture marked for update but no image data found.");else if(H.complete===!1)Re("WebGLRenderer: Texture marked for update but image is incomplete");else{Ne(U,b,_);return}}else b.isExternalTexture&&(U.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,U.__webglTexture,n.TEXTURE0+_)}function j(b,_){const U=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&U.__version!==b.version){Ne(U,b,_);return}else b.isExternalTexture&&(U.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,U.__webglTexture,n.TEXTURE0+_)}function ce(b,_){const U=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&U.__version!==b.version){Ne(U,b,_);return}t.bindTexture(n.TEXTURE_3D,U.__webglTexture,n.TEXTURE0+_)}function fe(b,_){const U=i.get(b);if(b.isCubeDepthTexture!==!0&&b.version>0&&U.__version!==b.version){Be(U,b,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,U.__webglTexture,n.TEXTURE0+_)}const _e={[Ha]:n.REPEAT,[Ki]:n.CLAMP_TO_EDGE,[Va]:n.MIRRORED_REPEAT},Se={[Ht]:n.NEAREST,[rf]:n.NEAREST_MIPMAP_NEAREST,[xr]:n.NEAREST_MIPMAP_LINEAR,[Mt]:n.LINEAR,[Oo]:n.LINEAR_MIPMAP_NEAREST,[Hn]:n.LINEAR_MIPMAP_LINEAR},Oe={[lf]:n.NEVER,[ff]:n.ALWAYS,[cf]:n.LESS,[Ol]:n.LEQUAL,[uf]:n.EQUAL,[Bl]:n.GEQUAL,[hf]:n.GREATER,[df]:n.NOTEQUAL};function Fe(b,_){if(_.type===Oi&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Mt||_.magFilter===Oo||_.magFilter===xr||_.magFilter===Hn||_.minFilter===Mt||_.minFilter===Oo||_.minFilter===xr||_.minFilter===Hn)&&Re("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(b,n.TEXTURE_WRAP_S,_e[_.wrapS]),n.texParameteri(b,n.TEXTURE_WRAP_T,_e[_.wrapT]),(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)&&n.texParameteri(b,n.TEXTURE_WRAP_R,_e[_.wrapR]),n.texParameteri(b,n.TEXTURE_MAG_FILTER,Se[_.magFilter]),n.texParameteri(b,n.TEXTURE_MIN_FILTER,Se[_.minFilter]),_.compareFunction&&(n.texParameteri(b,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(b,n.TEXTURE_COMPARE_FUNC,Oe[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Ht||_.minFilter!==xr&&_.minFilter!==Hn||_.type===Oi&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const U=e.get("EXT_texture_filter_anisotropic");n.texParameterf(b,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function q(b,_){let U=!1;b.__webglInit===void 0&&(b.__webglInit=!0,_.addEventListener("dispose",R));const H=_.source;let W=p.get(H);W===void 0&&(W={},p.set(H,W));const te=z(_);if(te!==b.__cacheKey){W[te]===void 0&&(W[te]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,U=!0),W[te].usedTimes++;const re=W[b.__cacheKey];re!==void 0&&(W[b.__cacheKey].usedTimes--,re.usedTimes===0&&D(_)),b.__cacheKey=te,b.__webglTexture=W[te].texture}return U}function se(b,_,U){return Math.floor(Math.floor(b/U)/_)}function ee(b,_,U,H){const te=b.updateRanges;if(te.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,U,H,_.data);else{te.sort((Ee,ue)=>Ee.start-ue.start);let re=0;for(let Ee=1;Ee<te.length;Ee++){const ue=te[re],ae=te[Ee],Ae=ue.start+ue.count,De=se(ae.start,_.width,4),ze=se(ue.start,_.width,4);ae.start<=Ae+1&&De===ze&&se(ae.start+ae.count-1,_.width,4)===De?ue.count=Math.max(ue.count,ae.start+ae.count-ue.start):(++re,te[re]=ae)}te.length=re+1;const X=t.getParameter(n.UNPACK_ROW_LENGTH),K=t.getParameter(n.UNPACK_SKIP_PIXELS),oe=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let Ee=0,ue=te.length;Ee<ue;Ee++){const ae=te[Ee],Ae=Math.floor(ae.start/4),De=Math.ceil(ae.count/4),ze=Ae%_.width,L=Math.floor(Ae/_.width),ie=De,$=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,ze),t.pixelStorei(n.UNPACK_SKIP_ROWS,L),t.texSubImage2D(n.TEXTURE_2D,0,ze,L,ie,$,U,H,_.data)}b.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,X),t.pixelStorei(n.UNPACK_SKIP_PIXELS,K),t.pixelStorei(n.UNPACK_SKIP_ROWS,oe)}}function Ne(b,_,U){let H=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(H=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(H=n.TEXTURE_3D);const W=q(b,_),te=_.source;t.bindTexture(H,b.__webglTexture,n.TEXTURE0+U);const re=i.get(te);if(te.version!==re.__version||W===!0){if(t.activeTexture(n.TEXTURE0+U),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){const $=Ye.getPrimaries(Ye.workingColorSpace),le=_.colorSpace===gn?null:Ye.getPrimaries(_.colorSpace),ge=_.colorSpace===gn||$===le?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ge)}t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment);let K=m(_.image,!1,s.maxTextureSize);K=ti(_,K);const oe=r.convert(_.format,_.colorSpace),Ee=r.convert(_.type);let ue=y(_.internalFormat,oe,Ee,_.normalized,_.colorSpace,_.isVideoTexture);Fe(H,_);let ae;const Ae=_.mipmaps,De=_.isVideoTexture!==!0,ze=re.__version===void 0||W===!0,L=te.dataReady,ie=A(_,K);if(_.isDepthTexture)ue=w(_.format===Vn,_.type),ze&&(De?t.texStorage2D(n.TEXTURE_2D,1,ue,K.width,K.height):t.texImage2D(n.TEXTURE_2D,0,ue,K.width,K.height,0,oe,Ee,null));else if(_.isDataTexture)if(Ae.length>0){De&&ze&&t.texStorage2D(n.TEXTURE_2D,ie,ue,Ae[0].width,Ae[0].height);for(let $=0,le=Ae.length;$<le;$++)ae=Ae[$],De?L&&t.texSubImage2D(n.TEXTURE_2D,$,0,0,ae.width,ae.height,oe,Ee,ae.data):t.texImage2D(n.TEXTURE_2D,$,ue,ae.width,ae.height,0,oe,Ee,ae.data);_.generateMipmaps=!1}else De?(ze&&t.texStorage2D(n.TEXTURE_2D,ie,ue,K.width,K.height),L&&ee(_,K,oe,Ee)):t.texImage2D(n.TEXTURE_2D,0,ue,K.width,K.height,0,oe,Ee,K.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){De&&ze&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ie,ue,Ae[0].width,Ae[0].height,K.depth);for(let $=0,le=Ae.length;$<le;$++)if(ae=Ae[$],_.format!==Ci)if(oe!==null)if(De){if(L)if(_.layerUpdates.size>0){const ge=iu(ae.width,ae.height,_.format,_.type);for(const Q of _.layerUpdates){const be=ae.data.subarray(Q*ge/ae.data.BYTES_PER_ELEMENT,(Q+1)*ge/ae.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,Q,ae.width,ae.height,1,oe,be)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,0,ae.width,ae.height,K.depth,oe,ae.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,$,ue,ae.width,ae.height,K.depth,0,ae.data,0,0);else Re("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else De?L&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,0,ae.width,ae.height,K.depth,oe,Ee,ae.data):t.texImage3D(n.TEXTURE_2D_ARRAY,$,ue,ae.width,ae.height,K.depth,0,oe,Ee,ae.data)}else{De&&ze&&t.texStorage2D(n.TEXTURE_2D,ie,ue,Ae[0].width,Ae[0].height);for(let $=0,le=Ae.length;$<le;$++)ae=Ae[$],_.format!==Ci?oe!==null?De?L&&t.compressedTexSubImage2D(n.TEXTURE_2D,$,0,0,ae.width,ae.height,oe,ae.data):t.compressedTexImage2D(n.TEXTURE_2D,$,ue,ae.width,ae.height,0,ae.data):Re("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):De?L&&t.texSubImage2D(n.TEXTURE_2D,$,0,0,ae.width,ae.height,oe,Ee,ae.data):t.texImage2D(n.TEXTURE_2D,$,ue,ae.width,ae.height,0,oe,Ee,ae.data)}else if(_.isDataArrayTexture)if(De){if(ze&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ie,ue,K.width,K.height,K.depth),L)if(_.layerUpdates.size>0){const $=iu(K.width,K.height,_.format,_.type);for(const le of _.layerUpdates){const ge=K.data.subarray(le*$/K.data.BYTES_PER_ELEMENT,(le+1)*$/K.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,le,K.width,K.height,1,oe,Ee,ge)}_.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,oe,Ee,K.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,ue,K.width,K.height,K.depth,0,oe,Ee,K.data);else if(_.isData3DTexture)De?(ze&&t.texStorage3D(n.TEXTURE_3D,ie,ue,K.width,K.height,K.depth),L&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,oe,Ee,K.data)):t.texImage3D(n.TEXTURE_3D,0,ue,K.width,K.height,K.depth,0,oe,Ee,K.data);else if(_.isFramebufferTexture){if(ze)if(De)t.texStorage2D(n.TEXTURE_2D,ie,ue,K.width,K.height);else{let $=K.width,le=K.height;for(let ge=0;ge<ie;ge++)t.texImage2D(n.TEXTURE_2D,ge,ue,$,le,0,oe,Ee,null),$>>=1,le>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in n){const $=n.canvas;if($.hasAttribute("layoutsubtree")||$.setAttribute("layoutsubtree","true"),K.parentNode!==$){$.appendChild(K),d.add(_),$.onpaint=le=>{const ge=le.changedElements;for(const Q of d)ge.includes(Q.image)&&(Q.needsUpdate=!0)},$.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,K);else{const ge=n.RGBA,Q=n.RGBA,be=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,ge,Q,be,K)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Ae.length>0){if(De&&ze){const $=nt(Ae[0]);t.texStorage2D(n.TEXTURE_2D,ie,ue,$.width,$.height)}for(let $=0,le=Ae.length;$<le;$++)ae=Ae[$],De?L&&t.texSubImage2D(n.TEXTURE_2D,$,0,0,oe,Ee,ae):t.texImage2D(n.TEXTURE_2D,$,ue,oe,Ee,ae);_.generateMipmaps=!1}else if(De){if(ze){const $=nt(K);t.texStorage2D(n.TEXTURE_2D,ie,ue,$.width,$.height)}L&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,oe,Ee,K)}else t.texImage2D(n.TEXTURE_2D,0,ue,oe,Ee,K);f(_)&&M(H),re.__version=te.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function Be(b,_,U){if(_.image.length!==6)return;const H=q(b,_),W=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,b.__webglTexture,n.TEXTURE0+U);const te=i.get(W);if(W.version!==te.__version||H===!0){t.activeTexture(n.TEXTURE0+U);const re=Ye.getPrimaries(Ye.workingColorSpace),X=_.colorSpace===gn?null:Ye.getPrimaries(_.colorSpace),K=_.colorSpace===gn||re===X?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,K);const oe=_.isCompressedTexture||_.image[0].isCompressedTexture,Ee=_.image[0]&&_.image[0].isDataTexture,ue=[];for(let Q=0;Q<6;Q++)!oe&&!Ee?ue[Q]=m(_.image[Q],!0,s.maxCubemapSize):ue[Q]=Ee?_.image[Q].image:_.image[Q],ue[Q]=ti(_,ue[Q]);const ae=ue[0],Ae=r.convert(_.format,_.colorSpace),De=r.convert(_.type),ze=y(_.internalFormat,Ae,De,_.normalized,_.colorSpace),L=_.isVideoTexture!==!0,ie=te.__version===void 0||H===!0,$=W.dataReady;let le=A(_,ae);Fe(n.TEXTURE_CUBE_MAP,_);let ge;if(oe){L&&ie&&t.texStorage2D(n.TEXTURE_CUBE_MAP,le,ze,ae.width,ae.height);for(let Q=0;Q<6;Q++){ge=ue[Q].mipmaps;for(let be=0;be<ge.length;be++){const ye=ge[be];_.format!==Ci?Ae!==null?L?$&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,be,0,0,ye.width,ye.height,Ae,ye.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,be,ze,ye.width,ye.height,0,ye.data):Re("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?$&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,be,0,0,ye.width,ye.height,Ae,De,ye.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,be,ze,ye.width,ye.height,0,Ae,De,ye.data)}}}else{if(ge=_.mipmaps,L&&ie){ge.length>0&&le++;const Q=nt(ue[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,le,ze,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(Ee){L?$&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,ue[Q].width,ue[Q].height,Ae,De,ue[Q].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,ze,ue[Q].width,ue[Q].height,0,Ae,De,ue[Q].data);for(let be=0;be<ge.length;be++){const St=ge[be].image[Q].image;L?$&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,be+1,0,0,St.width,St.height,Ae,De,St.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,be+1,ze,St.width,St.height,0,Ae,De,St.data)}}else{L?$&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Ae,De,ue[Q]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,ze,Ae,De,ue[Q]);for(let be=0;be<ge.length;be++){const ye=ge[be];L?$&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,be+1,0,0,Ae,De,ye.image[Q]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,be+1,ze,Ae,De,ye.image[Q])}}}f(_)&&M(n.TEXTURE_CUBE_MAP),te.__version=W.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function Pe(b,_,U,H,W,te){const re=r.convert(U.format,U.colorSpace),X=r.convert(U.type),K=y(U.internalFormat,re,X,U.normalized,U.colorSpace),oe=i.get(_),Ee=i.get(U);if(Ee.__renderTarget=_,!oe.__hasExternalTextures){const ue=Math.max(1,_.width>>te),ae=Math.max(1,_.height>>te);W===n.TEXTURE_3D||W===n.TEXTURE_2D_ARRAY?t.texImage3D(W,te,K,ue,ae,_.depth,0,re,X,null):t.texImage2D(W,te,K,ue,ae,0,re,X,null)}t.bindFramebuffer(n.FRAMEBUFFER,b),At(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,H,W,Ee.__webglTexture,0,xt(_)):(W===n.TEXTURE_2D||W>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&W<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,H,W,Ee.__webglTexture,te),t.bindFramebuffer(n.FRAMEBUFFER,null)}function bt(b,_,U){if(n.bindRenderbuffer(n.RENDERBUFFER,b),_.depthBuffer){const H=_.depthTexture,W=H&&H.isDepthTexture?H.type:null,te=w(_.stencilBuffer,W),re=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;At(_)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,xt(_),te,_.width,_.height):U?n.renderbufferStorageMultisample(n.RENDERBUFFER,xt(_),te,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,te,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,re,n.RENDERBUFFER,b)}else{const H=_.textures;for(let W=0;W<H.length;W++){const te=H[W],re=r.convert(te.format,te.colorSpace),X=r.convert(te.type),K=y(te.internalFormat,re,X,te.normalized,te.colorSpace);At(_)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,xt(_),K,_.width,_.height):U?n.renderbufferStorageMultisample(n.RENDERBUFFER,xt(_),K,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,K,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Xe(b,_,U){const H=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,b),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const W=i.get(_.depthTexture);if(W.__renderTarget=_,(!W.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),H){if(W.__webglInit===void 0&&(W.__webglInit=!0,_.depthTexture.addEventListener("dispose",R)),W.__webglTexture===void 0){W.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,W.__webglTexture),Fe(n.TEXTURE_CUBE_MAP,_.depthTexture);const oe=r.convert(_.depthTexture.format),Ee=r.convert(_.depthTexture.type);let ue;_.depthTexture.format===ji?ue=n.DEPTH_COMPONENT24:_.depthTexture.format===Vn&&(ue=n.DEPTH24_STENCIL8);for(let ae=0;ae<6;ae++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,ue,_.width,_.height,0,oe,Ee,null)}}else J(_.depthTexture,0);const te=W.__webglTexture,re=xt(_),X=H?n.TEXTURE_CUBE_MAP_POSITIVE_X+U:n.TEXTURE_2D,K=_.depthTexture.format===Vn?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(_.depthTexture.format===ji)At(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,K,X,te,0,re):n.framebufferTexture2D(n.FRAMEBUFFER,K,X,te,0);else if(_.depthTexture.format===Vn)At(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,K,X,te,0,re):n.framebufferTexture2D(n.FRAMEBUFFER,K,X,te,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function lt(b){const _=i.get(b),U=b.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==b.depthTexture){const H=b.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),H){const W=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,H.removeEventListener("dispose",W)};H.addEventListener("dispose",W),_.__depthDisposeCallback=W}_.__boundDepthTexture=H}if(b.depthTexture&&!_.__autoAllocateDepthBuffer)if(U)for(let H=0;H<6;H++)Xe(_.__webglFramebuffer[H],b,H);else{const H=b.texture.mipmaps;H&&H.length>0?Xe(_.__webglFramebuffer[0],b,0):Xe(_.__webglFramebuffer,b,0)}else if(U){_.__webglDepthbuffer=[];for(let H=0;H<6;H++)if(t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[H]),_.__webglDepthbuffer[H]===void 0)_.__webglDepthbuffer[H]=n.createRenderbuffer(),bt(_.__webglDepthbuffer[H],b,!1);else{const W=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,te=_.__webglDepthbuffer[H];n.bindRenderbuffer(n.RENDERBUFFER,te),n.framebufferRenderbuffer(n.FRAMEBUFFER,W,n.RENDERBUFFER,te)}}else{const H=b.texture.mipmaps;if(H&&H.length>0?t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),bt(_.__webglDepthbuffer,b,!1);else{const W=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,te=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,te),n.framebufferRenderbuffer(n.FRAMEBUFFER,W,n.RENDERBUFFER,te)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function tt(b,_,U){const H=i.get(b);_!==void 0&&Pe(H.__webglFramebuffer,b,b.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),U!==void 0&&lt(b)}function $e(b){const _=b.texture,U=i.get(b),H=i.get(_);b.addEventListener("dispose",v);const W=b.textures,te=b.isWebGLCubeRenderTarget===!0,re=W.length>1;if(re||(H.__webglTexture===void 0&&(H.__webglTexture=n.createTexture()),H.__version=_.version,o.memory.textures++),te){U.__webglFramebuffer=[];for(let X=0;X<6;X++)if(_.mipmaps&&_.mipmaps.length>0){U.__webglFramebuffer[X]=[];for(let K=0;K<_.mipmaps.length;K++)U.__webglFramebuffer[X][K]=n.createFramebuffer()}else U.__webglFramebuffer[X]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){U.__webglFramebuffer=[];for(let X=0;X<_.mipmaps.length;X++)U.__webglFramebuffer[X]=n.createFramebuffer()}else U.__webglFramebuffer=n.createFramebuffer();if(re)for(let X=0,K=W.length;X<K;X++){const oe=i.get(W[X]);oe.__webglTexture===void 0&&(oe.__webglTexture=n.createTexture(),o.memory.textures++)}if(b.samples>0&&At(b)===!1){U.__webglMultisampledFramebuffer=n.createFramebuffer(),U.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let X=0;X<W.length;X++){const K=W[X];U.__webglColorRenderbuffer[X]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,U.__webglColorRenderbuffer[X]);const oe=r.convert(K.format,K.colorSpace),Ee=r.convert(K.type),ue=y(K.internalFormat,oe,Ee,K.normalized,K.colorSpace,b.isXRRenderTarget===!0),ae=xt(b);n.renderbufferStorageMultisample(n.RENDERBUFFER,ae,ue,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+X,n.RENDERBUFFER,U.__webglColorRenderbuffer[X])}n.bindRenderbuffer(n.RENDERBUFFER,null),b.depthBuffer&&(U.__webglDepthRenderbuffer=n.createRenderbuffer(),bt(U.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(te){t.bindTexture(n.TEXTURE_CUBE_MAP,H.__webglTexture),Fe(n.TEXTURE_CUBE_MAP,_);for(let X=0;X<6;X++)if(_.mipmaps&&_.mipmaps.length>0)for(let K=0;K<_.mipmaps.length;K++)Pe(U.__webglFramebuffer[X][K],b,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+X,K);else Pe(U.__webglFramebuffer[X],b,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+X,0);f(_)&&M(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(re){for(let X=0,K=W.length;X<K;X++){const oe=W[X],Ee=i.get(oe);let ue=n.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(ue=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ue,Ee.__webglTexture),Fe(ue,oe),Pe(U.__webglFramebuffer,b,oe,n.COLOR_ATTACHMENT0+X,ue,0),f(oe)&&M(ue)}t.unbindTexture()}else{let X=n.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(X=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(X,H.__webglTexture),Fe(X,_),_.mipmaps&&_.mipmaps.length>0)for(let K=0;K<_.mipmaps.length;K++)Pe(U.__webglFramebuffer[K],b,_,n.COLOR_ATTACHMENT0,X,K);else Pe(U.__webglFramebuffer,b,_,n.COLOR_ATTACHMENT0,X,0);f(_)&&M(X),t.unbindTexture()}b.depthBuffer&&lt(b)}function Tt(b){const _=b.textures;for(let U=0,H=_.length;U<H;U++){const W=_[U];if(f(W)){const te=E(b),re=i.get(W).__webglTexture;t.bindTexture(te,re),M(te),t.unbindTexture()}}}const Pt=[],Ut=[];function Bt(b){if(b.samples>0){if(At(b)===!1){const _=b.textures,U=b.width,H=b.height;let W=n.COLOR_BUFFER_BIT;const te=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,re=i.get(b),X=_.length>1;if(X)for(let oe=0;oe<_.length;oe++)t.bindFramebuffer(n.FRAMEBUFFER,re.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,re.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,re.__webglMultisampledFramebuffer);const K=b.texture.mipmaps;K&&K.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,re.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,re.__webglFramebuffer);for(let oe=0;oe<_.length;oe++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(W|=n.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(W|=n.STENCIL_BUFFER_BIT)),X){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,re.__webglColorRenderbuffer[oe]);const Ee=i.get(_[oe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Ee,0)}n.blitFramebuffer(0,0,U,H,0,0,U,H,W,n.NEAREST),l===!0&&(Pt.length=0,Ut.length=0,Pt.push(n.COLOR_ATTACHMENT0+oe),b.depthBuffer&&b.resolveDepthBuffer===!1&&(Pt.push(te),Ut.push(te),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Ut)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Pt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),X)for(let oe=0;oe<_.length;oe++){t.bindFramebuffer(n.FRAMEBUFFER,re.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.RENDERBUFFER,re.__webglColorRenderbuffer[oe]);const Ee=i.get(_[oe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,re.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.TEXTURE_2D,Ee,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,re.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&l){const _=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function xt(b){return Math.min(s.maxSamples,b.samples)}function At(b){const _=i.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function I(b){const _=o.render.frame;h.get(b)!==_&&(h.set(b,_),b.update())}function ti(b,_){const U=b.colorSpace,H=b.format,W=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||U!==co&&U!==gn&&(Ye.getTransfer(U)===rt?(H!==Ci||W!==ci)&&Re("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ze("WebGLTextures: Unsupported texture color space:",U)),_}function nt(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=Y,this.resetTextureUnits=G,this.getTextureUnits=Z,this.setTextureUnits=O,this.setTexture2D=J,this.setTexture2DArray=j,this.setTexture3D=ce,this.setTextureCube=fe,this.rebindTextures=tt,this.setupRenderTarget=$e,this.updateRenderTargetMipmap=Tt,this.updateMultisampleRenderTarget=Bt,this.setupDepthRenderbuffer=lt,this.setupFrameBufferTexture=Pe,this.useMultisampledRTT=At,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function lv(n,e){function t(i,s=gn){let r;const o=Ye.getTransfer(s);if(i===ci)return n.UNSIGNED_BYTE;if(i===Ll)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Il)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Th)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Ah)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Eh)return n.BYTE;if(i===wh)return n.SHORT;if(i===sr)return n.UNSIGNED_SHORT;if(i===Dl)return n.INT;if(i===vi)return n.UNSIGNED_INT;if(i===Oi)return n.FLOAT;if(i===xi)return n.HALF_FLOAT;if(i===Ch)return n.ALPHA;if(i===Rh)return n.RGB;if(i===Ci)return n.RGBA;if(i===ji)return n.DEPTH_COMPONENT;if(i===Vn)return n.DEPTH_STENCIL;if(i===Ph)return n.RED;if(i===Nl)return n.RED_INTEGER;if(i===qn)return n.RG;if(i===Fl)return n.RG_INTEGER;if(i===Ul)return n.RGBA_INTEGER;if(i===eo||i===to||i===io||i===no)if(o===rt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===eo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===to)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===io)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===no)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===eo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===to)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===io)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===no)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ga||i===Wa||i===Xa||i===Ya)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Ga)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Wa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Xa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Ya)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===qa||i===$a||i===Ka||i===Za||i===Ja||i===ao||i===Qa)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===qa||i===$a)return o===rt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Ka)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Za)return r.COMPRESSED_R11_EAC;if(i===Ja)return r.COMPRESSED_SIGNED_R11_EAC;if(i===ao)return r.COMPRESSED_RG11_EAC;if(i===Qa)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===ja||i===el||i===tl||i===il||i===nl||i===sl||i===rl||i===ol||i===al||i===ll||i===cl||i===ul||i===hl||i===dl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===ja)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===el)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===tl)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===il)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===nl)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===sl)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===rl)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===ol)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===al)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===ll)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===cl)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ul)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===hl)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===dl)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===fl||i===pl||i===ml)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===fl)return o===rt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===pl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===ml)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===gl||i===_l||i===lo||i===vl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===gl)return r.COMPRESSED_RED_RGTC1_EXT;if(i===_l)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===lo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===vl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===rr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const cv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,uv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class hv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Bh(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new dt({vertexShader:cv,fragmentShader:uv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ei(new en(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class dv extends Tn{constructor(e,t){super();const i=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,d=null,u=null,p=null,g=null;const x=typeof XRWebGLBinding<"u",m=new hv,f={},M=t.getContextAttributes();let E=null,y=null;const w=[],A=[],R=new Ce;let v=null;const T=new gi;T.viewport=new _t;const D=new gi;D.viewport=new _t;const P=[T,D],F=new yp;let G=null,Z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let se=w[q];return se===void 0&&(se=new Go,w[q]=se),se.getTargetRaySpace()},this.getControllerGrip=function(q){let se=w[q];return se===void 0&&(se=new Go,w[q]=se),se.getGripSpace()},this.getHand=function(q){let se=w[q];return se===void 0&&(se=new Go,w[q]=se),se.getHandSpace()};function O(q){const se=A.indexOf(q.inputSource);if(se===-1)return;const ee=w[se];ee!==void 0&&(ee.update(q.inputSource,q.frame,c||o),ee.dispatchEvent({type:q.type,data:q.inputSource}))}function Y(){s.removeEventListener("select",O),s.removeEventListener("selectstart",O),s.removeEventListener("selectend",O),s.removeEventListener("squeeze",O),s.removeEventListener("squeezestart",O),s.removeEventListener("squeezeend",O),s.removeEventListener("end",Y),s.removeEventListener("inputsourceschange",z);for(let q=0;q<w.length;q++){const se=A[q];se!==null&&(A[q]=null,w[q].disconnect(se))}G=null,Z=null,m.reset();for(const q in f)delete f[q];e.setRenderTarget(E),p=null,u=null,d=null,s=null,y=null,Fe.stop(),i.isPresenting=!1,e.setPixelRatio(v),e.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,i.isPresenting===!0&&Re("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){a=q,i.isPresenting===!0&&Re("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(E=e.getRenderTarget(),s.addEventListener("select",O),s.addEventListener("selectstart",O),s.addEventListener("selectend",O),s.addEventListener("squeeze",O),s.addEventListener("squeezestart",O),s.addEventListener("squeezeend",O),s.addEventListener("end",Y),s.addEventListener("inputsourceschange",z),M.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(R),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let ee=null,Ne=null,Be=null;M.depth&&(Be=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ee=M.stencil?Vn:ji,Ne=M.stencil?rr:vi);const Pe={colorFormat:t.RGBA8,depthFormat:Be,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(Pe),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),y=new ui(u.textureWidth,u.textureHeight,{format:Ci,type:ci,depthTexture:new En(u.textureWidth,u.textureHeight,Ne,void 0,void 0,void 0,void 0,void 0,void 0,ee),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const ee={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,ee),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),y=new ui(p.framebufferWidth,p.framebufferHeight,{format:Ci,type:ci,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Fe.setContext(s),Fe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function z(q){for(let se=0;se<q.removed.length;se++){const ee=q.removed[se],Ne=A.indexOf(ee);Ne>=0&&(A[Ne]=null,w[Ne].disconnect(ee))}for(let se=0;se<q.added.length;se++){const ee=q.added[se];let Ne=A.indexOf(ee);if(Ne===-1){for(let Pe=0;Pe<w.length;Pe++)if(Pe>=A.length){A.push(ee),Ne=Pe;break}else if(A[Pe]===null){A[Pe]=ee,Ne=Pe;break}if(Ne===-1)break}const Be=w[Ne];Be&&Be.connect(ee)}}const J=new C,j=new C;function ce(q,se,ee){J.setFromMatrixPosition(se.matrixWorld),j.setFromMatrixPosition(ee.matrixWorld);const Ne=J.distanceTo(j),Be=se.projectionMatrix.elements,Pe=ee.projectionMatrix.elements,bt=Be[14]/(Be[10]-1),Xe=Be[14]/(Be[10]+1),lt=(Be[9]+1)/Be[5],tt=(Be[9]-1)/Be[5],$e=(Be[8]-1)/Be[0],Tt=(Pe[8]+1)/Pe[0],Pt=bt*$e,Ut=bt*Tt,Bt=Ne/(-$e+Tt),xt=Bt*-$e;if(se.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(xt),q.translateZ(Bt),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),Be[10]===-1)q.projectionMatrix.copy(se.projectionMatrix),q.projectionMatrixInverse.copy(se.projectionMatrixInverse);else{const At=bt+Bt,I=Xe+Bt,ti=Pt-xt,nt=Ut+(Ne-xt),b=lt*Xe/I*At,_=tt*Xe/I*At;q.projectionMatrix.makePerspective(ti,nt,b,_,At,I),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function fe(q,se){se===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(se.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let se=q.near,ee=q.far;m.texture!==null&&(m.depthNear>0&&(se=m.depthNear),m.depthFar>0&&(ee=m.depthFar)),F.near=D.near=T.near=se,F.far=D.far=T.far=ee,(G!==F.near||Z!==F.far)&&(s.updateRenderState({depthNear:F.near,depthFar:F.far}),G=F.near,Z=F.far),F.layers.mask=q.layers.mask|6,T.layers.mask=F.layers.mask&-5,D.layers.mask=F.layers.mask&-3;const Ne=q.parent,Be=F.cameras;fe(F,Ne);for(let Pe=0;Pe<Be.length;Pe++)fe(Be[Pe],Ne);Be.length===2?ce(F,T,D):F.projectionMatrix.copy(T.projectionMatrix),_e(q,F,Ne)};function _e(q,se,ee){ee===null?q.matrix.copy(se.matrixWorld):(q.matrix.copy(ee.matrixWorld),q.matrix.invert(),q.matrix.multiply(se.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(se.projectionMatrix),q.projectionMatrixInverse.copy(se.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=ar*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(u===null&&p===null))return l},this.setFoveation=function(q){l=q,u!==null&&(u.fixedFoveation=q),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=q)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(F)},this.getCameraTexture=function(q){return f[q]};let Se=null;function Oe(q,se){if(h=se.getViewerPose(c||o),g=se,h!==null){const ee=h.views;p!==null&&(e.setRenderTargetFramebuffer(y,p.framebuffer),e.setRenderTarget(y));let Ne=!1;ee.length!==F.cameras.length&&(F.cameras.length=0,Ne=!0);for(let Xe=0;Xe<ee.length;Xe++){const lt=ee[Xe];let tt=null;if(p!==null)tt=p.getViewport(lt);else{const Tt=d.getViewSubImage(u,lt);tt=Tt.viewport,Xe===0&&(e.setRenderTargetTextures(y,Tt.colorTexture,Tt.depthStencilTexture),e.setRenderTarget(y))}let $e=P[Xe];$e===void 0&&($e=new gi,$e.layers.enable(Xe),$e.viewport=new _t,P[Xe]=$e),$e.matrix.fromArray(lt.transform.matrix),$e.matrix.decompose($e.position,$e.quaternion,$e.scale),$e.projectionMatrix.fromArray(lt.projectionMatrix),$e.projectionMatrixInverse.copy($e.projectionMatrix).invert(),$e.viewport.set(tt.x,tt.y,tt.width,tt.height),Xe===0&&(F.matrix.copy($e.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Ne===!0&&F.cameras.push($e)}const Be=s.enabledFeatures;if(Be&&Be.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){d=i.getBinding();const Xe=d.getDepthInformation(ee[0]);Xe&&Xe.isValid&&Xe.texture&&m.init(Xe,s.renderState)}if(Be&&Be.includes("camera-access")&&x){e.state.unbindTexture(),d=i.getBinding();for(let Xe=0;Xe<ee.length;Xe++){const lt=ee[Xe].camera;if(lt){let tt=f[lt];tt||(tt=new Bh,f[lt]=tt);const $e=d.getCameraImage(lt);tt.sourceTexture=$e}}}}for(let ee=0;ee<w.length;ee++){const Ne=A[ee],Be=w[ee];Ne!==null&&Be!==void 0&&Be.update(Ne,se,c||o)}Se&&Se(q,se),se.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:se}),g=null}const Fe=new Wh;Fe.setAnimationLoop(Oe),this.setAnimationLoop=function(q){Se=q},this.dispose=function(){}}}const fv=new qe,Jh=new Ue;Jh.set(-1,0,0,0,1,0,0,0,1);function pv(n,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,zh(n)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,M,E,y){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?r(m,f):f.isMeshLambertMaterial?(r(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(r(m,f),d(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(r(m,f),u(m,f),f.isMeshPhysicalMaterial&&p(m,f,y)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),x(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?l(m,f,M,E):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===jt&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===jt&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const M=e.get(f),E=M.envMap,y=M.envMapRotation;E&&(m.envMap.value=E,m.envMapRotation.value.setFromMatrix4(fv.makeRotationFromEuler(y)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Jh),m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,M,E){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*M,m.scale.value=E*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function u(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,M){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===jt&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function x(m,f){const M=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function mv(n,e,t,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,w){const A=w.program;i.uniformBlockBinding(y,A)}function c(y,w){let A=s[y.id];A===void 0&&(m(y),A=h(y),s[y.id]=A,y.addEventListener("dispose",M));const R=w.program;i.updateUBOMapping(y,R);const v=e.render.frame;r[y.id]!==v&&(u(y),r[y.id]=v)}function h(y){const w=d();y.__bindingPointIndex=w;const A=n.createBuffer(),R=y.__size,v=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,A),n.bufferData(n.UNIFORM_BUFFER,R,v),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,A),A}function d(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return Ze("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){const w=s[y.id],A=y.uniforms,R=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let v=0,T=A.length;v<T;v++){const D=A[v];if(Array.isArray(D))for(let P=0,F=D.length;P<F;P++)p(D[P],v,P,R);else p(D,v,0,R)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(y,w,A,R){if(x(y,w,A,R)===!0){const v=y.__offset,T=y.value;if(Array.isArray(T)){let D=0;for(let P=0;P<T.length;P++){const F=T[P],G=f(F);g(F,y.__data,D),typeof F!="number"&&typeof F!="boolean"&&!F.isMatrix3&&!ArrayBuffer.isView(F)&&(D+=G.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(T,y.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,v,y.__data)}}function g(y,w,A){typeof y=="number"||typeof y=="boolean"?w[0]=y:y.isMatrix3?(w[0]=y.elements[0],w[1]=y.elements[1],w[2]=y.elements[2],w[3]=0,w[4]=y.elements[3],w[5]=y.elements[4],w[6]=y.elements[5],w[7]=0,w[8]=y.elements[6],w[9]=y.elements[7],w[10]=y.elements[8],w[11]=0):ArrayBuffer.isView(y)?w.set(new y.constructor(y.buffer,y.byteOffset,w.length)):y.toArray(w,A)}function x(y,w,A,R){const v=y.value,T=w+"_"+A;if(R[T]===void 0)return typeof v=="number"||typeof v=="boolean"?R[T]=v:ArrayBuffer.isView(v)?R[T]=v.slice():R[T]=v.clone(),!0;{const D=R[T];if(typeof v=="number"||typeof v=="boolean"){if(D!==v)return R[T]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(D.equals(v)===!1)return D.copy(v),!0}}return!1}function m(y){const w=y.uniforms;let A=0;const R=16;for(let T=0,D=w.length;T<D;T++){const P=Array.isArray(w[T])?w[T]:[w[T]];for(let F=0,G=P.length;F<G;F++){const Z=P[F],O=Array.isArray(Z.value)?Z.value:[Z.value];for(let Y=0,z=O.length;Y<z;Y++){const J=O[Y],j=f(J),ce=A%R,fe=ce%j.boundary,_e=ce+fe;A+=fe,_e!==0&&R-_e<j.storage&&(A+=R-_e),Z.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),Z.__offset=A,A+=j.storage}}}const v=A%R;return v>0&&(A+=R-v),y.__size=A,y.__cache={},this}function f(y){const w={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(w.boundary=4,w.storage=4):y.isVector2?(w.boundary=8,w.storage=8):y.isVector3||y.isColor?(w.boundary=16,w.storage=12):y.isVector4?(w.boundary=16,w.storage=16):y.isMatrix3?(w.boundary=48,w.storage=48):y.isMatrix4?(w.boundary=64,w.storage=64):y.isTexture?Re("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(w.boundary=16,w.storage=y.byteLength):Re("WebGLRenderer: Unsupported uniform value type.",y),w}function M(y){const w=y.target;w.removeEventListener("dispose",M);const A=o.indexOf(w.__bindingPointIndex);o.splice(A,1),n.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function E(){for(const y in s)n.deleteBuffer(s[y]);o=[],s={},r={}}return{bind:l,update:c,dispose:E}}const gv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Fi=null;function _v(){return Fi===null&&(Fi=new jf(gv,16,16,qn,xi),Fi.name="DFG_LUT",Fi.minFilter=Mt,Fi.magFilter=Mt,Fi.wrapS=Ki,Fi.wrapT=Ki,Fi.generateMipmaps=!1,Fi.needsUpdate=!0),Fi}class vv{constructor(e={}){const{canvas:t=mf(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:p=ci}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=o;const x=p,m=new Set([Ul,Fl,Nl]),f=new Set([ci,vi,sr,rr,Ll,Il]),M=new Uint32Array(4),E=new Int32Array(4),y=new C;let w=null,A=null;const R=[],v=[];let T=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ri,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const D=this;let P=!1,F=null,G=null,Z=null,O=null;this._outputColorSpace=si;let Y=0,z=0,J=null,j=-1,ce=null;const fe=new _t,_e=new _t;let Se=null;const Oe=new de(0);let Fe=0,q=t.width,se=t.height,ee=1,Ne=null,Be=null;const Pe=new _t(0,0,q,se),bt=new _t(0,0,q,se);let Xe=!1;const lt=new Vl;let tt=!1,$e=!1;const Tt=new qe,Pt=new C,Ut=new _t,Bt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let xt=!1;function At(){return J===null?ee:1}let I=i;function ti(S,N){return t.getContext(S,N)}try{const S={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Pl}`),t.addEventListener("webglcontextlost",St,!1),t.addEventListener("webglcontextrestored",pt,!1),t.addEventListener("webglcontextcreationerror",Di,!1),I===null){const N="webgl2";if(I=ti(N,S),I===null)throw ti(N)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(S){throw Ze("WebGLRenderer: "+S.message),S}let nt,b,_,U,H,W,te,re,X,K,oe,Ee,ue,ae,Ae,De,ze,L,ie,$,le,ge,Q;function be(){nt=new _g(I),nt.init(),le=new lv(I,nt),b=new cg(I,nt,e,le),_=new ov(I,nt),b.reversedDepthBuffer&&u&&_.buffers.depth.setReversed(!0),G=I.createFramebuffer(),Z=I.createFramebuffer(),O=I.createFramebuffer(),U=new Sg(I),H=new Y_,W=new av(I,nt,_,H,b,le,U),te=new gg(D),re=new Ep(I),ge=new ag(I,re),X=new vg(I,re,U,ge),K=new Mg(I,X,re,ge,U),L=new yg(I,b,W),Ae=new ug(H),oe=new X_(D,te,nt,b,ge,Ae),Ee=new pv(D,H),ue=new $_,ae=new ev(nt),ze=new og(D,te,_,K,g,l),De=new rv(D,K,b),Q=new mv(I,U,b,_),ie=new lg(I,nt,U),$=new xg(I,nt,U),U.programs=oe.programs,D.capabilities=b,D.extensions=nt,D.properties=H,D.renderLists=ue,D.shadowMap=De,D.state=_,D.info=U}be(),x!==ci&&(T=new Eg(x,t.width,t.height,a,s,r));const ye=new dv(D,I);this.xr=ye,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const S=nt.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=nt.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return ee},this.setPixelRatio=function(S){S!==void 0&&(ee=S,this.setSize(q,se,!1))},this.getSize=function(S){return S.set(q,se)},this.setSize=function(S,N,V=!0){if(ye.isPresenting){Re("WebGLRenderer: Can't change size while VR device is presenting.");return}q=S,se=N,t.width=Math.floor(S*ee),t.height=Math.floor(N*ee),V===!0&&(t.style.width=S+"px",t.style.height=N+"px"),T!==null&&T.setSize(t.width,t.height),this.setViewport(0,0,S,N)},this.getDrawingBufferSize=function(S){return S.set(q*ee,se*ee).floor()},this.setDrawingBufferSize=function(S,N,V){q=S,se=N,ee=V,t.width=Math.floor(S*V),t.height=Math.floor(N*V),this.setViewport(0,0,S,N)},this.setEffects=function(S){if(x===ci){Ze("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let N=0;N<S.length;N++)if(S[N].isOutputPass===!0){Re("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(fe)},this.getViewport=function(S){return S.copy(Pe)},this.setViewport=function(S,N,V,B){S.isVector4?Pe.set(S.x,S.y,S.z,S.w):Pe.set(S,N,V,B),_.viewport(fe.copy(Pe).multiplyScalar(ee).round())},this.getScissor=function(S){return S.copy(bt)},this.setScissor=function(S,N,V,B){S.isVector4?bt.set(S.x,S.y,S.z,S.w):bt.set(S,N,V,B),_.scissor(_e.copy(bt).multiplyScalar(ee).round())},this.getScissorTest=function(){return Xe},this.setScissorTest=function(S){_.setScissorTest(Xe=S)},this.setOpaqueSort=function(S){Ne=S},this.setTransparentSort=function(S){Be=S},this.getClearColor=function(S){return S.copy(ze.getClearColor())},this.setClearColor=function(){ze.setClearColor(...arguments)},this.getClearAlpha=function(){return ze.getClearAlpha()},this.setClearAlpha=function(){ze.setClearAlpha(...arguments)},this.clear=function(S=!0,N=!0,V=!0){let B=0;if(S){let k=!1;if(J!==null){const me=J.texture.format;k=m.has(me)}if(k){const me=J.texture.type,xe=f.has(me),pe=ze.getClearColor(),Me=ze.getClearAlpha(),we=pe.r,ke=pe.g,We=pe.b;xe?(M[0]=we,M[1]=ke,M[2]=We,M[3]=Me,I.clearBufferuiv(I.COLOR,0,M)):(E[0]=we,E[1]=ke,E[2]=We,E[3]=Me,I.clearBufferiv(I.COLOR,0,E))}else B|=I.COLOR_BUFFER_BIT}N&&(B|=I.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),V&&(B|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B!==0&&I.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),F=S},this.dispose=function(){t.removeEventListener("webglcontextlost",St,!1),t.removeEventListener("webglcontextrestored",pt,!1),t.removeEventListener("webglcontextcreationerror",Di,!1),ze.dispose(),ue.dispose(),ae.dispose(),H.dispose(),te.dispose(),K.dispose(),ge.dispose(),Q.dispose(),oe.dispose(),ye.dispose(),ye.removeEventListener("sessionstart",cc),ye.removeEventListener("sessionend",uc),Pn.stop()};function St(S){S.preventDefault(),wc("WebGLRenderer: Context Lost."),P=!0}function pt(){wc("WebGLRenderer: Context Restored."),P=!1;const S=U.autoReset,N=De.enabled,V=De.autoUpdate,B=De.needsUpdate,k=De.type;be(),U.autoReset=S,De.enabled=N,De.autoUpdate=V,De.needsUpdate=B,De.type=k}function Di(S){Ze("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Li(S){const N=S.target;N.removeEventListener("dispose",Li),Cd(N)}function Cd(S){Rd(S),H.remove(S)}function Rd(S){const N=H.get(S).programs;N!==void 0&&(N.forEach(function(V){oe.releaseProgram(V)}),S.isShaderMaterial&&oe.releaseShaderCache(S))}this.renderBufferDirect=function(S,N,V,B,k,me){N===null&&(N=Bt);const xe=k.isMesh&&k.matrixWorld.determinantAffine()<0,pe=Ld(S,N,V,B,k);_.setMaterial(B,xe);let Me=V.index,we=1;if(B.wireframe===!0){if(Me=X.getWireframeAttribute(V),Me===void 0)return;we=2}const ke=V.drawRange,We=V.attributes.position;let Te=ke.start*we,ot=(ke.start+ke.count)*we;me!==null&&(Te=Math.max(Te,me.start*we),ot=Math.min(ot,(me.start+me.count)*we)),Me!==null?(Te=Math.max(Te,0),ot=Math.min(ot,Me.count)):We!=null&&(Te=Math.max(Te,0),ot=Math.min(ot,We.count));const Et=ot-Te;if(Et<0||Et===1/0)return;ge.setup(k,B,pe,V,Me);let yt,ct=ie;if(Me!==null&&(yt=re.get(Me),ct=$,ct.setIndex(yt)),k.isMesh)B.wireframe===!0?(_.setLineWidth(B.wireframeLinewidth*At()),ct.setMode(I.LINES)):ct.setMode(I.TRIANGLES);else if(k.isLine){let Vt=B.linewidth;Vt===void 0&&(Vt=1),_.setLineWidth(Vt*At()),k.isLineSegments?ct.setMode(I.LINES):k.isLineLoop?ct.setMode(I.LINE_LOOP):ct.setMode(I.LINE_STRIP)}else k.isPoints?ct.setMode(I.POINTS):k.isSprite&&ct.setMode(I.TRIANGLES);if(k.isBatchedMesh)if(nt.get("WEBGL_multi_draw"))ct.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const Vt=k._multiDrawStarts,ve=k._multiDrawCounts,oi=k._multiDrawCount,Ke=Me?re.get(Me).bytesPerElement:1,fi=H.get(B).currentProgram.getUniforms();for(let Ii=0;Ii<oi;Ii++)fi.setValue(I,"_gl_DrawID",Ii),ct.render(Vt[Ii]/Ke,ve[Ii])}else if(k.isInstancedMesh)ct.renderInstances(Te,Et,k.count);else if(V.isInstancedBufferGeometry){const Vt=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,ve=Math.min(V.instanceCount,Vt);ct.renderInstances(Te,Et,ve)}else ct.render(Te,Et)};function lc(S,N,V){S.transparent===!0&&S.side===Ti&&S.forceSinglePass===!1?(S.side=jt,S.needsUpdate=!0,vr(S,N,V),S.side=bn,S.needsUpdate=!0,vr(S,N,V),S.side=Ti):vr(S,N,V)}this.compile=function(S,N,V=null){V===null&&(V=S),A=ae.get(V),A.init(N),v.push(A),V.traverseVisible(function(k){k.isLight&&k.layers.test(N.layers)&&(A.pushLight(k),k.castShadow&&A.pushShadow(k))}),S!==V&&S.traverseVisible(function(k){k.isLight&&k.layers.test(N.layers)&&(A.pushLight(k),k.castShadow&&A.pushShadow(k))}),A.setupLights();const B=new Set;return S.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const me=k.material;if(me)if(Array.isArray(me))for(let xe=0;xe<me.length;xe++){const pe=me[xe];lc(pe,V,k),B.add(pe)}else lc(me,V,k),B.add(me)}),A=v.pop(),B},this.compileAsync=function(S,N,V=null){const B=this.compile(S,N,V);return new Promise(k=>{function me(){if(B.forEach(function(xe){H.get(xe).currentProgram.isReady()&&B.delete(xe)}),B.size===0){k(S);return}setTimeout(me,10)}nt.get("KHR_parallel_shader_compile")!==null?me():setTimeout(me,10)})};let Io=null;function Pd(S){Io&&Io(S)}function cc(){Pn.stop()}function uc(){Pn.start()}const Pn=new Wh;Pn.setAnimationLoop(Pd),typeof self<"u"&&Pn.setContext(self),this.setAnimationLoop=function(S){Io=S,ye.setAnimationLoop(S),S===null?Pn.stop():Pn.start()},ye.addEventListener("sessionstart",cc),ye.addEventListener("sessionend",uc),this.render=function(S,N){if(N!==void 0&&N.isCamera!==!0){Ze("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;F!==null&&F.renderStart(S,N);const V=ye.enabled===!0&&ye.isPresenting===!0,B=T!==null&&(J===null||V)&&T.begin(D,J);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),ye.enabled===!0&&ye.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(ye.cameraAutoUpdate===!0&&ye.updateCamera(N),N=ye.getCamera()),S.isScene===!0&&S.onBeforeRender(D,S,N,J),A=ae.get(S,v.length),A.init(N),A.state.textureUnits=W.getTextureUnits(),v.push(A),Tt.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),lt.setFromProjectionMatrix(Tt,Bi,N.reversedDepth),$e=this.localClippingEnabled,tt=Ae.init(this.clippingPlanes,$e),w=ue.get(S,R.length),w.init(),R.push(w),ye.enabled===!0&&ye.isPresenting===!0){const xe=D.xr.getDepthSensingMesh();xe!==null&&No(xe,N,-1/0,D.sortObjects)}No(S,N,0,D.sortObjects),w.finish(),D.sortObjects===!0&&w.sort(Ne,Be,N.reversedDepth),xt=ye.enabled===!1||ye.isPresenting===!1||ye.hasDepthSensing()===!1,xt&&ze.addToRenderList(w,S),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),tt===!0&&Ae.beginShadows();const k=A.state.shadowsArray;if(De.render(k,S,N),tt===!0&&Ae.endShadows(),(B&&T.hasRenderPass())===!1){const xe=w.opaque,pe=w.transmissive;if(A.setupLights(),N.isArrayCamera){const Me=N.cameras;if(pe.length>0)for(let we=0,ke=Me.length;we<ke;we++){const We=Me[we];dc(xe,pe,S,We)}xt&&ze.render(S);for(let we=0,ke=Me.length;we<ke;we++){const We=Me[we];hc(w,S,We,We.viewport)}}else pe.length>0&&dc(xe,pe,S,N),xt&&ze.render(S),hc(w,S,N)}J!==null&&z===0&&(W.updateMultisampleRenderTarget(J),W.updateRenderTargetMipmap(J)),B&&T.end(D),S.isScene===!0&&S.onAfterRender(D,S,N),ge.resetDefaultState(),j=-1,ce=null,v.pop(),v.length>0?(A=v[v.length-1],W.setTextureUnits(A.state.textureUnits),tt===!0&&Ae.setGlobalState(D.clippingPlanes,A.state.camera)):A=null,R.pop(),R.length>0?w=R[R.length-1]:w=null,F!==null&&F.renderEnd()};function No(S,N,V,B){if(S.visible===!1)return;if(S.layers.test(N.layers)){if(S.isGroup)V=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(N);else if(S.isLightProbeGrid)A.pushLightProbeGrid(S);else if(S.isLight)A.pushLight(S),S.castShadow&&A.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||lt.intersectsSprite(S)){B&&Ut.setFromMatrixPosition(S.matrixWorld).applyMatrix4(Tt);const xe=K.update(S),pe=S.material;pe.visible&&w.push(S,xe,pe,V,Ut.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||lt.intersectsObject(S))){const xe=K.update(S),pe=S.material;if(B&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Ut.copy(S.boundingSphere.center)):(xe.boundingSphere===null&&xe.computeBoundingSphere(),Ut.copy(xe.boundingSphere.center)),Ut.applyMatrix4(S.matrixWorld).applyMatrix4(Tt)),Array.isArray(pe)){const Me=xe.groups;for(let we=0,ke=Me.length;we<ke;we++){const We=Me[we],Te=pe[We.materialIndex];Te&&Te.visible&&w.push(S,xe,Te,V,Ut.z,We)}}else pe.visible&&w.push(S,xe,pe,V,Ut.z,null)}}const me=S.children;for(let xe=0,pe=me.length;xe<pe;xe++)No(me[xe],N,V,B)}function hc(S,N,V,B){const{opaque:k,transmissive:me,transparent:xe}=S;A.setupLightsView(V),tt===!0&&Ae.setGlobalState(D.clippingPlanes,V),B&&_.viewport(fe.copy(B)),k.length>0&&_r(k,N,V),me.length>0&&_r(me,N,V),xe.length>0&&_r(xe,N,V),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function dc(S,N,V,B){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[B.id]===void 0){const Te=nt.has("EXT_color_buffer_half_float")||nt.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[B.id]=new ui(1,1,{generateMipmaps:!0,type:Te?xi:ci,minFilter:Hn,samples:Math.max(4,b.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ye.workingColorSpace})}const me=A.state.transmissionRenderTarget[B.id],xe=B.viewport||fe;me.setSize(xe.z*D.transmissionResolutionScale,xe.w*D.transmissionResolutionScale);const pe=D.getRenderTarget(),Me=D.getActiveCubeFace(),we=D.getActiveMipmapLevel();D.setRenderTarget(me),D.getClearColor(Oe),Fe=D.getClearAlpha(),Fe<1&&D.setClearColor(16777215,.5),D.clear(),xt&&ze.render(V);const ke=D.toneMapping;D.toneMapping=Ri;const We=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),A.setupLightsView(B),tt===!0&&Ae.setGlobalState(D.clippingPlanes,B),_r(S,V,B),W.updateMultisampleRenderTarget(me),W.updateRenderTargetMipmap(me),nt.has("WEBGL_multisampled_render_to_texture")===!1){let Te=!1;for(let ot=0,Et=N.length;ot<Et;ot++){const yt=N[ot],{object:ct,geometry:Vt,material:ve,group:oi}=yt;if(ve.side===Ti&&ct.layers.test(B.layers)){const Ke=ve.side;ve.side=jt,ve.needsUpdate=!0,fc(ct,V,B,Vt,ve,oi),ve.side=Ke,ve.needsUpdate=!0,Te=!0}}Te===!0&&(W.updateMultisampleRenderTarget(me),W.updateRenderTargetMipmap(me))}D.setRenderTarget(pe,Me,we),D.setClearColor(Oe,Fe),We!==void 0&&(B.viewport=We),D.toneMapping=ke}function _r(S,N,V){const B=N.isScene===!0?N.overrideMaterial:null;for(let k=0,me=S.length;k<me;k++){const xe=S[k],{object:pe,geometry:Me,group:we}=xe;let ke=xe.material;ke.allowOverride===!0&&B!==null&&(ke=B),pe.layers.test(V.layers)&&fc(pe,N,V,Me,ke,we)}}function fc(S,N,V,B,k,me){S.onBeforeRender(D,N,V,B,k,me),S.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),k.onBeforeRender(D,N,V,B,S,me),k.transparent===!0&&k.side===Ti&&k.forceSinglePass===!1?(k.side=jt,k.needsUpdate=!0,D.renderBufferDirect(V,N,B,k,S,me),k.side=bn,k.needsUpdate=!0,D.renderBufferDirect(V,N,B,k,S,me),k.side=Ti):D.renderBufferDirect(V,N,B,k,S,me),S.onAfterRender(D,N,V,B,k,me)}function vr(S,N,V){N.isScene!==!0&&(N=Bt);const B=H.get(S),k=A.state.lights,me=A.state.shadowsArray,xe=k.state.version,pe=oe.getParameters(S,k.state,me,N,V,A.state.lightProbeGridArray),Me=oe.getProgramCacheKey(pe);let we=B.programs;B.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?N.environment:null,B.fog=N.fog;const ke=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;B.envMap=te.get(S.envMap||B.environment,ke),B.envMapRotation=B.environment!==null&&S.envMap===null?N.environmentRotation:S.envMapRotation,we===void 0&&(S.addEventListener("dispose",Li),we=new Map,B.programs=we);let We=we.get(Me);if(We!==void 0){if(B.currentProgram===We&&B.lightsStateVersion===xe)return mc(S,pe),We}else pe.uniforms=oe.getUniforms(S),F!==null&&S.isNodeMaterial&&F.build(S,V,pe),S.onBeforeCompile(pe,D),We=oe.acquireProgram(pe,Me),we.set(Me,We),B.uniforms=pe.uniforms;const Te=B.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Te.clippingPlanes=Ae.uniform),mc(S,pe),B.needsLights=Nd(S),B.lightsStateVersion=xe,B.needsLights&&(Te.ambientLightColor.value=k.state.ambient,Te.lightProbe.value=k.state.probe,Te.directionalLights.value=k.state.directional,Te.directionalLightShadows.value=k.state.directionalShadow,Te.spotLights.value=k.state.spot,Te.spotLightShadows.value=k.state.spotShadow,Te.rectAreaLights.value=k.state.rectArea,Te.ltc_1.value=k.state.rectAreaLTC1,Te.ltc_2.value=k.state.rectAreaLTC2,Te.pointLights.value=k.state.point,Te.pointLightShadows.value=k.state.pointShadow,Te.hemisphereLights.value=k.state.hemi,Te.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Te.spotLightMatrix.value=k.state.spotLightMatrix,Te.spotLightMap.value=k.state.spotLightMap,Te.pointShadowMatrix.value=k.state.pointShadowMatrix),B.lightProbeGrid=A.state.lightProbeGridArray.length>0,B.currentProgram=We,B.uniformsList=null,We}function pc(S){if(S.uniformsList===null){const N=S.currentProgram.getUniforms();S.uniformsList=so.seqWithValue(N.seq,S.uniforms)}return S.uniformsList}function mc(S,N){const V=H.get(S);V.outputColorSpace=N.outputColorSpace,V.batching=N.batching,V.batchingColor=N.batchingColor,V.instancing=N.instancing,V.instancingColor=N.instancingColor,V.instancingMorph=N.instancingMorph,V.skinning=N.skinning,V.morphTargets=N.morphTargets,V.morphNormals=N.morphNormals,V.morphColors=N.morphColors,V.morphTargetsCount=N.morphTargetsCount,V.numClippingPlanes=N.numClippingPlanes,V.numIntersection=N.numClipIntersection,V.vertexAlphas=N.vertexAlphas,V.vertexTangents=N.vertexTangents,V.toneMapping=N.toneMapping}function Dd(S,N){if(S.length===0)return null;if(S.length===1)return S[0].texture!==null?S[0]:null;y.setFromMatrixPosition(N.matrixWorld);for(let V=0,B=S.length;V<B;V++){const k=S[V];if(k.texture!==null&&k.boundingBox.containsPoint(y))return k}return null}function Ld(S,N,V,B,k){N.isScene!==!0&&(N=Bt),W.resetTextureUnits();const me=N.fog,xe=B.isMeshStandardMaterial||B.isMeshLambertMaterial||B.isMeshPhongMaterial?N.environment:null,pe=J===null?D.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:Ye.workingColorSpace,Me=B.isMeshStandardMaterial||B.isMeshLambertMaterial&&!B.envMap||B.isMeshPhongMaterial&&!B.envMap,we=te.get(B.envMap||xe,Me),ke=B.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,We=!!V.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),Te=!!V.morphAttributes.position,ot=!!V.morphAttributes.normal,Et=!!V.morphAttributes.color;let yt=Ri;B.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(yt=D.toneMapping);const ct=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Vt=ct!==void 0?ct.length:0,ve=H.get(B),oi=A.state.lights;if(tt===!0&&($e===!0||S!==ce)){const mt=S===ce&&B.id===j;Ae.setState(B,S,mt)}let Ke=!1;B.version===ve.__version?(ve.needsLights&&ve.lightsStateVersion!==oi.state.version||ve.outputColorSpace!==pe||k.isBatchedMesh&&ve.batching===!1||!k.isBatchedMesh&&ve.batching===!0||k.isBatchedMesh&&ve.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&ve.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&ve.instancing===!1||!k.isInstancedMesh&&ve.instancing===!0||k.isSkinnedMesh&&ve.skinning===!1||!k.isSkinnedMesh&&ve.skinning===!0||k.isInstancedMesh&&ve.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&ve.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&ve.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&ve.instancingMorph===!1&&k.morphTexture!==null||ve.envMap!==we||B.fog===!0&&ve.fog!==me||ve.numClippingPlanes!==void 0&&(ve.numClippingPlanes!==Ae.numPlanes||ve.numIntersection!==Ae.numIntersection)||ve.vertexAlphas!==ke||ve.vertexTangents!==We||ve.morphTargets!==Te||ve.morphNormals!==ot||ve.morphColors!==Et||ve.toneMapping!==yt||ve.morphTargetsCount!==Vt||!!ve.lightProbeGrid!=A.state.lightProbeGridArray.length>0)&&(Ke=!0):(Ke=!0,ve.__version=B.version);let fi=ve.currentProgram;Ke===!0&&(fi=vr(B,N,k),F&&B.isNodeMaterial&&F.onUpdateProgram(B,fi,ve));let Ii=!1,sn=!1,es=!1;const ut=fi.getUniforms(),wt=ve.uniforms;if(_.useProgram(fi.program)&&(Ii=!0,sn=!0,es=!0),B.id!==j&&(j=B.id,sn=!0),ve.needsLights){const mt=Dd(A.state.lightProbeGridArray,k);ve.lightProbeGrid!==mt&&(ve.lightProbeGrid=mt,sn=!0)}if(Ii||ce!==S){_.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),ut.setValue(I,"projectionMatrix",S.projectionMatrix),ut.setValue(I,"viewMatrix",S.matrixWorldInverse);const on=ut.map.cameraPosition;on!==void 0&&on.setValue(I,Pt.setFromMatrixPosition(S.matrixWorld)),b.logarithmicDepthBuffer&&ut.setValue(I,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&ut.setValue(I,"isOrthographic",S.isOrthographicCamera===!0),ce!==S&&(ce=S,sn=!0,es=!0)}if(ve.needsLights&&(oi.state.directionalShadowMap.length>0&&ut.setValue(I,"directionalShadowMap",oi.state.directionalShadowMap,W),oi.state.spotShadowMap.length>0&&ut.setValue(I,"spotShadowMap",oi.state.spotShadowMap,W),oi.state.pointShadowMap.length>0&&ut.setValue(I,"pointShadowMap",oi.state.pointShadowMap,W)),k.isSkinnedMesh){ut.setOptional(I,k,"bindMatrix"),ut.setOptional(I,k,"bindMatrixInverse");const mt=k.skeleton;mt&&(mt.boneTexture===null&&mt.computeBoneTexture(),ut.setValue(I,"boneTexture",mt.boneTexture,W))}k.isBatchedMesh&&(ut.setOptional(I,k,"batchingTexture"),ut.setValue(I,"batchingTexture",k._matricesTexture,W),ut.setOptional(I,k,"batchingIdTexture"),ut.setValue(I,"batchingIdTexture",k._indirectTexture,W),ut.setOptional(I,k,"batchingColorTexture"),k._colorsTexture!==null&&ut.setValue(I,"batchingColorTexture",k._colorsTexture,W));const rn=V.morphAttributes;if((rn.position!==void 0||rn.normal!==void 0||rn.color!==void 0)&&L.update(k,V,fi),(sn||ve.receiveShadow!==k.receiveShadow)&&(ve.receiveShadow=k.receiveShadow,ut.setValue(I,"receiveShadow",k.receiveShadow)),(B.isMeshStandardMaterial||B.isMeshLambertMaterial||B.isMeshPhongMaterial)&&B.envMap===null&&N.environment!==null&&(wt.envMapIntensity.value=N.environmentIntensity),wt.dfgLUT!==void 0&&(wt.dfgLUT.value=_v()),sn){if(ut.setValue(I,"toneMappingExposure",D.toneMappingExposure),ve.needsLights&&Id(wt,es),me&&B.fog===!0&&Ee.refreshFogUniforms(wt,me),Ee.refreshMaterialUniforms(wt,B,ee,se,A.state.transmissionRenderTarget[S.id]),ve.needsLights&&ve.lightProbeGrid){const mt=ve.lightProbeGrid;wt.probesSH.value=mt.texture,wt.probesMin.value.copy(mt.boundingBox.min),wt.probesMax.value.copy(mt.boundingBox.max),wt.probesResolution.value.copy(mt.resolution)}so.upload(I,pc(ve),wt,W)}if(B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(so.upload(I,pc(ve),wt,W),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&ut.setValue(I,"center",k.center),ut.setValue(I,"modelViewMatrix",k.modelViewMatrix),ut.setValue(I,"normalMatrix",k.normalMatrix),ut.setValue(I,"modelMatrix",k.matrixWorld),B.uniformsGroups!==void 0){const mt=B.uniformsGroups;for(let on=0,ts=mt.length;on<ts;on++){const gc=mt[on];Q.update(gc,fi),Q.bind(gc,fi)}}return fi}function Id(S,N){S.ambientLightColor.needsUpdate=N,S.lightProbe.needsUpdate=N,S.directionalLights.needsUpdate=N,S.directionalLightShadows.needsUpdate=N,S.pointLights.needsUpdate=N,S.pointLightShadows.needsUpdate=N,S.spotLights.needsUpdate=N,S.spotLightShadows.needsUpdate=N,S.rectAreaLights.needsUpdate=N,S.hemisphereLights.needsUpdate=N}function Nd(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return Y},this.getActiveMipmapLevel=function(){return z},this.getRenderTarget=function(){return J},this.setRenderTargetTextures=function(S,N,V){const B=H.get(S);B.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,B.__autoAllocateDepthBuffer===!1&&(B.__useRenderToTexture=!1),H.get(S.texture).__webglTexture=N,H.get(S.depthTexture).__webglTexture=B.__autoAllocateDepthBuffer?void 0:V,B.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,N){const V=H.get(S);V.__webglFramebuffer=N,V.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(S,N=0,V=0){J=S,Y=N,z=V;let B=null,k=!1,me=!1;if(S){const pe=H.get(S);if(pe.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(I.FRAMEBUFFER,pe.__webglFramebuffer),fe.copy(S.viewport),_e.copy(S.scissor),Se=S.scissorTest,_.viewport(fe),_.scissor(_e),_.setScissorTest(Se),j=-1;return}else if(pe.__webglFramebuffer===void 0)W.setupRenderTarget(S);else if(pe.__hasExternalTextures)W.rebindTextures(S,H.get(S.texture).__webglTexture,H.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const ke=S.depthTexture;if(pe.__boundDepthTexture!==ke){if(ke!==null&&H.has(ke)&&(S.width!==ke.image.width||S.height!==ke.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");W.setupDepthRenderbuffer(S)}}const Me=S.texture;(Me.isData3DTexture||Me.isDataArrayTexture||Me.isCompressedArrayTexture)&&(me=!0);const we=H.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(we[N])?B=we[N][V]:B=we[N],k=!0):S.samples>0&&W.useMultisampledRTT(S)===!1?B=H.get(S).__webglMultisampledFramebuffer:Array.isArray(we)?B=we[V]:B=we,fe.copy(S.viewport),_e.copy(S.scissor),Se=S.scissorTest}else fe.copy(Pe).multiplyScalar(ee).floor(),_e.copy(bt).multiplyScalar(ee).floor(),Se=Xe;if(V!==0&&(B=G),_.bindFramebuffer(I.FRAMEBUFFER,B)&&_.drawBuffers(S,B),_.viewport(fe),_.scissor(_e),_.setScissorTest(Se),k){const pe=H.get(S.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+N,pe.__webglTexture,V)}else if(me){const pe=N;for(let Me=0;Me<S.textures.length;Me++){const we=H.get(S.textures[Me]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+Me,we.__webglTexture,V,pe)}}else if(S!==null&&V!==0){const pe=H.get(S.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,pe.__webglTexture,V)}j=-1},this.readRenderTargetPixels=function(S,N,V,B,k,me,xe,pe=0){if(!(S&&S.isWebGLRenderTarget)){Ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Me=H.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&xe!==void 0&&(Me=Me[xe]),Me){_.bindFramebuffer(I.FRAMEBUFFER,Me);try{const we=S.textures[pe],ke=we.format,We=we.type;if(S.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+pe),!b.textureFormatReadable(ke)){Ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!b.textureTypeReadable(We)){Ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=S.width-B&&V>=0&&V<=S.height-k&&I.readPixels(N,V,B,k,le.convert(ke),le.convert(We),me)}finally{const we=J!==null?H.get(J).__webglFramebuffer:null;_.bindFramebuffer(I.FRAMEBUFFER,we)}}},this.readRenderTargetPixelsAsync=async function(S,N,V,B,k,me,xe,pe=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Me=H.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&xe!==void 0&&(Me=Me[xe]),Me)if(N>=0&&N<=S.width-B&&V>=0&&V<=S.height-k){_.bindFramebuffer(I.FRAMEBUFFER,Me);const we=S.textures[pe],ke=we.format,We=we.type;if(S.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+pe),!b.textureFormatReadable(ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!b.textureTypeReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Te=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Te),I.bufferData(I.PIXEL_PACK_BUFFER,me.byteLength,I.STREAM_READ),I.readPixels(N,V,B,k,le.convert(ke),le.convert(We),0);const ot=J!==null?H.get(J).__webglFramebuffer:null;_.bindFramebuffer(I.FRAMEBUFFER,ot);const Et=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await gf(I,Et,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Te),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,me),I.deleteBuffer(Te),I.deleteSync(Et),me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,N=null,V=0){const B=Math.pow(2,-V),k=Math.floor(S.image.width*B),me=Math.floor(S.image.height*B),xe=N!==null?N.x:0,pe=N!==null?N.y:0;W.setTexture2D(S,0),I.copyTexSubImage2D(I.TEXTURE_2D,V,0,0,xe,pe,k,me),_.unbindTexture()},this.copyTextureToTexture=function(S,N,V=null,B=null,k=0,me=0){let xe,pe,Me,we,ke,We,Te,ot,Et;const yt=S.isCompressedTexture?S.mipmaps[me]:S.image;if(V!==null)xe=V.max.x-V.min.x,pe=V.max.y-V.min.y,Me=V.isBox3?V.max.z-V.min.z:1,we=V.min.x,ke=V.min.y,We=V.isBox3?V.min.z:0;else{const wt=Math.pow(2,-k);xe=Math.floor(yt.width*wt),pe=Math.floor(yt.height*wt),S.isDataArrayTexture?Me=yt.depth:S.isData3DTexture?Me=Math.floor(yt.depth*wt):Me=1,we=0,ke=0,We=0}B!==null?(Te=B.x,ot=B.y,Et=B.z):(Te=0,ot=0,Et=0);const ct=le.convert(N.format),Vt=le.convert(N.type);let ve;N.isData3DTexture?(W.setTexture3D(N,0),ve=I.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(W.setTexture2DArray(N,0),ve=I.TEXTURE_2D_ARRAY):(W.setTexture2D(N,0),ve=I.TEXTURE_2D),_.activeTexture(I.TEXTURE0),_.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,N.flipY),_.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),_.pixelStorei(I.UNPACK_ALIGNMENT,N.unpackAlignment);const oi=_.getParameter(I.UNPACK_ROW_LENGTH),Ke=_.getParameter(I.UNPACK_IMAGE_HEIGHT),fi=_.getParameter(I.UNPACK_SKIP_PIXELS),Ii=_.getParameter(I.UNPACK_SKIP_ROWS),sn=_.getParameter(I.UNPACK_SKIP_IMAGES);_.pixelStorei(I.UNPACK_ROW_LENGTH,yt.width),_.pixelStorei(I.UNPACK_IMAGE_HEIGHT,yt.height),_.pixelStorei(I.UNPACK_SKIP_PIXELS,we),_.pixelStorei(I.UNPACK_SKIP_ROWS,ke),_.pixelStorei(I.UNPACK_SKIP_IMAGES,We);const es=S.isDataArrayTexture||S.isData3DTexture,ut=N.isDataArrayTexture||N.isData3DTexture;if(S.isDepthTexture){const wt=H.get(S),rn=H.get(N),mt=H.get(wt.__renderTarget),on=H.get(rn.__renderTarget);_.bindFramebuffer(I.READ_FRAMEBUFFER,mt.__webglFramebuffer),_.bindFramebuffer(I.DRAW_FRAMEBUFFER,on.__webglFramebuffer);for(let ts=0;ts<Me;ts++)es&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,H.get(S).__webglTexture,k,We+ts),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,H.get(N).__webglTexture,me,Et+ts)),I.blitFramebuffer(we,ke,xe,pe,Te,ot,xe,pe,I.DEPTH_BUFFER_BIT,I.NEAREST);_.bindFramebuffer(I.READ_FRAMEBUFFER,null),_.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(k!==0||S.isRenderTargetTexture||H.has(S)){const wt=H.get(S),rn=H.get(N);_.bindFramebuffer(I.READ_FRAMEBUFFER,Z),_.bindFramebuffer(I.DRAW_FRAMEBUFFER,O);for(let mt=0;mt<Me;mt++)es?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,wt.__webglTexture,k,We+mt):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,wt.__webglTexture,k),ut?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,rn.__webglTexture,me,Et+mt):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,rn.__webglTexture,me),k!==0?I.blitFramebuffer(we,ke,xe,pe,Te,ot,xe,pe,I.COLOR_BUFFER_BIT,I.NEAREST):ut?I.copyTexSubImage3D(ve,me,Te,ot,Et+mt,we,ke,xe,pe):I.copyTexSubImage2D(ve,me,Te,ot,we,ke,xe,pe);_.bindFramebuffer(I.READ_FRAMEBUFFER,null),_.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else ut?S.isDataTexture||S.isData3DTexture?I.texSubImage3D(ve,me,Te,ot,Et,xe,pe,Me,ct,Vt,yt.data):N.isCompressedArrayTexture?I.compressedTexSubImage3D(ve,me,Te,ot,Et,xe,pe,Me,ct,yt.data):I.texSubImage3D(ve,me,Te,ot,Et,xe,pe,Me,ct,Vt,yt):S.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,me,Te,ot,xe,pe,ct,Vt,yt.data):S.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,me,Te,ot,yt.width,yt.height,ct,yt.data):I.texSubImage2D(I.TEXTURE_2D,me,Te,ot,xe,pe,ct,Vt,yt);_.pixelStorei(I.UNPACK_ROW_LENGTH,oi),_.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Ke),_.pixelStorei(I.UNPACK_SKIP_PIXELS,fi),_.pixelStorei(I.UNPACK_SKIP_ROWS,Ii),_.pixelStorei(I.UNPACK_SKIP_IMAGES,sn),me===0&&N.generateMipmaps&&I.generateMipmap(ve),_.unbindTexture()},this.initRenderTarget=function(S){H.get(S).__webglFramebuffer===void 0&&W.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?W.setTextureCube(S,0):S.isData3DTexture?W.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?W.setTexture2DArray(S,0):W.setTexture2D(S,0),_.unbindTexture()},this.resetState=function(){Y=0,z=0,J=null,_.reset(),ge.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Bi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ye._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ye._getUnpackColorSpace()}}const Tu={type:"change"},Xl={type:"start"},Qh={type:"end"},Yr=new Mo,Au=new pn,xv=Math.cos(70*_i.DEG2RAD),Dt=new C,ii=2*Math.PI,at={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},_a=1e-6;class Sv extends Mp{constructor(e,t=null){super(e,t),this.state=at.NONE,this.target=new C,this.cursor=new C,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ss.ROTATE,MIDDLE:Ss.DOLLY,RIGHT:Ss.PAN},this.touches={ONE:xs.ROTATE,TWO:xs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new C,this._lastQuaternion=new ki,this._lastTargetPosition=new C,this._quat=new ki().setFromUnitVectors(e.up,new C(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new tu,this._sphericalDelta=new tu,this._scale=1,this._panOffset=new C,this._rotateStart=new Ce,this._rotateEnd=new Ce,this._rotateDelta=new Ce,this._panStart=new Ce,this._panEnd=new Ce,this._panDelta=new Ce,this._dollyStart=new Ce,this._dollyEnd=new Ce,this._dollyDelta=new Ce,this._dollyDirection=new C,this._mouse=new Ce,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Mv.bind(this),this._onPointerDown=yv.bind(this),this._onPointerUp=bv.bind(this),this._onContextMenu=Pv.bind(this),this._onMouseWheel=Tv.bind(this),this._onKeyDown=Av.bind(this),this._onTouchStart=Cv.bind(this),this._onTouchMove=Rv.bind(this),this._onMouseDown=Ev.bind(this),this._onMouseMove=wv.bind(this),this._interceptControlDown=Dv.bind(this),this._interceptControlUp=Lv.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Tu),this.update(),this.state=at.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const t=this.object.position;Dt.copy(t).sub(this.target),Dt.applyQuaternion(this._quat),this._spherical.setFromVector3(Dt),this.autoRotate&&this.state===at.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=ii:i>Math.PI&&(i-=ii),s<-Math.PI?s+=ii:s>Math.PI&&(s-=ii),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Dt.setFromSpherical(this._spherical),Dt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Dt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Dt.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const a=new C(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new C(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Dt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Yr.origin.copy(this.object.position),Yr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Yr.direction))<xv?this.object.lookAt(this.target):(Au.setFromNormalAndCoplanarPoint(this.object.up,this.target),Yr.intersectPlane(Au,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>_a||8*(1-this._lastQuaternion.dot(this.object.quaternion))>_a||this._lastTargetPosition.distanceToSquared(this.target)>_a?(this.dispatchEvent(Tu),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?ii/60*this.autoRotateSpeed*e:ii/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Dt.setFromMatrixColumn(t,0),Dt.multiplyScalar(-e),this._panOffset.add(Dt)}_panUp(e,t){this.screenSpacePanning===!0?Dt.setFromMatrixColumn(t,1):(Dt.setFromMatrixColumn(t,0),Dt.crossVectors(this.object.up,Dt)),Dt.multiplyScalar(e),this._panOffset.add(Dt)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Dt.copy(s).sub(this.target);let r=Dt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/i.clientHeight,this.object.matrix),this._panUp(2*t*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=e-i.left,r=t-i.top,o=i.width,a=i.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(ii*this._rotateDelta.x/t.clientHeight),this._rotateUp(ii*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(ii*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-ii*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(ii*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-ii*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(i,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),r=.5*(e.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(ii*this._rotateDelta.x/t.clientHeight),this._rotateUp(ii*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Ce,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function yv(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Mv(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function bv(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Qh),this.state=at.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Ev(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Ss.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=at.DOLLY;break;case Ss.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=at.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=at.ROTATE}break;case Ss.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=at.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=at.PAN}break;default:this.state=at.NONE}this.state!==at.NONE&&this.dispatchEvent(Xl)}function wv(n){switch(this.state){case at.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case at.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case at.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function Tv(n){this.enabled===!1||this.enableZoom===!1||this.state!==at.NONE||(n.preventDefault(),this.dispatchEvent(Xl),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(Qh))}function Av(n){this.enabled!==!1&&this._handleKeyDown(n)}function Cv(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case xs.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=at.TOUCH_ROTATE;break;case xs.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=at.TOUCH_PAN;break;default:this.state=at.NONE}break;case 2:switch(this.touches.TWO){case xs.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=at.TOUCH_DOLLY_PAN;break;case xs.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=at.TOUCH_DOLLY_ROTATE;break;default:this.state=at.NONE}break;default:this.state=at.NONE}this.state!==at.NONE&&this.dispatchEvent(Xl)}function Rv(n){switch(this._trackPointer(n),this.state){case at.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case at.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case at.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case at.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=at.NONE}}function Pv(n){this.enabled!==!1&&n.preventDefault()}function Dv(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Lv(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.20.0
 * @author George Michael Brower
 * @license MIT
 */class zi{constructor(e,t,i,s,r="div"){this.parent=e,this.object=t,this.property=i,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(r),this.domElement.classList.add("controller"),this.domElement.classList.add(s),this.$name=document.createElement("div"),this.$name.classList.add("name"),zi.nextNameID=zi.nextNameID||0,this.$name.id=`lil-gui-name-${++zi.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",o=>o.stopPropagation()),this.domElement.addEventListener("keyup",o=>o.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(i)}name(e){return this._name=e,this.$name.textContent=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const t=this.parent.add(this.object,this.property,e);return t.name(this._name),this.destroy(),t}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.getValue()!==e&&(this.object[this.property]=e,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class Iv extends zi{constructor(e,t,i){super(e,t,i,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function Ml(n){let e,t;return(e=n.match(/(#|0x)?([a-f0-9]{6})/i))?t=e[2]:(e=n.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?t=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=n.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(t=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),t?"#"+t:!1}const Nv={isPrimitive:!0,match:n=>typeof n=="string",fromHexString:Ml,toHexString:Ml},cr={isPrimitive:!0,match:n=>typeof n=="number",fromHexString:n=>parseInt(n.substring(1),16),toHexString:n=>"#"+n.toString(16).padStart(6,0)},Fv={isPrimitive:!1,match:n=>Array.isArray(n),fromHexString(n,e,t=1){const i=cr.fromHexString(n);e[0]=(i>>16&255)/255*t,e[1]=(i>>8&255)/255*t,e[2]=(i&255)/255*t},toHexString([n,e,t],i=1){i=255/i;const s=n*i<<16^e*i<<8^t*i<<0;return cr.toHexString(s)}},Uv={isPrimitive:!1,match:n=>Object(n)===n,fromHexString(n,e,t=1){const i=cr.fromHexString(n);e.r=(i>>16&255)/255*t,e.g=(i>>8&255)/255*t,e.b=(i&255)/255*t},toHexString({r:n,g:e,b:t},i=1){i=255/i;const s=n*i<<16^e*i<<8^t*i<<0;return cr.toHexString(s)}},Ov=[Nv,cr,Fv,Uv];function Bv(n){return Ov.find(e=>e.match(n))}class zv extends zi{constructor(e,t,i,s){super(e,t,i,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=Bv(this.initialValue),this._rgbScale=s,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const r=Ml(this.$text.value);r&&this._setValueFromHexString(r)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const t=this._format.fromHexString(e);this.setValue(t)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class va extends zi{constructor(e,t,i){super(e,t,i,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",s=>{s.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class kv extends zi{constructor(e,t,i,s,r,o){super(e,t,i,"number"),this._initInput(),this.min(s),this.max(r);const a=o!==void 0;this.step(a?o:this._getImplicitStep(),a),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,t=!0){return this._step=e,this._stepExplicit=t,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let t=(e-this._min)/(this._max-this._min);t=Math.max(0,Math.min(t,1)),this.$fill.style.width=t*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const t=()=>{let M=parseFloat(this.$input.value);isNaN(M)||(this._stepExplicit&&(M=this._snap(M)),this.setValue(this._clamp(M)))},i=M=>{const E=parseFloat(this.$input.value);isNaN(E)||(this._snapClampSetValue(E+M),this.$input.value=this.getValue())},s=M=>{M.key==="Enter"&&this.$input.blur(),M.code==="ArrowUp"&&(M.preventDefault(),i(this._step*this._arrowKeyMultiplier(M))),M.code==="ArrowDown"&&(M.preventDefault(),i(this._step*this._arrowKeyMultiplier(M)*-1))},r=M=>{this._inputFocused&&(M.preventDefault(),i(this._step*this._normalizeMouseWheel(M)))};let o=!1,a,l,c,h,d;const u=5,p=M=>{a=M.clientX,l=c=M.clientY,o=!0,h=this.getValue(),d=0,window.addEventListener("mousemove",g),window.addEventListener("mouseup",x)},g=M=>{if(o){const E=M.clientX-a,y=M.clientY-l;Math.abs(y)>u?(M.preventDefault(),this.$input.blur(),o=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(E)>u&&x()}if(!o){const E=M.clientY-c;d-=E*this._step*this._arrowKeyMultiplier(M),h+d>this._max?d=this._max-h:h+d<this._min&&(d=this._min-h),this._snapClampSetValue(h+d)}c=M.clientY},x=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",g),window.removeEventListener("mouseup",x)},m=()=>{this._inputFocused=!0},f=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",t),this.$input.addEventListener("keydown",s),this.$input.addEventListener("wheel",r,{passive:!1}),this.$input.addEventListener("mousedown",p),this.$input.addEventListener("focus",m),this.$input.addEventListener("blur",f)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const e=(f,M,E,y,w)=>(f-M)/(E-M)*(w-y)+y,t=f=>{const M=this.$slider.getBoundingClientRect();let E=e(f,M.left,M.right,this._min,this._max);this._snapClampSetValue(E)},i=f=>{this._setDraggingStyle(!0),t(f.clientX),window.addEventListener("mousemove",s),window.addEventListener("mouseup",r)},s=f=>{t(f.clientX)},r=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",s),window.removeEventListener("mouseup",r)};let o=!1,a,l;const c=f=>{f.preventDefault(),this._setDraggingStyle(!0),t(f.touches[0].clientX),o=!1},h=f=>{f.touches.length>1||(this._hasScrollBar?(a=f.touches[0].clientX,l=f.touches[0].clientY,o=!0):c(f),window.addEventListener("touchmove",d,{passive:!1}),window.addEventListener("touchend",u))},d=f=>{if(o){const M=f.touches[0].clientX-a,E=f.touches[0].clientY-l;Math.abs(M)>Math.abs(E)?c(f):(window.removeEventListener("touchmove",d),window.removeEventListener("touchend",u))}else f.preventDefault(),t(f.touches[0].clientX)},u=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",d),window.removeEventListener("touchend",u)},p=this._callOnFinishChange.bind(this),g=400;let x;const m=f=>{if(Math.abs(f.deltaX)<Math.abs(f.deltaY)&&this._hasScrollBar)return;f.preventDefault();const E=this._normalizeMouseWheel(f)*this._step;this._snapClampSetValue(this.getValue()+E),this.$input.value=this.getValue(),clearTimeout(x),x=setTimeout(p,g)};this.$slider.addEventListener("mousedown",i),this.$slider.addEventListener("touchstart",h,{passive:!1}),this.$slider.addEventListener("wheel",m,{passive:!1})}_setDraggingStyle(e,t="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle(`lil-gui-${t}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:t,deltaY:i}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(t=0,i=-e.wheelDelta/120,i*=this._stepExplicit?1:10),t+-i}_arrowKeyMultiplier(e){let t=this._stepExplicit?1:10;return e.shiftKey?t*=10:e.altKey&&(t/=10),t}_snap(e){let t=0;return this._hasMin?t=this._min:this._hasMax&&(t=this._max),e-=t,e=Math.round(e/this._step)*this._step,e+=t,e=parseFloat(e.toPrecision(15)),e}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class Hv extends zi{constructor(e,t,i,s){super(e,t,i,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(s)}options(e){return this._values=Array.isArray(e)?e:Object.values(e),this._names=Array.isArray(e)?e:Object.keys(e),this.$select.replaceChildren(),this._names.forEach(t=>{const i=document.createElement("option");i.textContent=t,this.$select.appendChild(i)}),this.updateDisplay(),this}updateDisplay(){const e=this.getValue(),t=this._values.indexOf(e);return this.$select.selectedIndex=t,this.$display.textContent=t===-1?e:this._names[t],this}}class Vv extends zi{constructor(e,t,i){super(e,t,i,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",s=>{s.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var Gv=`.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
  background: var(--background-color);
}
.lil-gui.root > .title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.root > .children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.root > .children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.root > .children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.allow-touch-styles, .lil-gui.allow-touch-styles .lil-gui {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.force-touch-styles, .lil-gui.force-touch-styles .lil-gui {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-gui .controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-gui .controller.disabled {
  opacity: 0.5;
}
.lil-gui .controller.disabled, .lil-gui .controller.disabled * {
  pointer-events: none !important;
}
.lil-gui .controller > .name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-gui .controller .widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-gui .controller.string input {
  color: var(--string-color);
}
.lil-gui .controller.boolean {
  cursor: pointer;
}
.lil-gui .controller.color .display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-gui .controller.color .display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-gui .controller.color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-gui .controller.color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-gui .controller.option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-gui .controller.option .display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-gui .controller.option .display.focus {
    background: var(--focus-color);
  }
}
.lil-gui .controller.option .display.active {
  background: var(--focus-color);
}
.lil-gui .controller.option .display:after {
  font-family: "lil-gui";
  content: "↕";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-gui .controller.option .widget,
.lil-gui .controller.option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-gui .controller.option .widget:hover .display {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number input {
  color: var(--number-color);
}
.lil-gui .controller.number.hasSlider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-gui .controller.number .slider {
  width: 100%;
  height: var(--widget-height);
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-gui .controller.number .slider:hover {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number .slider.active {
  background: var(--focus-color);
}
.lil-gui .controller.number .slider.active .fill {
  opacity: 0.95;
}
.lil-gui .controller.number .fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-gui-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-gui-dragging * {
  cursor: ew-resize !important;
}

.lil-gui-dragging.lil-gui-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .title {
  height: var(--title-height);
  font-weight: 600;
  padding: 0 var(--padding);
  width: 100%;
  text-align: left;
  background: none;
  text-decoration-skip: objects;
}
.lil-gui .title:before {
  font-family: "lil-gui";
  content: "▾";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-gui-dragging) .lil-gui .title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.root > .title:focus {
  text-decoration: none !important;
}
.lil-gui.closed > .title:before {
  content: "▸";
}
.lil-gui.closed > .children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.closed:not(.transition) > .children {
  display: none;
}
.lil-gui.transition > .children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.root > .children > .lil-gui > .title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.root > .children > .lil-gui.closed > .title {
  border-bottom-color: transparent;
}
.lil-gui + .controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .controller {
  border: none;
}

.lil-gui label, .lil-gui input, .lil-gui button {
  -webkit-tap-highlight-color: transparent;
}
.lil-gui input {
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
  -moz-appearance: textfield;
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input[type=checkbox] {
  appearance: none;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "✓";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  border: none;
}
.lil-gui .controller button {
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
}
@media (hover: hover) {
  .lil-gui .controller button:hover {
    background: var(--hover-color);
  }
  .lil-gui .controller button:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui .controller button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff");
}`;function Wv(n){const e=document.createElement("style");e.innerHTML=n;const t=document.querySelector("head link[rel=stylesheet], head style");t?document.head.insertBefore(e,t):document.head.appendChild(e)}let Cu=!1;class Yl{constructor({parent:e,autoPlace:t=e===void 0,container:i,width:s,title:r="Controls",closeFolders:o=!1,injectStyles:a=!0,touchStyles:l=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(r),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),l&&this.domElement.classList.add("allow-touch-styles"),!Cu&&a&&(Wv(Gv),Cu=!0),i?i.appendChild(this.domElement):t&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),s&&this.domElement.style.setProperty("--width",s+"px"),this._closeFolders=o}add(e,t,i,s,r){if(Object(i)===i)return new Hv(this,e,t,i);const o=e[t];switch(typeof o){case"number":return new kv(this,e,t,i,s,r);case"boolean":return new Iv(this,e,t);case"string":return new Vv(this,e,t);case"function":return new va(this,e,t)}console.error(`gui.add failed
	property:`,t,`
	object:`,e,`
	value:`,o)}addColor(e,t,i=1){return new zv(this,e,t,i)}addFolder(e){const t=new Yl({parent:this,title:e});return this.root._closeFolders&&t.close(),t}load(e,t=!0){return e.controllers&&this.controllers.forEach(i=>{i instanceof va||i._name in e.controllers&&i.load(e.controllers[i._name])}),t&&e.folders&&this.folders.forEach(i=>{i._title in e.folders&&i.load(e.folders[i._title])}),this}save(e=!0){const t={controllers:{},folders:{}};return this.controllers.forEach(i=>{if(!(i instanceof va)){if(i._name in t.controllers)throw new Error(`Cannot save GUI with duplicate property "${i._name}"`);t.controllers[i._name]=i.save()}}),e&&this.folders.forEach(i=>{if(i._title in t.folders)throw new Error(`Cannot save GUI with duplicate folder "${i._title}"`);t.folders[i._title]=i.save()}),t}open(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(e){this._closed!==e&&(this._closed=e,this._callOnOpenClose(this))}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const t=this.$children.clientHeight;this.$children.style.height=t+"px",this.domElement.classList.add("transition");const i=r=>{r.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",i))};this.$children.addEventListener("transitionend",i);const s=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=s+"px"})}),this}title(e){return this._title=e,this.$title.textContent=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(i=>i.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onOpenClose(e){return this._onOpenClose=e,this}_callOnOpenClose(e){this.parent&&this.parent._callOnOpenClose(e),this._onOpenClose!==void 0&&this._onOpenClose.call(this,e)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(t=>{e=e.concat(t.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(t=>{e=e.concat(t.foldersRecursive())}),e}}const wn=`
  float hash21(vec2 p){
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  vec2 hash22(vec2 p){
    vec3 q = vec3(dot(p, vec2(127.1, 311.7)),
                  dot(p, vec2(269.5, 183.3)),
                  dot(p, vec2(419.2, 371.9)));
    return fract(sin(q.xy) * 43758.5453);
  }

  // Returns value in .x and its 2D gradient in .yz.
  vec3 noised(vec2 x){
    vec2 p = floor(x);
    vec2 f = fract(x);
    vec2 u  = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
    vec2 du = 30.0 * f * f * (f * (f - 2.0) + 1.0);
    float a = hash21(p + vec2(0.0, 0.0));
    float b = hash21(p + vec2(1.0, 0.0));
    float c = hash21(p + vec2(0.0, 1.0));
    float d = hash21(p + vec2(1.0, 1.0));
    float k1 = b - a;
    float k2 = c - a;
    float k3 = a - b - c + d;
    float n  = a + k1 * u.x + k2 * u.y + k3 * u.x * u.y;
    vec2  g  = du * vec2(k1 + k3 * u.y, k2 + k3 * u.x);
    return vec3(n, g);
  }

  const mat2 FBM_M = mat2(1.6, 1.2, -1.2, 1.6);

  float fbm(vec2 p, int oct){
    float amp = 0.5, sum = 0.0;
    for (int i = 0; i < 8; i++){
      if (i >= oct) break;
      sum += amp * noised(p).x;
      p = FBM_M * p;
      amp *= 0.5;
    }
    return sum;
  }
`,jh=`
  // Requires fbm() (from NOISE) and a 'uTime' uniform to be declared by the
  // shader that includes this chunk (used for drifting clouds). Night V1
  // additionally requires 'uNightAmount', 'uMoonDir', 'uMoonColor',
  // 'uMoonIntensity' and 'uStarVisibility' to be declared by that shader —
  // see Sky.js / Ocean.js.

  // Cheap deterministic sparse point-stars: partitions direction-space into
  // cells, jitters each cell's star within it and varies size/brightness per
  // cell, so points read as scattered rather than an obvious grid.
  float starField(vec3 d){
    vec3 gp = d * 240.0;
    vec3 gi = floor(gp);
    vec3 gf = fract(gp) - 0.5;
    float h = hash21(gi.xy * 12.9898 + gi.z * 78.233 + gi.yz * 3.77);
    if (h > 0.05) return 0.0;             // only a sparse fraction of cells
    vec2 jitter = vec2(hash21(gi.xy + 1.7), hash21(gi.yz + 3.1)) - 0.5;
    float d2 = length(gf.xy + jitter * 0.6);
    float size = mix(0.015, 0.08, hash21(gi.zx + 5.2));
    float star = smoothstep(size, 0.0, d2);
    float brightness = mix(0.2, 1.0, hash21(gi.xz + 9.4));
    return star * brightness;
  }

  vec3 atmosphere(vec3 dir, vec3 sunDir){
    dir = normalize(dir);
    float up      = clamp(dir.y, -1.0, 1.0);
    float sunAmt  = max(dot(dir, sunDir), 0.0);
    float sunElev = clamp(sunDir.y, 0.0, 1.0);

    // Rayleigh-style gradient: a genuinely blue sky so that water reflections
    // read as ocean-blue rather than washing out to white haze.
    vec3 zenith  = mix(vec3(0.06, 0.19, 0.52), vec3(0.09, 0.28, 0.66), sunElev);
    vec3 horizon = mix(vec3(0.44, 0.56, 0.75), vec3(0.60, 0.74, 0.90), sunElev);
    // ---- Night V1 (opt-in) ----------------------------------------------
    // A direct dark-navy override of the base gradient, gated by
    // uNightAmount — mathematically a no-op at 0, so day/sunset are
    // untouched. Everything below (warm band, ground haze, cirrus, cumulus,
    // Mie glow, sun disk) then naturally operates on top of an already-dark
    // sky instead of requiring each of those terms to be redesigned.
    zenith  = mix(zenith,  vec3(0.010, 0.016, 0.045), uNightAmount);
    horizon = mix(horizon, vec3(0.035, 0.055, 0.10),  uNightAmount);
    float h = pow(clamp(1.0 - up, 0.0, 1.0), 2.6);
    vec3 col = mix(zenith, horizon, h);

    // Warm band low on the horizon toward the sun (stronger when sun is low).
    vec3 warm = vec3(1.0, 0.72, 0.45);
    col = mix(col, warm, h * pow(sunAmt, 2.5) * (0.75 - 0.5 * sunElev));

    // Ground haze for reflection rays that point below the horizon.
    col = mix(col, vec3(0.05, 0.10, 0.15), smoothstep(0.0, -0.22, up));

    // ---- Stars (Night V1) — added before cirrus/cumulus so opaque cloud
    // coverage naturally occludes them via the existing mix() below. ----
    if (uNightAmount > 0.0001 && up > 0.02){
      float star = starField(dir) * uStarVisibility * uNightAmount;
      // Wash out close to the moon's own glow rather than competing with it.
      float moonAmtStar = max(dot(dir, uMoonDir), 0.0);
      star *= 1.0 - smoothstep(0.9985, 0.9999, moonAmtStar) * 0.9;
      col += vec3(0.9, 0.95, 1.0) * star;
    }

    // ---- Moon disk + glow (Night V1) — same treatment as the sun disk
    // below, but dimmer/tighter so it doesn't clip to a giant white blob.
    // Placed before cirrus/cumulus so clouds correctly occlude it too. ----
    if (uNightAmount > 0.0001){
      // Double-reflection-path fix: uNightAmount alone is too weak a gate
      // here — it starts rising as soon as the sun dips just below the
      // horizon (smoothstep(-2,-18,sunElev)), while Sunset V2's own glint
      // compensation keeps the SUN'S reflection sustained through that same
      // window. That overlap let a small-but-nonzero moon disk/glow render
      // into the sky texture SSR samples from, which mirrors it onto the
      // water as its own bright glitter column — a second reflection path
      // with no relation to Ocean.js's dedicated (correctly-gated) moon
      // reflection term. Squaring the gate keeps it a no-op once night is
      // properly established (uNightAmount=1 in ?night=1 is untouched) but
      // suppresses the moon far more steeply during early dusk.
      float moonVisGate = uNightAmount * uNightAmount;
      float moonAmt = max(dot(dir, uMoonDir), 0.0);
      float moonGlow = pow(moonAmt, 6.0) * 0.16 + pow(moonAmt, 300.0) * 0.35;
      col += uMoonColor * moonGlow * uMoonIntensity * moonVisGate;
      float moonDisk = smoothstep(0.99988, 0.999945, moonAmt);
      col += uMoonColor * moonDisk * uMoonIntensity * 2.0 * moonVisGate;
    }

    // ---- High wispy cirrus streaks (above the cumulus, always present) ----
    if (up > 0.02){
      float tc = 2600.0 / max(up, 0.03);
      vec2 cp2 = dir.xz * tc * 0.00035 + uTime * vec2(0.0035, 0.001);
      // Anisotropic frequency stretches the noise into long combed filaments.
      float ci = fbm(vec2(cp2.x * 0.55, cp2.y * 3.2), 4);
      float cir = smoothstep(0.52, 0.82, ci) * smoothstep(0.02, 0.18, up);
      vec3 cirCol = mix(vec3(0.98, 1.0, 1.06), vec3(1.15, 0.88, 0.68), (1.0 - sunElev) * 0.75);
      cirCol = mix(cirCol, vec3(0.05, 0.06, 0.09), uNightAmount);
      col = mix(col, cirCol, cir * 0.30);
    }

    // ---- Drifting cumulus clouds on a plane (also seen in reflections) ----
    if (up > 0.04){
      float t = 900.0 / max(up, 0.05);                 // ray → cloud plane
      vec2 cp = dir.xz * t * 0.0011 + uTime * vec2(0.006, 0.004);
      float base = fbm(cp, 5);
      float det  = fbm(cp * 2.9 + 4.0, 4);
      float density = base * 0.7 + det * 0.3;
      float cov = smoothstep(0.48, 0.66, density) * uCloudCover; // faded when volumetric is on
      cov *= smoothstep(0.05, 0.26, up);               // thin out at the horizon
      // Self-shadowing: bright sunlit tops, cooler/darker bases.
      float shade = smoothstep(0.46, 0.82, density);
      vec3 cloudDark = mix(vec3(0.36, 0.40, 0.50), vec3(0.55, 0.44, 0.42), (1.0 - sunElev));
      vec3 cloudCol  = mix(cloudDark, vec3(1.12, 1.08, 1.02), shade);
      cloudCol += vec3(1.0, 0.82, 0.55) * pow(sunAmt, 4.0) * 0.7; // silver lining
      // Night: dark blue-grey body with a subtle cool moonlit edge instead of
      // the frozen warm/white daylight palette.
      vec3 nightCloudCol = mix(vec3(0.028, 0.035, 0.06), vec3(0.13, 0.15, 0.21), shade);
      float moonAmtCloud = max(dot(dir, uMoonDir), 0.0);
      nightCloudCol += uMoonColor * pow(moonAmtCloud, 6.0) * uMoonIntensity * 0.45;
      cloudCol = mix(cloudCol, nightCloudCol, uNightAmount);
      col = mix(col, cloudCol, cov);
    }

    // Mie forward-scatter glow around the sun.
    vec3 sunTint = mix(vec3(1.00, 0.52, 0.24), vec3(1.00, 0.96, 0.88), sunElev);
    float glow = pow(sunAmt, 8.0) * 0.35 + pow(sunAmt, 90.0) * 0.6;
    col += sunTint * glow * (0.6 + 0.4 * h) * (1.0 - uNightAmount);

    // The sun disk itself — crisp and very bright (drives glints + bloom).
    float disk = smoothstep(0.99955, 0.99978, sunAmt);
    col += sunTint * disk * 14.0 * (1.0 - uNightAmount);

    return max(col, vec3(0.0));
  }
`,Xv=`
  #define MAX_WAVES 40

  uniform float uTime;
  uniform vec2  uWindDir;      // primary swell direction (unit-ish)
  uniform float uWaveCount;    // active waves in the spectrum
  uniform float uBaseFreq;     // spatial frequency of the longest wave
  uniform float uAmplitude;    // amplitude of the longest wave
  uniform float uChoppy;       // horizontal steepness (0..1)
  uniform float uDirSpread;    // angular spread of the spectrum (radians)
  uniform float uFreqMul;      // per-octave frequency multiplier
  uniform float uAmpMul;       // per-octave amplitude multiplier
  uniform float uSpeed;        // global time scale

  struct WaveSample {
    vec3  displacement;
    vec3  normal;
    float fold;      // <0 where the surface pinches → foam
    float height;    // vertical displacement only
  };

  WaveSample sampleOcean(vec2 pos){
    vec3  disp = vec3(0.0);
    vec3  nrm  = vec3(0.0, 1.0, 0.0); // running normal (subtract slopes)
    float jxx = 1.0, jzz = 1.0, jxz = 0.0;

    float baseAngle = atan(uWindDir.y, uWindDir.x);
    float freq  = uBaseFreq;
    float amp   = uAmplitude;
    int   count = int(uWaveCount);

    for (int i = 0; i < MAX_WAVES; i++){
      if (i >= count) break;
      float fi = float(i);

      // Deterministic per-wave randomness so the field never visibly tiles.
      float r0 = hash21(vec2(fi, 1.7));
      float r1 = hash21(vec2(fi, 9.1));

      float angle = baseAngle + (r0 * 2.0 - 1.0) * uDirSpread;
      vec2  d = vec2(cos(angle), sin(angle));

      float w = freq;
      float A = amp;
      // Deep-water dispersion: phase speed ~ sqrt(g/k).
      float phase = sqrt(9.81 * w) * uSpeed;
      // Bounded steepness so crests sharpen but don't self-intersect wildly.
      float Q = uChoppy / max(w * A * uWaveCount, 1e-3);

      float arg = w * dot(d, pos) + uTime * phase + r1 * 6.2831853;
      float s = sin(arg);
      float c = cos(arg);
      float WA = w * A;

      disp.x += Q * A * d.x * c;
      disp.z += Q * A * d.y * c;
      disp.y += A * s;

      // Surface normal (GPU Gems 1, ch.1).
      nrm.x -= d.x * WA * c;
      nrm.z -= d.y * WA * c;
      nrm.y -= Q * WA * s;

      // Jacobian of the horizontal map → foam where it folds.
      jxx -= Q * d.x * d.x * WA * s;
      jzz -= Q * d.y * d.y * WA * s;
      jxz -= Q * d.x * d.y * WA * s;

      freq *= uFreqMul;
      amp  *= uAmpMul;
    }

    WaveSample o;
    o.displacement = disp;
    o.normal = normalize(nrm);
    o.height = disp.y;
    o.fold = jxx * jzz - jxz * jxz; // determinant; <~0 at breaking crests
    return o;
  }
`,Yv=`
  #ifndef MAX_WAVES
  #define MAX_WAVES 40
  #endif
  uniform vec2  uWindDir;
  uniform float uWaveCount;
  uniform float uBaseFreq;
  uniform float uAmplitude;
  uniform float uDirSpread;
  uniform float uFreqMul;
  uniform float uAmpMul;
  uniform float uSpeed;
  uniform float uSurfaceY;

  float oceanHeight(vec2 pos){
    float baseAngle = atan(uWindDir.y, uWindDir.x);
    float freq = uBaseFreq;
    float amp  = uAmplitude;
    int   count = int(uWaveCount);
    float h = 0.0;
    for (int i = 0; i < MAX_WAVES; i++){
      if (i >= count) break;
      float fi = float(i);
      float r0 = hash21(vec2(fi, 1.7));
      float r1 = hash21(vec2(fi, 9.1));
      float angle = baseAngle + (r0 * 2.0 - 1.0) * uDirSpread;
      vec2  d = vec2(cos(angle), sin(angle));
      float phase = sqrt(9.81 * freq) * uSpeed;
      float arg = freq * dot(d, pos) + uTime * phase + r1 * 6.2831853;
      h += amp * sin(arg);
      freq *= uFreqMul;
      amp  *= uAmpMul;
    }
    return uSurfaceY + h;
  }
`,qv=`
  vec3 detailNormal(vec2 p, float t, float strength){
    vec2 g = vec2(0.0);
    float amp = 1.0;
    mat2 m = mat2(1.7, 1.1, -1.1, 1.7);
    vec2 flow = uWindDir * t * 0.6;
    for (int i = 0; i < 6; i++){
      vec3 n = noised(p + flow);
      g += amp * n.yz;
      p = m * p;
      flow = -flow * 0.85;
      amp *= 0.55;
    }
    return normalize(vec3(-g.x, 1.0 / max(strength, 1e-3), -g.y));
  }
`,ql=`
  float caustics(vec2 uv, float t){
    vec2 p = mod(uv * 6.2831853, 6.2831853) - 250.0;
    vec2 i = vec2(p);
    float c = 1.0;
    float inten = 0.0045;
    for (int n = 0; n < 3; n++){
      float tt = t * (1.0 - (3.5 / float(n + 1)));
      i = p + vec2(cos(tt - i.x) + sin(tt + i.y),
                   sin(tt - i.y) + cos(tt + i.x));
      c += 1.0 / length(vec2(p.x / (sin(i.x + tt) / inten),
                             p.y / (cos(i.y + tt) / inten)));
    }
    c /= 3.0;
    c = 1.17 - pow(c, 1.4);
    float v = pow(abs(c), 8.0);
    return clamp(v, 0.0, 1.0);
  }
`,$v=`
  const vec3 ABSORB = vec3(0.45, 0.09, 0.04);   // red dies fast; blue travels but deep still darkens
  const vec3 SCATTER = vec3(0.11, 0.28, 0.36);  // in-scattered teal
`,Kv=`
  uniform float uCloudShadow;    // strength; 0 disables the whole path
  uniform float uCloudPlaneY;    // altitude of the sampling plane
  uniform float uCloudScale;     // clouds' uNoiseScale
  uniform float uCloudCoverage;  // clouds' coverage at the midplane
  uniform vec3  uCloudDrift;     // clouds' accumulated wind drift

  float csHash13(vec3 p){
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }
  float csVnoise(vec3 x){
    vec3 i = floor(x), f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(csHash13(i + vec3(0,0,0)), csHash13(i + vec3(1,0,0)), f.x),
          mix(csHash13(i + vec3(0,1,0)), csHash13(i + vec3(1,1,0)), f.x), f.y),
      mix(mix(csHash13(i + vec3(0,0,1)), csHash13(i + vec3(1,0,1)), f.x),
          mix(csHash13(i + vec3(0,1,1)), csHash13(i + vec3(1,1,1)), f.x), f.y), f.z);
  }
  float csFbm(vec3 p){
    float v = 0.0, a = 0.5;
    mat3 m = mat3(0.0, 0.8, 0.6, -0.8, 0.36, -0.48, -0.6, -0.48, 0.64);
    for (int i = 0; i < 4; i++) { v += a * csVnoise(p); p = m * p * 2.02; a *= 0.5; }
    return v;
  }

  // Returns 0 = clear sky, 1 = fully shadowed.
  float cloudShadowAmt(vec3 wp, vec3 sunDir){
    if (uCloudShadow <= 0.001 || sunDir.y < 0.06) return 0.0;
    vec3 p = wp + sunDir * ((uCloudPlaneY - wp.y) / sunDir.y);
    float n = csFbm(p * uCloudScale + uCloudDrift);
    float th = 1.0 - uCloudCoverage;
    float d = smoothstep(th - 0.14, th + 0.22, n);
    return d * uCloudShadow;
  }
`;class Zv{constructor(e){this.uniforms={uSunDir:{value:e.clone()},uTime:{value:0},uCloudCover:{value:1},uNightAmount:{value:0},uMoonDir:{value:new C(0,1,0)},uMoonColor:{value:new de(14673648)},uMoonIntensity:{value:1},uStarVisibility:{value:0}};const t=new dt({side:jt,depthTest:!1,depthWrite:!1,toneMapped:!1,uniforms:this.uniforms,vertexShader:`
        varying vec3 vWorldDir;
        void main(){
          // World-space ray direction from the camera to this vertex.
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vWorldDir = wp.xyz - cameraPosition;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        precision highp float;
        uniform vec3 uSunDir;
        uniform float uTime;
        uniform float uCloudCover;
        uniform float uNightAmount;
        uniform vec3  uMoonDir;
        uniform vec3  uMoonColor;
        uniform float uMoonIntensity;
        uniform float uStarVisibility;
        varying vec3 vWorldDir;
        ${wn}
        ${jh}
        void main(){
          vec3 dir = normalize(vWorldDir);
          gl_FragColor = vec4(atmosphere(dir, normalize(uSunDir)), 1.0);
        }
      `}),i=new Wl(6e3,32,16);this.mesh=new ei(i,t),this.mesh.frustumCulled=!1,this.mesh.renderOrder=-1e3}update(e,t){this.mesh.position.copy(e.position),this.uniforms.uTime.value=t}setSun(e){this.uniforms.uSunDir.value.copy(e)}setMoon(e){this.uniforms.uMoonDir.value.copy(e)}}const Hs=16,xa=n=>n-Math.floor(n),ur={windDir:new Ce(1,.55).normalize(),waveCount:26,baseWavelength:150,amplitude:.72,choppy:.5,dirSpread:.95,freqMul:1.19,ampMul:.82,speed:1,surfaceY:0,refractStrength:.05,detailScale:.3,detailStrength:.14,clarity:1,depthFalloff:.16,sssStrength:.35,ssrStrength:.85,sunGlitter:0,roughness:.08,contactFoam:1,foamThreshold:.2,foamSoftness:.4,crestFoamStart:1.4,shoreFoamWidth:3.4,foamCoverage:1,foamEdge:.2,foamOpacity:.95,deepColor:new de(.0016,.032,.065),shallowColor:new de(.13,.56,.55),foamColor:new de(.95,.98,1),sssColor:new de(.1,.52,.46)};class Jv{constructor(e,t){const i=ur;this.uniforms={uTime:{value:0},uSunDir:{value:e.clone()},uWindDir:{value:i.windDir.clone()},uWaveCount:{value:i.waveCount},uBaseFreq:{value:2*Math.PI/i.baseWavelength},uAmplitude:{value:i.amplitude},uChoppy:{value:i.choppy},uDirSpread:{value:i.dirSpread},uFreqMul:{value:i.freqMul},uAmpMul:{value:i.ampMul},uSpeed:{value:i.speed},uSurfaceY:{value:i.surfaceY},uResolution:{value:t.clone()},uRefractionTex:{value:null},uDepthTex:{value:null},uNear:{value:.1},uFar:{value:8e3},uCameraUnderwater:{value:0},uRefractStrength:{value:i.refractStrength},uDetailScale:{value:i.detailScale},uDetailStrength:{value:i.detailStrength},uClarity:{value:i.clarity},uDepthFalloff:{value:i.depthFalloff},uSSSStrength:{value:i.sssStrength},uSSRStrength:{value:i.ssrStrength},uSunGlitter:{value:i.sunGlitter},uRoughness:{value:i.roughness},uCloudCover:{value:1},uProjMatrix:{value:new qe},uSunsetAmount:{value:0},uSunsetTint:{value:new de(16731423)},uSunsetOceanWarmth:{value:.5},uSunsetSunFocus:{value:.5},uSunsetHorizonWarmth:{value:.9},uSunsetGlitterBoost:{value:.5},uNightAmount:{value:0},uMoonDir:{value:new C(0,1,0)},uMoonColor:{value:new de(14673648)},uMoonIntensity:{value:1},uMoonPathFocus:{value:.5},uStarVisibility:{value:0},uTravelerHeadPos:{value:new C(0,0,0)},uTravelerGlowIntensity:{value:0},uTravelerGlowColor:{value:new de(16777215)},uContactFoam:{value:i.contactFoam},uBodyCount:{value:0},uBodies:{value:Array.from({length:Hs},()=>new _t)},uBodyVel:{value:Array.from({length:Hs},()=>new Ce)},uCloudShadow:{value:0},uCloudPlaneY:{value:450},uCloudScale:{value:.002},uCloudCoverage:{value:.35},uCloudDrift:{value:new C},uFoamThreshold:{value:i.foamThreshold},uFoamSoftness:{value:i.foamSoftness},uCrestFoamStart:{value:i.crestFoamStart},uShoreFoamWidth:{value:i.shoreFoamWidth},uFoamCoverage:{value:i.foamCoverage},uFoamEdge:{value:i.foamEdge},uFoamOpacity:{value:i.foamOpacity},uDeepColor:{value:i.deepColor.clone()},uShallowColor:{value:i.shallowColor.clone()},uFoamColor:{value:i.foamColor.clone()},uSSSColor:{value:i.sssColor.clone()}};const s=new dt({side:Ti,toneMapped:!1,uniforms:this.uniforms,vertexShader:`
        precision highp float;
        ${wn}
        ${Xv}
        uniform float uSurfaceY;

        varying vec3 vWorldPos;
        varying vec3 vNormal;
        varying float vFold;
        varying float vHeight;
        varying float vViewZ;

        void main(){
          vec3 worldPos = (modelMatrix * vec4(position, 1.0)).xyz;
          worldPos.y = uSurfaceY;

          WaveSample w = sampleOcean(worldPos.xz);
          vec3 displaced = worldPos + w.displacement;

          vWorldPos = displaced;
          vNormal   = w.normal;
          vFold     = w.fold;
          vHeight   = w.height;

          vec4 viewPos = viewMatrix * vec4(displaced, 1.0);
          vViewZ = viewPos.z;
          gl_Position = projectionMatrix * viewPos;
        }
      `,fragmentShader:`
        precision highp float;
        #include <packing>

        // Uniforms first — the shared chunks below (detailNormal) reference them.
        uniform float uTime;
        uniform vec3  uSunDir;
        uniform vec2  uWindDir;
        uniform vec2  uResolution;
        uniform sampler2D uRefractionTex;
        uniform sampler2D uDepthTex;
        uniform float uNear;
        uniform float uFar;
        uniform float uCameraUnderwater;
        uniform float uRefractStrength;
        uniform float uDetailScale;
        uniform float uDetailStrength;
        uniform float uClarity;
        uniform float uDepthFalloff;
        uniform float uSSSStrength;
        uniform float uSSRStrength;
        uniform float uSunGlitter;
        uniform float uRoughness;
        uniform float uCloudCover;
        uniform float uSunsetAmount;
        uniform vec3  uSunsetTint;
        uniform float uSunsetOceanWarmth;
        uniform float uSunsetSunFocus;
        uniform float uSunsetHorizonWarmth;
        uniform float uSunsetGlitterBoost;
        uniform float uNightAmount;
        uniform vec3  uMoonDir;
        uniform vec3  uMoonColor;
        uniform float uMoonIntensity;
        uniform float uMoonPathFocus;
        uniform float uStarVisibility;
        uniform vec3  uTravelerHeadPos;
        uniform float uTravelerGlowIntensity;
        uniform vec3  uTravelerGlowColor;
        uniform float uContactFoam;
        uniform int   uBodyCount;
        uniform vec4  uBodies[${Hs}];   // x, z, radius, foam strength
        uniform vec2  uBodyVel[${Hs}];  // horizontal velocity → wake direction
        uniform mat4  uProjMatrix;   // fragment prefix lacks projectionMatrix
        uniform float uFoamThreshold;
        uniform float uFoamSoftness;
        uniform float uCrestFoamStart;
        uniform float uShoreFoamWidth;
        uniform float uFoamCoverage;
        uniform float uFoamEdge;
        uniform float uFoamOpacity;
        uniform vec3  uDeepColor;
        uniform vec3  uShallowColor;
        uniform vec3  uFoamColor;
        uniform vec3  uSSSColor;

        ${wn}
        ${jh}
        ${qv}
        ${$v}
        ${Kv}

        varying vec3 vWorldPos;
        varying vec3 vNormal;
        varying float vFold;
        varying float vHeight;
        varying float vViewZ;

        float fresnelF(float c, float f0){
          return f0 + (1.0 - f0) * pow(clamp(1.0 - c, 0.0, 1.0), 5.0);
        }
        // GGX / Trowbridge-Reitz normal distribution — physical glint shape.
        float dggx(float NoH, float a){
          float a2 = a * a;
          float d = (NoH * a2 - NoH) * NoH + 1.0;
          return a2 / (3.14159265 * d * d);
        }
        float sceneEyeDepth(vec2 uv){
          float d = texture2D(uDepthTex, uv).x;
          return -perspectiveDepthToViewZ(d, uNear, uFar); // positive metres
        }

        // Screen-space reflection: march the reflection ray through the
        // pre-water colour+depth target so the island (and anything above water)
        // is mirrored on the surface. Returns rgb + a confidence in .a.
        #define SSR_STEPS 32
        vec4 ssr(vec3 ro, vec3 rd){
          float stepLen = 2.2;
          float prevDiff = -1.0;
          vec2  prevUV = vec2(0.0);
          for (int i = 1; i <= SSR_STEPS; i++){
            vec3 p = ro + rd * (stepLen * float(i));
            vec4 clip = uProjMatrix * viewMatrix * vec4(p, 1.0);
            if (clip.w <= 0.0) break;
            vec2 uv = clip.xy / clip.w * 0.5 + 0.5;
            if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) break;
            float sceneEye = sceneEyeDepth(uv);
            float rayEye = -(viewMatrix * vec4(p, 1.0)).z;
            float diff = rayEye - sceneEye;          // >0 → ray is behind the scene
            if (diff > 0.0 && diff < 6.0 && sceneEye < uFar * 0.97){
              // Refine between the last two samples for a cleaner hit.
              float t = prevDiff < 0.0 ? 1.0 : (-prevDiff / (diff - prevDiff));
              vec2 hitUV = mix(prevUV, uv, clamp(t, 0.0, 1.0));
              vec2 edge = smoothstep(0.0, 0.14, hitUV) * smoothstep(0.0, 0.14, 1.0 - hitUV);
              float conf = edge.x * edge.y * (1.0 - float(i) / float(SSR_STEPS) * 0.4);
              return vec4(texture2D(uRefractionTex, hitUV).rgb, conf);
            }
            prevDiff = diff;
            prevUV = uv;
            stepLen *= 1.06;                          // gently accelerate
          }
          return vec4(0.0);
        }

        void main(){
          vec3 sunDir = normalize(uSunDir);
          vec3 V = normalize(cameraPosition - vWorldPos);
          float sunElev = clamp(sunDir.y, 0.0, 1.0);
          float dist = length(cameraPosition - vWorldPos);

          // Base Gerstner normal + three scrolling ripple cascades (coarse →
          // capillary) for organic, non-tiling detail. The finest layers fade
          // with distance so the horizon doesn't shimmer/alias.
          vec3 N = normalize(vNormal);
          float detFade = exp(-dist * 0.012);
          vec3 dN1 = detailNormal(vWorldPos.xz * uDetailScale, uTime, 1.0);
          vec3 dN2 = detailNormal(vWorldPos.xz * uDetailScale * 3.7 + 11.0, uTime * 1.35, 1.0);
          vec3 dN3 = detailNormal(vWorldPos.xz * uDetailScale * 11.0 + 31.0, uTime * 1.9, 1.0);
          vec2 dsum = dN1.xz * uDetailStrength
                    + dN2.xz * uDetailStrength * 0.5 * mix(0.35, 1.0, detFade)
                    + dN3.xz * uDetailStrength * 0.28 * detFade;
          N = normalize(vec3(N.x + dsum.x, N.y, N.z + dsum.y));
          vec3 Ns = N.y >= 0.0 ? N : -N;      // geometric up (points to the air)
          if (dot(N, V) < 0.0) N = -N;         // shading normal faces the viewer

          bool underwater = uCameraUnderwater > 0.5;
          vec2 screenUV = gl_FragCoord.xy / uResolution;
          vec3 color;
          float shoreFoam = 0.0;
          float cs = 0.0;   // cloud shadow amount (0 = clear, 1 = shadowed)

          if (!underwater){
            // ================= ABOVE WATER =================
            // Moving cloud shadows — big soft patches drifting across the sea.
            cs = cloudShadowAmt(vWorldPos, sunDir);
            // Jitter the reflection normal with faded high-frequency sparkle so
            // the reflected sun shatters into moving glitter instead of a solid
            // streak (very visible on calm water at a low sunset sun).
            vec3 spk = detailNormal(vWorldPos.xz * uDetailScale * 16.0, uTime * 2.5, 1.0);
            vec3 Nr = normalize(N + vec3(spk.x, 0.0, spk.z) * uSunGlitter * detFade);
            vec3 R = reflect(-V, Nr);
            // Fold rays that dip below the horizon back up (mirror) instead of
            // clamping to a constant elevation.
            vec3 Rsky = R; Rsky.y = abs(Rsky.y);
            vec3 reflection = atmosphere(Rsky, sunDir);

            // Reflect the actual scene (island, seabed) via screen-space rays,
            // falling back to the sky where the ray finds nothing.
            if (uSSRStrength > 0.001){
              vec4 s = ssr(vWorldPos, R);
              reflection = mix(reflection, s.rgb, clamp(s.a, 0.0, 1.0) * uSSRStrength);
            }

            float fres = fresnelF(max(dot(N, V), 0.0), 0.02);

            // GGX sun-glint terms — computed here (rather than after foam/
            // SSS, where the additive contribution itself still lives) so
            // the cinematic-sunset block below can recolour the glint by its
            // own per-fragment intensity.
            vec3 H = normalize(V + sunDir);
            float rough = clamp(uRoughness + (1.0 - detFade) * 0.10, 0.02, 0.6);
            float D = dggx(max(dot(N, H), 0.0), rough * rough);
            float fh = fresnelF(max(dot(H, V), 0.0), 0.02);
            float sunNoL = max(dot(Ns, sunDir), 0.0);

            // Both overridden below in cinematic-sunset mode; identical to
            // the original sun-glint factor/colour otherwise.
            float sunsetGlitterFactor = sunElev;
            vec3  sunsetGlitterTint = vec3(1.0, 0.94, 0.82);

            // Refraction of the pre-rendered scene, attenuated by water column.
            float waterEye = -vViewZ;
            vec2  rUV = clamp(screenUV + N.xz * uRefractStrength, vec2(0.001), vec2(0.999));
            float sceneEye = sceneEyeDepth(rUV);
            if (sceneEye < waterEye){ rUV = screenUV; sceneEye = sceneEyeDepth(rUV); }
            float thickness = max(sceneEye - waterEye, 0.0);

            // Clear-water transmission: the seabed shows through, tinted and
            // dimmed by the water column. Bright turquoise over shallow sand,
            // fading to dark saturated deep — the tropical depth gradient.
            vec3 sceneCol = texture2D(uRefractionTex, rUV).rgb;
            vec3 T = exp(-(ABSORB / uClarity) * thickness);    // background transmittance
            vec3 waterCol = mix(uShallowColor, uDeepColor, 1.0 - exp(-thickness * uDepthFalloff));
            waterCol *= 0.5 + 0.5 * sunElev;
            vec3 transmitted = sceneCol * T + waterCol * (1.0 - T);

            color = mix(transmitted, reflection, fres);

            // ============ CINEMATIC SUNSET TINT V2 (opt-in) ============
            // Every weight below is driven by the reflection ray's OWN
            // geometry (sunAlign / horizonAlign — functions of R and sunDir,
            // not of camera distance or fres) and by uSunsetAmount, so at
            // uSunsetAmount = 0 this is a mathematical no-op and default
            // WaterThreeJS is untouched. Fresnel (fres) still only governs
            // how much of the (now sunset-aware) reflection shows through at
            // all — its existing role, and the existing atmosphere() call
            // above, are both unchanged.
            if (uSunsetAmount > 0.0001) {
              vec3 Rn = normalize(R);
              // How directly this facet's reflection points at the sun —
              // drives the layered sun path. Varies wave-to-wave because Rn
              // follows the (glitter-jittered) wave normal, not screen
              // position.
              float sunAlign = max(dot(Rn, sunDir), 0.0);
              // How close this facet's reflection points at the horizon
              // rather than the zenith — also purely a function of the
              // wave-tilted reflection ray (Rsky.y). Distant "background"
              // water therefore only warms where ITS wave facets happen to
              // reflect near-horizontal sky, not simply because it is far
              // away or near the screen-space horizon — this is what
              // replaces V1's Fresnel-driven broad band.
              float horizonAlign = 1.0 - clamp(abs(Rsky.y) * 1.3, 0.0, 1.0);

              // A small palette derived from the single uSunsetTint control:
              // a brightened white-gold core, and a magenta/purple horizon
              // edge for the side of the sky facing away from the sun.
              vec3 goldCore   = mix(vec3(1.0, 0.97, 0.90), uSunsetTint, 0.35);
              vec3 purpleEdge = mix(uSunsetTint, vec3(0.30, 0.08, 0.34), 0.65);

              // Layered sun path: a tight white-gold core inside a wider
              // gold/orange halo, both scaled by uSunsetSunFocus (broad glow
              // ↔ narrow streak) — two pow() bands of the SAME sunAlign, so
              // the path stays centred on the sun's true reflection
              // direction and fragments naturally with every wave tilt.
              float focusExp  = mix(2.5, 40.0, clamp(uSunsetSunFocus, 0.0, 1.0));
              float pathOuter = pow(sunAlign, focusExp);
              float pathCore  = pow(sunAlign, focusExp * 3.2);
              vec3 sunPathColor = mix(uSunsetTint, goldCore, clamp(pathCore * 1.6, 0.0, 1.0));

              // Horizon glow: broad and weak, present only where the
              // reflection ray is itself horizon-aligned, shifting from the
              // purple edge (away from the sun) toward the tint colour
              // (toward the sun) — different parts of the horizon read
              // different hues instead of one flat wash.
              vec3 horizonColor = mix(purpleEdge, uSunsetTint, sunAlign);
              float horizonWeight = horizonAlign * clamp(uSunsetHorizonWarmth, 0.0, 1.0);

              vec3 sunsetColor = mix(horizonColor, sunPathColor, clamp(pathOuter * 1.4, 0.0, 1.0));
              float recolorWeight = uSunsetAmount * clamp(horizonWeight + pathOuter, 0.0, 1.0);

              // Preserve luminance/shape (bright glow reads bright, dim sky
              // reads dim) but clamp it — the atmosphere's sun disk is
              // deliberately very bright HDR, and multiplying that straight
              // through here would blow the tint back out to white.
              float reflLum = clamp(dot(reflection, vec3(0.2126, 0.7152, 0.0722)), 0.12, 1.6);
              vec3 warmReflection = mix(reflection, sunsetColor * reflLum, recolorWeight);
              // Re-apply the SAME Fresnel weighting so the warm reflection
              // only displaces the part of the colour that was already
              // reflection-derived — Fresnel/SSR/refraction structure is
              // preserved, just recoloured where reflection already shows.
              color = mix(color, warmReflection, fres * recolorWeight);

              // Ocean Warmth: a weak, broad hue SHIFT of the water body
              // itself — blue toward indigo/dark purple — never a blend
              // toward the bright orange tint, so it darkens/cools rather
              // than repaints. This is the only sunset contribution that
              // touches the transmitted/base-water side of the water model,
              // and by itself it can never turn the sea red.
              vec3 purpleShift = color * vec3(0.90, 0.62, 0.94) + vec3(0.01, 0.0, 0.02);
              float warmthWeight = uSunsetAmount * clamp(uSunsetOceanWarmth, 0.0, 1.0) * 0.4;
              color = mix(color, purpleShift, warmthWeight);

              // Low-sun compensation for the GGX sun-glint term (applied
              // further below, using the D/fh/sunNoL computed earlier):
              // additive on top of the original sunElev factor, tapering out
              // as the sun climbs so midday glitter is unaffected.
              float glitterBoost = clamp(uSunsetGlitterBoost, 0.0, 1.0) * uSunsetAmount;
              sunsetGlitterFactor = sunElev + glitterBoost * (1.0 - sunElev);
              // Recolour by the glint's OWN intensity rather than a flat
              // boost amount, so the hottest pixels stay white-gold while
              // the weaker surrounding glint reads orange/red — this is what
              // breaks the old solid-white-column look into a layered path.
              float glintRaw = D * fh * sunNoL;
              float glintNorm = clamp(glintRaw / (glintRaw + 0.12), 0.0, 1.0);
              vec3 glintEdgeColor = mix(uSunsetTint, vec3(0.55, 0.10, 0.14), 0.35);
              vec3 glintRecolor = mix(glintEdgeColor, goldCore, pow(glintNorm, 2.0));
              sunsetGlitterTint = mix(vec3(1.0, 0.94, 0.82), glintRecolor, clamp(glitterBoost, 0.0, 1.0));
            }

            // ============ CINEMATIC NIGHT: OCEAN MOON REFLECTION (Night V1) ============
            // Reuses the exact reflection-vector approach validated by
            // Cinematic Sunset V2: a per-fragment alignment between the
            // wave-tilted reflection ray and the light direction, so the
            // "moon road" fragments naturally across waves instead of
            // forming a rectangle or a flat vertical column. Independent of
            // the sunset block above — sun and moon can coexist.
            if (uNightAmount > 0.0001) {
              // Double-reflection-path fix (see common.js's matching comment):
              // uNightAmount rises as soon as the sun dips just below the
              // horizon, well before Sunset V2's own sustained glint fades —
              // squaring it keeps this term a no-op once night is properly
              // established (?night=1's uNightAmount=1 is unaffected) while
              // suppressing it far more steeply during that early-dusk overlap.
              float moonVisGate = uNightAmount * uNightAmount;
              vec3 RnMoon = normalize(R);
              float moonAlign = max(dot(RnMoon, uMoonDir), 0.0);
              float moonFocusExp = mix(4.0, 60.0, clamp(uMoonPathFocus, 0.0, 1.0));
              float moonPath = pow(moonAlign, moonFocusExp);
              // Pale-blue fringe at the path's edges, brightening to a
              // silver-white core right at the moon's own reflection.
              vec3 moonPathColor = mix(uMoonColor * 0.6, vec3(0.88, 0.92, 1.0), clamp(moonPath * 1.6, 0.0, 1.0));
              float moonReflWeight = clamp(moonVisGate * clamp(uMoonIntensity, 0.0, 3.0) * clamp(moonPath * 1.3, 0.0, 1.0), 0.0, 1.0);
              float reflLumMoon = clamp(dot(reflection, vec3(0.2126, 0.7152, 0.0722)), 0.02, 1.2);
              vec3 moonReflection = mix(reflection, moonPathColor * reflLumMoon, moonReflWeight);
              // Same Fresnel re-application as the sunset path above: only
              // the already-reflection-derived part of the pixel is
              // displaced, so Fresnel/SSR/refraction structure is preserved.
              color = mix(color, moonReflection, fres * moonReflWeight);
            }

            // Shoreline: a textured, advecting foam band where water gets shallow.
            float shore = smoothstep(uShoreFoamWidth, 0.12, thickness);
            float sTex = fbm(vWorldPos.xz * 0.5 - uWindDir * uTime * 0.6, 4);
            shoreFoam = shore * smoothstep(0.15, 0.55, sTex);

            // Subsurface translucency: a subtle glow through thin, back-lit
            // crests only — kept gentle so it never washes the sea cyan.
            float back  = pow(max(dot(V, -sunDir), 0.0), 4.0);
            float crest = smoothstep(0.4, 1.8, vHeight) * max(N.y, 0.0);
            color += uSSSColor * back * crest * sunElev * uSSSStrength * (1.0 - cs * 0.85);

            // GGX sun glints: physically-shaped sparkle whose size follows the
            // micro-roughness; slightly rougher in the distance so the horizon
            // reads as a soft streak instead of aliasing fireflies. (H, rough,
            // D, fh, sunNoL are computed earlier, right after fres, so the
            // cinematic-sunset block above can recolour by glint intensity.)
            color += sunsetGlitterTint * D * fh * sunNoL * 3.0 * sunsetGlitterFactor * (1.0 - cs * 0.9);

            // Moon GGX glint (Night V1): the same physically-shaped specular
            // term as the sun's, evaluated against the moon direction with a
            // tighter (more delicate) roughness and a dimmer, cool-silver
            // tint — a separate additive sparkle on top of the broad moon
            // reflection path above, so aligned wave facets catch a crisp
            // highlight rather than the whole path reading uniformly bright.
            if (uNightAmount > 0.0001) {
              vec3 Hm = normalize(V + uMoonDir);
              float roughMoon = clamp(rough * 0.6, 0.02, 0.6);
              float Dm = dggx(max(dot(N, Hm), 0.0), roughMoon * roughMoon);
              float fhm = fresnelF(max(dot(Hm, V), 0.0), 0.02);
              float moonNoL = max(dot(Ns, uMoonDir), 0.0);
              color += vec3(0.80, 0.86, 0.96) * Dm * fhm * moonNoL * 1.1
                     * clamp(uMoonIntensity, 0.0, 3.0) * (uNightAmount * uNightAmount) * (1.0 - cs * 0.9);
            }

            // ============ HEAD PARTICLE TRAIL: LOCAL WATER GLINTS (opt-in) ========
            // A handful of small, local, moving broken glints beneath the
            // traveler's head — explicitly NOT a second sun/moon-style
            // reflection road (see the double-light-path fix earlier this
            // project). uTravelerGlowIntensity is 0 by default (main.js only
            // raises it while ?headParticles=1 is active), so this whole
            // block is a mathematically exact no-op — zero cost, zero
            // visual change — for every other mode.
            if (uTravelerGlowIntensity > 0.0001) {
              float distXZ = length(vWorldPos.xz - uTravelerHeadPos.xz);
              // Distance is only a soft REGION GATE (limits how far the
              // effect can reach at all), never the shape of the brightness
              // itself. Roughly 1.5m fully lit, fading to nothing by ~6m.
              float gate = 1.0 - smoothstep(1.5, 6.0, distXZ);
              // A plain N.L Lambertian term (even raised to a high power)
              // still painted a smooth soft disc, because ocean wave
              // normals barely deviate from "mostly up" at this scale —
              // N.L doesn't vary sharply enough between neighbouring
              // fragments to break into glints on its own. Real "broken
              // glints" need the SAME physically-based specular technique
              // already used for the sun/moon glitter above (reflection
              // half-vector + GGX distribution + Fresnel) — that formula is
              // inherently sharp (D peaks hard only near mirror-alignment),
              // which is what actually scatters the response into a
              // handful of bright points instead of a filled circle.
              // Uses the real head Y (not a fake fixed height) — otherwise
              // the light direction barely varies per fragment.
              vec3 toHead = uTravelerHeadPos - vWorldPos;
              vec3 toHeadN = normalize(toHead);
              vec3 Hh = normalize(V + toHeadN);
              float roughGlint = clamp(rough * 0.7, 0.05, 0.45);
              float Dh = dggx(max(dot(N, Hh), 0.0), roughGlint * roughGlint);
              float fhh = fresnelF(max(dot(Hh, V), 0.0), 0.02);
              float ndl = max(dot(N, toHeadN), 0.0);
              float glint = gate * Dh * fhh * ndl;
              // Kept modest — the water response must never bloom as hard
              // as the head itself.
              color += uTravelerGlowColor * glint * 2.6 * uTravelerGlowIntensity;
            }

          } else {
            // ============ SEEN FROM BELOW (Snell's window) ============
            // Looking up, most of the upward cone shows the whole sky refracted
            // into a bright, rippling ceiling; only past the ~48.6° critical
            // angle does it fall back to the (still bright, sunlit) water volume.
            vec3 I = normalize(vWorldPos - cameraPosition); // toward the surface
            vec3 refr = refract(I, -Ns, 1.333);             // water -> air
            float ci = abs(dot(Ns, I));
            float fres = fresnelF(ci, 0.02);

            // Sunlit underwater ambient — bright turquoise near the surface,
            // never near-black, so the ceiling reads clear instead of a porthole.
            vec3 waterGlow = mix(uShallowColor, vec3(0.72, 0.92, 0.96), 0.35)
                           * (0.55 + 0.85 * sunElev);
            // Night V1: the daylight teal floor above is replaced with a dim,
            // cool ambient so the Snell's-window ceiling darkens instead of
            // staying tropical-bright regardless of how far the sun has set.
            vec3 nightGlow = uShallowColor * 0.22 + uMoonColor * clamp(uMoonIntensity, 0.0, 3.0) * 0.05;
            waterGlow = mix(waterGlow, nightGlow, uNightAmount);

            if (dot(refr, refr) < 1e-4){
              color = waterGlow;                            // total internal reflection
            } else {
              // The window: full sky, softened + lifted so it reads as a bright
              // luminous ceiling rather than hard, high-contrast cloud shapes.
              vec3 sky = atmosphere(refr, sunDir);
              float lum = max(sky.r, max(sky.g, sky.b));
              sky = mix(sky, vec3(0.80, 0.9, 1.0) * lum, 0.4);   // soften clouds
              sky *= 1.25;
              color = mix(waterGlow, sky, 1.0 - fres);
            }
            // Caustic shimmer dancing on the underside of the surface — the
            // silvery rippling highlights that make it read as water, not sky.
            float shimmer = fbm(vWorldPos.xz * 0.5 + uWindDir * uTime * 0.5, 4);
            shimmer = smoothstep(0.52, 0.92, shimmer);
            color += vec3(0.9, 0.98, 1.0) * shimmer * (1.0 - fres) * 0.35;

            // Overall lift + a bright band along the window edge.
            color += vec3(0.85, 0.95, 1.0) * (1.0 - fres) * 0.06;
          }

          // ================= FOAM (layered, both faces) =================
          // "Energy" = how much foam should exist here: from breaking folds,
          // whitecap crests, and the shoreline band.
          float breakE = smoothstep(uFoamThreshold, uFoamThreshold - uFoamSoftness, vFold);
          float crestE = smoothstep(uCrestFoamStart, uCrestFoamStart + 1.6, vHeight);

          // Contact foam: churn rings, trailing wakes and splash bursts around
          // the floating objects (positions fed in every frame).
          float contact = 0.0;
          if (uContactFoam > 0.001){
            for (int i = 0; i < ${Hs}; i++){
              if (i >= uBodyCount) break;
              vec4 B = uBodies[i];
              if (B.w < 0.01) continue;
              vec2 dp = vWorldPos.xz - B.xy;
              vec2 v = uBodyVel[i];
              float sp = length(v);
              if (sp > 0.25){
                // Fold trailing points onto a capsule behind the body → wake.
                vec2 vd = v / sp;
                float along = dot(dp, vd);
                dp -= vd * clamp(along, -B.z * min(2.0 + sp * 0.9, 7.0), 0.0);
              }
              float q = length(dp) / max(B.z, 0.1);
              contact += smoothstep(2.4, 0.85, q) * B.w;
            }
            contact = min(contact, 1.6) * uContactFoam;
          }

          float energy = clamp((breakE + crestE * 0.7 + shoreFoam + contact) * uFoamCoverage, 0.0, 1.2);

          vec2 fp = vWorldPos.xz;
          vec2 flow = uWindDir * uTime * 0.4;
          // Stretch noise along the wind so foam forms streaks / trails.
          vec2 wperp = vec2(-uWindDir.y, uWindDir.x);
          vec2 sp = vec2(dot(fp, uWindDir), dot(fp, wperp) * 3.0);
          float tCoarse = fbm(sp * 0.12 + flow, 5);
          float tMid    = fbm(fp * 0.8 - flow * 1.3, 4);
          float tFine   = fbm(fp * 2.6 + flow * 0.7, 4);
          float tex = tCoarse * 0.58 + tMid * 0.30 + tFine * 0.12;

          // Dissolve: dense cap where energy is high; only the highest noise
          // peaks survive as it fades → soft, feathered, dissipating layers.
          float thr  = 1.0 - clamp(energy, 0.0, 1.0);
          float foam = smoothstep(thr - uFoamEdge, thr + uFoamEdge, tex);
          foam *= smoothstep(0.0, 0.12, energy);

          // A second, sparser layer of the brightest fresh foam on strong breaks.
          float fresh = smoothstep(0.62, 0.95, tMid)
                      * smoothstep(0.5, 1.0, breakE + shoreFoam + contact);
          foam = max(foam, fresh);

          // Gentle bubble breakup; thin foam is translucent (water shows through).
          // Foam is diffuse — shade it with the sun so it has form, not flat white.
          float bubbles = 0.74 + 0.34 * fbm(fp * 4.5 - flow, 3);
          float foamLight = 0.55 + 0.5 * max(dot(Ns, sunDir), 0.0);
          vec3 foamCol = uFoamColor * bubbles * foamLight;
          float density = smoothstep(0.05, 0.75, foam);
          foamCol = mix(mix(color, uFoamColor, 0.5), foamCol, density);
          color = mix(color, foamCol, clamp(foam, 0.0, 1.0) * uFoamOpacity);

          // ================= HORIZON / DISTANCE =================
          if (!underwater){
            // Cloud shadow dims the whole surface (water + foam) softly; the
            // aerial haze mixed in below stays unshadowed, as in reality.
            color *= 1.0 - cs * 0.30;

            vec3 horizonDir = normalize(vec3(-V.x, 0.02, -V.z));
            // Cap the haze colour: the sun disk is intentionally ×14 bright for
            // glints/bloom, but it must NOT leak into the distance fog or it
            // paints a hard vertical beam straight down the sun's azimuth.
            vec3 fogCol = min(atmosphere(horizonDir, sunDir), vec3(1.6));
            float fogAmt = 1.0 - exp(-dist * 0.00045);
            color = mix(color, fogCol, clamp(fogAmt, 0.0, 1.0));
          } else {
            float fogAmt = 1.0 - exp(-dist * 0.02);
            color = mix(color, uDeepColor * 0.6, clamp(fogAmt, 0.0, 1.0));
          }

          gl_FragColor = vec4(color, 1.0);
        }
      `});this.size=6e3,this.segments=600;const r=new en(this.size,this.size,this.segments,this.segments);r.rotateX(-Math.PI/2),this.mesh=new ei(r,s),this.mesh.frustumCulled=!1,this._cell=this.size/this.segments}update(e,t){this.uniforms.uTime.value=e;const i=this._cell;this.mesh.position.x=Math.round(t.position.x/i)*i,this.mesh.position.z=Math.round(t.position.z/i)*i}setSun(e){this.uniforms.uSunDir.value.copy(e)}setMoon(e){this.uniforms.uMoonDir.value.copy(e)}setResolution(e,t){this.uniforms.uResolution.value.set(e,t)}_hash21(e,t){let i=xa(e*123.34),s=xa(t*456.21);const r=i*(i+45.32)+s*(s+45.32);return i+=r,s+=r,xa(i*s)}_gerstner(e,t,i,s){const r=this.uniforms,o=Math.atan2(r.uWindDir.value.y,r.uWindDir.value.x),a=r.uWaveCount.value|0,l=r.uChoppy.value,c=r.uSpeed.value,h=r.uDirSpread.value;let d=r.uBaseFreq.value,u=r.uAmplitude.value,p=0,g=0,x=0,m=0,f=1,M=0;for(let y=0;y<a;y++){const w=this._hash21(y,1.7),A=this._hash21(y,9.1),R=o+(w*2-1)*h,v=Math.cos(R),T=Math.sin(R),D=d,P=u,F=Math.sqrt(9.81*D)*c,G=l/Math.max(D*P*a,.001),Z=D*(v*e+T*t)+i*F+A*6.2831853,O=Math.sin(Z),Y=Math.cos(Z),z=D*P;p+=G*P*v*Y,x+=G*P*T*Y,g+=P*O,m-=v*z*Y,M-=T*z*Y,f-=G*z*O,d*=r.uFreqMul.value,u*=r.uAmpMul.value}const E=1/Math.hypot(m,f,M);return s.dx=p,s.dz=x,s.h=r.uSurfaceY.value+g,s.nx=m*E,s.ny=f*E,s.nz=M*E,s}surfaceSample(e,t,i,s={}){let r=e,o=t;for(let a=0;a<4;a++)this._gerstner(r,o,i,s),r=e-s.dx,o=t-s.dz;return this._gerstner(r,o,i,s)}heightAt(e,t,i){const s=this.uniforms,r=Math.atan2(s.uWindDir.value.y,s.uWindDir.value.x);let o=s.uBaseFreq.value,a=s.uAmplitude.value;const l=s.uWaveCount.value|0;let c=0;for(let h=0;h<l;h++){const d=this._hash21(h,1.7),u=this._hash21(h,9.1),p=r+(d*2-1)*s.uDirSpread.value,g=Math.cos(p),x=Math.sin(p),m=Math.sqrt(9.81*o)*s.uSpeed.value,f=o*(g*e+x*t)+i*m+u*6.2831853;c+=a*Math.sin(f),o*=s.uFreqMul.value,a*=s.uAmpMul.value}return s.uSurfaceY.value+c}}class Qv{constructor(e,t=34){this.depth=t,this.uniforms={uTime:{value:0},uSunDir:{value:e.clone()},uDepth:{value:t},uDuneHeight:{value:4},uDuneScale:{value:.02},uSandColor:{value:new de(.66,.58,.44)},uSandColor2:{value:new de(.46,.41,.31)},uCausticColor:{value:new de(1,.98,.85)},uNightAmount:{value:0},uMoonDir:{value:new C(0,1,0)},uMoonColor:{value:new de(14673648)},uMoonIntensity:{value:1}};const i=new dt({toneMapped:!1,uniforms:this.uniforms,vertexShader:`
        precision highp float;
        ${wn}
        uniform float uDuneHeight;
        uniform float uDuneScale;
        varying vec3 vWorldPos;

        void main(){
          vec3 wp = (modelMatrix * vec4(position, 1.0)).xyz;
          float dune = fbm(wp.xz * uDuneScale, 5) * uDuneHeight;
          wp.y += dune;
          vWorldPos = wp;
          gl_Position = projectionMatrix * viewMatrix * vec4(wp, 1.0);
        }
      `,fragmentShader:`
        precision highp float;
        ${wn}
        ${ql}
        uniform float uTime;
        uniform vec3  uSunDir;
        uniform float uDepth;
        uniform float uDuneHeight;
        uniform float uDuneScale;
        uniform vec3  uSandColor;
        uniform vec3  uSandColor2;
        uniform vec3  uCausticColor;
        uniform float uNightAmount;
        uniform vec3  uMoonDir;
        uniform vec3  uMoonColor;
        uniform float uMoonIntensity;
        varying vec3 vWorldPos;

        // Surface normal from the fbm dune/ripple field (analytic gradient).
        vec3 reliefNormal(vec2 p, float slope){
          vec2 g = vec2(0.0);
          float amp = 1.0;
          mat2 m = FBM_M;
          for (int i = 0; i < 5; i++){
            vec3 n = noised(p);
            g += amp * n.yz;
            p = m * p;
            amp *= 0.5;
          }
          return normalize(vec3(-g.x * slope, 1.0, -g.y * slope));
        }

        void main(){
          vec3 sunDir = normalize(uSunDir);
          vec2 xz = vWorldPos.xz;

          // Macro dunes + finer ripples.
          vec3 N = reliefNormal(xz * uDuneScale, uDuneHeight * uDuneScale * 12.0);
          vec3 Nr = reliefNormal(xz * 0.25 + 7.3, 0.35);
          N = normalize(N + vec3(Nr.x, 0.0, Nr.z) * 0.6);

          // Sand albedo with mottled patches.
          float mottle = fbm(xz * 0.06, 4) * 0.5 + 0.5;
          vec3 sand = mix(uSandColor2, uSandColor, smoothstep(0.3, 0.75, mottle));
          sand *= 0.8 + 0.2 * fbm(xz * 0.9, 3);

          // Diffuse sun term (softened; most light underwater is ambient).
          float ndl = clamp(dot(N, sunDir), 0.0, 1.0);
          float diffuse = 0.45 + 0.55 * ndl;
          // Night V1: the 0.45 daylight-ambient floor above assumes there is
          // always some sunlight reaching the seabed — at night that isn't
          // true, so darken it and light the floor from the moon instead.
          float moonNdl = clamp(dot(N, uMoonDir), 0.0, 1.0);
          float nightDiffuse = 0.05 + 0.12 * moonNdl * clamp(uMoonIntensity, 0.0, 3.0);
          diffuse = mix(diffuse, nightDiffuse, uNightAmount);

          // Two caustic layers, offset & counter-scrolling, combined sharply.
          float t = uTime * 0.6;
          vec2 flow = sunDir.xz * uTime * 0.4;
          float c1 = caustics(xz * 0.05 + flow, t);
          float c2 = caustics(xz * 0.085 - flow * 0.7 + 15.0, t * 1.3);
          float caus = min(c1, c2) + 0.35 * c1 * c2;

          // Caustics fade with depth and with the sun sinking.
          float reach = clamp(uSunDir.y, 0.0, 1.0);
          reach *= exp(-uDepth * 0.012);
          caus *= (0.4 + 0.9 * ndl);

          vec3 color = sand * diffuse;
          // Night V1: the (0.9 + 1.6*reach) floor never goes below 0.9 even
          // with reach = 0 (sun fully below the horizon) — caustics need a
          // real light source, so give them a much dimmer, moon-driven
          // ceiling at night instead.
          float causDay = 0.9 + 1.6 * reach;
          float causNight = 0.1 + 0.35 * moonNdl * clamp(uMoonIntensity, 0.0, 3.0);
          color += uCausticColor * caus * mix(causDay, causNight, uNightAmount);

          gl_FragColor = vec4(color, 1.0);
        }
      `});this.size=6e3;const s=new en(this.size,this.size,256,256);s.rotateX(-Math.PI/2),this.mesh=new ei(s,i),this.mesh.position.y=-t,this.mesh.frustumCulled=!1}update(e,t){this.uniforms.uTime.value=e;const i=this.size/256;this.mesh.position.x=Math.round(t.position.x/i)*i,this.mesh.position.z=Math.round(t.position.z/i)*i}setSun(e){this.uniforms.uSunDir.value.copy(e)}setMoon(e){this.uniforms.uMoonDir.value.copy(e)}}class jv{constructor(e,t=22,i){this.uniforms={uTime:{value:0},uSunDir:{value:e.clone()},uCenter:{value:new Ce(0,-110)},uRinner:{value:70},uRouter:{value:175},uSeabedY:{value:-t},uPeakY:{value:7},uSandDry:{value:new de(.64,.55,.39)},uSandWet:{value:new de(.24,.19,.13)},uCausticColor:{value:new de(1,.98,.85)},uNightAmount:{value:0},uMoonDir:{value:new C(0,1,0)},uMoonColor:{value:new de(14673648)},uMoonIntensity:{value:1},uWindDir:i.uWindDir,uWaveCount:i.uWaveCount,uBaseFreq:i.uBaseFreq,uAmplitude:i.uAmplitude,uDirSpread:i.uDirSpread,uFreqMul:i.uFreqMul,uAmpMul:i.uAmpMul,uSpeed:i.uSpeed,uSurfaceY:i.uSurfaceY};const s=`
      ${wn}
      uniform vec2  uCenter;
      uniform float uRinner;
      uniform float uRouter;
      uniform float uSeabedY;
      uniform float uPeakY;

      // World-space terrain height at xz.
      float islandHeight(vec2 p){
        float d = distance(p, uCenter);
        float land = smoothstep(uRouter, uRinner, d);      // 1 inside → 0 outside
        float base = mix(uSeabedY, uPeakY, land);
        // Dunes + finer sand relief; stronger on the exposed land.
        float n = fbm(p * 0.02, 5) * 4.0 + fbm(p * 0.11, 4) * 1.1;
        base += n * (0.35 + 0.65 * land);
        return base;
      }
    `,r=new dt({toneMapped:!1,uniforms:this.uniforms,vertexShader:`
        precision highp float;
        ${s}
        varying vec3 vWorldPos;
        varying vec3 vNormal;
        void main(){
          vec3 wp = (modelMatrix * vec4(position, 1.0)).xyz;
          float h = islandHeight(wp.xz);
          wp.y = h;
          // Normal via central differences of the height field.
          float e = 0.75;
          float hx = islandHeight(wp.xz + vec2(e, 0.0));
          float hz = islandHeight(wp.xz + vec2(0.0, e));
          vNormal = normalize(vec3(h - hx, e, h - hz));
          vWorldPos = wp;
          gl_Position = projectionMatrix * viewMatrix * vec4(wp, 1.0);
        }
      `,fragmentShader:`
        precision highp float;
        uniform float uTime;
        uniform vec3  uSunDir;
        uniform vec3  uSandDry;
        uniform vec3  uSandWet;
        uniform vec3  uCausticColor;
        uniform float uNightAmount;
        uniform vec3  uMoonDir;
        uniform vec3  uMoonColor;
        uniform float uMoonIntensity;
        ${wn}
        ${Yv}
        ${ql}
        varying vec3 vWorldPos;
        varying vec3 vNormal;

        void main(){
          vec3 sunDir = normalize(uSunDir);
          vec3 N = normalize(vNormal);
          vec2 xz = vWorldPos.xz;
          float y = vWorldPos.y;

          // Depth of water actually standing above this sand, from the real
          // (wavy) ocean surface — positive where submerged. Used ONLY for the
          // caustics (moving light), never for the sand colour.
          float submerged = oceanHeight(xz) - y;

          // Wet/dry sand is a STABLE band tied to the mean waterline — it marks
          // where the sea reaches over time, so it must not flicker wave-to-wave.
          float wetness = smoothstep(1.6, -0.2, y);
          vec3 sand = mix(uSandDry, uSandWet, wetness);
          float swash = smoothstep(1.1, 0.0, abs(y - 0.25));   // damp strip at waterline
          sand = mix(sand, uSandWet * 0.85, swash * 0.55);
          sand *= 0.82 + 0.32 * fbm(xz * 0.5, 3);   // grain

          float ndl = clamp(dot(N, sunDir), 0.0, 1.0);
          vec3 sky = vec3(0.35, 0.5, 0.7);
          vec3 color = sand * (0.35 * sky + 1.05 * ndl);

          // Night V1: replace the fixed daylight ambient + sun term with a
          // dim cool ambient plus a genuine moonlight contribution, so the
          // island darkens but stays barely readable rather than a flat cutout.
          float moonNdl = clamp(dot(N, uMoonDir), 0.0, 1.0);
          // A slightly stronger flat ambient than a real moonless night would
          // have — keeps shadow-side slopes barely readable instead of a
          // complete black cutout when the moon isn't behind the island.
          // Time-of-Day V1: the continuous moon sweeps through many more
          // geometries than Night V1's single static test angle did, and a
          // near-neutral uMoonColor times a warm sand albedo still reads as
          // a warm (not cool) island whenever moonNdl is high. Push the
          // ambient further toward blue and trim the moon term's weight so
          // the island stays cool-toned across the whole moon path, not
          // just the one angle Night V1 happened to be tuned against.
          vec3 nightColor = sand * (0.58 * vec3(0.07, 0.10, 0.21) + uMoonColor * moonNdl * uMoonIntensity * 0.28);
          color = mix(color, nightColor, uNightAmount);

          // Caustics ONLY where water actually stands above the sand — they
          // fade in just under the waterline and attenuate with water depth.
          if (submerged > 0.0){
            vec2 flow = sunDir.xz * uTime * 0.4;
            float c1 = caustics(xz * 0.05 + flow, uTime * 0.6);
            float c2 = caustics(xz * 0.085 - flow * 0.7 + 15.0, uTime * 0.8);
            float caus = min(c1, c2) + 0.35 * c1 * c2;
            float edge = smoothstep(0.0, 0.5, submerged);      // no caustics on the film's edge
            // Night: caustics need real (moon)light to reach the sand too.
            float causNight = mix(1.0, 0.2, uNightAmount);
            color += uCausticColor * caus * exp(-submerged * 0.06) * (0.4 + 0.8 * ndl) * edge * causNight;
          } else {
            // Slight wet sheen on the exposed sand just above the waterline.
            float sheen = smoothstep(1.4, 0.0, y) * (1.0 - wetness * 0.4);
            vec3 H = normalize(sunDir + normalize(cameraPosition - vWorldPos));
            color += vec3(0.9) * pow(max(dot(N, H), 0.0), 40.0) * sheen * 0.3;
          }

          gl_FragColor = vec4(color, 1.0);
        }
      `}),o=new en(520,520,320,320);o.rotateX(-Math.PI/2),this.mesh=new ei(o,r),this.mesh.position.set(0,0,-110),this.mesh.frustumCulled=!1}update(e){this.uniforms.uTime.value=e}setSun(e){this.uniforms.uSunDir.value.copy(e)}setMoon(e){this.uniforms.uMoonDir.value.copy(e)}heightAt(e,t){const i=this.uniforms,s=i.uCenter.value.x,r=i.uCenter.value.y,o=Math.hypot(e-s,t-r),a=tx(i.uRouter.value,i.uRinner.value,o);let l=i.uSeabedY.value+(i.uPeakY.value-i.uSeabedY.value)*a;const c=Ru(e*.02,t*.02,5)*4+Ru(e*.11,t*.11,4)*1.1;return l+=c*(.35+.65*a),l}}const Sa=n=>n-Math.floor(n);function qr(n,e){let t=Sa(n*123.34),i=Sa(e*456.21);const s=t*(t+45.32)+i*(i+45.32);return t+=s,i+=s,Sa(t*i)}function ex(n,e){const t=Math.floor(n),i=Math.floor(e),s=n-t,r=e-i,o=s*s*s*(s*(s*6-15)+10),a=r*r*r*(r*(r*6-15)+10),l=qr(t,i),c=qr(t+1,i),h=qr(t,i+1),d=qr(t+1,i+1),u=c-l,p=h-l,g=l-c-h+d;return l+u*o+p*a+g*o*a}function Ru(n,e,t){let i=.5,s=0;for(let r=0;r<t;r++){s+=i*ex(n,e);const o=1.6*n-1.2*e,a=1.2*n+1.6*e;n=o,e=a,i*=.5}return s}function tx(n,e,t){const i=Math.min(Math.max((t-n)/(e-n),0),1);return i*i*(3-2*i)}class ix{constructor(e=5e3,t=160){this.box=t;const i=new Float32Array(e*3),s=new Float32Array(e);for(let a=0;a<e;a++)i[a*3+0]=(Math.random()-.5)*t,i[a*3+1]=(Math.random()-.5)*t,i[a*3+2]=(Math.random()-.5)*t,s[a]=Math.random()*6.2831853;const r=new It;r.setAttribute("position",new je(i,3)),r.setAttribute("seed",new je(s,1)),this.uniforms={uTime:{value:0},uCam:{value:new C},uBox:{value:t},uSize:{value:26},uColor:{value:new de(.85,.94,.98)}};const o=new dt({transparent:!0,depthWrite:!1,toneMapped:!1,blending:Ji,uniforms:this.uniforms,vertexShader:`
        precision highp float;
        attribute float seed;
        uniform float uTime;
        uniform vec3  uCam;
        uniform float uBox;
        uniform float uSize;
        varying float vTwinkle;

        void main(){
          vec3 p = position;
          // Slow sink + lazy sway.
          p.y -= uTime * 1.4;
          p.x += sin(uTime * 0.3 + seed) * 1.5;
          p.z += cos(uTime * 0.24 + seed * 1.7) * 1.5;

          // Wrap into a box centred on the camera → endless field.
          vec3 rel = mod(p - uCam + 0.5 * uBox, uBox) - 0.5 * uBox;
          vec3 world = uCam + rel;

          vTwinkle = 0.6 + 0.4 * sin(uTime * 2.0 + seed * 3.1);

          vec4 mv = viewMatrix * vec4(world, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = uSize / max(-mv.z, 1.0);
        }
      `,fragmentShader:`
        precision highp float;
        uniform vec3 uColor;
        varying float vTwinkle;
        void main(){
          vec2 d = gl_PointCoord - 0.5;
          float r = dot(d, d);
          if (r > 0.25) discard;
          float a = smoothstep(0.25, 0.0, r) * 0.5 * vTwinkle;
          gl_FragColor = vec4(uColor, a);
        }
      `});this.points=new lr(r,o),this.points.frustumCulled=!1}update(e,t){this.uniforms.uTime.value=e,this.uniforms.uCam.value.copy(t.position)}}class nx{constructor(e,t={}){const{count:i=1200,boxWidth:s=70,boxDepth:r=70,boxHeight:o=50,fallSpeed:a=18,windX:l=2.4,windZ:c=.9,streakLength:h=1.3}=t;this.enabled=!1;const d=new Float32Array(i*2*3),u=new Float32Array(i*2);for(let x=0;x<i;x++){const m=(Math.random()-.5)*s,f=(Math.random()-.5)*o,M=(Math.random()-.5)*r;for(let E=0;E<2;E++){const y=(x*2+E)*3;d[y+0]=m,d[y+1]=f,d[y+2]=M,u[x*2+E]=E}}const p=new It;p.setAttribute("position",new je(d,3)),p.setAttribute("aEnd",new je(u,1)),this.uniforms={uTime:{value:0},uCam:{value:new C},uBox:{value:new C(s,o,r)},uFallSpeed:{value:a},uWind:{value:new Ce(l,c)},uStreakLength:{value:h},uColor:{value:new de(.52,.58,.66)},uAlpha:{value:.24}};const g=new dt({transparent:!0,depthWrite:!1,depthTest:!0,toneMapped:!1,blending:Ji,uniforms:this.uniforms,vertexShader:`
        precision highp float;
        attribute float aEnd;
        uniform float uTime;
        uniform vec3 uCam;
        uniform vec3 uBox;
        uniform float uFallSpeed;
        uniform vec2 uWind;
        uniform float uStreakLength;

        void main(){
          vec3 p = position;
          p.y -= uTime * uFallSpeed;
          p.x += uTime * uWind.x;
          p.z += uTime * uWind.y;

          // Wrap into a box centred on the camera (identical technique to
          // Particles.js) — recycles drops that fall below the volume back
          // in above it, and endlessly follows the camera horizontally.
          vec3 rel = mod(p - uCam + 0.5 * uBox, uBox) - 0.5 * uBox;
          vec3 base = uCam + rel;

          // Extend only the top vertex along the true fall direction
          // (gravity + wind) so each streak reads as a diagonal line rigidly
          // falling with its drop, not two independently wrapped points.
          vec3 dir = normalize(vec3(uWind.x, -uFallSpeed, uWind.y));
          vec3 world = base + dir * uStreakLength * aEnd;

          vec4 mv = viewMatrix * vec4(world, 1.0);
          gl_Position = projectionMatrix * mv;
        }
      `,fragmentShader:`
        precision highp float;
        uniform vec3 uColor;
        uniform float uAlpha;
        void main(){
          gl_FragColor = vec4(uColor, uAlpha);
        }
      `});this.mesh=new rp(p,g),this.mesh.frustumCulled=!1,this.mesh.visible=!1,e.add(this.mesh)}setEnabled(e){this.enabled=!!e}toggle(){this.enabled=!this.enabled}update(e,t){this.uniforms.uTime.value=e,this.uniforms.uCam.value.copy(t.position)}}const sx=new bo(-1,1,1,-1,0,1);class rx extends It{constructor(){super(),this.setAttribute("position",new Yt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Yt([0,2,0,0,2,0],2))}}const ox=new rx;class bl{constructor(e){this._mesh=new ei(ox,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,sx)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}const Vs=(n,e,t=!1)=>{const i={type:xi,minFilter:Mt,magFilter:Mt,depthBuffer:t},s=new ui(n,e,i);return t&&(s.depthTexture=new En(n,e),s.depthTexture.type=vi),s};class ax{constructor(e,t,i,s,r){this.renderer=e,this.quad=new bl,this.bloomStreak=.3,this.sceneRT=Vs(t,i);const o=Math.max(1,t>>1),a=Math.max(1,i>>1);this.brightRT=Vs(o,a),this.blurA=Vs(o,a),this.blurB=Vs(o,a),this.underwaterMat=new dt({uniforms:{tDiffuse:{value:null},tDepth:{value:null},uInvProjView:{value:new qe},uCameraPos:{value:new C},uSunDir:{value:s.clone()},uTime:{value:0},uUnderwater:{value:0},uSurfaceY:{value:0},uDeepColor:{value:r.clone()},uShaftColor:{value:new de(1,.98,.9)},uExtinction:{value:new C(.05,.031,.022)},uFogStrength:{value:1},uShaftDensity:{value:.05},uMaxDist:{value:140},uRainbowStrength:{value:0}},vertexShader:`
        varying vec2 vUv;
        void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
      `,fragmentShader:`
        precision highp float;
        ${wn}
        ${ql}
        varying vec2 vUv;
        uniform sampler2D tDiffuse;
        uniform sampler2D tDepth;
        uniform mat4 uInvProjView;
        uniform vec3 uCameraPos;
        uniform vec3 uSunDir;
        uniform float uTime;
        uniform float uUnderwater;
        uniform float uSurfaceY;
        uniform vec3 uDeepColor;
        uniform vec3 uShaftColor;
        uniform vec3 uExtinction;
        uniform float uFogStrength;
        uniform float uShaftDensity;
        uniform float uMaxDist;
        uniform float uRainbowStrength;

        float hg(float c, float g){
          float g2 = g * g;
          return (1.0 - g2) / (12.5663706 * pow(1.0 + g2 - 2.0 * g * c, 1.5));
        }

        // Rainbow V1 — hue sweeps violet (t=0, inner edge) through red (t=1,
        // outer edge), matching the real primary bow's colour order.
        vec3 hsv2rgb(vec3 c){
          vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
          vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
          return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
        }

        void main(){
          vec3 col = texture2D(tDiffuse, vUv).rgb;
          if (uUnderwater < 0.5){
            // Rainbow V1 — a real primary bow always sits at ~40.5-42.5
            // degrees from the ANTI-solar point (i.e. looking away from the
            // sun) — but ONLY where nothing solid is actually in the way.
            // Without a distance check this painted straight through the
            // ocean surface and the island (anything at that angle, at any
            // distance, got the colour): a rainbow is formed by distant rain
            // in the air, so it must be occluded by nearer scene geometry
            // exactly like anything else would be, not just angle-tested.
            // uRainbowStrength (see Post.render()'s own doc) is already 0
            // whenever the geometry couldn't put the arc above the horizon
            // (sun too high) or rain isn't actually falling.
            if (uRainbowStrength > 0.0) {
              float d = texture2D(tDepth, vUv).x;
              vec4 clip = vec4(vUv * 2.0 - 1.0, d * 2.0 - 1.0, 1.0);
              vec4 wp = uInvProjView * clip;
              wp /= wp.w;
              vec3 toFrag = wp.xyz - uCameraPos;
              float viewDist = length(toFrag);
              vec3 rd = toFrag / max(viewDist, 1e-3);
              // Distance gate: the ocean plane is 6000 units across, so a
              // near-horizontal ray can travel far before hitting it — but
              // anything within a few hundred units is definitely real
              // nearby geometry (the island, close waves), never the sky.
              // Fades in from 400 to 2000 units so there is no hard edge.
              float distGate = smoothstep(400.0, 2000.0, viewDist);
              if (distGate > 0.0) {
                float ang = acos(clamp(dot(rd, -uSunDir), -1.0, 1.0)) * 57.29578; // degrees
                float t = (ang - 40.5) / (42.5 - 40.5); // 0 = inner (violet) edge, 1 = outer (red) edge
                float band = smoothstep(0.0, 0.12, t) * (1.0 - smoothstep(0.88, 1.0, t));
                if (band > 0.0) {
                  vec3 bowColor = hsv2rgb(vec3(mix(0.78, 0.0, clamp(t, 0.0, 1.0)), 1.0, 1.0));
                  col += bowColor * band * uRainbowStrength * distGate;
                }
              }
            }
            gl_FragColor = vec4(col, 1.0);
            return;
          }

          // Reconstruct world position from depth.
          float d = texture2D(tDepth, vUv).x;
          vec4 clip = vec4(vUv * 2.0 - 1.0, d * 2.0 - 1.0, 1.0);
          vec4 wp = uInvProjView * clip;
          wp /= wp.w;
          vec3 worldPos = wp.xyz;

          vec3 toFrag = worldPos - uCameraPos;
          float viewDist = length(toFrag);
          vec3 rd = toFrag / max(viewDist, 1e-3);

          // Beer-Lambert absorption toward the deep-water colour.
          float dist = min(viewDist, uMaxDist * 3.0);
          vec3 trans = exp(-uExtinction * dist);
          vec3 col2 = col * trans + uDeepColor * (1.0 - trans) * uFogStrength;

          // Volumetric shafts: march the view ray, sampling a caustic pattern
          // projected up the sun direction to the surface.
          float dither = fract(sin(dot(vUv, vec2(12.9898, 78.233)) + uTime) * 43758.5453);
          float marchLen = min(viewDist, uMaxDist);
          const int STEPS = 28;
          float dt = marchLen / float(STEPS);
          float acc = 0.0;
          for (int i = 0; i < STEPS; i++){
            float s = (float(i) + dither) * dt;
            vec3 p = uCameraPos + rd * s;
            float below = uSurfaceY - p.y;
            if (below <= 0.0) continue;
            float proj = below / max(uSunDir.y, 0.15);
            vec2 sxz = (p + uSunDir * proj).xz;
            float shaft = caustics(sxz * 0.03 + uSunDir.xz * uTime * 0.25, uTime * 0.5);
            acc += shaft * exp(-below * 0.03);
          }
          acc *= dt;
          float phase = hg(clamp(dot(rd, uSunDir), -1.0, 1.0), 0.72);
          vec3 rays = uShaftColor * acc * uShaftDensity * phase;

          gl_FragColor = vec4(col2 + rays, 1.0);
        }
      `}),this.brightMat=new dt({uniforms:{tDiffuse:{value:null},uThreshold:{value:1.15},uKnee:{value:.9}},vertexShader:`
        varying vec2 vUv;
        void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
      `,fragmentShader:`
        precision highp float;
        varying vec2 vUv;
        uniform sampler2D tDiffuse;
        uniform float uThreshold;
        uniform float uKnee;
        void main(){
          vec3 c = texture2D(tDiffuse, vUv).rgb;
          float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
          float k = smoothstep(uThreshold, uThreshold + uKnee, l);
          gl_FragColor = vec4(c * k, 1.0);
        }
      `}),this.blurMat=new dt({uniforms:{tDiffuse:{value:null},uDir:{value:new Ce(1,0)},uTexel:{value:new Ce(1/o,1/a)}},vertexShader:`
        varying vec2 vUv;
        void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
      `,fragmentShader:`
        precision highp float;
        varying vec2 vUv;
        uniform sampler2D tDiffuse;
        uniform vec2 uDir;
        uniform vec2 uTexel;
        void main(){
          vec2 o = uDir * uTexel;
          vec3 sum = texture2D(tDiffuse, vUv).rgb * 0.227027;
          sum += texture2D(tDiffuse, vUv + o * 1.3846).rgb * 0.316216;
          sum += texture2D(tDiffuse, vUv - o * 1.3846).rgb * 0.316216;
          sum += texture2D(tDiffuse, vUv + o * 3.2308).rgb * 0.070270;
          sum += texture2D(tDiffuse, vUv - o * 3.2308).rgb * 0.070270;
          gl_FragColor = vec4(sum, 1.0);
        }
      `}),this.compositeMat=new dt({uniforms:{tScene:{value:null},tBloom:{value:null},uBloom:{value:.65},uExposure:{value:1.05},uUnderwater:{value:0},uVignette:{value:.35},uVignetteAir:{value:.16},uSaturation:{value:1.06},uContrast:{value:1.02},uGrain:{value:.05},uCA:{value:.5},uTime:{value:0}},vertexShader:`
        varying vec2 vUv;
        void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
      `,fragmentShader:`
        precision highp float;
        varying vec2 vUv;
        uniform sampler2D tScene;
        uniform sampler2D tBloom;
        uniform float uBloom;
        uniform float uExposure;
        uniform float uUnderwater;
        uniform float uVignette;
        uniform float uVignetteAir;
        uniform float uSaturation;
        uniform float uContrast;
        uniform float uGrain;
        uniform float uCA;
        uniform float uTime;

        vec3 aces(vec3 x){
          const float a = 2.51, b = 0.03, c = 2.43, d = 0.59, e = 0.14;
          return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
        }
        vec3 toSRGB(vec3 c){
          return mix(c * 12.92,
                     1.055 * pow(max(c, 0.0), vec3(1.0 / 2.4)) - 0.055,
                     step(0.0031308, c));
        }
        float grainHash(vec2 p){
          return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
        }

        void main(){
          vec2 q = vUv - 0.5;
          float r2 = dot(q, q);

          // Chromatic aberration: radial R/B fringe that grows toward the
          // frame edges — reads as a real anamorphic lens, not a filter.
          vec2 caOff = q * r2 * uCA * 0.012;
          vec3 c;
          c.r = texture2D(tScene, vUv + caOff).r;
          c.g = texture2D(tScene, vUv).g;
          c.b = texture2D(tScene, vUv - caOff).b;

          c += texture2D(tBloom, vUv).rgb * uBloom;
          c *= uExposure;
          c = aces(c);

          // Grade: saturation then a gentle S-curve contrast around mid-grey.
          float luma = dot(c, vec3(0.2126, 0.7152, 0.0722));
          c = mix(vec3(luma), c, uSaturation);
          c = clamp((c - 0.5) * uContrast + 0.5, 0.0, 1.0);

          // Film grain — animated, weighted toward the mid/shadow tones like
          // real stock but gated out of near-black so it never reads as noise.
          float gn = grainHash(vUv * vec2(1920.0, 1080.0) + fract(uTime * 13.7) * 91.0);
          float grainAmt = uGrain * (0.35 + 0.65 * (1.0 - luma)) * smoothstep(0.0, 0.14, luma);
          c += (gn - 0.5) * grainAmt;

          // Vignette: subtle above water, heavier when submerged.
          float vigAmt = mix(uVignetteAir, uVignette * 2.0, uUnderwater);
          c *= clamp(1.0 - r2 * vigAmt * 2.0, 0.0, 1.0);

          gl_FragColor = vec4(toSRGB(clamp(c, 0.0, 1.0)), 1.0);
        }
      `}),this.sceneRT2=Vs(t,i),this.cloudCompositeMat=new dt({uniforms:{tScene:{value:null},tClouds:{value:null}},vertexShader:`
        varying vec2 vUv;
        void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
      `,fragmentShader:`
        precision highp float;
        varying vec2 vUv;
        uniform sampler2D tScene;
        uniform sampler2D tClouds;   // rgb = scatter (HDR), a = transmittance
        void main(){
          vec3 s = texture2D(tScene, vUv).rgb;
          vec4 f = texture2D(tClouds, vUv);
          gl_FragColor = vec4(s * f.a + f.rgb, 1.0);
        }
      `})}setSize(e,t){const i=Math.max(1,e>>1),s=Math.max(1,t>>1);this.sceneRT.setSize(e,t),this.sceneRT2.setSize(e,t),this.brightRT.setSize(i,s),this.blurA.setSize(i,s),this.blurB.setSize(i,s),this.blurMat.uniforms.uTexel.value.set(1/i,1/s)}_draw(e,t){this.quad.material=e,this.renderer.setRenderTarget(t),this.quad.render(this.renderer)}render(e,t){const i=this.underwaterMat.uniforms;i.tDiffuse.value=e.texture,i.tDepth.value=e.depthTexture,i.uInvProjView.value.copy(t.invProjView),i.uCameraPos.value.copy(t.cameraPos),i.uSunDir.value.copy(t.sunDir),i.uTime.value=t.time,i.uUnderwater.value=t.underwater?1:0,i.uSurfaceY.value=t.surfaceY,i.uRainbowStrength.value=t.rainbowStrength||0,this._draw(this.underwaterMat,this.sceneRT);let s=this.sceneRT;t.cloudTexture&&(this.cloudCompositeMat.uniforms.tScene.value=this.sceneRT.texture,this.cloudCompositeMat.uniforms.tClouds.value=t.cloudTexture,this._draw(this.cloudCompositeMat,this.sceneRT2),s=this.sceneRT2),this.brightMat.uniforms.tDiffuse.value=s.texture,this._draw(this.brightMat,this.brightRT);let r=this.brightRT;for(let o=0;o<2;o++)this.blurMat.uniforms.tDiffuse.value=r.texture,this.blurMat.uniforms.uDir.value.set(o===1?1+this.bloomStreak*3:1,0),this._draw(this.blurMat,this.blurA),this.blurMat.uniforms.tDiffuse.value=this.blurA.texture,this.blurMat.uniforms.uDir.value.set(0,1),this._draw(this.blurMat,this.blurB),r=this.blurB;this.compositeMat.uniforms.tScene.value=s.texture,this.compositeMat.uniforms.tBloom.value=this.blurB.texture,this.compositeMat.uniforms.uUnderwater.value=t.underwater?1:0,this.compositeMat.uniforms.uTime.value=t.time,this._draw(this.compositeMat,null)}}class lx{constructor(e,t,i,{scale:s=.5}={}){this.renderer=e,this.scale=s,this.enabled=!1,this._w=t,this._h=i,this._frame=0,this._histValid=!1,this._prevViewProj=new qe;const r=()=>new ui(this._rw(),this._rh(),{type:xi,minFilter:Mt,magFilter:Mt,depthBuffer:!1});this.rtCur=r(),this.rtHistA=r(),this.rtHistB=r(),this._out=this.rtHistA,this.material=new dt({uniforms:{tDepth:{value:null},uInvProj:{value:new qe},uInvView:{value:new qe},uCameraPos:{value:new C},uTime:{value:0},uFrame:{value:0},uHalfXZ:{value:5e3},uBase:{value:380},uHeight:{value:150},uHeightFalloff:{value:.38},uDensity:{value:.8},uCoverage:{value:.42},uCoverageEdge:{value:.16},uNoiseScale:{value:.002},uDetail:{value:.3},uDetailScale:{value:4},uEdgeFade:{value:1600},uWindDir:{value:new Ce(1,.35).normalize()},uWindSpeed:{value:.03},uDrift:{value:new C},uSteps:{value:44},uMaxSpan:{value:4200},uLightStepSize:{value:30},uAniso:{value:.55},uAmbient:{value:.85},uSunStrength:{value:3},uFogColor:{value:new de(.42,.5,.62)},uSunColor:{value:new de(1,.95,.86)},uHazeColor:{value:new de(.6,.74,.9)},uSunDir:{value:new C(0,1,0)},uMoonDir:{value:new C(0,1,0)},uMoonColor:{value:new de(14673648)},uMoonWeight:{value:0}},vertexShader:`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        precision highp float;
        #include <packing>
        uniform sampler2D tDepth;
        uniform mat4 uInvProj, uInvView;
        uniform vec3 uCameraPos, uFogColor, uSunColor, uHazeColor, uSunDir, uDrift;
        uniform vec3 uMoonDir, uMoonColor;
        uniform float uMoonWeight;
        uniform vec2 uWindDir;
        uniform float uTime, uFrame, uHalfXZ, uBase, uHeight, uHeightFalloff,
                      uDensity, uCoverage, uCoverageEdge, uNoiseScale, uDetail,
                      uDetailScale, uEdgeFade, uWindSpeed, uSteps, uMaxSpan,
                      uLightStepSize, uAniso, uAmbient, uSunStrength;
        varying vec2 vUv;

        float hash13(vec3 p) {
          p = fract(p * 0.3183099 + 0.1);
          p *= 17.0;
          return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
        }
        float vnoise3(vec3 x) {
          vec3 i = floor(x), f = fract(x);
          f = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(mix(hash13(i + vec3(0,0,0)), hash13(i + vec3(1,0,0)), f.x),
                mix(hash13(i + vec3(0,1,0)), hash13(i + vec3(1,1,0)), f.x), f.y),
            mix(mix(hash13(i + vec3(0,0,1)), hash13(i + vec3(1,0,1)), f.x),
                mix(hash13(i + vec3(0,1,1)), hash13(i + vec3(1,1,1)), f.x), f.y), f.z);
        }
        float fbm3(vec3 p, int oct) {
          float v = 0.0, a = 0.5;
          mat3 m = mat3(0.0, 0.8, 0.6, -0.8, 0.36, -0.48, -0.6, -0.48, 0.64);
          for (int i = 0; i < 5; i++) {
            if (i >= oct) break;
            v += a * vnoise3(p); p = m * p * 2.02; a *= 0.5;
          }
          return v;
        }

        // Vertical / slab-wall envelope. Returns 0 outside the layer.
        float profileAt(vec3 p, out float yl) {
          yl = (p.y - uBase) / max(uHeight, 1e-3);
          vec2 rel = abs(p.xz - uCameraPos.xz);
          vec2 e = uHalfXZ - rel;
          float edge = smoothstep(0.0, uEdgeFade, min(e.x, e.y));
          if (yl <= 0.0 || yl >= 1.0 || edge <= 0.001) return 0.0;
          return edge * smoothstep(0.0, 0.10, yl) * smoothstep(1.0, 0.80, yl);
        }

        // Cheap density for the light march: fewer octaves, no detail erosion.
        float densityLight(vec3 p) {
          float yl;
          float prof = profileAt(p, yl);
          if (prof <= 0.0) return 0.0;
          float n = fbm3(p * uNoiseScale + uDrift, 3) * 1.07;
          float cov = uCoverage * (1.0 - uHeightFalloff * yl);
          float th = 1.0 - cov;
          float d = smoothstep(th - uCoverageEdge, th + uCoverageEdge, n);
          return d * prof * uDensity;
        }

        // Full density for the view march: detail octave frays the edges.
        float densityFull(vec3 p, out float yl) {
          float prof = profileAt(p, yl);
          if (prof <= 0.0) return 0.0;
          vec3 q = p * uNoiseScale + uDrift;
          float n = fbm3(q, 4);
          float cov = uCoverage * (1.0 - uHeightFalloff * yl);
          float th = 1.0 - cov;
          float d = smoothstep(th - uCoverageEdge, th + uCoverageEdge, n);
          if (d > 0.001 && uDetail > 0.0) {
            float hi = fbm3(q * uDetailScale + uDrift * 2.0 + 19.0, 3);
            d = clamp(d - (1.0 - d) * hi * uDetail, 0.0, 1.0);
          }
          return d * prof * uDensity;
        }

        // Sun-ward optical depth: 5 exponentially spaced cheap samples reach
        // ~12× the base step for the price of a short march.
        float lightOpticalDepth(vec3 p, vec3 L) {
          float d0 = uLightStepSize;
          float tau = 0.0;
          tau += densityLight(p + L * (0.5  * d0)) * (1.0 * d0);
          tau += densityLight(p + L * (1.5  * d0)) * (1.4 * d0);
          tau += densityLight(p + L * (3.2  * d0)) * (2.4 * d0);
          tau += densityLight(p + L * (6.0  * d0)) * (3.6 * d0);
          tau += densityLight(p + L * (10.5 * d0)) * (5.0 * d0);
          return tau;
        }

        float hg(float cosT, float g) {
          float g2 = g * g;
          return (1.0 - g2) / (12.5663706 * pow(1.0 + g2 - 2.0 * g * cosT, 1.5));
        }
        vec2 intersectBox(vec3 ro, vec3 rd, vec3 bmin, vec3 bmax) {
          vec3 inv = 1.0 / rd;
          vec3 t0 = (bmin - ro) * inv;
          vec3 t1 = (bmax - ro) * inv;
          vec3 tmin = min(t0, t1), tmax = max(t0, t1);
          return vec2(max(max(tmin.x, tmin.y), tmin.z),
                      min(min(tmax.x, tmax.y), tmax.z));
        }
        vec3 worldFromDepth(vec2 uv, float d) {
          vec4 clip = vec4(uv * 2.0 - 1.0, d * 2.0 - 1.0, 1.0);
          vec4 view = uInvProj * clip; view /= view.w;
          return (uInvView * view).xyz;
        }

        void main() {
          float depth = texture2D(tDepth, vUv).x;
          // Sky (no geometry) writes the far plane → clouds fill the sky.
          float sceneDist = depth >= 0.9999 ? 1e9 : length(worldFromDepth(vUv, depth) - uCameraPos);

          vec3 ro = uCameraPos;
          vec3 far = worldFromDepth(vUv, 1.0);
          vec3 rd = normalize(far - ro);

          vec3 c = vec3(uCameraPos.x, 0.0, uCameraPos.z);
          vec3 bmin = c + vec3(-uHalfXZ, uBase, -uHalfXZ);
          vec3 bmax = c + vec3(uHalfXZ, uBase + uHeight, uHalfXZ);
          vec2 hit = intersectBox(ro, rd, bmin, bmax);
          float tN = max(hit.x, 0.0);
          float tF = min(min(hit.y, sceneDist), tN + uMaxSpan);
          if (tF <= tN) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); return; }

          float span = tF - tN;
          float stepLen = span / uSteps;
          vec3 L = normalize(uSunDir);
          float cosT = dot(rd, L);

          // Phase per multi-scatter octave (precomputed per ray): a sharp
          // forward lobe + a small back lobe, flattening toward isotropic.
          float ph0 = mix(hg(cosT, uAniso), hg(cosT, -0.22), 0.22);
          float ph1 = mix(hg(cosT, uAniso * 0.55), 0.0796, 0.35);
          // Night V1: a cheap, unshadowed moon phase term (no extra optical-
          // depth march) — a directional moonlit tint on top of the existing
          // sun lighting, not a full second light integration.
          float cosTMoon = dot(rd, normalize(uMoonDir));
          float phMoon = hg(cosTMoon, uAniso * 0.6);
          const float ph2 = 0.0796;

          // Per-frame jitter — the temporal resolve averages it to smoothness.
          float dither = hash13(vec3(gl_FragCoord.xy, mod(uFrame, 64.0)));
          float t = tN + stepLen * dither;
          float transmittance = 1.0;
          vec3 scatter = vec3(0.0);

          for (int i = 0; i < 128; i++) {
            if (float(i) >= uSteps || t > tF) break;
            vec3 p = ro + rd * t;
            float yl;
            float dens = densityFull(p, yl);
            if (dens > 0.001) {
              float tau = lightOpticalDepth(p, L);
              // Multi-scattering octaves: thick clouds stay luminous.
              float sunE = ph0 * exp(-tau)
                         + ph1 * 0.55 * exp(-tau * 0.40)
                         + ph2 * 0.25 * exp(-tau * 0.15);
              // Beer–Powder: thin edges darken (in-scattering deficit).
              float pw = 1.0 - 0.6 * exp(-dens * 10.0);
              // Ambient graded by height: sky-lit tops, occluded bases.
              vec3 amb = uFogColor * uAmbient * (0.35 + 0.65 * yl);
              vec3 lum = uSunColor * (uSunStrength * sunE * pw) + amb;
              lum += uMoonColor * (phMoon * pw) * uMoonWeight;
              float ai = 1.0 - exp(-dens * stepLen);
              scatter += transmittance * ai * lum;
              transmittance *= 1.0 - ai;
              if (transmittance < 0.03) break;
            }
            t += stepLen;
          }

          // Aerial perspective: distant clouds melt into the horizon haze.
          float hazeAmt = 1.0 - exp(-tN * 0.00016);
          scatter = mix(scatter, uHazeColor * (1.0 - transmittance), hazeAmt);

          gl_FragColor = vec4(scatter, transmittance);
        }
      `}),this.quad=new bl(this.material),this.resolveMat=new dt({uniforms:{tCurrent:{value:null},tHistory:{value:null},uInvProj:{value:new qe},uInvView:{value:new qe},uPrevViewProj:{value:new qe},uCameraPos:{value:new C},uTexel:{value:new Ce},uMidY:{value:455},uBlend:{value:.88}},vertexShader:`
        varying vec2 vUv;
        void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
      `,fragmentShader:`
        precision highp float;
        varying vec2 vUv;
        uniform sampler2D tCurrent, tHistory;
        uniform mat4 uInvProj, uInvView, uPrevViewProj;
        uniform vec3 uCameraPos;
        uniform vec2 uTexel;
        uniform float uMidY, uBlend;

        void main(){
          vec4 cur = texture2D(tCurrent, vUv);

          // Neighbourhood bounds — clamping history to them kills ghosting.
          vec4 c1 = texture2D(tCurrent, vUv + vec2(uTexel.x, 0.0));
          vec4 c2 = texture2D(tCurrent, vUv - vec2(uTexel.x, 0.0));
          vec4 c3 = texture2D(tCurrent, vUv + vec2(0.0, uTexel.y));
          vec4 c4 = texture2D(tCurrent, vUv - vec2(0.0, uTexel.y));
          vec4 mn = min(cur, min(min(c1, c2), min(c3, c4)));
          vec4 mx = max(cur, max(max(c1, c2), max(c3, c4)));
          vec4 ex = (mx - mn) * 0.25 + 0.002;   // slight relaxation keeps more history

          // Reproject via a representative point on the cloud layer midplane.
          vec4 clip = vec4(vUv * 2.0 - 1.0, 1.0, 1.0);
          vec4 view = uInvProj * clip; view /= view.w;
          vec3 rd = normalize((uInvView * view).xyz - uCameraPos);
          float denom = abs(rd.y) < 0.02 ? sign(rd.y + 1e-5) * 0.02 : rd.y;
          float tMid = (uMidY - uCameraPos.y) / denom;
          tMid = tMid <= 0.0 ? 3000.0 : clamp(tMid, 250.0, 7000.0);
          vec3 wp = uCameraPos + rd * tMid;

          vec4 pc = uPrevViewProj * vec4(wp, 1.0);
          vec2 puv = pc.xy / max(pc.w, 1e-4) * 0.5 + 0.5;
          float blend = uBlend;
          if (pc.w <= 0.0 || puv.x < 0.0 || puv.x > 1.0 || puv.y < 0.0 || puv.y > 1.0) blend = 0.0;

          vec4 hist = clamp(texture2D(tHistory, puv), mn - ex, mx + ex);
          gl_FragColor = mix(cur, hist, blend);
        }
      `}),this.resolveQuad=new bl(this.resolveMat)}_rw(){return Math.max(1,Math.floor(this._w*this.scale))}_rh(){return Math.max(1,Math.floor(this._h*this.scale))}get texture(){return this._out.texture}get uniforms(){return this.material.uniforms}setSize(e,t){this._w=e,this._h=t,this.rtCur.setSize(this._rw(),this._rh()),this.rtHistA.setSize(this._rw(),this._rh()),this.rtHistB.setSize(this._rw(),this._rh()),this._histValid=!1}setSun(e){const t=Math.max(e.y,0),i=this.material.uniforms;i.uSunDir.value.copy(e),i.uSunColor.value.setRGB(1,.55+.4*t,.32+.6*t),i.uFogColor.value.setRGB(.3+.18*t,.4+.16*t,.55+.12*t);const s=Math.min(t*2.2,1);i.uHazeColor.value.setRGB(1+(.6-1)*s,.62+(.74-.62)*s,.42+(.9-.42)*s);const r=this._nightAmount||0;r>1e-4&&(i.uSunColor.value.lerp(new de(.05,.06,.1),r),i.uFogColor.value.lerp(new de(.03,.035,.06),r),i.uHazeColor.value.lerp(new de(.02,.025,.045),r))}setNightAmount(e){this._nightAmount=e}setMoon(e){this.material.uniforms.uMoonDir.value.copy(e)}render(e,t,i){const s=this.material.uniforms;s.uTime.value+=e,s.uFrame.value=this._frame,s.tDepth.value=i,s.uInvProj.value.copy(t.projectionMatrixInverse),s.uInvView.value.copy(t.matrixWorld),s.uCameraPos.value.copy(t.position);const r=s.uTime.value*s.uWindSpeed.value;s.uDrift.value.set(s.uWindDir.value.x*r,.06*r,s.uWindDir.value.y*r);const o=this.renderer.getRenderTarget();this.renderer.setRenderTarget(this.rtCur),this.quad.render(this.renderer);const a=this.resolveMat.uniforms;a.tCurrent.value=this.rtCur.texture,a.tHistory.value=this.rtHistA.texture,a.uInvProj.value.copy(t.projectionMatrixInverse),a.uInvView.value.copy(t.matrixWorld),a.uPrevViewProj.value.copy(this._prevViewProj),a.uCameraPos.value.copy(t.position),a.uTexel.value.set(1/this._rw(),1/this._rh()),a.uMidY.value=s.uBase.value+s.uHeight.value*.5,a.uBlend.value=this._histValid?.88:0,this.renderer.setRenderTarget(this.rtHistB),this.resolveQuad.render(this.renderer);const l=this.rtHistA;this.rtHistA=this.rtHistB,this.rtHistB=l,this._out=this.rtHistA,this._histValid=!0,this._prevViewProj.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frame++,this.renderer.setRenderTarget(o)}}function cx(n){let e=n>>>0;return function(){e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function Pu(n,e){return cx((n^Math.imul(e+1,2654435769))>>>0)}const zn=19,ux=.05,$r=1,hx=.55,dx=.08,fx=.2,px=.8,mx=.03,gx=.07,_x=2.1;function ed(n,e){const t=Math.sin(n*fx+px)*dx,i=Math.sin(n*gx+_x)*mx;return(t+i)*e}class vx{constructor(e,t){this.curve=new cp(e,!1,"catmullrom",.4),this.times=t,this.total=t[t.length-1],this._n=e.length,this.meanderStrength=0;const i=this.curve.getPoint(0),s=this.curve.getTangent(0);this._startX=i.x,this._startZ=i.z,this._startHeading=Math.atan2(s.z,s.x),this._checkpoints=[{t:0,x:this._startX,z:this._startZ,heading:this._startHeading,turnRate:0}],this._lastSimT=null,this._lastSimResult=null}setMeanderStrength(e){this.meanderStrength=e,this._invalidateCheckpoints()}_invalidateCheckpoints(){this._checkpoints.length=1,this._lastSimT=null}_simulate(e){if(e===this._lastSimT)return this._lastSimResult;const t=Math.max(0,e),i=this.meanderStrength,s=this._checkpoints,r=Math.min(Math.floor(t/$r),s.length-1),o=s[r];let a=o.t,l=o.heading,c=o.turnRate,h=o.x,d=o.z;for(;a<t;){const u=(Math.floor(a/$r)+1)*$r,p=Math.min(t,u);for(;a<p;){const g=Math.min(ux,p-a),x=ed(a,i),m=1-Math.exp(-.35*g);c+=(x-c)*m,l+=c*g,h+=Math.cos(l)*zn*g,d+=Math.sin(l)*zn*g,a+=g}a=p,a===u&&Math.round(a/$r)===s.length&&s.push({t:a,x:h,z:d,heading:l,turnRate:c})}return this._lastSimT=e,this._lastSimResult={x:h,z:d,heading:l,turnRate:c},this._lastSimResult}positionAt(e,t=new C){const i=this._simulate(e);return t.set(i.x,0,i.z),t}tangentAt(e,t=new C){const i=this._simulate(e);return t.set(Math.cos(i.heading),0,Math.sin(i.heading)),t}}const Gs=600,xx=4,Sx=.22,Du=new de(16775925),Lu=new de(16769187),Iu=new de(16764805),Nu=new de(15321482);class yx{constructor(e,t={}){const{seed:i=4242}=t;this._seedBase=i>>>0,this.speed=.3,this.paused=!1,this.localTime=0,this.distanceTraveled=0,this.emissionRate=150,this.phase="flight",this.path=new vx([new C(-70,18,420),new C(-25,15,320),new C(20,14,230),new C(60,16,170),new C(100,18,120),new C(140,20,90)],[0,5,9,13,17,21]),this.manualTurnInput=0;const s=this.path._simulate(0);this._liveX=s.x,this._liveZ=s.z,this._liveHeading=s.heading,this._liveTurnRate=s.turnRate,this.headUniforms={uColorCore:{value:Du.clone()},uColorInner:{value:Lu.clone()},uColorOuter:{value:Iu.clone()},uHeadColor:{value:new de(6742271)},uColorMode:{value:0},uRainbowSpeed:{value:.15},uRainbowSaturation:{value:.8},uHeadBloom:{value:1},uTime:{value:0},uPixelSize:{value:900}};const r=new It;r.setAttribute("position",new je(new Float32Array(3),3).setUsage(ni));const o=new dt({transparent:!0,depthWrite:!1,depthTest:!0,toneMapped:!1,blending:bs,uniforms:this.headUniforms,vertexShader:`
        precision highp float;
        uniform float uPixelSize;
        void main(){
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = uPixelSize / max(-mv.z, 1.0);
        }
      `,fragmentShader:`
        precision highp float;
        uniform vec3 uColorCore, uColorInner, uColorOuter, uHeadColor;
        uniform float uHeadBloom, uTime;
        uniform float uColorMode, uRainbowSpeed, uRainbowSaturation;
        vec3 hsv2rgb(vec3 c){
          vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
          vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
          return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
        }
        void main(){
          vec2 d = gl_PointCoord - 0.5;
          float r = length(d) * 2.0;
          float coreRaw  = smoothstep(0.15, 0.0, r);
          float innerRaw = smoothstep(0.46, 0.05, r);
          float outerRaw = smoothstep(1.0, 0.22, r);
          float twinkle = 0.94 + 0.06 * sin(uTime * 4.0);
          float shapeAlpha = clamp(coreRaw * 1.0 + innerRaw * 0.6 + outerRaw * 0.24, 0.0, 1.0) * twinkle;
          // Exclusive bands: a ring never also carries the core's
          // contribution, so the halo survives ACES tonemapping instead of
          // being summed into near-white.
          float core = coreRaw;
          float inner = clamp(innerRaw - coreRaw, 0.0, 1.0);
          float outer = clamp(outerRaw - innerRaw, 0.0, 1.0);
          // V1.1 (spec 7): the halo colour follows the selected Head Color
          // in Custom/Rainbow modes — only the innermost core is ever
          // allowed to run near-white, so e.g. a cyan Head Color reads as
          // "small white-hot centre + cyan luminous halo", not just white.
          vec3 haloInner, haloOuter;
          if (uColorMode < 0.5) {
            haloInner = uColorInner; haloOuter = uColorOuter;
          } else if (uColorMode < 1.5) {
            haloInner = uHeadColor; haloOuter = uHeadColor;
          } else {
            vec3 rc = hsv2rgb(vec3(fract(uTime * uRainbowSpeed), uRainbowSaturation, 1.0));
            haloInner = rc; haloOuter = rc;
          }
          vec3 emissive = (uColorCore * core * 2.1 + haloInner * inner * 1.1 + haloOuter * outer * 0.65) * uHeadBloom * twinkle;
          gl_FragColor = vec4(emissive, shapeAlpha);
        }
      `});this.headMesh=new lr(r,o),this.headMesh.frustumCulled=!1,e.add(this.headMesh);const a=Gs,l=new Float32Array(a*3),c=new Float32Array(a*3),h=new Float32Array(a).fill(-1e3),d=new Float32Array(a).fill(1),u=new Float32Array(a),p=new Float32Array(a),g=new Float32Array(a),x=new It;x.setAttribute("position",new je(l,3).setUsage(ni)),x.setAttribute("aVelocity",new je(c,3).setUsage(ni)),x.setAttribute("aBirthTime",new je(h,1).setUsage(ni)),x.setAttribute("aLifetime",new je(d,1).setUsage(ni)),x.setAttribute("aSeed",new je(u,1).setUsage(ni)),x.setAttribute("aSize",new je(p,1).setUsage(ni)),x.setAttribute("aToneBias",new je(g,1).setUsage(ni)),this.trailUniforms={uTime:{value:0},uPixelSize:{value:130},uColorTint:{value:new de(1,1,1)},uColorMode:{value:0},uYoungColor:{value:new de(6742271)},uMidColor:{value:new de(3368703)},uOldColor:{value:new de(9133302)},uRainbowSpeed:{value:.15},uRainbowSaturation:{value:.8},uBrightness:{value:1},uParticleBloom:{value:1}};const m=new dt({transparent:!0,depthWrite:!1,depthTest:!0,toneMapped:!1,blending:bs,uniforms:this.trailUniforms,vertexShader:`
        precision highp float;
        attribute vec3 aVelocity;
        attribute float aBirthTime, aLifetime, aSeed, aSize, aToneBias;
        uniform float uTime, uPixelSize;
        varying float vAlpha, vAge, vSeed, vToneBias, vBirthTime;
        void main(){
          float age = uTime - aBirthTime;
          float na = clamp(age / aLifetime, 0.0, 1.0);
          // Slow deterministic drift (spec 13): "luminous dust suspended in
          // air" — sideways/vertical spread that grows with age, built from
          // per-particle seed + two gentle frequencies, never violent.
          float phase = aSeed * 6.2831853;
          float sway = sin(uTime * 0.6 + phase) * (0.10 + na * 0.55);
          float bob  = cos(uTime * 0.5 + phase * 1.3) * (0.08 + na * 0.35);
          vec3 pos = position + aVelocity * age;
          pos.x += sway;
          pos.z += sway * 0.4;
          pos.y += bob + na * 0.22;
          vec4 mv = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mv;
          // Age/size profile (spec 10): small&dense near birth -> a touch
          // larger/softer mid-life -> shrinking again as it fades.
          float sizeCurve = mix(0.75, 1.15, smoothstep(0.0, 0.5, na)) * mix(1.15, 0.5, smoothstep(0.5, 1.0, na));
          gl_PointSize = uPixelSize * aSize * sizeCurve / max(-mv.z, 1.0);
          float fadeIn = smoothstep(0.0, 0.05, na);
          float fadeOut = 1.0 - smoothstep(0.55, 1.0, na);
          vAlpha = fadeIn * fadeOut * step(age, aLifetime) * step(0.0, age);
          vAge = na;
          vSeed = aSeed;
          vToneBias = aToneBias;
          vBirthTime = aBirthTime;
        }
      `,fragmentShader:`
        precision highp float;
        uniform vec3 uColorTint;
        uniform vec3 uYoungColor, uMidColor, uOldColor;
        uniform float uColorMode, uRainbowSpeed, uRainbowSaturation;
        uniform float uBrightness, uParticleBloom;
        varying float vAlpha, vAge, vSeed, vToneBias, vBirthTime;
        vec3 hsv2rgb(vec3 c){
          vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
          vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
          return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
        }
        void main(){
          vec2 d = gl_PointCoord - 0.5;
          float r = length(d) * 2.0;
          if (r > 1.0) discard;
          float core = smoothstep(0.35, 0.0, r);
          float halo = smoothstep(1.0, 0.25, r);
          float twinkle = 0.85 + 0.15 * sin(vSeed * 37.0 + vAge * 8.0);
          float shapeAlpha = clamp(core * 1.0 + halo * 0.5, 0.0, 1.0) * vAlpha * twinkle;

          vec3 tone;
          if (uColorMode < 0.5) {
            // Gold (spec 4): colour ages with the particle — white-gold
            // when new, pale gold young, warm ivory/amber mid-life, faint
            // warm-white old — with a rare cool-white minority (aToneBias)
            // only showing once a particle is old.
            vec3 cNew   = vec3(1.0, 0.90, 0.68);
            vec3 cYoung = vec3(1.0, 0.85, 0.55);
            vec3 cMid   = vec3(1.0, 0.88, 0.72);
            vec3 cOldWarm = vec3(1.0, 0.93, 0.85);
            vec3 cOldCool = vec3(0.85, 0.90, 1.0);
            vec3 cOld = mix(cOldWarm, cOldCool, vToneBias);
            vec3 baseTone = mix(mix(mix(cNew, cYoung, smoothstep(0.0, 0.25, vAge)), cMid, smoothstep(0.25, 0.6, vAge)), cOld, smoothstep(0.6, 1.0, vAge));
            tone = mix(baseTone, uColorTint, 0.10);
          } else if (uColorMode < 1.5) {
            // Custom (spec 5/6): smooth Young -> Mid -> Old interpolation
            // by normalized age, breakpoints at 0.00/0.45/1.00.
            tone = mix(mix(uYoungColor, uMidColor, smoothstep(0.0, 0.45, vAge)), uOldColor, smoothstep(0.45, 1.0, vAge));
          } else {
            // Rainbow (spec 8/9): hue is a deterministic function of the
            // particle's own EMISSION TIME (vBirthTime) plus a small
            // per-particle seed variation — particles born around the same
            // moment share a hue, and as the head moves forward new hues
            // continuously enter the wake while old ones remain behind
            // until they die. Never a function of vAge/screen position, so
            // it reads as a flowing spectral wake, not static rainbow
            // stripes or per-particle confetti.
            float hue = fract(vBirthTime * uRainbowSpeed + vSeed * 0.05);
            tone = hsv2rgb(vec3(hue, uRainbowSaturation, 1.0));
          }

          // V1.1 (spec 13-16): visible body colour and HDR highlight energy
          // are now separate additive terms instead of one multiplicative
          // "hdrBoost" scaling the WHOLE colour — this is what previously
          // let ACES crush hue into white even at moderate settings. The
          // body term stays at a moderate, hue-preserving magnitude
          // (uBrightness); only a young-particle-gated highlight term
          // (uParticleBloom), itself pulled slightly toward white rather
          // than the full saturated hue, contributes extra HDR energy —
          // so only a MINORITY of the newest particles ever bloom hard,
          // and the visible body keeps its colour even when Bloom is high.
          vec3 visibleColor = tone * (0.25 + core * 0.9) * uBrightness;
          float youngMask = smoothstep(0.5, 0.0, vAge);
          vec3 highlightColor = mix(tone, vec3(1.0), 0.3);
          vec3 highlightEnergy = highlightColor * core * youngMask * uParticleBloom;
          vec3 emissive = visibleColor + highlightEnergy;
          gl_FragColor = vec4(emissive, shapeAlpha);
        }
      `});this.trailPoints=new lr(x,m),this.trailPoints.frustumCulled=!1,e.add(this.trailPoints),this._birthPos=l,this._velocity=c,this._birthTime=h,this._lifetime=d,this._seedAttr=u,this._sizeAttr=p,this._toneBias=g,this._emitCount=0,this._writeCursor=0,this.altitudeOffset=0,this._headPos=new C,this._tangent=new C,this._worldUp=new C(0,1,0),this._side=new C,this._up=new C,this._reconHead=new C,this._reconTan=new C,this.travelDir=new C(0,0,-1),this._prevHeadPos=new C,this._prevTangent=new C(0,0,-1),this._emitInterpPos=new C,this._emitInterpTan=new C,this.waterGlintColor=Nu.clone()}setTint(e){this.headUniforms.uColorCore.value.copy(Du).lerp(e,.1),this.headUniforms.uColorInner.value.copy(Lu).lerp(e,.1),this.headUniforms.uColorOuter.value.copy(Iu).lerp(e,.12),this.trailUniforms.uColorTint.value.copy(e),this.waterGlintColor.copy(Nu).lerp(e,.3)}setColorMode(e){const t=e==="custom"?1:e==="rainbow"?2:0;this.headUniforms.uColorMode.value=t,this.trailUniforms.uColorMode.value=t}setHeadColor(e){this.headUniforms.uHeadColor.value.set(e)}setYoungColor(e){this.trailUniforms.uYoungColor.value.set(e)}setMidColor(e){this.trailUniforms.uMidColor.value.set(e)}setOldColor(e){this.trailUniforms.uOldColor.value.set(e)}setColors(e={}){e.head!=null&&this.setHeadColor(e.head),e.young!=null&&this.setYoungColor(e.young),e.mid!=null&&this.setMidColor(e.mid),e.old!=null&&this.setOldColor(e.old)}setRainbowSpeed(e){this.headUniforms.uRainbowSpeed.value=e,this.trailUniforms.uRainbowSpeed.value=e}setRainbowSaturation(e){this.headUniforms.uRainbowSaturation.value=e,this.trailUniforms.uRainbowSaturation.value=e}setBrightness(e){this.trailUniforms.uBrightness.value=e}setParticleBloom(e){this.trailUniforms.uParticleBloom.value=e}setHeadBloom(e){this.headUniforms.uHeadBloom.value=e}setEmissionRate(e){this.emissionRate=Math.max(1,e)}setAltitudeOffset(e){this.altitudeOffset=e}setMeanderStrength(e){this.path.setMeanderStrength(e)}setManualTurnInput(e){this.manualTurnInput=e}setPaused(e){this.paused=!!e}restart(){this.localTime=0,this._reconstructAt(0,this._ocean)}getHeadPosition(e=new C){return e.copy(this._headPos)}getHeadPositionAtTime(e,t=new C){let i=-1,s=1/0;for(let o=0;o<Gs;o++){const a=this._birthTime[o];if(a<0)continue;const l=Math.abs(a-e);l<s&&(s=l,i=o)}if(i>=0&&s<1)return t.set(this._birthPos[i*3],this._birthPos[i*3+1],this._birthPos[i*3+2]),t;this.path.positionAt(e,t);const r=this._ocean?this._ocean.heightAt(t.x,t.z,e):0;return t.y=r+3+Math.sin(e*.35)*1.5+this.altitudeOffset,t}setTime(e){this.localTime=Math.max(0,e),this._reconstructAt(this.localTime,this._ocean)}_emitOneInto(e,t,i,s,r){const o=r()*Sx,a=r()*Math.PI*2,l=(r()-.5)*Math.PI,c=Math.cos(a)*Math.cos(l)*o,h=Math.sin(l)*o,d=Math.sin(a)*Math.cos(l)*o;this._birthPos[e*3+0]=i.x+c,this._birthPos[e*3+1]=i.y+h,this._birthPos[e*3+2]=i.z+d;const u=.12+r()*.22,p=(r()-.5)*.5,g=(r()-.5)*.35,x=this._side.crossVectors(s,this._worldUp);x.lengthSq()<1e-6?x.set(1,0,0):x.normalize();const m=this._up.crossVectors(x,s).normalize();this._velocity[e*3+0]=-s.x*u+x.x*p+m.x*g,this._velocity[e*3+1]=-s.y*u+x.y*p+m.y*g+.05,this._velocity[e*3+2]=-s.z*u+x.z*p+m.z*g,this._birthTime[e]=t,this._lifetime[e]=r()<.8?2.3+r()*1.1:3.5+r()*.5,this._seedAttr[e]=r()*Math.PI*2;const f=r();this._sizeAttr[e]=f<.7?.35+r()*.22:f<.95?.62+r()*.32:1.05+r()*.45,this._toneBias[e]=r()<.15?1:0}update(e,t,i,s){this._ocean=i,this._prevHeadPos.copy(this._headPos),this._prevTangent.copy(this._tangent);const r=this.localTime,o=this.distanceTraveled;this.paused||(this.localTime+=e*this.speed);const a=this.localTime;if(this.phase=a<2?"approach":"flight",!this.paused){const c=e*this.speed;this.distanceTraveled+=zn*c;const h=ed(a,this.path.meanderStrength),d=1-Math.exp(-.35*c);this._liveTurnRate+=(h-this._liveTurnRate)*d;const u=this.manualTurnInput*hx;this._liveHeading+=(this._liveTurnRate+u)*c,this._liveX+=Math.cos(this._liveHeading)*zn*c,this._liveZ+=Math.sin(this._liveHeading)*zn*c}this._headPos.set(this._liveX,0,this._liveZ),this._tangent.set(Math.cos(this._liveHeading),0,Math.sin(this._liveHeading)),this.travelDir.copy(this._tangent);const l=i?i.heightAt(this._headPos.x,this._headPos.z,a):0;if(this._headPos.y=l+3+Math.sin(a*.35)*1.5+this.altitudeOffset,this.headMesh.geometry.attributes.position.array[0]=this._headPos.x,this.headMesh.geometry.attributes.position.array[1]=this._headPos.y,this.headMesh.geometry.attributes.position.array[2]=this._headPos.z,this.headMesh.geometry.attributes.position.needsUpdate=!0,this.headUniforms.uTime.value=a,!this.paused){const c=this.emissionRate/zn,h=Math.floor(this.distanceTraveled*c),d=this.distanceTraveled-o;let u=!1;for(;this._emitCount<h;){const p=this._emitCount,g=p/c,x=Pu(this._seedBase,p),m=this._writeCursor,f=d>1e-9?Math.min(1,Math.max(0,(g-o)/d)):1,M=r+f*(a-r);this._emitInterpPos.lerpVectors(this._prevHeadPos,this._headPos,f),this._emitInterpTan.lerpVectors(this._prevTangent,this._tangent,f),this._emitInterpTan.lengthSq()<1e-8?this._emitInterpTan.copy(this._tangent):this._emitInterpTan.normalize(),this._emitOneInto(m,M,this._emitInterpPos,this._emitInterpTan,x),this._writeCursor=(this._writeCursor+1)%Gs,this._emitCount++,u=!0}if(u){const p=this.trailPoints.geometry;p.attributes.position.needsUpdate=!0,p.attributes.aVelocity.needsUpdate=!0,p.attributes.aBirthTime.needsUpdate=!0,p.attributes.aLifetime.needsUpdate=!0,p.attributes.aSeed.needsUpdate=!0,p.attributes.aSize.needsUpdate=!0,p.attributes.aToneBias.needsUpdate=!0}}this.trailUniforms.uTime.value=a}_reconstructAt(e,t){const i=this.emissionRate,s=Math.max(0,e-xx),r=Math.ceil(s*i),o=Math.floor(e*i);this._birthTime.fill(-1e3),this._writeCursor=0;let a=0;for(let d=r;d<=o;d++){const u=d/i;if(u>e)break;const p=Pu(this._seedBase,d);this.path.positionAt(u,this._reconHead),this.path.tangentAt(u,this._reconTan);const g=t?t.heightAt(this._reconHead.x,this._reconHead.z,u):0;this._reconHead.y=g+3+Math.sin(u*.35)*1.5+this.altitudeOffset;const x=a%Gs;this._emitOneInto(x,u,this._reconHead,this._reconTan,p),a++}this._emitCount=o+1,this._writeCursor=a%Gs,this.distanceTraveled=e*zn,this.path.positionAt(e,this._headPos),this.path.tangentAt(e,this._tangent),this.travelDir.copy(this._tangent);const l=t?t.heightAt(this._headPos.x,this._headPos.z,e):0;this._headPos.y=l+3+Math.sin(e*.35)*1.5+this.altitudeOffset;const c=this.path._simulate(e);this._liveX=c.x,this._liveZ=c.z,this._liveHeading=c.heading,this._liveTurnRate=c.turnRate,this.headMesh.geometry.attributes.position.array[0]=this._headPos.x,this.headMesh.geometry.attributes.position.array[1]=this._headPos.y,this.headMesh.geometry.attributes.position.array[2]=this._headPos.z,this.headMesh.geometry.attributes.position.needsUpdate=!0,this.headUniforms.uTime.value=e,this.trailUniforms.uTime.value=e,this._prevHeadPos.copy(this._headPos),this._prevTangent.copy(this._tangent);const h=this.trailPoints.geometry;h.attributes.position.needsUpdate=!0,h.attributes.aVelocity.needsUpdate=!0,h.attributes.aBirthTime.needsUpdate=!0,h.attributes.aLifetime.needsUpdate=!0,h.attributes.aSeed.needsUpdate=!0,h.attributes.aSize.needsUpdate=!0,h.attributes.aToneBias.needsUpdate=!0}}function ro(n){let e=n>>>0;return function(){e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function fn(n,e,t){const i=Math.min(Math.max((t-n)/(e-n),0),1);return i*i*(3-2*i)}function ya(n){const e=n.replace("#",""),t=e.length===3?e.split("").map(s=>s+s).join(""):e,i=parseInt(t,16);return{r:i>>16&255,g:i>>8&255,b:i&255}}async function Mx(n,e,t=3e3){if(typeof document>"u"||!document.fonts)return;const i=new Promise(s=>setTimeout(s,t));try{await Promise.race([Promise.all([document.fonts.load(n,e||""),document.fonts.ready]),i])}catch(s){console.warn(`[TrailLyrics] font load failed for "${n}" — using fallback font stack instead:`,s)}}function Fu(n,{fontWeight:e=600,fontFamily:t='Georgia, "Times New Roman", serif',fontSizeScale:i=1,lineHeight:s=1.15,targetCount:r=650,worldWidth:o=26,fixedWorldScale:a=null,depthJitter:l=.4,seed:c=99,shadowStrength:h=1,textColor:d="#ffffff",shadowColor:u="#000000",outlineWidth:p=0,outlineColor:g="#000000"}={}){const x=120*i,m=n.split(`
`),f=document.createElement("canvas").getContext("2d");f.font=`${e} ${x}px ${t}`;const M=x*.18;let E,y,w;if(m.length===1){const Se=f.measureText(n);E=Math.ceil(Se.width+M*2),y=Math.ceil(x*1.3)}else{let Se=0;for(const Oe of m)Se=Math.max(Se,f.measureText(Oe).width);w=x*s,E=Math.ceil(Se+M*2),y=Math.ceil(w*m.length+M*1.2)}const A=document.createElement("canvas");A.width=E,A.height=y;const R=A.getContext("2d");R.font=`${e} ${x}px ${t}`,R.fillStyle="#ffffff",R.textAlign="center",R.textBaseline="middle";const v=Se=>{if(m.length===1)Se(n,E/2,y/2);else{const Oe=(y-w*m.length)/2;m.forEach((Fe,q)=>Se(Fe,E/2,Oe+w*(q+.5)))}};v((Se,Oe,Fe)=>R.fillText(Se,Oe,Fe));const T=R.getImageData(0,0,E,y).data,D=[];for(let Se=0;Se<y;Se++)for(let Oe=0;Oe<E;Oe++)T[(Se*E+Oe)*4+3]>80&&D.push(Oe,Se);const P=ya(u);if(R.clearRect(0,0,E,y),h>0){const Se=x/120;R.save(),R.fillStyle=u,R.shadowColor=`rgba(${P.r}, ${P.g}, ${P.b}, ${Math.min(1,.55*h).toFixed(3)})`,R.shadowBlur=20*Se,R.shadowOffsetX=0,R.shadowOffsetY=3*Se,v((Oe,Fe,q)=>R.fillText(Oe,Fe,q)),R.shadowColor=`rgba(${P.r}, ${P.g}, ${P.b}, ${Math.min(1,.6*h).toFixed(3)})`,R.shadowBlur=4*Se,R.shadowOffsetY=1.5*Se,v((Oe,Fe,q)=>R.fillText(Oe,Fe,q)),R.shadowColor="rgba(0, 0, 0, 0)",R.shadowBlur=0,R.shadowOffsetX=0,R.shadowOffsetY=0,R.restore()}if(p>0){const Se=ya(g);R.lineJoin="round",R.miterLimit=2,R.strokeStyle=`rgb(${Se.r}, ${Se.g}, ${Se.b})`,R.lineWidth=p*(x/120)*2,v((Oe,Fe,q)=>R.strokeText(Oe,Fe,q))}const{r:F,g:G,b:Z}=ya(d);R.fillStyle=`rgba(${F}, ${G}, ${Z}, 0.96)`,v((Se,Oe,Fe)=>R.fillText(Se,Oe,Fe));const O=D.length/2,Y=r/Math.max(O,1),z=ro(c),J=a??o/E,j=a!=null?E*J:o,ce=y*J,fe=[];let _e=0;for(let Se=0;Se<O;Se++){if(_e+=Y,_e<1)continue;_e-=1;const Oe=D[Se*2]+(z()-.5)*.7,Fe=D[Se*2+1]+(z()-.5)*.7;fe.push({x:(Oe-E/2)*J,y:(y/2-Fe)*J,z:(z()-.5)*l})}return{targets:fe,canvas:A,worldWidth:j,worldHeight:ce}}let Ma=null;function bx(){return!Ma&&typeof document<"u"&&(Ma=document.createElement("canvas").getContext("2d")),Ma}function Ex({fontWeight:n=600,fontFamily:e='Georgia, "Times New Roman", serif',fontSizeScale:t=1}={}){return`${n} ${120*t}px ${e}`}function wx(n,e){const t=bx();return t?(t.font=Ex(e),t.measureText(n).width):n.length*66}function Tx(n,e,t){const i=n.split(" ").filter(o=>o.length>0);if(i.length===0)return[n];const s=[];let r=i[0];for(let o=1;o<i.length;o++){const a=`${r} ${i[o]}`;wx(a,t)<=e?r=a:(s.push(r),r=i[o])}return s.push(r),s}function Ax(n,e,t){const i=[];for(const s of n)i.push(...Tx(s,e,t));return i}const Ws={travel:3,assemble:1.5,hold:2,leave:.2,dissolve:1.2},Uu=.35,Ou=5,Cx=650,$l=20,El=.007,Rx=1,Px=.8,Dx=.75,Bu=new de(16769187),Lx=new de(16777215);class Ix{constructor(e,t={}){const{text:i="Forever More",seed:s=777}=t;this._seed=s>>>0,this._scene=e,this.enabled=!0,this.paused=!1,this.localTime=0,this.phase="travel",this.fontFamily='Georgia, "Times New Roman", serif',this.fontWeight=600,this.fontSizeScale=1,this.lineHeight=1.15,this.textScale=1,this.formationDistance=.65,this.formationHeightOffset=2,this.travelDuration=Ws.travel,this.assembleDuration=Ws.assemble,this.holdDuration=Ws.hold,this.leaveDuration=Ws.leave,this.dissolveDuration=Ws.dissolve,this.particleCount=Cx,this.shadowStrength=1,this.textColor="#ffffff",this.shadowColor="#000000",this.outlineWidth=2,this.outlineColor="#000000",this.particleContribution=1,this.billboardRelease=.4,this.positionRelease=.4,this.followSmoothing=6,this.maxPositionChaseSeconds=2,this.screenLock=!1,this._slotOffset={right:0,up:0},this._slotTargetOffset={right:0,up:0},this.trailWindowMin=.3,this.trailWindowMax=.9,this.flowAmount=1.8,this._lastTravelStats={avgDistance:0,maxDistance:0,sourceWidth:0,textWidth:0},this.loop=!0,this.count=0;const r=new It;this._aScatterAttr=null,this.particleUniforms={uAssembleProgress:{value:0},uDissolveProgress:{value:0},uParticleContribution:{value:1},uColor:{value:Bu.clone()},uGlow:{value:1},uPixelSize:{value:120},uLocalFlowDir:{value:new C(0,0,1)},uFlowAmount:{value:this.flowAmount}};const o=new dt({transparent:!0,depthWrite:!1,depthTest:!0,toneMapped:!1,blending:bs,uniforms:this.particleUniforms,vertexShader:`
        precision highp float;
        attribute vec3 aScatter, aGlyphTarget;
        attribute float aStagger, aSeed, aSize;
        uniform float uAssembleProgress, uDissolveProgress, uPixelSize;
        uniform vec3 uLocalFlowDir;
        uniform float uFlowAmount;
        varying float vAlpha, vSeed;
        void main(){
          // Per-particle staggered assemble (spec 5B: gentle, organic, not
          // lockstep) — each particle starts converging once the shared
          // progress passes its own small stagger offset.
          float localT = clamp((uAssembleProgress - aStagger) / max(1.0 - aStagger, 0.0001), 0.0, 1.0);
          float s = smoothstep(0.0, 1.0, localT);
          // V1.2 (spec 7): a quadratic Bezier from the wake-sampled start
          // position to the glyph target, via a control point offset along
          // the wake's own flow direction — NOT a straight lerp. The
          // tangent at s=0 points toward the control point, so early
          // ASSEMBLE reads as "continuing along the wake" (spec 7's early
          // phase); lateral attraction toward the letter only dominates
          // once s is well underway (mid/late ASSEMBLE), avoiding the
          // straight point-cloud-to-text "drone show" convergence.
          vec3 control = aScatter + uLocalFlowDir * uFlowAmount;
          vec3 local = mix(mix(aScatter, control, s), mix(control, aGlyphTarget, s), s);
          // Dissolve (phase F): gentle upward drift + mild lateral
          // separation layered on top of the fully-formed glyph position —
          // never an explosion or burst.
          float dp = uDissolveProgress;
          vec3 driftDir = vec3(sin(aSeed * 6.2831853), 1.4, cos(aSeed * 6.2831853));
          local += driftDir * dp * dp * 2.2;
          // Local space only — modelViewMatrix already carries this
          // object's own position/quaternion (the shared plane frame, set
          // directly on the THREE.Points object each frame in JS), so no
          // manual right/up/forward transform is needed here.
          vec4 mv = modelViewMatrix * vec4(local, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = uPixelSize * aSize / max(-mv.z, 1.0);
          vAlpha = smoothstep(0.0, 0.15, localT) * (1.0 - dp);
          vSeed = aSeed;
        }
      `,fragmentShader:`
        precision highp float;
        uniform vec3 uColor;
        uniform float uGlow, uParticleContribution;
        varying float vAlpha, vSeed;
        void main(){
          vec2 d = gl_PointCoord - 0.5;
          float r = length(d) * 2.0;
          if (r > 1.0) discard;
          float core = smoothstep(0.35, 0.0, r);
          float halo = smoothstep(1.0, 0.25, r);
          float twinkle = 0.85 + 0.15 * sin(vSeed * 37.0);
          float shapeAlpha = clamp(core + halo * 0.5, 0.0, 1.0) * vAlpha * twinkle * uParticleContribution;
          vec3 emissive = uColor * (0.3 + core * 1.0) * uGlow;
          gl_FragColor = vec4(emissive, shapeAlpha);
        }
      `});this.points=new lr(r,o),this.points.frustumCulled=!1,this.points.visible=!1,e.add(this.points),this.glyphUniforms={uOpacity:{value:0}},this.glyphMaterial=new Hl({transparent:!0,depthWrite:!0,depthTest:!0,alphaTest:.02,toneMapped:!1,blending:Ji,side:Ti,color:Lx.clone(),opacity:0}),this.glyphMesh=new ei(new en(1,1),this.glyphMaterial),this.glyphMesh.frustumCulled=!1,this.glyphMesh.visible=!1,e.add(this.glyphMesh),this._glyphBaseWidth=1,this._glyphBaseHeight=1,this._planeCenter=new C,this._planeQuat=new ki,this._cyclePrepared=!1,this._holdScreenPos=null,this._pendingHoldScreenPos=null,this._domOverlayAlpha=0,this._tmpProjected=new C,this._tmpOffset=new C,this._tmpTangent=new C,this._tmpDesired=new C,this._tmpCamRight=new C,this._tmpCamUp=new C,this._tmpCamFwd=new C,this._tmpInvQuat=new ki,this._tmpWakePos=new C,this._wakeLocalX=new Float32Array(0),this._wakeLocalPos=new Float32Array(0),this._wakeSortIndices=new Int32Array(0),this._ocean=null,this._headParticleTrail=null,this._camera=null,this.currentText=null,this.setText(i)}setText(e,t={}){const i=t.seed!==void 0?t.seed>>>0:this._seed;this._seed=i,this.currentText=e;const s={targetCount:this.particleCount,seed:i,fontFamily:this.fontFamily,fontWeight:this.fontWeight,fontSizeScale:this.fontSizeScale,lineHeight:this.lineHeight,shadowStrength:this.shadowStrength,textColor:this.textColor,shadowColor:this.shadowColor,outlineWidth:this.outlineWidth,outlineColor:this.outlineColor};this.screenLock?s.fixedWorldScale=El:s.worldWidth=15;const{targets:r,canvas:o,worldWidth:a,worldHeight:l}=Fu(e,s);r.sort((f,M)=>f.x-M.x),this.count=r.length,this._textWorldWidth=a,this._textWorldHeight=l;const c=ro(i^2654435769),h=new Float32Array(this.count*3),d=new Float32Array(this.count*3),u=new Float32Array(this.count),p=new Float32Array(this.count),g=new Float32Array(this.count);for(let f=0;f<this.count;f++){const M=r[f];d[f*3+0]=M.x*this.textScale,d[f*3+1]=M.y*this.textScale,d[f*3+2]=M.z,u[f]=c()*.6,p[f]=c()*Math.PI*2;const E=c();g[f]=E<.7?.4+c()*.25:E<.95?.65+c()*.3:1+c()*.35}const x=this.points.geometry;x.setAttribute("position",new je(new Float32Array(this.count*3),3).setUsage(ni)),x.setAttribute("aScatter",new je(h,3).setUsage(ni)),x.setAttribute("aGlyphTarget",new je(d,3)),x.setAttribute("aStagger",new je(u,1)),x.setAttribute("aSeed",new je(p,1)),x.setAttribute("aSize",new je(g,1)),this._aScatterAttr=x.attributes.aScatter,this.glyphMaterial.map&&this.glyphMaterial.map.dispose();const m=new qc(o);m.colorSpace=si,this.glyphMaterial.map=m,this.glyphMaterial.needsUpdate=!0,this.glyphMesh.geometry.dispose(),this.glyphMesh.geometry=new en(a*this.textScale,l*this.textScale),this._glyphBaseWidth=a,this._glyphBaseHeight=l,this._wakeLocalX=new Float32Array(this.count),this._wakeLocalPos=new Float32Array(this.count*3),this._wakeSortIndices=new Int32Array(this.count)}configure(e={}){const t=["textScale","formationDistance","formationHeightOffset","travelDuration","assembleDuration","holdDuration","leaveDuration","dissolveDuration","particleCount","particleContribution","billboardRelease","positionRelease","followSmoothing","maxPositionChaseSeconds","screenLock","trailWindowMin","trailWindowMax","flowAmount","fontFamily","fontWeight","fontSizeScale","lineHeight","shadowStrength","textColor","shadowColor","outlineWidth","outlineColor"];for(const i of t)e[i]!==void 0&&(this[i]=e[i])}beginEvent(e,t={}){this.configure(t),this.setText(e),this.localTime=0,this._cyclePrepared=!1,this.phase="travel",this._slotOffset={right:0,up:0},this._slotTargetOffset={right:0,up:0}}async setFont(e={},t=3e3){e.fontFamily!==void 0&&(this.fontFamily=e.fontFamily),e.fontWeight!==void 0&&(this.fontWeight=e.fontWeight),e.fontSizeScale!==void 0&&(this.fontSizeScale=e.fontSizeScale),e.lineHeight!==void 0&&(this.lineHeight=e.lineHeight);const i=`${this.fontWeight} 32px ${this.fontFamily}`;await Mx(i,this.currentText,t),this.currentText!==null&&this.setText(this.currentText)}setGlyphStyle({shadowStrength:e,textColor:t,shadowColor:i,outlineWidth:s,outlineColor:r,fontFamily:o}={}){if(e!==void 0&&(this.shadowStrength=e),t!==void 0&&(this.textColor=t),i!==void 0&&(this.shadowColor=i),s!==void 0&&(this.outlineWidth=s),r!==void 0&&(this.outlineColor=r),this.currentText===null)return;if(o!==void 0&&o!==this.fontFamily){this.fontFamily=o,this.setText(this.currentText);return}const a={targetCount:this.particleCount,seed:this._seed,fontFamily:this.fontFamily,fontWeight:this.fontWeight,fontSizeScale:this.fontSizeScale,lineHeight:this.lineHeight,shadowStrength:this.shadowStrength,textColor:this.textColor,shadowColor:this.shadowColor,outlineWidth:this.outlineWidth,outlineColor:this.outlineColor};this.screenLock?a.fixedWorldScale=El:a.worldWidth=15;const{canvas:l}=Fu(this.currentText,a),c=this.glyphMaterial.map,h=new qc(l);h.colorSpace=si,h.needsUpdate=!0,this.glyphMaterial.map=h,this.glyphMaterial.needsUpdate=!0,c&&c.dispose()}setTint(e){this.particleUniforms.uColor.value.copy(Bu).lerp(e,.1)}setPaused(e){this.paused=!!e}restart(){this.localTime=0,this._cyclePrepared=!1}setTime(e){this.localTime=Math.max(0,e),this._headParticleTrail&&this._camera&&this._recompute(this._headParticleTrail,this._camera)}_bounds(){const e=this.travelDuration,t=e+this.assembleDuration,i=t+this.holdDuration,s=i+this.leaveDuration,r=s+this.dissolveDuration;return{t1:e,t2:t,t3:i,t4:s,cycle:r}}getCycleLength(){return this._bounds().cycle}getPhase(){return this.phase}_projectToScreen(e){const t=this._glyphBaseWidth*this.textScale/2,i=this._glyphBaseHeight*this.textScale/2,s=this._tmpOffset.set(0,1,0).applyQuaternion(this._planeQuat),r=this._tmpTangent.set(1,0,0).applyQuaternion(this._planeQuat),o=this._tmpProjected.copy(this._planeCenter).project(e),a=o.x,l=o.y,h=this._tmpProjected.copy(this._planeCenter).addScaledVector(s,i).project(e).y,u=this._tmpProjected.copy(this._planeCenter).addScaledVector(r,t).project(e).x;return{x:(a+1)*50,y:(1-l)*50,heightPercent:Math.abs(h-l)*100,widthPercent:Math.abs(u-a)*100}}getHoldOverlay(){if(!this._holdScreenPos||this._domOverlayAlpha<=0)return null;const{x:e,y:t,widthPercent:i,heightPercent:s}=this._holdScreenPos;return{x:e,y:t,widthPercent:i,heightPercent:s,alpha:this._domOverlayAlpha,text:this.currentText}}setLayoutTarget(e){this._slotTargetOffset.right=e.right,this._slotTargetOffset.up=e.up}getGlyphSize(){return{width:this._glyphBaseWidth*this.textScale,height:this._glyphBaseHeight*this.textScale}}sampleDissolveOrigins(e,t){const i=this.points.geometry.attributes.aGlyphTarget.array,s=this.count;if(s===0)return[];const r=ro(t>>>0),o=[];for(let a=0;a<e;a++){const l=Math.floor(r()*s)%s,c=new C(i[l*3+0],i[l*3+1],i[l*3+2]);c.applyQuaternion(this._planeQuat).add(this._planeCenter),o.push(c)}return o}_computeDesiredCenter(e,t,i){const s=e.getHeadPosition(this._tmpOffset),r=t.getWorldDirection(this._tmpTangent),o=t.position.distanceTo(s);return i.copy(t.position).addScaledVector(r,o*this.formationDistance),i.y-=this.formationHeightOffset,i}_computeLayoutCenter(e,t){return e.matrixWorld.extractBasis(this._tmpCamRight,this._tmpCamUp,this._tmpCamFwd),t.copy(e.position).addScaledVector(this._tmpCamFwd,-$l).addScaledVector(this._tmpCamRight,this._slotOffset.right).addScaledVector(this._tmpCamUp,this._slotOffset.up),t}_prepareFormation(e,t){this.screenLock?this._computeLayoutCenter(t,this._planeCenter):this._computeDesiredCenter(e,t,this._planeCenter),this._planeQuat.copy(t.quaternion),this._computeWakeScatter(e)}_computeWakeScatter(e){const t=this.count;this._tmpInvQuat.copy(this._planeQuat).invert();const i=e.localTime,s=ro((this._seed^1540483477)>>>0);let r=1/0,o=-1/0;for(let d=0;d<t;d++){const u=this.trailWindowMin+s()*(this.trailWindowMax-this.trailWindowMin),p=Math.max(0,i-u);e.getHeadPositionAtTime(p,this._tmpWakePos),this._tmpWakePos.x+=(s()-.5)*.6,this._tmpWakePos.y+=(s()-.5)*.5,this._tmpWakePos.z+=(s()-.5)*.6,this._tmpWakePos.sub(this._planeCenter).applyQuaternion(this._tmpInvQuat),this._wakeLocalPos[d*3+0]=this._tmpWakePos.x,this._wakeLocalPos[d*3+1]=this._tmpWakePos.y,this._wakeLocalPos[d*3+2]=this._tmpWakePos.z,this._wakeLocalX[d]=this._tmpWakePos.x,this._wakeSortIndices[d]=d,this._tmpWakePos.x<r&&(r=this._tmpWakePos.x),this._tmpWakePos.x>o&&(o=this._tmpWakePos.x)}this._wakeSortIndices.sort((d,u)=>this._wakeLocalX[d]-this._wakeLocalX[u]);const a=this._aScatterAttr.array,l=this.points.geometry.attributes.aGlyphTarget.array;let c=0,h=0;for(let d=0;d<t;d++){const u=this._wakeSortIndices[d],p=this._wakeLocalPos[u*3+0],g=this._wakeLocalPos[u*3+1],x=this._wakeLocalPos[u*3+2];a[d*3+0]=p,a[d*3+1]=g,a[d*3+2]=x;const m=l[d*3+0],f=l[d*3+1],M=l[d*3+2],E=Math.hypot(m-p,f-g,M-x);c+=E,E>h&&(h=E)}this._aScatterAttr.needsUpdate=!0,this._lastTravelStats={avgDistance:c/t,maxDistance:h,sourceWidth:o-r,textWidth:this._textWorldWidth},this.particleUniforms.uLocalFlowDir.value.copy(e.travelDir).applyQuaternion(this._tmpInvQuat).normalize(),this.particleUniforms.uFlowAmount.value=this.flowAmount}update(e,t,i,s){this._headParticleTrail=i,this._camera=s,!this.paused&&this.enabled&&(this.loop?this.localTime+=e:this.localTime=Math.min(this.localTime+e,this._bounds().cycle)),this._recompute(i,s,e)}_recompute(e,t,i=1/60){if(!this.enabled||!e||!t){this.points.visible=!1,this.glyphMesh.visible=!1;return}const{t1:s,t2:r,t3:o,t4:a,cycle:l}=this._bounds(),c=this.loop?this.localTime%l:this.localTime;if(c<s){this.phase="travel",this._cyclePrepared=!1,this.points.visible=!1,this.glyphMesh.visible=!1;return}this._cyclePrepared||(this._prepareFormation(e,t),this._cyclePrepared=!0),c<r?this.phase="assemble":c<o?this.phase="hold":c<a?this.phase="leave":this.phase="dissolve";const h=this.screenLock&&c>=r&&c<o;if(h){const D=c-r,P=o-c,F=fn(0,Uu,D),G=fn(0,Uu,P);this._domOverlayAlpha=Math.min(F,G)}else this._holdScreenPos=null,this._pendingHoldScreenPos=null,this._domOverlayAlpha=0;const d=r+(o-r)*_i.clamp(this.billboardRelease,0,1),u=this.screenLock&&c<o;let p;if(u||c<=d?p=1:c<=o?p=1-fn(d,o,c):p=0,u)this._planeQuat.copy(t.quaternion);else if(p>.001){const D=1-Math.pow(8e-4,i*Math.max(p,.05));this._planeQuat.slerp(t.quaternion,Math.min(1,D))}if(this.screenLock){const D=1-Math.pow(8e-4,i*Px),P=Math.min(1,D);this._slotOffset.right+=(this._slotTargetOffset.right-this._slotOffset.right)*P,this._slotOffset.up+=(this._slotTargetOffset.up-this._slotOffset.up)*P}const g=Math.min(this.holdDuration,this.maxPositionChaseSeconds),x=r+g*_i.clamp(this.positionRelease,0,1),m=r+g;let f;if(u||c<=x?f=1:c<=m?f=1-fn(x,m,c):f=0,u)this._computeLayoutCenter(t,this._planeCenter);else if(f>.001){this._computeDesiredCenter(e,t,this._tmpDesired);const D=this.followSmoothing*f,P=1-Math.pow(8e-4,i*Math.max(D,1e-4));this._planeCenter.lerp(this._tmpDesired,Math.min(1,P))}if(h){const D=this._projectToScreen(t);if(!this._holdScreenPos)this._holdScreenPos=D,this._pendingHoldScreenPos=null;else{const P=D.x-this._holdScreenPos.x,F=D.y-this._holdScreenPos.y;if(Math.hypot(P,F)<=Ou)this._holdScreenPos=D,this._pendingHoldScreenPos=null;else if(this._pendingHoldScreenPos){const G=D.x-this._pendingHoldScreenPos.x,Z=D.y-this._pendingHoldScreenPos.y;Math.hypot(G,Z)<=Ou?(this._holdScreenPos=D,this._pendingHoldScreenPos=null):this._pendingHoldScreenPos=D}else this._pendingHoldScreenPos=D}}this.points.position.copy(this._planeCenter),this.points.quaternion.copy(this._planeQuat),this.glyphMesh.position.copy(this._planeCenter),this.glyphMesh.quaternion.copy(this._planeQuat),this.points.visible=!0;const M=fn(s,r,c),E=fn(a,l,c);this.particleUniforms.uAssembleProgress.value=M,this.particleUniforms.uDissolveProgress.value=E;const y=fn(r-Math.min(.4,this.assembleDuration),r,c),w=o+Dx,R=1-fn(o,w,c),v=y*R;this.glyphMesh.visible=c<o,this.glyphMaterial.opacity=_i.clamp(y,0,1)*(1-this._domOverlayAlpha);const T=1-v*.5;this.particleUniforms.uParticleContribution.value=this.particleContribution*T}dispose(){this._disposed||(this._disposed=!0,this._scene&&(this._scene.remove(this.points),this._scene.remove(this.glyphMesh)),this.points.geometry.dispose(),this.points.material.dispose(),this.glyphMesh.geometry.dispose(),this.glyphMaterial.map&&this.glyphMaterial.map.dispose(),this.glyphMaterial.dispose(),this.enabled=!1)}}function Nx(n){let e=n>>>0;return function(){e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function Xs(n,e,t){const i=Math.min(Math.max((t-n)/(e-n),0),1);return i*i*(3-2*i)}const Fx=224,Ux=48,Ox=6,Bx=new de(16769187);class zx{constructor(e,t={}){this.scene=e,this.maxParticles=t.maxParticles||Fx,this.glintPerPhrase=t.glintPerPhrase||Ux,this.mistPerPhrase=t.mistPerPhrase||Ox;const i=new It,s=new Float32Array(this.maxParticles*3),r=new Float32Array(this.maxParticles),o=new Float32Array(this.maxParticles),a=new Float32Array(this.maxParticles);i.setAttribute("position",new je(s,3).setUsage(ni)),i.setAttribute("aAlpha",new je(r,1).setUsage(ni)),i.setAttribute("aSize",new je(o,1).setUsage(ni)),i.setAttribute("aSeed",new je(a,1).setUsage(ni)),this._geo=i,this._posAttr=i.attributes.position,this._alphaAttr=i.attributes.aAlpha,this._sizeAttr=i.attributes.aSize,this._seedAttr=i.attributes.aSeed,this._uniforms={uColor:{value:Bx.clone()},uPixelSize:{value:90}};const l=new dt({transparent:!0,depthWrite:!1,depthTest:!0,toneMapped:!1,blending:bs,uniforms:this._uniforms,vertexShader:`
        precision highp float;
        attribute float aAlpha, aSize, aSeed;
        uniform float uPixelSize;
        varying float vAlpha, vSeed;
        void main(){
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = uPixelSize * aSize / max(-mv.z, 1.0);
          vAlpha = aAlpha;
          vSeed = aSeed;
        }
      `,fragmentShader:`
        precision highp float;
        uniform vec3 uColor;
        varying float vAlpha, vSeed;
        void main(){
          if (vAlpha <= 0.001) discard;
          vec2 d = gl_PointCoord - 0.5;
          float r = length(d) * 2.0;
          if (r > 1.0) discard;
          float core = smoothstep(0.5, 0.0, r);
          float halo = smoothstep(1.0, 0.2, r);
          float twinkle = 0.85 + 0.15 * sin(vSeed * 41.0);
          float shapeAlpha = clamp(core * 0.8 + halo * 0.6, 0.0, 1.0) * vAlpha * twinkle;
          gl_FragColor = vec4(uColor * (0.4 + core), shapeAlpha);
        }
      `});this._points=new lr(i,l),this._points.frustumCulled=!1,e.add(this._points),this._slotOwner=new Array(this.maxParticles).fill(null),this._freeSlots=[];for(let c=this.maxParticles-1;c>=0;c--)this._freeSlots.push(c);this._phrases=new Map,this._tmp=new C}activeCount(){return this._phrases.size}particlesInUse(){return this.maxParticles-this._freeSlots.length}beginDissolve(e,{origins:t,dissolveStart:i,totalDuration:s,seed:r,backwardDir:o,upDir:a}){if(this._phrases.has(e))return;let l=this.glintPerPhrase,c=this.mistPerPhrase;const h=l+c;if(this._freeSlots.length<h){const w=this._freeSlots.length/h;l=Math.max(0,Math.floor(l*w)),c=Math.max(0,Math.floor(c*w))}const d=Math.min(l+c,this._freeSlots.length,t.length);if(d<=0)return;const u=Nx(r),p=Math.min(l,d),g=new Int32Array(d),x=new Uint8Array(d),m=new Float32Array(d*3),f=new Float32Array(d*3),M=new Float32Array(d*3),E=new Float32Array(d),y=new Float32Array(d);for(let w=0;w<d;w++){const A=this._freeSlots.pop();g[w]=A,this._slotOwner[A]=e;const R=w>=p;x[w]=R?1:0;const v=t[w];m[w*3+0]=v.x,m[w*3+1]=v.y,m[w*3+2]=v.z;const T=R?1.4:.6;f[w*3+0]=(u()-.5)*T,f[w*3+1]=(u()-.5)*T*.6,f[w*3+2]=(u()-.5)*T,E[w]=u()*.35*s;const D=u()*Math.PI*2,P=(R?.35:.7)+u()*.4,F=(R?.25:.55)+u()*.35,G=(R?.5:.3)+u()*.3;M[w*3+0]=a.x*P+o.x*F+Math.cos(D)*G,M[w*3+1]=a.y*P+o.y*F,M[w*3+2]=a.z*P+o.z*F+Math.sin(D)*G,y[w]=R?2.6+u()*1.2:.55+u()*.35,this._seedAttr.array[A]=u()}this._seedAttr.needsUpdate=!0,this._phrases.set(e,{slots:g,kind:x,origin:m,jitter:f,velocity:M,lifeOffset:E,sizeBase:y,dissolveStart:i,totalDuration:Math.max(.1,s)})}update(e){if(this._phrases.size===0)return;const t=this._posAttr.array,i=this._alphaAttr.array,s=this._sizeAttr.array;let r=!1;for(const[o,a]of this._phrases){const l=e-a.dissolveStart;if(l>=a.totalDuration){this._releaseEntry(o,a),r=!0;continue}r=!0;const c=a.slots.length;for(let h=0;h<c;h++){const d=a.slots[h],u=Math.max(0,l<0?0:l-a.lifeOffset[h]),p=Math.max(.05,a.totalDuration-a.lifeOffset[h]),g=Math.min(1,u/p),x=Xs(0,.3,g);if(t[d*3+0]=a.origin[h*3+0]+a.jitter[h*3+0]*x+a.velocity[h*3+0]*u,t[d*3+1]=a.origin[h*3+1]+a.jitter[h*3+1]*x+a.velocity[h*3+1]*u,t[d*3+2]=a.origin[h*3+2]+a.jitter[h*3+2]*x+a.velocity[h*3+2]*u,a.kind[h]===1){const m=Xs(0,.3,g),f=1-Xs(.45,1,g);i[d]=m*f*.32,s[d]=a.sizeBase[h]*(1+g*1.6)}else{const m=Xs(0,.12,g),f=1-Xs(.55,1,g);i[d]=m*f,s[d]=a.sizeBase[h]*(1+g*.5)}}}r&&(this._posAttr.needsUpdate=!0,this._alphaAttr.needsUpdate=!0,this._sizeAttr.needsUpdate=!0,this._geo.computeBoundingSphere())}_releaseEntry(e,t){for(let i=0;i<t.slots.length;i++){const s=t.slots[i];this._alphaAttr.array[s]=0,this._sizeAttr.array[s]=0,this._slotOwner[s]=null,this._freeSlots.push(s)}this._phrases.delete(e)}releasePhrase(e){const t=this._phrases.get(e);t&&(this._releaseEntry(e,t),this._alphaAttr.needsUpdate=!0,this._sizeAttr.needsUpdate=!0)}clear(){for(const e of[...this._phrases.keys()])this.releasePhrase(e)}dispose(){this._disposed||(this._disposed=!0,this.scene.remove(this._points),this._geo.dispose(),this._points.material.dispose(),this._phrases.clear())}}class kx{constructor(e,t={}){this.scene=e,this.maxActive=t.maxActive||8,this._active=[],this.dissolve=new zx(e,t.dissolve||{}),this._lastCamera=null,this._lastLayoutMode="SINGLE_COLUMN",this._tmpBackward=new C}has(e){return this._active.some(t=>t.id===e)}getActiveIds(){return this._active.map(e=>e.id)}getActiveEntries(){return this._active}getActivePhrases(){return this._active.map(e=>e.phrase)}getLayoutMode(){return this._lastLayoutMode}getNewestActivePhrase(){return this._active.length?this._active[this._active.length-1].instance:null}getHoldOverlays(){const e=[];for(const t of this._active){const i=t.instance.getHoldOverlay();i&&e.push({id:t.id,...i})}return e}spawn(e){if(this.has(e.id))return;if(this._active.length>=this.maxActive){const o=this._active.shift();console.warn(`[TrailLyricsManager] active phrase cap (${this.maxActive}) reached — evicting oldest "${o.id}" to spawn "${e.id}".`),o.instance.dispose(),this.dissolve.releasePhrase(o.id)}const t=Hu(e.id),i={...e.trailLyricsConfig};this._glyphShadowStrength!==void 0&&(i.shadowStrength=this._glyphShadowStrength),this._glyphTextColor!==void 0&&(i.textColor=this._glyphTextColor),this._glyphShadowColor!==void 0&&(i.shadowColor=this._glyphShadowColor),this._glyphOutlineWidth!==void 0&&(i.outlineWidth=this._glyphOutlineWidth),this._glyphOutlineColor!==void 0&&(i.outlineColor=this._glyphOutlineColor),this._glyphFontFamily!==void 0&&(i.fontFamily=this._glyphFontFamily),this._leaveDuration!==void 0&&(i.leaveDuration=this._leaveDuration),this._dissolveDuration!==void 0&&(i.dissolveDuration=this._dissolveDuration),this._particleCount!==void 0&&(i.particleCount=this._particleCount);let s=e.displayLines.join(`
`);if(i.screenLock){const o={fontWeight:i.fontWeight??600,fontFamily:i.fontFamily??Hx,fontSizeScale:i.fontSizeScale??1},l=this._halfColumnWorldWidthEstimate()/El;s=Ax(e.displayLines,l,o).join(`
`)}const r=new Ix(this.scene,{text:s,seed:t});r.loop=!1,r.beginEvent(s,i),this._active.push({id:e.id,phrase:e,instance:r,dissolveRegistered:!1}),r.screenLock&&this._recomputeLayout()}despawn(e){const t=this._active.findIndex(s=>s.id===e);if(t===-1)return;const[i]=this._active.splice(t,1);i.instance.dispose(),this.dissolve.releasePhrase(e),i.instance.screenLock&&this._recomputeLayout()}setGlyphStyle({textColor:e,shadowColor:t,shadowStrength:i,outlineWidth:s,outlineColor:r,fontFamily:o}={}){e!==void 0&&(this._glyphTextColor=e),t!==void 0&&(this._glyphShadowColor=t),i!==void 0&&(this._glyphShadowStrength=i),s!==void 0&&(this._glyphOutlineWidth=s),r!==void 0&&(this._glyphOutlineColor=r),o!==void 0&&(this._glyphFontFamily=o);for(const a of this._active)a.instance.setGlyphStyle({textColor:e,shadowColor:t,shadowStrength:i,outlineWidth:s,outlineColor:r,fontFamily:o})}setPhraseTiming({leaveDuration:e,dissolveDuration:t}={}){e!==void 0&&(this._leaveDuration=e),t!==void 0&&(this._dissolveDuration=t);for(const i of this._active)i.instance.configure({leaveDuration:e,dissolveDuration:t})}setParticleCount(e){this._particleCount=e}update(e,t,i,s){this._lastCamera=i;for(const r of this._active)r.instance.update(e,0,t,i),!r.dissolveRegistered&&r.instance.getPhase()==="leave"&&(r.dissolveRegistered=!0,this._registerDissolve(r,t),r.instance.screenLock&&this._recomputeLayout());s!=null&&this.dissolve.update(s)}_registerDissolve(e,t){const i=e.instance,s=this.dissolve.glintPerPhrase,r=this.dissolve.mistPerPhrase,o=Hu(`${e.id}:dissolve`),a=i.sampleDissolveOrigins(s+r,o);if(a.length===0)return;const l=this._tmpBackward.copy(t.travelDir).multiplyScalar(-1).normalize(),c=e.phrase.endTime,h=i.leaveDuration+i.dissolveDuration;this.dissolve.beginDissolve(e.id,{origins:a,dissolveStart:c,totalDuration:h,seed:o,backwardDir:l.clone(),upDir:Vx})}_recomputeLayout(){const e=this._lastCamera;if(!e)return;const t=this._active.filter(s=>s.instance.screenLock&&(s.instance.getPhase()==="travel"||s.instance.getPhase()==="assemble"||s.instance.getPhase()==="hold"));if(t.length===0)return;const i=Wx(t,e);this._lastLayoutMode=i.mode;for(const s of i.assignments){const r=t.find(o=>o.id===s.id);r&&r.instance.setLayoutTarget({right:s.right,up:s.up})}}_halfColumnWorldWidthEstimate(){const e=this._lastCamera;if(!e)return 10;const{halfW:t}=id(e,$l),i=(mo[1]-mo[0])*t*Tl,s=td*2*t;return(i-s)/2}clear(){for(const e of this._active)e.instance.dispose();this._active=[],this.dissolve.clear()}}const mo=[-.85,.85],zu=[-.78,.78],td=.08,wl=.15,Tl=.92,Hx='Georgia, "Times New Roman", serif',Vx=new C(0,1,0);function id(n,e){const t=_i.degToRad(n.fov),i=e*Math.tan(t/2);return{halfW:i*n.aspect,halfH:i}}function Gx(n){const e=n.instance,t=e.currentText?e.currentText.split(`
`):[""],i=e.getGlyphSize(),s=t.length>0?i.height/t.length:i.height;return{lineCount:t.length,blockHeightWorld:i.height,lineHeightWorld:s}}function ku(n){const e=n.reduce((t,i)=>t+i.lineHeightWorld,0)/Math.max(1,n.length);return Math.max(wl,e*.5)}function gs(n,e,t){const i=[];let s=t;for(const o of n)i.push(s-o.blockHeightWorld/2),s-=o.blockHeightWorld+e;return{bottomEdge:n.length?i[i.length-1]-n[n.length-1].blockHeightWorld/2:t,offsets:i}}function Wx(n,e){const{halfW:t,halfH:i}=id(e,$l),s=(mo[1]-mo[0])*t*Tl,r=(zu[1]-zu[0])*i*Tl,o=td*2*t,a=n.map(Gx),l=r/2,c=-r/2;let h=ku(a),d=gs(a,h,l);if(d.bottomEdge<c&&n.length>1){const D=a.reduce((F,G)=>F+G.blockHeightWorld,0),P=(r-D)/(n.length-1);P>=wl&&(h=P,d=gs(a,h,l))}if(d.bottomEdge>=c-1e-6)return{mode:"SINGLE_COLUMN",assignments:n.map((D,P)=>({id:D.id,right:0,up:d.offsets[P]}))};const u=Math.ceil(n.length/2),p=n.slice(0,u),g=n.slice(u),x=a.slice(0,u),m=a.slice(u);let f=ku(a),M=gs(x,f,l),E=gs(m,f,l);if(Math.min(M.bottomEdge,E.bottomEdge)<c){const D=M.bottomEdge<=E.bottomEdge?x:m;if(D.length>1){const P=D.reduce((G,Z)=>G+Z.blockHeightWorld,0),F=(r-P)/(D.length-1);f=Math.max(wl*.4,Math.min(f,F))}M=gs(x,f,l),E=gs(m,f,l)}const w=(s-o)/2,A=-(o/2+w/2),R=o/2+w/2,v=[];p.forEach((D,P)=>v.push({id:D.id,right:A,up:M.offsets[P]})),g.forEach((D,P)=>v.push({id:D.id,right:R,up:E.offsets[P]}));const T=r/2;for(const D of v)D.up=_i.clamp(D.up,-T,T);return{mode:"MULTI_COLUMN",assignments:v}}function Hu(n){let e=2166136261;for(let t=0;t<n.length;t++)e^=n.charCodeAt(t),e=Math.imul(e,16777619);return e>>>0}function Vu(n){let e=n>>>0;return function(){e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function Xx(n,e,t){const i=Math.min(Math.max((t-n)/(e-n),0),1);return i*i*(3-2*i)}const Gu=new C(0,1,0),Qs=[{key:"directRear",label:"Direct Rear",weight:1.4,lyricSafe:!0,compute(n,e){const{head:t,forward:i,up:s}=n;e.pos.copy(t).addScaledVector(i,-26).addScaledVector(s,7),e.look.copy(t).addScaledVector(i,6)}},{key:"rearThreeQuarter",label:"Rear Three-Quarter",weight:1.5,lyricSafe:!0,compute(n,e){const{head:t,forward:i,right:s,up:r}=n;e.pos.copy(t).addScaledVector(i,-24).addScaledVector(s,17).addScaledVector(r,9),e.look.copy(t).addScaledVector(i,8).addScaledVector(s,-4)}},{key:"sideFollow",label:"Side Follow",weight:1.2,lyricSafe:!1,compute(n,e){const{head:t,forward:i,right:s,up:r,director:o}=n,a=o._sideSign||1;e.pos.copy(t).addScaledVector(s,a*30).addScaledVector(i,-6).addScaledVector(r,8),e.look.copy(t).addScaledVector(i,5)}},{key:"wideChase",label:"Wide Chase",weight:1,lyricSafe:!0,compute(n,e){const{head:t,forward:i,right:s,up:r}=n;e.pos.copy(t).addScaledVector(i,-55).addScaledVector(s,14).addScaledVector(r,24),e.look.copy(t).addScaledVector(i,16)}},{key:"lowSkim",label:"Low Skim",weight:.8,lyricSafe:!1,compute(n,e){const{head:t,forward:i,right:s,ocean:r,time:o,dt:a,director:l}=n,c=2.2,h=t.x+i.x*-14+s.x*5,d=t.z+i.z*-14+s.z*5,p=(r?r.heightAt(h,d,o):0)+c;l._lowSkimY==null&&(l._lowSkimY=p);const g=1-Math.pow(8e-4,a*4);l._lowSkimY=_i.lerp(l._lowSkimY,p,g);const x=Math.max(l._lowSkimY,p);e.pos.set(h,x,d),e.look.copy(t).addScaledVector(i,5)}},{key:"frontThreeQuarter",label:"Front Three-Quarter",weight:.6,lyricSafe:!1,compute(n,e){const{head:t,forward:i,right:s,up:r}=n;e.pos.copy(t).addScaledVector(i,20).addScaledVector(s,20).addScaledVector(r,8),e.look.copy(t).addScaledVector(i,-4)}},{key:"highOrbit",label:"High Orbit",weight:.7,lyricSafe:!1,compute(n,e){const{head:t,forward:i,right:s,up:r,dt:o,director:a}=n,l=32,c=20,h=.5;a._orbitAngle+=o*h;const d=a._orbitAngle;e.pos.copy(t).addScaledVector(i,-Math.cos(d)*l).addScaledVector(s,Math.sin(d)*l).addScaledVector(r,c),e.look.copy(t).addScaledVector(r,2)}},{key:"bellySkim",label:"Belly Skim",weight:.6,lyricSafe:!1,compute(n,e){const{head:t,forward:i,right:s,ocean:r,time:o,dt:a,director:l,up:c}=n,h=2,d=t.x+i.x*16+s.x*9,u=t.z+i.z*16+s.z*9,g=(r?r.heightAt(d,u,o):0)+h;l._bellySkimY==null&&(l._bellySkimY=g);const x=1-Math.pow(8e-4,a*4);l._bellySkimY=_i.lerp(l._bellySkimY,g,x);const m=Math.max(l._bellySkimY,g);e.pos.set(d,m,u),e.look.copy(t).addScaledVector(c,1.5)}}],_s=new Map(Qs.map(n=>[n.key,n])),Wu="rearThreeQuarter";function Yx(n,e){const t=[n,e].sort().join("|");return t==="directRear|rearThreeQuarter"?.85:t==="rearThreeQuarter|sideFollow"?.5:n==="wideChase"||e==="wideChase"?.25:n==="lowSkim"||e==="lowSkim"||n==="frontThreeQuarter"||e==="frontThreeQuarter"||n==="bellySkim"||e==="bellySkim"?.2:n==="highOrbit"||e==="highOrbit"?.4:.55}class Kl{constructor(e={}){this.enabled=!1,this.auto=!0,this.paused=!1,this.allowCuts=!1,this.cameraMode=e.mode||Wu,this.seed=e.seed>>>0||1234,this.minShotDuration=9,this.maxShotDuration=16,this.transitionTime=2.6,this._rand=Vu(this.seed),this._shotElapsed=0,this._shotDuration=this.minShotDuration,this._lyricLocked=!1,this._sideSign=this._rand()<.5?-1:1,this._lowSkimY=null,this._bellySkimY=null,this._orbitAngle=0,this._transition=null,this._transFromPos=new C,this._transFromLook=new C,this.lastAutoShots=[],this._forward=new C,this._right=new C,this._toPos=new C,this._toLook=new C,this._lookBlend=new C,this._out={pos:this._toPos,look:this._toLook},this._ctx={head:new C,forward:this._forward,right:this._right,up:Gu,ocean:null,time:0,dt:0,director:this}}static get presetLabels(){const e={};for(const t of Qs)e[t.label]=t.key;return e}static get presetKeys(){return Qs.map(e=>e.key)}_isLyricSafe(e){const t=_s.get(e);return!t||t.lyricSafe}_pickWeighted(e){let t=0;for(const s of e)t+=s.weight;let i=this._rand()*t;for(const s of e)if(i-=s.weight,i<=0)return s.key;return e[e.length-1].key}_pickNextMode(e){const t=Qs.filter(r=>r.key!==this.cameraMode&&(!e||r.lyricSafe));if(t.length===0)return this.cameraMode;const i=this._prevMode,s=t.map(r=>({key:r.key,weight:r.key===i?r.weight*.5:r.weight}));return this._pickWeighted(s)}_pickDuration(){return this.minShotDuration+this._rand()*Math.max(.001,this.maxShotDuration-this.minShotDuration)}_pickTransition(e,t){if(!this.allowCuts)return"smooth";const i=Yx(e,t);return this._rand()<i?"smooth":"cut"}setMode(e,t,i,s){if(!_s.has(e))return;const r=this.cameraMode,o=t||this._pickTransition(r,e);return this._prevMode=r,this.cameraMode=e,e==="sideFollow"&&(this._sideSign=this._rand()<.5?-1:1),e==="highOrbit"&&(this._orbitAngle=0),o==="smooth"&&i&&s?(this._transFromPos.copy(i),this._transFromLook.copy(s),this._transition={duration:Math.max(.05,this.transitionTime),elapsed:0}):this._transition=null,o}requestNextShot(e,t){if(!this.auto)return;const i=this._lyricLocked,s=this._pickNextMode(i),r=this._pickDuration(),o=this.setMode(s,void 0,e,t);this._shotElapsed=0,this._shotDuration=r,this._recordShot(s,r,o)}_recordShot(e,t,i){this.lastAutoShots.push({mode:e,duration:+t.toFixed(2),transition:i}),this.lastAutoShots.length>10&&this.lastAutoShots.shift()}restart(){this._rand=Vu(this.seed),this._shotElapsed=0,this._prevMode=null,this._sideSign=this._rand()<.5?-1:1,this.lastAutoShots.length=0,this._transition=null,this.auto&&(this.cameraMode=this._pickWeighted(Qs),this._shotDuration=this._pickDuration(),this._recordShot(this.cameraMode,this._shotDuration,"cut"))}_basis(e){this._forward.copy(e.travelDir),this._forward.lengthSq()<1e-8&&this._forward.set(0,0,-1),this._right.crossVectors(this._forward,Gu),this._right.lengthSq()<1e-6?this._right.set(1,0,0):this._right.normalize()}update(e,t,i,s,r,o){if(!this.enabled||!t||this.paused)return;this._basis(t);const a=this._ctx;t.getHeadPosition(a.head),a.ocean=r,a.time=o,a.dt=e;const l=i?i.getPhase():null,c=l==="travel"||l==="assemble"||l==="hold";if(this.auto&&c&&!this._lyricLocked&&!this._isLyricSafe(this.cameraMode)&&(_s.get(this.cameraMode).compute(a,this._out),this.setMode(this._pickNextMode(!0),"cut",this._toPos,this._toLook)),this._lyricLocked=c,this.auto&&(this._shotElapsed+=e,this._shotElapsed>=this._shotDuration)){const d=this._pickNextMode(c),u=this._pickDuration();_s.get(this.cameraMode).compute(a,this._out);const p=this.setMode(d,void 0,this._toPos,this._toLook);this._shotElapsed=0,this._shotDuration=u,this._recordShot(d,u,p)}if((_s.get(this.cameraMode)||_s.get(Wu)).compute(a,this._out),this._transition){this._transition.elapsed+=e;const d=Xx(0,1,Math.min(1,this._transition.elapsed/this._transition.duration));s.position.lerpVectors(this._transFromPos,this._toPos,d),this._lookBlend.copy(this._transFromLook).lerp(this._toLook,d),s.lookAt(this._lookBlend),d>=1&&(this._transition=null)}else s.position.copy(this._toPos),s.lookAt(this._toLook)}}class Zl{static DEFAULT_LEAVE=2.5;static DEFAULT_DISSOLVE=2.5;static LAST_CUE_READ_BUFFER=.5;static MIN_LEAVE_DISSOLVE_TOTAL=.6;constructor(e,t={}){this.manager=e,this.getChoreography=t.getChoreography||(()=>null),this.baseTrailLyricsConfig=t.baseTrailLyricsConfig||(()=>({})),this.legacyHoldDefaults=t.legacyHoldDefaults||{trail:2,hero:2.6},this.enabled=!0,this.paused=!1,this.speed=1,this.time=0,this.onEventStart=t.onEventStart||null,this.rawCues=[],this.timingLoaded=!1,this.timingErrors=[],this.events=[]}_groupCues(e){const t=e.map(o=>({cue:o,choreo:this.getChoreography(o.index)})),i=new Map,s=[];let r=null;for(let o=0;o<t.length;o++){const a=t[o],l=!!(a.choreo&&a.choreo.runtimeEnabled),c=a.cue.group;let h=c;if(l&&c!=null){const d=i.get(c);d!==void 0&&d!==o-1&&(console.error(`[LyricTimeline] group "${c}" is not contiguous — cue ${a.cue.index} reuses it non-adjacently; treating this occurrence as ungrouped.`),h=null),i.set(c,o)}r&&r.enabled===l&&l&&h!=null&&r.group===h?r.members.push(a):(r={members:[a],enabled:l,group:l?h:null},s.push(r))}return s}_resolvePhraseGroup(e){const t=e.members.map(m=>m.cue),i=e.members[0].choreo,s=t[0],r=t[t.length-1],o=t.length>1?`cue-${s.index}-${r.index}`:`cue-${s.index}`;if(t.some(m=>typeof m.time!="number"||!Number.isFinite(m.time)||m.time<0))return console.error(`[LyricTimeline] ${o}: one or more member cues have an invalid time — excluded from schedule.`),this.timingErrors.push(o),null;const l=s.time,c=r.time,h=i.preRoll,d=Math.max(0,l-h),u=Math.max(.3,l-d),p=Math.min(h,u);let g=null;if(t.every(m=>typeof m.endTime=="number"&&Number.isFinite(m.endTime))){const m=t.find(f=>f.endTime<=f.time);m?console.error(`[LyricTimeline] ${o}: cue ${m.index} has endTime (${m.endTime}) <= its own time (${m.time}) — ignoring endTime for this phrase, using legacy fallback instead.`):g=Math.max(...t.map(f=>f.endTime))}return{id:o,sourceCueIndices:t.map(m=>m.index),sourceTexts:t.map(m=>m.text),sourceTimes:t.map(m=>m.time),sourceEndTimes:t.map(m=>typeof m.endTime=="number"&&Number.isFinite(m.endTime)?m.endTime:null),displayLines:t.map(m=>m.text),group:e.group,designType:i.designType,runtimeType:i.runtimeType,camera:i.camera,leaveBehind:i.leaveBehind,section:i.section,firstVocalTime:l,lastVocalTime:c,authoredEndTime:g,preRoll:h,triggerTime:d,assembleDuration:p,trailLyricsConfig:this.baseTrailLyricsConfig(i)}}setTimingData(e){this.rawCues=e,this.timingErrors=[];const t=[...e].sort((r,o)=>r.index-o.index),i=this._groupCues(t),s=[];for(const r of i){if(!r.enabled)continue;const o=this._resolvePhraseGroup(r);o&&s.push(o)}s.sort((r,o)=>r.triggerTime-o.triggerTime),this.events=this._resolveEndTimes(s),this.timingLoaded=!0,this.setTime(this.time)}_resolveEndTimes(e){const{DEFAULT_LEAVE:t,DEFAULT_DISSOLVE:i,LAST_CUE_READ_BUFFER:s,MIN_LEAVE_DISSOLVE_TOTAL:r}=Zl;for(const o of e)if(o.authoredEndTime!==null)o.holdDuration=Math.max(.3,o.authoredEndTime-(o.triggerTime+o.assembleDuration)),o.holdEnd=o.authoredEndTime,o.leaveDuration=t,o.dissolveDuration=i;else{const a=o.lastVocalTime+s,l=Math.max(0,a-(o.triggerTime+o.assembleDuration)),c=this.legacyHoldDefaults[o.runtimeType]??this.legacyHoldDefaults.trail;o.holdDuration=Math.max(c,l),o.holdEnd=o.triggerTime+o.assembleDuration+o.holdDuration}for(let o=0;o<e.length;o++){const a=e[o],l=e[o+1],c=l?l.triggerTime:1/0;if(a.authoredEndTime!==null){Number.isFinite(c)&&a.holdEnd+a.leaveDuration+a.dissolveDuration>c&&console.warn(`[LyricTimeline] ${a.id}: authored display window (ends ~${(a.holdEnd+a.leaveDuration+a.dissolveDuration).toFixed(2)}s) overlaps next phrase "${l.id}"'s trigger (${c.toFixed(2)}s) — the single shared TrailLyrics instance will cut "${a.id}" short when "${l.id}" fires. This reflects the authoring data's intentional overlap, not a bug; not auto-corrected.`),a.endTime=a.holdEnd;continue}const h=c-a.holdEnd;if(!Number.isFinite(h))a.leaveDuration=t,a.dissolveDuration=i;else if(h<0)console.error(`[LyricTimeline] ${a.id}: requested hold overruns next phrase "${l.id}"'s trigger by ${(-h).toFixed(2)}s — clamping hold; report for choreography tuning.`),a.holdDuration=Math.max(0,a.holdDuration+h-r),a.holdEnd=a.triggerTime+a.assembleDuration+a.holdDuration,a.leaveDuration=r/2,a.dissolveDuration=r/2;else if(h<r)console.warn(`[LyricTimeline] ${a.id}: only ${h.toFixed(2)}s available before "${l.id}" fires — using the minimum transition.`),a.leaveDuration=r/2,a.dissolveDuration=r/2;else if(h>=t+i)a.leaveDuration=t,a.dissolveDuration=i;else{const d=h/(t+i);a.leaveDuration=t*d,a.dissolveDuration=i*d}a.endTime=a.holdEnd}for(const o of e)o.trailLyricsConfig={...o.trailLyricsConfig,assembleDuration:o.assembleDuration,holdDuration:o.holdDuration,leaveDuration:o.leaveDuration,dissolveDuration:o.dissolveDuration,screenLock:o.authoredEndTime!==null,...o.authoredEndTime!==null?{textScale:Rx}:{}},o.fullLifecycleEnd=o.holdEnd+o.leaveDuration+o.dissolveDuration;return e}getDebugEvents(){return this.events.map(e=>({id:e.id,sourceCueIndices:e.sourceCueIndices,sourceTexts:e.sourceTexts,sourceTimes:e.sourceTimes,sourceEndTimes:e.sourceEndTimes,displayLines:e.displayLines,group:e.group,designType:e.designType,runtimeType:e.runtimeType,firstVocalTime:e.firstVocalTime,lastVocalTime:e.lastVocalTime,authoredEndTime:e.authoredEndTime,preRoll:e.preRoll,triggerTime:e.triggerTime,endTime:e.endTime,duration:e.endTime-e.triggerTime,camera:e.camera,leaveBehind:e.leaveBehind}))}resolveDesignScore(e){const t=[...e||[]].sort((l,c)=>l.index-c.index),i=this._groupCues(t),s=[],r=[];for(const l of i){if(!l.enabled){for(const h of l.members)r.push({id:`cue-${h.cue.index}`,sourceCueIndices:[h.cue.index],sourceTexts:[h.cue.text],sourceTimes:[h.cue.time],sourceEndTimes:[typeof h.cue.endTime=="number"?h.cue.endTime:null],displayLines:[h.cue.text],group:null,designType:h.choreo?h.choreo.designType:null,runtimeType:h.choreo?h.choreo.runtimeType:null,firstVocalTime:null,lastVocalTime:null,authoredEndTime:null,preRoll:null,triggerTime:null,endTime:null,duration:null,camera:null,leaveBehind:null});continue}const c=this._resolvePhraseGroup(l);c&&s.push(c)}return s.sort((l,c)=>l.triggerTime-c.triggerTime),[...this._resolveEndTimes(s).map(l=>({id:l.id,sourceCueIndices:l.sourceCueIndices,sourceTexts:l.sourceTexts,sourceTimes:l.sourceTimes,sourceEndTimes:l.sourceEndTimes,displayLines:l.displayLines,group:l.group,designType:l.designType,runtimeType:l.runtimeType,firstVocalTime:l.firstVocalTime,lastVocalTime:l.lastVocalTime,authoredEndTime:l.authoredEndTime,preRoll:l.preRoll,triggerTime:l.triggerTime,endTime:l.endTime,duration:l.endTime-l.triggerTime,camera:l.camera,leaveBehind:l.leaveBehind})),...r].sort((l,c)=>l.sourceCueIndices[0]-c.sourceCueIndices[0])}restart(){this.manager.clear(),this.time=0,this.setTime(0)}setPaused(e){this.paused=!!e}_phrasesActiveAt(e){const t=[];for(const i of this.events)i.triggerTime<=e&&e<=i.fullLifecycleEnd&&t.push(i);return t}getActiveEvents(){return this._phrasesActiveAt(this.time)}getActiveEvent(){const e=this.getActiveEvents();return e.length?e[e.length-1]:null}getNextEvent(){for(const e of this.events)if(e.triggerTime>this.time)return e;return null}setTime(e){this.time=Math.max(0,e);const t=this._phrasesActiveAt(this.time),i=new Set(t.map(s=>s.id));for(const s of this.manager.getActiveIds())i.has(s)||this.manager.despawn(s);for(const s of t)this.manager.has(s.id)||(this.manager.spawn(s),this.onEventStart&&this.onEventStart(s))}update(e){!this.enabled||this.paused||this.setTime(this.time+e*this.speed)}}const Xu=.6,qx=1,$x=new Set([2,3]);function Yu(n,e,t){const i=Math.min(Math.max((t-n)/(e-n),0),1);return i*i*(3-2*i)}function qu(n,e){if(e<=n.time||e>=n.endTime)return 0;const t=Yu(n.time,n.time+Xu,e),i=1-Yu(n.endTime-Xu,n.endTime,e);return Math.min(t,i)}class Kx{constructor(e,t){this.titleEl=e,this.creditEl=t,this.titleCue=null,this.creditCues=[],this._lastSource=null}_syncCues(e){if(!(!e||e===this._lastSource)){this._lastSource=e,this.titleCue=null,this.creditCues=[];for(const t of e)t.index===qx?this.titleCue=t:$x.has(t.index)&&this.creditCues.push(t);this.titleEl.textContent=this.titleCue?this.titleCue.text:""}}update(e,t){this._syncCues(t);const i=this.titleCue?qu(this.titleCue,e):0;this.titleEl.style.opacity=i.toFixed(3);const s=[];for(const r of this.creditCues){const o=qu(r,e);o>0&&s.push({cue:r,op:o})}s.sort((r,o)=>r.cue.time-o.cue.time),this._renderCreditLines(s)}_renderCreditLines(e){const t=this.creditEl;for(;t.children.length>e.length;)t.removeChild(t.lastChild);for(;t.children.length<e.length;)t.appendChild(document.createElement("div"));e.forEach(({cue:i,op:s},r)=>{const o=t.children[r];o.textContent=i.text,o.style.opacity=s.toFixed(3)})}}class Zx{constructor(e){this.src=e,this.audio=new Audio(e),this.audio.preload="auto",this.audio.loop=!1,this.audio.volume=.8,this.loaded=!1,this.loadError=null,this.lastPlayError=null,this.audio.addEventListener("loadedmetadata",()=>{this.loaded=!0}),this.audio.addEventListener("error",()=>{this.loadError=this.audio.error?this.audio.error.message||String(this.audio.error.code):"unknown audio error"})}get currentTime(){return this.audio.currentTime||0}get duration(){return Number.isFinite(this.audio.duration)?this.audio.duration:0}get paused(){return this.audio.paused}get volume(){return this.audio.volume}get playbackRate(){return this.audio.playbackRate}async play(){try{return await this.audio.play(),this.lastPlayError=null,!0}catch(e){return this.lastPlayError=e&&e.message?e.message:String(e),!1}}pause(){this.audio.pause()}setSrc(e){this.audio.pause(),this.src=e,this.loaded=!1,this.loadError=null,this.audio.src=e,this.audio.load()}setTime(e){const t=this.duration>0?Math.min(Math.max(0,e),this.duration):Math.max(0,e);this.audio.currentTime=t}restart(){this.setTime(0)}setVolume(e){this.audio.volume=Math.min(1,Math.max(0,e))}setPlaybackRate(e){this.audio.playbackRate=Math.min(4,Math.max(.25,e))}}const $u={hero:{textScale:1.3,particleContribution:1.15},trail:{textScale:1,particleContribution:1}},$t=1.4,ba=1.7,Ys=1.5,qs=1.2,Jx=1.9,Ku={4:1.8,5:1.4},Qx=2,jx=2.6,eS={designType:"TRAIL",runtimeType:"trail",preRoll:$t,camera:null,leaveBehind:!0,section:null},tS={4:{designType:"HERO",runtimeType:"hero",preRoll:Ku[4],camera:"directRear",leaveBehind:!0,section:"VERSE_A"},5:{designType:"TRAIL",runtimeType:"trail",preRoll:Ku[5],camera:"rearThreeQuarter",leaveBehind:!0,section:"VERSE_A"},7:{designType:"TRAIL",runtimeType:"trail",preRoll:$t,camera:"sideFollow",leaveBehind:!0,section:"VERSE_A"},8:{designType:"TRAIL",runtimeType:"trail",preRoll:$t,camera:"rearThreeQuarter",leaveBehind:!0,section:"VERSE_A"},10:{designType:"TRAIL",runtimeType:"trail",preRoll:$t,camera:"sideFollow",leaveBehind:!0,section:"VERSE_A"},12:{designType:"TRAIL",runtimeType:"trail",preRoll:$t,camera:"wideChase",leaveBehind:!0,section:"PRE_CHORUS_A"},15:{designType:"TRAIL",runtimeType:"trail",preRoll:$t,camera:"directRear",leaveBehind:!0,section:"PRE_CHORUS_A"},16:{designType:"HERO",runtimeType:"hero",preRoll:ba,camera:"directRear",leaveBehind:!0,section:"CHORUS_A"},17:{designType:"TRAIL",runtimeType:"trail",preRoll:$t,camera:"rearThreeQuarter",leaveBehind:!0,section:"CHORUS_A"},18:{designType:"TRAIL",runtimeType:"trail",preRoll:$t,camera:"sideFollow",leaveBehind:!0,section:"CHORUS_A"},19:{designType:"TRAIL",runtimeType:"trail",preRoll:$t,camera:"sideFollow",leaveBehind:!0,section:"CHORUS_A"},20:{designType:"HERO",runtimeType:"hero",preRoll:ba,camera:"directRear",leaveBehind:!0,section:"CHORUS_A"},21:{designType:"ECHO",runtimeType:"trail",preRoll:qs,camera:"sideFollow",leaveBehind:!0,section:"VERSE_B"},22:{designType:"ECHO",runtimeType:"trail",preRoll:qs,camera:"sideFollow",leaveBehind:!0,section:"VERSE_B"},23:{designType:"TRAIL",runtimeType:"trail",preRoll:$t,camera:"sideFollow",leaveBehind:!0,section:"VERSE_B"},25:{designType:"TRAIL",runtimeType:"trail",preRoll:$t,camera:"wideChase",leaveBehind:!0,section:"VERSE_B"},27:{designType:"TRAIL",runtimeType:"trail",preRoll:$t,camera:"directRear",leaveBehind:!0,section:"VERSE_B"},29:{designType:"TRAIL",runtimeType:"trail",preRoll:$t,camera:"wideChase",leaveBehind:!0,section:"PRE_CHORUS_B"},32:{designType:"TRAIL",runtimeType:"trail",preRoll:$t,camera:"directRear",leaveBehind:!0,section:"PRE_CHORUS_B"},33:{designType:"HERO",runtimeType:"hero",preRoll:ba,camera:"directRear",leaveBehind:!0,section:"CHORUS_B"},34:{designType:"TRAIL",runtimeType:"trail",preRoll:$t,camera:"rearThreeQuarter",leaveBehind:!0,section:"CHORUS_B"},36:{designType:"FIELD",runtimeType:"trail",preRoll:Ys,camera:"directRear",leaveBehind:!0,section:"CHORUS_B"},37:{designType:"FIELD",runtimeType:"trail",preRoll:Ys,camera:"sideFollow",leaveBehind:!0,section:"OUTRO_TAG"},38:{designType:"FIELD",runtimeType:"trail",preRoll:Ys,camera:"sideFollow",leaveBehind:!0,section:"OUTRO_TAG"},39:{designType:"FIELD",runtimeType:"trail",preRoll:Ys,camera:"wideChase",leaveBehind:!0,section:"OUTRO_TAG"},40:{designType:"FIELD",runtimeType:"trail",preRoll:Ys,camera:"wideChase",leaveBehind:!0,section:"OUTRO_TAG"},41:{designType:"ECHO",runtimeType:"trail",preRoll:qs,camera:"sideFollow",leaveBehind:!0,section:"OUTRO_TAG"},42:{designType:"ECHO",runtimeType:"trail",preRoll:qs,camera:"sideFollow",leaveBehind:!0,section:"OUTRO_TAG"},43:{designType:"ECHO",runtimeType:"trail",preRoll:qs,camera:"wideChase",leaveBehind:!0,section:"OUTRO_TAG"},44:{designType:"FINALE",runtimeType:"hero",preRoll:Jx,camera:"directRear",leaveBehind:!0,section:"OUTRO_TAG"}},iS={1:{designType:"TITLE",runtimeType:null,preRoll:null,camera:null,leaveBehind:null,section:"INTRO_CREDITS"},2:{designType:"CREDIT",runtimeType:null,preRoll:null,camera:null,leaveBehind:null,section:"INTRO_CREDITS"},3:{designType:"CREDIT",runtimeType:null,preRoll:null,camera:null,leaveBehind:null,section:"INTRO_CREDITS"}},Zu={min:4,max:44},nS=new Set([1,2,3]);function oo(n){if(nS.has(n))return{...iS[n],runtimeEnabled:!1};if(n>=Zu.min&&n<=Zu.max){const e=tS[n];return{...eS,...e||{},runtimeEnabled:!0}}return null}function sS(n){return $u[n]||$u.trail}function rS(n){return{travelDuration:0,formationDistance:.65,...sS(n.runtimeType)}}const oS=new Set(["TITLE","CREDIT","TRAIL","HERO","FIELD","ECHO","FINALE"]),aS=new Set(["trail","hero"]),lS={TITLE:[null],CREDIT:[null],TRAIL:["trail"],HERO:["hero"],FIELD:["trail"],ECHO:["trail"],FINALE:["hero"]},cS=new Set(["directRear","rearThreeQuarter","sideFollow","wideChase"]);function uS(){const n=[];for(let e=1;e<=44;e++){const t=oo(e);if(!t){n.push(`cue ${e}: getChoreography() returned null`);continue}oS.has(t.designType)||n.push(`cue ${e}: invalid designType "${t.designType}"`),t.runtimeType!==null&&!aS.has(t.runtimeType)&&n.push(`cue ${e}: invalid runtimeType "${t.runtimeType}"`),(lS[t.designType]||[]).includes(t.runtimeType)||n.push(`cue ${e}: designType "${t.designType}" may not map to runtimeType "${t.runtimeType}"`),t.runtimeEnabled&&t.runtimeType===null&&n.push(`cue ${e}: runtimeEnabled but runtimeType is null`),t.camera!==null&&!cS.has(t.camera)&&n.push(`cue ${e}: camera "${t.camera}" is not one of AutoDirector's lyric-safe presets`)}return oo(0)!==null&&n.push("getChoreography(0) should return null (out of range)"),oo(45)!==null&&n.push("getChoreography(45) should return null (out of range)"),n.length>0&&console.error(`[ForeverMoreLyrics] choreography validation FAILED:
`+n.map(e=>" - "+e).join(`
`)),n}uS();function Hi(n){const e=new URLSearchParams(window.location.search),t=n.toLowerCase();for(const[i,s]of e)if(i.toLowerCase()===t)return s==="1";return!1}const hS=document.getElementById("app"),mn=document.getElementById("boot"),dS=document.getElementById("depth"),Ju=document.getElementById("depth-state"),fS=document.getElementById("depth-val"),Qu=document.getElementById("traveler-alt-val"),pS=document.getElementById("holdLyricOverlay"),mS=document.getElementById("tc-title"),gS=document.getElementById("tc-credit"),Ea=document.getElementById("realTime"),_S=document.getElementById("real-time-date"),vS=document.getElementById("real-time-clock"),xS=document.getElementById("real-time-hour"),SS=document.getElementById("real-time-colon"),yS=document.getElementById("real-time-minute"),Kr=document.getElementById("startOverlay"),MS=document.getElementById("start-music-btn"),ju=document.getElementById("karaoke-checkbox"),nd=document.getElementById("fullscreen-btn"),wa=document.getElementById("playpause-btn"),Ta=document.getElementById("repeat-btn");function sd(){return!!(document.fullscreenElement||document.webkitFullscreenElement)}function rd(){nd.classList.toggle("is-fullscreen",sd())}nd.addEventListener("click",()=>{if(sd()){const n=document.exitFullscreen||document.webkitExitFullscreen;n&&Promise.resolve(n.call(document)).catch(()=>{})}else{const n=document.documentElement,e=n.requestFullscreen||n.webkitRequestFullscreen;e&&Promise.resolve(e.call(n)).catch(()=>{})}});document.addEventListener("fullscreenchange",rd);document.addEventListener("webkitfullscreenchange",rd);const go="saikai",od="naogare_liked_"+go,bS=document.getElementById("like-btn"),Wn=document.getElementById("supportDialog"),ES=document.getElementById("support-dialog-close"),kn=document.getElementById("like-action-btn"),ad=document.getElementById("like-count-label");function ld(n){kn.classList.toggle("is-liked",n),kn.disabled=n}let cd=!1;try{cd=localStorage.getItem(od)==="1"}catch{}ld(cd);function wS(){Wn.hidden=!1,fetch("/api/likes").then(n=>n.json()).then(n=>{n&&n.ok&&typeof n.counts[go]=="number"&&(ad.textContent=`Like (${n.counts[go]})`)}).catch(()=>{})}bS.addEventListener("click",wS);ES.addEventListener("click",()=>{Wn.hidden=!0});Wn.addEventListener("click",n=>{n.target===Wn&&(Wn.hidden=!0)});window.addEventListener("keydown",n=>{n.code==="Escape"&&!Wn.hidden&&(Wn.hidden=!0)});kn.addEventListener("click",()=>{kn.disabled||(kn.disabled=!0,fetch("/api/likes/"+go,{method:"POST"}).then(n=>n.json()).then(n=>{if(n&&n.ok){ad.textContent=`Like (${n.count})`,ld(!0);try{localStorage.setItem(od,"1")}catch{}}else kn.disabled=!1}).catch(()=>{kn.disabled=!1}))});const An=()=>window.innerWidth,Cn=()=>window.innerHeight;function Jl(n){const e=mn&&mn.querySelector("small");e&&(e.textContent=String(n).slice(0,220));const t=mn&&mn.querySelector("h1");t&&(t.textContent="Error"),mn&&mn.classList.remove("hidden")}window.addEventListener("error",n=>Jl(n.message||n.error));window.addEventListener("unhandledrejection",n=>Jl(n.reason));const Qt=new vv({antialias:!0,powerPreference:"high-performance",stencil:!1});Qt.setPixelRatio(Math.min(window.devicePixelRatio,2));Qt.setSize(An(),Cn());Qt.toneMapping=Ri;Qt.autoClear=!0;hS.appendChild(Qt.domElement);Qt.debug.onShaderError=(n,e,t,i)=>{const s=(a,l)=>{const c=n.getShaderInfoLog(a)||"";return c.trim()&&console.error(`[${l}] ${c}`),c},r=s(t,"vertex"),o=s(i,"fragment");Jl("Shader error — see console. "+(o||r))};const ri={elevation:22,azimuth:108},Zt=new C;function ud(){const n=_i.degToRad(ri.elevation),e=_i.degToRad(ri.azimuth),t=Math.cos(n);Zt.set(Math.cos(e)*t,Math.sin(n),Math.sin(e)*t).normalize()}ud();const Sn={elevation:20,azimuth:255},Un=new C;function hd(){const n=_i.degToRad(Sn.elevation),e=_i.degToRad(Sn.azimuth),t=Math.cos(n);Un.set(Math.cos(e)*t,Math.sin(n),Math.sin(e)*t).normalize()}hd();const hi=new qf,He=new gi(58,An()/Cn(),.1,8e3);He.position.set(0,14,48);const et=new Sv(He,Qt.domElement);et.enableDamping=!0;et.dampingFactor=.06;et.target.set(0,2,0);et.minDistance=3;et.maxDistance=400;et.maxPolarAngle=Math.PI*.98;et.enablePan=!0;et.screenSpacePanning=!0;et.autoRotateSpeed=.4;const _o=22,eh=7,TS=-8,AS=80;let Fn=4.5,hr=1,yn=!1;window.addEventListener("keydown",n=>{n.code==="Space"&&(n.preventDefault(),!n.repeat&&(yn||(yn=!0)))});window.addEventListener("keyup",n=>{n.code==="Space"&&(n.preventDefault(),yn=!1,hr*=-1)});window.addEventListener("blur",()=>{yn=!1});let Al=0,Aa=null;const th=8,CS=35;function ih(n){if(n.beta===null||n.beta===void 0)return;if(Aa===null){Aa=n.beta;return}const e=n.beta-Aa,t=(Math.abs(e)-th)/(CS-th);Al=Math.sign(e)*Math.min(1,Math.max(0,t))}Hi("headParticles")&&window.addEventListener("pointerdown",function(){typeof DeviceOrientationEvent<"u"&&typeof DeviceOrientationEvent.requestPermission=="function"?DeviceOrientationEvent.requestPermission().then(e=>{e==="granted"&&window.addEventListener("deviceorientation",ih)}).catch(()=>{}):typeof DeviceOrientationEvent<"u"&&window.addEventListener("deviceorientation",ih)},{once:!0});let xn=!1,Xn=!1;window.addEventListener("keydown",n=>{n.code==="KeyA"?(n.preventDefault(),xn=!0):n.code==="KeyD"&&(n.preventDefault(),Xn=!0)});window.addEventListener("keyup",n=>{n.code==="KeyA"?(n.preventDefault(),xn=!1):n.code==="KeyD"&&(n.preventDefault(),Xn=!1)});window.addEventListener("blur",()=>{xn=!1,Xn=!1});const RS=40,PS=350;let dd=0,fd=0,pd=0;window.addEventListener("pointerdown",n=>{dd=n.clientX,fd=n.clientY,pd=performance.now()});window.addEventListener("pointerup",n=>{if(et.enabled||n.target.closest&&n.target.closest("button, input, select, textarea, .lil-gui, .editor-ui")||performance.now()-pd>PS)return;const t=n.clientY-fd,i=n.clientX-dd,s=Math.abs(i),r=Math.abs(t);if(!(Math.max(s,r)<RS))if(r>=s){const o=t<0?1:-1;yn?hr!==o&&(yn=!1):(hr=o,yn=!0)}else{const o=i<0;!xn&&!Xn?(xn=o,Xn=!o):xn!==o&&(xn=!1,Xn=!1)}});const Zr=[-1,0,1];let Ca=0,Jr=0,Ra=0,nh=!1;const Si=new Zv(Zt);hi.add(Si.mesh);const ne=new Jv(Zt,new Ce(An(),Cn()));ne.uniforms.uNear.value=He.near;ne.uniforms.uFar.value=He.far;hi.add(ne.mesh);const Pi=new Qv(Zt,_o);hi.add(Pi.mesh);const tn=new jv(Zt,_o,ne.uniforms);hi.add(tn.mesh);const vo=new ix(5e3,160);hi.add(vo.points);const DS=Hi("rain"),Mn=new nx(hi);Mn.setEnabled(DS);window.addEventListener("keydown",n=>{n.code==="KeyR"&&(n.repeat||Mn.toggle())});let To=!0;function Ql(n){To=n,document.body.classList.toggle("presentation-mode",n)}Ql(To);window.addEventListener("keydown",n=>{if(n.code!=="KeyH"||n.repeat)return;const e=n.target,t=e&&e.tagName;t==="INPUT"||t==="SELECT"||t==="TEXTAREA"||e&&e.isContentEditable||Ql(!To)});window.addEventListener("keydown",n=>{if(n.code!=="KeyC"&&n.code!=="KeyV"||n.repeat||!Le)return;const e=n.target,t=e&&e.tagName;if(!(t==="INPUT"||t==="SELECT"||t==="TEXTAREA"||e&&e.isContentEditable)){if(Le.enabled=!0,n.code==="KeyC"){const i=Kl.presetKeys,s=i[(i.indexOf(Le.cameraMode)+1)%i.length];Le.auto=!1,Le.setMode(s,void 0,He.position,et.target)}else Le.auto=!0;Rt&&(Rt.enabled=Le.enabled,Rt.auto=Le.auto,Rt.cameraMode=Le.cameraMode,ft.controllersRecursive().forEach(i=>i.updateDisplay()))}});const sh=400,LS=24;let $s=0,rh=0,md=0,gd=0,_d=0;window.addEventListener("pointerdown",n=>{md=n.clientX,gd=n.clientY,_d=performance.now()});window.addEventListener("pointerup",n=>{const e=performance.now(),t=Math.hypot(n.clientX-md,n.clientY-gd),i=e-_d;if(t>=LS||i>=sh){$s=0;return}e-rh>sh&&($s=0),$s++,rh=e,$s>=3&&($s=0,Ql(!To))});const Ao=Hi("cinematicSunset"),IS=.75,Kn=Hi("night"),NS=-35,jl=.52,ec=.55,vd=.85,xd=.15,Sd=.6,nn=Hi("time"),Zn=Hi("headParticles"),Ie=Zn?new yx(hi):null;let st=null,wi=null;const qi={look:new C,inited:!1},FS=Zn&&Hi("trailLyrics"),tc=Zn&&Hi("autoDirector"),Le=tc?new Kl({seed:1234}):null;Le&&(Le.enabled=!0,Le.restart());let Rt=null;const Jn=FS&&Hi("lyricTimeline"),Pa="./data/saikai-2026-02-22EngLast-lyrics-timing.json",vt=Jn?new kx(hi):null,Je=Jn?new Zl(vt,{getChoreography:oo,baseTrailLyricsConfig:rS,legacyHoldDefaults:{trail:Qx,hero:jx},onEventStart:n=>{n.runtimeType==="hero"&&Le&&Le.enabled&&Le.setMode(n.camera,"cut",He.position,et.target)}}):null;let zt=null,Cl=null;const oh=Jn?new Kx(mS,gS):null;let _n=null;Jn&&fetch(Pa).then(n=>n.json()).then(n=>{if(!Array.isArray(n.lyrics)){console.error("[LyricTimeline] timing JSON is missing a `lyrics` array:",Pa);return}_n=n;const e=JSON.stringify(n.lyrics);(!Array.isArray(n.lyrics)||n.lyrics.length!==44)&&console.error("[LyricTimeline] expected exactly 44 raw source cues, found",n.lyrics?n.lyrics.length:"none");const t=new Set;for(const o of n.lyrics||[])t.has(o.index)&&console.error("[LyricTimeline] duplicate raw cue index",o.index),t.add(o.index),(typeof o.time!="number"||!Number.isFinite(o.time)||o.time<0)&&console.error("[LyricTimeline] cue",o.index,"has an invalid time:",o.time),o.endTime!==void 0&&o.endTime!==null&&(typeof o.endTime!="number"||!Number.isFinite(o.endTime)?console.error("[LyricTimeline] cue",o.index,"has a non-finite endTime:",o.endTime):o.endTime<=o.time&&console.error("[LyricTimeline] cue",o.index,"endTime ("+o.endTime+") is not > time ("+o.time+")")),o.group!==void 0&&o.group!==null&&typeof o.group!="number"&&typeof o.group!="string"&&console.error("[LyricTimeline] cue",o.index,"has an invalid group id:",o.group);Je.setTimingData(n.lyrics),zt&&(zt.loadedCues=n.lyrics.length),JSON.stringify(n.lyrics)!==e&&console.error("[LyricTimeline] setTimingData() mutated the raw source cues array — this must never happen.");const i=Je.resolveDesignScore(n.lyrics),s=new Set;for(const o of i)for(const a of o.sourceCueIndices)s.add(a);for(const o of n.lyrics||[])s.has(o.index)||console.error("[LyricTimeline] raw cue",o.index,"disappeared during grouping/resolution.");const r=i.find(o=>o.group===1);r&&(r.sourceCueIndices.length!==2||r.sourceCueIndices[0]!==18||r.sourceCueIndices[1]!==19)&&console.error("[LyricTimeline] group 1 resolved to",r.sourceCueIndices,"instead of the expected [18, 19]."),Je.timingErrors.length>0&&console.error("[LyricTimeline] phrase score has unresolved phrases:",Je.timingErrors);for(let o=0;o<Je.events.length;o++){const a=Je.events[o];o>0&&a.triggerTime<Je.events[o-1].triggerTime&&console.error("[LyricTimeline] scheduled phrases are NOT sorted by triggerTime at",Je.events[o-1].id,"->",a.id),Number.isFinite(a.triggerTime)||console.error('[LyricTimeline] phrase "'+a.id+'": triggerTime is not finite'),Number.isFinite(a.endTime)||console.error('[LyricTimeline] phrase "'+a.id+'": endTime is not finite'),a.endTime<=a.firstVocalTime&&console.error('[LyricTimeline] phrase "'+a.id+'": endTime does not exceed its own firstVocalTime'),a.endTime<=a.triggerTime&&console.error('[LyricTimeline] phrase "'+a.id+'": endTime does not exceed triggerTime')}}).catch(n=>console.error("[LyricTimeline] failed to load timing JSON:",Pa,n));const ic=Hi("audio"),US=encodeURI("./audio/saikai-2026-02-22EngLast.mp3"),OS=encodeURI("./audio/saikai-2026-01-20m伴奏.mp3"),it=ic?new Zx(US):null;let Jt=null;const ir=new Vh(16773856,3);hi.add(ir,ir.target);const BS=new _p(12575999,2376270,1.1);hi.add(BS);const dr=new Vh(14673648,0);hi.add(dr,dr.target);function xo(n,e){const t=new ui(n,e,{type:xi,minFilter:Mt,magFilter:Mt,depthBuffer:!0});return t.depthTexture=new En(n,e),t.depthTexture.type=vi,t}let Gn=xo(An(),Cn()),nr=xo(An(),Cn());ne.uniforms.uRefractionTex.value=Gn.texture;ne.uniforms.uDepthTex.value=Gn.depthTexture;const Qe=new ax(Qt,An(),Cn(),Zt,ur.deepColor),gt=new lx(Qt,An(),Cn(),{scale:.5}),yd={strength:.5};function nc(n){gt.enabled=n;const e=n?.25:1;Si.uniforms.uCloudCover.value=e,ne.uniforms.uCloudCover.value=e,n||(ne.uniforms.uCloudShadow.value=0)}function Qn(){ud(),Si.setSun(Zt),ne.setSun(Zt),Pi.setSun(Zt),tn.setSun(Zt),Qe.underwaterMat.uniforms.uSunDir.value.copy(Zt),gt.setSun(Zt),ir.position.copy(Zt).multiplyScalar(300),ir.target.position.set(0,0,0),ir.intensity=.6+3*Math.max(Zt.y,0)}function fr(){hd(),Si.setMoon(Un),ne.setMoon(Un),Pi.setMoon(Un),tn.setMoon(Un),gt.setMoon(Un),dr.position.copy(Un).multiplyScalar(300),dr.target.position.set(0,0,0)}const Co={"Tropical Noon":{sun:{el:60,az:125},amplitude:.7,choppy:.5,speed:1,waveCount:26,exposure:1.05,bloom:.5,clarity:1.3,depthFalloff:.16,sunGlitter:0,sss:.35,deep:"#063049",shallow:"#5fc6c2",foam:"#f6fdff",foamCoverage:.9,crestFoamStart:1.4,fog:1,shafts:.05,roughness:.06,cloudCoverage:.34,saturation:1.08},"Golden Hour":{sun:{el:8,az:205},amplitude:.9,choppy:.6,speed:.9,waveCount:26,exposure:1.15,bloom:.95,clarity:1,depthFalloff:.18,sunGlitter:.55,sss:.55,deep:"#08283b",shallow:"#3f9f9a",foam:"#fff1df",foamCoverage:.85,crestFoamStart:1.5,fog:1,shafts:.06,roughness:.09,cloudCoverage:.45,saturation:1.1},"Crimson Sunset":{sun:{el:1.5,az:250},amplitude:1,choppy:.7,speed:.95,waveCount:24,exposure:1.2,bloom:1.15,clarity:.9,depthFalloff:.2,sunGlitter:.6,sss:.5,deep:"#0e1524",shallow:"#33707a",foam:"#ffe4cf",foamCoverage:.9,crestFoamStart:1.4,fog:1.1,shafts:.05,roughness:.11,cloudCoverage:.52,saturation:1.12},"Blue Hour":{sun:{el:2.5,az:292},amplitude:.6,choppy:.5,speed:.8,waveCount:24,exposure:.9,bloom:.6,clarity:1,depthFalloff:.2,sunGlitter:.4,sss:.3,deep:"#050f1e",shallow:"#295a72",foam:"#dbe8f2",foamCoverage:.9,crestFoamStart:1.5,fog:1.1,shafts:.04,roughness:.08,cloudCoverage:.42,saturation:1},"Clear Dawn":{sun:{el:14,az:95},amplitude:.55,choppy:.45,speed:.85,waveCount:26,exposure:1.05,bloom:.7,clarity:1.4,depthFalloff:.15,sunGlitter:.45,sss:.4,deep:"#073246",shallow:"#63c7c0",foam:"#eefaff",foamCoverage:.85,crestFoamStart:1.6,fog:1,shafts:.06,roughness:.06,cloudCoverage:.28,saturation:1.06},"Stormy Seas":{sun:{el:18,az:100},amplitude:1.8,choppy:1.05,speed:1.6,waveCount:32,exposure:.95,bloom:.4,clarity:.7,depthFalloff:.22,sunGlitter:.2,sss:.25,deep:"#0a1a20",shallow:"#38666a",foam:"#eef3f5",foamCoverage:1.05,crestFoamStart:1.3,fog:1.35,shafts:.05,roughness:.22,cloudCoverage:.7,cloudDensity:1.5,saturation:.92},"Clear Sky":{sun:{el:55,az:130},amplitude:.55,choppy:.4,speed:.95,waveCount:26,exposure:1.1,bloom:.45,clarity:1.5,depthFalloff:.13,sunGlitter:.15,sss:.4,deep:"#04405c",shallow:"#4fe0d8",foam:"#ffffff",foamCoverage:.85,crestFoamStart:1.6,fog:.9,shafts:.07,roughness:.05,cloudCoverage:0,saturation:1.1},"Sun Shower":{sun:{el:22,az:140},amplitude:.75,choppy:.55,speed:1,waveCount:26,exposure:1.05,bloom:.6,clarity:1.1,depthFalloff:.16,sunGlitter:.3,sss:.4,deep:"#063049",shallow:"#4bb0ac",foam:"#f4fbff",foamCoverage:.88,crestFoamStart:1.5,fog:1.05,shafts:.06,roughness:.1,cloudCoverage:.4,saturation:1.05,rain:!0}};function Ro(n,{skipSun:e=!1}={}){const t=Co[n];if(!t)return;const i=ne.uniforms;t.sun&&!e&&(ri.elevation=t.sun.el,ri.azimuth=t.sun.az);const s=(r,o)=>{o!==void 0&&(i[r].value=o)};s("uAmplitude",t.amplitude),s("uChoppy",t.choppy),s("uSpeed",t.speed),s("uWaveCount",t.waveCount),s("uClarity",t.clarity),s("uDepthFalloff",t.depthFalloff),s("uSunGlitter",t.sunGlitter),s("uSSSStrength",t.sss),s("uRoughness",t.roughness),s("uFoamCoverage",t.foamCoverage),s("uCrestFoamStart",t.crestFoamStart),t.deep&&i.uDeepColor.value.set(t.deep),t.shallow&&i.uShallowColor.value.set(t.shallow),t.foam&&i.uFoamColor.value.set(t.foam),t.exposure!==void 0&&(Qe.compositeMat.uniforms.uExposure.value=t.exposure),t.bloom!==void 0&&(Qe.compositeMat.uniforms.uBloom.value=t.bloom),t.saturation!==void 0&&(Qe.compositeMat.uniforms.uSaturation.value=t.saturation),t.fog!==void 0&&(Qe.underwaterMat.uniforms.uFogStrength.value=t.fog),t.shafts!==void 0&&(Qe.underwaterMat.uniforms.uShaftDensity.value=t.shafts),t.cloudCoverage!==void 0&&(gt.uniforms.uCoverage.value=t.cloudCoverage),t.cloudDensity!==void 0&&(gt.uniforms.uDensity.value=t.cloudDensity),t.rain!==void 0&&Mn.setEnabled(t.rain),n==="Sun Shower"&&Zn&&st&&(st.colorMode="rainbow",st.rainbowSaturation=1,Ie.setColorMode("rainbow"),Ie.setRainbowSaturation(1)),Qn(),bd.preset=n,kS(),ft.controllersRecursive().forEach(r=>r.updateDisplay())}const ah={"Stormy Seas":.1};function zS(){const n=Object.keys(Co),e=n.reduce((i,s)=>i+(ah[s]??1),0);let t=Math.random()*e;for(const i of n){const s=ah[i]??1;if(t<s)return i;t-=s}return n[n.length-1]}function Rl(){if(!Ed.enabled||Ao||Kn)return;const n=nn&&!!ht&&(ht.autoPlay||ht.showTime);Ro(zS(),{skipSun:n})}const ft=new Yl({title:"Ocean"});ft.domElement.classList.add("editor-ui");const Md=[];function kS(){for(const n of Md)n.proxy.c="#"+n.uniform.value.getHexString(),n.ctrl.updateDisplay()}const sc=ft.addFolder("Cinematic").close(),bd={preset:"Tropical Noon"};sc.add(bd,"preset",Object.keys(Co)).name("preset").onChange(Ro);sc.add({cinema:!1},"cinema").name("cinematic camera").onChange(n=>et.autoRotate=n);const Ed={enabled:!0};sc.add(Ed,"enabled").name("Random Weather");const wd=ft.addFolder("Time of day").close();wd.add(ri,"elevation",-3,89,.5).name("sun elevation").onChange(Qn);wd.add(ri,"azimuth",0,360,1).name("sun azimuth").onChange(Qn);const Ds=ft.addFolder("Waves").close();Ds.add(ne.uniforms.uAmplitude,"value",.1,3.5,.05).name("amplitude");Ds.add(ne.uniforms.uChoppy,"value",0,1.4,.02).name("choppiness");Ds.add(ne.uniforms.uWaveCount,"value",4,40,1).name("wave count");Ds.add(ne.uniforms.uSpeed,"value",0,3,.05).name("speed");Ds.add(ne.uniforms.uDirSpread,"value",0,1.6,.02).name("direction spread");Ds.add({wl:ur.baseWavelength},"wl",40,320,5).name("swell length").onChange(n=>ne.uniforms.uBaseFreq.value=2*Math.PI/n);function Po(n,e,t){const i={c:"#"+e.value.getHexString()},s=n.addColor(i,"c").name(t).onChange(r=>e.value.set(r));Md.push({ctrl:s,proxy:i,uniform:e})}const Ls=ft.addFolder("Surface").close();Ls.add(ne.uniforms.uDetailStrength,"value",0,1.2,.02).name("ripple detail");Ls.add(ne.uniforms.uDetailScale,"value",.05,1.2,.01).name("ripple scale");Ls.add(ne.uniforms.uRefractStrength,"value",0,.12,.005).name("refraction");Ls.add(ne.uniforms.uSSRStrength,"value",0,1,.02).name("reflections (SSR)");Ls.add(ne.uniforms.uSunGlitter,"value",0,1,.02).name("sun glitter");Ls.add(ne.uniforms.uRoughness,"value",.02,.5,.01).name("micro roughness");const Is=ft.addFolder("Water & colour").close();Is.add(ne.uniforms.uClarity,"value",.3,3,.05).name("clarity");Is.add(ne.uniforms.uDepthFalloff,"value",.03,.5,.01).name("depth falloff");Is.add(ne.uniforms.uSSSStrength,"value",0,1.5,.02).name("translucency");Po(Is,ne.uniforms.uShallowColor,"shallow");Po(Is,ne.uniforms.uDeepColor,"deep");Po(Is,ne.uniforms.uFoamColor,"foam");const jn=ft.addFolder("Foam").close();jn.add(ne.uniforms.uFoamCoverage,"value",0,2,.05).name("coverage");jn.add(ne.uniforms.uFoamEdge,"value",.02,.45,.01).name("softness / layers");jn.add(ne.uniforms.uFoamOpacity,"value",.3,1,.02).name("opacity");jn.add(ne.uniforms.uCrestFoamStart,"value",.3,3,.05).name("whitecap onset");jn.add(ne.uniforms.uFoamThreshold,"value",0,1,.02).name("breaking foam");jn.add(ne.uniforms.uShoreFoamWidth,"value",0,8,.1).name("shore foam width");jn.add(ne.uniforms.uContactFoam,"value",0,2,.05).name("object foam / wakes");const di=ft.addFolder("Volumetric clouds").close(),kt=gt.uniforms;di.add({on:!0},"on").name("enabled").onChange(nc);di.add(kt.uSteps,"value",16,80,2).name("quality (steps)");di.add(kt.uCoverage,"value",.1,.95,.01).name("coverage");di.add(kt.uDensity,"value",.2,3,.05).name("density");di.add(kt.uNoiseScale,"value",.002,.02,5e-4).name("cloud size (inv)");di.add(kt.uHeightFalloff,"value",0,1,.02).name("roundness");di.add(kt.uDetail,"value",0,1,.02).name("wispiness");di.add(kt.uBase,"value",120,900,10).name("altitude");di.add(kt.uHeight,"value",100,700,10).name("thickness");di.add(kt.uWindSpeed,"value",0,.15,.005).name("wind speed");di.add(kt.uSunStrength,"value",.5,6,.1).name("sun strength");di.add(kt.uAmbient,"value",0,1.2,.02).name("ambient");di.add(yd,"strength",0,1,.02).name("sea shadows");const Td=ft.addFolder("Underwater").close();Td.add(Qe.underwaterMat.uniforms.uShaftDensity,"value",0,.2,.005).name("god-ray density");Td.add(Qe.underwaterMat.uniforms.uFogStrength,"value",0,2,.05).name("fog strength");const Rn=ft.addFolder("Post").close();Rn.add(Qe.compositeMat.uniforms.uExposure,"value",.3,2,.02).name("exposure");Rn.add(Qe.compositeMat.uniforms.uBloom,"value",0,2,.02).name("bloom");Rn.add(Qe,"bloomStreak",0,1,.02).name("anamorphic streak");Rn.add(Qe.compositeMat.uniforms.uSaturation,"value",.5,1.6,.02).name("saturation");Rn.add(Qe.compositeMat.uniforms.uContrast,"value",.8,1.3,.01).name("contrast");Rn.add(Qe.compositeMat.uniforms.uGrain,"value",0,.2,.005).name("film grain");Rn.add(Qe.compositeMat.uniforms.uCA,"value",0,2,.05).name("lens fringe");Rn.add(Qe.compositeMat.uniforms.uVignetteAir,"value",0,.6,.02).name("vignette");if(Ao){const n=ft.addFolder("Cinematic Sunset");n.add(ne.uniforms.uSunsetAmount,"value",0,1,.01).name("Sunset Amount"),n.add(ne.uniforms.uSunsetOceanWarmth,"value",0,1,.01).name("Ocean Warmth"),n.add(ne.uniforms.uSunsetSunFocus,"value",0,1,.01).name("Sun Path"),n.add(ne.uniforms.uSunsetGlitterBoost,"value",0,1,.01).name("Glitter Boost"),n.add(ne.uniforms.uSunsetHorizonWarmth,"value",0,1,.01).name("Horizon Warmth"),Po(n,ne.uniforms.uSunsetTint,"Sunset Tint")}function Do(n){ne.uniforms.uMoonIntensity.value=n,Si.uniforms.uMoonIntensity.value=n,tn.uniforms.uMoonIntensity.value=n,Pi.uniforms.uMoonIntensity.value=n,dr.intensity=Kn||nn?n*.5:0}function Lo(n){ne.uniforms.uStarVisibility.value=n,Si.uniforms.uStarVisibility.value=n}function $i(n,e,t){const i=Math.min(Math.max((t-n)/(e-n),0),1);return i*i*(3-i*2)}const So=["day","golden","sunset","twilight","night"],HS={day:40,golden:8,sunset:-2,twilight:-10,night:-30},VS={day:25,golden:10,sunset:6,twilight:8,night:15};function GS(n){const e={};let t=0;for(const i of So){const s=(n-HS[i])/VS[i];e[i]=Math.exp(-s*s),t+=e[i]}if(t>0)for(const i of So)e[i]/=t;return e}function Ei(n,e){let t=0;for(const i of So)t+=n[i]*e[i];return t}const Qr=new de;function Ks(n,e,t){let i=0,s=0,r=0;for(const o of So)Qr.set(e[o]),i+=n[o]*Qr.r,s+=n[o]*Qr.g,r+=n[o]*Qr.b;t.setRGB(i,s,r)}const lh={day:"#063049",golden:"#08283b",sunset:"#0e1524",twilight:"#0a1220",night:"#020509"},WS={day:"#5fc6c2",golden:"#3f9f9a",sunset:"#33707a",twilight:"#1c3550",night:"#0a1830"},XS={day:"#f6fdff",golden:"#fff1df",sunset:"#ffe4cf",twilight:"#c7d3e0",night:"#c9d6e6"},YS={day:.35,golden:.55,sunset:.5,twilight:.25,night:.06},qS={day:0,golden:.55,sunset:.6,twilight:.3,night:.05},$S={day:.06,golden:.09,sunset:.11,twilight:.12,night:.1},KS={day:1.4,golden:1.5,sunset:1.4,twilight:1.5,night:1.6},ZS={day:3,golden:3.2,sunset:2.6,twilight:1.2,night:.3},JS={day:.85,golden:.9,sunset:.85,twilight:.6,night:.35},QS={day:.05,golden:.06,sunset:.05,twilight:.03,night:.01},jS={day:1,golden:1,sunset:1.1,twilight:.8,night:.5},ey={day:1.05,golden:1.15,sunset:1.2,twilight:1,night:vd},ty={day:.5,golden:.95,sunset:1,twilight:.7,night:xd},iy={day:1.08,golden:1.1,sunset:1.12,twilight:1,night:1},ny={day:"#fbf6ea",golden:"#fff0d2",sunset:"#ffe9c9",twilight:"#eef1f5",night:"#e3ecf7"},ch=new de,sy=65,ry=70,oy=240,ay=50,ly=255,cy=-60,uy=.85,hy=ec;function dy(n,e){const t=$i(-14,4,n)*(1-$i(4,14,n)),i=1/Math.max(1,e);return 1-t*(1-i)}const uh=1/86400,fy=.3;function py(n){const e=Math.min(Math.max(n,0),1);return uh*Math.pow(fy/uh,e)}let rc=.5;function As(n){const e=Math.min(Math.max(n,0),1);rc=e,ri.elevation=sy*Math.sin(2*Math.PI*(e-.25)),ri.azimuth=ry+e*oy,Sn.elevation=ay*Math.sin(2*Math.PI*(e+.25)),Sn.azimuth=ly+e*cy;const t=ri.elevation,i=Sn.elevation,s=$i(-14,4,t)*(1-$i(4,14,t))*uy,r=$i(-2,-18,t),o=$i(-5,5,i)*(1-$i(0,25,t)),a=r*hy;gt.setNightAmount(r),Qn(),fr();const l=GS(t);Ks(l,lh,ne.uniforms.uDeepColor.value),Ks(l,WS,ne.uniforms.uShallowColor.value),Ks(l,XS,ne.uniforms.uFoamColor.value),ne.uniforms.uSSSStrength.value=Ei(l,YS),ne.uniforms.uSunGlitter.value=Ei(l,qS),ne.uniforms.uRoughness.value=Ei(l,$S),ne.uniforms.uCrestFoamStart.value=Ei(l,KS),ne.uniforms.uSunsetAmount.value=s,ne.uniforms.uNightAmount.value=r,Si.uniforms.uNightAmount.value=r,tn.uniforms.uNightAmount.value=r,Pi.uniforms.uNightAmount.value=r,Do(jl*o),Lo(a),gt.uniforms.uMoonWeight.value=Sd*o,gt.uniforms.uSunStrength.value=Ei(l,ZS),gt.uniforms.uAmbient.value=Ei(l,JS),Qe.underwaterMat.uniforms.uShaftDensity.value=Ei(l,QS),Qe.underwaterMat.uniforms.uFogStrength.value=Ei(l,jS),Ks(l,lh,Qe.underwaterMat.uniforms.uDeepColor.value),Qe.compositeMat.uniforms.uExposure.value=Ei(l,ey),Qe.compositeMat.uniforms.uBloom.value=Ei(l,ty),Qe.compositeMat.uniforms.uSaturation.value=Ei(l,iy),Ie&&(Ks(l,ny,ch),Ie.setTint(ch)),ht&&(ht.time=e)}let ht=null,js=null;if(Kn){const n=ft.addFolder("Night");n.add(Sn,"elevation",-10,89,.5).name("Moon Elevation").onChange(fr),n.add(Sn,"azimuth",0,360,1).name("Moon Azimuth").onChange(fr),n.add({v:jl},"v",0,3,.05).name("Moon Intensity").onChange(Do),n.add(ne.uniforms.uMoonPathFocus,"value",0,1,.01).name("Moon Path"),n.add({v:ec},"v",0,1,.01).name("Star Visibility").onChange(Lo),n.add(Qe.compositeMat.uniforms.uExposure,"value",.2,1.5,.01).name("Night Exposure"),n.add(gt.uniforms.uMoonWeight,"value",0,2,.02).name("Cloud Moonlight")}if(nn){ht={time:rc,autoPlay:!1,speed:0,sunsetStretch:4.4,showTime:!0,clockFontFamily:'Georgia, "Times New Roman", serif'};const n=ft.addFolder("Day Animation");js=n.add(ht,"time",0,1,.001).name("Time").onChange(As);const e=n.add(ht,"autoPlay").name("Auto Play").onChange(s=>{s&&ht.showTime&&(ht.showTime=!1,i.updateDisplay(),Ea.hidden=!0)}),t=n.add(ht,"speed",0,1,.005).name("Speed");n.add(ht,"sunsetStretch",1,8,.1).name("Sunrise/Sunset Length");const i=n.add(ht,"showTime").name("Show Time").onChange(s=>{s&&(ht.autoPlay=!1,e.updateDisplay(),ht.speed=0,t.updateDisplay()),Ea.hidden=!s});n.add(ht,"clockFontFamily").name("Clock Font").onChange(s=>{vS.style.fontFamily=s}),Ea.hidden=!ht.showTime}if(Zn){st={colorMode:"gold",headColor:"#66e0ff",youngColor:"#66e0ff",midColor:"#3366ff",oldColor:"#8b5cf6",rainbowSpeed:.15,rainbowSaturation:.8,brightness:1,particleBloom:1,headBloom:1,emissionRate:Ie.emissionRate,speed:Ie.speed,paused:!1,follow:!0,meanderStrength:0};const n=ft.addFolder("Head Particle Trail");n.add({restart:()=>Ie.restart()},"restart").name("Restart"),n.add(st,"paused").name("Pause").onChange(t=>Ie.setPaused(t)),n.add(st,"colorMode",["gold","custom","rainbow"]).name("Color Mode").onChange(t=>Ie.setColorMode(t)),n.addColor(st,"headColor").name("Head Color").onChange(t=>Ie.setHeadColor(t)),n.addColor(st,"youngColor").name("Young Color").onChange(t=>Ie.setYoungColor(t)),n.addColor(st,"midColor").name("Mid Color").onChange(t=>Ie.setMidColor(t)),n.addColor(st,"oldColor").name("Old Color").onChange(t=>Ie.setOldColor(t)),n.add(st,"rainbowSpeed",0,1,.01).name("Rainbow Speed").onChange(t=>Ie.setRainbowSpeed(t)),n.add(st,"rainbowSaturation",0,1,.01).name("Rainbow Saturation").onChange(t=>Ie.setRainbowSaturation(t)),n.add(st,"brightness",.2,2,.05).name("Brightness").onChange(t=>Ie.setBrightness(t)),n.add(st,"particleBloom",0,2.5,.05).name("Particle Bloom").onChange(t=>Ie.setParticleBloom(t)),n.add(st,"headBloom",.2,2.5,.05).name("Head Bloom").onChange(t=>Ie.setHeadBloom(t)),n.add(st,"emissionRate",40,300,5).name("Emission Rate").onChange(t=>Ie.setEmissionRate(t)),n.add(st,"speed",.05,5,.05).name("Travel Speed").onChange(t=>{Ie.speed=t}),n.add(st,"meanderStrength",0,2,.05).name("Meander Strength").onChange(t=>Ie.setMeanderStrength(t)),n.add(st,"follow").name("Follow Camera").onChange(t=>{qi.inited=!1,t||(et.enabled=!0)}),Ie.setColors({head:st.headColor,young:st.youngColor,mid:st.midColor,old:st.oldColor}),wi={enabled:!1,steeringInterval:5,verticalAmplitude:6,verticalPeriod:20};const e=ft.addFolder("Free Navigation");e.add(wi,"enabled").name("Free Navigation"),e.add(wi,"steeringInterval",1,20,.5).name("Steering Interval"),e.add(wi,"verticalAmplitude",0,30,.5).name("Vertical Amplitude"),e.add(wi,"verticalPeriod",2,60,.5).name("Vertical Period")}if(tc){Rt={enabled:Le.enabled,auto:Le.auto,cameraMode:Le.cameraMode,seed:Le.seed,minShotDuration:Le.minShotDuration,maxShotDuration:Le.maxShotDuration,transitionTime:Le.transitionTime,allowCuts:Le.allowCuts,paused:Le.paused};const n=ft.addFolder("Auto Director");n.add(Rt,"enabled").name("Enabled").onChange(e=>{Le.enabled=e,e||(qi.inited=!1,et.enabled=!(st&&st.follow))}),n.add(Rt,"auto").name("Auto").onChange(e=>{Le.auto=e}),n.add(Rt,"cameraMode",Kl.presetLabels).name("Camera Mode").listen().onChange(e=>{Le.setMode(e,void 0,He.position,et.target)}),n.add(Rt,"seed",0,99999,1).name("Seed").onChange(e=>{Le.seed=e>>>0,Le.restart()}),n.add(Rt,"minShotDuration",1,15,.5).name("Min Shot Duration").onChange(e=>{Le.minShotDuration=e}),n.add(Rt,"maxShotDuration",1,20,.5).name("Max Shot Duration").onChange(e=>{Le.maxShotDuration=e}),n.add(Rt,"transitionTime",.1,4,.1).name("Transition Time").onChange(e=>{Le.transitionTime=e}),n.add(Rt,"allowCuts").name("Allow Cuts").onChange(e=>{Le.allowCuts=e}),n.add(Rt,"paused").name("Pause").onChange(e=>{Le.paused=e}),n.add({next:()=>Le.requestNextShot(He.position,et.target)},"next").name("Next Shot")}if(Jn){zt={enabled:Je.enabled,time:0,paused:Je.paused,speed:Je.speed,currentEvent:"(none yet)",timingSource:"Manual JSON",loadedCues:0};const n=ft.addFolder("Lyric Timeline");n.add(zt,"enabled").name("Enabled").onChange(s=>{Je.enabled=s}),n.add(zt,"time",0,315,.05).name("Time").listen().onChange(s=>Je.setTime(s)),n.add(zt,"paused").name("Pause").onChange(s=>Je.setPaused(s)),n.add(zt,"speed",.1,3,.05).name("Playback Speed").onChange(s=>{Je.speed=s}),n.add(zt,"currentEvent").name("Current Event").listen().disable(),n.add(zt,"timingSource").name("Timing Source").disable(),n.add(zt,"loadedCues").name("Loaded Cues").listen().disable(),n.add({restart:()=>Je.restart()},"restart").name("Restart"),n.add({next:()=>{const s=Je.getNextEvent();s&&Je.setTime(s.triggerTime)}},"next").name("Next Event");const e={textColor:"#ffffff",shadowColor:"#302a79",shadowStrength:2,outlineWidth:0,outlineColor:"#000000",fontFamily:'Georgia, "Times New Roman", serif',leaveDuration:.2,dissolveDuration:1.2,particleCount:650},t=ft.addFolder("Trail Lyrics Style");t.addColor(e,"textColor").name("Text Color").onChange(s=>vt.setGlyphStyle({textColor:s})),t.addColor(e,"shadowColor").name("Shadow Color").onChange(s=>vt.setGlyphStyle({shadowColor:s})),t.add(e,"shadowStrength",0,2,.05).name("Shadow Strength").onChange(s=>vt.setGlyphStyle({shadowStrength:s})),t.add(e,"outlineWidth",0,8,.5).name("Outline Width").onChange(s=>vt.setGlyphStyle({outlineWidth:s})),t.addColor(e,"outlineColor").name("Outline Color").onChange(s=>vt.setGlyphStyle({outlineColor:s})),t.add(e,"fontFamily").name("Font Family").onFinishChange(s=>vt.setGlyphStyle({fontFamily:s})),t.add(e,"leaveDuration",0,5,.1).name("Leave Duration").onChange(s=>vt.setPhraseTiming({leaveDuration:s})),t.add(e,"dissolveDuration",0,5,.1).name("Dissolve Duration").onChange(s=>vt.setPhraseTiming({dissolveDuration:s})),t.add(e,"particleCount",50,650,10).name("Particle Count").onChange(s=>vt.setParticleCount(s)),vt.setGlyphStyle({...e}),vt.setPhraseTiming({leaveDuration:e.leaveDuration,dissolveDuration:e.dissolveDuration}),vt.setParticleCount(e.particleCount);const i=new Map;Cl=s=>{const r=new Set;for(const o of s){r.add(o.id);let a=i.get(o.id);a||(a=document.createElement("div"),a.className="hold-lyric-item",pS.appendChild(a),i.set(o.id,a)),a.style.left=o.x/100*window.innerWidth+"px",a.style.top=o.y/100*window.innerHeight+"px",a.style.opacity=o.alpha.toFixed(3),a.textContent=o.text,a.style.color=e.textColor,a.style.webkitTextStroke=e.outlineWidth>0?`${(e.outlineWidth*.35).toFixed(2)}px ${e.outlineColor}`:"0",a.style.textShadow=`0 2px 10px ${e.shadowColor}, 0 1px 3px ${e.shadowColor}`,a.style.fontFamily=e.fontFamily;const l=o.heightPercent/100*window.innerHeight,c=o.widthPercent/100*window.innerWidth,h=o.text.split(`
`).length,d=l/h;a.style.width=c+"px",a.style.lineHeight=d+"px",a.style.fontSize=d*.8+"px"}for(const[o,a]of i)r.has(o)||(a.remove(),i.delete(o))}}if(ic){let e=function(){wa.classList.toggle("is-playing",!it.paused)};var xy=e;Jt={loaded:!1,playing:!1,time:0,volume:it.volume,syncLyrics:!!Jn};const n=ft.addFolder("Audio");n.add(Jt,"loaded").name("Loaded").listen().disable(),n.add(Jt,"playing").name("Play / Pause").listen().onChange(l=>{l?it.play():it.pause()}),n.add({restart:()=>{it.restart(),Rl()}},"restart").name("Restart"),n.add(Jt,"time",0,315,.1).name("Time").listen().onChange(l=>it.setTime(l)),n.add(Jt,"volume",0,1,.01).name("Volume").onChange(l=>{it.setVolume(l)}),n.add(Jt,"syncLyrics").name("Sync Lyrics").listen().onChange(l=>{Jt.syncLyrics=l}),Kr.hidden=!1,MS.addEventListener("click",()=>{ju&&ju.checked&&it.setSrc(OS),it.play(),Kr.classList.add("dismissed"),setTimeout(()=>{Kr.hidden=!0},550)}),wa.hidden=!1,e(),it.audio.addEventListener("play",e),it.audio.addEventListener("pause",e),wa.addEventListener("click",()=>{it.paused?it.play():it.pause()});let t=!1;Ta.hidden=!1,Ta.addEventListener("click",()=>{t=!t,Ta.classList.toggle("is-active",t)}),it.audio.addEventListener("ended",()=>{t&&(it.restart(),it.play(),Rl())});const i=400,s=24;let r=0,o=0,a=0;window.addEventListener("pointerdown",l=>{r=l.clientX,o=l.clientY,a=performance.now()}),window.addEventListener("pointerup",l=>{if(!Kr.hidden||l.target.closest&&l.target.closest("button, input, select, textarea, .lil-gui, .editor-ui"))return;const c=performance.now()-a,h=Math.hypot(l.clientX-r,l.clientY-o);c>i||h>s||(it.paused?it.play():it.pause())})}ft.add({dive:()=>oc(-12)},"dive").name("▼ dive under");ft.add({surface:()=>oc(14)},"surface").name("▲ back to surface");function oc(n){const e=He.position.clone(),t=et.target.clone(),i=new C(e.x,n,e.z),s=new C(t.x,n<0?n-4:2,t.z);let r=0;(function o(){r=Math.min(1,r+.02);const a=r*r*(3-2*r);He.position.lerpVectors(e,i,a),et.target.lerpVectors(t,s,a),r<1&&requestAnimationFrame(o)})()}function ac(){const n=An(),e=Cn();He.aspect=n/e,He.updateProjectionMatrix(),Qt.setSize(n,e),Gn.dispose(),nr.dispose(),Gn=xo(n,e),nr=xo(n,e),ne.uniforms.uRefractionTex.value=Gn.texture,ne.uniforms.uDepthTex.value=Gn.depthTexture,ne.setResolution(n,e),Qe.setSize(n,e),gt.setSize(n,e)}window.addEventListener("resize",ac);window.visualViewport&&window.visualViewport.addEventListener("resize",ac);window.addEventListener("orientationchange",ac);let hh=performance.now(),mi=0,dh=0;const fh=new qe,Da=new C,my=new C,gy=new C,_y=new C,vy=new C(0,1,0);function ph(n,e){e?(ne.mesh.visible=!1,Si.mesh.visible=!0,Pi.mesh.visible=!0,vo.points.visible=!1,Mn.mesh.visible=!1):(ne.mesh.visible=!0,Si.mesh.visible=!n,Pi.mesh.visible=!0,vo.points.visible=n,Mn.mesh.visible=Mn.enabled&&!n)}function Ad(){requestAnimationFrame(Ad);const n=performance.now(),e=Math.min((n-hh)/1e3,.05);if(mi+=e,hh=n,nn&&ht.showTime){const l=new Date,c=l.getHours()*3600+l.getMinutes()*60+l.getSeconds();ht.time=c/86400,As(ht.time),js&&js.updateDisplay(),_S.textContent=`${l.getFullYear()}/${l.getMonth()+1}/${l.getDate()}`,xS.textContent=String(l.getHours()).padStart(2,"0"),yS.textContent=String(l.getMinutes()).padStart(2,"0"),SS.style.opacity=Math.floor(l.getTime()/1e3)%2===0?"1":"0"}else if(nn&&ht.autoPlay){const l=dy(ri.elevation,ht.sunsetStretch);ht.time=(ht.time+e*py(ht.speed)*l)%1,As(ht.time),js&&js.updateDisplay()}const t=!!(Le&&Le.enabled);Ie&&st?et.enabled=!st.follow&&!t:t&&(et.enabled=!1),et.update();const i=ne.heightAt(He.position.x,He.position.z,mi),s=He.position.y<i-.15;if(He.position.y<-_o+3&&(He.position.y=-_o+3),ne.update(mi,He),Pi.update(mi,He),tn.update(mi),vo.update(mi,He),Si.update(He,mi),Ie){yn&&(Fn+=hr*eh*Ie.speed*e),Al!==0&&(Fn+=Al*eh*Ie.speed*e),Fn=Math.min(AS,Math.max(TS,Fn));const l=!!(wi&&wi.enabled);let c=0;l&&(nh||(Ra=0,Ca=Zr[Math.floor(Math.random()*Zr.length)],Jr=wi.steeringInterval),Jr-=e,Jr<=0&&(Ca=Zr[Math.floor(Math.random()*Zr.length)],Jr+=wi.steeringInterval),Ra+=e*(Math.PI*2/Math.max(.001,wi.verticalPeriod)),c=wi.verticalAmplitude*Math.sin(Ra)),nh=l,Ie.setAltitudeOffset(Fn+c),Qu&&(Qu.textContent=(Fn>=0?"+":"")+Fn.toFixed(1)+" / "+(hr>0?"UP":"DOWN"));const h=l?Ca:(xn?-1:0)+(Xn?1:0);if(Ie.setManualTurnInput(h),Ie.update(e,mi,ne,He.position),ne.uniforms.uTravelerHeadPos.value.copy(Ie.getHeadPosition(Da)),ne.uniforms.uTravelerGlowIntensity.value=1,ne.uniforms.uTravelerGlowColor.value.copy(Ie.waterGlintColor),st&&st.follow&&!t){et.enabled=!1;const d=Ie.getHeadPosition(Da),u=Ie.travelDir,p=_y.crossVectors(u,vy);p.lengthSq()<1e-6?p.set(1,0,0):p.normalize();const g=my.copy(d).addScaledVector(u,-22).addScaledVector(p,18);g.y+=10;const x=gy.copy(d).addScaledVector(u,8).addScaledVector(p,-5);if(!qi.inited)He.position.copy(g),qi.look.copy(x),qi.inited=!0;else{const m=1-Math.pow(8e-4,e);He.position.lerp(g,m),qi.look.lerp(x,m)}He.lookAt(qi.look),et.target.copy(qi.look)}}if(Le){const l=vt?vt.getNewestActivePhrase():null;Le.update(e,Ie,l,He,ne,mi),Rt&&(Rt.cameraMode=Le.cameraMode),t&&Ie&&et.target.copy(Ie.getHeadPosition(Da))}if(Mn.update(mi,He),it&&Jt&&(Jt.loaded=it.loaded,Jt.playing=!it.paused,Jt.time=it.currentTime),Je&&(!!(it&&Jt&&Jt.syncLyrics)?Je.setTime(it.currentTime):Je.update(e),oh&&oh.update(Je.time,_n?_n.lyrics:null),zt)){zt.time=Je.time;const c=Je.getActiveEvents(),h=c.length?c[c.length-1]:null,d=vt?vt.getNewestActivePhrase():null;zt.currentEvent=h?`${h.id} (${h.designType}/${h.runtimeType}) — ${d?d.getPhase():"?"}${c.length>1?` [+${c.length-1} more active]`:""}`:"(none yet)"}vt&&(vt.update(e,Ie,He,Je?Je.time:void 0),Cl&&Cl(vt.getHoldOverlays())),ne.uniforms.uCameraUnderwater.value=s?1:0,ne.uniforms.uProjMatrix.value.copy(He.projectionMatrix),Qe.underwaterMat.uniforms.uTime.value=mi;const r=ne.uniforms;gt.enabled&&(r.uCloudShadow.value=yd.strength,r.uCloudPlaneY.value=kt.uBase.value+kt.uHeight.value*.5,r.uCloudScale.value=kt.uNoiseScale.value,r.uCloudCoverage.value=kt.uCoverage.value*(1-kt.uHeightFalloff.value*.5),r.uCloudDrift.value.copy(kt.uDrift.value)),Qt.setClearColor(ur.deepColor,1),s||(ph(s,!0),Qt.setRenderTarget(Gn),Qt.render(hi,He)),ph(s,!1),Qt.setRenderTarget(nr),Qt.render(hi,He),gt.enabled&&gt.render(e,He,nr.depthTexture);const o=Mn.enabled&&!s?$i(0,8,ri.elevation)*(1-$i(32,42,ri.elevation)):0;fh.multiplyMatrices(He.projectionMatrix,He.matrixWorldInverse).invert(),Qe.render(nr,{invProjView:fh,cameraPos:He.position,sunDir:Zt,time:mi,underwater:s,surfaceY:ur.surfaceY,cloudTexture:gt.enabled?gt.texture:null,rainbowStrength:o});const a=i-He.position.y;Ju.textContent=s?"BELOW":"ABOVE",Ju.style.color=s?"#7fe0d0":"#9be7ff",fS.textContent=(s?a:He.position.y).toFixed(1)+" m",dh++,dh===2&&(mn.classList.add("hidden"),dS.hidden=!1,setTimeout(()=>mn.remove(),1200))}window.OCEAN={camera:He,controls:et,diveTo:oc,sunParams:ri,applySun:Qn,applyPreset:Ro,PRESETS:Co,ocean:ne,floor:Pi,island:tn,post:Qe,clouds:gt,setCloudsEnabled:nc};Kn&&(window.OCEAN.moonParams=Sn,window.OCEAN.applyMoon=fr,window.OCEAN.setMoonIntensity=Do,window.OCEAN.setStarVisibility=Lo);nn&&(window.OCEAN.setTimeOfDay=As,Object.defineProperty(window.OCEAN,"timeOfDay",{get:()=>rc}));Zn&&(window.OCEAN.headParticleTrail=Ie,window.OCEAN.setHeadParticleTime=n=>{Ie.setTime(n),qi.inited=!1},window.OCEAN.setHeadParticlePaused=n=>Ie.setPaused(n),window.OCEAN.setHeadParticleEmissionRate=n=>Ie.setEmissionRate(n),window.OCEAN.setHeadParticleColorMode=n=>Ie.setColorMode(n),window.OCEAN.setHeadParticleColors=n=>Ie.setColors(n),window.OCEAN.setHeadParticleBrightness=n=>Ie.setBrightness(n),window.OCEAN.setHeadParticleBloom=n=>Ie.setParticleBloom(n),window.OCEAN.setHeadParticleHeadBloom=n=>Ie.setHeadBloom(n),window.OCEAN.setHeadParticleRainbowSpeed=n=>Ie.setRainbowSpeed(n),window.OCEAN.setHeadParticleRainbowSaturation=n=>Ie.setRainbowSaturation(n));tc&&(window.OCEAN.autoDirector=Le,window.OCEAN.setDirectorAuto=n=>{Le.auto=!!n,Rt&&(Rt.auto=Le.auto)},window.OCEAN.setDirectorMode=n=>{Le.setMode(n,void 0,He.position,et.target)},window.OCEAN.setDirectorSeed=n=>{Le.seed=n>>>0,Le.restart(),Rt&&(Rt.seed=Le.seed)},window.OCEAN.nextDirectorShot=()=>Le.requestNextShot(He.position,et.target));Jn&&(window.OCEAN.lyricTimeline=Je,Object.defineProperty(window.OCEAN,"lyricTimelineTime",{configurable:!0,get:()=>Je.time}),window.OCEAN.setLyricTimelineTime=n=>{Je.setTime(n),zt&&(zt.time=Je.time)},window.OCEAN.setLyricTimelinePaused=n=>{Je.setPaused(n),zt&&(zt.paused=Je.paused)},Object.defineProperty(window.OCEAN,"foreverMoreTiming",{configurable:!0,get:()=>_n}),Object.defineProperty(window.OCEAN,"lyricSourceCues",{configurable:!0,get:()=>_n?_n.lyrics:[]}),Object.defineProperty(window.OCEAN,"lyricPhrases",{configurable:!0,get:()=>Je.resolveDesignScore(_n?_n.lyrics:[])}),window.OCEAN.trailLyricsManager=vt,Object.defineProperty(window.OCEAN,"activeLyricPhrases",{configurable:!0,get:()=>vt.getActivePhrases()}),window.OCEAN.setActiveLyricLocalTimes=n=>{for(const e of vt.getActiveEntries())e.instance.setTime(n)});ic&&(window.OCEAN.audio=it,window.OCEAN.playAudio=()=>it.play(),window.OCEAN.pauseAudio=()=>it.pause(),window.OCEAN.setAudioTime=n=>it.setTime(n),window.OCEAN.setAudioSyncLyrics=n=>{Jt&&(Jt.syncLyrics=!!n)});Qn();nc(!0);Ao&&(Ro("Crimson Sunset"),ne.uniforms.uSunsetAmount.value=IS,ft.controllersRecursive().forEach(n=>n.updateDisplay()));if(Kn){gt.setNightAmount(1),ri.elevation=NS,Qn(),fr();const n=new de(14673648);ne.uniforms.uNightAmount.value=1,ne.uniforms.uMoonColor.value.copy(n),Si.uniforms.uNightAmount.value=1,Si.uniforms.uMoonColor.value.copy(n),tn.uniforms.uNightAmount.value=1,tn.uniforms.uMoonColor.value.copy(n),Pi.uniforms.uNightAmount.value=1,Pi.uniforms.uMoonColor.value.copy(n),Do(jl),Lo(ec),gt.setNightAmount(1),gt.uniforms.uMoonColor.value.copy(n),gt.uniforms.uMoonWeight.value=Sd,gt.uniforms.uSunStrength.value=.3,gt.uniforms.uAmbient.value=.35,He.position.set(10,3,48),et.target.set(0,2,0),et.update(),ne.uniforms.uDeepColor.value.set("#020509"),ne.uniforms.uShallowColor.value.set("#0a1830"),ne.uniforms.uFoamColor.value.set("#c9d6e6"),ne.uniforms.uSSSStrength.value=.06,ne.uniforms.uSunGlitter.value=.05,ne.uniforms.uCrestFoamStart.value=1.6,Qe.underwaterMat.uniforms.uShaftDensity.value=.01,Qe.underwaterMat.uniforms.uFogStrength.value=.5,Qe.underwaterMat.uniforms.uDeepColor.value.set("#020509"),Qe.compositeMat.uniforms.uExposure.value=vd,Qe.compositeMat.uniforms.uBloom.value=xd,Qe.compositeMat.uniforms.uSaturation.value=1,ft.controllersRecursive().forEach(e=>e.updateDisplay())}nn&&(As(ht.time),ft.controllersRecursive().forEach(n=>n.updateDisplay()));Zn&&(!nn&&!Kn&&!Ao&&As(.74),!nn&&!Kn&&(He.position.set(10,18,370),et.target.set(10,12,120),et.update()),ft.controllersRecursive().forEach(n=>n.updateDisplay()));Rl();Ad();
