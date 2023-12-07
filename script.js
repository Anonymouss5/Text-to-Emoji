const enc_btn = document.querySelector(".enc_btn");
const dec_btn = document.querySelector(".dec_btn");
const enc_cont = document.querySelector(".enc_cont");
const dec_cont = document.querySelector(".dec_cont");
const rotate_ele = document.querySelector(".cont h1 span");
const enc_submit = document.querySelector(".enc_submit");
const dec_submit = document.querySelector(".dec_submit");

function on_button_click(){
    enc_btn.addEventListener("click", ()=> {
        dec_cont.style.display = "none";
        enc_cont.style.display = "block";
        enc_btn.classList.remove("active");
        dec_btn.classList.add("active");
        rotate_ele.style.transform = "rotate(0deg)";
        
        const heading = document.querySelector(".enc_h5");
        const mesg = document.querySelector(".enc_mesg");
        heading.style.display = "none";
        mesg.style.display = "none";
    })

    dec_btn.addEventListener("click", ()=> {
        enc_cont.style.display = "none"
        dec_cont.style.display = "block";
        dec_btn.classList.remove("active");
        enc_btn.classList.add("active");
        rotate_ele.style.transform = "rotate(180deg)";
        
        const heading = document.querySelector(".dec_h5");
        const mesg = document.querySelector(".dec_mesg");
        heading.style.display = "none";
        mesg.style.display = "none";
    })
}

function submit(){
    enc_submit.addEventListener("click", ()=> {
        let clutter = "";
        const input = document.querySelector("#enc_text").value;
        const password = document.querySelector("#enc_password").value;

        if (input && password){
            const str = input.split("");
            str.forEach((ele)=> {
                clutter += `&#128${ele.charCodeAt()} `;
            });

            const heading = document.querySelector(".enc_h5");
            const mesg = document.querySelector(".enc_mesg");
            heading.style.display = "block";
            mesg.style.display = "block";
            mesg.innerHTML = clutter;

            const icon = document.createElement("i");
            icon.classList.add("fa-regular");
            icon.classList.add("fa-copy");
            icon.classList.add("pos");

            mesg.appendChild(icon);

            let encrypt_data;
            if (JSON.parse(localStorage.getItem("enc_data"))){
                encrypt_data = JSON.parse(localStorage.getItem("enc_data"));
                encrypt_data.push({"pass": password, "inp": input, "clutter": clutter});
            }else{
                encrypt_data = [{"pass": password, "inp": input, "clutter": clutter}];
            }
            localStorage.setItem("enc_data", JSON.stringify(encrypt_data));

            icon.addEventListener("click", ()=> {
                copy_text(mesg);
            })
        }

        document.querySelector("#enc_text").value = "";
        document.querySelector("#enc_password").value = "";
    })

    dec_submit.addEventListener("click", ()=> {
        const input = document.querySelector("#dec_text").value;
        const password = document.querySelector("#dec_password").value;

        if (input && password){
            let new_clutter = "";
            let user = JSON.parse(localStorage.getItem('enc_data'));
            let new_str = input.split(" ");
            
            new_str.forEach(ele => {
                new_clutter += `&#${ele.codePointAt(0)} `;
            })
            
            let Ans;
            for (let ele of user){
                if (ele.clutter === new_clutter && password === ele.pass){
                    Ans = ele.inp;
                }
            }
           
            const heading = document.querySelector(".dec_h5");
            const mesg = document.querySelector(".dec_mesg");
            heading.style.display = "block";
            mesg.style.display = "block";
            
            const icon = document.createElement("i");
            icon.classList.add("fa-regular");
            icon.classList.add("fa-copy");
            icon.classList.add("pos");
            
            if (Ans){
                mesg.innerHTML = Ans;
                mesg.appendChild(icon);
                icon.addEventListener("click", ()=> {
                    copy_text(mesg);
                })
            }else{
                mesg.innerHTML = "invalid input / password";
            }
        }
        document.querySelector("#dec_text").value = "";
        document.querySelector("#dec_password").value = "";
    })
}

function copy_text(mesg){
    navigator.clipboard.writeText(mesg.innerText);
}

on_button_click();
submit();

// localStorage.clear();