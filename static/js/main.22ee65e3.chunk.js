(this.webpackJsonppokemon_challenge=this.webpackJsonppokemon_challenge||[]).push([[0],{65:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(17),o=n.n(c),i=n(20),s=n(11),u=n.n(s),l=n(15),p=n(12),d=n(107),b=n(35),h=n(98),j=n(99),m=n(67),f=n(109),g=n(43),O=n.n(g),x=n(96),v=n(8),k=n(4),w=Object(x.a)((function(e){return{root:{flexGrow:1,background:"#BF625F"},menuButton:{marginRight:e.spacing(2)},title:Object(b.a)({flexGrow:1,display:"none"},e.breakpoints.up("sm"),{display:"block"}),search:Object(b.a)({position:"relative",borderRadius:e.shape.borderRadius,backgroundColor:Object(v.b)(e.palette.common.white,.15),"&:hover":{backgroundColor:Object(v.b)(e.palette.common.white,.25)},marginLeft:0,width:"100%"},e.breakpoints.up("sm"),{marginLeft:e.spacing(1),width:"auto"}),searchIcon:{padding:e.spacing(0,2),height:"100%",position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"},inputRoot:{color:"inherit"},inputInput:Object(b.a)({padding:e.spacing(1,1,1,0),paddingLeft:"calc(1em + ".concat(e.spacing(4),"px)"),transition:e.transitions.create("width"),width:"100%"},e.breakpoints.up("sm"),{width:"12ch","&:focus":{width:"20ch"}})}})),y=function(e){var t=e.searchTerm,n=e.setSearchTerm,a=w();return Object(k.jsx)("div",{children:Object(k.jsx)(h.a,{className:a.root,position:"static",elevation:0,children:Object(k.jsxs)(j.a,{children:[Object(k.jsx)(m.a,{className:a.title,variant:"h6",noWrap:!0,children:"Pokedex"}),Object(k.jsxs)("div",{className:a.search,children:[Object(k.jsx)("div",{className:a.searchIcon,children:Object(k.jsx)(O.a,{})}),Object(k.jsx)(f.a,{placeholder:"Search\u2026",classes:{root:a.inputRoot,input:a.inputInput},inputProps:{"aria-label":"search"},value:t,onChange:function(e){return n(e.target.value)}})]})]})})})},F=n(102),E=n(100),C=n(101),S=n(108),B={normal:"#A8A77A",fire:"#EE8130",water:"#6390F0",electric:"#F7D02C",grass:"#7AC74C",ice:"#96D9D6",fighting:"#C22E28",poison:"#A33EA1",ground:"#E2BF65",flying:"#A98FF3",psychic:"#F95587",bug:"#A6B91A",rock:"#B6A136",ghost:"#735797",dragon:"#6F35FC",dark:"#705746",steel:"#B7B7CE",fairy:"#D685AD"},N=function(e){var t=Object.keys(B).find((function(t){return t===e}));return B[t]},A=Object(x.a)((function(e){return{heading:{fontWeight:"bold"}}})),T=function(e){var t=e.updateFilterTypes,n=Object(a.useState)([]),c=Object(p.a)(n,2),o=c[0],s=c[1],d=r.a.useState([]),b=Object(p.a)(d,2),h=b[0],j=b[1],f=A();Object(a.useEffect)((function(){var e="".concat("https://pokeapi.co/api/v2","/type");(function(){var t=Object(l.a)(u.a.mark((function t(){var n,a;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,fetch(e);case 3:if((n=t.sent).ok){t.next=6;break}throw new Error("could not fetch pokemons");case 6:return t.next=8,n.json();case 8:a=t.sent,s(a.results),t.next=15;break;case 12:t.prev=12,t.t0=t.catch(0),console.log(t.t0);case 15:case"end":return t.stop()}}),t,null,[[0,12]])})));return function(){return t.apply(this,arguments)}})()()}),[]);var g=function(e){(2!==h.length||h.includes(e.target.name))&&j((function(t){return t.includes(e.target.name)?t.filter((function(t){return t!==e.target.name})):[].concat(Object(i.a)(t),[e.target.name])}))};return t(h),Object(k.jsxs)("div",{children:[Object(k.jsx)(m.a,{className:f.heading,component:"h3",children:"Filters"}),Object(k.jsx)(E.a,{children:o.map((function(e,t){return Object(k.jsx)(C.a,{control:Object(k.jsx)(S.a,{checked:h.includes(e.name),disabled:2===h.length&&!h.includes(e.name),name:e.name,style:{color:2!==h.length||h.includes(e.name)?"".concat(N(e.name)):"rgba(0, 0, 0, 0.38)"},onChange:g}),label:e.name},t)}))})]})},I=n(103),R=n(104),_=n(105),D=n(106),G=n(68),W=Object(x.a)((function(e){return{root:{maxWidth:345},id:{color:"#B3B3B3"},mediaContainer:{margin:e.spacing(1,"auto",3),height:150,width:150,background:"#F0F0F0",borderRadius:"50%"},name:{fontSize:18,textTransform:"capitalize",fontWeight:"bold"},buttonGroup:{width:"100%",padding:".1rem"},button:{width:"100%",padding:".15rem",pointerEvents:"none",border:"none",textTransform:"capitalize"}}})),z=function(e){var t,n,c=e.data,o=Object(a.useState)({}),i=Object(p.a)(o,2),s=i[0],d=i[1],b=W(),h=s.id?s.id.toString().padStart(3,"0"):"";return Object(a.useEffect)((function(){var e="".concat("https://pokeapi.co/api/v2","/pokemon/").concat(c.id);return function(){var t=Object(l.a)(u.a.mark((function t(){var n,a;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,fetch(e);case 3:if((n=t.sent).ok){t.next=6;break}throw new Error("could not get poke data");case 6:return t.next=8,n.json();case 8:a=t.sent,d(a),t.next=15;break;case 12:t.prev=12,t.t0=t.catch(0),console.log(t.t0);case 15:case"end":return t.stop()}}),t,null,[[0,12]])})));return function(){return t.apply(this,arguments)}}()(),function(){return d({})}}),[c]),Object(k.jsx)(r.a.Fragment,{children:s&&Object(k.jsx)(F.a,{item:!0,xs:4,sm:3,children:Object(k.jsx)(I.a,{className:b.root,children:Object(k.jsxs)(R.a,{children:[Object(k.jsx)(m.a,{className:b.id,component:"h3",children:"#".concat(h)}),Object(k.jsx)("div",{className:b.mediaContainer,children:Object(k.jsx)(_.a,{component:"img",alt:s.name,image:null===(t=s.sprites)||void 0===t?void 0:t.front_default,title:s.name})}),Object(k.jsx)(m.a,{className:b.name,align:"center",gutterBottom:!0,component:"h2",children:s.name}),Object(k.jsx)(D.a,{className:b.buttonGroup,"aria-label":"button group",children:null===(n=s.types)||void 0===n?void 0:n.map((function(e,t){return Object(k.jsx)(G.a,{className:b.button,disableElevation:!0,style:{backgroundColor:"".concat(N(e.type.name))},children:e.type.name},t)}))})]})})})})},L=Object(x.a)((function(e){return{root:{padding:e.spacing(4,3)}}})),J=function(e){var t=e.pokemons,n=e.updateFilterTypes,a=L();return Object(k.jsxs)(F.a,{className:a.root,container:!0,spacing:2,children:[Object(k.jsx)(F.a,{item:!0,xs:4,sm:2,children:Object(k.jsx)(T,{updateFilterTypes:n})}),Object(k.jsx)(F.a,{item:!0,xs:8,sm:10,children:Object(k.jsx)(F.a,{container:!0,spacing:2,children:t.length>0&&t.map((function(e,t){return Object(k.jsx)(z,{data:e},t)}))})})]})};var P=function(){var e=Object(a.useState)([]),t=Object(p.a)(e,2),n=t[0],c=t[1],o=Object(a.useState)(""),s=Object(p.a)(o,2),b=s[0],h=s[1],j=Object(a.useState)([]),m=Object(p.a)(j,2),f=m[0],g=m[1],O=Object(a.useState)([]),x=Object(p.a)(O,2),v=x[0],w=x[1],F="https://pokeapi.co/api/v2";Object(a.useEffect)((function(){var e="".concat(F,"/pokedex/2");(function(){var t=Object(l.a)(u.a.mark((function t(){var n,a,r;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,fetch(e);case 3:if((n=t.sent).ok){t.next=6;break}throw new Error("could not fetch pokemons");case 6:return t.next=8,n.json();case 8:a=t.sent,r=a.pokemon_entries.map((function(e){return{id:e.entry_number,name:e.pokemon_species.name}})),c(r),t.next=16;break;case 13:t.prev=13,t.t0=t.catch(0),console.log(t.t0);case 16:case"end":return t.stop()}}),t,null,[[0,13]])})));return function(){return t.apply(this,arguments)}})()()}),[]),Object(a.useEffect)((function(){if(0!==f.length){var e=Object(i.a)(v);f.forEach((function(t){var a="".concat(F,"/type/").concat(t);(function(){var t=Object(l.a)(u.a.mark((function t(){var r,c,o,s;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,fetch(a);case 3:if((r=t.sent).ok){t.next=6;break}throw new Error("could not fetch types");case 6:return t.next=8,r.json();case 8:c=t.sent,o=c.pokemon.filter((function(e){return n.map((function(e){return e.name})).includes(e.pokemon.name)})),s=o.map((function(e){return{id:+e.pokemon.url.slice(34,-1),name:e.pokemon.name}})),1===f.length?(e.push.apply(e,Object(i.a)(s)),w(Object(i.a)(e))):w((function(e){return s.filter((function(t){if(e.some((function(e){return e.name===t.name})))return!0}))})),t.next=17;break;case 14:t.prev=14,t.t0=t.catch(0),console.log(t.t0);case 17:case"end":return t.stop()}}),t,null,[[0,14]])})));return function(){return t.apply(this,arguments)}})()()}))}}),[f]);var E=function(e){return e.filter((function(e){return e.name.indexOf(b)>-1}))};return Object(k.jsxs)(r.a.Fragment,{children:[Object(k.jsx)(d.a,{}),Object(k.jsx)(y,{searchTerm:b,setSearchTerm:h}),Object(k.jsx)(J,{pokemons:f.length>0?E(v):E(n),updateFilterTypes:function(e){g(e)}})]})};o.a.render(Object(k.jsx)(P,{}),document.getElementById("root"))}},[[65,1,2]]]);
//# sourceMappingURL=main.22ee65e3.chunk.js.map