const blogElement = document.getElementById('blog-container')
let blogsRawData = []
let loadingTimeout = {}

function createBlogHTML(blogs) {
    const blogContentElement = blogs.map(function(blog) {
        return `
        <div class="flex flex-col md:flex-row gap-6 w-full">
                  <img
                    src="${blog.imageUrl}"
                    alt="feature image 1"
                    class="w-full md:w-auto"
                  />
                  <div class="flex flex-col gap-4 bg-wd-darkgrey p-6 grow">
                    <h3 class="text-2xl font-semibold">
                        ${blog.title}              
                    </h3>
                    <p class="text-xl font-light">
                      ${blog.description}              
                    </p>
                    <p>At ${blog.publishedDate}</p>
                    <a href="${blog.url}">Read more</a>
                  </div>
                </div>
        `
    }).join('')

    blogElement.innerHTML = blogContentElement
}

const blog = 
    {
        "title": "Forward Integration Executive(Test)",
        "description": "Nobis quo est corporis totam dolores. Rerum quam autem debitis dolores sunt et quis occaecati. Nam dolorem dolores.",
        "publishedDate": "4/1/2024",
        "imageUrl": "https://picsum.photos/300/200" 
    }

    function searchBlogs(element) {
        clearTimeout(loadingTimeout)

        blogElement.innerHTML = 'Loading...'
        loadingTimeout = setTimeout(() => {
            const filteredBlogs = blogsRawData.filter(function(blog) {
            return blog.title.toLowerCase().includes(element.value.toLowerCase())
        })
        createBlogHTML(filteredBlogs);
        }, 2000)
    }

    async function main() {
        const response = await axios.get('/scripts/blogs.json')
        // console.log(response.data)
        blogsRawData = response.data
        createBlogHTML(blogsRawData)
    }

    function sortBlogs(element) {

        const sortedBlogs = blogsRawData.sort(function(blogA, blogB) {
            let compareDate = new Date(blogA.publishedDate) - new Date(blogB.publishedDate)
            
            if (element.value === 'desc') {
                compareDate = new Date(blogB.publishedDate) - new Date(blogA.publishedDate)
            }
            return compareDate            
        })
        createBlogHTML(sortedBlogs)
    }

    main()