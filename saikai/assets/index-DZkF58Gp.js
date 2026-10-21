(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ql="185",Cs={ROTATE:0,DOLLY:1,PAN:2},As={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},af=0,Oc=1,of=2,ca=1,lf=2,ar=3,Ln=0,ti=1,Ri=2,sn=0,rn=1,jn=2,Bc=3,zc=4,cf=5,Xn=100,uf=101,hf=102,df=103,ff=104,pf=200,mf=201,gf=202,vf=203,qo=204,$o=205,_f=206,xf=207,Sf=208,yf=209,Mf=210,bf=211,wf=212,Ef=213,Tf=214,Ko=0,Zo=1,Jo=2,Ds=3,Qo=4,jo=5,el=6,tl=7,Oh=0,Af=1,Cf=2,Li=0,Bh=1,zh=2,kh=3,Hh=4,Vh=5,Gh=6,Wh=7,Xh=300,es=301,Ls=302,Xa=303,Ya=304,Da=306,il=1e3,nn=1001,nl=1002,Gt=1003,Rf=1004,Ar=1005,bt=1006,qa=1007,$n=1008,pi=1009,Yh=1010,qh=1011,pr=1012,$l=1013,Mi=1014,ki=1015,bi=1016,Kl=1017,Zl=1018,mr=1020,$h=35902,Kh=35899,Zh=1021,Jh=1022,Di=1023,ln=1026,Kn=1027,Qh=1028,Jl=1029,ts=1030,Ql=1031,jl=1033,ua=33776,ha=33777,da=33778,fa=33779,sl=35840,rl=35841,al=35842,ol=35843,ll=36196,cl=37492,ul=37496,hl=37488,dl=37489,va=37490,fl=37491,pl=37808,ml=37809,gl=37810,vl=37811,_l=37812,xl=37813,Sl=37814,yl=37815,Ml=37816,bl=37817,wl=37818,El=37819,Tl=37820,Al=37821,Cl=36492,Rl=36494,Pl=36495,Dl=36283,Ll=36284,_a=36285,Il=36286,Pf=3200,kc=0,Df=1,En="",ri="srgb",xa="srgb-linear",Sa="linear",at="srgb",us=7680,Hc=519,Lf=512,If=513,Ff=514,ec=515,Nf=516,Uf=517,tc=518,Of=519,Vc=35044,si=35048,Gc="300 es",Hi=2e3,gr=2001;function Bf(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function ya(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function zf(){const n=ya("canvas");return n.style.display="block",n}const Wc={};function Xc(...n){const e="THREE."+n.shift();console.log(e,...n)}function jh(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Pe(...n){n=jh(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function je(...n){n=jh(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Rs(...n){const e=n.join(" ");e in Wc||(Wc[e]=!0,Pe(...n))}function kf(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const Hf={[Ko]:Zo,[Jo]:el,[Qo]:tl,[Ds]:jo,[Zo]:Ko,[el]:Jo,[tl]:Qo,[jo]:Ds};class Fn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Xt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Yc=1234567;const ur=Math.PI/180,vr=180/Math.PI;function Us(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Xt[n&255]+Xt[n>>8&255]+Xt[n>>16&255]+Xt[n>>24&255]+"-"+Xt[e&255]+Xt[e>>8&255]+"-"+Xt[e>>16&15|64]+Xt[e>>24&255]+"-"+Xt[t&63|128]+Xt[t>>8&255]+"-"+Xt[t>>16&255]+Xt[t>>24&255]+Xt[i&255]+Xt[i>>8&255]+Xt[i>>16&255]+Xt[i>>24&255]).toLowerCase()}function Ge(n,e,t){return Math.max(e,Math.min(t,n))}function ic(n,e){return(n%e+e)%e}function Vf(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function Gf(n,e,t){return n!==e?(t-n)/(e-n):0}function hr(n,e,t){return(1-t)*n+t*e}function Wf(n,e,t,i){return hr(n,e,1-Math.exp(-t*i))}function Xf(n,e=1){return e-Math.abs(ic(n,e*2)-e)}function Yf(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function qf(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function $f(n,e){return n+Math.floor(Math.random()*(e-n+1))}function Kf(n,e){return n+Math.random()*(e-n)}function Zf(n){return n*(.5-Math.random())}function Jf(n){n!==void 0&&(Yc=n);let e=Yc+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Qf(n){return n*ur}function jf(n){return n*vr}function ep(n){return(n&n-1)===0&&n!==0}function tp(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function ip(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function np(n,e,t,i,s){const r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+i)/2),h=a((e+i)/2),d=r((e-i)/2),u=a((e-i)/2),p=r((i-e)/2),g=a((i-e)/2);switch(s){case"XYX":n.set(o*h,c*d,c*u,o*l);break;case"YZY":n.set(c*u,o*h,c*d,o*l);break;case"ZXZ":n.set(c*d,c*u,o*h,o*l);break;case"XZX":n.set(o*h,c*g,c*p,o*l);break;case"YXY":n.set(c*p,o*h,c*g,o*l);break;case"ZYZ":n.set(c*g,c*p,o*h,o*l);break;default:Pe("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Ts(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Zt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const oi={DEG2RAD:ur,RAD2DEG:vr,generateUUID:Us,clamp:Ge,euclideanModulo:ic,mapLinear:Vf,inverseLerp:Gf,lerp:hr,damp:Wf,pingpong:Xf,smoothstep:Yf,smootherstep:qf,randInt:$f,randFloat:Kf,randFloatSpread:Zf,seededRandom:Jf,degToRad:Qf,radToDeg:jf,isPowerOfTwo:ep,ceilPowerOfTwo:tp,floorPowerOfTwo:ip,setQuaternionFromProperEuler:np,normalize:Zt,denormalize:Ts};class Re{static{Re.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ge(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ge(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Gi{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let c=i[s+0],l=i[s+1],h=i[s+2],d=i[s+3],u=r[a+0],p=r[a+1],g=r[a+2],x=r[a+3];if(d!==x||c!==u||l!==p||h!==g){let m=c*u+l*p+h*g+d*x;m<0&&(u=-u,p=-p,g=-g,x=-x,m=-m);let f=1-o;if(m<.9995){const M=Math.acos(m),b=Math.sin(M);f=Math.sin(f*M)/b,o=Math.sin(o*M)/b,c=c*f+u*o,l=l*f+p*o,h=h*f+g*o,d=d*f+x*o}else{c=c*f+u*o,l=l*f+p*o,h=h*f+g*o,d=d*f+x*o;const M=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=M,l*=M,h*=M,d*=M}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,s,r,a){const o=i[s],c=i[s+1],l=i[s+2],h=i[s+3],d=r[a],u=r[a+1],p=r[a+2],g=r[a+3];return e[t]=o*g+h*d+c*p-l*u,e[t+1]=c*g+h*u+l*d-o*p,e[t+2]=l*g+h*p+o*u-c*d,e[t+3]=h*g-o*d-c*u-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(i/2),h=o(s/2),d=o(r/2),u=c(i/2),p=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=u*h*d+l*p*g,this._y=l*p*d-u*h*g,this._z=l*h*g+u*p*d,this._w=l*h*d-u*p*g;break;case"YXZ":this._x=u*h*d+l*p*g,this._y=l*p*d-u*h*g,this._z=l*h*g-u*p*d,this._w=l*h*d+u*p*g;break;case"ZXY":this._x=u*h*d-l*p*g,this._y=l*p*d+u*h*g,this._z=l*h*g+u*p*d,this._w=l*h*d-u*p*g;break;case"ZYX":this._x=u*h*d-l*p*g,this._y=l*p*d+u*h*g,this._z=l*h*g-u*p*d,this._w=l*h*d+u*p*g;break;case"YZX":this._x=u*h*d+l*p*g,this._y=l*p*d+u*h*g,this._z=l*h*g-u*p*d,this._w=l*h*d-u*p*g;break;case"XZY":this._x=u*h*d-l*p*g,this._y=l*p*d-u*h*g,this._z=l*h*g+u*p*d,this._w=l*h*d+u*p*g;break;default:Pe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],d=t[10],u=i+o+d;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-c)*p,this._y=(r-l)*p,this._z=(a-s)*p}else if(i>o&&i>d){const p=2*Math.sqrt(1+i-o-d);this._w=(h-c)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+l)/p}else if(o>d){const p=2*Math.sqrt(1+o-i-d);this._w=(r-l)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(c+h)/p}else{const p=2*Math.sqrt(1+d-i-o);this._w=(a-s)/p,this._x=(r+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ge(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=i*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-i*l,this._z=r*h+a*l+i*c-s*o,this._w=a*h-i*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+i*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class A{static{A.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(qc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(qc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*i),h=2*(o*t-r*s),d=2*(r*i-a*t);return this.x=t+c*l+a*d-o*h,this.y=i+c*h+o*l-r*d,this.z=s+c*d+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this.z=Ge(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this.z=Ge(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ge(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-i*c,this.z=i*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return $a.copy(this).projectOnVector(e),this.sub($a)}reflect(e){return this.sub($a.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ge(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const $a=new A,qc=new Gi;class Oe{static{Oe.prototype.isMatrix3=!0}constructor(e,t,i,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,c,l)}set(e,t,i,s,r,a,o,c,l){const h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=c,h[6]=i,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],h=i[4],d=i[7],u=i[2],p=i[5],g=i[8],x=s[0],m=s[3],f=s[6],M=s[1],b=s[4],y=s[7],E=s[2],T=s[5],R=s[8];return r[0]=a*x+o*M+c*E,r[3]=a*m+o*b+c*T,r[6]=a*f+o*y+c*R,r[1]=l*x+h*M+d*E,r[4]=l*m+h*b+d*T,r[7]=l*f+h*y+d*R,r[2]=u*x+p*M+g*E,r[5]=u*m+p*b+g*T,r[8]=u*f+p*y+g*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-i*r*h+i*o*c+s*r*l-s*a*c}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],d=h*a-o*l,u=o*c-h*r,p=l*r-a*c,g=t*d+i*u+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return e[0]=d*x,e[1]=(s*l-h*i)*x,e[2]=(o*i-s*a)*x,e[3]=u*x,e[4]=(h*t-s*c)*x,e[5]=(s*r-o*t)*x,e[6]=p*x,e[7]=(i*c-l*t)*x,e[8]=(a*t-i*r)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return Rs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Ka.makeScale(e,t)),this}rotate(e){return Rs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Ka.makeRotation(-e)),this}translate(e,t){return Rs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Ka.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ka=new Oe,$c=new Oe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Kc=new Oe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function sp(){const n={enabled:!0,workingColorSpace:xa,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===at&&(s.r=an(s.r),s.g=an(s.g),s.b=an(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===at&&(s.r=Ps(s.r),s.g=Ps(s.g),s.b=Ps(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===En?Sa:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Rs("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Rs("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[xa]:{primaries:e,whitePoint:i,transfer:Sa,toXYZ:$c,fromXYZ:Kc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:ri},outputColorSpaceConfig:{drawingBufferColorSpace:ri}},[ri]:{primaries:e,whitePoint:i,transfer:at,toXYZ:$c,fromXYZ:Kc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:ri}}}),n}const $e=sp();function an(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ps(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let hs;class rp{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{hs===void 0&&(hs=ya("canvas")),hs.width=e.width,hs.height=e.height;const s=hs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=hs}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ya("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=an(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(an(t[i]/255)*255):t[i]=an(t[i]);return{data:t,width:e.width,height:e.height}}else return Pe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let ap=0;class nc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ap++}),this.uuid=Us(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Za(s[a].image)):r.push(Za(s[a]))}else r=Za(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function Za(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?rp.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Pe("Texture: Unable to serialize Texture."),{})}let op=0;const Ja=new A;class qt extends Fn{constructor(e=qt.DEFAULT_IMAGE,t=qt.DEFAULT_MAPPING,i=nn,s=nn,r=bt,a=$n,o=Di,c=pi,l=qt.DEFAULT_ANISOTROPY,h=En){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:op++}),this.uuid=Us(),this.name="",this.source=new nc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Re(0,0),this.repeat=new Re(1,1),this.center=new Re(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Oe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ja).x}get height(){return this.source.getSize(Ja).y}get depth(){return this.source.getSize(Ja).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Pe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Pe(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Xh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case il:e.x=e.x-Math.floor(e.x);break;case nn:e.x=e.x<0?0:1;break;case nl:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case il:e.y=e.y-Math.floor(e.y);break;case nn:e.y=e.y<0?0:1;break;case nl:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}qt.DEFAULT_IMAGE=null;qt.DEFAULT_MAPPING=Xh;qt.DEFAULT_ANISOTROPY=1;class xt{static{xt.prototype.isVector4=!0}constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const c=e.elements,l=c[0],h=c[4],d=c[8],u=c[1],p=c[5],g=c[9],x=c[2],m=c[6],f=c[10];if(Math.abs(h-u)<.01&&Math.abs(d-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+x)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(l+1)/2,y=(p+1)/2,E=(f+1)/2,T=(h+u)/4,R=(d+x)/4,_=(g+m)/4;return b>y&&b>E?b<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(b),s=T/i,r=R/i):y>E?y<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),i=T/s,r=_/s):E<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(E),i=R/r,s=_/r),this.set(i,s,r,t),this}let M=Math.sqrt((m-g)*(m-g)+(d-x)*(d-x)+(u-h)*(u-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(d-x)/M,this.z=(u-h)/M,this.w=Math.acos((l+p+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this.z=Ge(this.z,e.z,t.z),this.w=Ge(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this.z=Ge(this.z,e,t),this.w=Ge(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ge(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class lp extends Fn{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:bt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new xt(0,0,e,t),this.scissorTest=!1,this.viewport=new xt(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:i.depth},r=new qt(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:bt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new nc(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class mi extends lp{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class ed extends qt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Gt,this.minFilter=Gt,this.wrapR=nn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class cp extends qt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Gt,this.minFilter=Gt,this.wrapR=nn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ze{static{Ze.prototype.isMatrix4=!0}constructor(e,t,i,s,r,a,o,c,l,h,d,u,p,g,x,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,c,l,h,d,u,p,g,x,m)}set(e,t,i,s,r,a,o,c,l,h,d,u,p,g,x,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=i,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=c,f[2]=l,f[6]=h,f[10]=d,f[14]=u,f[3]=p,f[7]=g,f[11]=x,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ze().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,s=1/ds.setFromMatrixColumn(e,0).length(),r=1/ds.setFromMatrixColumn(e,1).length(),a=1/ds.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const u=a*h,p=a*d,g=o*h,x=o*d;t[0]=c*h,t[4]=-c*d,t[8]=l,t[1]=p+g*l,t[5]=u-x*l,t[9]=-o*c,t[2]=x-u*l,t[6]=g+p*l,t[10]=a*c}else if(e.order==="YXZ"){const u=c*h,p=c*d,g=l*h,x=l*d;t[0]=u+x*o,t[4]=g*o-p,t[8]=a*l,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=p*o-g,t[6]=x+u*o,t[10]=a*c}else if(e.order==="ZXY"){const u=c*h,p=c*d,g=l*h,x=l*d;t[0]=u-x*o,t[4]=-a*d,t[8]=g+p*o,t[1]=p+g*o,t[5]=a*h,t[9]=x-u*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const u=a*h,p=a*d,g=o*h,x=o*d;t[0]=c*h,t[4]=g*l-p,t[8]=u*l+x,t[1]=c*d,t[5]=x*l+u,t[9]=p*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const u=a*c,p=a*l,g=o*c,x=o*l;t[0]=c*h,t[4]=x-u*d,t[8]=g*d+p,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=p*d+g,t[10]=u-x*d}else if(e.order==="XZY"){const u=a*c,p=a*l,g=o*c,x=o*l;t[0]=c*h,t[4]=-d,t[8]=l*h,t[1]=u*d+x,t[5]=a*h,t[9]=p*d-g,t[2]=g*d-p,t[6]=o*h,t[10]=x*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(up,e,hp)}lookAt(e,t,i){const s=this.elements;return hi.subVectors(e,t),hi.lengthSq()===0&&(hi.z=1),hi.normalize(),pn.crossVectors(i,hi),pn.lengthSq()===0&&(Math.abs(i.z)===1?hi.x+=1e-4:hi.z+=1e-4,hi.normalize(),pn.crossVectors(i,hi)),pn.normalize(),Cr.crossVectors(hi,pn),s[0]=pn.x,s[4]=Cr.x,s[8]=hi.x,s[1]=pn.y,s[5]=Cr.y,s[9]=hi.y,s[2]=pn.z,s[6]=Cr.z,s[10]=hi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],h=i[1],d=i[5],u=i[9],p=i[13],g=i[2],x=i[6],m=i[10],f=i[14],M=i[3],b=i[7],y=i[11],E=i[15],T=s[0],R=s[4],_=s[8],C=s[12],D=s[1],P=s[5],N=s[9],G=s[13],Z=s[2],O=s[6],X=s[10],z=s[14],J=s[3],j=s[7],ue=s[11],fe=s[15];return r[0]=a*T+o*D+c*Z+l*J,r[4]=a*R+o*P+c*O+l*j,r[8]=a*_+o*N+c*X+l*ue,r[12]=a*C+o*G+c*z+l*fe,r[1]=h*T+d*D+u*Z+p*J,r[5]=h*R+d*P+u*O+p*j,r[9]=h*_+d*N+u*X+p*ue,r[13]=h*C+d*G+u*z+p*fe,r[2]=g*T+x*D+m*Z+f*J,r[6]=g*R+x*P+m*O+f*j,r[10]=g*_+x*N+m*X+f*ue,r[14]=g*C+x*G+m*z+f*fe,r[3]=M*T+b*D+y*Z+E*J,r[7]=M*R+b*P+y*O+E*j,r[11]=M*_+b*N+y*X+E*ue,r[15]=M*C+b*G+y*z+E*fe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],d=e[6],u=e[10],p=e[14],g=e[3],x=e[7],m=e[11],f=e[15],M=c*p-l*u,b=o*p-l*d,y=o*u-c*d,E=a*p-l*h,T=a*u-c*h,R=a*d-o*h;return t*(x*M-m*b+f*y)-i*(g*M-m*E+f*T)+s*(g*b-x*E+f*R)-r*(g*y-x*T+m*R)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],a=e[5],o=e[9],c=e[2],l=e[6],h=e[10];return t*(a*h-o*l)-i*(r*h-o*c)+s*(r*l-a*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],d=e[9],u=e[10],p=e[11],g=e[12],x=e[13],m=e[14],f=e[15],M=t*o-i*a,b=t*c-s*a,y=t*l-r*a,E=i*c-s*o,T=i*l-r*o,R=s*l-r*c,_=h*x-d*g,C=h*m-u*g,D=h*f-p*g,P=d*m-u*x,N=d*f-p*x,G=u*f-p*m,Z=M*G-b*N+y*P+E*D-T*C+R*_;if(Z===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const O=1/Z;return e[0]=(o*G-c*N+l*P)*O,e[1]=(s*N-i*G-r*P)*O,e[2]=(x*R-m*T+f*E)*O,e[3]=(u*T-d*R-p*E)*O,e[4]=(c*D-a*G-l*C)*O,e[5]=(t*G-s*D+r*C)*O,e[6]=(m*y-g*R-f*b)*O,e[7]=(h*R-u*y+p*b)*O,e[8]=(a*N-o*D+l*_)*O,e[9]=(i*D-t*N-r*_)*O,e[10]=(g*T-x*y+f*M)*O,e[11]=(d*y-h*T-p*M)*O,e[12]=(o*C-a*P-c*_)*O,e[13]=(t*P-i*C+s*_)*O,e[14]=(x*b-g*E-m*M)*O,e[15]=(h*E-d*b+u*M)*O,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,c=e.z,l=r*a,h=r*o;return this.set(l*a+i,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+i,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,h=a+a,d=o+o,u=r*l,p=r*h,g=r*d,x=a*h,m=a*d,f=o*d,M=c*l,b=c*h,y=c*d,E=i.x,T=i.y,R=i.z;return s[0]=(1-(x+f))*E,s[1]=(p+y)*E,s[2]=(g-b)*E,s[3]=0,s[4]=(p-y)*T,s[5]=(1-(u+f))*T,s[6]=(m+M)*T,s[7]=0,s[8]=(g+b)*R,s[9]=(m-M)*R,s[10]=(1-(u+x))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let a=ds.set(s[0],s[1],s[2]).length();const o=ds.set(s[4],s[5],s[6]).length(),c=ds.set(s[8],s[9],s[10]).length();r<0&&(a=-a),wi.copy(this);const l=1/a,h=1/o,d=1/c;return wi.elements[0]*=l,wi.elements[1]*=l,wi.elements[2]*=l,wi.elements[4]*=h,wi.elements[5]*=h,wi.elements[6]*=h,wi.elements[8]*=d,wi.elements[9]*=d,wi.elements[10]*=d,t.setFromRotationMatrix(wi),i.x=a,i.y=o,i.z=c,this}makePerspective(e,t,i,s,r,a,o=Hi,c=!1){const l=this.elements,h=2*r/(t-e),d=2*r/(i-s),u=(t+e)/(t-e),p=(i+s)/(i-s);let g,x;if(c)g=r/(a-r),x=a*r/(a-r);else if(o===Hi)g=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===gr)g=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=d,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=Hi,c=!1){const l=this.elements,h=2/(t-e),d=2/(i-s),u=-(t+e)/(t-e),p=-(i+s)/(i-s);let g,x;if(c)g=1/(a-r),x=a/(a-r);else if(o===Hi)g=-2/(a-r),x=-(a+r)/(a-r);else if(o===gr)g=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=d,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const ds=new A,wi=new Ze,up=new A(0,0,0),hp=new A(1,1,1),pn=new A,Cr=new A,hi=new A,Zc=new Ze,Jc=new Gi;class is{constructor(e=0,t=0,i=0,s=is.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],d=s[2],u=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(Ge(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ge(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ge(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ge(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Ge(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Ge(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:Pe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Zc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Zc,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Jc.setFromEuler(this),this.setFromQuaternion(Jc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}is.DEFAULT_ORDER="XYZ";class td{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let dp=0;const Qc=new A,fs=new Gi,Ki=new Ze,Rr=new A,Gs=new A,fp=new A,pp=new Gi,jc=new A(1,0,0),eu=new A(0,1,0),tu=new A(0,0,1),iu={type:"added"},mp={type:"removed"},ps={type:"childadded",child:null},Qa={type:"childremoved",child:null};class Nt extends Fn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:dp++}),this.uuid=Us(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Nt.DEFAULT_UP.clone();const e=new A,t=new is,i=new Gi,s=new A(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ze},normalMatrix:{value:new Oe}}),this.matrix=new Ze,this.matrixWorld=new Ze,this.matrixAutoUpdate=Nt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Nt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new td,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return fs.setFromAxisAngle(e,t),this.quaternion.multiply(fs),this}rotateOnWorldAxis(e,t){return fs.setFromAxisAngle(e,t),this.quaternion.premultiply(fs),this}rotateX(e){return this.rotateOnAxis(jc,e)}rotateY(e){return this.rotateOnAxis(eu,e)}rotateZ(e){return this.rotateOnAxis(tu,e)}translateOnAxis(e,t){return Qc.copy(e).applyQuaternion(this.quaternion),this.position.add(Qc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(jc,e)}translateY(e){return this.translateOnAxis(eu,e)}translateZ(e){return this.translateOnAxis(tu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ki.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Rr.copy(e):Rr.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Gs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ki.lookAt(Gs,Rr,this.up):Ki.lookAt(Rr,Gs,this.up),this.quaternion.setFromRotationMatrix(Ki),s&&(Ki.extractRotation(s.matrixWorld),fs.setFromRotationMatrix(Ki),this.quaternion.premultiply(fs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(je("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(iu),ps.child=e,this.dispatchEvent(ps),ps.child=null):je("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(mp),Qa.child=e,this.dispatchEvent(Qa),Qa.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ki.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ki.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ki),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(iu),ps.child=e,this.dispatchEvent(ps),ps.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gs,e,fp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gs,pp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const d=c[l];r(e.shapes,d)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),d=a(e.shapes),u=a(e.skeletons),p=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=s,i;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}Nt.DEFAULT_UP=new A(0,1,0);Nt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Nt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Pr extends Nt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const gp={type:"move"};class ja{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Pr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Pr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new A,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new A),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Pr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new A,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new A,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const x of e.hand.values()){const m=t.getJointPose(x,i),f=this._getHandJoint(l,x);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],u=h.position.distanceTo(d.position),p=.02,g=.005;l.inputState.pinching&&u>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(gp)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Pr;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const id={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},mn={h:0,s:0,l:0},Dr={h:0,s:0,l:0};function eo(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class ae{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ri){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$e.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=$e.workingColorSpace){return this.r=e,this.g=t,this.b=i,$e.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=$e.workingColorSpace){if(e=ic(e,1),t=Ge(t,0,1),i=Ge(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=eo(a,r,e+1/3),this.g=eo(a,r,e),this.b=eo(a,r,e-1/3)}return $e.colorSpaceToWorking(this,s),this}setStyle(e,t=ri){function i(r){r!==void 0&&parseFloat(r)<1&&Pe("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Pe("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Pe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ri){const i=id[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Pe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=an(e.r),this.g=an(e.g),this.b=an(e.b),this}copyLinearToSRGB(e){return this.r=Ps(e.r),this.g=Ps(e.g),this.b=Ps(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ri){return $e.workingToColorSpace(Yt.copy(this),e),Math.round(Ge(Yt.r*255,0,255))*65536+Math.round(Ge(Yt.g*255,0,255))*256+Math.round(Ge(Yt.b*255,0,255))}getHexString(e=ri){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=$e.workingColorSpace){$e.workingToColorSpace(Yt.copy(this),t);const i=Yt.r,s=Yt.g,r=Yt.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const d=a-o;switch(l=h<=.5?d/(a+o):d/(2-a-o),a){case i:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-i)/d+2;break;case r:c=(i-s)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=$e.workingColorSpace){return $e.workingToColorSpace(Yt.copy(this),t),e.r=Yt.r,e.g=Yt.g,e.b=Yt.b,e}getStyle(e=ri){$e.workingToColorSpace(Yt.copy(this),e);const t=Yt.r,i=Yt.g,s=Yt.b;return e!==ri?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(mn),this.setHSL(mn.h+e,mn.s+t,mn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(mn),e.getHSL(Dr);const i=hr(mn.h,Dr.h,t),s=hr(mn.s,Dr.s,t),r=hr(mn.l,Dr.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Yt=new ae;ae.NAMES=id;class nd extends Nt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new is,this.environmentIntensity=1,this.environmentRotation=new is,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Ei=new A,Zi=new A,to=new A,Ji=new A,ms=new A,gs=new A,nu=new A,io=new A,no=new A,so=new A,ro=new xt,ao=new xt,oo=new xt;class Pi{constructor(e=new A,t=new A,i=new A){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Ei.subVectors(e,t),s.cross(Ei);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Ei.subVectors(s,t),Zi.subVectors(i,t),to.subVectors(e,t);const a=Ei.dot(Ei),o=Ei.dot(Zi),c=Ei.dot(to),l=Zi.dot(Zi),h=Zi.dot(to),d=a*l-o*o;if(d===0)return r.set(0,0,0),null;const u=1/d,p=(l*c-o*h)*u,g=(a*h-o*c)*u;return r.set(1-p-g,g,p)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,Ji)===null?!1:Ji.x>=0&&Ji.y>=0&&Ji.x+Ji.y<=1}static getInterpolation(e,t,i,s,r,a,o,c){return this.getBarycoord(e,t,i,s,Ji)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Ji.x),c.addScaledVector(a,Ji.y),c.addScaledVector(o,Ji.z),c)}static getInterpolatedAttribute(e,t,i,s,r,a){return ro.setScalar(0),ao.setScalar(0),oo.setScalar(0),ro.fromBufferAttribute(e,t),ao.fromBufferAttribute(e,i),oo.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(ro,r.x),a.addScaledVector(ao,r.y),a.addScaledVector(oo,r.z),a}static isFrontFacing(e,t,i,s){return Ei.subVectors(i,t),Zi.subVectors(e,t),Ei.cross(Zi).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ei.subVectors(this.c,this.b),Zi.subVectors(this.a,this.b),Ei.cross(Zi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Pi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Pi.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return Pi.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return Pi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Pi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let a,o;ms.subVectors(s,i),gs.subVectors(r,i),io.subVectors(e,i);const c=ms.dot(io),l=gs.dot(io);if(c<=0&&l<=0)return t.copy(i);no.subVectors(e,s);const h=ms.dot(no),d=gs.dot(no);if(h>=0&&d<=h)return t.copy(s);const u=c*d-h*l;if(u<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(i).addScaledVector(ms,a);so.subVectors(e,r);const p=ms.dot(so),g=gs.dot(so);if(g>=0&&p<=g)return t.copy(r);const x=p*l-c*g;if(x<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(i).addScaledVector(gs,o);const m=h*g-p*d;if(m<=0&&d-h>=0&&p-g>=0)return nu.subVectors(r,s),o=(d-h)/(d-h+(p-g)),t.copy(s).addScaledVector(nu,o);const f=1/(m+x+u);return a=x*f,o=u*f,t.copy(i).addScaledVector(ms,a).addScaledVector(gs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Mr{constructor(e=new A(1/0,1/0,1/0),t=new A(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Ti.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Ti.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Ti.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Ti):Ti.fromBufferAttribute(r,a),Ti.applyMatrix4(e.matrixWorld),this.expandByPoint(Ti);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Lr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Lr.copy(i.boundingBox)),Lr.applyMatrix4(e.matrixWorld),this.union(Lr)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ti),Ti.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ws),Ir.subVectors(this.max,Ws),vs.subVectors(e.a,Ws),_s.subVectors(e.b,Ws),xs.subVectors(e.c,Ws),gn.subVectors(_s,vs),vn.subVectors(xs,_s),zn.subVectors(vs,xs);let t=[0,-gn.z,gn.y,0,-vn.z,vn.y,0,-zn.z,zn.y,gn.z,0,-gn.x,vn.z,0,-vn.x,zn.z,0,-zn.x,-gn.y,gn.x,0,-vn.y,vn.x,0,-zn.y,zn.x,0];return!lo(t,vs,_s,xs,Ir)||(t=[1,0,0,0,1,0,0,0,1],!lo(t,vs,_s,xs,Ir))?!1:(Fr.crossVectors(gn,vn),t=[Fr.x,Fr.y,Fr.z],lo(t,vs,_s,xs,Ir))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ti).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ti).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Qi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Qi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Qi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Qi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Qi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Qi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Qi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Qi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Qi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Qi=[new A,new A,new A,new A,new A,new A,new A,new A],Ti=new A,Lr=new Mr,vs=new A,_s=new A,xs=new A,gn=new A,vn=new A,zn=new A,Ws=new A,Ir=new A,Fr=new A,kn=new A;function lo(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){kn.fromArray(n,r);const o=s.x*Math.abs(kn.x)+s.y*Math.abs(kn.y)+s.z*Math.abs(kn.z),c=e.dot(kn),l=t.dot(kn),h=i.dot(kn);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const Pt=new A,Nr=new Re;let vp=0;class We extends Fn{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:vp++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Vc,this.updateRanges=[],this.gpuType=ki,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Nr.fromBufferAttribute(this,t),Nr.applyMatrix3(e),this.setXY(t,Nr.x,Nr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix3(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix4(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.applyNormalMatrix(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.transformDirection(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Ts(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Zt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ts(t,this.array)),t}setX(e,t){return this.normalized&&(t=Zt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ts(t,this.array)),t}setY(e,t){return this.normalized&&(t=Zt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ts(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Zt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ts(t,this.array)),t}setW(e,t){return this.normalized&&(t=Zt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Zt(t,this.array),i=Zt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=Zt(t,this.array),i=Zt(i,this.array),s=Zt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=Zt(t,this.array),i=Zt(i,this.array),s=Zt(s,this.array),r=Zt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Vc&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class sd extends We{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class rd extends We{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class $t extends We{constructor(e,t,i){super(new Float32Array(e),t,i)}}const _p=new Mr,Xs=new A,co=new A;class br{constructor(e=new A,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):_p.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Xs.subVectors(e,this.center);const t=Xs.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Xs,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(co.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Xs.copy(e.center).add(co)),this.expandByPoint(Xs.copy(e.center).sub(co))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let xp=0;const xi=new Ze,uo=new Nt,Ss=new A,di=new Mr,Ys=new Mr,zt=new A;class At extends Fn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:xp++}),this.uuid=Us(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Bf(e)?rd:sd)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Oe().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return xi.makeRotationFromQuaternion(e),this.applyMatrix4(xi),this}rotateX(e){return xi.makeRotationX(e),this.applyMatrix4(xi),this}rotateY(e){return xi.makeRotationY(e),this.applyMatrix4(xi),this}rotateZ(e){return xi.makeRotationZ(e),this.applyMatrix4(xi),this}translate(e,t,i){return xi.makeTranslation(e,t,i),this.applyMatrix4(xi),this}scale(e,t,i){return xi.makeScale(e,t,i),this.applyMatrix4(xi),this}lookAt(e){return uo.lookAt(e),uo.updateMatrix(),this.applyMatrix4(uo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ss).negate(),this.translate(Ss.x,Ss.y,Ss.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new $t(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Pe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Mr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){je("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new A(-1/0,-1/0,-1/0),new A(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];di.setFromBufferAttribute(r),this.morphTargetsRelative?(zt.addVectors(this.boundingBox.min,di.min),this.boundingBox.expandByPoint(zt),zt.addVectors(this.boundingBox.max,di.max),this.boundingBox.expandByPoint(zt)):(this.boundingBox.expandByPoint(di.min),this.boundingBox.expandByPoint(di.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&je('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new br);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){je("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new A,1/0);return}if(e){const i=this.boundingSphere.center;if(di.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Ys.setFromBufferAttribute(o),this.morphTargetsRelative?(zt.addVectors(di.min,Ys.min),di.expandByPoint(zt),zt.addVectors(di.max,Ys.max),di.expandByPoint(zt)):(di.expandByPoint(Ys.min),di.expandByPoint(Ys.max))}di.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)zt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(zt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)zt.fromBufferAttribute(o,l),c&&(Ss.fromBufferAttribute(e,l),zt.add(Ss)),s=Math.max(s,i.distanceToSquared(zt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&je('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){je("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new We(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],c=[];for(let _=0;_<i.count;_++)o[_]=new A,c[_]=new A;const l=new A,h=new A,d=new A,u=new Re,p=new Re,g=new Re,x=new A,m=new A;function f(_,C,D){l.fromBufferAttribute(i,_),h.fromBufferAttribute(i,C),d.fromBufferAttribute(i,D),u.fromBufferAttribute(r,_),p.fromBufferAttribute(r,C),g.fromBufferAttribute(r,D),h.sub(l),d.sub(l),p.sub(u),g.sub(u);const P=1/(p.x*g.y-g.x*p.y);isFinite(P)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(P),m.copy(d).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(P),o[_].add(x),o[C].add(x),o[D].add(x),c[_].add(m),c[C].add(m),c[D].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let _=0,C=M.length;_<C;++_){const D=M[_],P=D.start,N=D.count;for(let G=P,Z=P+N;G<Z;G+=3)f(e.getX(G+0),e.getX(G+1),e.getX(G+2))}const b=new A,y=new A,E=new A,T=new A;function R(_){E.fromBufferAttribute(s,_),T.copy(E);const C=o[_];b.copy(C),b.sub(E.multiplyScalar(E.dot(C))).normalize(),y.crossVectors(T,C);const P=y.dot(c[_])<0?-1:1;a.setXYZW(_,b.x,b.y,b.z,P)}for(let _=0,C=M.length;_<C;++_){const D=M[_],P=D.start,N=D.count;for(let G=P,Z=P+N;G<Z;G+=3)R(e.getX(G+0)),R(e.getX(G+1)),R(e.getX(G+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new We(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,p=i.count;u<p;u++)i.setXYZ(u,0,0,0);const s=new A,r=new A,a=new A,o=new A,c=new A,l=new A,h=new A,d=new A;if(e)for(let u=0,p=e.count;u<p;u+=3){const g=e.getX(u+0),x=e.getX(u+1),m=e.getX(u+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,x),a.fromBufferAttribute(t,m),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(i,g),c.fromBufferAttribute(i,x),l.fromBufferAttribute(i,m),o.add(h),c.add(h),l.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(x,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let u=0,p=t.count;u<p;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)zt.fromBufferAttribute(e,t),zt.normalize(),e.setXYZ(t,zt.x,zt.y,zt.z)}toNonIndexed(){function e(o,c){const l=o.array,h=o.itemSize,d=o.normalized,u=new l.constructor(c.length*h);let p=0,g=0;for(let x=0,m=c.length;x<m;x++){o.isInterleavedBufferAttribute?p=c[x]*o.data.stride+o.offset:p=c[x]*h;for(let f=0;f<h;f++)u[g++]=l[p++]}return new We(u,h,d)}if(this.index===null)return Pe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new At,i=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=e(c,i);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let h=0,d=l.length;h<d;h++){const u=l[h],p=e(u,i);c.push(p)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let d=0,u=l.length;d<u;d++){const p=l[d];h.push(p.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(t))}const r=e.morphAttributes;for(const l in r){const h=[],d=r[l];for(let u=0,p=d.length;u<p;u++)h.push(d[u].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,h=a.length;l<h;l++){const d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let Sp=0;class Os extends Fn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Sp++}),this.uuid=Us(),this.name="",this.type="Material",this.blending=rn,this.side=Ln,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=qo,this.blendDst=$o,this.blendEquation=Xn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ae(0,0,0),this.blendAlpha=0,this.depthFunc=Ds,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Hc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=us,this.stencilZFail=us,this.stencilZPass=us,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Pe(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Pe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==rn&&(i.blending=this.blending),this.side!==Ln&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==qo&&(i.blendSrc=this.blendSrc),this.blendDst!==$o&&(i.blendDst=this.blendDst),this.blendEquation!==Xn&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ds&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Hc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==us&&(i.stencilFail=this.stencilFail),this.stencilZFail!==us&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==us&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new ae().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Re().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Re().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const ji=new A,ho=new A,Ur=new A,_n=new A,fo=new A,Or=new A,po=new A;class La{constructor(e=new A,t=new A(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ji)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=ji.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ji.copy(this.origin).addScaledVector(this.direction,t),ji.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){ho.copy(e).add(t).multiplyScalar(.5),Ur.copy(t).sub(e).normalize(),_n.copy(this.origin).sub(ho);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Ur),o=_n.dot(this.direction),c=-_n.dot(Ur),l=_n.lengthSq(),h=Math.abs(1-a*a);let d,u,p,g;if(h>0)if(d=a*c-o,u=a*o-c,g=r*h,d>=0)if(u>=-g)if(u<=g){const x=1/h;d*=x,u*=x,p=d*(d+a*u+2*o)+u*(a*d+u+2*c)+l}else u=r,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*c)+l;else u=-r,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*c)+l;else u<=-g?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-c),r),p=-d*d+u*(u+2*c)+l):u<=g?(d=0,u=Math.min(Math.max(-r,-c),r),p=u*(u+2*c)+l):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-c),r),p=-d*d+u*(u+2*c)+l);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(ho).addScaledVector(Ur,u),p}intersectSphere(e,t){ji.subVectors(e.center,this.origin);const i=ji.dot(this.direction),s=ji.dot(ji)-i*i,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return l>=0?(i=(e.min.x-u.x)*l,s=(e.max.x-u.x)*l):(i=(e.max.x-u.x)*l,s=(e.min.x-u.x)*l),h>=0?(r=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-u.z)*d,c=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,c=(e.min.z-u.z)*d),i>c||o>s)||((o>i||i!==i)&&(i=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,ji)!==null}intersectTriangle(e,t,i,s,r){fo.subVectors(t,e),Or.subVectors(i,e),po.crossVectors(fo,Or);let a=this.direction.dot(po),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;_n.subVectors(this.origin,e);const c=o*this.direction.dot(Or.crossVectors(_n,Or));if(c<0)return null;const l=o*this.direction.dot(fo.cross(_n));if(l<0||c+l>a)return null;const h=-o*_n.dot(po);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class sc extends Os{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ae(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new is,this.combine=Oh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const su=new Ze,Hn=new La,Br=new br,ru=new A,zr=new A,kr=new A,Hr=new A,mo=new A,Vr=new A,au=new A,Gr=new A;class Kt extends Nt{constructor(e=new At,t=new sc){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){Vr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=o[c],d=r[c];h!==0&&(mo.fromBufferAttribute(d,e),a?Vr.addScaledVector(mo,h):Vr.addScaledVector(mo.sub(t),h))}t.add(Vr)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Br.copy(i.boundingSphere),Br.applyMatrix4(r),Hn.copy(e.ray).recast(e.near),!(Br.containsPoint(Hn.origin)===!1&&(Hn.intersectSphere(Br,ru)===null||Hn.origin.distanceToSquared(ru)>(e.far-e.near)**2))&&(su.copy(r).invert(),Hn.copy(e.ray).applyMatrix4(su),!(i.boundingBox!==null&&Hn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Hn)))}_computeIntersections(e,t,i){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=u.length;g<x;g++){const m=u[g],f=a[m.materialIndex],M=Math.max(m.start,p.start),b=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let y=M,E=b;y<E;y+=3){const T=o.getX(y),R=o.getX(y+1),_=o.getX(y+2);s=Wr(this,f,e,i,l,h,d,T,R,_),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),x=Math.min(o.count,p.start+p.count);for(let m=g,f=x;m<f;m+=3){const M=o.getX(m),b=o.getX(m+1),y=o.getX(m+2);s=Wr(this,a,e,i,l,h,d,M,b,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,x=u.length;g<x;g++){const m=u[g],f=a[m.materialIndex],M=Math.max(m.start,p.start),b=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let y=M,E=b;y<E;y+=3){const T=y,R=y+1,_=y+2;s=Wr(this,f,e,i,l,h,d,T,R,_),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),x=Math.min(c.count,p.start+p.count);for(let m=g,f=x;m<f;m+=3){const M=m,b=m+1,y=m+2;s=Wr(this,a,e,i,l,h,d,M,b,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function yp(n,e,t,i,s,r,a,o){let c;if(e.side===ti?c=i.intersectTriangle(a,r,s,!0,o):c=i.intersectTriangle(s,r,a,e.side===Ln,o),c===null)return null;Gr.copy(o),Gr.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Gr);return l<t.near||l>t.far?null:{distance:l,point:Gr.clone(),object:n}}function Wr(n,e,t,i,s,r,a,o,c,l){n.getVertexPosition(o,zr),n.getVertexPosition(c,kr),n.getVertexPosition(l,Hr);const h=yp(n,e,t,i,zr,kr,Hr,au);if(h){const d=new A;Pi.getBarycoord(au,zr,kr,Hr,d),s&&(h.uv=Pi.getInterpolatedAttribute(s,o,c,l,d,new Re)),r&&(h.uv1=Pi.getInterpolatedAttribute(r,o,c,l,d,new Re)),a&&(h.normal=Pi.getInterpolatedAttribute(a,o,c,l,d,new A),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:c,c:l,normal:new A,materialIndex:0};Pi.getNormal(zr,kr,Hr,u.normal),h.face=u,h.barycoord=d}return h}class Mp extends qt{constructor(e=null,t=1,i=1,s,r,a,o,c,l=Gt,h=Gt,d,u){super(null,a,o,c,l,h,s,r,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const go=new A,bp=new A,wp=new Oe;class Mn{constructor(e=new A(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=go.subVectors(i,t).cross(bp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const s=e.delta(go),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||wp.getNormalMatrix(e),s=this.coplanarPoint(go).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Vn=new br,Ep=new Re(.5,.5),Xr=new A;class rc{constructor(e=new Mn,t=new Mn,i=new Mn,s=new Mn,r=new Mn,a=new Mn){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Hi,i=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],d=r[5],u=r[6],p=r[7],g=r[8],x=r[9],m=r[10],f=r[11],M=r[12],b=r[13],y=r[14],E=r[15];if(s[0].setComponents(l-a,p-h,f-g,E-M).normalize(),s[1].setComponents(l+a,p+h,f+g,E+M).normalize(),s[2].setComponents(l+o,p+d,f+x,E+b).normalize(),s[3].setComponents(l-o,p-d,f-x,E-b).normalize(),i)s[4].setComponents(c,u,m,y).normalize(),s[5].setComponents(l-c,p-u,f-m,E-y).normalize();else if(s[4].setComponents(l-c,p-u,f-m,E-y).normalize(),t===Hi)s[5].setComponents(l+c,p+u,f+m,E+y).normalize();else if(t===gr)s[5].setComponents(c,u,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Vn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Vn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Vn)}intersectsSprite(e){Vn.center.set(0,0,0);const t=Ep.distanceTo(e.center);return Vn.radius=.7071067811865476+t,Vn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Vn)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(Xr.x=s.normal.x>0?e.max.x:e.min.x,Xr.y=s.normal.y>0?e.max.y:e.min.y,Xr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Xr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Tp extends Os{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ae(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ma=new A,ba=new A,ou=new Ze,qs=new La,Yr=new br,vo=new A,lu=new A;class Ap extends Nt{constructor(e=new At,t=new Tp){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)Ma.fromBufferAttribute(t,s-1),ba.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=Ma.distanceTo(ba);e.setAttribute("lineDistance",new $t(i,1))}else Pe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Yr.copy(i.boundingSphere),Yr.applyMatrix4(s),Yr.radius+=r,e.ray.intersectsSphere(Yr)===!1)return;ou.copy(s).invert(),qs.copy(e.ray).applyMatrix4(ou);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=i.index,u=i.attributes.position;if(h!==null){const p=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let x=p,m=g-1;x<m;x+=l){const f=h.getX(x),M=h.getX(x+1),b=qr(this,e,qs,c,f,M,x);b&&t.push(b)}if(this.isLineLoop){const x=h.getX(g-1),m=h.getX(p),f=qr(this,e,qs,c,x,m,g-1);f&&t.push(f)}}else{const p=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let x=p,m=g-1;x<m;x+=l){const f=qr(this,e,qs,c,x,x+1,x);f&&t.push(f)}if(this.isLineLoop){const x=qr(this,e,qs,c,g-1,p,g-1);x&&t.push(x)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function qr(n,e,t,i,s,r,a){const o=n.geometry.attributes.position;if(Ma.fromBufferAttribute(o,s),ba.fromBufferAttribute(o,r),t.distanceSqToSegment(Ma,ba,vo,lu)>i)return;vo.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(vo);if(!(l<e.near||l>e.far))return{distance:l,point:lu.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}const cu=new A,uu=new A;class Cp extends Ap{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let s=0,r=t.count;s<r;s+=2)cu.fromBufferAttribute(t,s),uu.fromBufferAttribute(t,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+cu.distanceTo(uu);e.setAttribute("lineDistance",new $t(i,1))}else Pe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Rp extends Os{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ae(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const hu=new Ze,Fl=new La,$r=new br,Kr=new A;class Is extends Nt{constructor(e=new At,t=new Rp){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),$r.copy(i.boundingSphere),$r.applyMatrix4(s),$r.radius+=r,e.ray.intersectsSphere($r)===!1)return;hu.copy(s).invert(),Fl.copy(e.ray).applyMatrix4(hu);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=i.index,d=i.attributes.position;if(l!==null){const u=Math.max(0,a.start),p=Math.min(l.count,a.start+a.count);for(let g=u,x=p;g<x;g++){const m=l.getX(g);Kr.fromBufferAttribute(d,m),du(Kr,m,c,s,e,t,this)}}else{const u=Math.max(0,a.start),p=Math.min(d.count,a.start+a.count);for(let g=u,x=p;g<x;g++)Kr.fromBufferAttribute(d,g),du(Kr,g,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function du(n,e,t,i,s,r,a){const o=Fl.distanceSqToPoint(n);if(o<t){const c=new A;Fl.closestPointToPoint(n,c),c.applyMatrix4(i);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class ad extends qt{constructor(e=[],t=es,i,s,r,a,o,c,l,h){super(e,t,i,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class fu extends qt{constructor(e,t,i,s,r,a,o,c,l){super(e,t,i,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class In extends qt{constructor(e,t,i=Mi,s,r,a,o=Gt,c=Gt,l,h=ln,d=1){if(h!==ln&&h!==Kn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:d};super(u,s,r,a,o,c,h,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new nc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Pp extends In{constructor(e,t=Mi,i=es,s,r,a=Gt,o=Gt,c,l=ln){const h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,t,i,s,r,a,o,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class od extends qt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class wr extends At{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],h=[],d=[];let u=0,p=0;g("z","y","x",-1,-1,i,t,e,a,r,0),g("z","y","x",1,-1,i,t,-e,a,r,1),g("x","z","y",1,1,e,i,t,s,a,2),g("x","z","y",1,-1,e,i,-t,s,a,3),g("x","y","z",1,-1,e,t,i,s,r,4),g("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new $t(l,3)),this.setAttribute("normal",new $t(h,3)),this.setAttribute("uv",new $t(d,2));function g(x,m,f,M,b,y,E,T,R,_,C){const D=y/R,P=E/_,N=y/2,G=E/2,Z=T/2,O=R+1,X=_+1;let z=0,J=0;const j=new A;for(let ue=0;ue<X;ue++){const fe=ue*P-G;for(let ve=0;ve<O;ve++){const ye=ve*D-N;j[x]=ye*M,j[m]=fe*b,j[f]=Z,l.push(j.x,j.y,j.z),j[x]=0,j[m]=0,j[f]=T>0?1:-1,h.push(j.x,j.y,j.z),d.push(ve/R),d.push(1-ue/_),z+=1}}for(let ue=0;ue<_;ue++)for(let fe=0;fe<R;fe++){const ve=u+fe+O*ue,ye=u+fe+O*(ue+1),Be=u+(fe+1)+O*(ue+1),Ue=u+(fe+1)+O*ue;c.push(ve,ye,Ue),c.push(ye,Be,Ue),J+=6}o.addGroup(p,J,C),p+=J,u+=z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Dp{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Pe("Curve: .getPoint() not implemented.")}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)i=this.getPoint(a/e),r+=i.distanceTo(s),t.push(r),s=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const i=this.getLengths();let s=0;const r=i.length;let a;t?a=t:a=e*i[r-1];let o=0,c=r-1,l;for(;o<=c;)if(s=Math.floor(o+(c-o)/2),l=i[s]-a,l<0)o=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,i[s]===a)return s/(r-1);const h=i[s],u=i[s+1]-h,p=(a-h)/u;return(s+p)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),c=t||(a.isVector2?new Re:new A);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){const i=new A,s=[],r=[],a=[],o=new A,c=new Ze;for(let p=0;p<=e;p++){const g=p/e;s[p]=this.getTangentAt(g,new A)}r[0]=new A,a[0]=new A;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),d=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=l&&(l=h,i.set(1,0,0)),d<=l&&(l=d,i.set(0,1,0)),u<=l&&i.set(0,0,1),o.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let p=1;p<=e;p++){if(r[p]=r[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(s[p-1],s[p]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Ge(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(c.makeRotationAxis(o,g))}a[p].crossVectors(s[p],r[p])}if(t===!0){let p=Math.acos(Ge(r[0].dot(r[e]),-1,1));p/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(p=-p);for(let g=1;g<=e;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],p*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}function ac(){let n=0,e=0,t=0,i=0;function s(r,a,o,c){n=r,e=o,t=-3*r+3*a-2*o-c,i=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){s(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,h,d){let u=(a-r)/l-(o-r)/(l+h)+(o-a)/h,p=(o-a)/h-(c-a)/(h+d)+(c-o)/d;u*=h,p*=h,s(a,o,u,p)},calc:function(r){const a=r*r,o=a*r;return n+e*r+t*a+i*o}}}const pu=new A,mu=new A,_o=new ac,xo=new ac,So=new ac;class Lp extends Dp{constructor(e=[],t=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=s}getPoint(e,t=new A){const i=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e;let o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,h;this.closed||o>0?l=s[(o-1)%r]:(mu.subVectors(s[0],s[1]).add(s[0]),l=mu);const d=s[o%r],u=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(pu.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=pu),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(d),p),x=Math.pow(d.distanceToSquared(u),p),m=Math.pow(u.distanceToSquared(h),p);x<1e-4&&(x=1),g<1e-4&&(g=x),m<1e-4&&(m=x),_o.initNonuniformCatmullRom(l.x,d.x,u.x,h.x,g,x,m),xo.initNonuniformCatmullRom(l.y,d.y,u.y,h.y,g,x,m),So.initNonuniformCatmullRom(l.z,d.z,u.z,h.z,g,x,m)}else this.curveType==="catmullrom"&&(_o.initCatmullRom(l.x,d.x,u.x,h.x,this.tension),xo.initCatmullRom(l.y,d.y,u.y,h.y,this.tension),So.initCatmullRom(l.z,d.z,u.z,h.z,this.tension));return i.set(_o.calc(c),xo.calc(c),So.calc(c)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new A().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}class cn extends At{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(i),c=Math.floor(s),l=o+1,h=c+1,d=e/o,u=t/c,p=[],g=[],x=[],m=[];for(let f=0;f<h;f++){const M=f*u-a;for(let b=0;b<l;b++){const y=b*d-r;g.push(y,-M,0),x.push(0,0,1),m.push(b/o),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let M=0;M<o;M++){const b=M+l*f,y=M+l*(f+1),E=M+1+l*(f+1),T=M+1+l*f;p.push(b,y,T),p.push(y,E,T)}this.setIndex(p),this.setAttribute("position",new $t(g,3)),this.setAttribute("normal",new $t(x,3)),this.setAttribute("uv",new $t(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new cn(e.width,e.height,e.widthSegments,e.heightSegments)}}class oc extends At{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const c=Math.min(a+o,Math.PI);let l=0;const h=[],d=new A,u=new A,p=[],g=[],x=[],m=[];for(let f=0;f<=i;f++){const M=[],b=f/i,y=a+b*o,E=e*Math.cos(y),T=Math.sqrt(e*e-E*E);let R=0;f===0&&a===0?R=.5/t:f===i&&c===Math.PI&&(R=-.5/t);for(let _=0;_<=t;_++){const C=_/t,D=s+C*r;d.x=-T*Math.cos(D),d.y=E,d.z=T*Math.sin(D),g.push(d.x,d.y,d.z),u.copy(d).normalize(),x.push(u.x,u.y,u.z),m.push(C+R,1-b),M.push(l++)}h.push(M)}for(let f=0;f<i;f++)for(let M=0;M<t;M++){const b=h[f][M+1],y=h[f][M],E=h[f+1][M],T=h[f+1][M+1];(f!==0||a>0)&&p.push(b,y,T),(f!==i-1||c<Math.PI)&&p.push(y,E,T)}this.setIndex(p),this.setAttribute("position",new $t(g,3)),this.setAttribute("normal",new $t(x,3)),this.setAttribute("uv",new $t(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new oc(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function Fs(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];if(gu(s))s.isRenderTargetTexture?(Pe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(gu(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function Qt(n){const e={};for(let t=0;t<n.length;t++){const i=Fs(n[t]);for(const s in i)e[s]=i[s]}return e}function gu(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Ip(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function ld(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:$e.workingColorSpace}const Fp={clone:Fs,merge:Qt};var Np=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Up=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ot extends Os{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Np,this.fragmentShader=Up,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Fs(e.uniforms),this.uniformsGroups=Ip(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new ae().setHex(s.value);break;case"v2":this.uniforms[i].value=new Re().fromArray(s.value);break;case"v3":this.uniforms[i].value=new A().fromArray(s.value);break;case"v4":this.uniforms[i].value=new xt().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Oe().fromArray(s.value);break;case"m4":this.uniforms[i].value=new Ze().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Op extends ot{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Bp extends Os{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Pf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class zp extends Os{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class cd extends Nt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ae(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class kp extends cd{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Nt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ae(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const yo=new Ze,vu=new A,_u=new A;class Hp{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Re(512,512),this.mapType=pi,this.map=null,this.mapPass=null,this.matrix=new Ze,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new rc,this._frameExtents=new Re(1,1),this._viewportCount=1,this._viewports=[new xt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;vu.setFromMatrixPosition(e.matrixWorld),t.position.copy(vu),_u.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(_u),t.updateMatrixWorld(),yo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(yo,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===gr||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(yo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Zr=new A,Jr=new Gi,Oi=new A;class ud extends Nt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ze,this.projectionMatrix=new Ze,this.projectionMatrixInverse=new Ze,this.coordinateSystem=Hi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Zr,Jr,Oi),Oi.x===1&&Oi.y===1&&Oi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Zr,Jr,Oi.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Zr,Jr,Oi),Oi.x===1&&Oi.y===1&&Oi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Zr,Jr,Oi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const xn=new A,xu=new Re,Su=new Re;class yi extends ud{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=vr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ur*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return vr*2*Math.atan(Math.tan(ur*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){xn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(xn.x,xn.y).multiplyScalar(-e/xn.z),xn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(xn.x,xn.y).multiplyScalar(-e/xn.z)}getViewSize(e,t){return this.getViewBounds(e,xu,Su),t.subVectors(Su,xu)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ur*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*i/l,s*=a.width/c,i*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Ia extends ud{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,a=i+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Vp extends Hp{constructor(){super(new Ia(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class hd extends cd{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Nt.DEFAULT_UP),this.updateMatrix(),this.target=new Nt,this.shadow=new Vp}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}const ys=-90,Ms=1;class Gp extends Nt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new yi(ys,Ms,e,t);s.layers=this.layers,this.add(s);const r=new yi(ys,Ms,e,t);r.layers=this.layers,this.add(r);const a=new yi(ys,Ms,e,t);a.layers=this.layers,this.add(a);const o=new yi(ys,Ms,e,t);o.layers=this.layers,this.add(o);const c=new yi(ys,Ms,e,t);c.layers=this.layers,this.add(c);const l=new yi(ys,Ms,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,c]=t;for(const l of t)this.remove(l);if(e===Hi)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===gr)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(d,u,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Wp extends yi{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class yu{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Ge(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Ge(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class dd{static{dd.prototype.isMatrix2=!0}constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}}class Xp extends Fn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){Pe("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Mu(n,e,t,i){const s=Yp(i);switch(t){case Zh:return n*e;case Qh:return n*e/s.components*s.byteLength;case Jl:return n*e/s.components*s.byteLength;case ts:return n*e*2/s.components*s.byteLength;case Ql:return n*e*2/s.components*s.byteLength;case Jh:return n*e*3/s.components*s.byteLength;case Di:return n*e*4/s.components*s.byteLength;case jl:return n*e*4/s.components*s.byteLength;case ua:case ha:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case da:case fa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case rl:case ol:return Math.max(n,16)*Math.max(e,8)/4;case sl:case al:return Math.max(n,8)*Math.max(e,8)/2;case ll:case cl:case hl:case dl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ul:case va:case fl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case pl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ml:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case gl:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case vl:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case _l:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case xl:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Sl:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case yl:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Ml:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case bl:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case wl:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case El:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Tl:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Al:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Cl:case Rl:case Pl:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Dl:case Ll:return Math.ceil(n/4)*Math.ceil(e/4)*8;case _a:case Il:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Yp(n){switch(n){case pi:case Yh:return{byteLength:1,components:1};case pr:case qh:case bi:return{byteLength:2,components:1};case Kl:case Zl:return{byteLength:2,components:4};case Mi:case $l:case ki:return{byteLength:4,components:1};case $h:case Kh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ql}}));typeof window<"u"&&(window.__THREE__?Pe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ql);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function fd(){let n=null,e=!1,t=null,i=null;function s(r,a){t(r,a),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function qp(n){const e=new WeakMap;function t(o,c){const l=o.array,h=o.usage,d=l.byteLength,u=n.createBuffer();n.bindBuffer(c,u),n.bufferData(c,l,h),o.onUploadCallback();let p;if(l instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=n.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=n.SHORT;else if(l instanceof Uint32Array)p=n.UNSIGNED_INT;else if(l instanceof Int32Array)p=n.INT;else if(l instanceof Int8Array)p=n.BYTE;else if(l instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,c,l){const h=c.array,d=c.updateRanges;if(n.bindBuffer(l,o),d.length===0)n.bufferSubData(l,0,h);else{d.sort((p,g)=>p.start-g.start);let u=0;for(let p=1;p<d.length;p++){const g=d[u],x=d[p];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++u,d[u]=x)}d.length=u+1;for(let p=0,g=d.length;p<g;p++){const x=d[p];n.bufferSubData(l,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(n.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var $p=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Kp=`#ifdef USE_ALPHAHASH
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
#endif`,Zp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Jp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Qp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,jp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,em=`#ifdef USE_AOMAP
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
#endif`,tm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,im=`#ifdef USE_BATCHING
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
#endif`,nm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,sm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,rm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,am=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,om=`#ifdef USE_IRIDESCENCE
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
#endif`,lm=`#ifdef USE_BUMPMAP
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
#endif`,cm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,um=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,hm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,dm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,fm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,pm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,mm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,gm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,vm=`#define PI 3.141592653589793
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
} // validated`,_m=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,xm=`vec3 transformedNormal = objectNormal;
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
#endif`,Sm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ym=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Mm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,bm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,wm="gl_FragColor = linearToOutputTexel( gl_FragColor );",Em=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Tm=`#ifdef USE_ENVMAP
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
#endif`,Am=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Cm=`#ifdef USE_ENVMAP
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
#endif`,Rm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Pm=`#ifdef USE_ENVMAP
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
#endif`,Dm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Lm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Im=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Fm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Nm=`#ifdef USE_GRADIENTMAP
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
}`,Um=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Om=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Bm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,zm=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,km=`#ifdef USE_ENVMAP
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
#endif`,Hm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Vm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Gm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Wm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Xm=`PhysicalMaterial material;
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
#endif`,Ym=`uniform sampler2D dfgLUT;
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
}`,qm=`
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
#endif`,$m=`#if defined( RE_IndirectDiffuse )
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
#endif`,Km=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Zm=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Jm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Qm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,jm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,e0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,t0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,i0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,n0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,s0=`#if defined( USE_POINTS_UV )
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
#endif`,r0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,a0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,o0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,l0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,c0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,u0=`#ifdef USE_MORPHTARGETS
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
#endif`,h0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,d0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,f0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,p0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,m0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,g0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,v0=`#ifdef USE_NORMALMAP
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
#endif`,_0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,x0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,S0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,y0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,M0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,b0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,w0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,E0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,T0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,A0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,C0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,R0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,P0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,D0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,L0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,I0=`float getShadowMask() {
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
}`,F0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,N0=`#ifdef USE_SKINNING
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
#endif`,U0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,O0=`#ifdef USE_SKINNING
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
#endif`,B0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,z0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,k0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,H0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,V0=`#ifdef USE_TRANSMISSION
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
#endif`,G0=`#ifdef USE_TRANSMISSION
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
#endif`,W0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,X0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Y0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,q0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const $0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,K0=`uniform sampler2D t2D;
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
}`,Z0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,J0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Q0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,j0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,eg=`#include <common>
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
}`,tg=`#if DEPTH_PACKING == 3200
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
}`,ig=`#define DISTANCE
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
}`,ng=`#define DISTANCE
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
}`,sg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,rg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ag=`uniform float scale;
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
}`,og=`uniform vec3 diffuse;
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
}`,lg=`#include <common>
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
}`,cg=`uniform vec3 diffuse;
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
}`,ug=`#define LAMBERT
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
}`,hg=`#define LAMBERT
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
}`,dg=`#define MATCAP
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
}`,fg=`#define MATCAP
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
}`,pg=`#define NORMAL
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
}`,mg=`#define NORMAL
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
}`,gg=`#define PHONG
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
}`,vg=`#define PHONG
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
}`,_g=`#define STANDARD
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
}`,xg=`#define STANDARD
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
}`,Sg=`#define TOON
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
}`,yg=`#define TOON
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
}`,Mg=`uniform float size;
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
}`,bg=`uniform vec3 diffuse;
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
}`,wg=`#include <common>
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
}`,Eg=`uniform vec3 color;
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
}`,Tg=`uniform float rotation;
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
}`,Ag=`uniform vec3 diffuse;
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
}`,Ve={alphahash_fragment:$p,alphahash_pars_fragment:Kp,alphamap_fragment:Zp,alphamap_pars_fragment:Jp,alphatest_fragment:Qp,alphatest_pars_fragment:jp,aomap_fragment:em,aomap_pars_fragment:tm,batching_pars_vertex:im,batching_vertex:nm,begin_vertex:sm,beginnormal_vertex:rm,bsdfs:am,iridescence_fragment:om,bumpmap_pars_fragment:lm,clipping_planes_fragment:cm,clipping_planes_pars_fragment:um,clipping_planes_pars_vertex:hm,clipping_planes_vertex:dm,color_fragment:fm,color_pars_fragment:pm,color_pars_vertex:mm,color_vertex:gm,common:vm,cube_uv_reflection_fragment:_m,defaultnormal_vertex:xm,displacementmap_pars_vertex:Sm,displacementmap_vertex:ym,emissivemap_fragment:Mm,emissivemap_pars_fragment:bm,colorspace_fragment:wm,colorspace_pars_fragment:Em,envmap_fragment:Tm,envmap_common_pars_fragment:Am,envmap_pars_fragment:Cm,envmap_pars_vertex:Rm,envmap_physical_pars_fragment:km,envmap_vertex:Pm,fog_vertex:Dm,fog_pars_vertex:Lm,fog_fragment:Im,fog_pars_fragment:Fm,gradientmap_pars_fragment:Nm,lightmap_pars_fragment:Um,lights_lambert_fragment:Om,lights_lambert_pars_fragment:Bm,lights_pars_begin:zm,lights_toon_fragment:Hm,lights_toon_pars_fragment:Vm,lights_phong_fragment:Gm,lights_phong_pars_fragment:Wm,lights_physical_fragment:Xm,lights_physical_pars_fragment:Ym,lights_fragment_begin:qm,lights_fragment_maps:$m,lights_fragment_end:Km,lightprobes_pars_fragment:Zm,logdepthbuf_fragment:Jm,logdepthbuf_pars_fragment:Qm,logdepthbuf_pars_vertex:jm,logdepthbuf_vertex:e0,map_fragment:t0,map_pars_fragment:i0,map_particle_fragment:n0,map_particle_pars_fragment:s0,metalnessmap_fragment:r0,metalnessmap_pars_fragment:a0,morphinstance_vertex:o0,morphcolor_vertex:l0,morphnormal_vertex:c0,morphtarget_pars_vertex:u0,morphtarget_vertex:h0,normal_fragment_begin:d0,normal_fragment_maps:f0,normal_pars_fragment:p0,normal_pars_vertex:m0,normal_vertex:g0,normalmap_pars_fragment:v0,clearcoat_normal_fragment_begin:_0,clearcoat_normal_fragment_maps:x0,clearcoat_pars_fragment:S0,iridescence_pars_fragment:y0,opaque_fragment:M0,packing:b0,premultiplied_alpha_fragment:w0,project_vertex:E0,dithering_fragment:T0,dithering_pars_fragment:A0,roughnessmap_fragment:C0,roughnessmap_pars_fragment:R0,shadowmap_pars_fragment:P0,shadowmap_pars_vertex:D0,shadowmap_vertex:L0,shadowmask_pars_fragment:I0,skinbase_vertex:F0,skinning_pars_vertex:N0,skinning_vertex:U0,skinnormal_vertex:O0,specularmap_fragment:B0,specularmap_pars_fragment:z0,tonemapping_fragment:k0,tonemapping_pars_fragment:H0,transmission_fragment:V0,transmission_pars_fragment:G0,uv_pars_fragment:W0,uv_pars_vertex:X0,uv_vertex:Y0,worldpos_vertex:q0,background_vert:$0,background_frag:K0,backgroundCube_vert:Z0,backgroundCube_frag:J0,cube_vert:Q0,cube_frag:j0,depth_vert:eg,depth_frag:tg,distance_vert:ig,distance_frag:ng,equirect_vert:sg,equirect_frag:rg,linedashed_vert:ag,linedashed_frag:og,meshbasic_vert:lg,meshbasic_frag:cg,meshlambert_vert:ug,meshlambert_frag:hg,meshmatcap_vert:dg,meshmatcap_frag:fg,meshnormal_vert:pg,meshnormal_frag:mg,meshphong_vert:gg,meshphong_frag:vg,meshphysical_vert:_g,meshphysical_frag:xg,meshtoon_vert:Sg,meshtoon_frag:yg,points_vert:Mg,points_frag:bg,shadow_vert:wg,shadow_frag:Eg,sprite_vert:Tg,sprite_frag:Ag},de={common:{diffuse:{value:new ae(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Oe}},envmap:{envMap:{value:null},envMapRotation:{value:new Oe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Oe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Oe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Oe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Oe},normalScale:{value:new Re(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Oe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Oe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Oe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Oe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ae(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new A},probesMax:{value:new A},probesResolution:{value:new A}},points:{diffuse:{value:new ae(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0},uvTransform:{value:new Oe}},sprite:{diffuse:{value:new ae(16777215)},opacity:{value:1},center:{value:new Re(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}}},zi={basic:{uniforms:Qt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.fog]),vertexShader:Ve.meshbasic_vert,fragmentShader:Ve.meshbasic_frag},lambert:{uniforms:Qt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new ae(0)},envMapIntensity:{value:1}}]),vertexShader:Ve.meshlambert_vert,fragmentShader:Ve.meshlambert_frag},phong:{uniforms:Qt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new ae(0)},specular:{value:new ae(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphong_vert,fragmentShader:Ve.meshphong_frag},standard:{uniforms:Qt([de.common,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.roughnessmap,de.metalnessmap,de.fog,de.lights,{emissive:{value:new ae(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag},toon:{uniforms:Qt([de.common,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.gradientmap,de.fog,de.lights,{emissive:{value:new ae(0)}}]),vertexShader:Ve.meshtoon_vert,fragmentShader:Ve.meshtoon_frag},matcap:{uniforms:Qt([de.common,de.bumpmap,de.normalmap,de.displacementmap,de.fog,{matcap:{value:null}}]),vertexShader:Ve.meshmatcap_vert,fragmentShader:Ve.meshmatcap_frag},points:{uniforms:Qt([de.points,de.fog]),vertexShader:Ve.points_vert,fragmentShader:Ve.points_frag},dashed:{uniforms:Qt([de.common,de.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ve.linedashed_vert,fragmentShader:Ve.linedashed_frag},depth:{uniforms:Qt([de.common,de.displacementmap]),vertexShader:Ve.depth_vert,fragmentShader:Ve.depth_frag},normal:{uniforms:Qt([de.common,de.bumpmap,de.normalmap,de.displacementmap,{opacity:{value:1}}]),vertexShader:Ve.meshnormal_vert,fragmentShader:Ve.meshnormal_frag},sprite:{uniforms:Qt([de.sprite,de.fog]),vertexShader:Ve.sprite_vert,fragmentShader:Ve.sprite_frag},background:{uniforms:{uvTransform:{value:new Oe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ve.background_vert,fragmentShader:Ve.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Oe}},vertexShader:Ve.backgroundCube_vert,fragmentShader:Ve.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ve.cube_vert,fragmentShader:Ve.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ve.equirect_vert,fragmentShader:Ve.equirect_frag},distance:{uniforms:Qt([de.common,de.displacementmap,{referencePosition:{value:new A},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ve.distance_vert,fragmentShader:Ve.distance_frag},shadow:{uniforms:Qt([de.lights,de.fog,{color:{value:new ae(0)},opacity:{value:1}}]),vertexShader:Ve.shadow_vert,fragmentShader:Ve.shadow_frag}};zi.physical={uniforms:Qt([zi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Oe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Oe},clearcoatNormalScale:{value:new Re(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Oe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Oe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Oe},sheen:{value:0},sheenColor:{value:new ae(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Oe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Oe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Oe},transmissionSamplerSize:{value:new Re},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Oe},attenuationDistance:{value:0},attenuationColor:{value:new ae(0)},specularColor:{value:new ae(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Oe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Oe},anisotropyVector:{value:new Re},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Oe}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag};const Qr={r:0,b:0,g:0},Cg=new Ze,pd=new Oe;pd.set(-1,0,0,0,1,0,0,0,1);function Rg(n,e,t,i,s,r){const a=new ae(0);let o=s===!0?0:1,c,l,h=null,d=0,u=null;function p(M){let b=M.isScene===!0?M.background:null;if(b&&b.isTexture){const y=M.backgroundBlurriness>0;b=e.get(b,y)}return b}function g(M){let b=!1;const y=p(M);y===null?m(a,o):y&&y.isColor&&(m(y,1),b=!0);const E=n.xr.getEnvironmentBlendMode();E==="additive"?t.buffers.color.setClear(0,0,0,1,r):E==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||b)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function x(M,b){const y=p(b);y&&(y.isCubeTexture||y.mapping===Da)?(l===void 0&&(l=new Kt(new wr(1,1,1),new ot({name:"BackgroundCubeMaterial",uniforms:Fs(zi.backgroundCube.uniforms),vertexShader:zi.backgroundCube.vertexShader,fragmentShader:zi.backgroundCube.fragmentShader,side:ti,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(E,T,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=y,l.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Cg.makeRotationFromEuler(b.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(pd),l.material.toneMapped=$e.getTransfer(y.colorSpace)!==at,(h!==y||d!==y.version||u!==n.toneMapping)&&(l.material.needsUpdate=!0,h=y,d=y.version,u=n.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new Kt(new cn(2,2),new ot({name:"BackgroundMaterial",uniforms:Fs(zi.background.uniforms),vertexShader:zi.background.vertexShader,fragmentShader:zi.background.fragmentShader,side:Ln,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.toneMapped=$e.getTransfer(y.colorSpace)!==at,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||d!==y.version||u!==n.toneMapping)&&(c.material.needsUpdate=!0,h=y,d=y.version,u=n.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function m(M,b){M.getRGB(Qr,ld(n)),t.buffers.color.setClear(Qr.r,Qr.g,Qr.b,b,r)}function f(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,b=1){a.set(M),o=b,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(M){o=M,m(a,o)},render:g,addToRenderList:x,dispose:f}}function Pg(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=u(null);let r=s,a=!1;function o(P,N,G,Z,O){let X=!1;const z=d(P,Z,G,N);r!==z&&(r=z,l(r.object)),X=p(P,Z,G,O),X&&g(P,Z,G,O),O!==null&&e.update(O,n.ELEMENT_ARRAY_BUFFER),(X||a)&&(a=!1,y(P,N,G,Z),O!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function c(){return n.createVertexArray()}function l(P){return n.bindVertexArray(P)}function h(P){return n.deleteVertexArray(P)}function d(P,N,G,Z){const O=Z.wireframe===!0;let X=i[N.id];X===void 0&&(X={},i[N.id]=X);const z=P.isInstancedMesh===!0?P.id:0;let J=X[z];J===void 0&&(J={},X[z]=J);let j=J[G.id];j===void 0&&(j={},J[G.id]=j);let ue=j[O];return ue===void 0&&(ue=u(c()),j[O]=ue),ue}function u(P){const N=[],G=[],Z=[];for(let O=0;O<t;O++)N[O]=0,G[O]=0,Z[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:G,attributeDivisors:Z,object:P,attributes:{},index:null}}function p(P,N,G,Z){const O=r.attributes,X=N.attributes;let z=0;const J=G.getAttributes();for(const j in J)if(J[j].location>=0){const fe=O[j];let ve=X[j];if(ve===void 0&&(j==="instanceMatrix"&&P.instanceMatrix&&(ve=P.instanceMatrix),j==="instanceColor"&&P.instanceColor&&(ve=P.instanceColor)),fe===void 0||fe.attribute!==ve||ve&&fe.data!==ve.data)return!0;z++}return r.attributesNum!==z||r.index!==Z}function g(P,N,G,Z){const O={},X=N.attributes;let z=0;const J=G.getAttributes();for(const j in J)if(J[j].location>=0){let fe=X[j];fe===void 0&&(j==="instanceMatrix"&&P.instanceMatrix&&(fe=P.instanceMatrix),j==="instanceColor"&&P.instanceColor&&(fe=P.instanceColor));const ve={};ve.attribute=fe,fe&&fe.data&&(ve.data=fe.data),O[j]=ve,z++}r.attributes=O,r.attributesNum=z,r.index=Z}function x(){const P=r.newAttributes;for(let N=0,G=P.length;N<G;N++)P[N]=0}function m(P){f(P,0)}function f(P,N){const G=r.newAttributes,Z=r.enabledAttributes,O=r.attributeDivisors;G[P]=1,Z[P]===0&&(n.enableVertexAttribArray(P),Z[P]=1),O[P]!==N&&(n.vertexAttribDivisor(P,N),O[P]=N)}function M(){const P=r.newAttributes,N=r.enabledAttributes;for(let G=0,Z=N.length;G<Z;G++)N[G]!==P[G]&&(n.disableVertexAttribArray(G),N[G]=0)}function b(P,N,G,Z,O,X,z){z===!0?n.vertexAttribIPointer(P,N,G,O,X):n.vertexAttribPointer(P,N,G,Z,O,X)}function y(P,N,G,Z){x();const O=Z.attributes,X=G.getAttributes(),z=N.defaultAttributeValues;for(const J in X){const j=X[J];if(j.location>=0){let ue=O[J];if(ue===void 0&&(J==="instanceMatrix"&&P.instanceMatrix&&(ue=P.instanceMatrix),J==="instanceColor"&&P.instanceColor&&(ue=P.instanceColor)),ue!==void 0){const fe=ue.normalized,ve=ue.itemSize,ye=e.get(ue);if(ye===void 0)continue;const Be=ye.buffer,Ue=ye.type,q=ye.bytesPerElement,se=Ue===n.INT||Ue===n.UNSIGNED_INT||ue.gpuType===$l;if(ue.isInterleavedBufferAttribute){const ee=ue.data,Ne=ee.stride,ze=ue.offset;if(ee.isInstancedInterleavedBuffer){for(let De=0;De<j.locationSize;De++)f(j.location+De,ee.meshPerAttribute);P.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let De=0;De<j.locationSize;De++)m(j.location+De);n.bindBuffer(n.ARRAY_BUFFER,Be);for(let De=0;De<j.locationSize;De++)b(j.location+De,ve/j.locationSize,Ue,fe,Ne*q,(ze+ve/j.locationSize*De)*q,se)}else{if(ue.isInstancedBufferAttribute){for(let ee=0;ee<j.locationSize;ee++)f(j.location+ee,ue.meshPerAttribute);P.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let ee=0;ee<j.locationSize;ee++)m(j.location+ee);n.bindBuffer(n.ARRAY_BUFFER,Be);for(let ee=0;ee<j.locationSize;ee++)b(j.location+ee,ve/j.locationSize,Ue,fe,ve*q,ve/j.locationSize*ee*q,se)}}else if(z!==void 0){const fe=z[J];if(fe!==void 0)switch(fe.length){case 2:n.vertexAttrib2fv(j.location,fe);break;case 3:n.vertexAttrib3fv(j.location,fe);break;case 4:n.vertexAttrib4fv(j.location,fe);break;default:n.vertexAttrib1fv(j.location,fe)}}}}M()}function E(){C();for(const P in i){const N=i[P];for(const G in N){const Z=N[G];for(const O in Z){const X=Z[O];for(const z in X)h(X[z].object),delete X[z];delete Z[O]}}delete i[P]}}function T(P){if(i[P.id]===void 0)return;const N=i[P.id];for(const G in N){const Z=N[G];for(const O in Z){const X=Z[O];for(const z in X)h(X[z].object),delete X[z];delete Z[O]}}delete i[P.id]}function R(P){for(const N in i){const G=i[N];for(const Z in G){const O=G[Z];if(O[P.id]===void 0)continue;const X=O[P.id];for(const z in X)h(X[z].object),delete X[z];delete O[P.id]}}}function _(P){for(const N in i){const G=i[N],Z=P.isInstancedMesh===!0?P.id:0,O=G[Z];if(O!==void 0){for(const X in O){const z=O[X];for(const J in z)h(z[J].object),delete z[J];delete O[X]}delete G[Z],Object.keys(G).length===0&&delete i[N]}}}function C(){D(),a=!0,r!==s&&(r=s,l(r.object))}function D(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:C,resetDefaultState:D,dispose:E,releaseStatesOfGeometry:T,releaseStatesOfObject:_,releaseStatesOfProgram:R,initAttributes:x,enableAttribute:m,disableUnusedAttributes:M}}function Dg(n,e,t){let i;function s(c){i=c}function r(c,l){n.drawArrays(i,c,l),t.update(l,i,1)}function a(c,l,h){h!==0&&(n.drawArraysInstanced(i,c,l,h),t.update(l,i,h))}function o(c,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,h);let u=0;for(let p=0;p<h;p++)u+=l[p];t.update(u,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Lg(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(R){return!(R!==Di&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const _=R===bi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==pi&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==ki&&!_)}function c(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(Pe("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Pe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),f=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),b=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),E=n.getParameter(n.MAX_SAMPLES),T=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:M,maxVaryings:b,maxFragmentUniforms:y,maxSamples:E,samples:T}}function Ig(n){const e=this;let t=null,i=0,s=!1,r=!1;const a=new Mn,o=new Oe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const p=d.length!==0||u||i!==0||s;return s=u,i=d.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,p){const g=d.clippingPlanes,x=d.clipIntersection,m=d.clipShadows,f=n.get(d);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{const M=r?0:i,b=M*4;let y=f.clippingState||null;c.value=y,y=h(g,u,b,p);for(let E=0;E!==b;++E)y[E]=t[E];f.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(d,u,p,g){const x=d!==null?d.length:0;let m=null;if(x!==0){if(m=c.value,g!==!0||m===null){const f=p+x*4,M=u.matrixWorldInverse;o.getNormalMatrix(M),(m===null||m.length<f)&&(m=new Float32Array(f));for(let b=0,y=p;b!==x;++b,y+=4)a.copy(d[b]).applyMatrix4(M,o),a.normal.toArray(m,y),m[y+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}const An=4,bu=[.125,.215,.35,.446,.526,.582],Yn=20,Fg=256,$s=new Ia,wu=new ae;let Mo=null,bo=0,wo=0,Eo=!1;const Ng=new A;class Eu{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){const{size:a=256,position:o=Ng}=r;Mo=this._renderer.getRenderTarget(),bo=this._renderer.getActiveCubeFace(),wo=this._renderer.getActiveMipmapLevel(),Eo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,s,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Cu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Au(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Mo,bo,wo),this._renderer.xr.enabled=Eo,e.scissorTest=!1,bs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===es||e.mapping===Ls?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Mo=this._renderer.getRenderTarget(),bo=this._renderer.getActiveCubeFace(),wo=this._renderer.getActiveMipmapLevel(),Eo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:bt,minFilter:bt,generateMipmaps:!1,type:bi,format:Di,colorSpace:xa,depthBuffer:!1},s=Tu(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Tu(e,t,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Ug(r)),this._blurMaterial=Bg(r,e,t),this._ggxMaterial=Og(r,e,t)}return s}_compileMaterial(e){const t=new Kt(new At,e);this._renderer.compile(t,$s)}_sceneToCubeUV(e,t,i,s,r){const c=new yi(90,1,t,i),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,p=d.toneMapping;d.getClearColor(wu),d.toneMapping=Li,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Kt(new wr,new sc({name:"PMREM.Background",side:ti,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,m=x.material;let f=!1;const M=e.background;M?M.isColor&&(m.color.copy(M),e.background=null,f=!0):(m.color.copy(wu),f=!0);for(let b=0;b<6;b++){const y=b%3;y===0?(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[b],r.y,r.z)):y===1?(c.up.set(0,0,l[b]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[b],r.z)):(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[b]));const E=this._cubeSize;bs(s,y*E,b>2?E:0,E,E),d.setRenderTarget(s),f&&d.render(x,c),d.render(e,c)}d.toneMapping=p,d.autoClear=u,e.background=M}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===es||e.mapping===Ls;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Cu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Au());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const c=this._cubeSize;bs(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(a,$s)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const c=a.uniforms,l=i/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),d=Math.sqrt(l*l-h*h),u=0+l*1.25,p=d*u,{_lodMax:g}=this,x=this._sizeLods[i],m=3*x*(i>g-An?i-g+An:0),f=4*(this._cubeSize-x);c.envMap.value=e.texture,c.roughness.value=p,c.mipInt.value=g-t,bs(r,m,f,3*x,2*x),s.setRenderTarget(r),s.render(o,$s),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=g-i,bs(e,m,f,3*x,2*x),s.setRenderTarget(e),s.render(o,$s)}_blur(e,t,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,s,"latitudinal",r),this._halfBlur(a,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&je("blur direction must be either latitudinal or longitudinal!");const h=3,d=this._lodMeshes[s];d.material=l;const u=l.uniforms,p=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Yn-1),x=r/g,m=isFinite(r)?1+Math.floor(h*x):Yn;m>Yn&&Pe(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Yn}`);const f=[];let M=0;for(let R=0;R<Yn;++R){const _=R/x,C=Math.exp(-_*_/2);f.push(C),R===0?M+=C:R<m&&(M+=2*C)}for(let R=0;R<f.length;R++)f[R]=f[R]/M;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=f,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:b}=this;u.dTheta.value=g,u.mipInt.value=b-i;const y=this._sizeLods[s],E=3*y*(s>b-An?s-b+An:0),T=4*(this._cubeSize-y);bs(t,E,T,3*y,2*y),c.setRenderTarget(t),c.render(d,$s)}}function Ug(n){const e=[],t=[],i=[];let s=n;const r=n-An+1+bu.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let c=1/o;a>n-An?c=bu[a-n+An-1]:a===0&&(c=0),t.push(c);const l=1/(o-2),h=-l,d=1+l,u=[h,h,d,h,d,d,h,h,d,d,h,d],p=6,g=6,x=3,m=2,f=1,M=new Float32Array(x*g*p),b=new Float32Array(m*g*p),y=new Float32Array(f*g*p);for(let T=0;T<p;T++){const R=T%3*2/3-1,_=T>2?0:-1,C=[R,_,0,R+2/3,_,0,R+2/3,_+1,0,R,_,0,R+2/3,_+1,0,R,_+1,0];M.set(C,x*g*T),b.set(u,m*g*T);const D=[T,T,T,T,T,T];y.set(D,f*g*T)}const E=new At;E.setAttribute("position",new We(M,x)),E.setAttribute("uv",new We(b,m)),E.setAttribute("faceIndex",new We(y,f)),i.push(new Kt(E,null)),s>An&&s--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function Tu(n,e,t){const i=new mi(n,e,t);return i.texture.mapping=Da,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function bs(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function Og(n,e,t){return new ot({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Fg,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Fa(),fragmentShader:`

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
		`,blending:sn,depthTest:!1,depthWrite:!1})}function Bg(n,e,t){const i=new Float32Array(Yn),s=new A(0,1,0);return new ot({name:"SphericalGaussianBlur",defines:{n:Yn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Fa(),fragmentShader:`

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
		`,blending:sn,depthTest:!1,depthWrite:!1})}function Au(){return new ot({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Fa(),fragmentShader:`

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
		`,blending:sn,depthTest:!1,depthWrite:!1})}function Cu(){return new ot({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Fa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:sn,depthTest:!1,depthWrite:!1})}function Fa(){return`

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
	`}class md extends mi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new ad(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new wr(5,5,5),r=new ot({name:"CubemapFromEquirect",uniforms:Fs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:ti,blending:sn});r.uniforms.tEquirect.value=t;const a=new Kt(s,r),o=t.minFilter;return t.minFilter===$n&&(t.minFilter=bt),new Gp(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}}function zg(n){let e=new WeakMap,t=new WeakMap,i=null;function s(u,p=!1){return u==null?null:p?a(u):r(u)}function r(u){if(u&&u.isTexture){const p=u.mapping;if(p===Xa||p===Ya)if(e.has(u)){const g=e.get(u).texture;return o(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const x=new md(g.height);return x.fromEquirectangularTexture(n,u),e.set(u,x),u.addEventListener("dispose",l),o(x.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const p=u.mapping,g=p===Xa||p===Ya,x=p===es||p===Ls;if(g||x){let m=t.get(u);const f=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==f)return i===null&&(i=new Eu(n)),m=g?i.fromEquirectangular(u,m):i.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),m.texture;if(m!==void 0)return m.texture;{const M=u.image;return g&&M&&M.height>0||x&&M&&c(M)?(i===null&&(i=new Eu(n)),m=g?i.fromEquirectangular(u):i.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function o(u,p){return p===Xa?u.mapping=es:p===Ya&&(u.mapping=Ls),u}function c(u){let p=0;const g=6;for(let x=0;x<g;x++)u[x]!==void 0&&p++;return p===g}function l(u){const p=u.target;p.removeEventListener("dispose",l);const g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function h(u){const p=u.target;p.removeEventListener("dispose",h);const g=t.get(p);g!==void 0&&(t.delete(p),g.dispose())}function d(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:d}}function kg(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&Rs("WebGLRenderer: "+i+" extension not supported."),s}}}function Hg(n,e,t,i){const s={},r=new WeakMap;function a(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete s[u.id];const p=r.get(u);p&&(e.remove(p),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,t.memory.geometries++),u}function c(d){const u=d.attributes;for(const p in u)e.update(u[p],n.ARRAY_BUFFER)}function l(d){const u=[],p=d.index,g=d.attributes.position;let x=0;if(g===void 0)return;if(p!==null){const M=p.array;x=p.version;for(let b=0,y=M.length;b<y;b+=3){const E=M[b+0],T=M[b+1],R=M[b+2];u.push(E,T,T,R,R,E)}}else{const M=g.array;x=g.version;for(let b=0,y=M.length/3-1;b<y;b+=3){const E=b+0,T=b+1,R=b+2;u.push(E,T,T,R,R,E)}}const m=new(g.count>=65535?rd:sd)(u,1);m.version=x;const f=r.get(d);f&&e.remove(f),r.set(d,m)}function h(d){const u=r.get(d);if(u){const p=d.index;p!==null&&u.version<p.version&&l(d)}else l(d);return r.get(d)}return{get:o,update:c,getWireframeAttribute:h}}function Vg(n,e,t){let i;function s(d){i=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function c(d,u){n.drawElements(i,u,r,d*a),t.update(u,i,1)}function l(d,u,p){p!==0&&(n.drawElementsInstanced(i,u,r,d*a,p),t.update(u,i,p))}function h(d,u,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,r,d,0,p);let x=0;for(let m=0;m<p;m++)x+=u[m];t.update(x,i,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function Gg(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:je("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function Wg(n,e,t){const i=new WeakMap,s=new xt;function r(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let u=i.get(o);if(u===void 0||u.count!==d){let D=function(){_.dispose(),i.delete(o),o.removeEventListener("dispose",D)};var p=D;u!==void 0&&u.texture.dispose();const g=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],M=o.morphAttributes.normal||[],b=o.morphAttributes.color||[];let y=0;g===!0&&(y=1),x===!0&&(y=2),m===!0&&(y=3);let E=o.attributes.position.count*y,T=1;E>e.maxTextureSize&&(T=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);const R=new Float32Array(E*T*4*d),_=new ed(R,E,T,d);_.type=ki,_.needsUpdate=!0;const C=y*4;for(let P=0;P<d;P++){const N=f[P],G=M[P],Z=b[P],O=E*T*4*P;for(let X=0;X<N.count;X++){const z=X*C;g===!0&&(s.fromBufferAttribute(N,X),R[O+z+0]=s.x,R[O+z+1]=s.y,R[O+z+2]=s.z,R[O+z+3]=0),x===!0&&(s.fromBufferAttribute(G,X),R[O+z+4]=s.x,R[O+z+5]=s.y,R[O+z+6]=s.z,R[O+z+7]=0),m===!0&&(s.fromBufferAttribute(Z,X),R[O+z+8]=s.x,R[O+z+9]=s.y,R[O+z+10]=s.z,R[O+z+11]=Z.itemSize===4?s.w:1)}}u={count:d,texture:_,size:new Re(E,T)},i.set(o,u),o.addEventListener("dispose",D)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const x=o.morphTargetsRelative?1:1-g;c.getUniforms().setValue(n,"morphTargetBaseInfluence",x),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",u.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:r}}function Xg(n,e,t,i,s){let r=new WeakMap;function a(l){const h=s.render.frame,d=l.geometry,u=e.get(l,d);if(r.get(u)!==h&&(e.update(u),r.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){const p=l.skeleton;r.get(p)!==h&&(p.update(),r.set(p,h))}return u}function o(){r=new WeakMap}function c(l){const h=l.target;h.removeEventListener("dispose",c),i.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}const Yg={[Bh]:"LINEAR_TONE_MAPPING",[zh]:"REINHARD_TONE_MAPPING",[kh]:"CINEON_TONE_MAPPING",[Hh]:"ACES_FILMIC_TONE_MAPPING",[Gh]:"AGX_TONE_MAPPING",[Wh]:"NEUTRAL_TONE_MAPPING",[Vh]:"CUSTOM_TONE_MAPPING"};function qg(n,e,t,i,s,r){const a=new mi(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,depthTexture:s?new In(e,t):void 0}),o=new mi(e,t,{type:bi,depthBuffer:!1,stencilBuffer:!1}),c=new At;c.setAttribute("position",new $t([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new $t([0,2,0,0,2,0],2));const l=new Op({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new Kt(c,l),d=new Ia(-1,1,1,-1,0,1);let u=null,p=null,g=!1,x,m=null,f=[],M=!1;this.setSize=function(b,y){a.setSize(b,y),o.setSize(b,y);for(let E=0;E<f.length;E++){const T=f[E];T.setSize&&T.setSize(b,y)}},this.setEffects=function(b){f=b,M=f.length>0&&f[0].isRenderPass===!0;const y=a.width,E=a.height;for(let T=0;T<f.length;T++){const R=f[T];R.setSize&&R.setSize(y,E)}},this.begin=function(b,y){if(g||b.toneMapping===Li&&f.length===0)return!1;if(m=y,y!==null){const E=y.width,T=y.height;(a.width!==E||a.height!==T)&&this.setSize(E,T)}return M===!1&&b.setRenderTarget(a),x=b.toneMapping,b.toneMapping=Li,!0},this.hasRenderPass=function(){return M},this.end=function(b,y){b.toneMapping=x,g=!0;let E=a,T=o;for(let R=0;R<f.length;R++){const _=f[R];if(_.enabled!==!1&&(_.render(b,T,E,y),_.needsSwap!==!1)){const C=E;E=T,T=C}}if(u!==b.outputColorSpace||p!==b.toneMapping){u=b.outputColorSpace,p=b.toneMapping,l.defines={},$e.getTransfer(u)===at&&(l.defines.SRGB_TRANSFER="");const R=Yg[p];R&&(l.defines[R]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=E.texture,b.setRenderTarget(m),b.render(h,d),m=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),c.dispose(),l.dispose()}}const gd=new qt,Nl=new In(1,1),vd=new ed,_d=new cp,xd=new ad,Ru=[],Pu=[],Du=new Float32Array(16),Lu=new Float32Array(9),Iu=new Float32Array(4);function Bs(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=Ru[s];if(r===void 0&&(r=new Float32Array(s),Ru[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function Ut(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Ot(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Na(n,e){let t=Pu[e];t===void 0&&(t=new Int32Array(e),Pu[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function $g(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Kg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;n.uniform2fv(this.addr,e),Ot(t,e)}}function Zg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ut(t,e))return;n.uniform3fv(this.addr,e),Ot(t,e)}}function Jg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;n.uniform4fv(this.addr,e),Ot(t,e)}}function Qg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ut(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Ot(t,e)}else{if(Ut(t,i))return;Iu.set(i),n.uniformMatrix2fv(this.addr,!1,Iu),Ot(t,i)}}function jg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ut(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Ot(t,e)}else{if(Ut(t,i))return;Lu.set(i),n.uniformMatrix3fv(this.addr,!1,Lu),Ot(t,i)}}function ev(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ut(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Ot(t,e)}else{if(Ut(t,i))return;Du.set(i),n.uniformMatrix4fv(this.addr,!1,Du),Ot(t,i)}}function tv(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function iv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;n.uniform2iv(this.addr,e),Ot(t,e)}}function nv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ut(t,e))return;n.uniform3iv(this.addr,e),Ot(t,e)}}function sv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;n.uniform4iv(this.addr,e),Ot(t,e)}}function rv(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function av(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;n.uniform2uiv(this.addr,e),Ot(t,e)}}function ov(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ut(t,e))return;n.uniform3uiv(this.addr,e),Ot(t,e)}}function lv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;n.uniform4uiv(this.addr,e),Ot(t,e)}}function cv(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Nl.compareFunction=t.isReversedDepthBuffer()?tc:ec,r=Nl):r=gd,t.setTexture2D(e||r,s)}function uv(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||_d,s)}function hv(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||xd,s)}function dv(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||vd,s)}function fv(n){switch(n){case 5126:return $g;case 35664:return Kg;case 35665:return Zg;case 35666:return Jg;case 35674:return Qg;case 35675:return jg;case 35676:return ev;case 5124:case 35670:return tv;case 35667:case 35671:return iv;case 35668:case 35672:return nv;case 35669:case 35673:return sv;case 5125:return rv;case 36294:return av;case 36295:return ov;case 36296:return lv;case 35678:case 36198:case 36298:case 36306:case 35682:return cv;case 35679:case 36299:case 36307:return uv;case 35680:case 36300:case 36308:case 36293:return hv;case 36289:case 36303:case 36311:case 36292:return dv}}function pv(n,e){n.uniform1fv(this.addr,e)}function mv(n,e){const t=Bs(e,this.size,2);n.uniform2fv(this.addr,t)}function gv(n,e){const t=Bs(e,this.size,3);n.uniform3fv(this.addr,t)}function vv(n,e){const t=Bs(e,this.size,4);n.uniform4fv(this.addr,t)}function _v(n,e){const t=Bs(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function xv(n,e){const t=Bs(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Sv(n,e){const t=Bs(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function yv(n,e){n.uniform1iv(this.addr,e)}function Mv(n,e){n.uniform2iv(this.addr,e)}function bv(n,e){n.uniform3iv(this.addr,e)}function wv(n,e){n.uniform4iv(this.addr,e)}function Ev(n,e){n.uniform1uiv(this.addr,e)}function Tv(n,e){n.uniform2uiv(this.addr,e)}function Av(n,e){n.uniform3uiv(this.addr,e)}function Cv(n,e){n.uniform4uiv(this.addr,e)}function Rv(n,e,t){const i=this.cache,s=e.length,r=Na(t,s);Ut(i,r)||(n.uniform1iv(this.addr,r),Ot(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=Nl:a=gd;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function Pv(n,e,t){const i=this.cache,s=e.length,r=Na(t,s);Ut(i,r)||(n.uniform1iv(this.addr,r),Ot(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||_d,r[a])}function Dv(n,e,t){const i=this.cache,s=e.length,r=Na(t,s);Ut(i,r)||(n.uniform1iv(this.addr,r),Ot(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||xd,r[a])}function Lv(n,e,t){const i=this.cache,s=e.length,r=Na(t,s);Ut(i,r)||(n.uniform1iv(this.addr,r),Ot(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||vd,r[a])}function Iv(n){switch(n){case 5126:return pv;case 35664:return mv;case 35665:return gv;case 35666:return vv;case 35674:return _v;case 35675:return xv;case 35676:return Sv;case 5124:case 35670:return yv;case 35667:case 35671:return Mv;case 35668:case 35672:return bv;case 35669:case 35673:return wv;case 5125:return Ev;case 36294:return Tv;case 36295:return Av;case 36296:return Cv;case 35678:case 36198:case 36298:case 36306:case 35682:return Rv;case 35679:case 36299:case 36307:return Pv;case 35680:case 36300:case 36308:case 36293:return Dv;case 36289:case 36303:case 36311:case 36292:return Lv}}class Fv{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=fv(t.type)}}class Nv{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Iv(t.type)}}class Uv{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],i)}}}const To=/(\w+)(\])?(\[|\.)?/g;function Fu(n,e){n.seq.push(e),n.map[e.id]=e}function Ov(n,e,t){const i=n.name,s=i.length;for(To.lastIndex=0;;){const r=To.exec(i),a=To.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){Fu(t,l===void 0?new Fv(o,n,e):new Nv(o,n,e));break}else{let d=t.map[o];d===void 0&&(d=new Uv(o),Fu(t,d)),t=d}}}class pa{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);Ov(o,c,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&i.push(a)}return i}}function Nu(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Bv=37297;let zv=0;function kv(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const Uu=new Oe;function Hv(n){$e._getMatrix(Uu,$e.workingColorSpace,n);const e=`mat3( ${Uu.elements.map(t=>t.toFixed(4))} )`;switch($e.getTransfer(n)){case Sa:return[e,"LinearTransferOETF"];case at:return[e,"sRGBTransferOETF"];default:return Pe("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Ou(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+kv(n.getShaderSource(e),o)}else return r}function Vv(n,e){const t=Hv(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Gv={[Bh]:"Linear",[zh]:"Reinhard",[kh]:"Cineon",[Hh]:"ACESFilmic",[Gh]:"AgX",[Wh]:"Neutral",[Vh]:"Custom"};function Wv(n,e){const t=Gv[e];return t===void 0?(Pe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const jr=new A;function Xv(){$e.getLuminanceCoefficients(jr);const n=jr.x.toFixed(4),e=jr.y.toFixed(4),t=jr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Yv(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(or).join(`
`)}function qv(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function $v(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function or(n){return n!==""}function Bu(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function zu(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Kv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ul(n){return n.replace(Kv,Jv)}const Zv=new Map;function Jv(n,e){let t=Ve[e];if(t===void 0){const i=Zv.get(e);if(i!==void 0)t=Ve[i],Pe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Ul(t)}const Qv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ku(n){return n.replace(Qv,jv)}function jv(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Hu(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const e_={[ca]:"SHADOWMAP_TYPE_PCF",[ar]:"SHADOWMAP_TYPE_VSM"};function t_(n){return e_[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const i_={[es]:"ENVMAP_TYPE_CUBE",[Ls]:"ENVMAP_TYPE_CUBE",[Da]:"ENVMAP_TYPE_CUBE_UV"};function n_(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":i_[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const s_={[Ls]:"ENVMAP_MODE_REFRACTION"};function r_(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":s_[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const a_={[Oh]:"ENVMAP_BLENDING_MULTIPLY",[Af]:"ENVMAP_BLENDING_MIX",[Cf]:"ENVMAP_BLENDING_ADD"};function o_(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":a_[n.combine]||"ENVMAP_BLENDING_NONE"}function l_(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function c_(n,e,t,i){const s=n.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=t_(t),l=n_(t),h=r_(t),d=o_(t),u=l_(t),p=Yv(t),g=qv(r),x=s.createProgram();let m,f,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(or).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(or).join(`
`),f.length>0&&(f+=`
`)):(m=[Hu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(or).join(`
`),f=[Hu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Li?"#define TONE_MAPPING":"",t.toneMapping!==Li?Ve.tonemapping_pars_fragment:"",t.toneMapping!==Li?Wv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ve.colorspace_pars_fragment,Vv("linearToOutputTexel",t.outputColorSpace),Xv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(or).join(`
`)),a=Ul(a),a=Bu(a,t),a=zu(a,t),o=Ul(o),o=Bu(o,t),o=zu(o,t),a=ku(a),o=ku(o),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===Gc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Gc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const b=M+m+a,y=M+f+o,E=Nu(s,s.VERTEX_SHADER,b),T=Nu(s,s.FRAGMENT_SHADER,y);s.attachShader(x,E),s.attachShader(x,T),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function R(P){if(n.debug.checkShaderErrors){const N=s.getProgramInfoLog(x)||"",G=s.getShaderInfoLog(E)||"",Z=s.getShaderInfoLog(T)||"",O=N.trim(),X=G.trim(),z=Z.trim();let J=!0,j=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(J=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,x,E,T);else{const ue=Ou(s,E,"vertex"),fe=Ou(s,T,"fragment");je("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+O+`
`+ue+`
`+fe)}else O!==""?Pe("WebGLProgram: Program Info Log:",O):(X===""||z==="")&&(j=!1);j&&(P.diagnostics={runnable:J,programLog:O,vertexShader:{log:X,prefix:m},fragmentShader:{log:z,prefix:f}})}s.deleteShader(E),s.deleteShader(T),_=new pa(s,x),C=$v(s,x)}let _;this.getUniforms=function(){return _===void 0&&R(this),_};let C;this.getAttributes=function(){return C===void 0&&R(this),C};let D=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=s.getProgramParameter(x,Bv)),D},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=zv++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=E,this.fragmentShader=T,this}let u_=0;class h_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new d_(e),t.set(e,i)),i}}class d_{constructor(e){this.id=u_++,this.code=e,this.usedTimes=0}}function f_(n){return n===ts||n===va||n===_a}function p_(n,e,t,i,s,r){const a=new td,o=new h_,c=new Set,l=[],h=new Map,d=i.logarithmicDepthBuffer;let u=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(_){return c.add(_),_===0?"uv":`uv${_}`}function x(_,C,D,P,N,G){const Z=P.fog,O=N.geometry,X=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?P.environment:null,z=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,J=e.get(_.envMap||X,z),j=J&&J.mapping===Da?J.image.height:null,ue=p[_.type];_.precision!==null&&(u=i.getMaxPrecision(_.precision),u!==_.precision&&Pe("WebGLProgram.getParameters:",_.precision,"not supported, using",u,"instead."));const fe=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,ve=fe!==void 0?fe.length:0;let ye=0;O.morphAttributes.position!==void 0&&(ye=1),O.morphAttributes.normal!==void 0&&(ye=2),O.morphAttributes.color!==void 0&&(ye=3);let Be,Ue,q,se;if(ue){const Me=zi[ue];Be=Me.vertexShader,Ue=Me.fragmentShader}else{Be=_.vertexShader,Ue=_.fragmentShader;const Me=o.getVertexShaderStage(_),yt=o.getFragmentShaderStage(_);o.update(_,Me,yt),q=Me.id,se=yt.id}const ee=n.getRenderTarget(),Ne=n.state.buffers.depth.getReversed(),ze=N.isInstancedMesh===!0,De=N.isBatchedMesh===!0,wt=!!_.map,Ye=!!_.matcap,ht=!!J,it=!!_.aoMap,Je=!!_.lightMap,Ct=!!_.bumpMap&&_.wireframe===!1,Lt=!!_.normalMap,Bt=!!_.displacementMap,kt=!!_.emissiveMap,St=!!_.metalnessMap,Rt=!!_.roughnessMap,I=_.anisotropy>0,ii=_.clearcoat>0,rt=_.dispersion>0,w=_.iridescence>0,v=_.sheen>0,U=_.transmission>0,H=I&&!!_.anisotropyMap,W=ii&&!!_.clearcoatMap,te=ii&&!!_.clearcoatNormalMap,re=ii&&!!_.clearcoatRoughnessMap,Y=w&&!!_.iridescenceMap,K=w&&!!_.iridescenceThicknessMap,oe=v&&!!_.sheenColorMap,Ee=v&&!!_.sheenRoughnessMap,he=!!_.specularMap,le=!!_.specularColorMap,Ce=!!_.specularIntensityMap,Le=U&&!!_.transmissionMap,ke=U&&!!_.thicknessMap,L=!!_.gradientMap,ie=!!_.alphaMap,$=_.alphaTest>0,ce=!!_.alphaHash,ge=!!_.extensions;let Q=Li;_.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(Q=n.toneMapping);const we={shaderID:ue,shaderType:_.type,shaderName:_.name,vertexShader:Be,fragmentShader:Ue,defines:_.defines,customVertexShaderID:q,customFragmentShaderID:se,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:u,batching:De,batchingColor:De&&N._colorsTexture!==null,instancing:ze,instancingColor:ze&&N.instanceColor!==null,instancingMorph:ze&&N.morphTexture!==null,outputColorSpace:ee===null?n.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:$e.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:wt,matcap:Ye,envMap:ht,envMapMode:ht&&J.mapping,envMapCubeUVHeight:j,aoMap:it,lightMap:Je,bumpMap:Ct,normalMap:Lt,displacementMap:Bt,emissiveMap:kt,normalMapObjectSpace:Lt&&_.normalMapType===Df,normalMapTangentSpace:Lt&&_.normalMapType===kc,packedNormalMap:Lt&&_.normalMapType===kc&&f_(_.normalMap.format),metalnessMap:St,roughnessMap:Rt,anisotropy:I,anisotropyMap:H,clearcoat:ii,clearcoatMap:W,clearcoatNormalMap:te,clearcoatRoughnessMap:re,dispersion:rt,iridescence:w,iridescenceMap:Y,iridescenceThicknessMap:K,sheen:v,sheenColorMap:oe,sheenRoughnessMap:Ee,specularMap:he,specularColorMap:le,specularIntensityMap:Ce,transmission:U,transmissionMap:Le,thicknessMap:ke,gradientMap:L,opaque:_.transparent===!1&&_.blending===rn&&_.alphaToCoverage===!1,alphaMap:ie,alphaTest:$,alphaHash:ce,combine:_.combine,mapUv:wt&&g(_.map.channel),aoMapUv:it&&g(_.aoMap.channel),lightMapUv:Je&&g(_.lightMap.channel),bumpMapUv:Ct&&g(_.bumpMap.channel),normalMapUv:Lt&&g(_.normalMap.channel),displacementMapUv:Bt&&g(_.displacementMap.channel),emissiveMapUv:kt&&g(_.emissiveMap.channel),metalnessMapUv:St&&g(_.metalnessMap.channel),roughnessMapUv:Rt&&g(_.roughnessMap.channel),anisotropyMapUv:H&&g(_.anisotropyMap.channel),clearcoatMapUv:W&&g(_.clearcoatMap.channel),clearcoatNormalMapUv:te&&g(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:re&&g(_.clearcoatRoughnessMap.channel),iridescenceMapUv:Y&&g(_.iridescenceMap.channel),iridescenceThicknessMapUv:K&&g(_.iridescenceThicknessMap.channel),sheenColorMapUv:oe&&g(_.sheenColorMap.channel),sheenRoughnessMapUv:Ee&&g(_.sheenRoughnessMap.channel),specularMapUv:he&&g(_.specularMap.channel),specularColorMapUv:le&&g(_.specularColorMap.channel),specularIntensityMapUv:Ce&&g(_.specularIntensityMap.channel),transmissionMapUv:Le&&g(_.transmissionMap.channel),thicknessMapUv:ke&&g(_.thicknessMap.channel),alphaMapUv:ie&&g(_.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(Lt||I),vertexNormals:!!O.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!O.attributes.uv&&(wt||ie),fog:!!Z,useFog:_.fog===!0,fogExp2:!!Z&&Z.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||O.attributes.normal===void 0&&Lt===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Ne,skinning:N.isSkinnedMesh===!0,hasPositionAttribute:O.attributes.position!==void 0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:ve,morphTextureStride:ye,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numLightProbeGrids:G.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:n.shadowMap.enabled&&D.length>0,shadowMapType:n.shadowMap.type,toneMapping:Q,decodeVideoTexture:wt&&_.map.isVideoTexture===!0&&$e.getTransfer(_.map.colorSpace)===at,decodeVideoTextureEmissive:kt&&_.emissiveMap.isVideoTexture===!0&&$e.getTransfer(_.emissiveMap.colorSpace)===at,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Ri,flipSided:_.side===ti,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:ge&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ge&&_.extensions.multiDraw===!0||De)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return we.vertexUv1s=c.has(1),we.vertexUv2s=c.has(2),we.vertexUv3s=c.has(3),c.clear(),we}function m(_){const C=[];if(_.shaderID?C.push(_.shaderID):(C.push(_.customVertexShaderID),C.push(_.customFragmentShaderID)),_.defines!==void 0)for(const D in _.defines)C.push(D),C.push(_.defines[D]);return _.isRawShaderMaterial===!1&&(f(C,_),M(C,_),C.push(n.outputColorSpace)),C.push(_.customProgramCacheKey),C.join()}function f(_,C){_.push(C.precision),_.push(C.outputColorSpace),_.push(C.envMapMode),_.push(C.envMapCubeUVHeight),_.push(C.mapUv),_.push(C.alphaMapUv),_.push(C.lightMapUv),_.push(C.aoMapUv),_.push(C.bumpMapUv),_.push(C.normalMapUv),_.push(C.displacementMapUv),_.push(C.emissiveMapUv),_.push(C.metalnessMapUv),_.push(C.roughnessMapUv),_.push(C.anisotropyMapUv),_.push(C.clearcoatMapUv),_.push(C.clearcoatNormalMapUv),_.push(C.clearcoatRoughnessMapUv),_.push(C.iridescenceMapUv),_.push(C.iridescenceThicknessMapUv),_.push(C.sheenColorMapUv),_.push(C.sheenRoughnessMapUv),_.push(C.specularMapUv),_.push(C.specularColorMapUv),_.push(C.specularIntensityMapUv),_.push(C.transmissionMapUv),_.push(C.thicknessMapUv),_.push(C.combine),_.push(C.fogExp2),_.push(C.sizeAttenuation),_.push(C.morphTargetsCount),_.push(C.morphAttributeCount),_.push(C.numDirLights),_.push(C.numPointLights),_.push(C.numSpotLights),_.push(C.numSpotLightMaps),_.push(C.numHemiLights),_.push(C.numRectAreaLights),_.push(C.numDirLightShadows),_.push(C.numPointLightShadows),_.push(C.numSpotLightShadows),_.push(C.numSpotLightShadowsWithMaps),_.push(C.numLightProbes),_.push(C.shadowMapType),_.push(C.toneMapping),_.push(C.numClippingPlanes),_.push(C.numClipIntersection),_.push(C.depthPacking)}function M(_,C){a.disableAll(),C.instancing&&a.enable(0),C.instancingColor&&a.enable(1),C.instancingMorph&&a.enable(2),C.matcap&&a.enable(3),C.envMap&&a.enable(4),C.normalMapObjectSpace&&a.enable(5),C.normalMapTangentSpace&&a.enable(6),C.clearcoat&&a.enable(7),C.iridescence&&a.enable(8),C.alphaTest&&a.enable(9),C.vertexColors&&a.enable(10),C.vertexAlphas&&a.enable(11),C.vertexUv1s&&a.enable(12),C.vertexUv2s&&a.enable(13),C.vertexUv3s&&a.enable(14),C.vertexTangents&&a.enable(15),C.anisotropy&&a.enable(16),C.alphaHash&&a.enable(17),C.batching&&a.enable(18),C.dispersion&&a.enable(19),C.batchingColor&&a.enable(20),C.gradientMap&&a.enable(21),C.packedNormalMap&&a.enable(22),C.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),C.fog&&a.enable(0),C.useFog&&a.enable(1),C.flatShading&&a.enable(2),C.logarithmicDepthBuffer&&a.enable(3),C.reversedDepthBuffer&&a.enable(4),C.skinning&&a.enable(5),C.morphTargets&&a.enable(6),C.morphNormals&&a.enable(7),C.morphColors&&a.enable(8),C.premultipliedAlpha&&a.enable(9),C.shadowMapEnabled&&a.enable(10),C.doubleSided&&a.enable(11),C.flipSided&&a.enable(12),C.useDepthPacking&&a.enable(13),C.dithering&&a.enable(14),C.transmission&&a.enable(15),C.sheen&&a.enable(16),C.opaque&&a.enable(17),C.pointsUvs&&a.enable(18),C.decodeVideoTexture&&a.enable(19),C.decodeVideoTextureEmissive&&a.enable(20),C.alphaToCoverage&&a.enable(21),C.numLightProbeGrids>0&&a.enable(22),C.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function b(_){const C=p[_.type];let D;if(C){const P=zi[C];D=Fp.clone(P.uniforms)}else D=_.uniforms;return D}function y(_,C){let D=h.get(C);return D!==void 0?++D.usedTimes:(D=new c_(n,C,_,s),l.push(D),h.set(C,D)),D}function E(_){if(--_.usedTimes===0){const C=l.indexOf(_);l[C]=l[l.length-1],l.pop(),h.delete(_.cacheKey),_.destroy()}}function T(_){o.remove(_)}function R(){o.dispose()}return{getParameters:x,getProgramCacheKey:m,getUniforms:b,acquireProgram:y,releaseProgram:E,releaseShaderCache:T,programs:l,dispose:R}}function m_(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,c){n.get(a)[o]=c}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function g_(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Vu(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Gu(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(u){let p=0;return u.isInstancedMesh&&(p+=2),u.isSkinnedMesh&&(p+=1),p}function o(u,p,g,x,m,f){let M=n[e];return M===void 0?(M={id:u.id,object:u,geometry:p,material:g,materialVariant:a(u),groupOrder:x,renderOrder:u.renderOrder,z:m,group:f},n[e]=M):(M.id=u.id,M.object=u,M.geometry=p,M.material=g,M.materialVariant=a(u),M.groupOrder=x,M.renderOrder=u.renderOrder,M.z=m,M.group=f),e++,M}function c(u,p,g,x,m,f){const M=o(u,p,g,x,m,f);g.transmission>0?i.push(M):g.transparent===!0?s.push(M):t.push(M)}function l(u,p,g,x,m,f){const M=o(u,p,g,x,m,f);g.transmission>0?i.unshift(M):g.transparent===!0?s.unshift(M):t.unshift(M)}function h(u,p,g){t.length>1&&t.sort(u||g_),i.length>1&&i.sort(p||Vu),s.length>1&&s.sort(p||Vu),g&&(t.reverse(),i.reverse(),s.reverse())}function d(){for(let u=e,p=n.length;u<p;u++){const g=n[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:c,unshift:l,finish:d,sort:h}}function v_(){let n=new WeakMap;function e(i,s){const r=n.get(i);let a;return r===void 0?(a=new Gu,n.set(i,[a])):s>=r.length?(a=new Gu,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function __(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new A,color:new ae};break;case"SpotLight":t={position:new A,direction:new A,color:new ae,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new A,color:new ae,distance:0,decay:0};break;case"HemisphereLight":t={direction:new A,skyColor:new ae,groundColor:new ae};break;case"RectAreaLight":t={color:new ae,position:new A,halfWidth:new A,halfHeight:new A};break}return n[e.id]=t,t}}}function x_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Re};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Re};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Re,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let S_=0;function y_(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function M_(n){const e=new __,t=x_(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new A);const s=new A,r=new Ze,a=new Ze;function o(l){let h=0,d=0,u=0;for(let C=0;C<9;C++)i.probe[C].set(0,0,0);let p=0,g=0,x=0,m=0,f=0,M=0,b=0,y=0,E=0,T=0,R=0;l.sort(y_);for(let C=0,D=l.length;C<D;C++){const P=l[C],N=P.color,G=P.intensity,Z=P.distance;let O=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===ts?O=P.shadow.map.texture:O=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)h+=N.r*G,d+=N.g*G,u+=N.b*G;else if(P.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(P.sh.coefficients[X],G);R++}else if(P.isDirectionalLight){const X=e.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const z=P.shadow,J=t.get(P);J.shadowIntensity=z.intensity,J.shadowBias=z.bias,J.shadowNormalBias=z.normalBias,J.shadowRadius=z.radius,J.shadowMapSize=z.mapSize,i.directionalShadow[p]=J,i.directionalShadowMap[p]=O,i.directionalShadowMatrix[p]=P.shadow.matrix,M++}i.directional[p]=X,p++}else if(P.isSpotLight){const X=e.get(P);X.position.setFromMatrixPosition(P.matrixWorld),X.color.copy(N).multiplyScalar(G),X.distance=Z,X.coneCos=Math.cos(P.angle),X.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),X.decay=P.decay,i.spot[x]=X;const z=P.shadow;if(P.map&&(i.spotLightMap[E]=P.map,E++,z.updateMatrices(P),P.castShadow&&T++),i.spotLightMatrix[x]=z.matrix,P.castShadow){const J=t.get(P);J.shadowIntensity=z.intensity,J.shadowBias=z.bias,J.shadowNormalBias=z.normalBias,J.shadowRadius=z.radius,J.shadowMapSize=z.mapSize,i.spotShadow[x]=J,i.spotShadowMap[x]=O,y++}x++}else if(P.isRectAreaLight){const X=e.get(P);X.color.copy(N).multiplyScalar(G),X.halfWidth.set(P.width*.5,0,0),X.halfHeight.set(0,P.height*.5,0),i.rectArea[m]=X,m++}else if(P.isPointLight){const X=e.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),X.distance=P.distance,X.decay=P.decay,P.castShadow){const z=P.shadow,J=t.get(P);J.shadowIntensity=z.intensity,J.shadowBias=z.bias,J.shadowNormalBias=z.normalBias,J.shadowRadius=z.radius,J.shadowMapSize=z.mapSize,J.shadowCameraNear=z.camera.near,J.shadowCameraFar=z.camera.far,i.pointShadow[g]=J,i.pointShadowMap[g]=O,i.pointShadowMatrix[g]=P.shadow.matrix,b++}i.point[g]=X,g++}else if(P.isHemisphereLight){const X=e.get(P);X.skyColor.copy(P.color).multiplyScalar(G),X.groundColor.copy(P.groundColor).multiplyScalar(G),i.hemi[f]=X,f++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=de.LTC_FLOAT_1,i.rectAreaLTC2=de.LTC_FLOAT_2):(i.rectAreaLTC1=de.LTC_HALF_1,i.rectAreaLTC2=de.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=d,i.ambient[2]=u;const _=i.hash;(_.directionalLength!==p||_.pointLength!==g||_.spotLength!==x||_.rectAreaLength!==m||_.hemiLength!==f||_.numDirectionalShadows!==M||_.numPointShadows!==b||_.numSpotShadows!==y||_.numSpotMaps!==E||_.numLightProbes!==R)&&(i.directional.length=p,i.spot.length=x,i.rectArea.length=m,i.point.length=g,i.hemi.length=f,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=b,i.pointShadowMap.length=b,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=b,i.spotLightMatrix.length=y+E-T,i.spotLightMap.length=E,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=R,_.directionalLength=p,_.pointLength=g,_.spotLength=x,_.rectAreaLength=m,_.hemiLength=f,_.numDirectionalShadows=M,_.numPointShadows=b,_.numSpotShadows=y,_.numSpotMaps=E,_.numLightProbes=R,i.version=S_++)}function c(l,h){let d=0,u=0,p=0,g=0,x=0;const m=h.matrixWorldInverse;for(let f=0,M=l.length;f<M;f++){const b=l[f];if(b.isDirectionalLight){const y=i.directional[d];y.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),d++}else if(b.isSpotLight){const y=i.spot[p];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),p++}else if(b.isRectAreaLight){const y=i.rectArea[g];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(m),a.identity(),r.copy(b.matrixWorld),r.premultiply(m),a.extractRotation(r),y.halfWidth.set(b.width*.5,0,0),y.halfHeight.set(0,b.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),g++}else if(b.isPointLight){const y=i.point[u];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(m),u++}else if(b.isHemisphereLight){const y=i.hemi[x];y.direction.setFromMatrixPosition(b.matrixWorld),y.direction.transformDirection(m),x++}}}return{setup:o,setupView:c,state:i}}function Wu(n){const e=new M_(n),t=[],i=[],s=[];function r(u){d.camera=u,t.length=0,i.length=0,s.length=0}function a(u){t.push(u)}function o(u){i.push(u)}function c(u){s.push(u)}function l(){e.setup(t)}function h(u){e.setupView(t,u)}const d={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:l,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function b_(n){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Wu(n),e.set(s,[o])):r>=a.length?(o=new Wu(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const w_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,E_=`uniform sampler2D shadow_pass;
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
}`,T_=[new A(1,0,0),new A(-1,0,0),new A(0,1,0),new A(0,-1,0),new A(0,0,1),new A(0,0,-1)],A_=[new A(0,-1,0),new A(0,-1,0),new A(0,0,1),new A(0,0,-1),new A(0,-1,0),new A(0,-1,0)],Xu=new Ze,Ks=new A,Ao=new A;function C_(n,e,t){let i=new rc;const s=new Re,r=new Re,a=new xt,o=new Bp,c=new zp,l={},h=t.maxTextureSize,d={[Ln]:ti,[ti]:Ln,[Ri]:Ri},u=new ot({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Re},radius:{value:4}},vertexShader:w_,fragmentShader:E_}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const g=new At;g.setAttribute("position",new We(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new Kt(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ca;let f=this.type;this.render=function(T,R,_){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;this.type===lf&&(Pe("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=ca);const C=n.getRenderTarget(),D=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),N=n.state;N.setBlending(sn),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const G=f!==this.type;G&&R.traverse(function(Z){Z.material&&(Array.isArray(Z.material)?Z.material.forEach(O=>O.needsUpdate=!0):Z.material.needsUpdate=!0)});for(let Z=0,O=T.length;Z<O;Z++){const X=T[Z],z=X.shadow;if(z===void 0){Pe("WebGLShadowMap:",X,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;s.copy(z.mapSize);const J=z.getFrameExtents();s.multiply(J),r.copy(z.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/J.x),s.x=r.x*J.x,z.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/J.y),s.y=r.y*J.y,z.mapSize.y=r.y));const j=n.state.buffers.depth.getReversed();if(z.camera._reversedDepth=j,z.map===null||G===!0){if(z.map!==null&&(z.map.depthTexture!==null&&(z.map.depthTexture.dispose(),z.map.depthTexture=null),z.map.dispose()),this.type===ar){if(X.isPointLight){Pe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}z.map=new mi(s.x,s.y,{format:ts,type:bi,minFilter:bt,magFilter:bt,generateMipmaps:!1}),z.map.texture.name=X.name+".shadowMap",z.map.depthTexture=new In(s.x,s.y,ki),z.map.depthTexture.name=X.name+".shadowMapDepth",z.map.depthTexture.format=ln,z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Gt,z.map.depthTexture.magFilter=Gt}else X.isPointLight?(z.map=new md(s.x),z.map.depthTexture=new Pp(s.x,Mi)):(z.map=new mi(s.x,s.y),z.map.depthTexture=new In(s.x,s.y,Mi)),z.map.depthTexture.name=X.name+".shadowMap",z.map.depthTexture.format=ln,this.type===ca?(z.map.depthTexture.compareFunction=j?tc:ec,z.map.depthTexture.minFilter=bt,z.map.depthTexture.magFilter=bt):(z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Gt,z.map.depthTexture.magFilter=Gt);z.camera.updateProjectionMatrix()}const ue=z.map.isWebGLCubeRenderTarget?6:1;for(let fe=0;fe<ue;fe++){if(z.map.isWebGLCubeRenderTarget)n.setRenderTarget(z.map,fe),n.clear();else{fe===0&&(n.setRenderTarget(z.map),n.clear());const ve=z.getViewport(fe);a.set(r.x*ve.x,r.y*ve.y,r.x*ve.z,r.y*ve.w),N.viewport(a)}if(X.isPointLight){const ve=z.camera,ye=z.matrix,Be=X.distance||ve.far;Be!==ve.far&&(ve.far=Be,ve.updateProjectionMatrix()),Ks.setFromMatrixPosition(X.matrixWorld),ve.position.copy(Ks),Ao.copy(ve.position),Ao.add(T_[fe]),ve.up.copy(A_[fe]),ve.lookAt(Ao),ve.updateMatrixWorld(),ye.makeTranslation(-Ks.x,-Ks.y,-Ks.z),Xu.multiplyMatrices(ve.projectionMatrix,ve.matrixWorldInverse),z._frustum.setFromProjectionMatrix(Xu,ve.coordinateSystem,ve.reversedDepth)}else z.updateMatrices(X);i=z.getFrustum(),y(R,_,z.camera,X,this.type)}z.isPointLightShadow!==!0&&this.type===ar&&M(z,_),z.needsUpdate=!1}f=this.type,m.needsUpdate=!1,n.setRenderTarget(C,D,P)};function M(T,R){const _=e.update(x);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,p.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new mi(s.x,s.y,{format:ts,type:bi})),u.uniforms.shadow_pass.value=T.map.depthTexture,u.uniforms.resolution.value=T.mapSize,u.uniforms.radius.value=T.radius,n.setRenderTarget(T.mapPass),n.clear(),n.renderBufferDirect(R,null,_,u,x,null),p.uniforms.shadow_pass.value=T.mapPass.texture,p.uniforms.resolution.value=T.mapSize,p.uniforms.radius.value=T.radius,n.setRenderTarget(T.map),n.clear(),n.renderBufferDirect(R,null,_,p,x,null)}function b(T,R,_,C){let D=null;const P=_.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(P!==void 0)D=P;else if(D=_.isPointLight===!0?c:o,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const N=D.uuid,G=R.uuid;let Z=l[N];Z===void 0&&(Z={},l[N]=Z);let O=Z[G];O===void 0&&(O=D.clone(),Z[G]=O,R.addEventListener("dispose",E)),D=O}if(D.visible=R.visible,D.wireframe=R.wireframe,C===ar?D.side=R.shadowSide!==null?R.shadowSide:R.side:D.side=R.shadowSide!==null?R.shadowSide:d[R.side],D.alphaMap=R.alphaMap,D.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,D.map=R.map,D.clipShadows=R.clipShadows,D.clippingPlanes=R.clippingPlanes,D.clipIntersection=R.clipIntersection,D.displacementMap=R.displacementMap,D.displacementScale=R.displacementScale,D.displacementBias=R.displacementBias,D.wireframeLinewidth=R.wireframeLinewidth,D.linewidth=R.linewidth,_.isPointLight===!0&&D.isMeshDistanceMaterial===!0){const N=n.properties.get(D);N.light=_}return D}function y(T,R,_,C,D){if(T.visible===!1)return;if(T.layers.test(R.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&D===ar)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,T.matrixWorld);const G=e.update(T),Z=T.material;if(Array.isArray(Z)){const O=G.groups;for(let X=0,z=O.length;X<z;X++){const J=O[X],j=Z[J.materialIndex];if(j&&j.visible){const ue=b(T,j,C,D);T.onBeforeShadow(n,T,R,_,G,ue,J),n.renderBufferDirect(_,null,G,ue,T,J),T.onAfterShadow(n,T,R,_,G,ue,J)}}}else if(Z.visible){const O=b(T,Z,C,D);T.onBeforeShadow(n,T,R,_,G,O,null),n.renderBufferDirect(_,null,G,O,T,null),T.onAfterShadow(n,T,R,_,G,O,null)}}const N=T.children;for(let G=0,Z=N.length;G<Z;G++)y(N[G],R,_,C,D)}function E(T){T.target.removeEventListener("dispose",E);for(const _ in l){const C=l[_],D=T.target.uuid;D in C&&(C[D].dispose(),delete C[D])}}}function R_(n,e){function t(){let L=!1;const ie=new xt;let $=null;const ce=new xt(0,0,0,0);return{setMask:function(ge){$!==ge&&!L&&(n.colorMask(ge,ge,ge,ge),$=ge)},setLocked:function(ge){L=ge},setClear:function(ge,Q,we,Me,yt){yt===!0&&(ge*=Me,Q*=Me,we*=Me),ie.set(ge,Q,we,Me),ce.equals(ie)===!1&&(n.clearColor(ge,Q,we,Me),ce.copy(ie))},reset:function(){L=!1,$=null,ce.set(-1,0,0,0)}}}function i(){let L=!1,ie=!1,$=null,ce=null,ge=null;return{setReversed:function(Q){if(ie!==Q){const we=e.get("EXT_clip_control");Q?we.clipControlEXT(we.LOWER_LEFT_EXT,we.ZERO_TO_ONE_EXT):we.clipControlEXT(we.LOWER_LEFT_EXT,we.NEGATIVE_ONE_TO_ONE_EXT),ie=Q;const Me=ge;ge=null,this.setClear(Me)}},getReversed:function(){return ie},setTest:function(Q){Q?ee(n.DEPTH_TEST):Ne(n.DEPTH_TEST)},setMask:function(Q){$!==Q&&!L&&(n.depthMask(Q),$=Q)},setFunc:function(Q){if(ie&&(Q=Hf[Q]),ce!==Q){switch(Q){case Ko:n.depthFunc(n.NEVER);break;case Zo:n.depthFunc(n.ALWAYS);break;case Jo:n.depthFunc(n.LESS);break;case Ds:n.depthFunc(n.LEQUAL);break;case Qo:n.depthFunc(n.EQUAL);break;case jo:n.depthFunc(n.GEQUAL);break;case el:n.depthFunc(n.GREATER);break;case tl:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ce=Q}},setLocked:function(Q){L=Q},setClear:function(Q){ge!==Q&&(ge=Q,ie&&(Q=1-Q),n.clearDepth(Q))},reset:function(){L=!1,$=null,ce=null,ge=null,ie=!1}}}function s(){let L=!1,ie=null,$=null,ce=null,ge=null,Q=null,we=null,Me=null,yt=null;return{setTest:function(mt){L||(mt?ee(n.STENCIL_TEST):Ne(n.STENCIL_TEST))},setMask:function(mt){ie!==mt&&!L&&(n.stencilMask(mt),ie=mt)},setFunc:function(mt,Fi,Ni){($!==mt||ce!==Fi||ge!==Ni)&&(n.stencilFunc(mt,Fi,Ni),$=mt,ce=Fi,ge=Ni)},setOp:function(mt,Fi,Ni){(Q!==mt||we!==Fi||Me!==Ni)&&(n.stencilOp(mt,Fi,Ni),Q=mt,we=Fi,Me=Ni)},setLocked:function(mt){L=mt},setClear:function(mt){yt!==mt&&(n.clearStencil(mt),yt=mt)},reset:function(){L=!1,ie=null,$=null,ce=null,ge=null,Q=null,we=null,Me=null,yt=null}}}const r=new t,a=new i,o=new s,c=new WeakMap,l=new WeakMap;let h={},d={},u={},p=new WeakMap,g=[],x=null,m=!1,f=null,M=null,b=null,y=null,E=null,T=null,R=null,_=new ae(0,0,0),C=0,D=!1,P=null,N=null,G=null,Z=null,O=null;const X=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,J=0;const j=n.getParameter(n.VERSION);j.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(j)[1]),z=J>=1):j.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),z=J>=2);let ue=null,fe={};const ve=n.getParameter(n.SCISSOR_BOX),ye=n.getParameter(n.VIEWPORT),Be=new xt().fromArray(ve),Ue=new xt().fromArray(ye);function q(L,ie,$,ce){const ge=new Uint8Array(4),Q=n.createTexture();n.bindTexture(L,Q),n.texParameteri(L,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(L,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let we=0;we<$;we++)L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY?n.texImage3D(ie,0,n.RGBA,1,1,ce,0,n.RGBA,n.UNSIGNED_BYTE,ge):n.texImage2D(ie+we,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ge);return Q}const se={};se[n.TEXTURE_2D]=q(n.TEXTURE_2D,n.TEXTURE_2D,1),se[n.TEXTURE_CUBE_MAP]=q(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),se[n.TEXTURE_2D_ARRAY]=q(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),se[n.TEXTURE_3D]=q(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ee(n.DEPTH_TEST),a.setFunc(Ds),Ct(!1),Lt(Oc),ee(n.CULL_FACE),it(sn);function ee(L){h[L]!==!0&&(n.enable(L),h[L]=!0)}function Ne(L){h[L]!==!1&&(n.disable(L),h[L]=!1)}function ze(L,ie){return u[L]!==ie?(n.bindFramebuffer(L,ie),u[L]=ie,L===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=ie),L===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=ie),!0):!1}function De(L,ie){let $=g,ce=!1;if(L){$=p.get(ie),$===void 0&&($=[],p.set(ie,$));const ge=L.textures;if($.length!==ge.length||$[0]!==n.COLOR_ATTACHMENT0){for(let Q=0,we=ge.length;Q<we;Q++)$[Q]=n.COLOR_ATTACHMENT0+Q;$.length=ge.length,ce=!0}}else $[0]!==n.BACK&&($[0]=n.BACK,ce=!0);ce&&n.drawBuffers($)}function wt(L){return x!==L?(n.useProgram(L),x=L,!0):!1}const Ye={[Xn]:n.FUNC_ADD,[uf]:n.FUNC_SUBTRACT,[hf]:n.FUNC_REVERSE_SUBTRACT};Ye[df]=n.MIN,Ye[ff]=n.MAX;const ht={[pf]:n.ZERO,[mf]:n.ONE,[gf]:n.SRC_COLOR,[qo]:n.SRC_ALPHA,[Mf]:n.SRC_ALPHA_SATURATE,[Sf]:n.DST_COLOR,[_f]:n.DST_ALPHA,[vf]:n.ONE_MINUS_SRC_COLOR,[$o]:n.ONE_MINUS_SRC_ALPHA,[yf]:n.ONE_MINUS_DST_COLOR,[xf]:n.ONE_MINUS_DST_ALPHA,[bf]:n.CONSTANT_COLOR,[wf]:n.ONE_MINUS_CONSTANT_COLOR,[Ef]:n.CONSTANT_ALPHA,[Tf]:n.ONE_MINUS_CONSTANT_ALPHA};function it(L,ie,$,ce,ge,Q,we,Me,yt,mt){if(L===sn){m===!0&&(Ne(n.BLEND),m=!1);return}if(m===!1&&(ee(n.BLEND),m=!0),L!==cf){if(L!==f||mt!==D){if((M!==Xn||E!==Xn)&&(n.blendEquation(n.FUNC_ADD),M=Xn,E=Xn),mt)switch(L){case rn:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case jn:n.blendFunc(n.ONE,n.ONE);break;case Bc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case zc:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:je("WebGLState: Invalid blending: ",L);break}else switch(L){case rn:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case jn:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Bc:je("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case zc:je("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:je("WebGLState: Invalid blending: ",L);break}b=null,y=null,T=null,R=null,_.set(0,0,0),C=0,f=L,D=mt}return}ge=ge||ie,Q=Q||$,we=we||ce,(ie!==M||ge!==E)&&(n.blendEquationSeparate(Ye[ie],Ye[ge]),M=ie,E=ge),($!==b||ce!==y||Q!==T||we!==R)&&(n.blendFuncSeparate(ht[$],ht[ce],ht[Q],ht[we]),b=$,y=ce,T=Q,R=we),(Me.equals(_)===!1||yt!==C)&&(n.blendColor(Me.r,Me.g,Me.b,yt),_.copy(Me),C=yt),f=L,D=!1}function Je(L,ie){L.side===Ri?Ne(n.CULL_FACE):ee(n.CULL_FACE);let $=L.side===ti;ie&&($=!$),Ct($),L.blending===rn&&L.transparent===!1?it(sn):it(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),r.setMask(L.colorWrite);const ce=L.stencilWrite;o.setTest(ce),ce&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),kt(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?ee(n.SAMPLE_ALPHA_TO_COVERAGE):Ne(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ct(L){P!==L&&(L?n.frontFace(n.CW):n.frontFace(n.CCW),P=L)}function Lt(L){L!==af?(ee(n.CULL_FACE),L!==N&&(L===Oc?n.cullFace(n.BACK):L===of?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ne(n.CULL_FACE),N=L}function Bt(L){L!==G&&(z&&n.lineWidth(L),G=L)}function kt(L,ie,$){L?(ee(n.POLYGON_OFFSET_FILL),(Z!==ie||O!==$)&&(Z=ie,O=$,a.getReversed()&&(ie=-ie),n.polygonOffset(ie,$))):Ne(n.POLYGON_OFFSET_FILL)}function St(L){L?ee(n.SCISSOR_TEST):Ne(n.SCISSOR_TEST)}function Rt(L){L===void 0&&(L=n.TEXTURE0+X-1),ue!==L&&(n.activeTexture(L),ue=L)}function I(L,ie,$){$===void 0&&(ue===null?$=n.TEXTURE0+X-1:$=ue);let ce=fe[$];ce===void 0&&(ce={type:void 0,texture:void 0},fe[$]=ce),(ce.type!==L||ce.texture!==ie)&&(ue!==$&&(n.activeTexture($),ue=$),n.bindTexture(L,ie||se[L]),ce.type=L,ce.texture=ie)}function ii(){const L=fe[ue];L!==void 0&&L.type!==void 0&&(n.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function rt(){try{n.compressedTexImage2D(...arguments)}catch(L){je("WebGLState:",L)}}function w(){try{n.compressedTexImage3D(...arguments)}catch(L){je("WebGLState:",L)}}function v(){try{n.texSubImage2D(...arguments)}catch(L){je("WebGLState:",L)}}function U(){try{n.texSubImage3D(...arguments)}catch(L){je("WebGLState:",L)}}function H(){try{n.compressedTexSubImage2D(...arguments)}catch(L){je("WebGLState:",L)}}function W(){try{n.compressedTexSubImage3D(...arguments)}catch(L){je("WebGLState:",L)}}function te(){try{n.texStorage2D(...arguments)}catch(L){je("WebGLState:",L)}}function re(){try{n.texStorage3D(...arguments)}catch(L){je("WebGLState:",L)}}function Y(){try{n.texImage2D(...arguments)}catch(L){je("WebGLState:",L)}}function K(){try{n.texImage3D(...arguments)}catch(L){je("WebGLState:",L)}}function oe(L){return d[L]!==void 0?d[L]:n.getParameter(L)}function Ee(L,ie){d[L]!==ie&&(n.pixelStorei(L,ie),d[L]=ie)}function he(L){Be.equals(L)===!1&&(n.scissor(L.x,L.y,L.z,L.w),Be.copy(L))}function le(L){Ue.equals(L)===!1&&(n.viewport(L.x,L.y,L.z,L.w),Ue.copy(L))}function Ce(L,ie){let $=l.get(ie);$===void 0&&($=new WeakMap,l.set(ie,$));let ce=$.get(L);ce===void 0&&(ce=n.getUniformBlockIndex(ie,L.name),$.set(L,ce))}function Le(L,ie){const ce=l.get(ie).get(L);c.get(ie)!==ce&&(n.uniformBlockBinding(ie,ce,L.__bindingPointIndex),c.set(ie,ce))}function ke(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),h={},d={},ue=null,fe={},u={},p=new WeakMap,g=[],x=null,m=!1,f=null,M=null,b=null,y=null,E=null,T=null,R=null,_=new ae(0,0,0),C=0,D=!1,P=null,N=null,G=null,Z=null,O=null,Be.set(0,0,n.canvas.width,n.canvas.height),Ue.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ee,disable:Ne,bindFramebuffer:ze,drawBuffers:De,useProgram:wt,setBlending:it,setMaterial:Je,setFlipSided:Ct,setCullFace:Lt,setLineWidth:Bt,setPolygonOffset:kt,setScissorTest:St,activeTexture:Rt,bindTexture:I,unbindTexture:ii,compressedTexImage2D:rt,compressedTexImage3D:w,texImage2D:Y,texImage3D:K,pixelStorei:Ee,getParameter:oe,updateUBOMapping:Ce,uniformBlockBinding:Le,texStorage2D:te,texStorage3D:re,texSubImage2D:v,texSubImage3D:U,compressedTexSubImage2D:H,compressedTexSubImage3D:W,scissor:he,viewport:le,reset:ke}}function P_(n,e,t,i,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Re,h=new WeakMap,d=new Set;let u;const p=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(w,v){return g?new OffscreenCanvas(w,v):ya("canvas")}function m(w,v,U){let H=1;const W=rt(w);if((W.width>U||W.height>U)&&(H=U/Math.max(W.width,W.height)),H<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const te=Math.floor(H*W.width),re=Math.floor(H*W.height);u===void 0&&(u=x(te,re));const Y=v?x(te,re):u;return Y.width=te,Y.height=re,Y.getContext("2d").drawImage(w,0,0,te,re),Pe("WebGLRenderer: Texture has been resized from ("+W.width+"x"+W.height+") to ("+te+"x"+re+")."),Y}else return"data"in w&&Pe("WebGLRenderer: Image in DataTexture is too big ("+W.width+"x"+W.height+")."),w;return w}function f(w){return w.generateMipmaps}function M(w){n.generateMipmap(w)}function b(w){return w.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?n.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function y(w,v,U,H,W,te=!1){if(w!==null){if(n[w]!==void 0)return n[w];Pe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let re;H&&(re=e.get("EXT_texture_norm16"),re||Pe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Y=v;if(v===n.RED&&(U===n.FLOAT&&(Y=n.R32F),U===n.HALF_FLOAT&&(Y=n.R16F),U===n.UNSIGNED_BYTE&&(Y=n.R8),U===n.UNSIGNED_SHORT&&re&&(Y=re.R16_EXT),U===n.SHORT&&re&&(Y=re.R16_SNORM_EXT)),v===n.RED_INTEGER&&(U===n.UNSIGNED_BYTE&&(Y=n.R8UI),U===n.UNSIGNED_SHORT&&(Y=n.R16UI),U===n.UNSIGNED_INT&&(Y=n.R32UI),U===n.BYTE&&(Y=n.R8I),U===n.SHORT&&(Y=n.R16I),U===n.INT&&(Y=n.R32I)),v===n.RG&&(U===n.FLOAT&&(Y=n.RG32F),U===n.HALF_FLOAT&&(Y=n.RG16F),U===n.UNSIGNED_BYTE&&(Y=n.RG8),U===n.UNSIGNED_SHORT&&re&&(Y=re.RG16_EXT),U===n.SHORT&&re&&(Y=re.RG16_SNORM_EXT)),v===n.RG_INTEGER&&(U===n.UNSIGNED_BYTE&&(Y=n.RG8UI),U===n.UNSIGNED_SHORT&&(Y=n.RG16UI),U===n.UNSIGNED_INT&&(Y=n.RG32UI),U===n.BYTE&&(Y=n.RG8I),U===n.SHORT&&(Y=n.RG16I),U===n.INT&&(Y=n.RG32I)),v===n.RGB_INTEGER&&(U===n.UNSIGNED_BYTE&&(Y=n.RGB8UI),U===n.UNSIGNED_SHORT&&(Y=n.RGB16UI),U===n.UNSIGNED_INT&&(Y=n.RGB32UI),U===n.BYTE&&(Y=n.RGB8I),U===n.SHORT&&(Y=n.RGB16I),U===n.INT&&(Y=n.RGB32I)),v===n.RGBA_INTEGER&&(U===n.UNSIGNED_BYTE&&(Y=n.RGBA8UI),U===n.UNSIGNED_SHORT&&(Y=n.RGBA16UI),U===n.UNSIGNED_INT&&(Y=n.RGBA32UI),U===n.BYTE&&(Y=n.RGBA8I),U===n.SHORT&&(Y=n.RGBA16I),U===n.INT&&(Y=n.RGBA32I)),v===n.RGB&&(U===n.UNSIGNED_SHORT&&re&&(Y=re.RGB16_EXT),U===n.SHORT&&re&&(Y=re.RGB16_SNORM_EXT),U===n.UNSIGNED_INT_5_9_9_9_REV&&(Y=n.RGB9_E5),U===n.UNSIGNED_INT_10F_11F_11F_REV&&(Y=n.R11F_G11F_B10F)),v===n.RGBA){const K=te?Sa:$e.getTransfer(W);U===n.FLOAT&&(Y=n.RGBA32F),U===n.HALF_FLOAT&&(Y=n.RGBA16F),U===n.UNSIGNED_BYTE&&(Y=K===at?n.SRGB8_ALPHA8:n.RGBA8),U===n.UNSIGNED_SHORT&&re&&(Y=re.RGBA16_EXT),U===n.SHORT&&re&&(Y=re.RGBA16_SNORM_EXT),U===n.UNSIGNED_SHORT_4_4_4_4&&(Y=n.RGBA4),U===n.UNSIGNED_SHORT_5_5_5_1&&(Y=n.RGB5_A1)}return(Y===n.R16F||Y===n.R32F||Y===n.RG16F||Y===n.RG32F||Y===n.RGBA16F||Y===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function E(w,v){let U;return w?v===null||v===Mi||v===mr?U=n.DEPTH24_STENCIL8:v===ki?U=n.DEPTH32F_STENCIL8:v===pr&&(U=n.DEPTH24_STENCIL8,Pe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Mi||v===mr?U=n.DEPTH_COMPONENT24:v===ki?U=n.DEPTH_COMPONENT32F:v===pr&&(U=n.DEPTH_COMPONENT16),U}function T(w,v){return f(w)===!0||w.isFramebufferTexture&&w.minFilter!==Gt&&w.minFilter!==bt?Math.log2(Math.max(v.width,v.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?v.mipmaps.length:1}function R(w){const v=w.target;v.removeEventListener("dispose",R),C(v),v.isVideoTexture&&h.delete(v),v.isHTMLTexture&&d.delete(v)}function _(w){const v=w.target;v.removeEventListener("dispose",_),P(v)}function C(w){const v=i.get(w);if(v.__webglInit===void 0)return;const U=w.source,H=p.get(U);if(H){const W=H[v.__cacheKey];W.usedTimes--,W.usedTimes===0&&D(w),Object.keys(H).length===0&&p.delete(U)}i.remove(w)}function D(w){const v=i.get(w);n.deleteTexture(v.__webglTexture);const U=w.source,H=p.get(U);delete H[v.__cacheKey],a.memory.textures--}function P(w){const v=i.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),i.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let H=0;H<6;H++){if(Array.isArray(v.__webglFramebuffer[H]))for(let W=0;W<v.__webglFramebuffer[H].length;W++)n.deleteFramebuffer(v.__webglFramebuffer[H][W]);else n.deleteFramebuffer(v.__webglFramebuffer[H]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[H])}else{if(Array.isArray(v.__webglFramebuffer))for(let H=0;H<v.__webglFramebuffer.length;H++)n.deleteFramebuffer(v.__webglFramebuffer[H]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let H=0;H<v.__webglColorRenderbuffer.length;H++)v.__webglColorRenderbuffer[H]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[H]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const U=w.textures;for(let H=0,W=U.length;H<W;H++){const te=i.get(U[H]);te.__webglTexture&&(n.deleteTexture(te.__webglTexture),a.memory.textures--),i.remove(U[H])}i.remove(w)}let N=0;function G(){N=0}function Z(){return N}function O(w){N=w}function X(){const w=N;return w>=s.maxTextures&&Pe("WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),N+=1,w}function z(w){const v=[];return v.push(w.wrapS),v.push(w.wrapT),v.push(w.wrapR||0),v.push(w.magFilter),v.push(w.minFilter),v.push(w.anisotropy),v.push(w.internalFormat),v.push(w.format),v.push(w.type),v.push(w.generateMipmaps),v.push(w.premultiplyAlpha),v.push(w.flipY),v.push(w.unpackAlignment),v.push(w.colorSpace),v.join()}function J(w,v){const U=i.get(w);if(w.isVideoTexture&&I(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&U.__version!==w.version){const H=w.image;if(H===null)Pe("WebGLRenderer: Texture marked for update but no image data found.");else if(H.complete===!1)Pe("WebGLRenderer: Texture marked for update but image is incomplete");else{Ne(U,w,v);return}}else w.isExternalTexture&&(U.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,U.__webglTexture,n.TEXTURE0+v)}function j(w,v){const U=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&U.__version!==w.version){Ne(U,w,v);return}else w.isExternalTexture&&(U.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,U.__webglTexture,n.TEXTURE0+v)}function ue(w,v){const U=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&U.__version!==w.version){Ne(U,w,v);return}t.bindTexture(n.TEXTURE_3D,U.__webglTexture,n.TEXTURE0+v)}function fe(w,v){const U=i.get(w);if(w.isCubeDepthTexture!==!0&&w.version>0&&U.__version!==w.version){ze(U,w,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,U.__webglTexture,n.TEXTURE0+v)}const ve={[il]:n.REPEAT,[nn]:n.CLAMP_TO_EDGE,[nl]:n.MIRRORED_REPEAT},ye={[Gt]:n.NEAREST,[Rf]:n.NEAREST_MIPMAP_NEAREST,[Ar]:n.NEAREST_MIPMAP_LINEAR,[bt]:n.LINEAR,[qa]:n.LINEAR_MIPMAP_NEAREST,[$n]:n.LINEAR_MIPMAP_LINEAR},Be={[Lf]:n.NEVER,[Of]:n.ALWAYS,[If]:n.LESS,[ec]:n.LEQUAL,[Ff]:n.EQUAL,[tc]:n.GEQUAL,[Nf]:n.GREATER,[Uf]:n.NOTEQUAL};function Ue(w,v){if(v.type===ki&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===bt||v.magFilter===qa||v.magFilter===Ar||v.magFilter===$n||v.minFilter===bt||v.minFilter===qa||v.minFilter===Ar||v.minFilter===$n)&&Pe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(w,n.TEXTURE_WRAP_S,ve[v.wrapS]),n.texParameteri(w,n.TEXTURE_WRAP_T,ve[v.wrapT]),(w===n.TEXTURE_3D||w===n.TEXTURE_2D_ARRAY)&&n.texParameteri(w,n.TEXTURE_WRAP_R,ve[v.wrapR]),n.texParameteri(w,n.TEXTURE_MAG_FILTER,ye[v.magFilter]),n.texParameteri(w,n.TEXTURE_MIN_FILTER,ye[v.minFilter]),v.compareFunction&&(n.texParameteri(w,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(w,n.TEXTURE_COMPARE_FUNC,Be[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Gt||v.minFilter!==Ar&&v.minFilter!==$n||v.type===ki&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const U=e.get("EXT_texture_filter_anisotropic");n.texParameterf(w,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function q(w,v){let U=!1;w.__webglInit===void 0&&(w.__webglInit=!0,v.addEventListener("dispose",R));const H=v.source;let W=p.get(H);W===void 0&&(W={},p.set(H,W));const te=z(v);if(te!==w.__cacheKey){W[te]===void 0&&(W[te]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,U=!0),W[te].usedTimes++;const re=W[w.__cacheKey];re!==void 0&&(W[w.__cacheKey].usedTimes--,re.usedTimes===0&&D(v)),w.__cacheKey=te,w.__webglTexture=W[te].texture}return U}function se(w,v,U){return Math.floor(Math.floor(w/U)/v)}function ee(w,v,U,H){const te=w.updateRanges;if(te.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,v.width,v.height,U,H,v.data);else{te.sort((Ee,he)=>Ee.start-he.start);let re=0;for(let Ee=1;Ee<te.length;Ee++){const he=te[re],le=te[Ee],Ce=he.start+he.count,Le=se(le.start,v.width,4),ke=se(he.start,v.width,4);le.start<=Ce+1&&Le===ke&&se(le.start+le.count-1,v.width,4)===Le?he.count=Math.max(he.count,le.start+le.count-he.start):(++re,te[re]=le)}te.length=re+1;const Y=t.getParameter(n.UNPACK_ROW_LENGTH),K=t.getParameter(n.UNPACK_SKIP_PIXELS),oe=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,v.width);for(let Ee=0,he=te.length;Ee<he;Ee++){const le=te[Ee],Ce=Math.floor(le.start/4),Le=Math.ceil(le.count/4),ke=Ce%v.width,L=Math.floor(Ce/v.width),ie=Le,$=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,ke),t.pixelStorei(n.UNPACK_SKIP_ROWS,L),t.texSubImage2D(n.TEXTURE_2D,0,ke,L,ie,$,U,H,v.data)}w.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,Y),t.pixelStorei(n.UNPACK_SKIP_PIXELS,K),t.pixelStorei(n.UNPACK_SKIP_ROWS,oe)}}function Ne(w,v,U){let H=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(H=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(H=n.TEXTURE_3D);const W=q(w,v),te=v.source;t.bindTexture(H,w.__webglTexture,n.TEXTURE0+U);const re=i.get(te);if(te.version!==re.__version||W===!0){if(t.activeTexture(n.TEXTURE0+U),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){const $=$e.getPrimaries($e.workingColorSpace),ce=v.colorSpace===En?null:$e.getPrimaries(v.colorSpace),ge=v.colorSpace===En||$===ce?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ge)}t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment);let K=m(v.image,!1,s.maxTextureSize);K=ii(v,K);const oe=r.convert(v.format,v.colorSpace),Ee=r.convert(v.type);let he=y(v.internalFormat,oe,Ee,v.normalized,v.colorSpace,v.isVideoTexture);Ue(H,v);let le;const Ce=v.mipmaps,Le=v.isVideoTexture!==!0,ke=re.__version===void 0||W===!0,L=te.dataReady,ie=T(v,K);if(v.isDepthTexture)he=E(v.format===Kn,v.type),ke&&(Le?t.texStorage2D(n.TEXTURE_2D,1,he,K.width,K.height):t.texImage2D(n.TEXTURE_2D,0,he,K.width,K.height,0,oe,Ee,null));else if(v.isDataTexture)if(Ce.length>0){Le&&ke&&t.texStorage2D(n.TEXTURE_2D,ie,he,Ce[0].width,Ce[0].height);for(let $=0,ce=Ce.length;$<ce;$++)le=Ce[$],Le?L&&t.texSubImage2D(n.TEXTURE_2D,$,0,0,le.width,le.height,oe,Ee,le.data):t.texImage2D(n.TEXTURE_2D,$,he,le.width,le.height,0,oe,Ee,le.data);v.generateMipmaps=!1}else Le?(ke&&t.texStorage2D(n.TEXTURE_2D,ie,he,K.width,K.height),L&&ee(v,K,oe,Ee)):t.texImage2D(n.TEXTURE_2D,0,he,K.width,K.height,0,oe,Ee,K.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Le&&ke&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ie,he,Ce[0].width,Ce[0].height,K.depth);for(let $=0,ce=Ce.length;$<ce;$++)if(le=Ce[$],v.format!==Di)if(oe!==null)if(Le){if(L)if(v.layerUpdates.size>0){const ge=Mu(le.width,le.height,v.format,v.type);for(const Q of v.layerUpdates){const we=le.data.subarray(Q*ge/le.data.BYTES_PER_ELEMENT,(Q+1)*ge/le.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,Q,le.width,le.height,1,oe,we)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,0,le.width,le.height,K.depth,oe,le.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,$,he,le.width,le.height,K.depth,0,le.data,0,0);else Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Le?L&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,0,le.width,le.height,K.depth,oe,Ee,le.data):t.texImage3D(n.TEXTURE_2D_ARRAY,$,he,le.width,le.height,K.depth,0,oe,Ee,le.data)}else{Le&&ke&&t.texStorage2D(n.TEXTURE_2D,ie,he,Ce[0].width,Ce[0].height);for(let $=0,ce=Ce.length;$<ce;$++)le=Ce[$],v.format!==Di?oe!==null?Le?L&&t.compressedTexSubImage2D(n.TEXTURE_2D,$,0,0,le.width,le.height,oe,le.data):t.compressedTexImage2D(n.TEXTURE_2D,$,he,le.width,le.height,0,le.data):Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Le?L&&t.texSubImage2D(n.TEXTURE_2D,$,0,0,le.width,le.height,oe,Ee,le.data):t.texImage2D(n.TEXTURE_2D,$,he,le.width,le.height,0,oe,Ee,le.data)}else if(v.isDataArrayTexture)if(Le){if(ke&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ie,he,K.width,K.height,K.depth),L)if(v.layerUpdates.size>0){const $=Mu(K.width,K.height,v.format,v.type);for(const ce of v.layerUpdates){const ge=K.data.subarray(ce*$/K.data.BYTES_PER_ELEMENT,(ce+1)*$/K.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ce,K.width,K.height,1,oe,Ee,ge)}v.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,oe,Ee,K.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,he,K.width,K.height,K.depth,0,oe,Ee,K.data);else if(v.isData3DTexture)Le?(ke&&t.texStorage3D(n.TEXTURE_3D,ie,he,K.width,K.height,K.depth),L&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,oe,Ee,K.data)):t.texImage3D(n.TEXTURE_3D,0,he,K.width,K.height,K.depth,0,oe,Ee,K.data);else if(v.isFramebufferTexture){if(ke)if(Le)t.texStorage2D(n.TEXTURE_2D,ie,he,K.width,K.height);else{let $=K.width,ce=K.height;for(let ge=0;ge<ie;ge++)t.texImage2D(n.TEXTURE_2D,ge,he,$,ce,0,oe,Ee,null),$>>=1,ce>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in n){const $=n.canvas;if($.hasAttribute("layoutsubtree")||$.setAttribute("layoutsubtree","true"),K.parentNode!==$){$.appendChild(K),d.add(v),$.onpaint=ce=>{const ge=ce.changedElements;for(const Q of d)ge.includes(Q.image)&&(Q.needsUpdate=!0)},$.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,K);else{const ge=n.RGBA,Q=n.RGBA,we=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,ge,Q,we,K)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Ce.length>0){if(Le&&ke){const $=rt(Ce[0]);t.texStorage2D(n.TEXTURE_2D,ie,he,$.width,$.height)}for(let $=0,ce=Ce.length;$<ce;$++)le=Ce[$],Le?L&&t.texSubImage2D(n.TEXTURE_2D,$,0,0,oe,Ee,le):t.texImage2D(n.TEXTURE_2D,$,he,oe,Ee,le);v.generateMipmaps=!1}else if(Le){if(ke){const $=rt(K);t.texStorage2D(n.TEXTURE_2D,ie,he,$.width,$.height)}L&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,oe,Ee,K)}else t.texImage2D(n.TEXTURE_2D,0,he,oe,Ee,K);f(v)&&M(H),re.__version=te.version,v.onUpdate&&v.onUpdate(v)}w.__version=v.version}function ze(w,v,U){if(v.image.length!==6)return;const H=q(w,v),W=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,w.__webglTexture,n.TEXTURE0+U);const te=i.get(W);if(W.version!==te.__version||H===!0){t.activeTexture(n.TEXTURE0+U);const re=$e.getPrimaries($e.workingColorSpace),Y=v.colorSpace===En?null:$e.getPrimaries(v.colorSpace),K=v.colorSpace===En||re===Y?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,K);const oe=v.isCompressedTexture||v.image[0].isCompressedTexture,Ee=v.image[0]&&v.image[0].isDataTexture,he=[];for(let Q=0;Q<6;Q++)!oe&&!Ee?he[Q]=m(v.image[Q],!0,s.maxCubemapSize):he[Q]=Ee?v.image[Q].image:v.image[Q],he[Q]=ii(v,he[Q]);const le=he[0],Ce=r.convert(v.format,v.colorSpace),Le=r.convert(v.type),ke=y(v.internalFormat,Ce,Le,v.normalized,v.colorSpace),L=v.isVideoTexture!==!0,ie=te.__version===void 0||H===!0,$=W.dataReady;let ce=T(v,le);Ue(n.TEXTURE_CUBE_MAP,v);let ge;if(oe){L&&ie&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ce,ke,le.width,le.height);for(let Q=0;Q<6;Q++){ge=he[Q].mipmaps;for(let we=0;we<ge.length;we++){const Me=ge[we];v.format!==Di?Ce!==null?L?$&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,we,0,0,Me.width,Me.height,Ce,Me.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,we,ke,Me.width,Me.height,0,Me.data):Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?$&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,we,0,0,Me.width,Me.height,Ce,Le,Me.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,we,ke,Me.width,Me.height,0,Ce,Le,Me.data)}}}else{if(ge=v.mipmaps,L&&ie){ge.length>0&&ce++;const Q=rt(he[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ce,ke,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(Ee){L?$&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,he[Q].width,he[Q].height,Ce,Le,he[Q].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,ke,he[Q].width,he[Q].height,0,Ce,Le,he[Q].data);for(let we=0;we<ge.length;we++){const yt=ge[we].image[Q].image;L?$&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,we+1,0,0,yt.width,yt.height,Ce,Le,yt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,we+1,ke,yt.width,yt.height,0,Ce,Le,yt.data)}}else{L?$&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Ce,Le,he[Q]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,ke,Ce,Le,he[Q]);for(let we=0;we<ge.length;we++){const Me=ge[we];L?$&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,we+1,0,0,Ce,Le,Me.image[Q]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,we+1,ke,Ce,Le,Me.image[Q])}}}f(v)&&M(n.TEXTURE_CUBE_MAP),te.__version=W.version,v.onUpdate&&v.onUpdate(v)}w.__version=v.version}function De(w,v,U,H,W,te){const re=r.convert(U.format,U.colorSpace),Y=r.convert(U.type),K=y(U.internalFormat,re,Y,U.normalized,U.colorSpace),oe=i.get(v),Ee=i.get(U);if(Ee.__renderTarget=v,!oe.__hasExternalTextures){const he=Math.max(1,v.width>>te),le=Math.max(1,v.height>>te);W===n.TEXTURE_3D||W===n.TEXTURE_2D_ARRAY?t.texImage3D(W,te,K,he,le,v.depth,0,re,Y,null):t.texImage2D(W,te,K,he,le,0,re,Y,null)}t.bindFramebuffer(n.FRAMEBUFFER,w),Rt(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,H,W,Ee.__webglTexture,0,St(v)):(W===n.TEXTURE_2D||W>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&W<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,H,W,Ee.__webglTexture,te),t.bindFramebuffer(n.FRAMEBUFFER,null)}function wt(w,v,U){if(n.bindRenderbuffer(n.RENDERBUFFER,w),v.depthBuffer){const H=v.depthTexture,W=H&&H.isDepthTexture?H.type:null,te=E(v.stencilBuffer,W),re=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Rt(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,St(v),te,v.width,v.height):U?n.renderbufferStorageMultisample(n.RENDERBUFFER,St(v),te,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,te,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,re,n.RENDERBUFFER,w)}else{const H=v.textures;for(let W=0;W<H.length;W++){const te=H[W],re=r.convert(te.format,te.colorSpace),Y=r.convert(te.type),K=y(te.internalFormat,re,Y,te.normalized,te.colorSpace);Rt(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,St(v),K,v.width,v.height):U?n.renderbufferStorageMultisample(n.RENDERBUFFER,St(v),K,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,K,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ye(w,v,U){const H=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,w),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const W=i.get(v.depthTexture);if(W.__renderTarget=v,(!W.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),H){if(W.__webglInit===void 0&&(W.__webglInit=!0,v.depthTexture.addEventListener("dispose",R)),W.__webglTexture===void 0){W.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,W.__webglTexture),Ue(n.TEXTURE_CUBE_MAP,v.depthTexture);const oe=r.convert(v.depthTexture.format),Ee=r.convert(v.depthTexture.type);let he;v.depthTexture.format===ln?he=n.DEPTH_COMPONENT24:v.depthTexture.format===Kn&&(he=n.DEPTH24_STENCIL8);for(let le=0;le<6;le++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,he,v.width,v.height,0,oe,Ee,null)}}else J(v.depthTexture,0);const te=W.__webglTexture,re=St(v),Y=H?n.TEXTURE_CUBE_MAP_POSITIVE_X+U:n.TEXTURE_2D,K=v.depthTexture.format===Kn?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(v.depthTexture.format===ln)Rt(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,K,Y,te,0,re):n.framebufferTexture2D(n.FRAMEBUFFER,K,Y,te,0);else if(v.depthTexture.format===Kn)Rt(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,K,Y,te,0,re):n.framebufferTexture2D(n.FRAMEBUFFER,K,Y,te,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ht(w){const v=i.get(w),U=w.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==w.depthTexture){const H=w.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),H){const W=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,H.removeEventListener("dispose",W)};H.addEventListener("dispose",W),v.__depthDisposeCallback=W}v.__boundDepthTexture=H}if(w.depthTexture&&!v.__autoAllocateDepthBuffer)if(U)for(let H=0;H<6;H++)Ye(v.__webglFramebuffer[H],w,H);else{const H=w.texture.mipmaps;H&&H.length>0?Ye(v.__webglFramebuffer[0],w,0):Ye(v.__webglFramebuffer,w,0)}else if(U){v.__webglDepthbuffer=[];for(let H=0;H<6;H++)if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[H]),v.__webglDepthbuffer[H]===void 0)v.__webglDepthbuffer[H]=n.createRenderbuffer(),wt(v.__webglDepthbuffer[H],w,!1);else{const W=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,te=v.__webglDepthbuffer[H];n.bindRenderbuffer(n.RENDERBUFFER,te),n.framebufferRenderbuffer(n.FRAMEBUFFER,W,n.RENDERBUFFER,te)}}else{const H=w.texture.mipmaps;if(H&&H.length>0?t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),wt(v.__webglDepthbuffer,w,!1);else{const W=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,te=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,te),n.framebufferRenderbuffer(n.FRAMEBUFFER,W,n.RENDERBUFFER,te)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function it(w,v,U){const H=i.get(w);v!==void 0&&De(H.__webglFramebuffer,w,w.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),U!==void 0&&ht(w)}function Je(w){const v=w.texture,U=i.get(w),H=i.get(v);w.addEventListener("dispose",_);const W=w.textures,te=w.isWebGLCubeRenderTarget===!0,re=W.length>1;if(re||(H.__webglTexture===void 0&&(H.__webglTexture=n.createTexture()),H.__version=v.version,a.memory.textures++),te){U.__webglFramebuffer=[];for(let Y=0;Y<6;Y++)if(v.mipmaps&&v.mipmaps.length>0){U.__webglFramebuffer[Y]=[];for(let K=0;K<v.mipmaps.length;K++)U.__webglFramebuffer[Y][K]=n.createFramebuffer()}else U.__webglFramebuffer[Y]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){U.__webglFramebuffer=[];for(let Y=0;Y<v.mipmaps.length;Y++)U.__webglFramebuffer[Y]=n.createFramebuffer()}else U.__webglFramebuffer=n.createFramebuffer();if(re)for(let Y=0,K=W.length;Y<K;Y++){const oe=i.get(W[Y]);oe.__webglTexture===void 0&&(oe.__webglTexture=n.createTexture(),a.memory.textures++)}if(w.samples>0&&Rt(w)===!1){U.__webglMultisampledFramebuffer=n.createFramebuffer(),U.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let Y=0;Y<W.length;Y++){const K=W[Y];U.__webglColorRenderbuffer[Y]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,U.__webglColorRenderbuffer[Y]);const oe=r.convert(K.format,K.colorSpace),Ee=r.convert(K.type),he=y(K.internalFormat,oe,Ee,K.normalized,K.colorSpace,w.isXRRenderTarget===!0),le=St(w);n.renderbufferStorageMultisample(n.RENDERBUFFER,le,he,w.width,w.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Y,n.RENDERBUFFER,U.__webglColorRenderbuffer[Y])}n.bindRenderbuffer(n.RENDERBUFFER,null),w.depthBuffer&&(U.__webglDepthRenderbuffer=n.createRenderbuffer(),wt(U.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(te){t.bindTexture(n.TEXTURE_CUBE_MAP,H.__webglTexture),Ue(n.TEXTURE_CUBE_MAP,v);for(let Y=0;Y<6;Y++)if(v.mipmaps&&v.mipmaps.length>0)for(let K=0;K<v.mipmaps.length;K++)De(U.__webglFramebuffer[Y][K],w,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,K);else De(U.__webglFramebuffer[Y],w,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0);f(v)&&M(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(re){for(let Y=0,K=W.length;Y<K;Y++){const oe=W[Y],Ee=i.get(oe);let he=n.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(he=w.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(he,Ee.__webglTexture),Ue(he,oe),De(U.__webglFramebuffer,w,oe,n.COLOR_ATTACHMENT0+Y,he,0),f(oe)&&M(he)}t.unbindTexture()}else{let Y=n.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(Y=w.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Y,H.__webglTexture),Ue(Y,v),v.mipmaps&&v.mipmaps.length>0)for(let K=0;K<v.mipmaps.length;K++)De(U.__webglFramebuffer[K],w,v,n.COLOR_ATTACHMENT0,Y,K);else De(U.__webglFramebuffer,w,v,n.COLOR_ATTACHMENT0,Y,0);f(v)&&M(Y),t.unbindTexture()}w.depthBuffer&&ht(w)}function Ct(w){const v=w.textures;for(let U=0,H=v.length;U<H;U++){const W=v[U];if(f(W)){const te=b(w),re=i.get(W).__webglTexture;t.bindTexture(te,re),M(te),t.unbindTexture()}}}const Lt=[],Bt=[];function kt(w){if(w.samples>0){if(Rt(w)===!1){const v=w.textures,U=w.width,H=w.height;let W=n.COLOR_BUFFER_BIT;const te=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,re=i.get(w),Y=v.length>1;if(Y)for(let oe=0;oe<v.length;oe++)t.bindFramebuffer(n.FRAMEBUFFER,re.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,re.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,re.__webglMultisampledFramebuffer);const K=w.texture.mipmaps;K&&K.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,re.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,re.__webglFramebuffer);for(let oe=0;oe<v.length;oe++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(W|=n.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(W|=n.STENCIL_BUFFER_BIT)),Y){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,re.__webglColorRenderbuffer[oe]);const Ee=i.get(v[oe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Ee,0)}n.blitFramebuffer(0,0,U,H,0,0,U,H,W,n.NEAREST),c===!0&&(Lt.length=0,Bt.length=0,Lt.push(n.COLOR_ATTACHMENT0+oe),w.depthBuffer&&w.resolveDepthBuffer===!1&&(Lt.push(te),Bt.push(te),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Bt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Lt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Y)for(let oe=0;oe<v.length;oe++){t.bindFramebuffer(n.FRAMEBUFFER,re.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.RENDERBUFFER,re.__webglColorRenderbuffer[oe]);const Ee=i.get(v[oe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,re.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.TEXTURE_2D,Ee,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,re.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&c){const v=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function St(w){return Math.min(s.maxSamples,w.samples)}function Rt(w){const v=i.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function I(w){const v=a.render.frame;h.get(w)!==v&&(h.set(w,v),w.update())}function ii(w,v){const U=w.colorSpace,H=w.format,W=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||U!==xa&&U!==En&&($e.getTransfer(U)===at?(H!==Di||W!==pi)&&Pe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):je("WebGLTextures: Unsupported texture color space:",U)),v}function rt(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(l.width=w.naturalWidth||w.width,l.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(l.width=w.displayWidth,l.height=w.displayHeight):(l.width=w.width,l.height=w.height),l}this.allocateTextureUnit=X,this.resetTextureUnits=G,this.getTextureUnits=Z,this.setTextureUnits=O,this.setTexture2D=J,this.setTexture2DArray=j,this.setTexture3D=ue,this.setTextureCube=fe,this.rebindTextures=it,this.setupRenderTarget=Je,this.updateRenderTargetMipmap=Ct,this.updateMultisampleRenderTarget=kt,this.setupDepthRenderbuffer=ht,this.setupFrameBufferTexture=De,this.useMultisampledRTT=Rt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function D_(n,e){function t(i,s=En){let r;const a=$e.getTransfer(s);if(i===pi)return n.UNSIGNED_BYTE;if(i===Kl)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Zl)return n.UNSIGNED_SHORT_5_5_5_1;if(i===$h)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Kh)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Yh)return n.BYTE;if(i===qh)return n.SHORT;if(i===pr)return n.UNSIGNED_SHORT;if(i===$l)return n.INT;if(i===Mi)return n.UNSIGNED_INT;if(i===ki)return n.FLOAT;if(i===bi)return n.HALF_FLOAT;if(i===Zh)return n.ALPHA;if(i===Jh)return n.RGB;if(i===Di)return n.RGBA;if(i===ln)return n.DEPTH_COMPONENT;if(i===Kn)return n.DEPTH_STENCIL;if(i===Qh)return n.RED;if(i===Jl)return n.RED_INTEGER;if(i===ts)return n.RG;if(i===Ql)return n.RG_INTEGER;if(i===jl)return n.RGBA_INTEGER;if(i===ua||i===ha||i===da||i===fa)if(a===at)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===ua)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ha)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===da)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===fa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===ua)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ha)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===da)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===fa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===sl||i===rl||i===al||i===ol)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===sl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===rl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===al)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ol)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ll||i===cl||i===ul||i===hl||i===dl||i===va||i===fl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===ll||i===cl)return a===at?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===ul)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===hl)return r.COMPRESSED_R11_EAC;if(i===dl)return r.COMPRESSED_SIGNED_R11_EAC;if(i===va)return r.COMPRESSED_RG11_EAC;if(i===fl)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===pl||i===ml||i===gl||i===vl||i===_l||i===xl||i===Sl||i===yl||i===Ml||i===bl||i===wl||i===El||i===Tl||i===Al)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===pl)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===ml)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===gl)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===vl)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===_l)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===xl)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Sl)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===yl)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ml)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===bl)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===wl)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===El)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Tl)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Al)return a===at?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Cl||i===Rl||i===Pl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===Cl)return a===at?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Rl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Pl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Dl||i===Ll||i===_a||i===Il)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===Dl)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Ll)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===_a)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Il)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===mr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const L_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,I_=`
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

}`;class F_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new od(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new ot({vertexShader:L_,fragmentShader:I_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Kt(new cn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class N_ extends Fn{constructor(e,t){super();const i=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,d=null,u=null,p=null,g=null;const x=typeof XRWebGLBinding<"u",m=new F_,f={},M=t.getContextAttributes();let b=null,y=null;const E=[],T=[],R=new Re;let _=null;const C=new yi;C.viewport=new xt;const D=new yi;D.viewport=new xt;const P=[C,D],N=new Wp;let G=null,Z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let se=E[q];return se===void 0&&(se=new ja,E[q]=se),se.getTargetRaySpace()},this.getControllerGrip=function(q){let se=E[q];return se===void 0&&(se=new ja,E[q]=se),se.getGripSpace()},this.getHand=function(q){let se=E[q];return se===void 0&&(se=new ja,E[q]=se),se.getHandSpace()};function O(q){const se=T.indexOf(q.inputSource);if(se===-1)return;const ee=E[se];ee!==void 0&&(ee.update(q.inputSource,q.frame,l||a),ee.dispatchEvent({type:q.type,data:q.inputSource}))}function X(){s.removeEventListener("select",O),s.removeEventListener("selectstart",O),s.removeEventListener("selectend",O),s.removeEventListener("squeeze",O),s.removeEventListener("squeezestart",O),s.removeEventListener("squeezeend",O),s.removeEventListener("end",X),s.removeEventListener("inputsourceschange",z);for(let q=0;q<E.length;q++){const se=T[q];se!==null&&(T[q]=null,E[q].disconnect(se))}G=null,Z=null,m.reset();for(const q in f)delete f[q];e.setRenderTarget(b),p=null,u=null,d=null,s=null,y=null,Ue.stop(),i.isPresenting=!1,e.setPixelRatio(_),e.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,i.isPresenting===!0&&Pe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,i.isPresenting===!0&&Pe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(b=e.getRenderTarget(),s.addEventListener("select",O),s.addEventListener("selectstart",O),s.addEventListener("selectend",O),s.addEventListener("squeeze",O),s.addEventListener("squeezestart",O),s.addEventListener("squeezeend",O),s.addEventListener("end",X),s.addEventListener("inputsourceschange",z),M.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(R),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let ee=null,Ne=null,ze=null;M.depth&&(ze=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ee=M.stencil?Kn:ln,Ne=M.stencil?mr:Mi);const De={colorFormat:t.RGBA8,depthFormat:ze,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(De),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),y=new mi(u.textureWidth,u.textureHeight,{format:Di,type:pi,depthTexture:new In(u.textureWidth,u.textureHeight,Ne,void 0,void 0,void 0,void 0,void 0,void 0,ee),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const ee={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,ee),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),y=new mi(p.framebufferWidth,p.framebufferHeight,{format:Di,type:pi,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),Ue.setContext(s),Ue.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function z(q){for(let se=0;se<q.removed.length;se++){const ee=q.removed[se],Ne=T.indexOf(ee);Ne>=0&&(T[Ne]=null,E[Ne].disconnect(ee))}for(let se=0;se<q.added.length;se++){const ee=q.added[se];let Ne=T.indexOf(ee);if(Ne===-1){for(let De=0;De<E.length;De++)if(De>=T.length){T.push(ee),Ne=De;break}else if(T[De]===null){T[De]=ee,Ne=De;break}if(Ne===-1)break}const ze=E[Ne];ze&&ze.connect(ee)}}const J=new A,j=new A;function ue(q,se,ee){J.setFromMatrixPosition(se.matrixWorld),j.setFromMatrixPosition(ee.matrixWorld);const Ne=J.distanceTo(j),ze=se.projectionMatrix.elements,De=ee.projectionMatrix.elements,wt=ze[14]/(ze[10]-1),Ye=ze[14]/(ze[10]+1),ht=(ze[9]+1)/ze[5],it=(ze[9]-1)/ze[5],Je=(ze[8]-1)/ze[0],Ct=(De[8]+1)/De[0],Lt=wt*Je,Bt=wt*Ct,kt=Ne/(-Je+Ct),St=kt*-Je;if(se.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(St),q.translateZ(kt),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),ze[10]===-1)q.projectionMatrix.copy(se.projectionMatrix),q.projectionMatrixInverse.copy(se.projectionMatrixInverse);else{const Rt=wt+kt,I=Ye+kt,ii=Lt-St,rt=Bt+(Ne-St),w=ht*Ye/I*Rt,v=it*Ye/I*Rt;q.projectionMatrix.makePerspective(ii,rt,w,v,Rt,I),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function fe(q,se){se===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(se.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let se=q.near,ee=q.far;m.texture!==null&&(m.depthNear>0&&(se=m.depthNear),m.depthFar>0&&(ee=m.depthFar)),N.near=D.near=C.near=se,N.far=D.far=C.far=ee,(G!==N.near||Z!==N.far)&&(s.updateRenderState({depthNear:N.near,depthFar:N.far}),G=N.near,Z=N.far),N.layers.mask=q.layers.mask|6,C.layers.mask=N.layers.mask&-5,D.layers.mask=N.layers.mask&-3;const Ne=q.parent,ze=N.cameras;fe(N,Ne);for(let De=0;De<ze.length;De++)fe(ze[De],Ne);ze.length===2?ue(N,C,D):N.projectionMatrix.copy(C.projectionMatrix),ve(q,N,Ne)};function ve(q,se,ee){ee===null?q.matrix.copy(se.matrixWorld):(q.matrix.copy(ee.matrixWorld),q.matrix.invert(),q.matrix.multiply(se.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(se.projectionMatrix),q.projectionMatrixInverse.copy(se.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=vr*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(u===null&&p===null))return c},this.setFoveation=function(q){c=q,u!==null&&(u.fixedFoveation=q),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=q)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(N)},this.getCameraTexture=function(q){return f[q]};let ye=null;function Be(q,se){if(h=se.getViewerPose(l||a),g=se,h!==null){const ee=h.views;p!==null&&(e.setRenderTargetFramebuffer(y,p.framebuffer),e.setRenderTarget(y));let Ne=!1;ee.length!==N.cameras.length&&(N.cameras.length=0,Ne=!0);for(let Ye=0;Ye<ee.length;Ye++){const ht=ee[Ye];let it=null;if(p!==null)it=p.getViewport(ht);else{const Ct=d.getViewSubImage(u,ht);it=Ct.viewport,Ye===0&&(e.setRenderTargetTextures(y,Ct.colorTexture,Ct.depthStencilTexture),e.setRenderTarget(y))}let Je=P[Ye];Je===void 0&&(Je=new yi,Je.layers.enable(Ye),Je.viewport=new xt,P[Ye]=Je),Je.matrix.fromArray(ht.transform.matrix),Je.matrix.decompose(Je.position,Je.quaternion,Je.scale),Je.projectionMatrix.fromArray(ht.projectionMatrix),Je.projectionMatrixInverse.copy(Je.projectionMatrix).invert(),Je.viewport.set(it.x,it.y,it.width,it.height),Ye===0&&(N.matrix.copy(Je.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),Ne===!0&&N.cameras.push(Je)}const ze=s.enabledFeatures;if(ze&&ze.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){d=i.getBinding();const Ye=d.getDepthInformation(ee[0]);Ye&&Ye.isValid&&Ye.texture&&m.init(Ye,s.renderState)}if(ze&&ze.includes("camera-access")&&x){e.state.unbindTexture(),d=i.getBinding();for(let Ye=0;Ye<ee.length;Ye++){const ht=ee[Ye].camera;if(ht){let it=f[ht];it||(it=new od,f[ht]=it);const Je=d.getCameraImage(ht);it.sourceTexture=Je}}}}for(let ee=0;ee<E.length;ee++){const Ne=T[ee],ze=E[ee];Ne!==null&&ze!==void 0&&ze.update(Ne,se,l||a)}ye&&ye(q,se),se.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:se}),g=null}const Ue=new fd;Ue.setAnimationLoop(Be),this.setAnimationLoop=function(q){ye=q},this.dispose=function(){}}}const U_=new Ze,Sd=new Oe;Sd.set(-1,0,0,0,1,0,0,0,1);function O_(n,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,ld(n)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,M,b,y){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?r(m,f):f.isMeshLambertMaterial?(r(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(r(m,f),d(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(r(m,f),u(m,f),f.isMeshPhysicalMaterial&&p(m,f,y)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),x(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?c(m,f,M,b):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===ti&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===ti&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const M=e.get(f),b=M.envMap,y=M.envMapRotation;b&&(m.envMap.value=b,m.envMapRotation.value.setFromMatrix4(U_.makeRotationFromEuler(y)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Sd),m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,M,b){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*M,m.scale.value=b*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function u(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,M){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===ti&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function x(m,f){const M=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function B_(n,e,t,i){let s={},r={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,E){const T=E.program;i.uniformBlockBinding(y,T)}function l(y,E){let T=s[y.id];T===void 0&&(m(y),T=h(y),s[y.id]=T,y.addEventListener("dispose",M));const R=E.program;i.updateUBOMapping(y,R);const _=e.render.frame;r[y.id]!==_&&(u(y),r[y.id]=_)}function h(y){const E=d();y.__bindingPointIndex=E;const T=n.createBuffer(),R=y.__size,_=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,T),n.bufferData(n.UNIFORM_BUFFER,R,_),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,E,T),T}function d(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return je("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){const E=s[y.id],T=y.uniforms,R=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,E);for(let _=0,C=T.length;_<C;_++){const D=T[_];if(Array.isArray(D))for(let P=0,N=D.length;P<N;P++)p(D[P],_,P,R);else p(D,_,0,R)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(y,E,T,R){if(x(y,E,T,R)===!0){const _=y.__offset,C=y.value;if(Array.isArray(C)){let D=0;for(let P=0;P<C.length;P++){const N=C[P],G=f(N);g(N,y.__data,D),typeof N!="number"&&typeof N!="boolean"&&!N.isMatrix3&&!ArrayBuffer.isView(N)&&(D+=G.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(C,y.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,_,y.__data)}}function g(y,E,T){typeof y=="number"||typeof y=="boolean"?E[0]=y:y.isMatrix3?(E[0]=y.elements[0],E[1]=y.elements[1],E[2]=y.elements[2],E[3]=0,E[4]=y.elements[3],E[5]=y.elements[4],E[6]=y.elements[5],E[7]=0,E[8]=y.elements[6],E[9]=y.elements[7],E[10]=y.elements[8],E[11]=0):ArrayBuffer.isView(y)?E.set(new y.constructor(y.buffer,y.byteOffset,E.length)):y.toArray(E,T)}function x(y,E,T,R){const _=y.value,C=E+"_"+T;if(R[C]===void 0)return typeof _=="number"||typeof _=="boolean"?R[C]=_:ArrayBuffer.isView(_)?R[C]=_.slice():R[C]=_.clone(),!0;{const D=R[C];if(typeof _=="number"||typeof _=="boolean"){if(D!==_)return R[C]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(D.equals(_)===!1)return D.copy(_),!0}}return!1}function m(y){const E=y.uniforms;let T=0;const R=16;for(let C=0,D=E.length;C<D;C++){const P=Array.isArray(E[C])?E[C]:[E[C]];for(let N=0,G=P.length;N<G;N++){const Z=P[N],O=Array.isArray(Z.value)?Z.value:[Z.value];for(let X=0,z=O.length;X<z;X++){const J=O[X],j=f(J),ue=T%R,fe=ue%j.boundary,ve=ue+fe;T+=fe,ve!==0&&R-ve<j.storage&&(T+=R-ve),Z.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),Z.__offset=T,T+=j.storage}}}const _=T%R;return _>0&&(T+=R-_),y.__size=T,y.__cache={},this}function f(y){const E={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(E.boundary=4,E.storage=4):y.isVector2?(E.boundary=8,E.storage=8):y.isVector3||y.isColor?(E.boundary=16,E.storage=12):y.isVector4?(E.boundary=16,E.storage=16):y.isMatrix3?(E.boundary=48,E.storage=48):y.isMatrix4?(E.boundary=64,E.storage=64):y.isTexture?Pe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(E.boundary=16,E.storage=y.byteLength):Pe("WebGLRenderer: Unsupported uniform value type.",y),E}function M(y){const E=y.target;E.removeEventListener("dispose",M);const T=a.indexOf(E.__bindingPointIndex);a.splice(T,1),n.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function b(){for(const y in s)n.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:c,update:l,dispose:b}}const z_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Bi=null;function k_(){return Bi===null&&(Bi=new Mp(z_,16,16,ts,bi),Bi.name="DFG_LUT",Bi.minFilter=bt,Bi.magFilter=bt,Bi.wrapS=nn,Bi.wrapT=nn,Bi.generateMipmaps=!1,Bi.needsUpdate=!0),Bi}class H_{constructor(e={}){const{canvas:t=zf(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:p=pi}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;const x=p,m=new Set([jl,Ql,Jl]),f=new Set([pi,Mi,pr,mr,Kl,Zl]),M=new Uint32Array(4),b=new Int32Array(4),y=new A;let E=null,T=null;const R=[],_=[];let C=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Li,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const D=this;let P=!1,N=null,G=null,Z=null,O=null;this._outputColorSpace=ri;let X=0,z=0,J=null,j=-1,ue=null;const fe=new xt,ve=new xt;let ye=null;const Be=new ae(0);let Ue=0,q=t.width,se=t.height,ee=1,Ne=null,ze=null;const De=new xt(0,0,q,se),wt=new xt(0,0,q,se);let Ye=!1;const ht=new rc;let it=!1,Je=!1;const Ct=new Ze,Lt=new A,Bt=new xt,kt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let St=!1;function Rt(){return J===null?ee:1}let I=i;function ii(S,F){return t.getContext(S,F)}try{const S={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ql}`),t.addEventListener("webglcontextlost",yt,!1),t.addEventListener("webglcontextrestored",mt,!1),t.addEventListener("webglcontextcreationerror",Fi,!1),I===null){const F="webgl2";if(I=ii(F,S),I===null)throw ii(F)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(S){throw je("WebGLRenderer: "+S.message),S}let rt,w,v,U,H,W,te,re,Y,K,oe,Ee,he,le,Ce,Le,ke,L,ie,$,ce,ge,Q;function we(){rt=new kg(I),rt.init(),ce=new D_(I,rt),w=new Lg(I,rt,e,ce),v=new R_(I,rt),w.reversedDepthBuffer&&u&&v.buffers.depth.setReversed(!0),G=I.createFramebuffer(),Z=I.createFramebuffer(),O=I.createFramebuffer(),U=new Gg(I),H=new m_,W=new P_(I,rt,v,H,w,ce,U),te=new zg(D),re=new qp(I),ge=new Pg(I,re),Y=new Hg(I,re,U,ge),K=new Xg(I,Y,re,ge,U),L=new Wg(I,w,W),Ce=new Ig(H),oe=new p_(D,te,rt,w,ge,Ce),Ee=new O_(D,H),he=new v_,le=new b_(rt),ke=new Rg(D,te,v,K,g,c),Le=new C_(D,K,w),Q=new B_(I,U,w,v),ie=new Dg(I,rt,U),$=new Vg(I,rt,U),U.programs=oe.programs,D.capabilities=w,D.extensions=rt,D.properties=H,D.renderLists=he,D.shadowMap=Le,D.state=v,D.info=U}we(),x!==pi&&(C=new qg(x,t.width,t.height,o,s,r));const Me=new N_(D,I);this.xr=Me,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const S=rt.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=rt.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return ee},this.setPixelRatio=function(S){S!==void 0&&(ee=S,this.setSize(q,se,!1))},this.getSize=function(S){return S.set(q,se)},this.setSize=function(S,F,V=!0){if(Me.isPresenting){Pe("WebGLRenderer: Can't change size while VR device is presenting.");return}q=S,se=F,t.width=Math.floor(S*ee),t.height=Math.floor(F*ee),V===!0&&(t.style.width=S+"px",t.style.height=F+"px"),C!==null&&C.setSize(t.width,t.height),this.setViewport(0,0,S,F)},this.getDrawingBufferSize=function(S){return S.set(q*ee,se*ee).floor()},this.setDrawingBufferSize=function(S,F,V){q=S,se=F,ee=V,t.width=Math.floor(S*V),t.height=Math.floor(F*V),this.setViewport(0,0,S,F)},this.setEffects=function(S){if(x===pi){je("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let F=0;F<S.length;F++)if(S[F].isOutputPass===!0){Pe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}C.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(fe)},this.getViewport=function(S){return S.copy(De)},this.setViewport=function(S,F,V,B){S.isVector4?De.set(S.x,S.y,S.z,S.w):De.set(S,F,V,B),v.viewport(fe.copy(De).multiplyScalar(ee).round())},this.getScissor=function(S){return S.copy(wt)},this.setScissor=function(S,F,V,B){S.isVector4?wt.set(S.x,S.y,S.z,S.w):wt.set(S,F,V,B),v.scissor(ve.copy(wt).multiplyScalar(ee).round())},this.getScissorTest=function(){return Ye},this.setScissorTest=function(S){v.setScissorTest(Ye=S)},this.setOpaqueSort=function(S){Ne=S},this.setTransparentSort=function(S){ze=S},this.getClearColor=function(S){return S.copy(ke.getClearColor())},this.setClearColor=function(){ke.setClearColor(...arguments)},this.getClearAlpha=function(){return ke.getClearAlpha()},this.setClearAlpha=function(){ke.setClearAlpha(...arguments)},this.clear=function(S=!0,F=!0,V=!0){let B=0;if(S){let k=!1;if(J!==null){const me=J.texture.format;k=m.has(me)}if(k){const me=J.texture.type,Se=f.has(me),pe=ke.getClearColor(),be=ke.getClearAlpha(),Te=pe.r,He=pe.g,Xe=pe.b;Se?(M[0]=Te,M[1]=He,M[2]=Xe,M[3]=be,I.clearBufferuiv(I.COLOR,0,M)):(b[0]=Te,b[1]=He,b[2]=Xe,b[3]=be,I.clearBufferiv(I.COLOR,0,b))}else B|=I.COLOR_BUFFER_BIT}F&&(B|=I.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),V&&(B|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B!==0&&I.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),N=S},this.dispose=function(){t.removeEventListener("webglcontextlost",yt,!1),t.removeEventListener("webglcontextrestored",mt,!1),t.removeEventListener("webglcontextcreationerror",Fi,!1),ke.dispose(),he.dispose(),le.dispose(),H.dispose(),te.dispose(),K.dispose(),ge.dispose(),Q.dispose(),oe.dispose(),Me.dispose(),Me.removeEventListener("sessionstart",Rc),Me.removeEventListener("sessionend",Pc),Bn.stop()};function yt(S){S.preventDefault(),Xc("WebGLRenderer: Context Lost."),P=!0}function mt(){Xc("WebGLRenderer: Context Restored."),P=!1;const S=U.autoReset,F=Le.enabled,V=Le.autoUpdate,B=Le.needsUpdate,k=Le.type;we(),U.autoReset=S,Le.enabled=F,Le.autoUpdate=V,Le.needsUpdate=B,Le.type=k}function Fi(S){je("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Ni(S){const F=S.target;F.removeEventListener("dispose",Ni),Qd(F)}function Qd(S){jd(S),H.remove(S)}function jd(S){const F=H.get(S).programs;F!==void 0&&(F.forEach(function(V){oe.releaseProgram(V)}),S.isShaderMaterial&&oe.releaseShaderCache(S))}this.renderBufferDirect=function(S,F,V,B,k,me){F===null&&(F=kt);const Se=k.isMesh&&k.matrixWorld.determinantAffine()<0,pe=nf(S,F,V,B,k);v.setMaterial(B,Se);let be=V.index,Te=1;if(B.wireframe===!0){if(be=Y.getWireframeAttribute(V),be===void 0)return;Te=2}const He=V.drawRange,Xe=V.attributes.position;let Ae=He.start*Te,ct=(He.start+He.count)*Te;me!==null&&(Ae=Math.max(Ae,me.start*Te),ct=Math.min(ct,(me.start+me.count)*Te)),be!==null?(Ae=Math.max(Ae,0),ct=Math.min(ct,be.count)):Xe!=null&&(Ae=Math.max(Ae,0),ct=Math.min(ct,Xe.count));const Et=ct-Ae;if(Et<0||Et===1/0)return;ge.setup(k,B,pe,V,be);let Mt,dt=ie;if(be!==null&&(Mt=re.get(be),dt=$,dt.setIndex(Mt)),k.isMesh)B.wireframe===!0?(v.setLineWidth(B.wireframeLinewidth*Rt()),dt.setMode(I.LINES)):dt.setMode(I.TRIANGLES);else if(k.isLine){let Wt=B.linewidth;Wt===void 0&&(Wt=1),v.setLineWidth(Wt*Rt()),k.isLineSegments?dt.setMode(I.LINES):k.isLineLoop?dt.setMode(I.LINE_LOOP):dt.setMode(I.LINE_STRIP)}else k.isPoints?dt.setMode(I.POINTS):k.isSprite&&dt.setMode(I.TRIANGLES);if(k.isBatchedMesh)if(rt.get("WEBGL_multi_draw"))dt.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const Wt=k._multiDrawStarts,_e=k._multiDrawCounts,ui=k._multiDrawCount,Qe=be?re.get(be).bytesPerElement:1,_i=H.get(B).currentProgram.getUniforms();for(let Ui=0;Ui<ui;Ui++)_i.setValue(I,"_gl_DrawID",Ui),dt.render(Wt[Ui]/Qe,_e[Ui])}else if(k.isInstancedMesh)dt.renderInstances(Ae,Et,k.count);else if(V.isInstancedBufferGeometry){const Wt=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,_e=Math.min(V.instanceCount,Wt);dt.renderInstances(Ae,Et,_e)}else dt.render(Ae,Et)};function Cc(S,F,V){S.transparent===!0&&S.side===Ri&&S.forceSinglePass===!1?(S.side=ti,S.needsUpdate=!0,Tr(S,F,V),S.side=Ln,S.needsUpdate=!0,Tr(S,F,V),S.side=Ri):Tr(S,F,V)}this.compile=function(S,F,V=null){V===null&&(V=S),T=le.get(V),T.init(F),_.push(T),V.traverseVisible(function(k){k.isLight&&k.layers.test(F.layers)&&(T.pushLight(k),k.castShadow&&T.pushShadow(k))}),S!==V&&S.traverseVisible(function(k){k.isLight&&k.layers.test(F.layers)&&(T.pushLight(k),k.castShadow&&T.pushShadow(k))}),T.setupLights();const B=new Set;return S.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const me=k.material;if(me)if(Array.isArray(me))for(let Se=0;Se<me.length;Se++){const pe=me[Se];Cc(pe,V,k),B.add(pe)}else Cc(me,V,k),B.add(me)}),T=_.pop(),B},this.compileAsync=function(S,F,V=null){const B=this.compile(S,F,V);return new Promise(k=>{function me(){if(B.forEach(function(Se){H.get(Se).currentProgram.isReady()&&B.delete(Se)}),B.size===0){k(S);return}setTimeout(me,10)}rt.get("KHR_parallel_shader_compile")!==null?me():setTimeout(me,10)})};let Ga=null;function ef(S){Ga&&Ga(S)}function Rc(){Bn.stop()}function Pc(){Bn.start()}const Bn=new fd;Bn.setAnimationLoop(ef),typeof self<"u"&&Bn.setContext(self),this.setAnimationLoop=function(S){Ga=S,Me.setAnimationLoop(S),S===null?Bn.stop():Bn.start()},Me.addEventListener("sessionstart",Rc),Me.addEventListener("sessionend",Pc),this.render=function(S,F){if(F!==void 0&&F.isCamera!==!0){je("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;N!==null&&N.renderStart(S,F);const V=Me.enabled===!0&&Me.isPresenting===!0,B=C!==null&&(J===null||V)&&C.begin(D,J);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),Me.enabled===!0&&Me.isPresenting===!0&&(C===null||C.isCompositing()===!1)&&(Me.cameraAutoUpdate===!0&&Me.updateCamera(F),F=Me.getCamera()),S.isScene===!0&&S.onBeforeRender(D,S,F,J),T=le.get(S,_.length),T.init(F),T.state.textureUnits=W.getTextureUnits(),_.push(T),Ct.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),ht.setFromProjectionMatrix(Ct,Hi,F.reversedDepth),Je=this.localClippingEnabled,it=Ce.init(this.clippingPlanes,Je),E=he.get(S,R.length),E.init(),R.push(E),Me.enabled===!0&&Me.isPresenting===!0){const Se=D.xr.getDepthSensingMesh();Se!==null&&Wa(Se,F,-1/0,D.sortObjects)}Wa(S,F,0,D.sortObjects),E.finish(),D.sortObjects===!0&&E.sort(Ne,ze,F.reversedDepth),St=Me.enabled===!1||Me.isPresenting===!1||Me.hasDepthSensing()===!1,St&&ke.addToRenderList(E,S),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),it===!0&&Ce.beginShadows();const k=T.state.shadowsArray;if(Le.render(k,S,F),it===!0&&Ce.endShadows(),(B&&C.hasRenderPass())===!1){const Se=E.opaque,pe=E.transmissive;if(T.setupLights(),F.isArrayCamera){const be=F.cameras;if(pe.length>0)for(let Te=0,He=be.length;Te<He;Te++){const Xe=be[Te];Lc(Se,pe,S,Xe)}St&&ke.render(S);for(let Te=0,He=be.length;Te<He;Te++){const Xe=be[Te];Dc(E,S,Xe,Xe.viewport)}}else pe.length>0&&Lc(Se,pe,S,F),St&&ke.render(S),Dc(E,S,F)}J!==null&&z===0&&(W.updateMultisampleRenderTarget(J),W.updateRenderTargetMipmap(J)),B&&C.end(D),S.isScene===!0&&S.onAfterRender(D,S,F),ge.resetDefaultState(),j=-1,ue=null,_.pop(),_.length>0?(T=_[_.length-1],W.setTextureUnits(T.state.textureUnits),it===!0&&Ce.setGlobalState(D.clippingPlanes,T.state.camera)):T=null,R.pop(),R.length>0?E=R[R.length-1]:E=null,N!==null&&N.renderEnd()};function Wa(S,F,V,B){if(S.visible===!1)return;if(S.layers.test(F.layers)){if(S.isGroup)V=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(F);else if(S.isLightProbeGrid)T.pushLightProbeGrid(S);else if(S.isLight)T.pushLight(S),S.castShadow&&T.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||ht.intersectsSprite(S)){B&&Bt.setFromMatrixPosition(S.matrixWorld).applyMatrix4(Ct);const Se=K.update(S),pe=S.material;pe.visible&&E.push(S,Se,pe,V,Bt.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||ht.intersectsObject(S))){const Se=K.update(S),pe=S.material;if(B&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Bt.copy(S.boundingSphere.center)):(Se.boundingSphere===null&&Se.computeBoundingSphere(),Bt.copy(Se.boundingSphere.center)),Bt.applyMatrix4(S.matrixWorld).applyMatrix4(Ct)),Array.isArray(pe)){const be=Se.groups;for(let Te=0,He=be.length;Te<He;Te++){const Xe=be[Te],Ae=pe[Xe.materialIndex];Ae&&Ae.visible&&E.push(S,Se,Ae,V,Bt.z,Xe)}}else pe.visible&&E.push(S,Se,pe,V,Bt.z,null)}}const me=S.children;for(let Se=0,pe=me.length;Se<pe;Se++)Wa(me[Se],F,V,B)}function Dc(S,F,V,B){const{opaque:k,transmissive:me,transparent:Se}=S;T.setupLightsView(V),it===!0&&Ce.setGlobalState(D.clippingPlanes,V),B&&v.viewport(fe.copy(B)),k.length>0&&Er(k,F,V),me.length>0&&Er(me,F,V),Se.length>0&&Er(Se,F,V),v.buffers.depth.setTest(!0),v.buffers.depth.setMask(!0),v.buffers.color.setMask(!0),v.setPolygonOffset(!1)}function Lc(S,F,V,B){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[B.id]===void 0){const Ae=rt.has("EXT_color_buffer_half_float")||rt.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[B.id]=new mi(1,1,{generateMipmaps:!0,type:Ae?bi:pi,minFilter:$n,samples:Math.max(4,w.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$e.workingColorSpace})}const me=T.state.transmissionRenderTarget[B.id],Se=B.viewport||fe;me.setSize(Se.z*D.transmissionResolutionScale,Se.w*D.transmissionResolutionScale);const pe=D.getRenderTarget(),be=D.getActiveCubeFace(),Te=D.getActiveMipmapLevel();D.setRenderTarget(me),D.getClearColor(Be),Ue=D.getClearAlpha(),Ue<1&&D.setClearColor(16777215,.5),D.clear(),St&&ke.render(V);const He=D.toneMapping;D.toneMapping=Li;const Xe=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),T.setupLightsView(B),it===!0&&Ce.setGlobalState(D.clippingPlanes,B),Er(S,V,B),W.updateMultisampleRenderTarget(me),W.updateRenderTargetMipmap(me),rt.has("WEBGL_multisampled_render_to_texture")===!1){let Ae=!1;for(let ct=0,Et=F.length;ct<Et;ct++){const Mt=F[ct],{object:dt,geometry:Wt,material:_e,group:ui}=Mt;if(_e.side===Ri&&dt.layers.test(B.layers)){const Qe=_e.side;_e.side=ti,_e.needsUpdate=!0,Ic(dt,V,B,Wt,_e,ui),_e.side=Qe,_e.needsUpdate=!0,Ae=!0}}Ae===!0&&(W.updateMultisampleRenderTarget(me),W.updateRenderTargetMipmap(me))}D.setRenderTarget(pe,be,Te),D.setClearColor(Be,Ue),Xe!==void 0&&(B.viewport=Xe),D.toneMapping=He}function Er(S,F,V){const B=F.isScene===!0?F.overrideMaterial:null;for(let k=0,me=S.length;k<me;k++){const Se=S[k],{object:pe,geometry:be,group:Te}=Se;let He=Se.material;He.allowOverride===!0&&B!==null&&(He=B),pe.layers.test(V.layers)&&Ic(pe,F,V,be,He,Te)}}function Ic(S,F,V,B,k,me){S.onBeforeRender(D,F,V,B,k,me),S.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),k.onBeforeRender(D,F,V,B,S,me),k.transparent===!0&&k.side===Ri&&k.forceSinglePass===!1?(k.side=ti,k.needsUpdate=!0,D.renderBufferDirect(V,F,B,k,S,me),k.side=Ln,k.needsUpdate=!0,D.renderBufferDirect(V,F,B,k,S,me),k.side=Ri):D.renderBufferDirect(V,F,B,k,S,me),S.onAfterRender(D,F,V,B,k,me)}function Tr(S,F,V){F.isScene!==!0&&(F=kt);const B=H.get(S),k=T.state.lights,me=T.state.shadowsArray,Se=k.state.version,pe=oe.getParameters(S,k.state,me,F,V,T.state.lightProbeGridArray),be=oe.getProgramCacheKey(pe);let Te=B.programs;B.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?F.environment:null,B.fog=F.fog;const He=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;B.envMap=te.get(S.envMap||B.environment,He),B.envMapRotation=B.environment!==null&&S.envMap===null?F.environmentRotation:S.envMapRotation,Te===void 0&&(S.addEventListener("dispose",Ni),Te=new Map,B.programs=Te);let Xe=Te.get(be);if(Xe!==void 0){if(B.currentProgram===Xe&&B.lightsStateVersion===Se)return Nc(S,pe),Xe}else pe.uniforms=oe.getUniforms(S),N!==null&&S.isNodeMaterial&&N.build(S,V,pe),S.onBeforeCompile(pe,D),Xe=oe.acquireProgram(pe,be),Te.set(be,Xe),B.uniforms=pe.uniforms;const Ae=B.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Ae.clippingPlanes=Ce.uniform),Nc(S,pe),B.needsLights=rf(S),B.lightsStateVersion=Se,B.needsLights&&(Ae.ambientLightColor.value=k.state.ambient,Ae.lightProbe.value=k.state.probe,Ae.directionalLights.value=k.state.directional,Ae.directionalLightShadows.value=k.state.directionalShadow,Ae.spotLights.value=k.state.spot,Ae.spotLightShadows.value=k.state.spotShadow,Ae.rectAreaLights.value=k.state.rectArea,Ae.ltc_1.value=k.state.rectAreaLTC1,Ae.ltc_2.value=k.state.rectAreaLTC2,Ae.pointLights.value=k.state.point,Ae.pointLightShadows.value=k.state.pointShadow,Ae.hemisphereLights.value=k.state.hemi,Ae.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Ae.spotLightMatrix.value=k.state.spotLightMatrix,Ae.spotLightMap.value=k.state.spotLightMap,Ae.pointShadowMatrix.value=k.state.pointShadowMatrix),B.lightProbeGrid=T.state.lightProbeGridArray.length>0,B.currentProgram=Xe,B.uniformsList=null,Xe}function Fc(S){if(S.uniformsList===null){const F=S.currentProgram.getUniforms();S.uniformsList=pa.seqWithValue(F.seq,S.uniforms)}return S.uniformsList}function Nc(S,F){const V=H.get(S);V.outputColorSpace=F.outputColorSpace,V.batching=F.batching,V.batchingColor=F.batchingColor,V.instancing=F.instancing,V.instancingColor=F.instancingColor,V.instancingMorph=F.instancingMorph,V.skinning=F.skinning,V.morphTargets=F.morphTargets,V.morphNormals=F.morphNormals,V.morphColors=F.morphColors,V.morphTargetsCount=F.morphTargetsCount,V.numClippingPlanes=F.numClippingPlanes,V.numIntersection=F.numClipIntersection,V.vertexAlphas=F.vertexAlphas,V.vertexTangents=F.vertexTangents,V.toneMapping=F.toneMapping}function tf(S,F){if(S.length===0)return null;if(S.length===1)return S[0].texture!==null?S[0]:null;y.setFromMatrixPosition(F.matrixWorld);for(let V=0,B=S.length;V<B;V++){const k=S[V];if(k.texture!==null&&k.boundingBox.containsPoint(y))return k}return null}function nf(S,F,V,B,k){F.isScene!==!0&&(F=kt),W.resetTextureUnits();const me=F.fog,Se=B.isMeshStandardMaterial||B.isMeshLambertMaterial||B.isMeshPhongMaterial?F.environment:null,pe=J===null?D.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:$e.workingColorSpace,be=B.isMeshStandardMaterial||B.isMeshLambertMaterial&&!B.envMap||B.isMeshPhongMaterial&&!B.envMap,Te=te.get(B.envMap||Se,be),He=B.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Xe=!!V.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),Ae=!!V.morphAttributes.position,ct=!!V.morphAttributes.normal,Et=!!V.morphAttributes.color;let Mt=Li;B.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(Mt=D.toneMapping);const dt=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Wt=dt!==void 0?dt.length:0,_e=H.get(B),ui=T.state.lights;if(it===!0&&(Je===!0||S!==ue)){const gt=S===ue&&B.id===j;Ce.setState(B,S,gt)}let Qe=!1;B.version===_e.__version?(_e.needsLights&&_e.lightsStateVersion!==ui.state.version||_e.outputColorSpace!==pe||k.isBatchedMesh&&_e.batching===!1||!k.isBatchedMesh&&_e.batching===!0||k.isBatchedMesh&&_e.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&_e.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&_e.instancing===!1||!k.isInstancedMesh&&_e.instancing===!0||k.isSkinnedMesh&&_e.skinning===!1||!k.isSkinnedMesh&&_e.skinning===!0||k.isInstancedMesh&&_e.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&_e.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&_e.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&_e.instancingMorph===!1&&k.morphTexture!==null||_e.envMap!==Te||B.fog===!0&&_e.fog!==me||_e.numClippingPlanes!==void 0&&(_e.numClippingPlanes!==Ce.numPlanes||_e.numIntersection!==Ce.numIntersection)||_e.vertexAlphas!==He||_e.vertexTangents!==Xe||_e.morphTargets!==Ae||_e.morphNormals!==ct||_e.morphColors!==Et||_e.toneMapping!==Mt||_e.morphTargetsCount!==Wt||!!_e.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(Qe=!0):(Qe=!0,_e.__version=B.version);let _i=_e.currentProgram;Qe===!0&&(_i=Tr(B,F,k),N&&B.isNodeMaterial&&N.onUpdateProgram(B,_i,_e));let Ui=!1,hn=!1,ls=!1;const ft=_i.getUniforms(),Tt=_e.uniforms;if(v.useProgram(_i.program)&&(Ui=!0,hn=!0,ls=!0),B.id!==j&&(j=B.id,hn=!0),_e.needsLights){const gt=tf(T.state.lightProbeGridArray,k);_e.lightProbeGrid!==gt&&(_e.lightProbeGrid=gt,hn=!0)}if(Ui||ue!==S){v.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),ft.setValue(I,"projectionMatrix",S.projectionMatrix),ft.setValue(I,"viewMatrix",S.matrixWorldInverse);const fn=ft.map.cameraPosition;fn!==void 0&&fn.setValue(I,Lt.setFromMatrixPosition(S.matrixWorld)),w.logarithmicDepthBuffer&&ft.setValue(I,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&ft.setValue(I,"isOrthographic",S.isOrthographicCamera===!0),ue!==S&&(ue=S,hn=!0,ls=!0)}if(_e.needsLights&&(ui.state.directionalShadowMap.length>0&&ft.setValue(I,"directionalShadowMap",ui.state.directionalShadowMap,W),ui.state.spotShadowMap.length>0&&ft.setValue(I,"spotShadowMap",ui.state.spotShadowMap,W),ui.state.pointShadowMap.length>0&&ft.setValue(I,"pointShadowMap",ui.state.pointShadowMap,W)),k.isSkinnedMesh){ft.setOptional(I,k,"bindMatrix"),ft.setOptional(I,k,"bindMatrixInverse");const gt=k.skeleton;gt&&(gt.boneTexture===null&&gt.computeBoneTexture(),ft.setValue(I,"boneTexture",gt.boneTexture,W))}k.isBatchedMesh&&(ft.setOptional(I,k,"batchingTexture"),ft.setValue(I,"batchingTexture",k._matricesTexture,W),ft.setOptional(I,k,"batchingIdTexture"),ft.setValue(I,"batchingIdTexture",k._indirectTexture,W),ft.setOptional(I,k,"batchingColorTexture"),k._colorsTexture!==null&&ft.setValue(I,"batchingColorTexture",k._colorsTexture,W));const dn=V.morphAttributes;if((dn.position!==void 0||dn.normal!==void 0||dn.color!==void 0)&&L.update(k,V,_i),(hn||_e.receiveShadow!==k.receiveShadow)&&(_e.receiveShadow=k.receiveShadow,ft.setValue(I,"receiveShadow",k.receiveShadow)),(B.isMeshStandardMaterial||B.isMeshLambertMaterial||B.isMeshPhongMaterial)&&B.envMap===null&&F.environment!==null&&(Tt.envMapIntensity.value=F.environmentIntensity),Tt.dfgLUT!==void 0&&(Tt.dfgLUT.value=k_()),hn){if(ft.setValue(I,"toneMappingExposure",D.toneMappingExposure),_e.needsLights&&sf(Tt,ls),me&&B.fog===!0&&Ee.refreshFogUniforms(Tt,me),Ee.refreshMaterialUniforms(Tt,B,ee,se,T.state.transmissionRenderTarget[S.id]),_e.needsLights&&_e.lightProbeGrid){const gt=_e.lightProbeGrid;Tt.probesSH.value=gt.texture,Tt.probesMin.value.copy(gt.boundingBox.min),Tt.probesMax.value.copy(gt.boundingBox.max),Tt.probesResolution.value.copy(gt.resolution)}pa.upload(I,Fc(_e),Tt,W)}if(B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(pa.upload(I,Fc(_e),Tt,W),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&ft.setValue(I,"center",k.center),ft.setValue(I,"modelViewMatrix",k.modelViewMatrix),ft.setValue(I,"normalMatrix",k.normalMatrix),ft.setValue(I,"modelMatrix",k.matrixWorld),B.uniformsGroups!==void 0){const gt=B.uniformsGroups;for(let fn=0,cs=gt.length;fn<cs;fn++){const Uc=gt[fn];Q.update(Uc,_i),Q.bind(Uc,_i)}}return _i}function sf(S,F){S.ambientLightColor.needsUpdate=F,S.lightProbe.needsUpdate=F,S.directionalLights.needsUpdate=F,S.directionalLightShadows.needsUpdate=F,S.pointLights.needsUpdate=F,S.pointLightShadows.needsUpdate=F,S.spotLights.needsUpdate=F,S.spotLightShadows.needsUpdate=F,S.rectAreaLights.needsUpdate=F,S.hemisphereLights.needsUpdate=F}function rf(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return X},this.getActiveMipmapLevel=function(){return z},this.getRenderTarget=function(){return J},this.setRenderTargetTextures=function(S,F,V){const B=H.get(S);B.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,B.__autoAllocateDepthBuffer===!1&&(B.__useRenderToTexture=!1),H.get(S.texture).__webglTexture=F,H.get(S.depthTexture).__webglTexture=B.__autoAllocateDepthBuffer?void 0:V,B.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,F){const V=H.get(S);V.__webglFramebuffer=F,V.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(S,F=0,V=0){J=S,X=F,z=V;let B=null,k=!1,me=!1;if(S){const pe=H.get(S);if(pe.__useDefaultFramebuffer!==void 0){v.bindFramebuffer(I.FRAMEBUFFER,pe.__webglFramebuffer),fe.copy(S.viewport),ve.copy(S.scissor),ye=S.scissorTest,v.viewport(fe),v.scissor(ve),v.setScissorTest(ye),j=-1;return}else if(pe.__webglFramebuffer===void 0)W.setupRenderTarget(S);else if(pe.__hasExternalTextures)W.rebindTextures(S,H.get(S.texture).__webglTexture,H.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const He=S.depthTexture;if(pe.__boundDepthTexture!==He){if(He!==null&&H.has(He)&&(S.width!==He.image.width||S.height!==He.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");W.setupDepthRenderbuffer(S)}}const be=S.texture;(be.isData3DTexture||be.isDataArrayTexture||be.isCompressedArrayTexture)&&(me=!0);const Te=H.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Te[F])?B=Te[F][V]:B=Te[F],k=!0):S.samples>0&&W.useMultisampledRTT(S)===!1?B=H.get(S).__webglMultisampledFramebuffer:Array.isArray(Te)?B=Te[V]:B=Te,fe.copy(S.viewport),ve.copy(S.scissor),ye=S.scissorTest}else fe.copy(De).multiplyScalar(ee).floor(),ve.copy(wt).multiplyScalar(ee).floor(),ye=Ye;if(V!==0&&(B=G),v.bindFramebuffer(I.FRAMEBUFFER,B)&&v.drawBuffers(S,B),v.viewport(fe),v.scissor(ve),v.setScissorTest(ye),k){const pe=H.get(S.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+F,pe.__webglTexture,V)}else if(me){const pe=F;for(let be=0;be<S.textures.length;be++){const Te=H.get(S.textures[be]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+be,Te.__webglTexture,V,pe)}}else if(S!==null&&V!==0){const pe=H.get(S.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,pe.__webglTexture,V)}j=-1},this.readRenderTargetPixels=function(S,F,V,B,k,me,Se,pe=0){if(!(S&&S.isWebGLRenderTarget)){je("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let be=H.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Se!==void 0&&(be=be[Se]),be){v.bindFramebuffer(I.FRAMEBUFFER,be);try{const Te=S.textures[pe],He=Te.format,Xe=Te.type;if(S.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+pe),!w.textureFormatReadable(He)){je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!w.textureTypeReadable(Xe)){je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=S.width-B&&V>=0&&V<=S.height-k&&I.readPixels(F,V,B,k,ce.convert(He),ce.convert(Xe),me)}finally{const Te=J!==null?H.get(J).__webglFramebuffer:null;v.bindFramebuffer(I.FRAMEBUFFER,Te)}}},this.readRenderTargetPixelsAsync=async function(S,F,V,B,k,me,Se,pe=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let be=H.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Se!==void 0&&(be=be[Se]),be)if(F>=0&&F<=S.width-B&&V>=0&&V<=S.height-k){v.bindFramebuffer(I.FRAMEBUFFER,be);const Te=S.textures[pe],He=Te.format,Xe=Te.type;if(S.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+pe),!w.textureFormatReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!w.textureTypeReadable(Xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ae=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Ae),I.bufferData(I.PIXEL_PACK_BUFFER,me.byteLength,I.STREAM_READ),I.readPixels(F,V,B,k,ce.convert(He),ce.convert(Xe),0);const ct=J!==null?H.get(J).__webglFramebuffer:null;v.bindFramebuffer(I.FRAMEBUFFER,ct);const Et=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await kf(I,Et,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Ae),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,me),I.deleteBuffer(Ae),I.deleteSync(Et),me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,F=null,V=0){const B=Math.pow(2,-V),k=Math.floor(S.image.width*B),me=Math.floor(S.image.height*B),Se=F!==null?F.x:0,pe=F!==null?F.y:0;W.setTexture2D(S,0),I.copyTexSubImage2D(I.TEXTURE_2D,V,0,0,Se,pe,k,me),v.unbindTexture()},this.copyTextureToTexture=function(S,F,V=null,B=null,k=0,me=0){let Se,pe,be,Te,He,Xe,Ae,ct,Et;const Mt=S.isCompressedTexture?S.mipmaps[me]:S.image;if(V!==null)Se=V.max.x-V.min.x,pe=V.max.y-V.min.y,be=V.isBox3?V.max.z-V.min.z:1,Te=V.min.x,He=V.min.y,Xe=V.isBox3?V.min.z:0;else{const Tt=Math.pow(2,-k);Se=Math.floor(Mt.width*Tt),pe=Math.floor(Mt.height*Tt),S.isDataArrayTexture?be=Mt.depth:S.isData3DTexture?be=Math.floor(Mt.depth*Tt):be=1,Te=0,He=0,Xe=0}B!==null?(Ae=B.x,ct=B.y,Et=B.z):(Ae=0,ct=0,Et=0);const dt=ce.convert(F.format),Wt=ce.convert(F.type);let _e;F.isData3DTexture?(W.setTexture3D(F,0),_e=I.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(W.setTexture2DArray(F,0),_e=I.TEXTURE_2D_ARRAY):(W.setTexture2D(F,0),_e=I.TEXTURE_2D),v.activeTexture(I.TEXTURE0),v.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,F.flipY),v.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),v.pixelStorei(I.UNPACK_ALIGNMENT,F.unpackAlignment);const ui=v.getParameter(I.UNPACK_ROW_LENGTH),Qe=v.getParameter(I.UNPACK_IMAGE_HEIGHT),_i=v.getParameter(I.UNPACK_SKIP_PIXELS),Ui=v.getParameter(I.UNPACK_SKIP_ROWS),hn=v.getParameter(I.UNPACK_SKIP_IMAGES);v.pixelStorei(I.UNPACK_ROW_LENGTH,Mt.width),v.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Mt.height),v.pixelStorei(I.UNPACK_SKIP_PIXELS,Te),v.pixelStorei(I.UNPACK_SKIP_ROWS,He),v.pixelStorei(I.UNPACK_SKIP_IMAGES,Xe);const ls=S.isDataArrayTexture||S.isData3DTexture,ft=F.isDataArrayTexture||F.isData3DTexture;if(S.isDepthTexture){const Tt=H.get(S),dn=H.get(F),gt=H.get(Tt.__renderTarget),fn=H.get(dn.__renderTarget);v.bindFramebuffer(I.READ_FRAMEBUFFER,gt.__webglFramebuffer),v.bindFramebuffer(I.DRAW_FRAMEBUFFER,fn.__webglFramebuffer);for(let cs=0;cs<be;cs++)ls&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,H.get(S).__webglTexture,k,Xe+cs),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,H.get(F).__webglTexture,me,Et+cs)),I.blitFramebuffer(Te,He,Se,pe,Ae,ct,Se,pe,I.DEPTH_BUFFER_BIT,I.NEAREST);v.bindFramebuffer(I.READ_FRAMEBUFFER,null),v.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(k!==0||S.isRenderTargetTexture||H.has(S)){const Tt=H.get(S),dn=H.get(F);v.bindFramebuffer(I.READ_FRAMEBUFFER,Z),v.bindFramebuffer(I.DRAW_FRAMEBUFFER,O);for(let gt=0;gt<be;gt++)ls?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Tt.__webglTexture,k,Xe+gt):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Tt.__webglTexture,k),ft?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,dn.__webglTexture,me,Et+gt):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,dn.__webglTexture,me),k!==0?I.blitFramebuffer(Te,He,Se,pe,Ae,ct,Se,pe,I.COLOR_BUFFER_BIT,I.NEAREST):ft?I.copyTexSubImage3D(_e,me,Ae,ct,Et+gt,Te,He,Se,pe):I.copyTexSubImage2D(_e,me,Ae,ct,Te,He,Se,pe);v.bindFramebuffer(I.READ_FRAMEBUFFER,null),v.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else ft?S.isDataTexture||S.isData3DTexture?I.texSubImage3D(_e,me,Ae,ct,Et,Se,pe,be,dt,Wt,Mt.data):F.isCompressedArrayTexture?I.compressedTexSubImage3D(_e,me,Ae,ct,Et,Se,pe,be,dt,Mt.data):I.texSubImage3D(_e,me,Ae,ct,Et,Se,pe,be,dt,Wt,Mt):S.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,me,Ae,ct,Se,pe,dt,Wt,Mt.data):S.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,me,Ae,ct,Mt.width,Mt.height,dt,Mt.data):I.texSubImage2D(I.TEXTURE_2D,me,Ae,ct,Se,pe,dt,Wt,Mt);v.pixelStorei(I.UNPACK_ROW_LENGTH,ui),v.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Qe),v.pixelStorei(I.UNPACK_SKIP_PIXELS,_i),v.pixelStorei(I.UNPACK_SKIP_ROWS,Ui),v.pixelStorei(I.UNPACK_SKIP_IMAGES,hn),me===0&&F.generateMipmaps&&I.generateMipmap(_e),v.unbindTexture()},this.initRenderTarget=function(S){H.get(S).__webglFramebuffer===void 0&&W.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?W.setTextureCube(S,0):S.isData3DTexture?W.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?W.setTexture2DArray(S,0):W.setTexture2D(S,0),v.unbindTexture()},this.resetState=function(){X=0,z=0,J=null,v.reset(),ge.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Hi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=$e._getDrawingBufferColorSpace(e),t.unpackColorSpace=$e._getUnpackColorSpace()}}const Yu={type:"change"},lc={type:"start"},yd={type:"end"},ea=new La,qu=new Mn,V_=Math.cos(70*oi.DEG2RAD),It=new A,ni=2*Math.PI,ut={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Co=1e-6;class G_ extends Xp{constructor(e,t=null){super(e,t),this.state=ut.NONE,this.target=new A,this.cursor=new A,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Cs.ROTATE,MIDDLE:Cs.DOLLY,RIGHT:Cs.PAN},this.touches={ONE:As.ROTATE,TWO:As.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new A,this._lastQuaternion=new Gi,this._lastTargetPosition=new A,this._quat=new Gi().setFromUnitVectors(e.up,new A(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new yu,this._sphericalDelta=new yu,this._scale=1,this._panOffset=new A,this._rotateStart=new Re,this._rotateEnd=new Re,this._rotateDelta=new Re,this._panStart=new Re,this._panEnd=new Re,this._panDelta=new Re,this._dollyStart=new Re,this._dollyEnd=new Re,this._dollyDelta=new Re,this._dollyDirection=new A,this._mouse=new Re,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=X_.bind(this),this._onPointerDown=W_.bind(this),this._onPointerUp=Y_.bind(this),this._onContextMenu=j_.bind(this),this._onMouseWheel=K_.bind(this),this._onKeyDown=Z_.bind(this),this._onTouchStart=J_.bind(this),this._onTouchMove=Q_.bind(this),this._onMouseDown=q_.bind(this),this._onMouseMove=$_.bind(this),this._interceptControlDown=ex.bind(this),this._interceptControlUp=tx.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Yu),this.update(),this.state=ut.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const t=this.object.position;It.copy(t).sub(this.target),It.applyQuaternion(this._quat),this._spherical.setFromVector3(It),this.autoRotate&&this.state===ut.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=ni:i>Math.PI&&(i-=ni),s<-Math.PI?s+=ni:s>Math.PI&&(s-=ni),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(It.setFromSpherical(this._spherical),It.applyQuaternion(this._quatInverse),t.copy(this.target).add(It),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=It.length();a=this._clampDistance(o*this._scale);const c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const o=new A(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new A(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=It.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(ea.origin.copy(this.object.position),ea.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ea.direction))<V_?this.object.lookAt(this.target):(qu.setFromNormalAndCoplanarPoint(this.object.up,this.target),ea.intersectPlane(qu,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Co||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Co||this._lastTargetPosition.distanceToSquared(this.target)>Co?(this.dispatchEvent(Yu),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?ni/60*this.autoRotateSpeed*e:ni/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){It.setFromMatrixColumn(t,0),It.multiplyScalar(-e),this._panOffset.add(It)}_panUp(e,t){this.screenSpacePanning===!0?It.setFromMatrixColumn(t,1):(It.setFromMatrixColumn(t,0),It.crossVectors(this.object.up,It)),It.multiplyScalar(e),this._panOffset.add(It)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;It.copy(s).sub(this.target);let r=It.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/i.clientHeight,this.object.matrix),this._panUp(2*t*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=e-i.left,r=t-i.top,a=i.width,o=i.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(ni*this._rotateDelta.x/t.clientHeight),this._rotateUp(ni*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(ni*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-ni*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(ni*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-ni*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(i,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),r=.5*(e.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(ni*this._rotateDelta.x/t.clientHeight),this._rotateUp(ni*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Re,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function W_(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function X_(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function Y_(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(yd),this.state=ut.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function q_(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Cs.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=ut.DOLLY;break;case Cs.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ut.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ut.ROTATE}break;case Cs.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ut.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ut.PAN}break;default:this.state=ut.NONE}this.state!==ut.NONE&&this.dispatchEvent(lc)}function $_(n){switch(this.state){case ut.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case ut.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case ut.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function K_(n){this.enabled===!1||this.enableZoom===!1||this.state!==ut.NONE||(n.preventDefault(),this.dispatchEvent(lc),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(yd))}function Z_(n){this.enabled!==!1&&this._handleKeyDown(n)}function J_(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case As.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=ut.TOUCH_ROTATE;break;case As.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=ut.TOUCH_PAN;break;default:this.state=ut.NONE}break;case 2:switch(this.touches.TWO){case As.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=ut.TOUCH_DOLLY_PAN;break;case As.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=ut.TOUCH_DOLLY_ROTATE;break;default:this.state=ut.NONE}break;default:this.state=ut.NONE}this.state!==ut.NONE&&this.dispatchEvent(lc)}function Q_(n){switch(this._trackPointer(n),this.state){case ut.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case ut.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case ut.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case ut.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=ut.NONE}}function j_(n){this.enabled!==!1&&n.preventDefault()}function ex(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function tx(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.20.0
 * @author George Michael Brower
 * @license MIT
 */class Vi{constructor(e,t,i,s,r="div"){this.parent=e,this.object=t,this.property=i,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(r),this.domElement.classList.add("controller"),this.domElement.classList.add(s),this.$name=document.createElement("div"),this.$name.classList.add("name"),Vi.nextNameID=Vi.nextNameID||0,this.$name.id=`lil-gui-name-${++Vi.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",a=>a.stopPropagation()),this.domElement.addEventListener("keyup",a=>a.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(i)}name(e){return this._name=e,this.$name.textContent=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const t=this.parent.add(this.object,this.property,e);return t.name(this._name),this.destroy(),t}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.getValue()!==e&&(this.object[this.property]=e,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class ix extends Vi{constructor(e,t,i){super(e,t,i,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function Ol(n){let e,t;return(e=n.match(/(#|0x)?([a-f0-9]{6})/i))?t=e[2]:(e=n.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?t=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=n.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(t=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),t?"#"+t:!1}const nx={isPrimitive:!0,match:n=>typeof n=="string",fromHexString:Ol,toHexString:Ol},_r={isPrimitive:!0,match:n=>typeof n=="number",fromHexString:n=>parseInt(n.substring(1),16),toHexString:n=>"#"+n.toString(16).padStart(6,0)},sx={isPrimitive:!1,match:n=>Array.isArray(n),fromHexString(n,e,t=1){const i=_r.fromHexString(n);e[0]=(i>>16&255)/255*t,e[1]=(i>>8&255)/255*t,e[2]=(i&255)/255*t},toHexString([n,e,t],i=1){i=255/i;const s=n*i<<16^e*i<<8^t*i<<0;return _r.toHexString(s)}},rx={isPrimitive:!1,match:n=>Object(n)===n,fromHexString(n,e,t=1){const i=_r.fromHexString(n);e.r=(i>>16&255)/255*t,e.g=(i>>8&255)/255*t,e.b=(i&255)/255*t},toHexString({r:n,g:e,b:t},i=1){i=255/i;const s=n*i<<16^e*i<<8^t*i<<0;return _r.toHexString(s)}},ax=[nx,_r,sx,rx];function ox(n){return ax.find(e=>e.match(n))}class lx extends Vi{constructor(e,t,i,s){super(e,t,i,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=ox(this.initialValue),this._rgbScale=s,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const r=Ol(this.$text.value);r&&this._setValueFromHexString(r)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const t=this._format.fromHexString(e);this.setValue(t)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class Ro extends Vi{constructor(e,t,i){super(e,t,i,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",s=>{s.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class cx extends Vi{constructor(e,t,i,s,r,a){super(e,t,i,"number"),this._initInput(),this.min(s),this.max(r);const o=a!==void 0;this.step(o?a:this._getImplicitStep(),o),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,t=!0){return this._step=e,this._stepExplicit=t,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let t=(e-this._min)/(this._max-this._min);t=Math.max(0,Math.min(t,1)),this.$fill.style.width=t*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const t=()=>{let M=parseFloat(this.$input.value);isNaN(M)||(this._stepExplicit&&(M=this._snap(M)),this.setValue(this._clamp(M)))},i=M=>{const b=parseFloat(this.$input.value);isNaN(b)||(this._snapClampSetValue(b+M),this.$input.value=this.getValue())},s=M=>{M.key==="Enter"&&this.$input.blur(),M.code==="ArrowUp"&&(M.preventDefault(),i(this._step*this._arrowKeyMultiplier(M))),M.code==="ArrowDown"&&(M.preventDefault(),i(this._step*this._arrowKeyMultiplier(M)*-1))},r=M=>{this._inputFocused&&(M.preventDefault(),i(this._step*this._normalizeMouseWheel(M)))};let a=!1,o,c,l,h,d;const u=5,p=M=>{o=M.clientX,c=l=M.clientY,a=!0,h=this.getValue(),d=0,window.addEventListener("mousemove",g),window.addEventListener("mouseup",x)},g=M=>{if(a){const b=M.clientX-o,y=M.clientY-c;Math.abs(y)>u?(M.preventDefault(),this.$input.blur(),a=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(b)>u&&x()}if(!a){const b=M.clientY-l;d-=b*this._step*this._arrowKeyMultiplier(M),h+d>this._max?d=this._max-h:h+d<this._min&&(d=this._min-h),this._snapClampSetValue(h+d)}l=M.clientY},x=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",g),window.removeEventListener("mouseup",x)},m=()=>{this._inputFocused=!0},f=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",t),this.$input.addEventListener("keydown",s),this.$input.addEventListener("wheel",r,{passive:!1}),this.$input.addEventListener("mousedown",p),this.$input.addEventListener("focus",m),this.$input.addEventListener("blur",f)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const e=(f,M,b,y,E)=>(f-M)/(b-M)*(E-y)+y,t=f=>{const M=this.$slider.getBoundingClientRect();let b=e(f,M.left,M.right,this._min,this._max);this._snapClampSetValue(b)},i=f=>{this._setDraggingStyle(!0),t(f.clientX),window.addEventListener("mousemove",s),window.addEventListener("mouseup",r)},s=f=>{t(f.clientX)},r=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",s),window.removeEventListener("mouseup",r)};let a=!1,o,c;const l=f=>{f.preventDefault(),this._setDraggingStyle(!0),t(f.touches[0].clientX),a=!1},h=f=>{f.touches.length>1||(this._hasScrollBar?(o=f.touches[0].clientX,c=f.touches[0].clientY,a=!0):l(f),window.addEventListener("touchmove",d,{passive:!1}),window.addEventListener("touchend",u))},d=f=>{if(a){const M=f.touches[0].clientX-o,b=f.touches[0].clientY-c;Math.abs(M)>Math.abs(b)?l(f):(window.removeEventListener("touchmove",d),window.removeEventListener("touchend",u))}else f.preventDefault(),t(f.touches[0].clientX)},u=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",d),window.removeEventListener("touchend",u)},p=this._callOnFinishChange.bind(this),g=400;let x;const m=f=>{if(Math.abs(f.deltaX)<Math.abs(f.deltaY)&&this._hasScrollBar)return;f.preventDefault();const b=this._normalizeMouseWheel(f)*this._step;this._snapClampSetValue(this.getValue()+b),this.$input.value=this.getValue(),clearTimeout(x),x=setTimeout(p,g)};this.$slider.addEventListener("mousedown",i),this.$slider.addEventListener("touchstart",h,{passive:!1}),this.$slider.addEventListener("wheel",m,{passive:!1})}_setDraggingStyle(e,t="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle(`lil-gui-${t}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:t,deltaY:i}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(t=0,i=-e.wheelDelta/120,i*=this._stepExplicit?1:10),t+-i}_arrowKeyMultiplier(e){let t=this._stepExplicit?1:10;return e.shiftKey?t*=10:e.altKey&&(t/=10),t}_snap(e){let t=0;return this._hasMin?t=this._min:this._hasMax&&(t=this._max),e-=t,e=Math.round(e/this._step)*this._step,e+=t,e=parseFloat(e.toPrecision(15)),e}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class ux extends Vi{constructor(e,t,i,s){super(e,t,i,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(s)}options(e){return this._values=Array.isArray(e)?e:Object.values(e),this._names=Array.isArray(e)?e:Object.keys(e),this.$select.replaceChildren(),this._names.forEach(t=>{const i=document.createElement("option");i.textContent=t,this.$select.appendChild(i)}),this.updateDisplay(),this}updateDisplay(){const e=this.getValue(),t=this._values.indexOf(e);return this.$select.selectedIndex=t,this.$display.textContent=t===-1?e:this._names[t],this}}class hx extends Vi{constructor(e,t,i){super(e,t,i,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",s=>{s.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var dx=`.lil-gui {
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
}`;function fx(n){const e=document.createElement("style");e.innerHTML=n;const t=document.querySelector("head link[rel=stylesheet], head style");t?document.head.insertBefore(e,t):document.head.appendChild(e)}let $u=!1;class cc{constructor({parent:e,autoPlace:t=e===void 0,container:i,width:s,title:r="Controls",closeFolders:a=!1,injectStyles:o=!0,touchStyles:c=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(r),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),c&&this.domElement.classList.add("allow-touch-styles"),!$u&&o&&(fx(dx),$u=!0),i?i.appendChild(this.domElement):t&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),s&&this.domElement.style.setProperty("--width",s+"px"),this._closeFolders=a}add(e,t,i,s,r){if(Object(i)===i)return new ux(this,e,t,i);const a=e[t];switch(typeof a){case"number":return new cx(this,e,t,i,s,r);case"boolean":return new ix(this,e,t);case"string":return new hx(this,e,t);case"function":return new Ro(this,e,t)}console.error(`gui.add failed
	property:`,t,`
	object:`,e,`
	value:`,a)}addColor(e,t,i=1){return new lx(this,e,t,i)}addFolder(e){const t=new cc({parent:this,title:e});return this.root._closeFolders&&t.close(),t}load(e,t=!0){return e.controllers&&this.controllers.forEach(i=>{i instanceof Ro||i._name in e.controllers&&i.load(e.controllers[i._name])}),t&&e.folders&&this.folders.forEach(i=>{i._title in e.folders&&i.load(e.folders[i._title])}),this}save(e=!0){const t={controllers:{},folders:{}};return this.controllers.forEach(i=>{if(!(i instanceof Ro)){if(i._name in t.controllers)throw new Error(`Cannot save GUI with duplicate property "${i._name}"`);t.controllers[i._name]=i.save()}}),e&&this.folders.forEach(i=>{if(i._title in t.folders)throw new Error(`Cannot save GUI with duplicate folder "${i._title}"`);t.folders[i._title]=i.save()}),t}open(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(e){this._closed!==e&&(this._closed=e,this._callOnOpenClose(this))}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const t=this.$children.clientHeight;this.$children.style.height=t+"px",this.domElement.classList.add("transition");const i=r=>{r.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",i))};this.$children.addEventListener("transitionend",i);const s=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=s+"px"})}),this}title(e){return this._title=e,this.$title.textContent=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(i=>i.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onOpenClose(e){return this._onOpenClose=e,this}_callOnOpenClose(e){this.parent&&this.parent._callOnOpenClose(e),this._onOpenClose!==void 0&&this._onOpenClose.call(this,e)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(t=>{e=e.concat(t.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(t=>{e=e.concat(t.foldersRecursive())}),e}}const un=`
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
`,uc=`
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
`,px=`
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
`,mx=`
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
`,gx=`
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
`,hc=`
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
`,vx=`
  const vec3 ABSORB = vec3(0.45, 0.09, 0.04);   // red dies fast; blue travels but deep still darkens
  const vec3 SCATTER = vec3(0.11, 0.28, 0.36);  // in-scattered teal
`,_x=`
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
`;class xx{constructor(e){this.uniforms={uSunDir:{value:e.clone()},uTime:{value:0},uCloudCover:{value:1},uNightAmount:{value:0},uMoonDir:{value:new A(0,1,0)},uMoonColor:{value:new ae(14673648)},uMoonIntensity:{value:1},uStarVisibility:{value:0}};const t=new ot({side:ti,depthTest:!1,depthWrite:!1,toneMapped:!1,uniforms:this.uniforms,vertexShader:`
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
        ${un}
        ${uc}
        void main(){
          vec3 dir = normalize(vWorldDir);
          gl_FragColor = vec4(atmosphere(dir, normalize(uSunDir)), 1.0);
        }
      `}),i=new oc(6e3,32,16);this.mesh=new Kt(i,t),this.mesh.frustumCulled=!1,this.mesh.renderOrder=-1e3}update(e,t){this.mesh.position.copy(e.position),this.uniforms.uTime.value=t}setSun(e){this.uniforms.uSunDir.value.copy(e)}setMoon(e){this.uniforms.uMoonDir.value.copy(e)}}const Zs=16,Po=n=>n-Math.floor(n),Wi={windDir:new Re(1,.55).normalize(),waveCount:26,baseWavelength:150,amplitude:.72,choppy:.5,dirSpread:.95,freqMul:1.19,ampMul:.82,speed:1,surfaceY:0,refractStrength:.05,detailScale:.3,detailStrength:.14,clarity:1,depthFalloff:.16,sssStrength:.35,ssrStrength:.85,sunGlitter:0,roughness:.08,contactFoam:1,foamThreshold:.2,foamSoftness:.4,crestFoamStart:1.4,shoreFoamWidth:3.4,foamCoverage:1,foamEdge:.2,foamOpacity:.95,deepColor:new ae(.0016,.032,.065),shallowColor:new ae(.13,.56,.55),foamColor:new ae(.95,.98,1),sssColor:new ae(.1,.52,.46)};class Sx{constructor(e,t){const i=Wi;this.uniforms={uTime:{value:0},uSunDir:{value:e.clone()},uWindDir:{value:i.windDir.clone()},uWaveCount:{value:i.waveCount},uBaseFreq:{value:2*Math.PI/i.baseWavelength},uAmplitude:{value:i.amplitude},uChoppy:{value:i.choppy},uDirSpread:{value:i.dirSpread},uFreqMul:{value:i.freqMul},uAmpMul:{value:i.ampMul},uSpeed:{value:i.speed},uSurfaceY:{value:i.surfaceY},uResolution:{value:t.clone()},uRefractionTex:{value:null},uDepthTex:{value:null},uNear:{value:.1},uFar:{value:8e3},uCameraUnderwater:{value:0},uRefractStrength:{value:i.refractStrength},uDetailScale:{value:i.detailScale},uDetailStrength:{value:i.detailStrength},uClarity:{value:i.clarity},uDepthFalloff:{value:i.depthFalloff},uSSSStrength:{value:i.sssStrength},uSSRStrength:{value:i.ssrStrength},uSunGlitter:{value:i.sunGlitter},uRoughness:{value:i.roughness},uCloudCover:{value:1},uProjMatrix:{value:new Ze},uSunsetAmount:{value:0},uSunsetTint:{value:new ae(16731423)},uSunsetOceanWarmth:{value:.5},uSunsetSunFocus:{value:.5},uSunsetHorizonWarmth:{value:.9},uSunsetGlitterBoost:{value:.5},uNightAmount:{value:0},uMoonDir:{value:new A(0,1,0)},uMoonColor:{value:new ae(14673648)},uMoonIntensity:{value:1},uMoonPathFocus:{value:.5},uStarVisibility:{value:0},uTravelerHeadPos:{value:new A(0,0,0)},uTravelerGlowIntensity:{value:0},uTravelerGlowColor:{value:new ae(16777215)},uContactFoam:{value:i.contactFoam},uBodyCount:{value:0},uBodies:{value:Array.from({length:Zs},()=>new xt)},uBodyVel:{value:Array.from({length:Zs},()=>new Re)},uCloudShadow:{value:0},uCloudPlaneY:{value:450},uCloudScale:{value:.002},uCloudCoverage:{value:.35},uCloudDrift:{value:new A},uFoamThreshold:{value:i.foamThreshold},uFoamSoftness:{value:i.foamSoftness},uCrestFoamStart:{value:i.crestFoamStart},uShoreFoamWidth:{value:i.shoreFoamWidth},uFoamCoverage:{value:i.foamCoverage},uFoamEdge:{value:i.foamEdge},uFoamOpacity:{value:i.foamOpacity},uDeepColor:{value:i.deepColor.clone()},uShallowColor:{value:i.shallowColor.clone()},uFoamColor:{value:i.foamColor.clone()},uSSSColor:{value:i.sssColor.clone()}};const s=new ot({side:Ri,toneMapped:!1,uniforms:this.uniforms,vertexShader:`
        precision highp float;
        ${un}
        ${px}
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
        uniform vec4  uBodies[${Zs}];   // x, z, radius, foam strength
        uniform vec2  uBodyVel[${Zs}];  // horizontal velocity → wake direction
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

        ${un}
        ${uc}
        ${gx}
        ${vx}
        ${_x}

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
            for (int i = 0; i < ${Zs}; i++){
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
      `});this.size=6e3,this.segments=600;const r=new cn(this.size,this.size,this.segments,this.segments);r.rotateX(-Math.PI/2),this.mesh=new Kt(r,s),this.mesh.frustumCulled=!1,this._cell=this.size/this.segments}update(e,t){this.uniforms.uTime.value=e;const i=this._cell;this.mesh.position.x=Math.round(t.position.x/i)*i,this.mesh.position.z=Math.round(t.position.z/i)*i}setSun(e){this.uniforms.uSunDir.value.copy(e)}setMoon(e){this.uniforms.uMoonDir.value.copy(e)}setResolution(e,t){this.uniforms.uResolution.value.set(e,t)}_hash21(e,t){let i=Po(e*123.34),s=Po(t*456.21);const r=i*(i+45.32)+s*(s+45.32);return i+=r,s+=r,Po(i*s)}_gerstner(e,t,i,s){const r=this.uniforms,a=Math.atan2(r.uWindDir.value.y,r.uWindDir.value.x),o=r.uWaveCount.value|0,c=r.uChoppy.value,l=r.uSpeed.value,h=r.uDirSpread.value;let d=r.uBaseFreq.value,u=r.uAmplitude.value,p=0,g=0,x=0,m=0,f=1,M=0;for(let y=0;y<o;y++){const E=this._hash21(y,1.7),T=this._hash21(y,9.1),R=a+(E*2-1)*h,_=Math.cos(R),C=Math.sin(R),D=d,P=u,N=Math.sqrt(9.81*D)*l,G=c/Math.max(D*P*o,.001),Z=D*(_*e+C*t)+i*N+T*6.2831853,O=Math.sin(Z),X=Math.cos(Z),z=D*P;p+=G*P*_*X,x+=G*P*C*X,g+=P*O,m-=_*z*X,M-=C*z*X,f-=G*z*O,d*=r.uFreqMul.value,u*=r.uAmpMul.value}const b=1/Math.hypot(m,f,M);return s.dx=p,s.dz=x,s.h=r.uSurfaceY.value+g,s.nx=m*b,s.ny=f*b,s.nz=M*b,s}surfaceSample(e,t,i,s={}){let r=e,a=t;for(let o=0;o<4;o++)this._gerstner(r,a,i,s),r=e-s.dx,a=t-s.dz;return this._gerstner(r,a,i,s)}heightAt(e,t,i){const s=this.uniforms,r=Math.atan2(s.uWindDir.value.y,s.uWindDir.value.x);let a=s.uBaseFreq.value,o=s.uAmplitude.value;const c=s.uWaveCount.value|0;let l=0;for(let h=0;h<c;h++){const d=this._hash21(h,1.7),u=this._hash21(h,9.1),p=r+(d*2-1)*s.uDirSpread.value,g=Math.cos(p),x=Math.sin(p),m=Math.sqrt(9.81*a)*s.uSpeed.value,f=a*(g*e+x*t)+i*m+u*6.2831853;l+=o*Math.sin(f),a*=s.uFreqMul.value,o*=s.uAmpMul.value}return s.uSurfaceY.value+l}}class yx{constructor(e,t=34){this.depth=t,this.uniforms={uTime:{value:0},uSunDir:{value:e.clone()},uDepth:{value:t},uDuneHeight:{value:4},uDuneScale:{value:.02},uSandColor:{value:new ae(.66,.58,.44)},uSandColor2:{value:new ae(.46,.41,.31)},uCausticColor:{value:new ae(1,.98,.85)},uNightAmount:{value:0},uMoonDir:{value:new A(0,1,0)},uMoonColor:{value:new ae(14673648)},uMoonIntensity:{value:1}};const i=new ot({toneMapped:!1,uniforms:this.uniforms,vertexShader:`
        precision highp float;
        ${un}
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
        ${un}
        ${hc}
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
      `});this.size=6e3;const s=new cn(this.size,this.size,256,256);s.rotateX(-Math.PI/2),this.mesh=new Kt(s,i),this.mesh.position.y=-t,this.mesh.frustumCulled=!1}update(e,t){this.uniforms.uTime.value=e;const i=this.size/256;this.mesh.position.x=Math.round(t.position.x/i)*i,this.mesh.position.z=Math.round(t.position.z/i)*i}setSun(e){this.uniforms.uSunDir.value.copy(e)}setMoon(e){this.uniforms.uMoonDir.value.copy(e)}}class Mx{constructor(e,t=22,i){this.uniforms={uTime:{value:0},uSunDir:{value:e.clone()},uCenter:{value:new Re(0,-110)},uRinner:{value:70},uRouter:{value:175},uSeabedY:{value:-t},uPeakY:{value:7},uSandDry:{value:new ae(.64,.55,.39)},uSandWet:{value:new ae(.24,.19,.13)},uCausticColor:{value:new ae(1,.98,.85)},uNightAmount:{value:0},uMoonDir:{value:new A(0,1,0)},uMoonColor:{value:new ae(14673648)},uMoonIntensity:{value:1},uWindDir:i.uWindDir,uWaveCount:i.uWaveCount,uBaseFreq:i.uBaseFreq,uAmplitude:i.uAmplitude,uDirSpread:i.uDirSpread,uFreqMul:i.uFreqMul,uAmpMul:i.uAmpMul,uSpeed:i.uSpeed,uSurfaceY:i.uSurfaceY};const s=`
      ${un}
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
    `,r=new ot({toneMapped:!1,uniforms:this.uniforms,vertexShader:`
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
        ${un}
        ${mx}
        ${hc}
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
      `}),a=new cn(520,520,320,320);a.rotateX(-Math.PI/2),this.mesh=new Kt(a,r),this.mesh.position.set(0,0,-110),this.mesh.frustumCulled=!1}update(e){this.uniforms.uTime.value=e}setSun(e){this.uniforms.uSunDir.value.copy(e)}setMoon(e){this.uniforms.uMoonDir.value.copy(e)}heightAt(e,t){const i=this.uniforms,s=i.uCenter.value.x,r=i.uCenter.value.y,a=Math.hypot(e-s,t-r),o=wx(i.uRouter.value,i.uRinner.value,a);let c=i.uSeabedY.value+(i.uPeakY.value-i.uSeabedY.value)*o;const l=Ku(e*.02,t*.02,5)*4+Ku(e*.11,t*.11,4)*1.1;return c+=l*(.35+.65*o),c}}const Do=n=>n-Math.floor(n);function ta(n,e){let t=Do(n*123.34),i=Do(e*456.21);const s=t*(t+45.32)+i*(i+45.32);return t+=s,i+=s,Do(t*i)}function bx(n,e){const t=Math.floor(n),i=Math.floor(e),s=n-t,r=e-i,a=s*s*s*(s*(s*6-15)+10),o=r*r*r*(r*(r*6-15)+10),c=ta(t,i),l=ta(t+1,i),h=ta(t,i+1),d=ta(t+1,i+1),u=l-c,p=h-c,g=c-l-h+d;return c+u*a+p*o+g*a*o}function Ku(n,e,t){let i=.5,s=0;for(let r=0;r<t;r++){s+=i*bx(n,e);const a=1.6*n-1.2*e,o=1.2*n+1.6*e;n=a,e=o,i*=.5}return s}function wx(n,e,t){const i=Math.min(Math.max((t-n)/(e-n),0),1);return i*i*(3-2*i)}const Lo=384,Io=24;function Ex(n){let e=n>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function Fo(n,e=512){const t=new Float32Array(e);for(let s=0;s<e;s++)t[s]=n();const i=s=>{const r=Math.floor(s),a=s-r,o=a*a*(3-2*a),c=t[(r%e+e)%e],l=t[((r+1)%e+e)%e];return c+(l-c)*o};return(s,r=5)=>{let a=0,o=.5,c=0;for(let l=0;l<r;l++)a+=o*i(s),c+=o,s*=2.03,o*=.5;return a/c}}class Tx{constructor(e,t={}){this.enabled=!0,this.params={distance:t.distance??2600,depth:t.depth??700,height:t.height??230,azimuthDeg:t.azimuthDeg??35,arcDeg:t.arcDeg??110,seed:t.seed??7},this.uniforms={uSunDir:e.uSunDir,uTime:e.uTime,uCloudCover:e.uCloudCover,uNightAmount:e.uNightAmount,uMoonDir:e.uMoonDir,uMoonColor:e.uMoonColor,uMoonIntensity:e.uMoonIntensity,uStarVisibility:e.uStarVisibility,uHaze:{value:t.haze??34e-5},uRockColor:{value:new ae(.2,.23,.21)},uGreenColor:{value:new ae(.13,.2,.12)}};const i=new ot({toneMapped:!1,uniforms:this.uniforms,vertexShader:`
        attribute float aRidge;
        varying vec3 vWorldPos;
        varying vec3 vNormal;
        varying float vRidge;
        void main(){
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vWorldPos = wp.xyz;
          vNormal = normalize(mat3(modelMatrix) * normal);
          vRidge = aRidge;
          gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,fragmentShader:`
        precision highp float;
        uniform vec3  uSunDir;
        uniform float uTime;
        uniform float uCloudCover;
        uniform float uNightAmount;
        uniform vec3  uMoonDir;
        uniform vec3  uMoonColor;
        uniform float uMoonIntensity;
        uniform float uStarVisibility;
        uniform float uHaze;
        uniform vec3  uRockColor;
        uniform vec3  uGreenColor;
        varying vec3 vWorldPos;
        varying vec3 vNormal;
        varying float vRidge;
        ${un}
        ${uc}
        void main(){
          vec3 sunDir = normalize(uSunDir);
          vec3 N = normalize(vNormal);
          vec3 toFrag = vWorldPos - cameraPosition;
          float dist = length(toFrag);

          // Greener lowlands, barer rock toward the ridgeline and on steep faces.
          float rocky = clamp(vRidge * 1.2 + (1.0 - N.y) * 0.8, 0.0, 1.0);
          vec3 albedo = mix(uGreenColor, uRockColor, rocky);

          float ndl = clamp(dot(N, sunDir), 0.0, 1.0);
          vec3 color = albedo * (0.45 * vec3(0.35, 0.5, 0.7) + 1.0 * ndl);
          float moonNdl = clamp(dot(N, uMoonDir), 0.0, 1.0);
          vec3 nightColor = albedo * (0.5 * vec3(0.07, 0.10, 0.21) + uMoonColor * moonNdl * uMoonIntensity * 0.25);
          color = mix(color, nightColor, uNightAmount);

          // Same haze colour as Ocean.js's distance fog (capped the same way
          // so the bright sun disk can't leak in), slightly thinner with
          // altitude so peaks read through a touch more than the shoreline.
          vec3 horizonDir = normalize(vec3(toFrag.x, 0.02 * dist, toFrag.z));
          vec3 fogCol = min(atmosphere(horizonDir, sunDir), vec3(1.6));
          float heightThin = mix(1.0, 0.8, clamp(vWorldPos.y / 300.0, 0.0, 1.0));
          float fogAmt = 1.0 - exp(-dist * uHaze * heightThin);
          color = mix(color, fogCol, clamp(fogAmt, 0.0, 1.0));

          gl_FragColor = vec4(color, 1.0);
        }
      `});this.mesh=new Kt(this._buildGeometry(),i),this.mesh.frustumCulled=!1}_buildGeometry(){const{distance:e,depth:t,height:i,azimuthDeg:s,arcDeg:r,seed:a}=this.params,o=Ex(a),c=Fo(o),l=Fo(o),h=Fo(o),d=oi.degToRad(s),u=oi.degToRad(r),p=Lo+1,g=Io+1,x=new Float32Array(p*g*3),m=new Float32Array(p*g);for(let b=0;b<p;b++){const y=b/Lo,E=d+(y-.5)*u,T=Math.pow(Math.sin(Math.PI*y),.6),R=Math.pow(c(y*9,5),1.6)*1.9,_=i*T*Math.min(R,1),C=(h(y*14,4)-.5)*260;for(let D=0;D<g;D++){const P=D/Io,N=e+C*(1-P)+t*P,G=Math.pow(Math.sin(Math.min(P/.6,1)*Math.PI/2),1.4)*(P>.6?1-(P-.6)*.5:1),Z=(l(y*60+P*7,4)-.5)*.35,O=-6+Math.max(0,_*G*(1+Z)),X=b*g+D;x[X*3+0]=Math.sin(E)*N,x[X*3+1]=O,x[X*3+2]=-Math.cos(E)*N,m[X]=i>0?O/i:0}}const f=[];for(let b=0;b<Lo;b++)for(let y=0;y<Io;y++){const E=b*g+y,T=(b+1)*g+y;f.push(E,T,E+1,T,T+1,E+1)}const M=new At;return M.setAttribute("position",new We(x,3)),M.setAttribute("aRidge",new We(m,1)),M.setIndex(f),M.computeVertexNormals(),M}setParams(e){Object.assign(this.params,e);const t=this.mesh.geometry;this.mesh.geometry=this._buildGeometry(),t.dispose()}update(e,t){this.mesh.position.set(e.position.x,0,e.position.z),this.mesh.visible=this.enabled&&!t&&this.params.arcDeg>=1}}class Ax{constructor(e=5e3,t=160){this.box=t;const i=new Float32Array(e*3),s=new Float32Array(e);for(let o=0;o<e;o++)i[o*3+0]=(Math.random()-.5)*t,i[o*3+1]=(Math.random()-.5)*t,i[o*3+2]=(Math.random()-.5)*t,s[o]=Math.random()*6.2831853;const r=new At;r.setAttribute("position",new We(i,3)),r.setAttribute("seed",new We(s,1)),this.uniforms={uTime:{value:0},uCam:{value:new A},uBox:{value:t},uSize:{value:26},uColor:{value:new ae(.85,.94,.98)}};const a=new ot({transparent:!0,depthWrite:!1,toneMapped:!1,blending:rn,uniforms:this.uniforms,vertexShader:`
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
      `});this.points=new Is(r,a),this.points.frustumCulled=!1}update(e,t){this.uniforms.uTime.value=e,this.uniforms.uCam.value.copy(t.position)}}class Cx{constructor(e,t={}){const{count:i=1200,boxWidth:s=70,boxDepth:r=70,boxHeight:a=50,fallSpeed:o=18,windX:c=2.4,windZ:l=.9,streakLength:h=1.3}=t;this.enabled=!1;const d=new Float32Array(i*2*3),u=new Float32Array(i*2);for(let x=0;x<i;x++){const m=(Math.random()-.5)*s,f=(Math.random()-.5)*a,M=(Math.random()-.5)*r;for(let b=0;b<2;b++){const y=(x*2+b)*3;d[y+0]=m,d[y+1]=f,d[y+2]=M,u[x*2+b]=b}}const p=new At;p.setAttribute("position",new We(d,3)),p.setAttribute("aEnd",new We(u,1)),this.uniforms={uTime:{value:0},uCam:{value:new A},uBox:{value:new A(s,a,r)},uFallSpeed:{value:o},uWind:{value:new Re(c,l)},uStreakLength:{value:h},uColor:{value:new ae(.52,.58,.66)},uAlpha:{value:.24}};const g=new ot({transparent:!0,depthWrite:!1,depthTest:!0,toneMapped:!1,blending:rn,uniforms:this.uniforms,vertexShader:`
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
      `});this.mesh=new Cp(p,g),this.mesh.frustumCulled=!1,this.mesh.visible=!1,e.add(this.mesh)}setEnabled(e){this.enabled=!!e}toggle(){this.enabled=!this.enabled}update(e,t){this.uniforms.uTime.value=e,this.uniforms.uCam.value.copy(t.position)}}const Rx=new Ia(-1,1,1,-1,0,1);class Px extends At{constructor(){super(),this.setAttribute("position",new $t([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new $t([0,2,0,0,2,0],2))}}const Dx=new Px;class Bl{constructor(e){this._mesh=new Kt(Dx,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Rx)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}const Js=(n,e,t=!1)=>{const i={type:bi,minFilter:bt,magFilter:bt,depthBuffer:t},s=new mi(n,e,i);return t&&(s.depthTexture=new In(n,e),s.depthTexture.type=Mi),s};class Lx{constructor(e,t,i,s,r){this.renderer=e,this.quad=new Bl,this.bloomStreak=.3,this.sceneRT=Js(t,i);const a=Math.max(1,t>>1),o=Math.max(1,i>>1);this.brightRT=Js(a,o),this.blurA=Js(a,o),this.blurB=Js(a,o),this.underwaterMat=new ot({uniforms:{tDiffuse:{value:null},tDepth:{value:null},uInvProjView:{value:new Ze},uCameraPos:{value:new A},uSunDir:{value:s.clone()},uTime:{value:0},uUnderwater:{value:0},uSurfaceY:{value:0},uDeepColor:{value:r.clone()},uShaftColor:{value:new ae(1,.98,.9)},uExtinction:{value:new A(.05,.031,.022)},uFogStrength:{value:1},uShaftDensity:{value:.05},uMaxDist:{value:140},uRainbowStrength:{value:0}},vertexShader:`
        varying vec2 vUv;
        void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
      `,fragmentShader:`
        precision highp float;
        ${un}
        ${hc}
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
      `}),this.brightMat=new ot({uniforms:{tDiffuse:{value:null},uThreshold:{value:1.15},uKnee:{value:.9}},vertexShader:`
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
      `}),this.blurMat=new ot({uniforms:{tDiffuse:{value:null},uDir:{value:new Re(1,0)},uTexel:{value:new Re(1/a,1/o)}},vertexShader:`
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
      `}),this.compositeMat=new ot({uniforms:{tScene:{value:null},tBloom:{value:null},uBloom:{value:.65},uExposure:{value:1.05},uUnderwater:{value:0},uVignette:{value:.35},uVignetteAir:{value:.16},uSaturation:{value:1.06},uContrast:{value:1.02},uGrain:{value:.05},uCA:{value:.5},uTime:{value:0}},vertexShader:`
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
      `}),this.sceneRT2=Js(t,i),this.cloudCompositeMat=new ot({uniforms:{tScene:{value:null},tClouds:{value:null}},vertexShader:`
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
      `})}setSize(e,t){const i=Math.max(1,e>>1),s=Math.max(1,t>>1);this.sceneRT.setSize(e,t),this.sceneRT2.setSize(e,t),this.brightRT.setSize(i,s),this.blurA.setSize(i,s),this.blurB.setSize(i,s),this.blurMat.uniforms.uTexel.value.set(1/i,1/s)}_draw(e,t){this.quad.material=e,this.renderer.setRenderTarget(t),this.quad.render(this.renderer)}render(e,t){const i=this.underwaterMat.uniforms;i.tDiffuse.value=e.texture,i.tDepth.value=e.depthTexture,i.uInvProjView.value.copy(t.invProjView),i.uCameraPos.value.copy(t.cameraPos),i.uSunDir.value.copy(t.sunDir),i.uTime.value=t.time,i.uUnderwater.value=t.underwater?1:0,i.uSurfaceY.value=t.surfaceY,i.uRainbowStrength.value=t.rainbowStrength||0,this._draw(this.underwaterMat,this.sceneRT);let s=this.sceneRT;t.cloudTexture&&(this.cloudCompositeMat.uniforms.tScene.value=this.sceneRT.texture,this.cloudCompositeMat.uniforms.tClouds.value=t.cloudTexture,this._draw(this.cloudCompositeMat,this.sceneRT2),s=this.sceneRT2),t.headOverlay&&(this.renderer.setRenderTarget(s),this.renderer.autoClear=!1,this.renderer.render(t.headOverlay.scene,t.headOverlay.camera),this.renderer.autoClear=!0),this.brightMat.uniforms.tDiffuse.value=s.texture,this._draw(this.brightMat,this.brightRT);let r=this.brightRT;for(let a=0;a<2;a++)this.blurMat.uniforms.tDiffuse.value=r.texture,this.blurMat.uniforms.uDir.value.set(a===1?1+this.bloomStreak*3:1,0),this._draw(this.blurMat,this.blurA),this.blurMat.uniforms.tDiffuse.value=this.blurA.texture,this.blurMat.uniforms.uDir.value.set(0,1),this._draw(this.blurMat,this.blurB),r=this.blurB;this.compositeMat.uniforms.tScene.value=s.texture,this.compositeMat.uniforms.tBloom.value=this.blurB.texture,this.compositeMat.uniforms.uUnderwater.value=t.underwater?1:0,this.compositeMat.uniforms.uTime.value=t.time,this._draw(this.compositeMat,null)}}class Ix{constructor(e,t,i,{scale:s=.5}={}){this.renderer=e,this.scale=s,this.enabled=!1,this._w=t,this._h=i,this._frame=0,this._histValid=!1,this._prevViewProj=new Ze;const r=()=>new mi(this._rw(),this._rh(),{type:bi,minFilter:bt,magFilter:bt,depthBuffer:!1});this.rtCur=r(),this.rtHistA=r(),this.rtHistB=r(),this._out=this.rtHistA,this.material=new ot({uniforms:{tDepth:{value:null},uInvProj:{value:new Ze},uInvView:{value:new Ze},uCameraPos:{value:new A},uTime:{value:0},uFrame:{value:0},uHalfXZ:{value:5e3},uBase:{value:380},uHeight:{value:150},uHeightFalloff:{value:.38},uDensity:{value:.8},uCoverage:{value:.42},uCoverageEdge:{value:.16},uNoiseScale:{value:.002},uDetail:{value:.3},uDetailScale:{value:4},uEdgeFade:{value:1600},uWindDir:{value:new Re(1,.35).normalize()},uWindSpeed:{value:.03},uDrift:{value:new A},uSteps:{value:44},uMaxSpan:{value:4200},uLightStepSize:{value:30},uAniso:{value:.55},uAmbient:{value:.85},uSunStrength:{value:3},uFogColor:{value:new ae(.42,.5,.62)},uSunColor:{value:new ae(1,.95,.86)},uHazeColor:{value:new ae(.6,.74,.9)},uSunDir:{value:new A(0,1,0)},uMoonDir:{value:new A(0,1,0)},uMoonColor:{value:new ae(14673648)},uMoonWeight:{value:0}},vertexShader:`
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
      `}),this.quad=new Bl(this.material),this.resolveMat=new ot({uniforms:{tCurrent:{value:null},tHistory:{value:null},uInvProj:{value:new Ze},uInvView:{value:new Ze},uPrevViewProj:{value:new Ze},uCameraPos:{value:new A},uTexel:{value:new Re},uMidY:{value:455},uBlend:{value:.88}},vertexShader:`
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
      `}),this.resolveQuad=new Bl(this.resolveMat)}_rw(){return Math.max(1,Math.floor(this._w*this.scale))}_rh(){return Math.max(1,Math.floor(this._h*this.scale))}get texture(){return this._out.texture}get uniforms(){return this.material.uniforms}setSize(e,t){this._w=e,this._h=t,this.rtCur.setSize(this._rw(),this._rh()),this.rtHistA.setSize(this._rw(),this._rh()),this.rtHistB.setSize(this._rw(),this._rh()),this._histValid=!1}setSun(e){const t=Math.max(e.y,0),i=this.material.uniforms;i.uSunDir.value.copy(e),i.uSunColor.value.setRGB(1,.55+.4*t,.32+.6*t),i.uFogColor.value.setRGB(.3+.18*t,.4+.16*t,.55+.12*t);const s=Math.min(t*2.2,1);i.uHazeColor.value.setRGB(1+(.6-1)*s,.62+(.74-.62)*s,.42+(.9-.42)*s);const r=this._nightAmount||0;r>1e-4&&(i.uSunColor.value.lerp(new ae(.05,.06,.1),r),i.uFogColor.value.lerp(new ae(.03,.035,.06),r),i.uHazeColor.value.lerp(new ae(.02,.025,.045),r))}setNightAmount(e){this._nightAmount=e}setMoon(e){this.material.uniforms.uMoonDir.value.copy(e)}render(e,t,i){const s=this.material.uniforms;s.uTime.value+=e,s.uFrame.value=this._frame,s.tDepth.value=i,s.uInvProj.value.copy(t.projectionMatrixInverse),s.uInvView.value.copy(t.matrixWorld),s.uCameraPos.value.copy(t.position);const r=s.uTime.value*s.uWindSpeed.value;s.uDrift.value.set(s.uWindDir.value.x*r,.06*r,s.uWindDir.value.y*r);const a=this.renderer.getRenderTarget();this.renderer.setRenderTarget(this.rtCur),this.quad.render(this.renderer);const o=this.resolveMat.uniforms;o.tCurrent.value=this.rtCur.texture,o.tHistory.value=this.rtHistA.texture,o.uInvProj.value.copy(t.projectionMatrixInverse),o.uInvView.value.copy(t.matrixWorld),o.uPrevViewProj.value.copy(this._prevViewProj),o.uCameraPos.value.copy(t.position),o.uTexel.value.set(1/this._rw(),1/this._rh()),o.uMidY.value=s.uBase.value+s.uHeight.value*.5,o.uBlend.value=this._histValid?.88:0,this.renderer.setRenderTarget(this.rtHistB),this.resolveQuad.render(this.renderer);const c=this.rtHistA;this.rtHistA=this.rtHistB,this.rtHistB=c,this._out=this.rtHistA,this._histValid=!0,this._prevViewProj.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frame++,this.renderer.setRenderTarget(a)}}function Fx(n){let e=n>>>0;return function(){e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function Zu(n,e){return Fx((n^Math.imul(e+1,2654435769))>>>0)}const bn=19,Nx=.05,ia=1,Ux=.55,Ox=.08,Bx=.2,zx=.8,kx=.03,Hx=.07,Vx=2.1;function Md(n,e){const t=Math.sin(n*Bx+zx)*Ox,i=Math.sin(n*Hx+Vx)*kx;return(t+i)*e}class Gx{constructor(e,t){this.curve=new Lp(e,!1,"catmullrom",.4),this.times=t,this.total=t[t.length-1],this._n=e.length,this.meanderStrength=0;const i=this.curve.getPoint(0),s=this.curve.getTangent(0);this._startX=i.x,this._startZ=i.z,this._startHeading=Math.atan2(s.z,s.x),this._checkpoints=[{t:0,x:this._startX,z:this._startZ,heading:this._startHeading,turnRate:0}],this._lastSimT=null,this._lastSimResult=null}setMeanderStrength(e){this.meanderStrength=e,this._invalidateCheckpoints()}_invalidateCheckpoints(){this._checkpoints.length=1,this._lastSimT=null}_simulate(e){if(e===this._lastSimT)return this._lastSimResult;const t=Math.max(0,e),i=this.meanderStrength,s=this._checkpoints,r=Math.min(Math.floor(t/ia),s.length-1),a=s[r];let o=a.t,c=a.heading,l=a.turnRate,h=a.x,d=a.z;for(;o<t;){const u=(Math.floor(o/ia)+1)*ia,p=Math.min(t,u);for(;o<p;){const g=Math.min(Nx,p-o),x=Md(o,i),m=1-Math.exp(-.35*g);l+=(x-l)*m,c+=l*g,h+=Math.cos(c)*bn*g,d+=Math.sin(c)*bn*g,o+=g}o=p,o===u&&Math.round(o/ia)===s.length&&s.push({t:o,x:h,z:d,heading:c,turnRate:l})}return this._lastSimT=e,this._lastSimResult={x:h,z:d,heading:c,turnRate:l},this._lastSimResult}positionAt(e,t=new A){const i=this._simulate(e);return t.set(i.x,0,i.z),t}tangentAt(e,t=new A){const i=this._simulate(e);return t.set(Math.cos(i.heading),0,Math.sin(i.heading)),t}}const Qs=900,Wx=4,Xx=.22,Ju=new ae(16775925),Qu=new ae(16769187),ju=new ae(16764805),eh=new ae(15321482);class Yx{constructor(e={}){const{seed:t=4242}=e;this._seedBase=t>>>0,this.overlayScene=new nd,this.speed=.3,this.paused=!1,this.localTime=0,this.distanceTraveled=0,this.emissionRate=300,this.phase="flight",this.path=new Gx([new A(-70,18,420),new A(-25,15,320),new A(20,14,230),new A(60,16,170),new A(100,18,120),new A(140,20,90)],[0,5,9,13,17,21]),this.manualTurnInput=0;const i=this.path._simulate(0);this._liveX=i.x,this._liveZ=i.z,this._liveHeading=i.heading,this._liveTurnRate=i.turnRate,this.headUniforms={uColorCore:{value:Ju.clone()},uColorInner:{value:Qu.clone()},uColorOuter:{value:ju.clone()},uHeadColor:{value:new ae(6742271)},uColorMode:{value:0},uRainbowSpeed:{value:.15},uRainbowSaturation:{value:.8},uHeadBloom:{value:1.4},uTime:{value:0},uPixelSize:{value:900}};const s=new At;s.setAttribute("position",new We(new Float32Array(3),3).setUsage(si));const r=new ot({transparent:!0,depthWrite:!1,depthTest:!0,toneMapped:!1,blending:jn,uniforms:this.headUniforms,vertexShader:`
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
      `});this.headMesh=new Is(s,r),this.headMesh.frustumCulled=!1,this.overlayScene.add(this.headMesh);const a=Qs,o=new Float32Array(a*3),c=new Float32Array(a*3),l=new Float32Array(a).fill(-1e3),h=new Float32Array(a).fill(1),d=new Float32Array(a),u=new Float32Array(a),p=new Float32Array(a),g=new At;g.setAttribute("position",new We(o,3).setUsage(si)),g.setAttribute("aVelocity",new We(c,3).setUsage(si)),g.setAttribute("aBirthTime",new We(l,1).setUsage(si)),g.setAttribute("aLifetime",new We(h,1).setUsage(si)),g.setAttribute("aSeed",new We(d,1).setUsage(si)),g.setAttribute("aSize",new We(u,1).setUsage(si)),g.setAttribute("aToneBias",new We(p,1).setUsage(si)),this.trailUniforms={uTime:{value:0},uPixelSize:{value:130},uColorTint:{value:new ae(1,1,1)},uColorMode:{value:0},uYoungColor:{value:new ae(6742271)},uMidColor:{value:new ae(3368703)},uOldColor:{value:new ae(9133302)},uRainbowSpeed:{value:.15},uRainbowSaturation:{value:.8},uBrightness:{value:1.15},uParticleBloom:{value:1.3},uSpreadAmount:{value:3.4},uSpreadCurve:{value:1.6},uSpreadRandomness:{value:.7},uGlowIntensity:{value:1.05},uGlowRadius:{value:.3},uGlowAgeFalloff:{value:1},uFadeStart:{value:.55}};const x=new ot({transparent:!0,depthWrite:!1,depthTest:!0,toneMapped:!1,blending:jn,uniforms:this.trailUniforms,vertexShader:`
        precision highp float;
        attribute vec3 aVelocity;
        attribute float aBirthTime, aLifetime, aSeed, aSize, aToneBias;
        uniform float uTime, uPixelSize;
        uniform float uSpreadAmount, uSpreadCurve, uSpreadRandomness;
        uniform float uFadeStart;
        varying float vAlpha, vAge, vSeed, vToneBias, vBirthTime;
        // Cheap deterministic hash, only for the fixed-per-particle random
        // scatter direction below — never for anything needing high quality.
        float hash(float n) { return fract(sin(n) * 43758.5453123); }
        void main(){
          float age = uTime - aBirthTime;
          float na = clamp(age / aLifetime, 0.0, 1.0);
          // Slow deterministic drift (spec 13): "luminous dust suspended in
          // air" — sideways/vertical spread that grows with age, built from
          // per-particle seed + two gentle frequencies, never violent. See
          // uSpreadAmount/uSpreadCurve/uSpreadRandomness's own comments
          // (above, by the uniform declarations) for what each one does —
          // all three default to values that make this reduce EXACTLY to
          // the original formula.
          float phase = aSeed * 6.2831853;
          float ageCurve = pow(na, uSpreadCurve);
          float swayWave = sin(uTime * 0.6 + phase) * (0.10 + ageCurve * 0.55);
          float bobWave  = cos(uTime * 0.5 + phase * 1.3) * (0.08 + ageCurve * 0.35);
          float rHashX = hash(aSeed * 127.1) * 2.0 - 1.0;
          float rHashY = hash(aSeed * 269.5 + 13.1) * 2.0 - 1.0;
          float rHashZ = hash(aSeed * 391.7 + 47.7) * 2.0 - 1.0;
          float randomScatter = ageCurve * uSpreadRandomness;
          float sway = (swayWave + rHashX * randomScatter) * uSpreadAmount;
          float bob  = (bobWave + rHashY * randomScatter) * uSpreadAmount;
          float zScatter = rHashZ * randomScatter * uSpreadAmount;
          vec3 pos = position + aVelocity * age;
          pos.x += sway;
          pos.z += sway * 0.4 + zScatter;
          pos.y += bob + na * 0.22;
          vec4 mv = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mv;
          // Age/size profile (spec 10): small&dense near birth -> a touch
          // larger/softer mid-life -> shrinking again as it fades. The
          // shrink and the alpha fadeOut below now share uFadeStart (both
          // hardcoded to 0.55 before) so a particle's size and brightness
          // always wind down together, not size shrinking while it's still
          // fully opaque or vice versa.
          float sizeCurve = mix(0.75, 1.15, smoothstep(0.0, 0.5, na)) * mix(1.15, 0.5, smoothstep(uFadeStart, 1.0, na));
          gl_PointSize = uPixelSize * aSize * sizeCurve / max(-mv.z, 1.0);
          float fadeIn = smoothstep(0.0, 0.05, na);
          // Trail Linger V1 — uFadeStart (0.55 = today's exact look) is how
          // far through its life a particle stays fully bright before
          // beginning to fade; raising it makes the trail read as crisp and
          // present for longer, with the actual fade-out saved for a
          // shorter, gentler dim right at the very end, rather than
          // spending nearly half its life already visibly dimming.
          float fadeOut = 1.0 - smoothstep(uFadeStart, 1.0, na);
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
        uniform float uGlowIntensity, uGlowRadius, uGlowAgeFalloff;
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
          // Particle Glow V1 — see uGlowIntensity's own comment above. A
          // wide, soft radial falloff (uGlowRadius, independent of the
          // tight core radius) so this reads as a halo the bloom pass can
          // spread, not just a brighter version of the existing tiny hot
          // centre.
          float glowFalloff = smoothstep(uGlowRadius, 0.0, r);
          float glowAgeMask = mix(youngMask, 1.0, uGlowAgeFalloff);
          vec3 glowEnergy = tone * glowFalloff * glowAgeMask * uGlowIntensity;
          vec3 emissive = visibleColor + highlightEnergy + glowEnergy;
          gl_FragColor = vec4(emissive, shapeAlpha);
        }
      `});this.trailPoints=new Is(g,x),this.trailPoints.frustumCulled=!1,this.overlayScene.add(this.trailPoints),this._birthPos=o,this._velocity=c,this._birthTime=l,this._lifetime=h,this._seedAttr=d,this._sizeAttr=u,this._toneBias=p,this._emitCount=0,this._writeCursor=0,this.altitudeOffset=0,this._headPos=new A,this._tangent=new A,this._worldUp=new A(0,1,0),this._side=new A,this._up=new A,this._reconHead=new A,this._reconTan=new A,this.travelDir=new A(0,0,-1),this._prevHeadPos=new A,this._prevTangent=new A(0,0,-1),this._emitInterpPos=new A,this._emitInterpTan=new A,this.waterGlintColor=eh.clone()}setTint(e){this.headUniforms.uColorCore.value.copy(Ju).lerp(e,.1),this.headUniforms.uColorInner.value.copy(Qu).lerp(e,.1),this.headUniforms.uColorOuter.value.copy(ju).lerp(e,.12),this.trailUniforms.uColorTint.value.copy(e),this.waterGlintColor.copy(eh).lerp(e,.3)}setColorMode(e){const t=e==="custom"?1:e==="rainbow"?2:0;this.headUniforms.uColorMode.value=t,this.trailUniforms.uColorMode.value=t}setHeadColor(e){this.headUniforms.uHeadColor.value.set(e)}setYoungColor(e){this.trailUniforms.uYoungColor.value.set(e)}setMidColor(e){this.trailUniforms.uMidColor.value.set(e)}setOldColor(e){this.trailUniforms.uOldColor.value.set(e)}setColors(e={}){e.head!=null&&this.setHeadColor(e.head),e.young!=null&&this.setYoungColor(e.young),e.mid!=null&&this.setMidColor(e.mid),e.old!=null&&this.setOldColor(e.old)}setRainbowSpeed(e){this.headUniforms.uRainbowSpeed.value=e,this.trailUniforms.uRainbowSpeed.value=e}setRainbowSaturation(e){this.headUniforms.uRainbowSaturation.value=e,this.trailUniforms.uRainbowSaturation.value=e}setBrightness(e){this.trailUniforms.uBrightness.value=e}setParticleBloom(e){this.trailUniforms.uParticleBloom.value=e}setSpreadAmount(e){this.trailUniforms.uSpreadAmount.value=e}setSpreadCurve(e){this.trailUniforms.uSpreadCurve.value=e}setSpreadRandomness(e){this.trailUniforms.uSpreadRandomness.value=e}setGlowIntensity(e){this.trailUniforms.uGlowIntensity.value=e}setGlowRadius(e){this.trailUniforms.uGlowRadius.value=e}setGlowAgeFalloff(e){this.trailUniforms.uGlowAgeFalloff.value=e}setFadeStart(e){this.trailUniforms.uFadeStart.value=e}setHeadBloom(e){this.headUniforms.uHeadBloom.value=e}setEmissionRate(e){this.emissionRate=Math.max(1,e),this._emitCount=Math.floor(this.distanceTraveled*(this.emissionRate/bn))}setAltitudeOffset(e){this.altitudeOffset=e}setMeanderStrength(e){this.path.setMeanderStrength(e)}setManualTurnInput(e){this.manualTurnInput=e}setPaused(e){this.paused=!!e}restart(){this.localTime=0,this._reconstructAt(0,this._ocean)}getHeadPosition(e=new A){return e.copy(this._headPos)}getHeadPositionAtTime(e,t=new A){let i=-1,s=1/0;for(let a=0;a<Qs;a++){const o=this._birthTime[a];if(o<0)continue;const c=Math.abs(o-e);c<s&&(s=c,i=a)}if(i>=0&&s<1)return t.set(this._birthPos[i*3],this._birthPos[i*3+1],this._birthPos[i*3+2]),t;this.path.positionAt(e,t);const r=this._ocean?this._ocean.heightAt(t.x,t.z,e):0;return t.y=r+3+Math.sin(e*.35)*1.5+this.altitudeOffset,t}setTime(e){this.localTime=Math.max(0,e),this._reconstructAt(this.localTime,this._ocean)}_emitOneInto(e,t,i,s,r){const a=r()*Xx,o=r()*Math.PI*2,c=(r()-.5)*Math.PI,l=Math.cos(o)*Math.cos(c)*a,h=Math.sin(c)*a,d=Math.sin(o)*Math.cos(c)*a;this._birthPos[e*3+0]=i.x+l,this._birthPos[e*3+1]=i.y+h,this._birthPos[e*3+2]=i.z+d;const u=.12+r()*.22,p=(r()-.5)*.5,g=(r()-.5)*.35,x=this._side.crossVectors(s,this._worldUp);x.lengthSq()<1e-6?x.set(1,0,0):x.normalize();const m=this._up.crossVectors(x,s).normalize();this._velocity[e*3+0]=-s.x*u+x.x*p+m.x*g,this._velocity[e*3+1]=-s.y*u+x.y*p+m.y*g+.05,this._velocity[e*3+2]=-s.z*u+x.z*p+m.z*g,this._birthTime[e]=t,this._lifetime[e]=r()<.8?2.3+r()*1.1:3.5+r()*.5,this._seedAttr[e]=r()*Math.PI*2;const f=r();this._sizeAttr[e]=f<.7?.35+r()*.22:f<.95?.62+r()*.32:1.05+r()*.45,this._toneBias[e]=r()<.15?1:0}update(e,t,i,s){this._ocean=i,this._prevHeadPos.copy(this._headPos),this._prevTangent.copy(this._tangent);const r=this.localTime,a=this.distanceTraveled;this.paused||(this.localTime+=e*this.speed);const o=this.localTime;if(this.phase=o<2?"approach":"flight",!this.paused){const l=e*this.speed;this.distanceTraveled+=bn*l;const h=Md(o,this.path.meanderStrength),d=1-Math.exp(-.35*l);this._liveTurnRate+=(h-this._liveTurnRate)*d;const u=this.manualTurnInput*Ux;this._liveHeading+=(this._liveTurnRate+u)*l,this._liveX+=Math.cos(this._liveHeading)*bn*l,this._liveZ+=Math.sin(this._liveHeading)*bn*l}this._headPos.set(this._liveX,0,this._liveZ),this._tangent.set(Math.cos(this._liveHeading),0,Math.sin(this._liveHeading)),this.travelDir.copy(this._tangent);const c=i?i.heightAt(this._headPos.x,this._headPos.z,o):0;if(this._headPos.y=c+3+Math.sin(o*.35)*1.5+this.altitudeOffset,this.headMesh.geometry.attributes.position.array[0]=this._headPos.x,this.headMesh.geometry.attributes.position.array[1]=this._headPos.y,this.headMesh.geometry.attributes.position.array[2]=this._headPos.z,this.headMesh.geometry.attributes.position.needsUpdate=!0,this.headUniforms.uTime.value=o,!this.paused){const l=this.emissionRate/bn,h=Math.floor(this.distanceTraveled*l),d=this.distanceTraveled-a;let u=!1;for(;this._emitCount<h;){const p=this._emitCount,g=p/l,x=Zu(this._seedBase,p),m=this._writeCursor,f=d>1e-9?Math.min(1,Math.max(0,(g-a)/d)):1,M=r+f*(o-r);this._emitInterpPos.lerpVectors(this._prevHeadPos,this._headPos,f),this._emitInterpTan.lerpVectors(this._prevTangent,this._tangent,f),this._emitInterpTan.lengthSq()<1e-8?this._emitInterpTan.copy(this._tangent):this._emitInterpTan.normalize(),this._emitOneInto(m,M,this._emitInterpPos,this._emitInterpTan,x),this._writeCursor=(this._writeCursor+1)%Qs,this._emitCount++,u=!0}if(u){const p=this.trailPoints.geometry;p.attributes.position.needsUpdate=!0,p.attributes.aVelocity.needsUpdate=!0,p.attributes.aBirthTime.needsUpdate=!0,p.attributes.aLifetime.needsUpdate=!0,p.attributes.aSeed.needsUpdate=!0,p.attributes.aSize.needsUpdate=!0,p.attributes.aToneBias.needsUpdate=!0}}this.trailUniforms.uTime.value=o}_reconstructAt(e,t){const i=this.emissionRate,s=Math.max(0,e-Wx),r=Math.ceil(s*i),a=Math.floor(e*i);this._birthTime.fill(-1e3),this._writeCursor=0;let o=0;for(let d=r;d<=a;d++){const u=d/i;if(u>e)break;const p=Zu(this._seedBase,d);this.path.positionAt(u,this._reconHead),this.path.tangentAt(u,this._reconTan);const g=t?t.heightAt(this._reconHead.x,this._reconHead.z,u):0;this._reconHead.y=g+3+Math.sin(u*.35)*1.5+this.altitudeOffset;const x=o%Qs;this._emitOneInto(x,u,this._reconHead,this._reconTan,p),o++}this._emitCount=a+1,this._writeCursor=o%Qs,this.distanceTraveled=e*bn,this.path.positionAt(e,this._headPos),this.path.tangentAt(e,this._tangent),this.travelDir.copy(this._tangent);const c=t?t.heightAt(this._headPos.x,this._headPos.z,e):0;this._headPos.y=c+3+Math.sin(e*.35)*1.5+this.altitudeOffset;const l=this.path._simulate(e);this._liveX=l.x,this._liveZ=l.z,this._liveHeading=l.heading,this._liveTurnRate=l.turnRate,this.headMesh.geometry.attributes.position.array[0]=this._headPos.x,this.headMesh.geometry.attributes.position.array[1]=this._headPos.y,this.headMesh.geometry.attributes.position.array[2]=this._headPos.z,this.headMesh.geometry.attributes.position.needsUpdate=!0,this.headUniforms.uTime.value=e,this.trailUniforms.uTime.value=e,this._prevHeadPos.copy(this._headPos),this._prevTangent.copy(this._tangent);const h=this.trailPoints.geometry;h.attributes.position.needsUpdate=!0,h.attributes.aVelocity.needsUpdate=!0,h.attributes.aBirthTime.needsUpdate=!0,h.attributes.aLifetime.needsUpdate=!0,h.attributes.aSeed.needsUpdate=!0,h.attributes.aSize.needsUpdate=!0,h.attributes.aToneBias.needsUpdate=!0}}const Sn=30,No=260,th=200,qx=.4,$x=-1e6,ih=[16734780,16765499,3921663,16726992,6029163,16777215,10185727];function Kx(n){let e=n>>>0;return function(){e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}class Zx{constructor(e,t={}){const i=(t.seed??9001)>>>0,s=Kx(i);this._time=0,this._nextSlot=0,this.launchStagger=.32;const r=Sn*No,a=new Float32Array(r*3),o=new Float32Array(r),c=new Float32Array(r*3),l=new Float32Array(r),h=new Float32Array(r),d=new Float32Array(r);for(let g=0;g<Sn;g++)for(let x=0;x<No;x++){const m=g*No+x;o[m]=g;const f=s()*2-1,M=s()*Math.PI*2,b=Math.sqrt(Math.max(0,1-f*f)),y=Math.cos(M)*b,E=Math.sin(M)*b,T=f*.55+.45,R=Math.hypot(y,T,E)||1;c[m*3+0]=y/R,c[m*3+1]=T/R,c[m*3+2]=E/R,l[m]=34+s()*44,h[m]=1.1+s()*1,d[m]=s()}const u=new At;u.setAttribute("position",new We(a,3)),u.setAttribute("aSlot",new We(o,1)),u.setAttribute("aDir",new We(c,3)),u.setAttribute("aSpeed",new We(l,1)),u.setAttribute("aSize",new We(h,1)),u.setAttribute("aSeed",new We(d,1)),this.uniforms={uTime:{value:0},uPixelSize:{value:200},uRiseTime:{value:2.15},uGravity:{value:40},uBurstLifetime:{value:3.5},uFadeStart:{value:.09},uBrightness:{value:3},uHotIntensity:{value:2.85},uGlitterIntensity:{value:.6},uGlitterSpeed:{value:31.5},uBlackoutTime:{value:.5},uShellBirth:{value:new Array(Sn).fill($x)},uShellOrigin:{value:Array.from({length:Sn},()=>new A)},uShellColor:{value:Array.from({length:Sn},()=>new ae)},uShellRiseHeight:{value:new Array(Sn).fill(th)}};const p=new ot({transparent:!0,depthWrite:!1,depthTest:!0,toneMapped:!1,blending:jn,uniforms:this.uniforms,defines:{MAX_SHELLS:String(Sn)},vertexShader:`
        precision highp float;
        attribute float aSlot, aSpeed, aSize, aSeed;
        attribute vec3 aDir;
        uniform float uTime, uPixelSize;
        uniform float uRiseTime, uGravity, uBurstLifetime, uFadeStart;
        uniform float uGlitterIntensity, uGlitterSpeed, uBlackoutTime;
        uniform float uShellBirth[MAX_SHELLS];
        uniform vec3 uShellOrigin[MAX_SHELLS];
        uniform vec3 uShellColor[MAX_SHELLS];
        uniform float uShellRiseHeight[MAX_SHELLS];
        varying float vAlpha, vBurstAge;
        varying vec3 vColor;

        const float TRAIL_FRACTION = ${qx.toFixed(4)};

        // Cheap deterministic pseudo-random hash — used only to decide the
        // glitter flicker's on/off state per particle per time-step, never
        // for anything that needs to look uniform or high quality.
        float hash(float n) { return fract(sin(n) * 43758.5453123); }

        void main() {
          int slot = int(aSlot);
          float birth = uShellBirth[slot];
          vec3 origin = uShellOrigin[slot];
          float riseHeight = uShellRiseHeight[slot];
          vColor = uShellColor[slot];
          float age = uTime - birth;
          float shellLifetime = uRiseTime + uBurstLifetime;
          float alive = step(0.0, age) * step(age, shellLifetime);

          vec3 pos;
          float sizeMul;
          float trailFade = 1.0;
          float glitter = 1.0;
          if (age < uRiseTime) {
            // Rise: a thin trailing LINE, not a single converging dot.
            // headT is how far the rising point itself has climbed; each
            // particle lags behind it by up to TRAIL_FRACTION of the rise
            // (scaled by its own aSeed, so particles are spread continuously
            // along the trail rather than clumped) — aSeed=0 rides right at
            // the bright head, aSeed=1 sits at the fading tail. Clamped to
            // 0 so nothing is ever placed below the actual launch point.
            float headT = clamp(age / uRiseTime, 0.0, 1.0);
            float particleT = clamp(headT - aSeed * TRAIL_FRACTION, 0.0, headT);
            pos = origin + vec3(0.0, -riseHeight * (1.0 - particleT), 0.0);
            float behindHead = headT - particleT; // 0 at the head, up to TRAIL_FRACTION at the tail
            trailFade = 1.0 - clamp(behindHead / TRAIL_FRACTION, 0.0, 1.0);
            sizeMul = mix(0.75, 0.35, 1.0 - trailFade); // thin throughout; head a little fuller than the tail
            // Blackout before the bloom — real shells go dark QUICKLY (the
            // fuse burning down out of view inside the casing), STAY dark
            // for a beat, then the burst is a sudden reveal — not a slow
            // fade that's already dim well before the burst. uBlackoutTime
            // is the DARK duration; the snap-to-dark transition itself is
            // always this same short, fixed length regardless of
            // uBlackoutTime, so a bigger uBlackoutTime means "dark for
            // longer", never "fades out more slowly".
            const float BLACKOUT_SNAP = 0.12;
            float blackoutStart = uRiseTime - uBlackoutTime - BLACKOUT_SNAP;
            float blackout = uBlackoutTime > 0.0001
              ? 1.0 - smoothstep(blackoutStart, blackoutStart + BLACKOUT_SNAP, age)
              : 1.0;
            trailFade *= blackout;
            sizeMul *= blackout;
            vBurstAge = 0.0;
          } else {
            float burstAge = age - uRiseTime;
            float bn = clamp(burstAge / uBurstLifetime, 0.0, 1.0);
            pos = origin + aDir * aSpeed * burstAge;
            pos.y -= 0.5 * uGravity * burstAge * burstAge;
            sizeMul = mix(1.1, 0.4, bn);
            vBurstAge = bn;

            // Glitter/crackle — a per-particle flicker that steps between
            // dim and bright a few times a second, distinct from (and on
            // top of) the smooth constant twinkle below: that alone reads
            // as a gentle shimmer, not the flickering sparkle of real
            // falling embers. Ramps in over the first bit of the burst
            // (smoothstep below) so the initial flash isn't itself
            // flickering — it's specifically a "while falling" effect.
            float glitterPhase = floor(uTime * uGlitterSpeed + aSeed * 97.0);
            float glitterOn = step(0.5, hash(glitterPhase * 12.9898 + aSeed * 78.233));
            float glitterAmount = uGlitterIntensity * smoothstep(0.08, 0.3, bn);
            glitter = mix(1.0, mix(0.15, 1.5, glitterOn), glitterAmount);
          }

          vec4 mv = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = uPixelSize * aSize * sizeMul / max(-mv.z, 1.0);

          float fadeOut = age < uRiseTime ? trailFade : (1.0 - smoothstep(uFadeStart, 1.0, vBurstAge));
          float twinkle = 0.85 + 0.15 * sin(aSeed * 41.0 + uTime * 9.0);
          vAlpha = alive * fadeOut * twinkle * glitter;
        }
      `,fragmentShader:`
        precision highp float;
        uniform float uBrightness, uHotIntensity;
        varying float vAlpha, vBurstAge;
        varying vec3 vColor;
        void main() {
          vec2 d = gl_PointCoord - 0.5;
          float r = length(d) * 2.0;
          if (r > 1.0) discard;
          float core = smoothstep(0.4, 0.0, r);
          float halo = smoothstep(1.0, 0.3, r);
          float shapeAlpha = clamp(core + halo * 0.5, 0.0, 1.0) * vAlpha;
          // Flashy HDR pop early in the burst, settling to the plain
          // saturated colour as it ages and fades — same "highlight energy
          // only while young" trick used by HeadParticleTrail's particles.
          float hot = (1.0 - smoothstep(0.0, 0.35, vBurstAge)) * step(0.0001, uHotIntensity);
          vec3 color = mix(vColor, vec3(1.0), 0.55 * hot) * uBrightness * (1.0 + hot * uHotIntensity);
          gl_FragColor = vec4(color, shapeAlpha);
        }
      `});this.points=new Is(u,p),this.points.frustumCulled=!1,e.add(this.points)}trigger(e,t,i=0,s=th){const r=this._nextSlot;this._nextSlot=(this._nextSlot+1)%Sn,this.uniforms.uShellBirth.value[r]=this._time+i,this.uniforms.uShellOrigin.value[r].copy(e),this.uniforms.uShellColor.value[r].set(t),this.uniforms.uShellRiseHeight.value[r]=s}update(e){this._time+=e,this.uniforms.uTime.value=this._time}setPixelSize(e){this.uniforms.uPixelSize.value=e}setRiseTime(e){this.uniforms.uRiseTime.value=e}setGravity(e){this.uniforms.uGravity.value=e}setBurstLifetime(e){this.uniforms.uBurstLifetime.value=e}setFadeStart(e){this.uniforms.uFadeStart.value=e}setBrightness(e){this.uniforms.uBrightness.value=e}setHotIntensity(e){this.uniforms.uHotIntensity.value=e}setGlitterIntensity(e){this.uniforms.uGlitterIntensity.value=e}setGlitterSpeed(e){this.uniforms.uGlitterSpeed.value=e}setBlackoutTime(e){this.uniforms.uBlackoutTime.value=e}setLaunchStagger(e){this.launchStagger=e}dispose(){this.points.geometry.dispose(),this.points.material.dispose(),this.points.parent?.remove(this.points)}}function ma(n){let e=n>>>0;return function(){e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function yn(n,e,t){const i=Math.min(Math.max((t-n)/(e-n),0),1);return i*i*(3-2*i)}function Uo(n){const e=n.replace("#",""),t=e.length===3?e.split("").map(s=>s+s).join(""):e,i=parseInt(t,16);return{r:i>>16&255,g:i>>8&255,b:i&255}}async function bd(n,e,t=3e3){if(typeof document>"u"||!document.fonts)return;const i=new Promise(s=>setTimeout(s,t));try{await Promise.race([Promise.all([document.fonts.load(n,e||""),document.fonts.ready]),i])}catch(s){console.warn(`[TrailLyrics] font load failed for "${n}" — using fallback font stack instead:`,s)}}function nh(n,{fontWeight:e=600,fontFamily:t='Georgia, "Times New Roman", serif',fontSizeScale:i=1,lineHeight:s=1.15,targetCount:r=650,worldWidth:a=26,fixedWorldScale:o=null,depthJitter:c=.4,seed:l=99,shadowStrength:h=1,textColor:d="#ffffff",shadowColor:u="#000000",outlineWidth:p=0,outlineColor:g="#000000"}={}){const x=120*i,m=n.split(`
`),f=document.createElement("canvas").getContext("2d");f.font=`${e} ${x}px ${t}`;const M=x*.18;let b,y,E;if(m.length===1){const ye=f.measureText(n);b=Math.ceil(ye.width+M*2),y=Math.ceil(x*1.3)}else{let ye=0;for(const Be of m)ye=Math.max(ye,f.measureText(Be).width);E=x*s,b=Math.ceil(ye+M*2),y=Math.ceil(E*m.length+M*1.2)}const T=document.createElement("canvas");T.width=b,T.height=y;const R=T.getContext("2d");R.font=`${e} ${x}px ${t}`,R.fillStyle="#ffffff",R.textAlign="center",R.textBaseline="middle";const _=ye=>{if(m.length===1)ye(n,b/2,y/2);else{const Be=(y-E*m.length)/2;m.forEach((Ue,q)=>ye(Ue,b/2,Be+E*(q+.5)))}};_((ye,Be,Ue)=>R.fillText(ye,Be,Ue));const C=R.getImageData(0,0,b,y).data,D=[];for(let ye=0;ye<y;ye++)for(let Be=0;Be<b;Be++)C[(ye*b+Be)*4+3]>80&&D.push(Be,ye);const P=Uo(u);if(R.clearRect(0,0,b,y),h>0){const ye=x/120;R.save(),R.fillStyle=u,R.shadowColor=`rgba(${P.r}, ${P.g}, ${P.b}, ${Math.min(1,.55*h).toFixed(3)})`,R.shadowBlur=20*ye,R.shadowOffsetX=0,R.shadowOffsetY=3*ye,_((Be,Ue,q)=>R.fillText(Be,Ue,q)),R.shadowColor=`rgba(${P.r}, ${P.g}, ${P.b}, ${Math.min(1,.6*h).toFixed(3)})`,R.shadowBlur=4*ye,R.shadowOffsetY=1.5*ye,_((Be,Ue,q)=>R.fillText(Be,Ue,q)),R.shadowColor="rgba(0, 0, 0, 0)",R.shadowBlur=0,R.shadowOffsetX=0,R.shadowOffsetY=0,R.restore()}if(p>0){const ye=Uo(g);R.lineJoin="round",R.miterLimit=2,R.strokeStyle=`rgb(${ye.r}, ${ye.g}, ${ye.b})`,R.lineWidth=p*(x/120)*2,_((Be,Ue,q)=>R.strokeText(Be,Ue,q))}const{r:N,g:G,b:Z}=Uo(d);R.fillStyle=`rgba(${N}, ${G}, ${Z}, 0.96)`,_((ye,Be,Ue)=>R.fillText(ye,Be,Ue));const O=D.length/2,X=r/Math.max(O,1),z=ma(l),J=o??a/b,j=o!=null?b*J:a,ue=y*J,fe=[];let ve=0;for(let ye=0;ye<O;ye++){if(ve+=X,ve<1)continue;ve-=1;const Be=D[ye*2]+(z()-.5)*.7,Ue=D[ye*2+1]+(z()-.5)*.7;fe.push({x:(Be-b/2)*J,y:(y/2-Ue)*J,z:(z()-.5)*c})}return{targets:fe,canvas:T,worldWidth:j,worldHeight:ue}}let Oo=null;function Jx(){return!Oo&&typeof document<"u"&&(Oo=document.createElement("canvas").getContext("2d")),Oo}function Qx({fontWeight:n=600,fontFamily:e='Georgia, "Times New Roman", serif',fontSizeScale:t=1}={}){return`${n} ${120*t}px ${e}`}function jx(n,e){const t=Jx();return t?(t.font=Qx(e),t.measureText(n).width):n.length*66}function eS(n,e,t){const i=n.split(" ").filter(a=>a.length>0);if(i.length===0)return[n];const s=[];let r=i[0];for(let a=1;a<i.length;a++){const o=`${r} ${i[a]}`;jx(o,t)<=e?r=o:(s.push(r),r=i[a])}return s.push(r),s}function tS(n,e,t){const i=[];for(const s of n)i.push(...eS(s,e,t));return i}const js={travel:3,assemble:1.5,hold:2,leave:.2,dissolve:1.2},sh=.35,iS=30,nS=20,sS=650,dc=20,zl=.007,rS=1,aS=.8,oS=.75,rh=new ae(16769187),lS=new ae(16777215);class cS{constructor(e,t={}){const{text:i="Forever More",seed:s=777}=t;this._seed=s>>>0,this._scene=e,this.enabled=!0,this.paused=!1,this.localTime=0,this.phase="travel",this.fontFamily='Georgia, "Times New Roman", serif',this.fontWeight=600,this.fontSizeScale=1,this.lineHeight=1.15,this.textScale=1,this.formationDistance=.65,this.formationHeightOffset=2,this.travelDuration=js.travel,this.assembleDuration=js.assemble,this.holdDuration=js.hold,this.leaveDuration=js.leave,this.dissolveDuration=js.dissolve,this.particleCount=sS,this.shadowStrength=1,this.textColor="#ffffff",this.shadowColor="#000000",this.outlineWidth=2,this.outlineColor="#000000",this.particleContribution=1,this.billboardRelease=.4,this.positionRelease=.4,this.followSmoothing=6,this.maxPositionChaseSeconds=2,this.screenLock=!1,this._slotOffset={right:0,up:0},this._slotTargetOffset={right:0,up:0},this.trailWindowMin=.3,this.trailWindowMax=.9,this.flowAmount=1.8,this._lastTravelStats={avgDistance:0,maxDistance:0,sourceWidth:0,textWidth:0},this.loop=!0,this.count=0;const r=new At;this._aScatterAttr=null,this.particleUniforms={uAssembleProgress:{value:0},uDissolveProgress:{value:0},uParticleContribution:{value:1},uColor:{value:rh.clone()},uGlow:{value:1},uPixelSize:{value:120},uLocalFlowDir:{value:new A(0,0,1)},uFlowAmount:{value:this.flowAmount}};const a=new ot({transparent:!0,depthWrite:!1,depthTest:!0,toneMapped:!1,blending:jn,uniforms:this.particleUniforms,vertexShader:`
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
      `});this.points=new Is(r,a),this.points.frustumCulled=!1,this.points.visible=!1,e.add(this.points),this.glyphUniforms={uOpacity:{value:0}},this.glyphMaterial=new sc({transparent:!0,depthWrite:!0,depthTest:!0,alphaTest:.02,toneMapped:!1,blending:rn,side:Ri,color:lS.clone(),opacity:0}),this.glyphMesh=new Kt(new cn(1,1),this.glyphMaterial),this.glyphMesh.frustumCulled=!1,this.glyphMesh.visible=!1,e.add(this.glyphMesh),this._glyphBaseWidth=1,this._glyphBaseHeight=1,this._planeCenter=new A,this._planeQuat=new Gi,this._cyclePrepared=!1,this._holdScreenPos=null,this._domOverlayAlpha=0,this._tmpProjected=new A,this._tmpOffset=new A,this._tmpTangent=new A,this._tmpDesired=new A,this._tmpCamRight=new A,this._tmpCamUp=new A,this._tmpCamFwd=new A,this._tmpInvQuat=new Gi,this._tmpWakePos=new A,this._wakeLocalX=new Float32Array(0),this._wakeLocalPos=new Float32Array(0),this._wakeSortIndices=new Int32Array(0),this._ocean=null,this._headParticleTrail=null,this._camera=null,this.currentText=null,this.setText(i)}setText(e,t={}){const i=t.seed!==void 0?t.seed>>>0:this._seed;this._seed=i,this.currentText=e;const s={targetCount:this.particleCount,seed:i,fontFamily:this.fontFamily,fontWeight:this.fontWeight,fontSizeScale:this.fontSizeScale,lineHeight:this.lineHeight,shadowStrength:this.shadowStrength,textColor:this.textColor,shadowColor:this.shadowColor,outlineWidth:this.outlineWidth,outlineColor:this.outlineColor};this.screenLock?s.fixedWorldScale=zl:s.worldWidth=15;const{targets:r,canvas:a,worldWidth:o,worldHeight:c}=nh(e,s);r.sort((f,M)=>f.x-M.x),this.count=r.length,this._textWorldWidth=o,this._textWorldHeight=c;const l=ma(i^2654435769),h=new Float32Array(this.count*3),d=new Float32Array(this.count*3),u=new Float32Array(this.count),p=new Float32Array(this.count),g=new Float32Array(this.count);for(let f=0;f<this.count;f++){const M=r[f];d[f*3+0]=M.x*this.textScale,d[f*3+1]=M.y*this.textScale,d[f*3+2]=M.z,u[f]=l()*.6,p[f]=l()*Math.PI*2;const b=l();g[f]=b<.7?.4+l()*.25:b<.95?.65+l()*.3:1+l()*.35}const x=this.points.geometry;x.setAttribute("position",new We(new Float32Array(this.count*3),3).setUsage(si)),x.setAttribute("aScatter",new We(h,3).setUsage(si)),x.setAttribute("aGlyphTarget",new We(d,3)),x.setAttribute("aStagger",new We(u,1)),x.setAttribute("aSeed",new We(p,1)),x.setAttribute("aSize",new We(g,1)),this._aScatterAttr=x.attributes.aScatter,this.glyphMaterial.map&&this.glyphMaterial.map.dispose();const m=new fu(a);m.colorSpace=ri,this.glyphMaterial.map=m,this.glyphMaterial.needsUpdate=!0,this.glyphMesh.geometry.dispose(),this.glyphMesh.geometry=new cn(o*this.textScale,c*this.textScale),this._glyphBaseWidth=o,this._glyphBaseHeight=c,this._wakeLocalX=new Float32Array(this.count),this._wakeLocalPos=new Float32Array(this.count*3),this._wakeSortIndices=new Int32Array(this.count)}configure(e={}){const t=["textScale","formationDistance","formationHeightOffset","travelDuration","assembleDuration","holdDuration","leaveDuration","dissolveDuration","particleCount","particleContribution","billboardRelease","positionRelease","followSmoothing","maxPositionChaseSeconds","screenLock","trailWindowMin","trailWindowMax","flowAmount","fontFamily","fontWeight","fontSizeScale","lineHeight","shadowStrength","textColor","shadowColor","outlineWidth","outlineColor"];for(const i of t)e[i]!==void 0&&(this[i]=e[i])}beginEvent(e,t={}){this.configure(t),this.setText(e),this.localTime=0,this._cyclePrepared=!1,this.phase="travel",this._slotOffset={right:0,up:0},this._slotTargetOffset={right:0,up:0}}async setFont(e={},t=3e3){e.fontFamily!==void 0&&(this.fontFamily=e.fontFamily),e.fontWeight!==void 0&&(this.fontWeight=e.fontWeight),e.fontSizeScale!==void 0&&(this.fontSizeScale=e.fontSizeScale),e.lineHeight!==void 0&&(this.lineHeight=e.lineHeight);const i=`${this.fontWeight} 32px ${this.fontFamily}`;await bd(i,this.currentText,t),this.currentText!==null&&this.setText(this.currentText)}setGlyphStyle({shadowStrength:e,textColor:t,shadowColor:i,outlineWidth:s,outlineColor:r,fontFamily:a,fontWeight:o}={}){if(e!==void 0&&(this.shadowStrength=e),t!==void 0&&(this.textColor=t),i!==void 0&&(this.shadowColor=i),s!==void 0&&(this.outlineWidth=s),r!==void 0&&(this.outlineColor=r),this.currentText===null)return;const c=a!==void 0&&a!==this.fontFamily,l=o!==void 0&&o!==this.fontWeight;if(c||l){c&&(this.fontFamily=a),l&&(this.fontWeight=o),this.setText(this.currentText);return}const h={targetCount:this.particleCount,seed:this._seed,fontFamily:this.fontFamily,fontWeight:this.fontWeight,fontSizeScale:this.fontSizeScale,lineHeight:this.lineHeight,shadowStrength:this.shadowStrength,textColor:this.textColor,shadowColor:this.shadowColor,outlineWidth:this.outlineWidth,outlineColor:this.outlineColor};this.screenLock?h.fixedWorldScale=zl:h.worldWidth=15;const{canvas:d}=nh(this.currentText,h),u=this.glyphMaterial.map,p=new fu(d);p.colorSpace=ri,p.needsUpdate=!0,this.glyphMaterial.map=p,this.glyphMaterial.needsUpdate=!0,u&&u.dispose()}setTint(e){this.particleUniforms.uColor.value.copy(rh).lerp(e,.1)}setPaused(e){this.paused=!!e}restart(){this.localTime=0,this._cyclePrepared=!1}setTime(e){this.localTime=Math.max(0,e),this._headParticleTrail&&this._camera&&this._recompute(this._headParticleTrail,this._camera)}_bounds(){const e=this.travelDuration,t=e+this.assembleDuration,i=t+this.holdDuration,s=i+this.leaveDuration,r=s+this.dissolveDuration;return{t1:e,t2:t,t3:i,t4:s,cycle:r}}getCycleLength(){return this._bounds().cycle}getPhase(){return this.phase}_projectToScreen(e){const t=this._glyphBaseWidth*this.textScale/2,i=this._glyphBaseHeight*this.textScale/2,s=this._tmpOffset.set(0,1,0).applyQuaternion(this._planeQuat),r=this._tmpTangent.set(1,0,0).applyQuaternion(this._planeQuat),a=this._tmpProjected.copy(this._planeCenter).project(e),o=a.x,c=a.y,h=this._tmpProjected.copy(this._planeCenter).addScaledVector(s,i).project(e).y,u=this._tmpProjected.copy(this._planeCenter).addScaledVector(r,t).project(e).x;return{x:(o+1)*50,y:(1-c)*50,heightPercent:Math.abs(h-c)*100,widthPercent:Math.abs(u-o)*100}}getHoldOverlay(){if(!this._holdScreenPos||this._domOverlayAlpha<=0)return null;const{x:e,y:t,widthPercent:i,heightPercent:s}=this._holdScreenPos;return{x:e,y:t,widthPercent:i,heightPercent:s,alpha:this._domOverlayAlpha,text:this.currentText}}setLayoutTarget(e){this._slotTargetOffset.right=e.right,this._slotTargetOffset.up=e.up}getGlyphSize(){return{width:this._glyphBaseWidth*this.textScale,height:this._glyphBaseHeight*this.textScale}}sampleDissolveOrigins(e,t){const i=this.points.geometry.attributes.aGlyphTarget.array,s=this.count;if(s===0)return[];const r=ma(t>>>0),a=[];for(let o=0;o<e;o++){const c=Math.floor(r()*s)%s,l=new A(i[c*3+0],i[c*3+1],i[c*3+2]);l.applyQuaternion(this._planeQuat).add(this._planeCenter),a.push(l)}return a}_computeDesiredCenter(e,t,i){const s=e.getHeadPosition(this._tmpOffset),r=t.getWorldDirection(this._tmpTangent),a=t.position.distanceTo(s);return i.copy(t.position).addScaledVector(r,a*this.formationDistance),i.y-=this.formationHeightOffset,i}_computeLayoutCenter(e,t){return e.matrixWorld.extractBasis(this._tmpCamRight,this._tmpCamUp,this._tmpCamFwd),t.copy(e.position).addScaledVector(this._tmpCamFwd,-dc).addScaledVector(this._tmpCamRight,this._slotOffset.right).addScaledVector(this._tmpCamUp,this._slotOffset.up),t}_prepareFormation(e,t){this.screenLock?this._computeLayoutCenter(t,this._planeCenter):this._computeDesiredCenter(e,t,this._planeCenter),this._planeQuat.copy(t.quaternion),this._computeWakeScatter(e)}_computeWakeScatter(e){const t=this.count;this._tmpInvQuat.copy(this._planeQuat).invert();const i=e.localTime,s=ma((this._seed^1540483477)>>>0);let r=1/0,a=-1/0;for(let d=0;d<t;d++){const u=this.trailWindowMin+s()*(this.trailWindowMax-this.trailWindowMin),p=Math.max(0,i-u);e.getHeadPositionAtTime(p,this._tmpWakePos),this._tmpWakePos.x+=(s()-.5)*.6,this._tmpWakePos.y+=(s()-.5)*.5,this._tmpWakePos.z+=(s()-.5)*.6,this._tmpWakePos.sub(this._planeCenter).applyQuaternion(this._tmpInvQuat),this._wakeLocalPos[d*3+0]=this._tmpWakePos.x,this._wakeLocalPos[d*3+1]=this._tmpWakePos.y,this._wakeLocalPos[d*3+2]=this._tmpWakePos.z,this._wakeLocalX[d]=this._tmpWakePos.x,this._wakeSortIndices[d]=d,this._tmpWakePos.x<r&&(r=this._tmpWakePos.x),this._tmpWakePos.x>a&&(a=this._tmpWakePos.x)}this._wakeSortIndices.sort((d,u)=>this._wakeLocalX[d]-this._wakeLocalX[u]);const o=this._aScatterAttr.array,c=this.points.geometry.attributes.aGlyphTarget.array;let l=0,h=0;for(let d=0;d<t;d++){const u=this._wakeSortIndices[d],p=this._wakeLocalPos[u*3+0],g=this._wakeLocalPos[u*3+1],x=this._wakeLocalPos[u*3+2];o[d*3+0]=p,o[d*3+1]=g,o[d*3+2]=x;const m=c[d*3+0],f=c[d*3+1],M=c[d*3+2],b=Math.hypot(m-p,f-g,M-x);l+=b,b>h&&(h=b)}this._aScatterAttr.needsUpdate=!0,this._lastTravelStats={avgDistance:l/t,maxDistance:h,sourceWidth:a-r,textWidth:this._textWorldWidth},this.particleUniforms.uLocalFlowDir.value.copy(e.travelDir).applyQuaternion(this._tmpInvQuat).normalize(),this.particleUniforms.uFlowAmount.value=this.flowAmount}update(e,t,i,s){this._headParticleTrail=i,this._camera=s,!this.paused&&this.enabled&&(this.loop?this.localTime+=e:this.localTime=Math.min(this.localTime+e,this._bounds().cycle)),this._recompute(i,s,e)}_recompute(e,t,i=1/60){if(!this.enabled||!e||!t){this.points.visible=!1,this.glyphMesh.visible=!1;return}const{t1:s,t2:r,t3:a,t4:o,cycle:c}=this._bounds(),l=this.loop?this.localTime%c:this.localTime;if(l<s){this.phase="travel",this._cyclePrepared=!1,this.points.visible=!1,this.glyphMesh.visible=!1;return}this._cyclePrepared||(this._prepareFormation(e,t),this._cyclePrepared=!0),l<r?this.phase="assemble":l<a?this.phase="hold":l<o?this.phase="leave":this.phase="dissolve";const h=this.screenLock&&l>=r&&l<a;if(h){const D=l-r,P=a-l,N=yn(0,sh,D),G=yn(0,sh,P);this._domOverlayAlpha=Math.min(N,G)}else this._holdScreenPos=null,this._domOverlayAlpha=0;const d=r+(a-r)*oi.clamp(this.billboardRelease,0,1),u=this.screenLock&&l<a;let p;if(u||l<=d?p=1:l<=a?p=1-yn(d,a,l):p=0,u)this._planeQuat.copy(t.quaternion);else if(p>.001){const D=1-Math.pow(8e-4,i*Math.max(p,.05));this._planeQuat.slerp(t.quaternion,Math.min(1,D))}if(this.screenLock){const D=1-Math.pow(8e-4,i*aS),P=Math.min(1,D);this._slotOffset.right+=(this._slotTargetOffset.right-this._slotOffset.right)*P,this._slotOffset.up+=(this._slotTargetOffset.up-this._slotOffset.up)*P}const g=Math.min(this.holdDuration,this.maxPositionChaseSeconds),x=r+g*oi.clamp(this.positionRelease,0,1),m=r+g;let f;if(u||l<=x?f=1:l<=m?f=1-yn(x,m,l):f=0,u)this._computeLayoutCenter(t,this._planeCenter);else if(f>.001){this._computeDesiredCenter(e,t,this._tmpDesired);const D=this.followSmoothing*f,P=1-Math.pow(8e-4,i*Math.max(D,1e-4));this._planeCenter.lerp(this._tmpDesired,Math.min(1,P))}if(h){const D=this._projectToScreen(t);if(!this._holdScreenPos)this._holdScreenPos=D;else{const P=D.x-this._holdScreenPos.x,N=D.y-this._holdScreenPos.y;if(Math.hypot(P,N)>=nS)this._holdScreenPos=D;else{const G=Math.min(1,1-Math.pow(8e-4,i*iS));this._holdScreenPos={x:this._holdScreenPos.x+P*G,y:this._holdScreenPos.y+N*G,widthPercent:this._holdScreenPos.widthPercent+(D.widthPercent-this._holdScreenPos.widthPercent)*G,heightPercent:this._holdScreenPos.heightPercent+(D.heightPercent-this._holdScreenPos.heightPercent)*G}}}}this.points.position.copy(this._planeCenter),this.points.quaternion.copy(this._planeQuat),this.glyphMesh.position.copy(this._planeCenter),this.glyphMesh.quaternion.copy(this._planeQuat),this.points.visible=!0;const M=yn(s,r,l),b=yn(o,c,l);this.particleUniforms.uAssembleProgress.value=M,this.particleUniforms.uDissolveProgress.value=b;const y=yn(r-Math.min(.4,this.assembleDuration),r,l),E=a+oS,R=1-yn(a,E,l),_=y*R;this.glyphMesh.visible=l<a,this.glyphMaterial.opacity=oi.clamp(y,0,1)*(1-this._domOverlayAlpha);const C=1-_*.5;this.particleUniforms.uParticleContribution.value=this.particleContribution*C}dispose(){this._disposed||(this._disposed=!0,this._scene&&(this._scene.remove(this.points),this._scene.remove(this.glyphMesh)),this.points.geometry.dispose(),this.points.material.dispose(),this.glyphMesh.geometry.dispose(),this.glyphMaterial.map&&this.glyphMaterial.map.dispose(),this.glyphMaterial.dispose(),this.enabled=!1)}}function uS(n){let e=n>>>0;return function(){e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function er(n,e,t){const i=Math.min(Math.max((t-n)/(e-n),0),1);return i*i*(3-2*i)}const hS=224,dS=48,fS=6,pS=new ae(16769187);class mS{constructor(e,t={}){this.scene=e,this.maxParticles=t.maxParticles||hS,this.glintPerPhrase=t.glintPerPhrase||dS,this.mistPerPhrase=t.mistPerPhrase||fS;const i=new At,s=new Float32Array(this.maxParticles*3),r=new Float32Array(this.maxParticles),a=new Float32Array(this.maxParticles),o=new Float32Array(this.maxParticles);i.setAttribute("position",new We(s,3).setUsage(si)),i.setAttribute("aAlpha",new We(r,1).setUsage(si)),i.setAttribute("aSize",new We(a,1).setUsage(si)),i.setAttribute("aSeed",new We(o,1).setUsage(si)),this._geo=i,this._posAttr=i.attributes.position,this._alphaAttr=i.attributes.aAlpha,this._sizeAttr=i.attributes.aSize,this._seedAttr=i.attributes.aSeed,this._uniforms={uColor:{value:pS.clone()},uPixelSize:{value:90}};const c=new ot({transparent:!0,depthWrite:!1,depthTest:!0,toneMapped:!1,blending:jn,uniforms:this._uniforms,vertexShader:`
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
      `});this._points=new Is(i,c),this._points.frustumCulled=!1,e.add(this._points),this._slotOwner=new Array(this.maxParticles).fill(null),this._freeSlots=[];for(let l=this.maxParticles-1;l>=0;l--)this._freeSlots.push(l);this._phrases=new Map,this._tmp=new A}activeCount(){return this._phrases.size}particlesInUse(){return this.maxParticles-this._freeSlots.length}beginDissolve(e,{origins:t,dissolveStart:i,totalDuration:s,seed:r,backwardDir:a,upDir:o}){if(this._phrases.has(e))return;let c=this.glintPerPhrase,l=this.mistPerPhrase;const h=c+l;if(this._freeSlots.length<h){const E=this._freeSlots.length/h;c=Math.max(0,Math.floor(c*E)),l=Math.max(0,Math.floor(l*E))}const d=Math.min(c+l,this._freeSlots.length,t.length);if(d<=0)return;const u=uS(r),p=Math.min(c,d),g=new Int32Array(d),x=new Uint8Array(d),m=new Float32Array(d*3),f=new Float32Array(d*3),M=new Float32Array(d*3),b=new Float32Array(d),y=new Float32Array(d);for(let E=0;E<d;E++){const T=this._freeSlots.pop();g[E]=T,this._slotOwner[T]=e;const R=E>=p;x[E]=R?1:0;const _=t[E];m[E*3+0]=_.x,m[E*3+1]=_.y,m[E*3+2]=_.z;const C=R?1.4:.6;f[E*3+0]=(u()-.5)*C,f[E*3+1]=(u()-.5)*C*.6,f[E*3+2]=(u()-.5)*C,b[E]=u()*.35*s;const D=u()*Math.PI*2,P=(R?.35:.7)+u()*.4,N=(R?.25:.55)+u()*.35,G=(R?.5:.3)+u()*.3;M[E*3+0]=o.x*P+a.x*N+Math.cos(D)*G,M[E*3+1]=o.y*P+a.y*N,M[E*3+2]=o.z*P+a.z*N+Math.sin(D)*G,y[E]=R?2.6+u()*1.2:.55+u()*.35,this._seedAttr.array[T]=u()}this._seedAttr.needsUpdate=!0,this._phrases.set(e,{slots:g,kind:x,origin:m,jitter:f,velocity:M,lifeOffset:b,sizeBase:y,dissolveStart:i,totalDuration:Math.max(.1,s)})}update(e){if(this._phrases.size===0)return;const t=this._posAttr.array,i=this._alphaAttr.array,s=this._sizeAttr.array;let r=!1;for(const[a,o]of this._phrases){const c=e-o.dissolveStart;if(c>=o.totalDuration){this._releaseEntry(a,o),r=!0;continue}r=!0;const l=o.slots.length;for(let h=0;h<l;h++){const d=o.slots[h],u=Math.max(0,c<0?0:c-o.lifeOffset[h]),p=Math.max(.05,o.totalDuration-o.lifeOffset[h]),g=Math.min(1,u/p),x=er(0,.3,g);if(t[d*3+0]=o.origin[h*3+0]+o.jitter[h*3+0]*x+o.velocity[h*3+0]*u,t[d*3+1]=o.origin[h*3+1]+o.jitter[h*3+1]*x+o.velocity[h*3+1]*u,t[d*3+2]=o.origin[h*3+2]+o.jitter[h*3+2]*x+o.velocity[h*3+2]*u,o.kind[h]===1){const m=er(0,.3,g),f=1-er(.45,1,g);i[d]=m*f*.32,s[d]=o.sizeBase[h]*(1+g*1.6)}else{const m=er(0,.12,g),f=1-er(.55,1,g);i[d]=m*f,s[d]=o.sizeBase[h]*(1+g*.5)}}}r&&(this._posAttr.needsUpdate=!0,this._alphaAttr.needsUpdate=!0,this._sizeAttr.needsUpdate=!0,this._geo.computeBoundingSphere())}_releaseEntry(e,t){for(let i=0;i<t.slots.length;i++){const s=t.slots[i];this._alphaAttr.array[s]=0,this._sizeAttr.array[s]=0,this._slotOwner[s]=null,this._freeSlots.push(s)}this._phrases.delete(e)}releasePhrase(e){const t=this._phrases.get(e);t&&(this._releaseEntry(e,t),this._alphaAttr.needsUpdate=!0,this._sizeAttr.needsUpdate=!0)}clear(){for(const e of[...this._phrases.keys()])this.releasePhrase(e)}dispose(){this._disposed||(this._disposed=!0,this.scene.remove(this._points),this._geo.dispose(),this._points.material.dispose(),this._phrases.clear())}}class gS{constructor(e,t={}){this.scene=e,this.maxActive=t.maxActive||8,this._active=[],this.dissolve=new mS(e,t.dissolve||{}),this._lastCamera=null,this._lastLayoutMode="SINGLE_COLUMN",this._tmpBackward=new A}has(e){return this._active.some(t=>t.id===e)}getActiveIds(){return this._active.map(e=>e.id)}getActiveEntries(){return this._active}getActivePhrases(){return this._active.map(e=>e.phrase)}getLayoutMode(){return this._lastLayoutMode}getNewestActivePhrase(){return this._active.length?this._active[this._active.length-1].instance:null}getHoldOverlays(){const e=[];for(const t of this._active){const i=t.instance.getHoldOverlay();i&&e.push({id:t.id,...i})}return e}spawn(e){if(this.has(e.id))return;if(this._active.length>=this.maxActive){const a=this._active.shift();console.warn(`[TrailLyricsManager] active phrase cap (${this.maxActive}) reached — evicting oldest "${a.id}" to spawn "${e.id}".`),a.instance.dispose(),this.dissolve.releasePhrase(a.id)}const t=lh(e.id),i={...e.trailLyricsConfig};this._glyphShadowStrength!==void 0&&(i.shadowStrength=this._glyphShadowStrength),this._glyphTextColor!==void 0&&(i.textColor=this._glyphTextColor),this._glyphShadowColor!==void 0&&(i.shadowColor=this._glyphShadowColor),this._glyphOutlineWidth!==void 0&&(i.outlineWidth=this._glyphOutlineWidth),this._glyphOutlineColor!==void 0&&(i.outlineColor=this._glyphOutlineColor),this._glyphFontFamily!==void 0&&(i.fontFamily=this._glyphFontFamily),this._glyphFontWeight!==void 0&&(i.fontWeight=this._glyphFontWeight),this._glyphFontSizeScale!==void 0&&(i.fontSizeScale=this._glyphFontSizeScale),this._leaveDuration!==void 0&&(i.leaveDuration=this._leaveDuration),this._dissolveDuration!==void 0&&(i.dissolveDuration=this._dissolveDuration),this._particleCount!==void 0&&(i.particleCount=this._particleCount);let s=e.displayLines.join(`
`);if(i.screenLock){const a={fontWeight:i.fontWeight??600,fontFamily:i.fontFamily??vS,fontSizeScale:i.fontSizeScale??1},c=this._halfColumnWorldWidthEstimate()/zl;s=tS(e.displayLines,c,a).join(`
`)}const r=new cS(this.scene,{text:s,seed:t});r.loop=!1,r.beginEvent(s,i),this._active.push({id:e.id,phrase:e,instance:r,dissolveRegistered:!1}),r.screenLock&&this._recomputeLayout()}despawn(e){const t=this._active.findIndex(s=>s.id===e);if(t===-1)return;const[i]=this._active.splice(t,1);i.instance.dispose(),this.dissolve.releasePhrase(e),i.instance.screenLock&&this._recomputeLayout()}setGlyphStyle({textColor:e,shadowColor:t,shadowStrength:i,outlineWidth:s,outlineColor:r,fontFamily:a,fontWeight:o}={}){e!==void 0&&(this._glyphTextColor=e),t!==void 0&&(this._glyphShadowColor=t),i!==void 0&&(this._glyphShadowStrength=i),s!==void 0&&(this._glyphOutlineWidth=s),r!==void 0&&(this._glyphOutlineColor=r),a!==void 0&&(this._glyphFontFamily=a),o!==void 0&&(this._glyphFontWeight=o);for(const c of this._active)c.instance.setGlyphStyle({textColor:e,shadowColor:t,shadowStrength:i,outlineWidth:s,outlineColor:r,fontFamily:a,fontWeight:o})}setPhraseTiming({leaveDuration:e,dissolveDuration:t}={}){e!==void 0&&(this._leaveDuration=e),t!==void 0&&(this._dissolveDuration=t);for(const i of this._active)i.instance.configure({leaveDuration:e,dissolveDuration:t})}setParticleCount(e){this._particleCount=e}setFontSizeScale(e){this._glyphFontSizeScale=e}update(e,t,i,s){this._lastCamera=i;for(const r of this._active)r.instance.update(e,0,t,i),!r.dissolveRegistered&&r.instance.getPhase()==="leave"&&(r.dissolveRegistered=!0,this._registerDissolve(r,t),r.instance.screenLock&&this._recomputeLayout());s!=null&&this.dissolve.update(s)}_registerDissolve(e,t){const i=e.instance,s=this.dissolve.glintPerPhrase,r=this.dissolve.mistPerPhrase,a=lh(`${e.id}:dissolve`),o=i.sampleDissolveOrigins(s+r,a);if(o.length===0)return;const c=this._tmpBackward.copy(t.travelDir).multiplyScalar(-1).normalize(),l=e.phrase.endTime,h=i.leaveDuration+i.dissolveDuration;this.dissolve.beginDissolve(e.id,{origins:o,dissolveStart:l,totalDuration:h,seed:a,backwardDir:c.clone(),upDir:_S})}_recomputeLayout(){const e=this._lastCamera;if(!e)return;const t=this._active.filter(s=>s.instance.screenLock&&(s.instance.getPhase()==="travel"||s.instance.getPhase()==="assemble"||s.instance.getPhase()==="hold"));if(t.length===0)return;const i=SS(t,e);this._lastLayoutMode=i.mode;for(const s of i.assignments){const r=t.find(a=>a.id===s.id);r&&r.instance.setLayoutTarget({right:s.right,up:s.up})}}_halfColumnWorldWidthEstimate(){const e=this._lastCamera;if(!e)return 10;const{halfW:t}=Ed(e,dc),i=(wa[1]-wa[0])*t*Hl,s=wd*2*t;return(i-s)/2}clear(){for(const e of this._active)e.instance.dispose();this._active=[],this.dissolve.clear()}}const wa=[-.85,.85],ah=[-.78,.78],wd=.08,kl=.15,Hl=.92,vS='Georgia, "Times New Roman", serif',_S=new A(0,1,0);function Ed(n,e){const t=oi.degToRad(n.fov),i=e*Math.tan(t/2);return{halfW:i*n.aspect,halfH:i}}function xS(n){const e=n.instance,t=e.currentText?e.currentText.split(`
`):[""],i=e.getGlyphSize(),s=t.length>0?i.height/t.length:i.height;return{lineCount:t.length,blockHeightWorld:i.height,lineHeightWorld:s}}function oh(n){const e=n.reduce((t,i)=>t+i.lineHeightWorld,0)/Math.max(1,n.length);return Math.max(kl,e*.5)}function ws(n,e,t){const i=[];let s=t;for(const a of n)i.push(s-a.blockHeightWorld/2),s-=a.blockHeightWorld+e;return{bottomEdge:n.length?i[i.length-1]-n[n.length-1].blockHeightWorld/2:t,offsets:i}}function SS(n,e){const{halfW:t,halfH:i}=Ed(e,dc),s=(wa[1]-wa[0])*t*Hl,r=(ah[1]-ah[0])*i*Hl,a=wd*2*t,o=n.map(xS),c=r/2,l=-r/2;let h=oh(o),d=ws(o,h,c);if(d.bottomEdge<l&&n.length>1){const D=o.reduce((N,G)=>N+G.blockHeightWorld,0),P=(r-D)/(n.length-1);P>=kl&&(h=P,d=ws(o,h,c))}if(d.bottomEdge>=l-1e-6)return{mode:"SINGLE_COLUMN",assignments:n.map((D,P)=>({id:D.id,right:0,up:d.offsets[P]}))};const u=Math.ceil(n.length/2),p=n.slice(0,u),g=n.slice(u),x=o.slice(0,u),m=o.slice(u);let f=oh(o),M=ws(x,f,c),b=ws(m,f,c);if(Math.min(M.bottomEdge,b.bottomEdge)<l){const D=M.bottomEdge<=b.bottomEdge?x:m;if(D.length>1){const P=D.reduce((G,Z)=>G+Z.blockHeightWorld,0),N=(r-P)/(D.length-1);f=Math.max(kl*.4,Math.min(f,N))}M=ws(x,f,c),b=ws(m,f,c)}const E=(s-a)/2,T=-(a/2+E/2),R=a/2+E/2,_=[];p.forEach((D,P)=>_.push({id:D.id,right:T,up:M.offsets[P]})),g.forEach((D,P)=>_.push({id:D.id,right:R,up:b.offsets[P]}));const C=r/2;for(const D of _)D.up=oi.clamp(D.up,-C,C);return{mode:"MULTI_COLUMN",assignments:_}}function lh(n){let e=2166136261;for(let t=0;t<n.length;t++)e^=n.charCodeAt(t),e=Math.imul(e,16777619);return e>>>0}function ch(n){let e=n>>>0;return function(){e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function yS(n,e,t){const i=Math.min(Math.max((t-n)/(e-n),0),1);return i*i*(3-2*i)}const uh=new A(0,1,0),lr=[{key:"directRear",label:"Direct Rear",weight:1.4,lyricSafe:!0,compute(n,e){const{head:t,forward:i,up:s}=n;e.pos.copy(t).addScaledVector(i,-26).addScaledVector(s,7),e.look.copy(t).addScaledVector(i,6)}},{key:"rearThreeQuarter",label:"Rear Three-Quarter",weight:1.5,lyricSafe:!0,compute(n,e){const{head:t,forward:i,right:s,up:r}=n;e.pos.copy(t).addScaledVector(i,-24).addScaledVector(s,17).addScaledVector(r,9),e.look.copy(t).addScaledVector(i,8).addScaledVector(s,-4)}},{key:"sideFollow",label:"Side Follow",weight:1.2,lyricSafe:!1,compute(n,e){const{head:t,forward:i,right:s,up:r,director:a}=n,o=a._sideSign||1;e.pos.copy(t).addScaledVector(s,o*30).addScaledVector(i,-6).addScaledVector(r,8),e.look.copy(t).addScaledVector(i,5)}},{key:"wideChase",label:"Wide Chase",weight:1,lyricSafe:!0,compute(n,e){const{head:t,forward:i,right:s,up:r}=n;e.pos.copy(t).addScaledVector(i,-55).addScaledVector(s,14).addScaledVector(r,24),e.look.copy(t).addScaledVector(i,16)}},{key:"lowSkim",label:"Low Skim",weight:.8,lyricSafe:!1,compute(n,e){const{head:t,forward:i,right:s,ocean:r,time:a,dt:o,director:c}=n,l=2.2,h=t.x+i.x*-14+s.x*5,d=t.z+i.z*-14+s.z*5,p=(r?r.heightAt(h,d,a):0)+l;c._lowSkimY==null&&(c._lowSkimY=p);const g=1-Math.pow(8e-4,o*4);c._lowSkimY=oi.lerp(c._lowSkimY,p,g);const x=Math.max(c._lowSkimY,p);e.pos.set(h,x,d),e.look.copy(t).addScaledVector(i,5)}},{key:"frontThreeQuarter",label:"Front Three-Quarter",weight:.6,lyricSafe:!1,compute(n,e){const{head:t,forward:i,right:s,up:r}=n;e.pos.copy(t).addScaledVector(i,20).addScaledVector(s,20).addScaledVector(r,8),e.look.copy(t).addScaledVector(i,-4)}},{key:"highOrbit",label:"High Orbit",weight:.7,lyricSafe:!1,compute(n,e){const{head:t,forward:i,right:s,up:r,dt:a,director:o}=n,c=32,l=20,h=.5;o._orbitAngle+=a*h;const d=o._orbitAngle;e.pos.copy(t).addScaledVector(i,-Math.cos(d)*c).addScaledVector(s,Math.sin(d)*c).addScaledVector(r,l),e.look.copy(t).addScaledVector(r,2)}},{key:"bellySkim",label:"Belly Skim",weight:.6,lyricSafe:!1,compute(n,e){const{head:t,forward:i,right:s,ocean:r,time:a,dt:o,director:c,up:l}=n,h=2,d=t.x+i.x*16+s.x*9,u=t.z+i.z*16+s.z*9,g=(r?r.heightAt(d,u,a):0)+h;c._bellySkimY==null&&(c._bellySkimY=g);const x=1-Math.pow(8e-4,o*4);c._bellySkimY=oi.lerp(c._bellySkimY,g,x);const m=Math.max(c._bellySkimY,g);e.pos.set(d,m,u),e.look.copy(t).addScaledVector(l,1.5)}}],Es=new Map(lr.map(n=>[n.key,n])),hh="rearThreeQuarter";function MS(n,e){const t=[n,e].sort().join("|");return t==="directRear|rearThreeQuarter"?.85:t==="rearThreeQuarter|sideFollow"?.5:n==="wideChase"||e==="wideChase"?.25:n==="lowSkim"||e==="lowSkim"||n==="frontThreeQuarter"||e==="frontThreeQuarter"||n==="bellySkim"||e==="bellySkim"?.2:n==="highOrbit"||e==="highOrbit"?.4:.55}class fc{constructor(e={}){this.enabled=!1,this.auto=!0,this.paused=!1,this.allowCuts=!1,this.cameraMode=e.mode||hh,this.seed=e.seed>>>0||1234,this.minShotDuration=9,this.maxShotDuration=16,this.transitionTime=2.6,this._rand=ch(this.seed),this._shotElapsed=0,this._shotDuration=this.minShotDuration,this._lyricLocked=!1,this._sideSign=this._rand()<.5?-1:1,this._lowSkimY=null,this._bellySkimY=null,this._orbitAngle=0,this._transition=null,this._transFromPos=new A,this._transFromLook=new A,this.lastAutoShots=[],this._forward=new A,this._right=new A,this._toPos=new A,this._toLook=new A,this._lookBlend=new A,this._out={pos:this._toPos,look:this._toLook},this._ctx={head:new A,forward:this._forward,right:this._right,up:uh,ocean:null,time:0,dt:0,director:this}}static get presetLabels(){const e={};for(const t of lr)e[t.label]=t.key;return e}static get presetKeys(){return lr.map(e=>e.key)}_isLyricSafe(e){const t=Es.get(e);return!t||t.lyricSafe}_pickWeighted(e){let t=0;for(const s of e)t+=s.weight;let i=this._rand()*t;for(const s of e)if(i-=s.weight,i<=0)return s.key;return e[e.length-1].key}_pickNextMode(e){const t=lr.filter(r=>r.key!==this.cameraMode&&(!e||r.lyricSafe));if(t.length===0)return this.cameraMode;const i=this._prevMode,s=t.map(r=>({key:r.key,weight:r.key===i?r.weight*.5:r.weight}));return this._pickWeighted(s)}_pickDuration(){return this.minShotDuration+this._rand()*Math.max(.001,this.maxShotDuration-this.minShotDuration)}_pickTransition(e,t){if(!this.allowCuts)return"smooth";const i=MS(e,t);return this._rand()<i?"smooth":"cut"}setMode(e,t,i,s){if(!Es.has(e))return;const r=this.cameraMode,a=t||this._pickTransition(r,e);return this._prevMode=r,this.cameraMode=e,e==="sideFollow"&&(this._sideSign=this._rand()<.5?-1:1),e==="highOrbit"&&(this._orbitAngle=0),a==="smooth"&&i&&s?(this._transFromPos.copy(i),this._transFromLook.copy(s),this._transition={duration:Math.max(.05,this.transitionTime),elapsed:0}):this._transition=null,a}requestNextShot(e,t){if(!this.auto)return;const i=this._lyricLocked,s=this._pickNextMode(i),r=this._pickDuration(),a=this.setMode(s,void 0,e,t);this._shotElapsed=0,this._shotDuration=r,this._recordShot(s,r,a)}_recordShot(e,t,i){this.lastAutoShots.push({mode:e,duration:+t.toFixed(2),transition:i}),this.lastAutoShots.length>10&&this.lastAutoShots.shift()}restart(){this._rand=ch(this.seed),this._shotElapsed=0,this._prevMode=null,this._sideSign=this._rand()<.5?-1:1,this.lastAutoShots.length=0,this._transition=null,this.auto&&(this.cameraMode=this._pickWeighted(lr),this._shotDuration=this._pickDuration(),this._recordShot(this.cameraMode,this._shotDuration,"cut"))}_basis(e){this._forward.copy(e.travelDir),this._forward.lengthSq()<1e-8&&this._forward.set(0,0,-1),this._right.crossVectors(this._forward,uh),this._right.lengthSq()<1e-6?this._right.set(1,0,0):this._right.normalize()}update(e,t,i,s,r,a){if(!this.enabled||!t||this.paused)return;this._basis(t);const o=this._ctx;t.getHeadPosition(o.head),o.ocean=r,o.time=a,o.dt=e;const c=i?i.getPhase():null,l=c==="travel"||c==="assemble"||c==="hold";if(this.auto&&l&&!this._lyricLocked&&!this._isLyricSafe(this.cameraMode)&&(Es.get(this.cameraMode).compute(o,this._out),this.setMode(this._pickNextMode(!0),"cut",this._toPos,this._toLook)),this._lyricLocked=l,this.auto&&(this._shotElapsed+=e,this._shotElapsed>=this._shotDuration)){const d=this._pickNextMode(l),u=this._pickDuration();Es.get(this.cameraMode).compute(o,this._out);const p=this.setMode(d,void 0,this._toPos,this._toLook);this._shotElapsed=0,this._shotDuration=u,this._recordShot(d,u,p)}if((Es.get(this.cameraMode)||Es.get(hh)).compute(o,this._out),this._transition){this._transition.elapsed+=e;const d=yS(0,1,Math.min(1,this._transition.elapsed/this._transition.duration));s.position.lerpVectors(this._transFromPos,this._toPos,d),this._lookBlend.copy(this._transFromLook).lerp(this._toLook,d),s.lookAt(this._lookBlend),d>=1&&(this._transition=null)}else s.position.copy(this._toPos),s.lookAt(this._toLook)}}class pc{static DEFAULT_LEAVE=2.5;static DEFAULT_DISSOLVE=2.5;static LAST_CUE_READ_BUFFER=.5;static MIN_LEAVE_DISSOLVE_TOTAL=.6;constructor(e,t={}){this.manager=e,this.getChoreography=t.getChoreography||(()=>null),this.baseTrailLyricsConfig=t.baseTrailLyricsConfig||(()=>({})),this.legacyHoldDefaults=t.legacyHoldDefaults||{trail:2,hero:2.6},this.enabled=!0,this.paused=!1,this.speed=1,this.time=0,this.spawningEnabled=!0,this.onEventStart=t.onEventStart||null,this.rawCues=[],this.timingLoaded=!1,this.timingErrors=[],this.events=[]}_groupCues(e){const t=e.map(a=>({cue:a,choreo:this.getChoreography(a.index)})),i=new Map,s=[];let r=null;for(let a=0;a<t.length;a++){const o=t[a],c=!!(o.choreo&&o.choreo.runtimeEnabled),l=o.cue.group;let h=l;if(c&&l!=null){const d=i.get(l);d!==void 0&&d!==a-1&&(console.error(`[LyricTimeline] group "${l}" is not contiguous — cue ${o.cue.index} reuses it non-adjacently; treating this occurrence as ungrouped.`),h=null),i.set(l,a)}r&&r.enabled===c&&c&&h!=null&&r.group===h?r.members.push(o):(r={members:[o],enabled:c,group:c?h:null},s.push(r))}return s}_resolvePhraseGroup(e){const t=e.members.map(m=>m.cue),i=e.members[0].choreo,s=t[0],r=t[t.length-1],a=t.length>1?`cue-${s.index}-${r.index}`:`cue-${s.index}`;if(t.some(m=>typeof m.time!="number"||!Number.isFinite(m.time)||m.time<0))return console.error(`[LyricTimeline] ${a}: one or more member cues have an invalid time — excluded from schedule.`),this.timingErrors.push(a),null;const c=s.time,l=r.time,h=i.preRoll,d=Math.max(0,c-h),u=Math.max(.3,c-d),p=Math.min(h,u);let g=null;if(t.every(m=>typeof m.endTime=="number"&&Number.isFinite(m.endTime))){const m=t.find(f=>f.endTime<=f.time);m?console.error(`[LyricTimeline] ${a}: cue ${m.index} has endTime (${m.endTime}) <= its own time (${m.time}) — ignoring endTime for this phrase, using legacy fallback instead.`):g=Math.max(...t.map(f=>f.endTime))}return{id:a,sourceCueIndices:t.map(m=>m.index),sourceTexts:t.map(m=>m.text),sourceTimes:t.map(m=>m.time),sourceEndTimes:t.map(m=>typeof m.endTime=="number"&&Number.isFinite(m.endTime)?m.endTime:null),displayLines:t.map(m=>m.text),group:e.group,designType:i.designType,runtimeType:i.runtimeType,camera:i.camera,leaveBehind:i.leaveBehind,section:i.section,firstVocalTime:c,lastVocalTime:l,authoredEndTime:g,preRoll:h,triggerTime:d,assembleDuration:p,trailLyricsConfig:this.baseTrailLyricsConfig(i)}}setTimingData(e){this.rawCues=e,this.timingErrors=[];const t=[...e].sort((r,a)=>r.index-a.index),i=this._groupCues(t),s=[];for(const r of i){if(!r.enabled)continue;const a=this._resolvePhraseGroup(r);a&&s.push(a)}s.sort((r,a)=>r.triggerTime-a.triggerTime),this.events=this._resolveEndTimes(s),this.timingLoaded=!0,this.setTime(this.time)}_resolveEndTimes(e){const{DEFAULT_LEAVE:t,DEFAULT_DISSOLVE:i,LAST_CUE_READ_BUFFER:s,MIN_LEAVE_DISSOLVE_TOTAL:r}=pc;for(const a of e)if(a.authoredEndTime!==null)a.holdDuration=Math.max(.3,a.authoredEndTime-(a.triggerTime+a.assembleDuration)),a.holdEnd=a.authoredEndTime,a.leaveDuration=t,a.dissolveDuration=i;else{const o=a.lastVocalTime+s,c=Math.max(0,o-(a.triggerTime+a.assembleDuration)),l=this.legacyHoldDefaults[a.runtimeType]??this.legacyHoldDefaults.trail;a.holdDuration=Math.max(l,c),a.holdEnd=a.triggerTime+a.assembleDuration+a.holdDuration}for(let a=0;a<e.length;a++){const o=e[a],c=e[a+1],l=c?c.triggerTime:1/0;if(o.authoredEndTime!==null){Number.isFinite(l)&&o.holdEnd+o.leaveDuration+o.dissolveDuration>l&&console.warn(`[LyricTimeline] ${o.id}: authored display window (ends ~${(o.holdEnd+o.leaveDuration+o.dissolveDuration).toFixed(2)}s) overlaps next phrase "${c.id}"'s trigger (${l.toFixed(2)}s) — the single shared TrailLyrics instance will cut "${o.id}" short when "${c.id}" fires. This reflects the authoring data's intentional overlap, not a bug; not auto-corrected.`),o.endTime=o.holdEnd;continue}const h=l-o.holdEnd;if(!Number.isFinite(h))o.leaveDuration=t,o.dissolveDuration=i;else if(h<0)console.error(`[LyricTimeline] ${o.id}: requested hold overruns next phrase "${c.id}"'s trigger by ${(-h).toFixed(2)}s — clamping hold; report for choreography tuning.`),o.holdDuration=Math.max(0,o.holdDuration+h-r),o.holdEnd=o.triggerTime+o.assembleDuration+o.holdDuration,o.leaveDuration=r/2,o.dissolveDuration=r/2;else if(h<r)console.warn(`[LyricTimeline] ${o.id}: only ${h.toFixed(2)}s available before "${c.id}" fires — using the minimum transition.`),o.leaveDuration=r/2,o.dissolveDuration=r/2;else if(h>=t+i)o.leaveDuration=t,o.dissolveDuration=i;else{const d=h/(t+i);o.leaveDuration=t*d,o.dissolveDuration=i*d}o.endTime=o.holdEnd}for(const a of e)a.trailLyricsConfig={...a.trailLyricsConfig,assembleDuration:a.assembleDuration,holdDuration:a.holdDuration,leaveDuration:a.leaveDuration,dissolveDuration:a.dissolveDuration,screenLock:a.authoredEndTime!==null,...a.authoredEndTime!==null?{textScale:rS}:{}},a.fullLifecycleEnd=a.holdEnd+a.leaveDuration+a.dissolveDuration;return e}getDebugEvents(){return this.events.map(e=>({id:e.id,sourceCueIndices:e.sourceCueIndices,sourceTexts:e.sourceTexts,sourceTimes:e.sourceTimes,sourceEndTimes:e.sourceEndTimes,displayLines:e.displayLines,group:e.group,designType:e.designType,runtimeType:e.runtimeType,firstVocalTime:e.firstVocalTime,lastVocalTime:e.lastVocalTime,authoredEndTime:e.authoredEndTime,preRoll:e.preRoll,triggerTime:e.triggerTime,endTime:e.endTime,duration:e.endTime-e.triggerTime,camera:e.camera,leaveBehind:e.leaveBehind}))}resolveDesignScore(e){const t=[...e||[]].sort((c,l)=>c.index-l.index),i=this._groupCues(t),s=[],r=[];for(const c of i){if(!c.enabled){for(const h of c.members)r.push({id:`cue-${h.cue.index}`,sourceCueIndices:[h.cue.index],sourceTexts:[h.cue.text],sourceTimes:[h.cue.time],sourceEndTimes:[typeof h.cue.endTime=="number"?h.cue.endTime:null],displayLines:[h.cue.text],group:null,designType:h.choreo?h.choreo.designType:null,runtimeType:h.choreo?h.choreo.runtimeType:null,firstVocalTime:null,lastVocalTime:null,authoredEndTime:null,preRoll:null,triggerTime:null,endTime:null,duration:null,camera:null,leaveBehind:null});continue}const l=this._resolvePhraseGroup(c);l&&s.push(l)}return s.sort((c,l)=>c.triggerTime-l.triggerTime),[...this._resolveEndTimes(s).map(c=>({id:c.id,sourceCueIndices:c.sourceCueIndices,sourceTexts:c.sourceTexts,sourceTimes:c.sourceTimes,sourceEndTimes:c.sourceEndTimes,displayLines:c.displayLines,group:c.group,designType:c.designType,runtimeType:c.runtimeType,firstVocalTime:c.firstVocalTime,lastVocalTime:c.lastVocalTime,authoredEndTime:c.authoredEndTime,preRoll:c.preRoll,triggerTime:c.triggerTime,endTime:c.endTime,duration:c.endTime-c.triggerTime,camera:c.camera,leaveBehind:c.leaveBehind})),...r].sort((c,l)=>c.sourceCueIndices[0]-l.sourceCueIndices[0])}restart(){this.manager.clear(),this.time=0,this.setTime(0)}setPaused(e){this.paused=!!e}_phrasesActiveAt(e){const t=[];for(const i of this.events)i.triggerTime<=e&&e<=i.fullLifecycleEnd&&t.push(i);return t}getActiveEvents(){return this._phrasesActiveAt(this.time)}getActiveEvent(){const e=this.getActiveEvents();return e.length?e[e.length-1]:null}getNextEvent(){for(const e of this.events)if(e.triggerTime>this.time)return e;return null}setTime(e){if(this.time=Math.max(0,e),!this.spawningEnabled)return;const t=this._phrasesActiveAt(this.time),i=new Set(t.map(s=>s.id));for(const s of this.manager.getActiveIds())i.has(s)||this.manager.despawn(s);for(const s of t)this.manager.has(s.id)||(this.manager.spawn(s),this.onEventStart&&this.onEventStart(s))}update(e){!this.enabled||this.paused||this.setTime(this.time+e*this.speed)}}const dh=.6,bS=1,wS=new Set([2,3]);function fh(n,e,t){const i=Math.min(Math.max((t-n)/(e-n),0),1);return i*i*(3-2*i)}function ph(n,e){if(e<=n.time||e>=n.endTime)return 0;const t=fh(n.time,n.time+dh,e),i=1-fh(n.endTime-dh,n.endTime,e);return Math.min(t,i)}class ES{constructor(e,t){this.titleEl=e,this.creditEl=t,this.titleCue=null,this.creditCues=[],this._lastSource=null}_syncCues(e){if(!(!e||e===this._lastSource)){this._lastSource=e,this.titleCue=null,this.creditCues=[];for(const t of e)t.index===bS?this.titleCue=t:wS.has(t.index)&&this.creditCues.push(t);this.titleEl.textContent=this.titleCue?this.titleCue.text:""}}update(e,t){this._syncCues(t);const i=this.titleCue?ph(this.titleCue,e):0;this.titleEl.style.opacity=i.toFixed(3);const s=[];for(const r of this.creditCues){const a=ph(r,e);a>0&&s.push({cue:r,op:a})}s.sort((r,a)=>r.cue.time-a.cue.time),this._renderCreditLines(s)}_renderCreditLines(e){const t=this.creditEl;for(;t.children.length>e.length;)t.removeChild(t.lastChild);for(;t.children.length<e.length;)t.appendChild(document.createElement("div"));e.forEach(({cue:i,op:s},r)=>{const a=t.children[r];a.textContent=i.text,a.style.opacity=s.toFixed(3)})}}class TS{constructor(e){this.src=e,this.audio=new Audio(e),this.audio.preload="auto",this.audio.loop=!1,this.audio.volume=.8,this.loaded=!1,this.loadError=null,this.lastPlayError=null,this.audio.addEventListener("loadedmetadata",()=>{this.loaded=!0}),this.audio.addEventListener("error",()=>{this.loadError=this.audio.error?this.audio.error.message||String(this.audio.error.code):"unknown audio error"})}get currentTime(){return this.audio.currentTime||0}get duration(){return Number.isFinite(this.audio.duration)?this.audio.duration:0}get paused(){return this.audio.paused}get volume(){return this.audio.volume}get playbackRate(){return this.audio.playbackRate}async play(){try{return await this.audio.play(),this.lastPlayError=null,!0}catch(e){return this.lastPlayError=e&&e.message?e.message:String(e),!1}}pause(){this.audio.pause()}setSrc(e){this.audio.pause(),this.src=e,this.loaded=!1,this.loadError=null,this.audio.src=e,this.audio.load()}setTime(e){const t=this.duration>0?Math.min(Math.max(0,e),this.duration):Math.max(0,e);this.audio.currentTime=t}restart(){this.setTime(0)}setVolume(e){this.audio.volume=Math.min(1,Math.max(0,e))}setPlaybackRate(e){this.audio.playbackRate=Math.min(4,Math.max(.25,e))}}const mh={hero:{textScale:1.3,particleContribution:1.15},trail:{textScale:1,particleContribution:1}},Jt=1.4,Bo=1.7,tr=1.5,ir=1.2,AS=1.9,gh={4:1.8,5:1.4},CS=2,RS=2.6,PS={designType:"TRAIL",runtimeType:"trail",preRoll:Jt,camera:null,leaveBehind:!0,section:null},DS={4:{designType:"HERO",runtimeType:"hero",preRoll:gh[4],camera:"directRear",leaveBehind:!0,section:"VERSE_A"},5:{designType:"TRAIL",runtimeType:"trail",preRoll:gh[5],camera:"rearThreeQuarter",leaveBehind:!0,section:"VERSE_A"},7:{designType:"TRAIL",runtimeType:"trail",preRoll:Jt,camera:"sideFollow",leaveBehind:!0,section:"VERSE_A"},8:{designType:"TRAIL",runtimeType:"trail",preRoll:Jt,camera:"rearThreeQuarter",leaveBehind:!0,section:"VERSE_A"},10:{designType:"TRAIL",runtimeType:"trail",preRoll:Jt,camera:"sideFollow",leaveBehind:!0,section:"VERSE_A"},12:{designType:"TRAIL",runtimeType:"trail",preRoll:Jt,camera:"wideChase",leaveBehind:!0,section:"PRE_CHORUS_A"},15:{designType:"TRAIL",runtimeType:"trail",preRoll:Jt,camera:"directRear",leaveBehind:!0,section:"PRE_CHORUS_A"},16:{designType:"HERO",runtimeType:"hero",preRoll:Bo,camera:"directRear",leaveBehind:!0,section:"CHORUS_A"},17:{designType:"TRAIL",runtimeType:"trail",preRoll:Jt,camera:"rearThreeQuarter",leaveBehind:!0,section:"CHORUS_A"},18:{designType:"TRAIL",runtimeType:"trail",preRoll:Jt,camera:"sideFollow",leaveBehind:!0,section:"CHORUS_A"},19:{designType:"TRAIL",runtimeType:"trail",preRoll:Jt,camera:"sideFollow",leaveBehind:!0,section:"CHORUS_A"},20:{designType:"HERO",runtimeType:"hero",preRoll:Bo,camera:"directRear",leaveBehind:!0,section:"CHORUS_A"},21:{designType:"ECHO",runtimeType:"trail",preRoll:ir,camera:"sideFollow",leaveBehind:!0,section:"VERSE_B"},22:{designType:"ECHO",runtimeType:"trail",preRoll:ir,camera:"sideFollow",leaveBehind:!0,section:"VERSE_B"},23:{designType:"TRAIL",runtimeType:"trail",preRoll:Jt,camera:"sideFollow",leaveBehind:!0,section:"VERSE_B"},25:{designType:"TRAIL",runtimeType:"trail",preRoll:Jt,camera:"wideChase",leaveBehind:!0,section:"VERSE_B"},27:{designType:"TRAIL",runtimeType:"trail",preRoll:Jt,camera:"directRear",leaveBehind:!0,section:"VERSE_B"},29:{designType:"TRAIL",runtimeType:"trail",preRoll:Jt,camera:"wideChase",leaveBehind:!0,section:"PRE_CHORUS_B"},32:{designType:"TRAIL",runtimeType:"trail",preRoll:Jt,camera:"directRear",leaveBehind:!0,section:"PRE_CHORUS_B"},33:{designType:"HERO",runtimeType:"hero",preRoll:Bo,camera:"directRear",leaveBehind:!0,section:"CHORUS_B"},34:{designType:"TRAIL",runtimeType:"trail",preRoll:Jt,camera:"rearThreeQuarter",leaveBehind:!0,section:"CHORUS_B"},36:{designType:"FIELD",runtimeType:"trail",preRoll:tr,camera:"directRear",leaveBehind:!0,section:"CHORUS_B"},37:{designType:"FIELD",runtimeType:"trail",preRoll:tr,camera:"sideFollow",leaveBehind:!0,section:"OUTRO_TAG"},38:{designType:"FIELD",runtimeType:"trail",preRoll:tr,camera:"sideFollow",leaveBehind:!0,section:"OUTRO_TAG"},39:{designType:"FIELD",runtimeType:"trail",preRoll:tr,camera:"wideChase",leaveBehind:!0,section:"OUTRO_TAG"},40:{designType:"FIELD",runtimeType:"trail",preRoll:tr,camera:"wideChase",leaveBehind:!0,section:"OUTRO_TAG"},41:{designType:"ECHO",runtimeType:"trail",preRoll:ir,camera:"sideFollow",leaveBehind:!0,section:"OUTRO_TAG"},42:{designType:"ECHO",runtimeType:"trail",preRoll:ir,camera:"sideFollow",leaveBehind:!0,section:"OUTRO_TAG"},43:{designType:"ECHO",runtimeType:"trail",preRoll:ir,camera:"wideChase",leaveBehind:!0,section:"OUTRO_TAG"},44:{designType:"FINALE",runtimeType:"hero",preRoll:AS,camera:"directRear",leaveBehind:!0,section:"OUTRO_TAG"}},LS={1:{designType:"TITLE",runtimeType:null,preRoll:null,camera:null,leaveBehind:null,section:"INTRO_CREDITS"},2:{designType:"CREDIT",runtimeType:null,preRoll:null,camera:null,leaveBehind:null,section:"INTRO_CREDITS"},3:{designType:"CREDIT",runtimeType:null,preRoll:null,camera:null,leaveBehind:null,section:"INTRO_CREDITS"}},vh={min:4,max:44},IS=new Set([1,2,3]);function ga(n){if(IS.has(n))return{...LS[n],runtimeEnabled:!1};if(n>=vh.min&&n<=vh.max){const e=DS[n];return{...PS,...e||{},runtimeEnabled:!0}}return null}function FS(n){return mh[n]||mh.trail}function NS(n){return{travelDuration:0,formationDistance:.65,...FS(n.runtimeType)}}const US=new Set(["TITLE","CREDIT","TRAIL","HERO","FIELD","ECHO","FINALE"]),OS=new Set(["trail","hero"]),BS={TITLE:[null],CREDIT:[null],TRAIL:["trail"],HERO:["hero"],FIELD:["trail"],ECHO:["trail"],FINALE:["hero"]},zS=new Set(["directRear","rearThreeQuarter","sideFollow","wideChase"]);function kS(){const n=[];for(let e=1;e<=44;e++){const t=ga(e);if(!t){n.push(`cue ${e}: getChoreography() returned null`);continue}US.has(t.designType)||n.push(`cue ${e}: invalid designType "${t.designType}"`),t.runtimeType!==null&&!OS.has(t.runtimeType)&&n.push(`cue ${e}: invalid runtimeType "${t.runtimeType}"`),(BS[t.designType]||[]).includes(t.runtimeType)||n.push(`cue ${e}: designType "${t.designType}" may not map to runtimeType "${t.runtimeType}"`),t.runtimeEnabled&&t.runtimeType===null&&n.push(`cue ${e}: runtimeEnabled but runtimeType is null`),t.camera!==null&&!zS.has(t.camera)&&n.push(`cue ${e}: camera "${t.camera}" is not one of AutoDirector's lyric-safe presets`)}return ga(0)!==null&&n.push("getChoreography(0) should return null (out of range)"),ga(45)!==null&&n.push("getChoreography(45) should return null (out of range)"),n.length>0&&console.error(`[ForeverMoreLyrics] choreography validation FAILED:
`+n.map(e=>" - "+e).join(`
`)),n}kS();const HS=new Set(["headparticles","traillyrics","lyrictimeline","autodirector","time","audio"]);function qi(n){const e=new URLSearchParams(window.location.search),t=n.toLowerCase();for(const[i,s]of e)if(i.toLowerCase()===t)return s==="1";if(HS.has(t)){for(const[i,s]of e)if(i.toLowerCase()==="play")return s==="1"}return!1}const VS=document.getElementById("app"),wn=document.getElementById("boot"),GS=document.getElementById("depth"),_h=document.getElementById("depth-state"),WS=document.getElementById("depth-val"),xh=document.getElementById("traveler-alt-val"),XS=document.getElementById("holdLyricOverlay"),YS=document.getElementById("tc-title"),qS=document.getElementById("tc-credit"),zo=document.getElementById("realTime"),$S=document.getElementById("real-time-date"),KS=document.getElementById("real-time-clock"),ZS=document.getElementById("real-time-hour"),JS=document.getElementById("real-time-colon"),QS=document.getElementById("real-time-minute"),na=document.getElementById("startOverlay"),jS=document.getElementById("start-music-btn"),Sh=document.getElementById("karaoke-checkbox"),yh=document.getElementById("without-lyrics-checkbox"),Td=document.getElementById("fullscreen-btn"),ko=document.getElementById("playpause-btn"),Ho=document.getElementById("repeat-btn");function Ad(){return!!(document.fullscreenElement||document.webkitFullscreenElement)}function Cd(){Td.classList.toggle("is-fullscreen",Ad())}Td.addEventListener("click",()=>{if(Ad()){const n=document.exitFullscreen||document.webkitExitFullscreen;n&&Promise.resolve(n.call(document)).catch(()=>{})}else{const n=document.documentElement,e=n.requestFullscreen||n.webkitRequestFullscreen;e&&Promise.resolve(e.call(n)).catch(()=>{})}});document.addEventListener("fullscreenchange",Cd);document.addEventListener("webkitfullscreenchange",Cd);const Ea="saikai",Rd="naogare_liked_"+Ea,ey=document.getElementById("like-btn"),Jn=document.getElementById("supportDialog"),ty=document.getElementById("support-dialog-close"),qn=document.getElementById("like-action-btn"),Pd=document.getElementById("like-count-label");function Dd(n){qn.classList.toggle("is-liked",n),qn.disabled=n}let Ld=!1;try{Ld=localStorage.getItem(Rd)==="1"}catch{}Dd(Ld);function iy(){Jn.hidden=!1,fetch("/api/likes").then(n=>n.json()).then(n=>{n&&n.ok&&typeof n.counts[Ea]=="number"&&(Pd.textContent=`Like (${n.counts[Ea]})`)}).catch(()=>{})}ey.addEventListener("click",iy);ty.addEventListener("click",()=>{Jn.hidden=!0});Jn.addEventListener("click",n=>{n.target===Jn&&(Jn.hidden=!0)});window.addEventListener("keydown",n=>{n.code==="Escape"&&!Jn.hidden&&(Jn.hidden=!0)});qn.addEventListener("click",()=>{qn.disabled||(qn.disabled=!0,fetch("/api/likes/"+Ea,{method:"POST"}).then(n=>n.json()).then(n=>{if(n&&n.ok){Pd.textContent=`Like (${n.count})`,Dd(!0);try{localStorage.setItem(Rd,"1")}catch{}}else qn.disabled=!1}).catch(()=>{qn.disabled=!1}))});const Nn=()=>window.innerWidth,Un=()=>window.innerHeight;function mc(n){const e=wn&&wn.querySelector("small");e&&(e.textContent=String(n).slice(0,220));const t=wn&&wn.querySelector("h1");t&&(t.textContent="Error"),wn&&wn.classList.remove("hidden")}window.addEventListener("error",n=>mc(n.message||n.error));window.addEventListener("unhandledrejection",n=>mc(n.reason));const Ft=new H_({antialias:!0,powerPreference:"high-performance",stencil:!1});Ft.setPixelRatio(Math.min(window.devicePixelRatio,2));Ft.setSize(Nn(),Un());Ft.toneMapping=Li;Ft.autoClear=!0;VS.appendChild(Ft.domElement);Ft.debug.onShaderError=(n,e,t,i)=>{const s=(o,c)=>{const l=n.getShaderInfoLog(o)||"";return l.trim()&&console.error(`[${c}] ${l}`),l},r=s(t,"vertex"),a=s(i,"fragment");mc("Shader error — see console. "+(a||r))};const li={elevation:22,azimuth:108},jt=new A;function Id(){const n=oi.degToRad(li.elevation),e=oi.degToRad(li.azimuth),t=Math.cos(n);jt.set(Math.cos(e)*t,Math.sin(n),Math.sin(e)*t).normalize()}Id();const Rn={elevation:20,azimuth:255},Wn=new A;function Fd(){const n=oi.degToRad(Rn.elevation),e=oi.degToRad(Rn.azimuth),t=Math.cos(n);Wn.set(Math.cos(e)*t,Math.sin(n),Math.sin(e)*t).normalize()}Fd();const ci=new nd,Ie=new yi(58,Nn()/Un(),.1,8e3);Ie.position.set(0,14,48);const tt=new G_(Ie,Ft.domElement);tt.enableDamping=!0;tt.dampingFactor=.06;tt.target.set(0,2,0);tt.minDistance=3;tt.maxDistance=400;tt.maxPolarAngle=Math.PI*.98;tt.enablePan=!0;tt.screenSpacePanning=!0;tt.autoRotateSpeed=.4;const Ta=22,Mh=7,ny=-8,sy=80;let Gn=7,xr=1,Pn=!1;window.addEventListener("keydown",n=>{n.code==="Space"&&(n.preventDefault(),!n.repeat&&(Pn||(Pn=!0)))});window.addEventListener("keyup",n=>{n.code==="Space"&&(n.preventDefault(),Pn=!1,xr*=-1)});window.addEventListener("blur",()=>{Pn=!1});let Vl=0,Vo=null;const bh=8,ry=35;function wh(n){if(n.beta===null||n.beta===void 0)return;if(Vo===null){Vo=n.beta;return}const e=n.beta-Vo,t=(Math.abs(e)-bh)/(ry-bh);Vl=Math.sign(e)*Math.min(1,Math.max(0,t))}qi("headParticles")&&window.addEventListener("pointerdown",function(){typeof DeviceOrientationEvent<"u"&&typeof DeviceOrientationEvent.requestPermission=="function"?DeviceOrientationEvent.requestPermission().then(e=>{e==="granted"&&window.addEventListener("deviceorientation",wh)}).catch(()=>{}):typeof DeviceOrientationEvent<"u"&&window.addEventListener("deviceorientation",wh)},{once:!0});let Cn=!1,Qn=!1;window.addEventListener("keydown",n=>{n.code==="KeyA"?(n.preventDefault(),Cn=!0):n.code==="KeyD"&&(n.preventDefault(),Qn=!0)});window.addEventListener("keyup",n=>{n.code==="KeyA"?(n.preventDefault(),Cn=!1):n.code==="KeyD"&&(n.preventDefault(),Qn=!1)});window.addEventListener("blur",()=>{Cn=!1,Qn=!1});const ay=40,oy=350;let Nd=0,Ud=0,Od=0;window.addEventListener("pointerdown",n=>{Nd=n.clientX,Ud=n.clientY,Od=performance.now()});window.addEventListener("pointerup",n=>{if(tt.enabled||n.target.closest&&n.target.closest("button, input, select, textarea, .lil-gui, .editor-ui")||performance.now()-Od>oy)return;const t=n.clientY-Ud,i=n.clientX-Nd,s=Math.abs(i),r=Math.abs(t);if(!(Math.max(s,r)<ay))if(r>=s){const a=t<0?1:-1;Pn?xr!==a&&(Pn=!1):(xr=a,Pn=!0)}else{const a=i<0;!Cn&&!Qn?(Cn=a,Qn=!a):Cn!==a&&(Cn=!1,Qn=!1)}});const sa=[-1,0,1];let Go=0,ra=0,Wo=0,Eh=!1;const gi=new xx(jt);ci.add(gi.mesh);const ne=new Sx(jt,new Re(Nn(),Un()));ne.uniforms.uNear.value=Ie.near;ne.uniforms.uFar.value=Ie.far;ci.add(ne.mesh);const Ii=new yx(jt,Ta);ci.add(Ii.mesh);const Xi=new Mx(jt,Ta,ne.uniforms);ci.add(Xi.mesh);const on=new Tx(gi.uniforms);ci.add(on.mesh);const Aa=new Ax(5e3,160);ci.add(Aa.points);const ly=qi("rain"),Dn=new Cx(ci);Dn.setEnabled(ly);window.addEventListener("keydown",n=>{n.code==="KeyR"&&(n.repeat||Dn.toggle())});let Gl=!1;window.addEventListener("keydown",n=>{if(n.code!=="KeyP"||n.repeat)return;const e=n.target,t=e&&e.tagName;t==="INPUT"||t==="SELECT"||t==="TEXTAREA"||e&&e.isContentEditable||(Gl=!0)});function cy(){Ft.domElement.toBlob(n=>{if(!n)return;const e=URL.createObjectURL(n),t=document.createElement("a"),i=new Date().toISOString().replace(/[:.]/g,"-");t.href=e,t.download=`forevermore-${i}.png`,document.body.appendChild(t),t.click(),t.remove(),URL.revokeObjectURL(e)},"image/png")}let Ua=!0;function gc(n){Ua=n,document.body.classList.toggle("presentation-mode",n)}gc(Ua);window.addEventListener("keydown",n=>{if(n.code!=="KeyH"||n.repeat)return;const e=n.target,t=e&&e.tagName;t==="INPUT"||t==="SELECT"||t==="TEXTAREA"||e&&e.isContentEditable||gc(!Ua)});window.addEventListener("keydown",n=>{if(n.code!=="KeyC"&&n.code!=="KeyV"||n.repeat||!Fe)return;const e=n.target,t=e&&e.tagName;if(!(t==="INPUT"||t==="SELECT"||t==="TEXTAREA"||e&&e.isContentEditable)){if(Fe.enabled=!0,n.code==="KeyC"){const i=fc.presetKeys,s=i[(i.indexOf(Fe.cameraMode)+1)%i.length];Fe.auto=!1,Fe.setMode(s,void 0,Ie.position,tt.target)}else Fe.auto=!0;Dt&&(Dt.enabled=Fe.enabled,Dt.auto=Fe.auto,Dt.cameraMode=Fe.cameraMode,lt.controllersRecursive().forEach(i=>i.updateDisplay()))}});const Th=400,uy=24;let nr=0,Ah=0,Bd=0,zd=0,kd=0;window.addEventListener("pointerdown",n=>{Bd=n.clientX,zd=n.clientY,kd=performance.now()});window.addEventListener("pointerup",n=>{const e=performance.now(),t=Math.hypot(n.clientX-Bd,n.clientY-zd),i=e-kd;if(t>=uy||i>=Th){nr=0;return}e-Ah>Th&&(nr=0),nr++,Ah=e,nr>=3&&(nr=0,gc(!Ua))});const Oa=qi("cinematicSunset"),hy=.75,ns=qi("night"),dy=-35,vc=.52,_c=.55,Hd=.85,Vd=.15,Gd=.6,Yi=qi("time"),nt=Yi?new Zx(ci):null;let Xo=0;const fy=[19,20,21,22,23,0];function py(n){const e=n.getWorldDirection(new A),t=new A(e.x,0,e.z).normalize(),i=n.position.clone().addScaledVector(t,5e3);return i.y=Wi.surfaceY,i.project(n).y}function my(n,e,t,i){const s=new A;let r=Wi.surfaceY,a=Wi.surfaceY+3e3;for(let o=0;o<24;o++){const c=(r+a)/2;s.set(e,c,t).project(n),s.y<i?r=c:a=c}return(r+a)/2}function gy(n,e){const t=n.getWorldDirection(new A),i=new A(t.x,0,t.z).normalize(),s=new A(i.z,0,-i.x),r=420+Math.random()*220,a=360,o=py(n),c=.3+Math.random()*.15,l=o+c*(1-o),h=[];for(let d=0;d<e;d++){const p=(e===1?0:d/(e-1)-.5)*a+(Math.random()-.5)*40,g=n.position.clone().addScaledVector(i,r).addScaledVector(s,p).setY(Wi.surfaceY),x=my(n,g.x,g.z,l),m=g.clone().setY(x);h.push({origin:m,riseHeight:x-Wi.surfaceY})}return h}let Wl=6;function xc(n){gy(n,Wl).forEach(({origin:t,riseHeight:i},s)=>{const r=ih[Math.floor(Math.random()*ih.length)];nt.trigger(t,r,s*nt.launchStagger,i)})}const vy=600;let sr=[];window.addEventListener("keydown",n=>{if(!nt||n.code!=="KeyF"||n.repeat)return;const e=n.target,t=e&&e.tagName;if(t==="INPUT"||t==="SELECT"||t==="TEXTAREA"||e&&e.isContentEditable)return;const i=performance.now();sr=sr.filter(s=>i-s<vy),sr.push(i),sr.length>=3&&(sr=[],xc(Ie))});const ss=qi("headParticles"),xe=ss?new Yx:null;let qe=null,Ci=null;const en={look:new A,inited:!1},_y=ss&&qi("trailLyrics"),Sc=ss&&qi("autoDirector"),Wd=1+Math.floor(Math.random()*99999),Fe=Sc?new fc({seed:Wd}):null;Fe&&(console.log(`[AutoDirector] seed ${Wd}`),Fe.enabled=!0,Fe.restart());let Dt=null;const rs=_y&&qi("lyricTimeline"),Yo="./data/saikai-2026-02-22EngLast-lyrics-timing.json",vt=rs?new gS(ci):null,Ke=rs?new pc(vt,{getChoreography:ga,baseTrailLyricsConfig:NS,legacyHoldDefaults:{trail:CS,hero:RS},onEventStart:n=>{n.runtimeType==="hero"&&Fe&&Fe.enabled&&Fe.setMode(n.camera,"cut",Ie.position,tt.target)}}):null;let Ht=null,Xl=null;const Ch=rs?new ES(YS,qS):null;let Tn=null;rs&&fetch(Yo).then(n=>n.json()).then(n=>{if(!Array.isArray(n.lyrics)){console.error("[LyricTimeline] timing JSON is missing a `lyrics` array:",Yo);return}Tn=n;const e=JSON.stringify(n.lyrics);(!Array.isArray(n.lyrics)||n.lyrics.length!==44)&&console.error("[LyricTimeline] expected exactly 44 raw source cues, found",n.lyrics?n.lyrics.length:"none");const t=new Set;for(const a of n.lyrics||[])t.has(a.index)&&console.error("[LyricTimeline] duplicate raw cue index",a.index),t.add(a.index),(typeof a.time!="number"||!Number.isFinite(a.time)||a.time<0)&&console.error("[LyricTimeline] cue",a.index,"has an invalid time:",a.time),a.endTime!==void 0&&a.endTime!==null&&(typeof a.endTime!="number"||!Number.isFinite(a.endTime)?console.error("[LyricTimeline] cue",a.index,"has a non-finite endTime:",a.endTime):a.endTime<=a.time&&console.error("[LyricTimeline] cue",a.index,"endTime ("+a.endTime+") is not > time ("+a.time+")")),a.group!==void 0&&a.group!==null&&typeof a.group!="number"&&typeof a.group!="string"&&console.error("[LyricTimeline] cue",a.index,"has an invalid group id:",a.group);Ke.setTimingData(n.lyrics),Ht&&(Ht.loadedCues=n.lyrics.length),JSON.stringify(n.lyrics)!==e&&console.error("[LyricTimeline] setTimingData() mutated the raw source cues array — this must never happen.");const i=Ke.resolveDesignScore(n.lyrics),s=new Set;for(const a of i)for(const o of a.sourceCueIndices)s.add(o);for(const a of n.lyrics||[])s.has(a.index)||console.error("[LyricTimeline] raw cue",a.index,"disappeared during grouping/resolution.");const r=i.find(a=>a.group===1);r&&(r.sourceCueIndices.length!==2||r.sourceCueIndices[0]!==18||r.sourceCueIndices[1]!==19)&&console.error("[LyricTimeline] group 1 resolved to",r.sourceCueIndices,"instead of the expected [18, 19]."),Ke.timingErrors.length>0&&console.error("[LyricTimeline] phrase score has unresolved phrases:",Ke.timingErrors);for(let a=0;a<Ke.events.length;a++){const o=Ke.events[a];a>0&&o.triggerTime<Ke.events[a-1].triggerTime&&console.error("[LyricTimeline] scheduled phrases are NOT sorted by triggerTime at",Ke.events[a-1].id,"->",o.id),Number.isFinite(o.triggerTime)||console.error('[LyricTimeline] phrase "'+o.id+'": triggerTime is not finite'),Number.isFinite(o.endTime)||console.error('[LyricTimeline] phrase "'+o.id+'": endTime is not finite'),o.endTime<=o.firstVocalTime&&console.error('[LyricTimeline] phrase "'+o.id+'": endTime does not exceed its own firstVocalTime'),o.endTime<=o.triggerTime&&console.error('[LyricTimeline] phrase "'+o.id+'": endTime does not exceed triggerTime')}}).catch(n=>console.error("[LyricTimeline] failed to load timing JSON:",Yo,n));const yc=qi("audio"),xy=encodeURI("./audio/saikai-2026-02-22EngLast.mp3"),Sy=encodeURI("./audio/saikai-2026-01-20m伴奏.mp3"),st=yc?new TS(xy):null;let ei=null,Ca=!1;const dr=new hd(16773856,3);ci.add(dr,dr.target);const yy=new kp(12575999,2376270,1.1);ci.add(yy);const Sr=new hd(14673648,0);ci.add(Sr,Sr.target);function Ra(n,e){const t=new mi(n,e,{type:bi,minFilter:bt,magFilter:bt,depthBuffer:!0});return t.depthTexture=new In(n,e),t.depthTexture.type=Mi,t}let Zn=Ra(Nn(),Un()),fr=Ra(Nn(),Un());ne.uniforms.uRefractionTex.value=Zn.texture;ne.uniforms.uDepthTex.value=Zn.depthTexture;const et=new Lx(Ft,Nn(),Un(),jt,Wi.deepColor),_t=new Ix(Ft,Nn(),Un(),{scale:.5}),Xd={strength:.5};function Mc(n){_t.enabled=n;const e=n?.25:1;gi.uniforms.uCloudCover.value=e,ne.uniforms.uCloudCover.value=e,n||(ne.uniforms.uCloudShadow.value=0)}function as(){Id(),gi.setSun(jt),ne.setSun(jt),Ii.setSun(jt),Xi.setSun(jt),et.underwaterMat.uniforms.uSunDir.value.copy(jt),_t.setSun(jt),dr.position.copy(jt).multiplyScalar(300),dr.target.position.set(0,0,0),dr.intensity=.6+3*Math.max(jt.y,0)}function yr(){Fd(),gi.setMoon(Wn),ne.setMoon(Wn),Ii.setMoon(Wn),Xi.setMoon(Wn),_t.setMoon(Wn),Sr.position.copy(Wn).multiplyScalar(300),Sr.target.position.set(0,0,0)}const Ba={"Tropical Noon":{sun:{el:60,az:125},amplitude:.7,choppy:.5,speed:1,waveCount:26,exposure:1.05,bloom:.5,clarity:1.3,depthFalloff:.16,sunGlitter:0,sss:.35,deep:"#063049",shallow:"#5fc6c2",foam:"#f6fdff",foamCoverage:.9,crestFoamStart:1.4,fog:1,shafts:.05,roughness:.06,cloudCoverage:.34,saturation:1.08},"Golden Hour":{sun:{el:8,az:205},amplitude:.9,choppy:.6,speed:.9,waveCount:26,exposure:1.15,bloom:.95,clarity:1,depthFalloff:.18,sunGlitter:.55,sss:.55,deep:"#08283b",shallow:"#3f9f9a",foam:"#fff1df",foamCoverage:.85,crestFoamStart:1.5,fog:1,shafts:.06,roughness:.09,cloudCoverage:.45,saturation:1.1},"Crimson Sunset":{sun:{el:1.5,az:250},amplitude:1,choppy:.7,speed:.95,waveCount:24,exposure:1.2,bloom:1.15,clarity:.9,depthFalloff:.2,sunGlitter:.6,sss:.5,deep:"#0e1524",shallow:"#33707a",foam:"#ffe4cf",foamCoverage:.9,crestFoamStart:1.4,fog:1.1,shafts:.05,roughness:.11,cloudCoverage:.52,saturation:1.12},"Blue Hour":{sun:{el:2.5,az:292},amplitude:.6,choppy:.5,speed:.8,waveCount:24,exposure:.9,bloom:.6,clarity:1,depthFalloff:.2,sunGlitter:.4,sss:.3,deep:"#050f1e",shallow:"#295a72",foam:"#dbe8f2",foamCoverage:.9,crestFoamStart:1.5,fog:1.1,shafts:.04,roughness:.08,cloudCoverage:.42,saturation:1},"Clear Dawn":{sun:{el:14,az:95},amplitude:.55,choppy:.45,speed:.85,waveCount:26,exposure:1.05,bloom:.7,clarity:1.4,depthFalloff:.15,sunGlitter:.45,sss:.4,deep:"#073246",shallow:"#63c7c0",foam:"#eefaff",foamCoverage:.85,crestFoamStart:1.6,fog:1,shafts:.06,roughness:.06,cloudCoverage:.28,saturation:1.06},"Stormy Seas":{sun:{el:18,az:100},amplitude:1.8,choppy:1.05,speed:1.6,waveCount:32,exposure:.95,bloom:.4,clarity:.7,depthFalloff:.22,sunGlitter:.2,sss:.25,deep:"#0a1a20",shallow:"#38666a",foam:"#eef3f5",foamCoverage:1.05,crestFoamStart:1.3,fog:1.35,shafts:.05,roughness:.22,cloudCoverage:.7,cloudDensity:1.5,saturation:.92},"Clear Sky":{sun:{el:55,az:130},amplitude:.55,choppy:.4,speed:.95,waveCount:26,exposure:1.1,bloom:.45,clarity:1.5,depthFalloff:.13,sunGlitter:.15,sss:.4,deep:"#04405c",shallow:"#4fe0d8",foam:"#ffffff",foamCoverage:.85,crestFoamStart:1.6,fog:.9,shafts:.07,roughness:.05,cloudCoverage:0,saturation:1.1},"Sun Shower":{sun:{el:22,az:140},amplitude:.75,choppy:.55,speed:1,waveCount:26,exposure:1.05,bloom:.6,clarity:1.1,depthFalloff:.16,sunGlitter:.3,sss:.4,deep:"#063049",shallow:"#4bb0ac",foam:"#f4fbff",foamCoverage:.88,crestFoamStart:1.5,fog:1.05,shafts:.06,roughness:.1,cloudCoverage:.4,saturation:1.05,rain:!0}};function za(n,{skipSun:e=!1}={}){const t=Ba[n];if(!t)return;const i=ne.uniforms;t.sun&&!e&&(li.elevation=t.sun.el,li.azimuth=t.sun.az);const s=(r,a)=>{a!==void 0&&(i[r].value=a)};s("uAmplitude",t.amplitude),s("uChoppy",t.choppy),s("uSpeed",t.speed),s("uWaveCount",t.waveCount),s("uClarity",t.clarity),s("uDepthFalloff",t.depthFalloff),s("uSunGlitter",t.sunGlitter),s("uSSSStrength",t.sss),s("uRoughness",t.roughness),s("uFoamCoverage",t.foamCoverage),s("uCrestFoamStart",t.crestFoamStart),t.deep&&i.uDeepColor.value.set(t.deep),t.shallow&&i.uShallowColor.value.set(t.shallow),t.foam&&i.uFoamColor.value.set(t.foam),t.exposure!==void 0&&(et.compositeMat.uniforms.uExposure.value=t.exposure),t.bloom!==void 0&&(et.compositeMat.uniforms.uBloom.value=t.bloom),t.saturation!==void 0&&(et.compositeMat.uniforms.uSaturation.value=t.saturation),t.fog!==void 0&&(et.underwaterMat.uniforms.uFogStrength.value=t.fog),t.shafts!==void 0&&(et.underwaterMat.uniforms.uShaftDensity.value=t.shafts),t.cloudCoverage!==void 0&&(_t.uniforms.uCoverage.value=t.cloudCoverage),t.cloudDensity!==void 0&&(_t.uniforms.uDensity.value=t.cloudDensity),Dn.setEnabled(!!t.rain),n==="Sun Shower"&&ss&&qe&&(qe.colorMode="rainbow",qe.rainbowSaturation=1,xe.setColorMode("rainbow"),xe.setRainbowSaturation(1)),as(),wc.preset=n,by(),lt.controllersRecursive().forEach(r=>r.updateDisplay())}const Rh={"Stormy Seas":.1};function My(){const n=Object.keys(Ba),e=n.reduce((i,s)=>i+(Rh[s]??1),0);let t=Math.random()*e;for(const i of n){const s=Rh[i]??1;if(t<s)return i;t-=s}return n[n.length-1]}function Yl(){if(!qd.enabled||Oa||ns)return;const n=Yi&&!!pt&&(pt.autoPlay||pt.showTime);za(My(),{skipSun:n})}const lt=new cc({title:"Ocean"});lt.domElement.classList.add("editor-ui");const Yd=[];function by(){for(const n of Yd)n.proxy.c="#"+n.uniform.value.getHexString(),n.ctrl.updateDisplay()}const bc=lt.addFolder("Cinematic").close(),wc={preset:"Tropical Noon"};bc.add(wc,"preset",Object.keys(Ba)).name("preset").onChange(za);bc.add({cinema:!1},"cinema").name("cinematic camera").onChange(n=>tt.autoRotate=n);const qd={enabled:!0};bc.add(qd,"enabled").name("Random Weather");const $d=lt.addFolder("Time of day").close();$d.add(li,"elevation",-3,89,.5).name("sun elevation").onChange(as);$d.add(li,"azimuth",0,360,1).name("sun azimuth").onChange(as);const zs=lt.addFolder("Waves").close();zs.add(ne.uniforms.uAmplitude,"value",.1,3.5,.05).name("amplitude");zs.add(ne.uniforms.uChoppy,"value",0,1.4,.02).name("choppiness");zs.add(ne.uniforms.uWaveCount,"value",4,40,1).name("wave count");zs.add(ne.uniforms.uSpeed,"value",0,3,.05).name("speed");zs.add(ne.uniforms.uDirSpread,"value",0,1.6,.02).name("direction spread");zs.add({wl:Wi.baseWavelength},"wl",40,320,5).name("swell length").onChange(n=>ne.uniforms.uBaseFreq.value=2*Math.PI/n);function ka(n,e,t){const i={c:"#"+e.value.getHexString()},s=n.addColor(i,"c").name(t).onChange(r=>e.value.set(r));Yd.push({ctrl:s,proxy:i,uniform:e})}const ks=lt.addFolder("Surface").close();ks.add(ne.uniforms.uDetailStrength,"value",0,1.2,.02).name("ripple detail");ks.add(ne.uniforms.uDetailScale,"value",.05,1.2,.01).name("ripple scale");ks.add(ne.uniforms.uRefractStrength,"value",0,.12,.005).name("refraction");ks.add(ne.uniforms.uSSRStrength,"value",0,1,.02).name("reflections (SSR)");ks.add(ne.uniforms.uSunGlitter,"value",0,1,.02).name("sun glitter");ks.add(ne.uniforms.uRoughness,"value",.02,.5,.01).name("micro roughness");const Hs=lt.addFolder("Water & colour").close();Hs.add(ne.uniforms.uClarity,"value",.3,3,.05).name("clarity");Hs.add(ne.uniforms.uDepthFalloff,"value",.03,.5,.01).name("depth falloff");Hs.add(ne.uniforms.uSSSStrength,"value",0,1.5,.02).name("translucency");ka(Hs,ne.uniforms.uShallowColor,"shallow");ka(Hs,ne.uniforms.uDeepColor,"deep");ka(Hs,ne.uniforms.uFoamColor,"foam");const os=lt.addFolder("Foam").close();os.add(ne.uniforms.uFoamCoverage,"value",0,2,.05).name("coverage");os.add(ne.uniforms.uFoamEdge,"value",.02,.45,.01).name("softness / layers");os.add(ne.uniforms.uFoamOpacity,"value",.3,1,.02).name("opacity");os.add(ne.uniforms.uCrestFoamStart,"value",.3,3,.05).name("whitecap onset");os.add(ne.uniforms.uFoamThreshold,"value",0,1,.02).name("breaking foam");os.add(ne.uniforms.uShoreFoamWidth,"value",0,8,.1).name("shore foam width");os.add(ne.uniforms.uContactFoam,"value",0,2,.05).name("object foam / wakes");const ai={enabled:on.enabled,random:!0,...on.params,haze:on.uniforms.uHaze.value},$i=lt.addFolder("Continent").close(),Vs=n=>e=>on.setParams({[n]:e}),Kd=()=>{const n=(e,t)=>e+Math.floor(Math.random()*(t-e+1));Object.assign(ai,{height:n(20,245),arcDeg:n(0,300),seed:n(1,999)}),on.setParams({height:ai.height,arcDeg:ai.arcDeg,seed:ai.seed}),$i.controllersRecursive().forEach(e=>e.updateDisplay())};$i.add(ai,"enabled").name("Enabled").onChange(n=>{on.enabled=n});$i.add(ai,"random").name("Random").onChange(n=>{n&&Kd()});$i.add(ai,"distance",800,2900,50).name("Distance").onFinishChange(Vs("distance"));$i.add(ai,"height",20,600,5).name("Height").onFinishChange(Vs("height"));$i.add(ai,"depth",100,1500,50).name("Depth").onFinishChange(Vs("depth"));$i.add(ai,"azimuthDeg",-180,180,1).name("Direction (deg)").onFinishChange(Vs("azimuthDeg"));$i.add(ai,"arcDeg",0,300,5).name("Width (deg)").onFinishChange(Vs("arcDeg"));$i.add(ai,"seed",1,999,1).name("Shape Seed").onFinishChange(Vs("seed"));$i.add(ai,"haze",0,.001,1e-5).name("Haze").onChange(n=>{on.uniforms.uHaze.value=n});ai.random&&Kd();const vi=lt.addFolder("Volumetric clouds").close(),Vt=_t.uniforms;vi.add({on:!0},"on").name("enabled").onChange(Mc);vi.add(Vt.uSteps,"value",16,80,2).name("quality (steps)");vi.add(Vt.uCoverage,"value",.1,.95,.01).name("coverage");vi.add(Vt.uDensity,"value",.2,3,.05).name("density");vi.add(Vt.uNoiseScale,"value",.002,.02,5e-4).name("cloud size (inv)");vi.add(Vt.uHeightFalloff,"value",0,1,.02).name("roundness");vi.add(Vt.uDetail,"value",0,1,.02).name("wispiness");vi.add(Vt.uBase,"value",120,900,10).name("altitude");vi.add(Vt.uHeight,"value",100,700,10).name("thickness");vi.add(Vt.uWindSpeed,"value",0,.15,.005).name("wind speed");vi.add(Vt.uSunStrength,"value",.5,6,.1).name("sun strength");vi.add(Vt.uAmbient,"value",0,1.2,.02).name("ambient");vi.add(Xd,"strength",0,1,.02).name("sea shadows");const Zd=lt.addFolder("Underwater").close();Zd.add(et.underwaterMat.uniforms.uShaftDensity,"value",0,.2,.005).name("god-ray density");Zd.add(et.underwaterMat.uniforms.uFogStrength,"value",0,2,.05).name("fog strength");const On=lt.addFolder("Post").close();On.add(et.compositeMat.uniforms.uExposure,"value",.3,2,.02).name("exposure");On.add(et.compositeMat.uniforms.uBloom,"value",0,2,.02).name("bloom");On.add(et,"bloomStreak",0,1,.02).name("anamorphic streak");On.add(et.compositeMat.uniforms.uSaturation,"value",.5,1.6,.02).name("saturation");On.add(et.compositeMat.uniforms.uContrast,"value",.8,1.3,.01).name("contrast");On.add(et.compositeMat.uniforms.uGrain,"value",0,.2,.005).name("film grain");On.add(et.compositeMat.uniforms.uCA,"value",0,2,.05).name("lens fringe");On.add(et.compositeMat.uniforms.uVignetteAir,"value",0,.6,.02).name("vignette");if(Oa){const n=lt.addFolder("Cinematic Sunset");n.add(ne.uniforms.uSunsetAmount,"value",0,1,.01).name("Sunset Amount"),n.add(ne.uniforms.uSunsetOceanWarmth,"value",0,1,.01).name("Ocean Warmth"),n.add(ne.uniforms.uSunsetSunFocus,"value",0,1,.01).name("Sun Path"),n.add(ne.uniforms.uSunsetGlitterBoost,"value",0,1,.01).name("Glitter Boost"),n.add(ne.uniforms.uSunsetHorizonWarmth,"value",0,1,.01).name("Horizon Warmth"),ka(n,ne.uniforms.uSunsetTint,"Sunset Tint")}function Ha(n){ne.uniforms.uMoonIntensity.value=n,gi.uniforms.uMoonIntensity.value=n,Xi.uniforms.uMoonIntensity.value=n,Ii.uniforms.uMoonIntensity.value=n,Sr.intensity=ns||Yi?n*.5:0}function Va(n){ne.uniforms.uStarVisibility.value=n,gi.uniforms.uStarVisibility.value=n}function tn(n,e,t){const i=Math.min(Math.max((t-n)/(e-n),0),1);return i*i*(3-i*2)}const Pa=["day","golden","sunset","twilight","night"],wy={day:40,golden:8,sunset:-2,twilight:-10,night:-30},Ey={day:25,golden:10,sunset:6,twilight:8,night:15};function Ty(n){const e={};let t=0;for(const i of Pa){const s=(n-wy[i])/Ey[i];e[i]=Math.exp(-s*s),t+=e[i]}if(t>0)for(const i of Pa)e[i]/=t;return e}function Ai(n,e){let t=0;for(const i of Pa)t+=n[i]*e[i];return t}const aa=new ae;function rr(n,e,t){let i=0,s=0,r=0;for(const a of Pa)aa.set(e[a]),i+=n[a]*aa.r,s+=n[a]*aa.g,r+=n[a]*aa.b;t.setRGB(i,s,r)}const Ph={day:"#063049",golden:"#08283b",sunset:"#0e1524",twilight:"#0a1220",night:"#020509"},Ay={day:"#5fc6c2",golden:"#3f9f9a",sunset:"#33707a",twilight:"#1c3550",night:"#0a1830"},Cy={day:"#f6fdff",golden:"#fff1df",sunset:"#ffe4cf",twilight:"#c7d3e0",night:"#c9d6e6"},Ry={day:.35,golden:.55,sunset:.5,twilight:.25,night:.06},Py={day:0,golden:.55,sunset:.6,twilight:.3,night:.05},Dy={day:.06,golden:.09,sunset:.11,twilight:.12,night:.1},Ly={day:1.4,golden:1.5,sunset:1.4,twilight:1.5,night:1.6},Iy={day:3,golden:3.2,sunset:2.6,twilight:1.2,night:.3},Fy={day:.85,golden:.9,sunset:.85,twilight:.6,night:.35},Ny={day:.05,golden:.06,sunset:.05,twilight:.03,night:.01},Uy={day:1,golden:1,sunset:1.1,twilight:.8,night:.5},Oy={day:1.05,golden:1.15,sunset:1.2,twilight:1,night:Hd},By={day:.5,golden:.95,sunset:1,twilight:.7,night:Vd},zy={day:1.08,golden:1.1,sunset:1.12,twilight:1,night:1},ky={day:"#fbf6ea",golden:"#fff0d2",sunset:"#ffe9c9",twilight:"#eef1f5",night:"#e3ecf7"},Dh=new ae,Hy=65,Vy=70,Gy=240,Wy=50,Xy=255,Yy=-60,qy=.85,$y=_c;function Ky(n,e){const t=tn(-14,4,n)*(1-tn(4,14,n)),i=1/Math.max(1,e);return 1-t*(1-i)}const Lh=1/86400,Zy=.3;function Jy(n){const e=Math.min(Math.max(n,0),1);return Lh*Math.pow(Zy/Lh,e)}let Ec=.5;function Ns(n){const e=Math.min(Math.max(n,0),1);Ec=e,li.elevation=Hy*Math.sin(2*Math.PI*(e-.25)),li.azimuth=Vy+e*Gy,Rn.elevation=Wy*Math.sin(2*Math.PI*(e+.25)),Rn.azimuth=Xy+e*Yy;const t=li.elevation,i=Rn.elevation,s=tn(-14,4,t)*(1-tn(4,14,t))*qy,r=tn(-2,-18,t),a=tn(-5,5,i)*(1-tn(0,25,t)),o=r*$y;_t.setNightAmount(r),as(),yr();const c=Ty(t);rr(c,Ph,ne.uniforms.uDeepColor.value),rr(c,Ay,ne.uniforms.uShallowColor.value),rr(c,Cy,ne.uniforms.uFoamColor.value),ne.uniforms.uSSSStrength.value=Ai(c,Ry),ne.uniforms.uSunGlitter.value=Ai(c,Py),ne.uniforms.uRoughness.value=Ai(c,Dy),ne.uniforms.uCrestFoamStart.value=Ai(c,Ly),ne.uniforms.uSunsetAmount.value=s,ne.uniforms.uNightAmount.value=r,gi.uniforms.uNightAmount.value=r,Xi.uniforms.uNightAmount.value=r,Ii.uniforms.uNightAmount.value=r,Ha(vc*a),Va(o),_t.uniforms.uMoonWeight.value=Gd*a,_t.uniforms.uSunStrength.value=Ai(c,Iy),_t.uniforms.uAmbient.value=Ai(c,Fy),et.underwaterMat.uniforms.uShaftDensity.value=Ai(c,Ny),et.underwaterMat.uniforms.uFogStrength.value=Ai(c,Uy),rr(c,Ph,et.underwaterMat.uniforms.uDeepColor.value),et.compositeMat.uniforms.uExposure.value=Ai(c,Oy),et.compositeMat.uniforms.uBloom.value=Ai(c,By),et.compositeMat.uniforms.uSaturation.value=Ai(c,zy),xe&&(rr(c,ky,Dh),xe.setTint(Dh)),pt&&(pt.time=e)}let pt=null,cr=null,fi=null;if(ns){const n=lt.addFolder("Night");n.add(Rn,"elevation",-10,89,.5).name("Moon Elevation").onChange(yr),n.add(Rn,"azimuth",0,360,1).name("Moon Azimuth").onChange(yr),n.add({v:vc},"v",0,3,.05).name("Moon Intensity").onChange(Ha),n.add(ne.uniforms.uMoonPathFocus,"value",0,1,.01).name("Moon Path"),n.add({v:_c},"v",0,1,.01).name("Star Visibility").onChange(Va),n.add(et.compositeMat.uniforms.uExposure,"value",.2,1.5,.01).name("Night Exposure"),n.add(_t.uniforms.uMoonWeight,"value",0,2,.02).name("Cloud Moonlight")}if(Yi){pt={time:Ec,autoPlay:!1,speed:0,sunsetStretch:4.4,showTime:!0,clockFontFamily:'Georgia, "Times New Roman", serif'};const n=lt.addFolder("Day Animation");cr=n.add(pt,"time",0,1,.001).name("Time").onChange(Ns);const e=n.add(pt,"autoPlay").name("Auto Play").onChange(s=>{s&&pt.showTime&&(pt.showTime=!1,i.updateDisplay(),zo.hidden=!0)}),t=n.add(pt,"speed",0,1,.005).name("Speed");n.add(pt,"sunsetStretch",1,8,.1).name("Sunrise/Sunset Length");const i=n.add(pt,"showTime").name("Show Time").onChange(s=>{s&&(pt.autoPlay=!1,e.updateDisplay(),pt.speed=0,t.updateDisplay()),zo.hidden=!s});n.add(pt,"clockFontFamily").name("Clock Font").onChange(s=>{KS.style.fontFamily=s}),zo.hidden=!pt.showTime}if(nt){fi={salvoSize:Wl,launchStagger:nt.launchStagger,riseTime:nt.uniforms.uRiseTime.value,gravity:nt.uniforms.uGravity.value,burstLifetime:nt.uniforms.uBurstLifetime.value,fadeStart:nt.uniforms.uFadeStart.value,brightness:nt.uniforms.uBrightness.value,hotIntensity:nt.uniforms.uHotIntensity.value,glitterIntensity:nt.uniforms.uGlitterIntensity.value,glitterSpeed:nt.uniforms.uGlitterSpeed.value,pixelSize:nt.uniforms.uPixelSize.value,blackoutTime:nt.uniforms.uBlackoutTime.value};const n=lt.addFolder("Fireworks");n.add({test:()=>xc(Ie)},"test").name("Test Salvo"),n.add(fi,"salvoSize",1,30,1).name("Salvo Size").onChange(e=>{Wl=e}),n.add(fi,"launchStagger",0,.6,.01).name("Launch Stagger (s)").onChange(e=>nt.setLaunchStagger(e)),n.add(fi,"riseTime",.3,4,.05).name("Launch Speed (s to burst)").onChange(e=>nt.setRiseTime(e)),n.add(fi,"gravity",0,40,.5).name("Gravity").onChange(e=>nt.setGravity(e)),n.add(fi,"burstLifetime",.5,8,.1).name("Burst Lifetime (s)").onChange(e=>nt.setBurstLifetime(e)),n.add(fi,"fadeStart",0,1,.01).name("Fade Start (fraction)").onChange(e=>nt.setFadeStart(e)),n.add(fi,"brightness",.2,3,.05).name("Brightness").onChange(e=>nt.setBrightness(e)),n.add(fi,"hotIntensity",0,4,.05).name("Hot Flash Intensity").onChange(e=>nt.setHotIntensity(e)),n.add(fi,"glitterIntensity",0,1.5,.05).name("Glitter Intensity").onChange(e=>nt.setGlitterIntensity(e)),n.add(fi,"glitterSpeed",1,40,.5).name("Glitter Speed").onChange(e=>nt.setGlitterSpeed(e)),n.add(fi,"pixelSize",200,3e3,10).name("Particle Size").onChange(e=>nt.setPixelSize(e)),n.add(fi,"blackoutTime",0,3,.05).name("Blackout Before Burst (s)").onChange(e=>nt.setBlackoutTime(e))}if(ss){qe={colorMode:"gold",headColor:"#66e0ff",youngColor:"#66e0ff",midColor:"#3366ff",oldColor:"#8b5cf6",rainbowSpeed:.15,rainbowSaturation:.8,brightness:1.15,particleBloom:1.3,headBloom:1.4,emissionRate:xe.emissionRate,speed:xe.speed,paused:!1,follow:!0,meanderStrength:0,spreadAmount:xe.trailUniforms.uSpreadAmount.value,spreadCurve:xe.trailUniforms.uSpreadCurve.value,spreadRandomness:xe.trailUniforms.uSpreadRandomness.value,glowIntensity:xe.trailUniforms.uGlowIntensity.value,glowRadius:xe.trailUniforms.uGlowRadius.value,glowAgeFalloff:xe.trailUniforms.uGlowAgeFalloff.value,fadeStart:xe.trailUniforms.uFadeStart.value};const n=lt.addFolder("Head Particle Trail");n.add({restart:()=>xe.restart()},"restart").name("Restart"),n.add(qe,"paused").name("Pause").onChange(t=>xe.setPaused(t)),n.add(qe,"colorMode",["gold","custom","rainbow"]).name("Color Mode").onChange(t=>xe.setColorMode(t)),n.addColor(qe,"headColor").name("Head Color").onChange(t=>xe.setHeadColor(t)),n.addColor(qe,"youngColor").name("Young Color").onChange(t=>xe.setYoungColor(t)),n.addColor(qe,"midColor").name("Mid Color").onChange(t=>xe.setMidColor(t)),n.addColor(qe,"oldColor").name("Old Color").onChange(t=>xe.setOldColor(t)),n.add(qe,"rainbowSpeed",0,1,.01).name("Rainbow Speed").onChange(t=>xe.setRainbowSpeed(t)),n.add(qe,"rainbowSaturation",0,1,.01).name("Rainbow Saturation").onChange(t=>xe.setRainbowSaturation(t)),n.add(qe,"brightness",.2,2,.05).name("Brightness").onChange(t=>xe.setBrightness(t)),n.add(qe,"particleBloom",0,2.5,.05).name("Particle Bloom").onChange(t=>xe.setParticleBloom(t)),n.add(qe,"headBloom",.2,2.5,.05).name("Head Bloom").onChange(t=>xe.setHeadBloom(t)),n.add(qe,"emissionRate",40,300,5).name("Emission Rate").onChange(t=>xe.setEmissionRate(t)),n.add(qe,"speed",.05,5,.05).name("Travel Speed").onChange(t=>{xe.speed=t}),n.add(qe,"meanderStrength",0,2,.05).name("Meander Strength").onChange(t=>xe.setMeanderStrength(t)),n.add(qe,"spreadAmount",0,10,.1).name("Tail Spread Amount").onChange(t=>xe.setSpreadAmount(t)),n.add(qe,"spreadCurve",.3,4,.05).name("Tail Spread Curve").onChange(t=>xe.setSpreadCurve(t)),n.add(qe,"spreadRandomness",0,3,.05).name("Tail Spread Randomness").onChange(t=>xe.setSpreadRandomness(t)),n.add(qe,"glowIntensity",0,3,.05).name("Glow Intensity").onChange(t=>xe.setGlowIntensity(t)),n.add(qe,"glowRadius",.3,4,.05).name("Glow Radius").onChange(t=>xe.setGlowRadius(t)),n.add(qe,"glowAgeFalloff",0,1,.05).name("Glow Age Falloff").onChange(t=>xe.setGlowAgeFalloff(t)),n.add(qe,"fadeStart",.05,.95,.01).name("Fade Start (life fraction)").onChange(t=>xe.setFadeStart(t)),n.add(qe,"follow").name("Follow Camera").onChange(t=>{en.inited=!1,t||(tt.enabled=!0)}),xe.setColors({head:qe.headColor,young:qe.youngColor,mid:qe.midColor,old:qe.oldColor}),Ci={enabled:!1,steeringInterval:5,verticalAmplitude:6,verticalPeriod:20};const e=lt.addFolder("Free Navigation");e.add(Ci,"enabled").name("Free Navigation"),e.add(Ci,"steeringInterval",1,20,.5).name("Steering Interval"),e.add(Ci,"verticalAmplitude",0,30,.5).name("Vertical Amplitude"),e.add(Ci,"verticalPeriod",2,60,.5).name("Vertical Period")}if(Sc){Dt={enabled:Fe.enabled,auto:Fe.auto,cameraMode:Fe.cameraMode,seed:Fe.seed,minShotDuration:Fe.minShotDuration,maxShotDuration:Fe.maxShotDuration,transitionTime:Fe.transitionTime,allowCuts:Fe.allowCuts,paused:Fe.paused};const n=lt.addFolder("Auto Director");n.add(Dt,"enabled").name("Enabled").onChange(e=>{Fe.enabled=e,e||(en.inited=!1,tt.enabled=!(qe&&qe.follow))}),n.add(Dt,"auto").name("Auto").onChange(e=>{Fe.auto=e}),n.add(Dt,"cameraMode",fc.presetLabels).name("Camera Mode").listen().onChange(e=>{Fe.setMode(e,void 0,Ie.position,tt.target)}),n.add(Dt,"seed",0,99999,1).name("Seed").onChange(e=>{Fe.seed=e>>>0,Fe.restart()}),n.add(Dt,"minShotDuration",1,15,.5).name("Min Shot Duration").onChange(e=>{Fe.minShotDuration=e}),n.add(Dt,"maxShotDuration",1,20,.5).name("Max Shot Duration").onChange(e=>{Fe.maxShotDuration=e}),n.add(Dt,"transitionTime",.1,4,.1).name("Transition Time").onChange(e=>{Fe.transitionTime=e}),n.add(Dt,"allowCuts").name("Allow Cuts").onChange(e=>{Fe.allowCuts=e}),n.add(Dt,"paused").name("Pause").onChange(e=>{Fe.paused=e}),n.add({next:()=>Fe.requestNextShot(Ie.position,tt.target)},"next").name("Next Shot")}if(rs){Ht={enabled:Ke.enabled,time:0,paused:Ke.paused,speed:Ke.speed,currentEvent:"(none yet)",timingSource:"Manual JSON",loadedCues:0};const n=lt.addFolder("Lyric Timeline");n.add(Ht,"enabled").name("Enabled").onChange(l=>{Ke.enabled=l}),n.add(Ht,"time",0,315,.05).name("Time").listen().onChange(l=>Ke.setTime(l)),n.add(Ht,"paused").name("Pause").onChange(l=>Ke.setPaused(l)),n.add(Ht,"speed",.1,3,.05).name("Playback Speed").onChange(l=>{Ke.speed=l}),n.add(Ht,"currentEvent").name("Current Event").listen().disable(),n.add(Ht,"timingSource").name("Timing Source").disable(),n.add(Ht,"loadedCues").name("Loaded Cues").listen().disable(),n.add({restart:()=>Ke.restart()},"restart").name("Restart"),n.add({next:()=>{const l=Ke.getNextEvent();l&&Ke.setTime(l.triggerTime)}},"next").name("Next Event");const e={textColor:"#ffffff",shadowColor:"#302a79",shadowStrength:2,outlineWidth:0,outlineColor:"#000000",fontFamily:'"Crimson Pro", Georgia, serif',leaveDuration:.2,dissolveDuration:1.2,particleCount:650},t=lt.addFolder("Trail Lyrics Style");t.addColor(e,"textColor").name("Text Color").onChange(l=>vt.setGlyphStyle({textColor:l})),t.addColor(e,"shadowColor").name("Shadow Color").onChange(l=>vt.setGlyphStyle({shadowColor:l})),t.add(e,"shadowStrength",0,2,.05).name("Shadow Strength").onChange(l=>vt.setGlyphStyle({shadowStrength:l})),t.add(e,"outlineWidth",0,8,.5).name("Outline Width").onChange(l=>vt.setGlyphStyle({outlineWidth:l})),t.addColor(e,"outlineColor").name("Outline Color").onChange(l=>vt.setGlyphStyle({outlineColor:l}));const i={"Georgia (system)":'Georgia, "Times New Roman", serif',"Cormorant Garamond":'"Cormorant Garamond", Georgia, serif',Cinzel:"Cinzel, Georgia, serif","EB Garamond":'"EB Garamond", Georgia, serif',"Playfair Display":'"Playfair Display", Georgia, serif',"Bodoni Moda":'"Bodoni Moda", Georgia, serif',Spectral:"Spectral, Georgia, serif","Crimson Pro":'"Crimson Pro", Georgia, serif',"Josefin Sans":'"Josefin Sans", "Helvetica Neue", Arial, sans-serif',Jost:'Jost, "Helvetica Neue", Arial, sans-serif',Raleway:'Raleway, "Helvetica Neue", Arial, sans-serif',"Dancing Script":'"Dancing Script", cursive',Caveat:"Caveat, cursive","Great Vibes":'"Great Vibes", cursive',Parisienne:"Parisienne, cursive",Sacramento:"Sacramento, cursive"},s={'"Great Vibes", cursive':400,"Parisienne, cursive":400,"Sacramento, cursive":400},r=l=>s[l]??600;e.fontPreset=i["Crimson Pro"];let a;const o=async l=>{const h=r(l);await bd(`${h} 32px ${l}`,"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"),e.fontFamily===l&&vt.setGlyphStyle({fontFamily:l,fontWeight:h})};t.add(e,"fontPreset",i).name("Font").onChange(l=>{e.fontFamily=l,a.updateDisplay(),o(l)}),a=t.add(e,"fontFamily").name("Font Family").onFinishChange(l=>o(l)),e.fontSizeScale=.9,t.add(e,"fontSizeScale",.6,1.5,.05).name("Font Size").onChange(l=>vt.setFontSizeScale(l)),t.add(e,"leaveDuration",0,5,.1).name("Leave Duration").onChange(l=>vt.setPhraseTiming({leaveDuration:l})),t.add(e,"dissolveDuration",0,5,.1).name("Dissolve Duration").onChange(l=>vt.setPhraseTiming({dissolveDuration:l})),t.add(e,"particleCount",50,650,10).name("Particle Count").onChange(l=>vt.setParticleCount(l)),vt.setGlyphStyle({...e}),vt.setPhraseTiming({leaveDuration:e.leaveDuration,dissolveDuration:e.dissolveDuration}),vt.setParticleCount(e.particleCount),vt.setFontSizeScale(e.fontSizeScale),o(e.fontFamily);const c=new Map;Xl=l=>{const h=new Set;for(const d of l){h.add(d.id);let u=c.get(d.id);u||(u=document.createElement("div"),u.className="hold-lyric-item",XS.appendChild(u),c.set(d.id,u)),u.style.left=d.x/100*window.innerWidth+"px",u.style.top=d.y/100*window.innerHeight+"px",u.style.opacity=d.alpha.toFixed(3),u.textContent=d.text,u.style.color=e.textColor,u.style.webkitTextStroke=e.outlineWidth>0?`${(e.outlineWidth*.35).toFixed(2)}px ${e.outlineColor}`:"0",u.style.textShadow=`0 2px 10px ${e.shadowColor}, 0 1px 3px ${e.shadowColor}`,u.style.fontFamily=e.fontFamily,u.style.fontWeight=r(e.fontFamily);const p=d.heightPercent/100*window.innerHeight,g=d.widthPercent/100*window.innerWidth,x=d.text.split(`
`).length,m=p/x;u.style.width=g+"px",u.style.lineHeight=m+"px",u.style.fontSize=m*.8+"px"}for(const[d,u]of c)h.has(d)||(u.remove(),c.delete(d))}}if(yc){let e=function(){ko.classList.toggle("is-playing",!st.paused)};var nM=e;ei={loaded:!1,playing:!1,time:0,volume:st.volume,syncLyrics:!!rs};const n=lt.addFolder("Audio");n.add(ei,"loaded").name("Loaded").listen().disable(),n.add(ei,"playing").name("Play / Pause").listen().onChange(c=>{c?st.play():st.pause()}),n.add({restart:()=>{st.restart(),Yl()}},"restart").name("Restart"),n.add(ei,"time",0,315,.1).name("Time").listen().onChange(c=>st.setTime(c)),n.add(ei,"volume",0,1,.01).name("Volume").onChange(c=>{st.setVolume(c)}),n.add(ei,"syncLyrics").name("Sync Lyrics").listen().onChange(c=>{ei.syncLyrics=c}),na.hidden=!1,jS.addEventListener("click",()=>{Sh&&Sh.checked&&st.setSrc(Sy),Ca=!!(yh&&yh.checked),Ca&&Ke&&(Ke.spawningEnabled=!1),st.play(),na.classList.add("dismissed"),setTimeout(()=>{na.hidden=!0},550)}),ko.hidden=!1,e(),st.audio.addEventListener("play",e),st.audio.addEventListener("pause",e),ko.addEventListener("click",()=>{st.paused?st.play():st.pause()});let t=!1;Ho.hidden=!1,Ho.addEventListener("click",()=>{t=!t,Ho.classList.toggle("is-active",t)}),st.audio.addEventListener("ended",()=>{t&&(st.restart(),st.play(),Yl())});const i=400,s=24;let r=0,a=0,o=0;window.addEventListener("pointerdown",c=>{r=c.clientX,a=c.clientY,o=performance.now()}),window.addEventListener("pointerup",c=>{if(!na.hidden||c.target.closest&&c.target.closest("button, input, select, textarea, .lil-gui, .editor-ui"))return;const l=performance.now()-o,h=Math.hypot(c.clientX-r,c.clientY-a);l>i||h>s||(st.paused?st.play():st.pause())})}lt.add({dive:()=>Tc(-12)},"dive").name("▼ dive under");lt.add({surface:()=>Tc(14)},"surface").name("▲ back to surface");function Tc(n){const e=Ie.position.clone(),t=tt.target.clone(),i=new A(e.x,n,e.z),s=new A(t.x,n<0?n-4:2,t.z);let r=0;(function a(){r=Math.min(1,r+.02);const o=r*r*(3-2*r);Ie.position.lerpVectors(e,i,o),tt.target.lerpVectors(t,s,o),r<1&&requestAnimationFrame(a)})()}function Ac(){const n=Nn(),e=Un();Ie.aspect=n/e,Ie.updateProjectionMatrix(),Ft.setSize(n,e),Zn.dispose(),fr.dispose(),Zn=Ra(n,e),fr=Ra(n,e),ne.uniforms.uRefractionTex.value=Zn.texture,ne.uniforms.uDepthTex.value=Zn.depthTexture,ne.setResolution(n,e),et.setSize(n,e),_t.setSize(n,e)}window.addEventListener("resize",Ac);window.visualViewport&&window.visualViewport.addEventListener("resize",Ac);window.addEventListener("orientationchange",Ac);let Ih=performance.now(),Si=0,Fh=0;const Nh=new Ze,oa=new A,Qy=new A,jy=new A,eM=new A,tM=new A(0,1,0),la=new A;function iM(n,e,t=24){for(let i=1;i<t;i++){const s=i/t;if(la.lerpVectors(n,e,s),la.y<Xi.heightAt(la.x,la.z))return!0}return!1}function Uh(n,e){e?(ne.mesh.visible=!1,gi.mesh.visible=!0,Ii.mesh.visible=!0,Aa.points.visible=!1,Dn.mesh.visible=!1):(ne.mesh.visible=!0,gi.mesh.visible=!n,Ii.mesh.visible=!0,Aa.points.visible=n,Dn.mesh.visible=Dn.enabled&&!n)}function Jd(){requestAnimationFrame(Jd);const n=performance.now(),e=Math.min((n-Ih)/1e3,.05);if(Si+=e,Ih=n,Yi&&pt.showTime){const l=new Date,h=l.getHours()*3600+l.getMinutes()*60+l.getSeconds();pt.time=h/86400,Ns(pt.time),cr&&cr.updateDisplay(),$S.textContent=`${l.getFullYear()}/${l.getMonth()+1}/${l.getDate()}`,ZS.textContent=String(l.getHours()).padStart(2,"0"),QS.textContent=String(l.getMinutes()).padStart(2,"0"),JS.style.opacity=Math.floor(l.getTime()/1e3)%2===0?"1":"0",nt&&(fy.includes(l.getHours())&&l.getMinutes()<4?wc.preset==="Clear Sky"&&l.getTime()>=Xo&&(xc(Ie),Xo=1/0):Xo=0)}else if(Yi&&pt.autoPlay){const l=Ky(li.elevation,pt.sunsetStretch);pt.time=(pt.time+e*Jy(pt.speed)*l)%1,Ns(pt.time),cr&&cr.updateDisplay()}nt&&nt.update(e);const t=!!(Fe&&Fe.enabled);xe&&qe?tt.enabled=!qe.follow&&!t:t&&(tt.enabled=!1),tt.update();const i=ne.heightAt(Ie.position.x,Ie.position.z,Si),s=Ie.position.y<i-.15;if(Ie.position.y<-Ta+3&&(Ie.position.y=-Ta+3),ne.update(Si,Ie),Ii.update(Si,Ie),Xi.update(Si),Aa.update(Si,Ie),gi.update(Ie,Si),on.update(Ie,s),xe){Pn&&(Gn+=xr*Mh*xe.speed*e),Vl!==0&&(Gn+=Vl*Mh*xe.speed*e),Gn=Math.min(sy,Math.max(ny,Gn));const l=!!(Ci&&Ci.enabled);let h=0;l&&(Eh||(Wo=0,Go=sa[Math.floor(Math.random()*sa.length)],ra=Ci.steeringInterval),ra-=e,ra<=0&&(Go=sa[Math.floor(Math.random()*sa.length)],ra+=Ci.steeringInterval),Wo+=e*(Math.PI*2/Math.max(.001,Ci.verticalPeriod)),h=Ci.verticalAmplitude*Math.sin(Wo)),Eh=l,xe.setAltitudeOffset(Gn+h),xh&&(xh.textContent=(Gn>=0?"+":"")+Gn.toFixed(1)+" / "+(xr>0?"UP":"DOWN"));const d=l?Go:(Cn?-1:0)+(Qn?1:0);if(xe.setManualTurnInput(d),xe.update(e,Si,ne,Ie.position),ne.uniforms.uTravelerHeadPos.value.copy(xe.getHeadPosition(oa)),ne.uniforms.uTravelerGlowIntensity.value=1,ne.uniforms.uTravelerGlowColor.value.copy(xe.waterGlintColor),qe&&qe.follow&&!t){tt.enabled=!1;const u=xe.getHeadPosition(oa),p=xe.travelDir,g=eM.crossVectors(p,tM);g.lengthSq()<1e-6?g.set(1,0,0):g.normalize();const x=Qy.copy(u).addScaledVector(p,-22).addScaledVector(g,18);x.y+=10;const m=jy.copy(u).addScaledVector(p,8).addScaledVector(g,-5);if(!en.inited)Ie.position.copy(x),en.look.copy(m),en.inited=!0;else{const f=1-Math.pow(8e-4,e);Ie.position.lerp(x,f),en.look.lerp(m,f)}Ie.lookAt(en.look),tt.target.copy(en.look)}}if(Fe){const l=vt?vt.getNewestActivePhrase():null;Fe.update(e,xe,l,Ie,ne,Si),Dt&&(Dt.cameraMode=Fe.cameraMode),t&&xe&&tt.target.copy(xe.getHeadPosition(oa))}if(Dn.update(Si,Ie),st&&ei&&(ei.loaded=st.loaded,ei.playing=!st.paused,ei.time=st.currentTime),Ke&&(!!(st&&ei&&ei.syncLyrics)?Ke.setTime(st.currentTime):Ke.update(e),Ch&&Ch.update(Ke.time,Tn?Tn.lyrics:null),Ht)){Ht.time=Ke.time;const h=Ke.getActiveEvents(),d=h.length?h[h.length-1]:null,u=vt?vt.getNewestActivePhrase():null;Ht.currentEvent=d?`${d.id} (${d.designType}/${d.runtimeType}) — ${u?u.getPhase():"?"}${h.length>1?` [+${h.length-1} more active]`:""}`:"(none yet)"}Ie.updateMatrixWorld(),vt&&!Ca&&(vt.update(e,xe,Ie,Ke?Ke.time:void 0),Xl&&Xl(vt.getHoldOverlays())),ne.uniforms.uCameraUnderwater.value=s?1:0,ne.uniforms.uProjMatrix.value.copy(Ie.projectionMatrix),et.underwaterMat.uniforms.uTime.value=Si;const r=ne.uniforms;_t.enabled&&(r.uCloudShadow.value=Xd.strength,r.uCloudPlaneY.value=Vt.uBase.value+Vt.uHeight.value*.5,r.uCloudScale.value=Vt.uNoiseScale.value,r.uCloudCoverage.value=Vt.uCoverage.value*(1-Vt.uHeightFalloff.value*.5),r.uCloudDrift.value.copy(Vt.uDrift.value)),Ft.setClearColor(Wi.deepColor,1),s||(Uh(s,!0),Ft.setRenderTarget(Zn),Ft.render(ci,Ie)),Uh(s,!1),Ft.setRenderTarget(fr),Ft.render(ci,Ie);let a=!1;if(xe)if(s)Ft.autoClear=!1,Ft.render(xe.overlayScene,Ie),Ft.autoClear=!0;else{const l=xe.getHeadPosition(oa);a=iM(Ie.position,l)}_t.enabled&&_t.render(e,Ie,fr.depthTexture);const o=Dn.enabled&&!s?tn(0,8,li.elevation)*(1-tn(32,42,li.elevation)):0;Nh.multiplyMatrices(Ie.projectionMatrix,Ie.matrixWorldInverse).invert(),et.render(fr,{invProjView:Nh,cameraPos:Ie.position,sunDir:jt,time:Si,underwater:s,surfaceY:Wi.surfaceY,cloudTexture:_t.enabled?_t.texture:null,rainbowStrength:o,headOverlay:xe&&!s&&!a?{scene:xe.overlayScene,camera:Ie}:null}),Gl&&(Gl=!1,cy());const c=i-Ie.position.y;_h.textContent=s?"BELOW":"ABOVE",_h.style.color=s?"#7fe0d0":"#9be7ff",WS.textContent=(s?c:Ie.position.y).toFixed(1)+" m",Fh++,Fh===2&&(wn.classList.add("hidden"),GS.hidden=!1,setTimeout(()=>wn.remove(),1200))}window.OCEAN={camera:Ie,controls:tt,diveTo:Tc,sunParams:li,applySun:as,applyPreset:za,PRESETS:Ba,ocean:ne,floor:Ii,island:Xi,post:et,clouds:_t,setCloudsEnabled:Mc};Object.defineProperty(window.OCEAN,"withoutLyricsActive",{configurable:!0,get:()=>Ca});ns&&(window.OCEAN.moonParams=Rn,window.OCEAN.applyMoon=yr,window.OCEAN.setMoonIntensity=Ha,window.OCEAN.setStarVisibility=Va);Yi&&(window.OCEAN.setTimeOfDay=Ns,Object.defineProperty(window.OCEAN,"timeOfDay",{get:()=>Ec}),window.OCEAN.fireworks=nt);ss&&(window.OCEAN.headParticleTrail=xe,window.OCEAN.setHeadParticleTime=n=>{xe.setTime(n),en.inited=!1},window.OCEAN.setHeadParticlePaused=n=>xe.setPaused(n),window.OCEAN.setHeadParticleEmissionRate=n=>xe.setEmissionRate(n),window.OCEAN.setHeadParticleColorMode=n=>xe.setColorMode(n),window.OCEAN.setHeadParticleColors=n=>xe.setColors(n),window.OCEAN.setHeadParticleBrightness=n=>xe.setBrightness(n),window.OCEAN.setHeadParticleBloom=n=>xe.setParticleBloom(n),window.OCEAN.setHeadParticleHeadBloom=n=>xe.setHeadBloom(n),window.OCEAN.setHeadParticleRainbowSpeed=n=>xe.setRainbowSpeed(n),window.OCEAN.setHeadParticleRainbowSaturation=n=>xe.setRainbowSaturation(n));Sc&&(window.OCEAN.autoDirector=Fe,window.OCEAN.setDirectorAuto=n=>{Fe.auto=!!n,Dt&&(Dt.auto=Fe.auto)},window.OCEAN.setDirectorMode=n=>{Fe.setMode(n,void 0,Ie.position,tt.target)},window.OCEAN.setDirectorSeed=n=>{Fe.seed=n>>>0,Fe.restart(),Dt&&(Dt.seed=Fe.seed)},window.OCEAN.nextDirectorShot=()=>Fe.requestNextShot(Ie.position,tt.target));rs&&(window.OCEAN.lyricTimeline=Ke,Object.defineProperty(window.OCEAN,"lyricTimelineTime",{configurable:!0,get:()=>Ke.time}),window.OCEAN.setLyricTimelineTime=n=>{Ke.setTime(n),Ht&&(Ht.time=Ke.time)},window.OCEAN.setLyricTimelinePaused=n=>{Ke.setPaused(n),Ht&&(Ht.paused=Ke.paused)},Object.defineProperty(window.OCEAN,"foreverMoreTiming",{configurable:!0,get:()=>Tn}),Object.defineProperty(window.OCEAN,"lyricSourceCues",{configurable:!0,get:()=>Tn?Tn.lyrics:[]}),Object.defineProperty(window.OCEAN,"lyricPhrases",{configurable:!0,get:()=>Ke.resolveDesignScore(Tn?Tn.lyrics:[])}),window.OCEAN.trailLyricsManager=vt,Object.defineProperty(window.OCEAN,"activeLyricPhrases",{configurable:!0,get:()=>vt.getActivePhrases()}),window.OCEAN.setActiveLyricLocalTimes=n=>{for(const e of vt.getActiveEntries())e.instance.setTime(n)});yc&&(window.OCEAN.audio=st,window.OCEAN.playAudio=()=>st.play(),window.OCEAN.pauseAudio=()=>st.pause(),window.OCEAN.setAudioTime=n=>st.setTime(n),window.OCEAN.setAudioSyncLyrics=n=>{ei&&(ei.syncLyrics=!!n)});as();Mc(!0);Oa&&(za("Crimson Sunset"),ne.uniforms.uSunsetAmount.value=hy,lt.controllersRecursive().forEach(n=>n.updateDisplay()));if(ns){_t.setNightAmount(1),li.elevation=dy,as(),yr();const n=new ae(14673648);ne.uniforms.uNightAmount.value=1,ne.uniforms.uMoonColor.value.copy(n),gi.uniforms.uNightAmount.value=1,gi.uniforms.uMoonColor.value.copy(n),Xi.uniforms.uNightAmount.value=1,Xi.uniforms.uMoonColor.value.copy(n),Ii.uniforms.uNightAmount.value=1,Ii.uniforms.uMoonColor.value.copy(n),Ha(vc),Va(_c),_t.setNightAmount(1),_t.uniforms.uMoonColor.value.copy(n),_t.uniforms.uMoonWeight.value=Gd,_t.uniforms.uSunStrength.value=.3,_t.uniforms.uAmbient.value=.35,Ie.position.set(10,3,48),tt.target.set(0,2,0),tt.update(),ne.uniforms.uDeepColor.value.set("#020509"),ne.uniforms.uShallowColor.value.set("#0a1830"),ne.uniforms.uFoamColor.value.set("#c9d6e6"),ne.uniforms.uSSSStrength.value=.06,ne.uniforms.uSunGlitter.value=.05,ne.uniforms.uCrestFoamStart.value=1.6,et.underwaterMat.uniforms.uShaftDensity.value=.01,et.underwaterMat.uniforms.uFogStrength.value=.5,et.underwaterMat.uniforms.uDeepColor.value.set("#020509"),et.compositeMat.uniforms.uExposure.value=Hd,et.compositeMat.uniforms.uBloom.value=Vd,et.compositeMat.uniforms.uSaturation.value=1,lt.controllersRecursive().forEach(e=>e.updateDisplay())}Yi&&(Ns(pt.time),lt.controllersRecursive().forEach(n=>n.updateDisplay()));ss&&(!Yi&&!ns&&!Oa&&Ns(.74),!Yi&&!ns&&(Ie.position.set(10,18,370),tt.target.set(10,12,120),tt.update()),lt.controllersRecursive().forEach(n=>n.updateDisplay()));Yl();Jd();
