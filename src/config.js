export const url_config = {
    base_url:""
}

if(process.env.NODE_ENV === 'production'){
    url_config.base_url = "https://www.interviewpublic.com"
} else {
    url_config.base_url = "http://localhost:8000"
}
