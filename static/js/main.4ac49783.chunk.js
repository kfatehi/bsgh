(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{21:function(e,t,n){e.exports=n(32)},26:function(e,t,n){},32:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(14);n(26),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var o=n(8),s=n(9),u=n(2),l={loadState:0,errorDetail:null,mode:0,query:"",repos:[],repo:null,repoPath:"",issues:[],totalIssues:null,closedIssues:null},i=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:l,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_QUERY":return Object(u.a)({},e,{query:t.query});case"SET_LOAD_START":return Object(u.a)({},e,{loadState:1,errorDetail:null});case"SET_LOAD_READY":return Object(u.a)({},e,{loadState:0});case"SET_LOAD_ERROR":return Object(u.a)({},e,{loadState:1,errorDetail:t.msg});case"REPO_SEARCH_MODE":return Object(u.a)({},e,{mode:0,repos:[],repo:null});case"SET_REPO_LIST":return Object(u.a)({},e,{repos:t.repos});case"SET_REPO":var n="".concat(t.repo.owner.login,"/").concat(t.repo.name);return Object(u.a)({},e,{repoPath:n,mode:1,query:n,repo:t.repo});case"SET_ISSUE_LIST":return Object(u.a)({},e,{mode:2,issues:t.issues.items,totalIssues:t.issues.total_count,closedIssues:t.issues.total_count-e.repo.open_issues_count});default:return e}},p=n(18),h=function(e){return{type:"SET_LOAD_ERROR",msg:e}},E=function(e){return{type:"SET_ISSUE_LIST",issues:e}},f=Object(p.debounce)(function(e,t){var n=t.query;e({type:"SET_LOAD_START"});var r=n.split(":")[0];e({type:"REPO_SEARCH_MODE"}),fetch("https://api.github.com/search/repositories?q=".concat(r)).then(function(e){return e.json()}).then(function(t){e({type:"SET_LOAD_READY"}),e({type:"SET_REPO_LIST",repos:t.items})}).catch(function(t){e(h(t.stack))})},500),m=function(e){return{type:"SET_QUERY",query:e}},d=Object(o.b)(function(e,t){return{value:e.query}},function(e,t){return{handleChange:function(t){return e((n=t.target.value,function(e,t){e(m(n)),f(e,t())}));var n}}})(function(e){var t=e.value,n=e.handleChange;return a.a.createElement("input",{className:"Search",type:"text",placeholder:"Search repositories...",value:t,onChange:function(e){return n(e)}})}),O=n(3),b=n(4),_=n(6),S=n(5),j=n(7),v=function(e){function t(){return Object(O.a)(this,t),Object(_.a)(this,Object(S.a)(t).apply(this,arguments))}return Object(j.a)(t,e),Object(b.a)(t,[{key:"render",value:function(){var e=this.props,t=e.name,n=e.owner,r=e.description,c=e.onClick,o="".concat(n.login,"/").concat(t);return a.a.createElement("li",{title:r},a.a.createElement("a",{href:"#/".concat(o),onClick:c},o))}}]),t}(r.Component),y=function(e){function t(){return Object(O.a)(this,t),Object(_.a)(this,Object(S.a)(t).apply(this,arguments))}return Object(j.a)(t,e),Object(b.a)(t,[{key:"render",value:function(){var e=this.props,t=e.name,n=e.html_url,r=e.owner,c=e.stargazers_count,o=e.watchers_count,s=e.forks_count,u=e.description,l=e.onClickIssues,i="".concat(r.login,"/").concat(t);return a.a.createElement("div",null,a.a.createElement("a",{target:"blank",href:n},"External Link"),a.a.createElement("h3",null,r.login,"/",t),a.a.createElement("p",null,u),a.a.createElement("p",null,"Stars: ",c),a.a.createElement("p",null,"Watchers: ",o),a.a.createElement("p",null,"Forks: ",s),a.a.createElement("a",{href:"#/".concat(i,"/issues"),onClick:l},"Issues"))}}]),t}(r.Component),g=n(19),T=function(e){function t(){return Object(O.a)(this,t),Object(_.a)(this,Object(S.a)(t).apply(this,arguments))}return Object(j.a)(t,e),Object(b.a)(t,[{key:"render",value:function(){var e=this;return a.a.createElement("div",null,a.a.createElement("canvas",{ref:function(t){t&&new g(t.getContext("2d")).Pie(e.props.data)}}))}}]),t}(r.Component),k=function(e){function t(){return Object(O.a)(this,t),Object(_.a)(this,Object(S.a)(t).apply(this,arguments))}return Object(j.a)(t,e),Object(b.a)(t,[{key:"render",value:function(){var e=this.props,t=e.issues,n=e.total,r=e.closed,c=e.onClickFilter,o=n-r;return t?a.a.createElement("div",null,a.a.createElement(T,{data:[{label:"Open",value:o,color:"red"},{label:"Closed",value:r,color:"green"}]}),a.a.createElement("button",{onClick:function(){return c("")}},"All"),a.a.createElement("button",{onClick:function(){return c("open")}},"Open"),a.a.createElement("button",{onClick:function(){return c("closed")}},"Closed"),a.a.createElement("ul",null,t.map(function(e){return a.a.createElement("li",{key:e.id},a.a.createElement("a",{target:"blank",href:e.html_url},e.title))}))):null}}]),t}(r.Component),R=Object(o.b)(function(e,t){return{loadState:e.loadState,errorDetail:e.errorDetail,mode:e.mode,repos:e.repos,repo:e.repo,issues:e.issues,totalIssues:e.totalIssues,closedIssues:e.closedIssues}},function(e,t){return{selectRepo:function(t){return e({type:"SET_REPO",repo:t})},repoIssues:function(){return e(function(e,t){var n=t().repoPath;e({type:"SET_LOAD_START"}),e(m(n+":issues")),fetch("https://api.github.com/search/issues?q=repo:".concat(n,"+type:issue")).then(function(e){return e.json()}).then(function(t){e({type:"SET_LOAD_READY"}),e(E(t))}).catch(function(t){e(h(t.stack))})})},filterIssues:function(t){return e((n=t,function(e,t){var r=t(),a=r.query,c=r.repoPath,o=a.split(":");if((2!==o.length||""!==n)&&!(o.length>2&&o[2]===n)){var s="";a=c+":issues",n.length>0&&(s+="+state:"+n,a+=":"+n),e({type:"SET_LOAD_START"}),e(m(a)),fetch("https://api.github.com/search/issues?q=repo:".concat(c,"+type:issue").concat(s)).then(function(e){return e.json()}).then(function(t){e({type:"SET_LOAD_READY"}),e(E(t))}).catch(function(t){e(h(t.stack))})}}));var n}}})(function(e){var t=e.loadState,n=e.errorDetail,r=e.mode,c=e.repos,o=e.repo,s=e.issues,u=e.totalIssues,l=e.closedIssues,i=e.selectRepo,p=e.repoIssues,h=e.filterIssues;switch(t){case 1:return a.a.createElement("p",null,"Loading...");case 1:return a.a.createElement("pre",null,n);case 0:switch(r){case 0:return a.a.createElement("ul",null,c.map(function(e){return a.a.createElement(v,Object.assign({},e,{key:e.id,onClick:function(){return i(e)}}))}));case 1:return a.a.createElement(y,Object.assign({},o,{onClickIssues:function(){return p()}}));case 2:return a.a.createElement(k,{issues:s,total:u,closed:l,onClickFilter:function(e){return h(e)}});default:return null}default:return null}}),I=n(20),C=Object(s.c)(i,Object(s.a)(I.a));Object(c.render)(a.a.createElement(o.a,{store:C},a.a.createElement("div",{className:"App"},a.a.createElement(d,null),a.a.createElement(R,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[21,2,1]]]);
//# sourceMappingURL=main.4ac49783.chunk.js.map