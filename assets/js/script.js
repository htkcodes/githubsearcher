$(document).ready(function(){
console.log('Ready');

$('#search').on('keyup',function(e)
{
	let name=e.target.value;

	$.ajax({
		url:'https://api.github.com/users/'+name,
		data:{
			client_id:'57166f0db4da8ff87c05',
			client_secret:'50fa1bf7286bc67f21d9052a48de9c74e111d40d'
		}
	}).done(function(name){
        
$.ajax({
url:'https://api.github.com/rate_limit',
		data:{
			client_id:'57166f0db4da8ff87c05',
			client_secret:'50fa1bf7286bc67f21d9052a48de9c74e111d40d'
		}
    
}).done(function(rate) {
    let reponame=name.login;
   
    $.ajax({
        url:'https://api.github.com/users/'+reponame+'/repos',
        data:{
			client_id:'57166f0db4da8ff87c05',
			client_secret:'50fa1bf7286bc67f21d9052a48de9c74e111d40d',
            sort:'created: asc',
            per_page:5
		}
    }).done(function(repos)
           {
        $('.table #repos').empty();
         console.log('end');
        $.each(repos,function(index,repo){
            let cur=index;
            console.log(cur);
            let tempd=repo.description;
            
            if(!$.trim(tempd))
                {
                     $('.table #repos').append(`
<tr>
                                            <td>${cur+1}</td>
                                            <td>${repo.name}</td>
                                            <td>${repo.created_at}</td>
                                            <td><span class="label label-info">Released</span></td>
                                            <td></td>
                                        </tr>
                                        <tr>
`)  
                    
                }
            else
                {
                       $('.table #repos').append(`
<tr>
                                            <td>${cur+1}</td>
                                            <td>${repo.name}</td>
                                            <td>${repo.created_at}</td>
                                            <td><span class="label label-info">Released</span></td>
                                            <td>${repo.description}</td>
                                        </tr>
                                        <tr>
`)
                }
            
         
        });
    });
    $.ajax({
        url:'https://maps.googleapis.com/maps/api/geocode/json?address='+name.location+'&key=AIzaSyD5Uqvma9QtninswEeJAHQrTV_N9NWkarI'
    }).done(function(loca){
        
                      console.log(loca.results[0].geometry.location);
                        plat = loca.results[0].geometry.location.lat;
                plog = loca.results[0].geometry.location.lng;
        moveBus();
                      });
$('#noti-c').html(
`  
<a href="#" data-target="#" class="dropdown-toggle waves-effect waves-light"
                                   data-toggle="dropdown" aria-expanded="true">
                                    <i class="md md-notifications"></i> <span
                                        class="badge badge-xs badge-pink">${rate.resources.core.remaining}</span>
                                </a>

`
	)
});

		$('#profile-pic').html(
`
   <a href="" target=_blank class="dropdown-toggle waves-effect waves-light profile" data-toggle="dropdown" aria-expanded="true"><img src="${name.avatar_url}" " alt="user-img" class="img-circle"> </a>
 								<ul class="dropdown-menu">
                                    <li><a href="${name.html_url}" target=_blank><i class="ti-user m-r-5"></i> Profile</a></li>
                                </ul>

`
            
			);

        $('#follow').html(
          
       

`
             <div class="widget-simple-chart text-right card-box">
                           <div class="icon-w"><i class="fa fa-user" aria-hidden="true"></i></div>
                            <h3 class="text-success counter">${name.followers}</h3>
                            <p class="text-muted text-nowrap">Followers</p>
                        </div>     

`
            
        );
        
           let temp =name.name;
        
             if(!$.trim(temp))      
        {
            
            $('#s-n').html(
         
        `
 <h4 class="page-title"><p class="text-danger i-m">User has not set their name<i class="fa fa-exclamation-circle" aria-hidden="true"></i></p></h4>
`
        );
            
        }
        else
            
            {
                $('#s-n').html(
         
        `
 <h4 class="page-title">${name.name}</h4>
`
        );
                
            }
        
        
        
        $("#pub-repo").html(
            
                `
  <div class="widget-simple-chart text-right card-box">
                           <div class="icon-w"><i class="fa fa-terminal" aria-hidden="true"></i></div>
                            <h3 class="text-primary counter">${name.public_repos}</h3>
                            <p class="text-muted text-nowrap">Public Repos</p>
                        </div>     


`
        );
        
        let temail=name.email;
        
         if(!$.trim(temail))
             {
                  
        $("#email").html(
            ` 
<div  class="widget-simple-chart text-right card-box">
                             <div class="icon-w"><i class="fa fa-envelope" aria-hidden="true"></i></div>
                            <h3 class="text-pink counter"><p class="text-danger i-m">No email found.<i class="fa fa-exclamation-circle" aria-hidden="true"></i></p></h3>
                            <p class="text-muted text-nowrap">Email Address</p>
                        </div>
`
        );
             }
        else
            {
                 $("#email").html(
            ` 
<div  class="widget-simple-chart text-right card-box">
                             <div class="icon-w"><i class="fa fa-envelop" aria-hidden="true"></i></div>
                            <h3 class="text-pink counter">${name.email}</h3>
                            <p class="text-muted text-nowrap">Email Address</p>
                        </div>
`
        );
                
            }
        
        let tempc=name.company;
       if(!$.trim(tempc))
       {
               $("#company").html(
        `
  <div  class="widget-simple-chart text-right card-box">
                             <div class="icon-w"><i class="fa fa-building" aria-hidden="true"></i></div>
                            <h3 class="text-inverse counter">GitHub Inc</h3>
                            <p class="text-muted text-nowrap">Company</p>
                        </div>


`
        );
           
           
       }
        else{
                   $("#company").html(
        `
  <div  class="widget-simple-chart text-right card-box">
                             <div class="icon-w"><i class="fa fa-building" aria-hidden="true"></i></div>
                            <h3 class="text-inverse counter">${name.company}</h3>
                            <p class="text-muted text-nowrap">Company</p>
                        </div>


`
                           );
        }
 
    
});;

});
});