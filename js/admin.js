const back_end_domain = 'http://35.225.243.133'
var user_data = JSON.parse(localStorage.getItem('user_data'));


    if(user_data && user_data.hasOwnProperty('token')){
        var token = user_data['token'];
        $('body').show();
    }
    else{
        window.location = 'login.html';
    }
$(document).ready(function(){
    $.ajax({
        url: `${back_end_domain}/api/categories/`,
        method: 'GET',
        success: function(result, textStatus, xhr){
            var esas = $('.bottom')
            for(var i in result){
                $('#choosecate').append(
                    `<option>${result[i].id}. ${result[i].title}</option>`
                )   
                esas.append(
                ` <table>
                <tr>
                    <td>${result[i].id}</td>
                    <td>${result[i].title}</td>
                    <td>${result[i].icon_svg}</td>
                </tr>
            </table>`
                )
            }

        },
        error: function(errorResult){
            var esas = $('.sticky-outer-wrapper')
            var wrapper = $('.sticky-inner-wrapper')
            var sticky = $('.sticky-inner-wrapper_in')
                esas.append(
                    `<div class="sticky-inner-wrapper">
                    <div class="sticky-inner-wrapper_in">
                        <div class="sticky-inner-wrapper_in_in">
                            <span>No Category</span>
                        </div>
                        
                    </div>
                    
                </div>`
                )
                wrapper.append(sticky)
                esas.append(wrapper)
            console.log(errorResult)
        },
    })


    $.ajax({
        url: `${back_end_domain}/api/products/`,
        method: 'GET',
        success: function(result, textStatus, xhr){
            var esas = $('.full-md')
            for(var i in result){
                if(result[i].discount_price){
                    discount = (result[i].discount_price / result[i].price) * 100
                    esas.append(
                        ` <div class="cart">
                        <div class="cart-in_top">
                            <img src="${result[i].main_image}" alt="">
                            <span class="sale">Sale</span>
                            <span class="discount">${discount.toFixed(2)} OFF</span>
                        </div>
                        <div class="cart-in_bottom">
                            <h3>${result[i].title}</h3>
                            <span>${result[i].amount_by_unit} ${result[i].unit}</span>
                            <div class="price_detail">
                                <span class="normal_price">${result[i].discount_price}</span>
                                <span class="discount_price">${result[i].price}</span>
                            </div>
                        </div>
                    </div>`
                    )
                }
                else{
                    esas.append(
                        ` <div class="cart">
                        <div class="cart-in_top">
                            <img src="${result[i].main_image}" alt="">
                            <span class="sale"></span>
                            <span class="discount"></span>
                        </div>
                        <div class="cart-in_bottom">
                            <h3>${result[i].title}</h3>
                            <span>${result[i].amount_by_unit} ${result[i].unit}</span>
                            <div class="price_detail">
                                <span class="normal_price">${result[i].price}</span>
                            </div>
                        </div>
                    </div>`
                    )
                }
                
            }
        },
        error: function(errorResult){
            var esas = $('.sticky-outer-wrapper')
            var wrapper = $('.sticky-inner-wrapper')
            var sticky = $('.sticky-inner-wrapper_in')
                esas.append(
                    `<div class="sticky-inner-wrapper">
                    <div class="sticky-inner-wrapper_in">
                        <div class="sticky-inner-wrapper_in_in">
                            <span>No Category</span>
                        </div>
                        
                    </div>
                    
                </div>`
                )
                wrapper.append(sticky)
                esas.append(wrapper)
            console.log(errorResult)
        },
    })
    $('#logout').on("click",function(){
        localStorage.clear()
        window.localation.href = 'index.html'
    })  
    var lgclick = false
    $('#projectBtn').on('click',function(){
        if(lgclick === false){
        $('.addProduct').hide()
            $('.addProduct').show()
            $('.addProduct').removeClass('animated fadeOutRight')
            $('.addProduct').addClass('animated fadeInRight')
            lgclick = true
        }
    })
    $('.cancelbtn').on('click',function(){
        if(lgclick === true){
            lgclick = false
        $('.addProject').removeClass('animated fadeInRight')
        $('.addProduct').addClass('animated fadeOutRight')
        }
    })
    $('#adprx').on('click',function(){
        if(lgclick === true){
            lgclick = false
        $('.addProject').removeClass('animated fadeInRight')
        $('.addProduct').addClass('animated fadeOutRight')
        }
    })

// Send Project

$('.middle form').submit(function (e){
    e.preventDefault();
    var form = new FormData(this);
    if($('[name="main_image"]')[0].files.length !== 0){
        form.append('main_image', $('[name="main_image"]')[0].files[0], $('[name="main_image"]').val());
    }
    $.ajax({
        url: `${back_end_domain}/api/products/`,
        method: 'POST',
        data: form,
        headers: {
            'Authorization': `Token ${token}`
        },
        enctype: 'multipart/form-data',
        cache:false,
        processData: false,
        contentType: false,
        success: function(result, textStatus, xhr){
            console.log(result);
            if (xhr.status === 201){
                window.location = 'adminpanel.html'
            }else{
                alert('Sehvlik var!');
            }
        },
        error: function(errorResult){
            var errors = errorResult.responseJSON;
            if (errors.hasOwnProperty('non_field_errors')){
                $('#non_field_errors').text(errors['non_field_errors']);
            }
            for(var error in errors){
                $(`input[name=${error}]`).siblings('small').text(errors[error]);
            }
            if (errorResult.statusText ==='error'){
                window.location = 'login.html';
            }
            console.log(errorResult);
            console.log(errors);
        },
    })
});


})