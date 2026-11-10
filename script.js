const products = [
  {id:1,name:"Everyday Linen Shirt",category:"Tops",price:1299,tag:"BESTSELLER",desc:"A relaxed-fit everyday shirt in a soft neutral tone.",image:"https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=700&q=80"},
  {id:2,name:"Soft Drape Midi Dress",category:"Dresses",price:1899,tag:"NEW",desc:"An easy midi silhouette for casual plans and weekends.",image:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=80"},
  {id:3,name:"Straight-Leg Denim",category:"Bottoms",price:1599,tag:"EASY STYLE",desc:"A versatile denim staple with a straight-leg shape.",image:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=700&q=80"},
  {id:4,name:"Everyday White Sneakers",category:"Shoes",price:2199,tag:"POPULAR",desc:"A clean everyday sneaker for relaxed outfits.",image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80"},
  {id:5,name:"Structured Shoulder Bag",category:"Accessories",price:1499,tag:"EDITOR'S PICK",desc:"A minimal shoulder bag with a structured finish.",image:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80"},
  {id:6,name:"Classic Cotton Tee",category:"Tops",price:699,tag:"EVERYDAY",desc:"A simple cotton tee that pairs with almost anything.",image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80"},
  {id:7,name:"Tailored Wide-Leg Pants",category:"Bottoms",price:1799,tag:"NEW",desc:"Tailored trousers for a polished, comfortable look.",image:"https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=700&q=80"},
  {id:8,name:"Minimal Everyday Flats",category:"Shoes",price:1199,tag:"COMFORT",desc:"Simple flats designed for everyday styling.",image:"https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=700&q=80"}
];
let activeCategory = "All";
let savedLooks = JSON.parse(localStorage.getItem("fitlookLooks") || "[]");
let uploadedAvatarData = "";

const $ = (id) => document.getElementById(id);
function toast(message){const el=$("toast");el.textContent=message;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2600)}
function money(value){return "₹"+Number(value).toLocaleString("en-IN")}

function showPage(page){
  document.querySelectorAll(".page").forEach(p=>p.classList.toggle("active",p.id==="page-"+page));
  document.querySelectorAll(".nav-link").forEach(b=>b.classList.toggle("active",b.dataset.page===page));
  $("mainNav").classList.remove("open");
  window.scrollTo({top:0,behavior:"smooth"});
}
document.querySelectorAll("[data-page]").forEach(btn=>btn.addEventListener("click",()=>showPage(btn.dataset.page)));
$("menuToggle").addEventListener("click",()=>$("mainNav").classList.toggle("open"));

function renderProducts(){
  const query=$("searchInput").value.toLowerCase().trim();
  const filtered=products.filter(p=>(activeCategory==="All"||p.category===activeCategory)&&(p.name.toLowerCase().includes(query)||p.category.toLowerCase().includes(query)));
  $("productGrid").innerHTML=filtered.length?filtered.map(p=>`<article class="product-card" data-id="${p.id}"><div class="product-photo"><img src="${p.image}" alt="${p.name}" loading="lazy"><span class="product-tag">${p.tag}</span></div><div class="product-info"><h3>${p.name}</h3><p>${p.category} · Demo collection</p><span class="product-price">${money(p.price)}</span></div></article>`).join(""):`<div class="empty-state"><h3>No products found</h3><p>Try another search or category.</p></div>`;
  document.querySelectorAll(".product-card").forEach(card=>card.addEventListener("click",()=>{const p=products.find(x=>x.id===Number(card.dataset.id));$("productUrl").value="";$("urlStatus").textContent=`Selected: ${p.name} — ${money(p.price)}. You can continue to Virtual try-on.`;showPage("tryon");$("selectedLook").textContent=p.name;$("tryonMessage").textContent=p.desc;}));
}
$("searchInput").addEventListener("input",renderProducts);
document.querySelectorAll(".filter-chip").forEach(btn=>btn.addEventListener("click",()=>{activeCategory=btn.dataset.category;document.querySelectorAll(".filter-chip").forEach(x=>x.classList.toggle("active",x===btn));renderProducts()}));
renderProducts();

function previewImage(file,target,mode){
  if(!file||!file.type.startsWith("image/")){toast("Please choose an image file.");return}
  const reader=new FileReader();
  reader.onload=()=>{const data=reader.result;if(mode==="avatar"){uploadedAvatarData=data;$("avatarStage").innerHTML=`<img src="${data}" alt="Your uploaded avatar reference photo">`;$("profileAvatar").innerHTML=`<img src="${data}" alt="Profile photo">`;toast("Photo preview added locally.");}else{$("urlStatus").textContent="Image uploaded for this demo. Product details still need to be entered manually.";toast("Product image selected.");}}
  reader.readAsDataURL(file);
}
$("avatarInput").addEventListener("change",e=>previewImage(e.target.files[0],null,"avatar"));
$("productImageInput").addEventListener("change",e=>previewImage(e.target.files[0],null,"product"));

$("analyseUrlBtn").addEventListener("click",()=>{
  const url=$("productUrl").value.trim();
  if(!url){$("urlStatus").textContent="Paste a product URL first, or upload a product image.";return}
  try{const parsed=new URL(url);if(!["http:","https:"].includes(parsed.protocol))throw new Error();$("urlStatus").textContent="URL received. This prototype cannot fetch retailer product details yet; use the image-upload fallback or enter product details manually.";toast("Product link captured for the demo.");}
  catch{$("urlStatus").textContent="Please enter a valid URL beginning with https://";}
});

document.querySelectorAll(".look-option").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".look-option").forEach(x=>x.classList.toggle("selected",x===btn));$("selectedLook").textContent=btn.dataset.look;$("tryonMessage").textContent="Selected demo outfit: "+btn.dataset.look+". A real AI clothing-transfer preview is not connected yet.";}));
$("saveLookBtn").addEventListener("click",()=>{const look=$("selectedLook").textContent;savedLooks.push(look);localStorage.setItem("fitlookLooks",JSON.stringify(savedLooks));$("savedCount").textContent=savedLooks.length;toast("Look saved in this browser demo.");});

