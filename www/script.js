$(document).ready(function(){
    console.log("Page Ready");
    $("#loginform").submit(function(event){
        event.preventDefault();
        ajaxPost();
    });
    function ajaxPost(){
        //Prepare Form Data from web form
        var formData = {
            email : $("#email").val(),
            upwd : $("#upwd").val()
        }
        //Do AJAX POST
        $.ajax({ 
            type : "POST",
            contentType : "application/json",
            url : window.location + "api/login",
            data : JSON.stringify(formData),
            dataType : 'json',
            success : function(customer){
                if (customer.valid == true){
                    $("#loginform").addClass("success");
                    $("#loginform").removeClass("fail");
                }
                else{
                    $("#loginform").removeClass("success");
                    $("#loginform").addClass("fail");
                }
                $("#postResultDiv").html("<p>" + "Post Successful! <br>" + "Email Address: " + customer.email + "</br>" + 
                "Password: " + customer.upwd + "</br>" + "Valid User: " + customer.valid + "</p>");
            },
            error : function(e){
                alert("Error!")
                console.log("Error: ",e);
            }
        });
        //Reset FormData after Posting
        resetData();
    }
    function resetData(){
        $("#email").val("");
        $("#upwd").val("");
    }
}); 