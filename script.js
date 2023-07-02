
// rendering the stories

let userStories = [
   
    {
        'name':'Julia Schmidt',
        'img': './profiles/1.jpg'
    },

    {
        'name':'Alex Lazeen',
        'img': './profiles/2.jpg'
    },

    {
        'name':'Soraj Musto',
        'img': './profiles/3.jpg'
    },

    {
        'name':'Marlon Hartmann',
        'img': './profiles/4.jpg'
    },

    {
        'name':'Laila Qasim',
        'img': './profiles/5.jpg'
    },

    {
        'name':'John Herzberg',
        'img': './profiles/6.jpg'
    },

    {
        'name':'Lamine Boubacar',
        'img': './profiles/7.jpg'
    },

    {
        'name':'Lea Schneider',
        'img': './profiles/8.jpg'
    },

    {
        'name':'Tom Fischer',
        'img': './profiles/9.jpg'
    }
];

let userPost = [
    {
        'name':'Alex Lazeen',
        'prifileImg': './profiles/2.jpg',
        'postImg': './images/03.jpg',
        'amountOfLikes':'203',
        'likeStatus': false,
        'postDescription': 'My favorite Car!',
        'comentsCreature':['Riyan'],
        'comments':['I wish i had a car like this...']
    },

    {
        'name':'Julia Schmidt',
        'prifileImg': './profiles/1.jpg',
        'postImg': './images/14.jpg',
        'amountOfLikes':'24',
        'likeStatus': false,
        'postDescription': 'knowledge is power',
        'comentsCreature':['Hozan',],
        'comments':['That is it!',]
    },

    {
        'name':'Laila Qasim',
        'prifileImg': './profiles/5.jpg',
        'postImg': './images/06.jpg',
        'amountOfLikes':'401',
        'likeStatus': false,
        'postDescription': 'My dear daughter, I love you more than my own Life...',
        'comentsCreature':['Dana', 'Athina'],
        'comments':['She is having fun!', 'Good looking picture!']
    },

    {
        'name':'Linda Hadi',
        'prifileImg': './profiles/10.jpg',
        'postImg': './images/13.jpg',
        'amountOfLikes':'203',
        'likeStatus': false,
        'postDescription': 'with my bestieee!!',
        'comentsCreature':['Lina', 'Max'],
        'comments':['Wow that look great', 'Have a nice vacation']
    },

    {
        'name':'Karwan',
        'prifileImg': './profiles/karwan.jpg',
        'postImg': './images/09.jpg',
        'amountOfLikes':'23',
        'likeStatus': false,
        'postDescription': 'one of the best days in my Life',
        'comentsCreature':[],
        'comments':[]
    },
];



function loadStories(){
    let storiesContainer = document.getElementById('user');   
     storiesContainer.innerHTML = '';
     for(let i in userStories){
        let user = userStories[i]
        storiesContainer.innerHTML +=`
        <div class="profile">
        <img src="${user['img']}" alt="">
        <p>${user['name']}</p>
        </div> 
        `
     }
}   


window.addEventListener('load', loadStories());


// rendering the content and the posts
function render(){
    let postSection = document.getElementById('posts');
    postSection.innerHTML = '';
    for(let i in userPost){
        let post = userPost[i];
        postSection.innerHTML += postTemplate(post, i);

            if(post['likeStatus']){
                document.getElementById(`like${i}`).style.color = 'red';  
            }
        
          showComments(i);
        }

        saveUserPostToLocalStorage();
        

    }


    function postTemplate(post, i){
        return /*html*/ `
        <div class="post">
               <div class="post-infos">
                   <img class="profile-img profile-icone" src="${post['prifileImg']}" alt="profleImg">
                   <p>${post['name']}</p>
                   <i class="bi-three-dots"></i>
               </div>

                   <div class="post-img">
                       <img src="${[post['postImg']]}" alt="">
                   </div>
               
               <div class="post-icones">
                   <i id ="like${i}" class="bi-heart-fill" onclick="likes(${i})" ></i>
                   <i class="bi-send"></i>
                   <i class="bi-chat-dots" onclick="sendUserTocommentInput(${i})"></i>
                   <i onclick="saveThePost(${i})" class="bi-bookmark"></i>
               </div>

               

               <div class="like-info">
                   <b><span id="like-amount${i}">${post['amountOfLikes']}</span>Likes</b>
                   <p id="description">${post['postDescription']}</p>
               </div>

               
               

               <div class="comments" id="commentSection${i}">
                      
               </div>

               <div class="comment-writing">
                   <input id="comment-text${i}" type="text" placeholder="comment...">
                   <button  onclick="addComment(${i})">Send</button>
               </div>
           </div>
       `;
    }



    //    Show the Comments and the Author of the comments
    function showComments(i){
        let post = userPost[i];
        let commentSection = document.getElementById(`commentSection${i}`);
        for(let j = 0; j<post['comments'].length; j++){
            let comments = post['comments'][j];
            let commentsName = post['comentsCreature'][j];
            commentSection.innerHTML += commentTemplate(i, commentsName, comments);
        }
}


    function commentTemplate(i, commentsName, comments){
        return /*html */`
        <div class="userprofile-for-comment" id="userprofile-for-comment">
        <b class="user-comment-name" id="user-comment-name${i}">${commentsName}</b>:
        <p class="user-comment" id="user-comment${i}">${comments}</p>       
        </div>
        
        `
    }

    // Adding new Comments

    function addComment(i){
        let input = document.getElementById(`comment-text${i}`);
        if(input.value){
        userPost[i]['comments'].push(input.value);
        userPost[i]['comentsCreature'].push("Karwan");
        } else{
            return console.log('Schreibe einen Kommentar')
        }
        render();
    }



    // Check if the User has Liked the post

    function likes(i){
        post = userPost[i];
        let iLiked = post['likeStatus'];
        let amountOfLikes = post['amountOfLikes'];
        let like = document.getElementById(`like${i}`);
        if(!post['likeStatus']){
            post['likeStatus'] = true;
            post['amountOfLikes']++;
            document.getElementById(`like${i}`).style.color = 'red';      
        }else{
            post['likeStatus'] = false;
            post['amountOfLikes']--;
            document.getElementById(`like${i}`).style.color = 'black';  
        }

        render();
}




