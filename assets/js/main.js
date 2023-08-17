const qs = s => document.querySelector(s) ?? document.createElement("span");
const qsa = s => document.querySelectorAll(s);

const modalUser = qs('.modal-user');
const modalUserInfo = qs('.modal-user-info');
const modalCommentInfo = qs('.modal-comment-info');
const modalCommentInfoUl = qs('.modal-comment-info-ul');
const modalComment = qs('.modal-comment');
const posts = qs('.posts');

window.addEventListener('click', (e) => {
    if (e.target == modalUser || e.target == modalComment) {
        modalUser.style.display = "none";
        modalComment.style.display = "none";
    }
})
fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(result => {
        result.forEach(element => {
            posts.innerHTML += `
            <div class="post">
                <div class="post-main">
                    <h3 class="title">${element.title}</h3>
                    <p class="body">${element.body}</p>
                </div>
                <div class="info-click">
                    <button class="user-info-btn"><i id="${element.userId}" class="fa-solid fa-user-secret"></i></button>
                    <button class="comment-info-btn"><i id="${element.id}" class="fa-regular fa-comments"></i></button>
                </div>
            </div>`
            
        });
        bindClickActions();
        

        
      });
function getUserDetail(id) {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(response => response.json())
        .then(result => modalBody(result))
}


function bindClickActions () {
    for (const btn of document.querySelectorAll('.user-info-btn')) {
        btn.addEventListener('click', (e) => {
            // console.log(e.target.id)
            getUserDetail(e.target.id);
            modalUser.style.display = "block";
        });
    };
    for (const btn1 of document.querySelectorAll('.comment-info-btn')) {
        btn1.addEventListener('click', (e) => {
            // console.log(e.target)
            getPostComments(e.target.id)
            modalComment.style.display = "block";
        });
    };
};

function modalBody(result){
    console.log(result)
    modalUserInfo.innerHTML=''
    modalUserInfo.innerHTML += `
    <div class="user-info">
        <span id="name"><strong>name:</strong> ${result.name}</span>
        <span id="user-name"><strong>username:</strong> ${result.username}</span>
        <span id="e-mail"><strong>email:</strong> ${result.email}</span>
        <span id="name"><strong>phone:</strong>${result.phone}</span>
        <span id="name"><strong>website:</strong> ${result.website}</span>
    </div>
    `
}

function getPostComments(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
    .then(response => response.json())
    .then(result => {
        modalCommentInfoUl.innerHTML=''
        result.forEach(comment => {
            console.log(comment.body)
            modalCommentInfoUl.innerHTML += `
            <li>${comment.body}</li>
            `
        });
    })
}
