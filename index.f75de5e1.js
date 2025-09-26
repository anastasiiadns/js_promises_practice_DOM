"use strict";
document.addEventListener("DOMContentLoaded", ()=>{
    function showMessage(text, type) {
        const newDiv = document.createElement("div");
        newDiv.textContent = text;
        newDiv.setAttribute("data-qa", "notification");
        if (type === "success") newDiv.classList.add("success");
        if (type === "error") newDiv.classList.add("error");
        document.body.appendChild(newDiv);
    }
    const firstPromise = new Promise((resolve, reject)=>{
        let settled = false;
        const timer = setTimeout(()=>{
            if (!settled) {
                settled = true;
                const err = new Error("First promise was rejected");
                showMessage(err.message, "error");
                reject(err);
            }
        }, 3000);
        document.addEventListener("click", (e)=>{
            if (!settled) {
                settled = true;
                clearTimeout(timer);
                showMessage("First promise was resolved", "success");
                resolve();
            }
        });
    });
    const secondPromise = new Promise((resolve)=>{
        const handler = (e)=>{
            if (e.button === 0 || e.button === 2) {
                showMessage("Second promise was resolved", "success");
                resolve();
                document.removeEventListener("click", handler);
                document.removeEventListener("contextmenu", handler);
            }
        };
        document.addEventListener("click", handler);
        document.addEventListener("contextmenu", handler);
    });
    const thirdPromise = new Promise((resolve)=>{
        let leftClicked = false;
        let rightClicked = false;
        document.addEventListener("click", (e)=>{
            if (e.button === 0) {
                leftClicked = true;
                if (leftClicked && rightClicked) {
                    showMessage("Third promise was resolved", "success");
                    resolve();
                }
            }
        });
        document.addEventListener("contextmenu", ()=>{
            rightClicked = true;
            if (leftClicked && rightClicked) {
                showMessage("Third promise was resolved", "success");
                resolve();
            }
        });
    });
    firstPromise.catch(()=>{});
    secondPromise.then(()=>{});
    thirdPromise.then(()=>{});
});

//# sourceMappingURL=index.f75de5e1.js.map
