(function(){'use strict';
const URL='https://bkigjpuszouqhryvtwmf.supabase.co';
const KEY='sb_publishable_5ROUJLeQU_shvC-kNdsW0g_TslaxWDo';
function clearClient(){try{localStorage.removeItem('buildup-session');sessionStorage.clear()}catch(e){}}
async function logout(){
  try{
    if(window.supabase?.createClient){const c=window.__BuildUpAuthClient||(window.__BuildUpAuthClient=window.supabase.createClient(URL,KEY,{auth:{persistSession:true,autoRefreshToken:true}}));
      const r=await c.auth.signOut(); if(r.error) throw r.error;
    }
    clearClient();
    location.replace(location.origin+'/?signedout=1');
  }catch(e){console.error('BuildUp sign-out failed',e);alert('Sign out failed. Please try again.');}
}
function wire(){
 document.addEventListener('click',function(e){
   const b=e.target.closest?.('button,a'); if(!b)return;
   const t=(b.textContent||'').trim().toLowerCase();
   if(t==='sign out'||t==='logout'){
     e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();logout();
   }
 },true);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',wire);else wire();
window.BuildUpAuthGuard={logout};
})();
