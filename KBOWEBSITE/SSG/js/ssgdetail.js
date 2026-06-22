document.getElementById("boardList").addEventListener("click", function(e){

    const card = e.target.closest(".card");
    if (!card) return;

    viewDetail(card.dataset.no);
});

let currentNo = null;

function viewDetail(no) {
    
    currentNo = no;
    fetch("/KBOWEBSITE/SSG/php/ssglist_detail.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "no=" + no
    })
    .then(res => res.json())
    .then(data => {

        if (data.result === "success") {

            const d = data.data;

            document.getElementById("modalBody").innerHTML = `
                <h2>${d.title}</h2>
                <p>작성자: ${d.user_id}</p>
                <p>${d.message}</p>
                `;
            
            const modifyBtn = document.getElementById("modifybtn");
            const deleteBtn = document.getElementById("deletebtn");

            if (data.is_owner) {
            modifyBtn.style.display = "inline-block";
            deleteBtn.style.display = "inline-block";
            } else {
            modifyBtn.style.display = "none";
            deleteBtn.style.display = "none";
            }
            
            openModal();

        } else {
            alert(data.msg);
        }
    })
    .catch(err => console.error(err));
}

function openModal() {
    document.getElementById("modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

window.onclick = function(e) {
    const modal = document.getElementById("modal");

    if (e.target === modal) {
        modal.style.display = "none";
    }
}

function modifyPost() {

    if (!currentNo) return;

    location.href = "ssgmodify.html?no=" + currentNo;
}

function deletePost() {

    if (!currentNo) return;

    if (!confirm("정말 삭제하시겠습니까?")) return;

    fetch("/KBOWEBSITE/SSG/php/ssgdelete.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "no=" + currentNo
    })
    .then(res => res.json())
    .then(data => {

        if (data.result === "success") {
            alert("삭제 완료");
            closeModal();
            loadBoard(1);
        } else {
            alert(data.msg);
        }
    });
}