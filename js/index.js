const loadPosts = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    const posts = data.posts;
    // console.log(posts);
    posts.map(post => {
        // console.log(post);
        const postsContainer = document.getElementById('posts-container');
        const postDiv = document.createElement('div');
        const isActive = post.isActive;
        const active = document.getElementById('active');
        const offline = document.getElementById('offline');
        if (isActive === false) {
            active?.classList?.add('hidden');
        }
        else {
            offline?.classList?.remove('hidden');
        }
        postDiv.innerHTML = `
    <!-- articles div -->
                <div class="bg-[#797DFC1a] p-10 my-5 rounded-3xl">
                    <div class="flex justify-center items-center gap-3">
                        <div id="active" class="avatar avatar-online">
                            <div class="w-24 rounded-full">
                                <img src="${post.image}" />
                            </div>
                        </div>
                        <div id="offline" class="hidden">
                            <div class="w-24">
                            <span class="absolute h-[20px] w-[20px] rounded-full bg-red-500 border-white border-2 left-30 lg:left-60"></span>
                            <img class="rounded-full" src="${post.image}" />
                            </div>
                        </div>
                        <div class="space-y-5">
                            <div class="flex justify-between items-center gap-3">
                                <p>#${post.category}</p>
                                <p>Author:${post.author.name}</p>
                            </div>
                            <h3 class="text-xl font-bold text-[#12132D]">${post.title}</h3>
                            <p class="text-[#12132D99]">${post.description}</p>
                            <hr class="border-dotted">
                            <div class="flex justify-between">
                            <div class="flex justify-between items-center gap-2">
                            <p class="flex items-center gap-3"><i class="fa-solid fa-message"></i> <span>${post.comment_count}</span></p>
                            <p class="flex items-center gap-3"><i class="fa-regular fa-eye"></i> <span>${post.view_count}</span></p>
                            <p class="flex items-center gap-3"><i class="fa-regular fa-clock"></i> <span>${post.posted_time}</span></p>
                            </div>
                            <button id="postBtn" onclick= "readBtn(true,'${post?.title.replace(/'/, '@')}','${post?.view_count}')" class="btn bg-[#10B981] rounded-full "><i class="fa-regular fa-envelope-open"></i></button>
                            </div>
                        </div>
                    </div>

                </div>
                `
        postsContainer.appendChild(postDiv);
    })
}

let count = 1;

const readBtn = (isClicked, title, view) => {
    console.log(isClicked, title, view);
    if (!isClicked) {
        mainPosts = '';
    }
    else {
        let totalReadPost = document.getElementById('total-read-post');
        let postCard = document.createElement('div');
        postCard.classList = 'container flex justify-between items-center bg-white shadow-lg p-5 rounded-3xl my-3';
        postCard.innerHTML = `
              <p class="font-bold">${title}</p>
              <p><i class="fa-solid fa-eye"></i> <span>${view ? view : 'Unknown'}</span></p>
              `;
        totalReadPost.appendChild(postCard);
        const markCount = document.getElementById('mark-count');
        markCount.innerText = count++;
    };
}

const latestPosts = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const posts = await res.json();
    // console.log(posts);

    posts.map(post => {
        console.log(post);
        const latestPosts = document.getElementById('latest-container');

        const div = document.createElement('div');
        div.innerHTML = `
            <div class="card bg-base-100 shadow-sm">
                <figure class="px-10 pt-10">
                    <img src="${post?.cover_image}"
                    alt="Shoes" class="rounded-xl" />
                </figure>
                <div class="card-body">
                <p><i class="fa-solid fa-calendar mr-3"></i> ${post?.author?.posted_date ? post?.author?.posted_date : 'No Published Date'}</p>
                    <h2 class="card-title">${post?.title}</h2>
                    <p>${post?.description}</p>
                    <div class="card-actions">
                        <div class="avatar">
                            <div class="w-11 rounded-full">
                                <img  src="${post?.profile_image}" />
                            </div>
                        </div>
                        <div>
                        <h5>${post?.author?.name}</h5>
                        <p>${post?.author?.designation? post?.author?.designation : 'Unknown'}</p>
                        </div>
                    </div>
                </div>
            </div>
            `

        latestPosts.appendChild(div);
    });

}

loadPosts();
latestPosts();