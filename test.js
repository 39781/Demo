const querystring = require('querystring');
var gbkDecodeURIComponent="";
var urls ="rid=1578072438958114&account_linking_token=ARS3km1BxahuxAj4k8srVl-VkFVKozlZnqmHeHa6A6Cousmay2jH1QIqJXVNS2XIvTyvqXQUvV8xXF_qKAVT4f4A3U55SQsAD2SU_S5YRI7yjw&redirect_uri=https%3A%2F%2Ffacebook.com%2Fmessenger_platform%2Faccount_linking%2F%3Faccount_linking_token%3DARS3km1BxahuxAj4k8srVl-VkFVKozlZnqmHeHa6A6Cousmay2jH1QIqJXVNS2XIvTyvqXQUvV8xXF_qKAVT4f4A3U55SQsAD2SU_S5YRI7yjw";
console.log(querystring.parse(urls, null, null,
                  { decodeURIComponent: "" }));
				  
				  