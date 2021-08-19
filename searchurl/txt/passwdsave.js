(function () {
  var ask = true; /*true改为false默认记住不询问*/
  function go() {
    var allInput = document.querySelectorAll("input");
    var allShownInput = [];
    var name;
    var pass;
    for (var i = 0; i < allInput.length; i++) {
      if (allInput[i].offsetWidth != 0) {
        if (allInput[i].hasAttribute("type")) {
          if ((allInput[i].getAttribute("type") == "password") || (allInput[i].getAttribute("type") == "text"))
            allShownInput.push(allInput[i]);
        } else
          allShownInput.push(allInput[i]);
      }
    }
    for (i = 1; i < allShownInput.length; i++) {
      if (allShownInput[i].type == "password") {
        pass = allShownInput[i];
        name = allShownInput[i - 1];
      }
    }

    if ((!pass) || (!name)) return;

    if (ask) {
      if (!localStorage.xxM_ifrm) {
        if (confirm("记住本站密码吗？")) { /*这里可以更改询问语句*/
          localStorage.setItem("xxM_ifrm", "true");
          localStorage.xxM_ifrm = "true";
        } else {
          localStorage.setItem("xxM_ifrm", "false");
          return;
        }
      }
      if (localStorage.xxM_ifrm == "false") {
        return;
      }
    }

    if (!localStorage.xxM_name) {
      localStorage.setItem("xxM_name", "");
      localStorage.setItem("xxM_pass", "");
    }
    name.value = localStorage.xxM_name;
    pass.value = localStorage.xxM_pass;
    name.addEventListener("input", function () {
      localStorage.xxM_name = name.value;
    });
    pass.addEventListener("input", function () {
      localStorage.xxM_pass = pass.value;
    });

  }
  
  go();
})()