function sendUserTocommentInput(i){
    let input = document.getElementById(`comment-text${i}`);
    input.focus();
}


function saveUserPostToLocalStorage(){
    let jsonString = JSON.stringify(userPost);
    localStorage.setItem("stroredPosts", jsonString);
}


function retrieveUserPostFromLocalStorage(){
   let storedString =localStorage.getItem("stroredPosts");
   if(storedString){
    userPost = JSON.parse(storedString);
   }
}

retrieveUserPostFromLocalStorage();


// rendering the suggestions
const suggestionAccounts = document.getElementById('suggestion-accounts');

let suggestionPro = [
    {
        'name':'Ameera Lazgeen',
        'img': './suggestions/s1.jpg',
        'workLocal': 'Director an Universität Oldenburg',
        'followStatus': false

    },

    {
        'name':'Azad Rojgar',
        'img': './suggestions/s2.jpg',
        'workLocal': 'Model',
        'followStatus': false
    },

    {
        'name':'Dalia Brennig',
        'img': './suggestions/s3.jpg',
        'workLocal': 'Infleuencer at youtube',
        'followStatus': false

    },

    {   'name':'Welid Musto',
        'img': './suggestions/s4.jpg',
        'workLocal': 'Automechaniker bei Mercedes',
        'followStatus': false

    }
]

retrieveSuggestFromLocalStorage();


function loadSuggestions(){
const suggestionAccounts = document.getElementById('suggestion-accounts');
suggestionAccounts.innerHTML = '';

for(let i in suggestionPro){
    const profile = suggestionPro[i];
    suggestionAccounts.innerHTML += suggestionTemplate(profile, i)

    if(profile['followStatus']){
        document.getElementById(`follow-btn${i}`).innerHTML = 'Followed'
    }
}

saveSuggestToLocalStorage()

}

loadSuggestions();



function suggestionTemplate(profile, i){
    return /* html*/`
    <div class="suggestion-profile">
        <div class="suggestion-info">
                <img id="suggestion-img" src="${profile['img']}" alt="profile">
            <div class="first-div">
                <h2>${profile['name']}</h2>
                <p class="workplace">${profile['workLocal']}</p>
            </div>
        </div>

        <button id="follow-btn${i}" class="sidbar-btn follow" onclick="followCheck(${i})">Follow</button>
    </div>
`
}


function followCheck(i){
    let profile = suggestionPro[i];
    if(!profile['followStatus']){
        profile['followStatus'] = true;
    } else{
        profile['followStatus'] = false;

    }
    loadSuggestions();

}


function saveSuggestToLocalStorage(){
    let suggestionProToString = JSON.stringify(suggestionPro);
    localStorage.setItem("savedSuggest", suggestionProToString);
}


function retrieveSuggestFromLocalStorage(){
    let stordSuggest = localStorage.getItem('savedSuggest');
    if(stordSuggest){
        suggestionPro =JSON.parse(stordSuggest)

    }
}


// Posting a post
let postDescription = document.getElementById('post-description')
function description(){
    userPost.push(
        {
        'name':'Karwan',
        'prifileImg': './profiles/karwan.jpg',
        'postImg': './images/11.jpg',
        'amountOfLikes':'0',
        'likeStatus': false,
        'postDescription': postDescription.value,
        'comentsCreature':[],
        'comments':[]

        }

    )

    render();
    closeWindow();
}



let publicPostDiv = document.getElementById('public-post-div');

function openWindow(){
    publicPostDiv.style.display = 'flex'
}


function closeWindow(){
    publicPostDiv.style.display = 'none'

}




// Open side-bar
let mobileSideBar = document.getElementById('mobile-side-bar')


function openSideBar(){
    mobileSideBar.style.transform = "translate(-20%)"

}


function closeMobileSideBar(){
     mobileSideBar.style.transform = "translate(100%)"
    
}





    

    





