//gọi dom các element
const uploadInput=document.querySelector('#image-upload')
const articleField = document.querySelector('.article');
const createBtn=document.querySelector('.createBtn')
const blogTitleField = document.querySelector('#title');
// banner
const bannerImage = document.querySelector('#banner-upload');
const banner = document.querySelector('.banner');
let bannerPath;

bannerImage.addEventListener('change', () => uploadImage(bannerImage, 'banner'));

console.log(uploadInput)
console.log(articleField)
// const blog=require('./blog')

//thêm hàm upload Image và add image
const uploadImage = (uploadFile, uploadType) => {
    const bannerPathEle=document.querySelector('.banner-path')
    const [file] = uploadFile.files;
    if (file && file.type.includes('image')) {
        const formData = new FormData();
        formData.append('image', file);

        fetch('/upload', {
            method: 'post',
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                if (uploadType === 'image') {
                    addImage(data, file.name);
                }
                else{
                    // console.log('it is not image')
                    bannerPath = `${data}`;
                    banner.style.backgroundImage = `url("${bannerPath}")`;
                    bannerPathEle.value=bannerPath
                }
            })
            .catch(() => alert('Lỗi upload ảnh.'));
    } else {
        alert('Chỉ upload file ảnh.');
    }
};

const addImage = (imagePath, alt) => {
    const curPos = articleField.selectionStart;
    const textToInsert = `\r![${alt}](${imagePath})\r`;
    articleField.value =
        articleField.value.slice(0, curPos) + textToInsert + articleField.value.slice(curPos);
}
// thêm sự kiện
uploadInput.addEventListener('change', () => uploadImage(uploadInput, 'image'));

// thêm sự kiện nút create
createBtn.addEventListener('click', () => {
    if (articleField.value.length && blogTitleField.value.length) {
        let docName;
        const date = new Date(); // Ngày xuất bản

        const blogData = {
            title: blogTitleField.value,
            content: articleField.value,
            publishedAt: `${date.getDate()} ${date.getMonth()} ${date.getFullYear()}`,
            bannerImage: bannerPath,
        };
        console.log(blogData)
        } else {
        alert('Điền đủ thông tin Tiêu đề và nội dung Blog.');
    }
});
