// إذا لم يكن هناك بيانات في الجهاز قم بجلبها
if (localStorage.getItem("data") === null) {
  fetch("http://localhost/api/?key=xxx", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      // أخزنها في الجهاز
      localStorage.setItem("data", JSON.stringify(data));
    })
    .catch((rej) => {
      // إذا حصل مشكل ما فاظهر له رساله خطا
      document.getElementById("ccs").innerHTML = `
    <div id="err" class="h-screen w-full absolute top-0" style="background-color: rgba(0, 0, 0, 0.422);">
      <div class="absolute left-1/2 text-white top-1/2 rounded-xl -translate-x-1/2 -translate-y-1/2 bg-red-300 border border-red-500 w-72 aspect-square">
        <button onclick="deleteMe('err')" class="text-3xl px-2 rounded-xl text-black m-4 leading-tight aspect-square">X</button>
        <h1 class="text-center text-2xl text-black">حدث خطأ ما!</h1>
        <h3 class="text-center text-md text-black w-10/12 mx-auto mt-5">هناك خطا في السيرفر يرجى التاكد من الاتصال او يمكنك التواصل مع صاحب الموقع.</h3>
        <h5 class="text-center text-sm text-black w-11/12 mx-auto mt-5" id="countDown">سيتم إعادة تحميل الموقع خلال: 15 ثانية.</h5>
        <a href="https://t.me/ZVINZV" class="flex w-fit mx-auto text-center text-black hover:text-blue-500 underline mt-4">Telegram</a>
        <a href="https://t.me/ZVINZV" class="flex w-fit mx-auto text-center text-black hover:text-blue-500 underline ">Facebook</a>
        <a href="https://t.me/ZVINZV" class="flex w-fit mx-auto text-center text-black hover:text-blue-500 underline mb-4">Instagram</a>
        </div>
    </div>`;
      // العداد
      let i = 15;
      setInterval(() => {
        i--;
        let leftTimeToReload = document.getElementById("countDown");
        if (i > 10) {
          leftTimeToReload.innerHTML = `سيتم إعادة تحميل الموقع خلال: ${i} ثانية.`;
        } else if (i < 3 && i > 1) {
          leftTimeToReload.innerHTML = `سيتم إعادة تحميل الموقع خلال: ثانيتان.`;
        } else if (i == 1) {
          leftTimeToReload.innerHTML = `سيتم إعادة تحميل الموقع خلال: ثانية.`;
        } else if (i != 0) {
          leftTimeToReload.innerHTML = `سيتم إعادة تحميل الموقع خلال: ${i} ثواني.`;
        } else {
          leftTimeToReload.innerHTML = `سيتم إعادة تحميل الموقع حالاً.`;
        }
      }, 1000);
      setTimeout(() => {
        location.reload();
      }, 15500);
    });
  // ابدا في اظهار البيانات
  addApp(JSON.parse(localStorage.getItem("data")));
} else {
  // ابدا في اظهار البيانات
  addApp(JSON.parse(localStorage.getItem("data")));
}

function addApp(data) {
  let mainHTML = document.querySelector(".main");
  data.forEach((singleData) => {
    mainHTML.innerHTML += `<div class="wrapper bg-slate-600 hover:bg-slate-700 transition-all p-7 rounded-2xl flex flex-col items-center" style=" width: clamp(150px, 90vw, 500px);">
  <div class="card h-full flex flex-col justify-between text-center w-full gap-10">
    <div class="header flex flex-wrap justify-between items-center">
      <div class="header_2 flex flex-wrap pl-5 items-center gap-3">
        <div class="img rounded-xl overflow-hidden flex items-center" style="width: 115.5px; aspect-ratio: 1/1;">
          <img src=${singleData.photo} style="width: 100%; object-fit: cover;">
        </div>
        <div class="info text-right flex flex-col gap-1">
          <h1 class="text-2xl text-slate-50">${singleData.name}</h1>
          <h1 class="text-md "><a href=${singleData.web} target="_blank" class="text-slate-400 hover:text-blue-600 hover:underline">${singleData.web}</a></h1>
        </div>
      </div>
      <div>
        <p class="text-4xl px-2 py-5 text-slate-50">#${singleData.id}</p>
      </div>
    </div>
  </div>
  </div>`;
  });
}

function deleteMe(id) {
  document.getElementById(id).remove();
}