$("recommendBtn").addEventListener("click",()=>{
  const budget=Math.max(0,Number($("budget").value)||0);
  const colour=$("colourPreference").value;
  const style=$("stylePreference").value;
  const occasion=$("occasion").value;
  const matches=products.filter(p=>p.price<=budget).slice(0,4);
  $("recommendations").innerHTML=matches.length?`<p class="microcopy">Sample suggestions for ${occasion.toLowerCase()} · ${style} style · ${colour.toLowerCase()} · Budget ${money(budget)}.</p><div class="recommendation-list">${matches.map(p=>`<div class="recommendation-item"><div><b>${p.name}</b><small>${p.category} · Example recommendation</small></div><strong>${money(p.price)}</strong></div>`).join("")}</div><p class="microcopy">These are rule-based demo suggestions from the sample catalog, not AI-generated or live shopping results.</p>`:`<div class="empty-state"><h3>No sample products in this budget</h3><p>Try increasing your budget to see demo suggestions.</p></div>`;
});

$("compareBtn").addEventListener("click",()=>{
  const name=$("compareName").value.trim()||"Selected product";
  const base=1899;
  $("comparisonResult").innerHTML=`<div class="panel"><span class="eyebrow">DEMO PRICE RESULTS</span><h2>${name.replace(/[<>]/g,"")}</h2><table class="price-table"><thead><tr><th>SHOPPING SOURCE</th><th>LISTED PRICE</th><th>NOTE</th></tr></thead><tbody><tr><td>Original listing</td><td>${money(base)}</td><td>Example price</td></tr><tr><td>Store B</td><td class="best-price">${money(1699)}</td><td>Lowest demo price</td></tr><tr><td>Store C</td><td>${money(1799)}</td><td>Similar item</td></tr></tbody></table><p class="microcopy">Fictional sample values for demonstrating the interface. No retailer was searched.</p></div>`;
});

function loadProfile(){
  const data=JSON.parse(localStorage.getItem("fitlookProfile")||"{}");
  ["fullName","age","height","usualSize","chest","waist","hip","profileBudget","profileStyle","profileColours"].forEach(k=>{if(data[k]!==undefined)$(k).value=data[k]});
  if(data.photo){uploadedAvatarData=data.photo;$("profileAvatar").innerHTML=`<img src="${data.photo}" alt="Saved profile photo">`;$("avatarStage").innerHTML=`<img src="${data.photo}" alt="Saved avatar reference photo">`;}
  updateProfilePreview(data);
}
function updateProfilePreview(data){
  $("profileNamePreview").textContent=data.fullName||"Your name";
  $("profileMeta").textContent=[data.profileStyle,data.profileColours].filter(Boolean).join(" · ")||"Your style profile will appear here.";
  $("profileSizePreview").textContent=data.usualSize||"Not added";
  $("profileHeightPreview").textContent=data.height?data.height+" cm":"Not added";
  $("savedCount").textContent=savedLooks.length;
}
$("profileForm").addEventListener("submit",e=>{
  e.preventDefault();
  if(uploadedAvatarData&&!$("photoConsent").checked){$("profileStatus").textContent="Please confirm the photo-use consent before saving a profile photo.";return}
  const data={};["fullName","age","height","usualSize","chest","waist","hip","profileBudget","profileStyle","profileColours"].forEach(k=>data[k]=$(k).value);
  if(uploadedAvatarData&&$("photoConsent").checked)data.photo=uploadedAvatarData;
  localStorage.setItem("fitlookProfile",JSON.stringify(data));updateProfilePreview(data);$("profileStatus").textContent="Profile saved in this browser.";toast("Your demo profile has been saved.");
});
$("clearProfileBtn").addEventListener("click",()=>{localStorage.removeItem("fitlookProfile");localStorage.removeItem("fitlookLooks");savedLooks=[];uploadedAvatarData="";$("profileForm").reset();$("profileAvatar").textContent="F";$("avatarStage").innerHTML='<div class="avatar-placeholder"><div class="avatar-symbol">＋</div><b>Your avatar preview</b><span>Upload a full-body photo to see it here.</span></div>';$("savedCount").textContent="0";updateProfilePreview({});$("profileStatus").textContent="Saved demo profile data cleared from this browser.";toast("Demo profile cleared.");});
loadProfile();
