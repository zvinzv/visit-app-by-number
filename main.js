if(localStorage.getItem("data") === null){
  
  fetch("http://localhost/api/?key=xxx", {
    method: "GET"
  }).then(res => res.json()).then(data => {
    let ssc = document.getElementById("ssc")
  ssc.innerHTML = 
  `
  <div id="done" class="absolute flex items-center bg-green-300 border-2 border-green-700 z-40 bottom-0 right-0 w-80 m-4 p-2 rounded-md">
      <button onclick="deleteMe('done')" class="text-xl px-2 rounded-xl text-black m-1 leading-tight aspect-square">X</button>    
      <p>تم الاتصال بالخادم.</p>
    </div>
  `
  localStorage.setItem("data", JSON.stringify(data))
  main(JSON.parse(localStorage.getItem("data")))
}).catch(rej =>{
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
    </div>`
    let i = 15
    setInterval(()=>{
      i--
      let leftTimeToReload = document.getElementById("countDown")
      if(i > 10){
        leftTimeToReload.innerHTML = `سيتم إعادة تحميل الموقع خلال: ${i} ثانية.`
      }
      else if(i < 3 && i > 1){
        leftTimeToReload.innerHTML = `سيتم إعادة تحميل الموقع خلال: ثانيتان.`
      }else if(i == 1){
        leftTimeToReload.innerHTML = `سيتم إعادة تحميل الموقع خلال: ثانية.`
      }else if(i == 0){
        leftTimeToReload.innerHTML = `سيتم إعادة تحميل الموقع حالاً.`
      }
      else{
        leftTimeToReload.innerHTML = `سيتم إعادة تحميل الموقع خلال: ${i} ثواني.`
      }
    }, 1000)
  setTimeout(() => {
    location.reload()
  }, 15500);
})
  
}else{
  main(JSON.parse(localStorage.getItem("data")))
}

function main(data){
  let inputUser = document.getElementById('inputUser')
  let searchBtn = document.getElementById('searchBtn')
  let allBtn = document.getElementById('allBtn')

  inputUser.addEventListener("keydown", e => {
    if(e.key === "Enter" && e.target.value !== ""){
      getApp(+e.target.value, data)
    }else if(e.key === "Enter" && e.target.value === ""){
      document.getElementById("ccs").innerHTML = `
      <div id="err" class="h-screen w-full absolute top-0" style="background-color: rgba(0, 0, 0, 0.422);">
      <div class="absolute left-1/2 text-white top-1/2 rounded-xl -translate-x-1/2 -translate-y-1/2 bg-red-300 border border-red-500 w-72 aspect-square">
        <button onclick="deleteMe('err')" class="text-3xl px-2 rounded-xl text-black m-4 leading-tight aspect-square">X</button>
        <h1 class="text-center text-2xl text-black">حدث خطأ ما!</h1>
        <h3 class="text-center text-md text-black w-10/12 mx-auto mt-5">املاء الحقل رجاءً.</h3>
      </div>
    </div>`
    }
  })


  searchBtn.addEventListener("click", () =>{
    if(inputUser.value !== ""){
      getApp(+inputUser.value, data)
    }else if(inputUser.value === ""){
      document.getElementById("ccs").innerHTML = `
      <div id="err" class="h-screen w-full absolute top-0" style="background-color: rgba(0, 0, 0, 0.422);">
        <div class="absolute left-1/2 text-white top-1/2 rounded-xl -translate-x-1/2 -translate-y-1/2 bg-red-300 border border-red-500 w-72 aspect-square">
          <button onclick="deleteMe('err')" class="text-3xl px-2 rounded-xl text-black m-4 leading-tight aspect-square">X</button>
          <h1 class="text-center text-2xl text-black">حدث خطأ ما!</h1>
          <h3 class="text-center text-md text-black w-10/12 mx-auto mt-5">املاء الحقل رجاءً.</h3>
        </div>
      </div>`
    }
})



function getApp(id, data){
  let foundApp = false
  data.forEach(singleData => {
    if(singleData.id == id){
      foundApp = true
      window.open(singleData.web, "_blank")
    }
  })
  if(!foundApp){
    document.getElementById("ccs").innerHTML = `
    <div id="err" class="h-screen w-full absolute" style="top: 0 !important; background-color: rgba(0, 0, 0, 0.422);">
    <div class="absolute left-1/2 text-white top-1/2 rounded-xl -translate-x-1/2 -translate-y-1/2 bg-red-300 border border-red-500 w-72 aspect-square">
      <button onclick="deleteMe('err')" class="text-3xl px-2 rounded-xl text-black m-4 leading-tight aspect-square">X</button>
      <h1 class="text-center text-2xl text-black">حدث خطأ ما!</h1>
      <h3 class="text-center text-md text-black w-10/12 mx-auto mt-5">لا يوجد تطبيق بهذا الرقم.</h3>
    </div>
  </div>`
  }
}
}


function deleteMe(id){
  document.getElementById(id).remove()
}