
const back_end_domain = 'http://35.225.243.133'

user_data = localStorage.getItem('user_data')
    user_data = JSON.parse(user_data)
    if(user_data){
        $('.join').hide()
        $('.user').css({
            'display': 'none',
            'cursor': 'pointer',
            'display': 'inline-flex',
            '-moz-box-align': 'center',
            'align-items': 'center',
            '-moz-box-pack': 'center',
            'justify-content': 'center'
        })
        $('.user img').css({
            'width': '38px',
            'height': '38px',
            'border-radius': '50%',
            'overflow': 'hidden'
        })
        $('.user').show()
        var click = false
        $('#profile_picture').attr('src',user_data.image)
        $('#profile_picture').on("click",function(){
            if(click === false){
                $('.popover-content_profile').show()
                click = true
            }
           else{
            click = false
            $('.popover-content_profile').hide()
           }
        })

    }
    var say = 0
    var toplam = 0
    products = []
    function myProduct(s){
        say++
           $('.productFull').show()
           $('#newtitle').empty()  
           $('.kq').text( products[s-1].amount_by_unit + products[s-1].unit)
           $('.priceShow').text( products[s-1].price)
           $('#newtitle').append(products[s-1].title)
           $('#productcate').text(products[s-1].category.title)
           $('.productLeft img').attr('src',products[s-1].main_image)
           $('.prDescription').text(products[s-1].description)
            $('.priceCartX').on('click',function(){
            $('.productFull').hide() 
        })
        $('.priceCart').on('click',function(){
            $('.pcbtn').empty()  
            $('.pcspan').empty()
            toplam = parseInt(products[s-1].price) + toplam 
            console.log(toplam)
            $('.pcspan').text(say + ' Item')
            $('.pcbtn').text('$ ' + toplam)

        })
    }

    
$(document).ready(function(){

    var item = $('.pcspan')
    var total = $('.pcbtn')
    var qiymet = 0
    var secilmis = 0

    $('.header_right #logout').on("click",function(){
        localStorage.clear()
    })  

$('#signupshow').on("click",function(){
    $('.myPopLogin').hide();
    $('#loginshow').show();
    $('.myPopReset').hide();
    $('.myPopRegister').show();
})
$('#loginshow').on("click",function(){
    $('.SignInReset').show()
    $('.SignInOut').hide()
    $('#loginshow').hide();
    $('.myPopReset').hide();
    $('.myPopRegister').hide();
    $('.myPopLogin').show();
    $('#loginshow').hide();
    
})
$('#loginshoww').on("click",function(){
    $('.SignInReset').show()
    $('.SignInOut').hide()
    $('.myPopReset').hide();
    $('.myPopRegister').hide();
    $('.myPopLogin').show();
    $('#loginshow').hide();

})
$('#resetshow').on("click",function(){
    $('.SignInReset').hide()
    $('.myPopRegister').hide();
    $('.myPopLogin').hide();
    $('.myPopReset').show();
    $('.SignInOut').show();
})
$('#resetshoww').on("click",function(){
    $('.myPopRegister').hide();
    $('.myPopLogin').hide();
    $('.myPopReset').show();
    $('#loginshow').show();
})
    $(".regular").slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
      });
          
    var click = false
    $('#linksbtn').on('click',function(){

        if(click === false){
            $('.popover-content').show()
            click = true
        }
       else{
        click = false
        $('.popover-content').hide()
       }
    })
    var lgclick = false
    $('.launguage').on('click',function(){
        if(lgclick === false){
            $('.lgpopover-content').show()
            lgclick = true
        }
       else{
        lgclick = false
        $('.lgpopover-content').hide()
       }
    })


    var addproductX = false
    $('#projectBtn').on('click',function(){
        if(addproductX === false){
        $('.addProduct').hide()
        $('.addProduct').css('z-index','9999999')
            $('.addProduct').show()
            $('.addProduct').removeClass('animated fadeOutRight')
            $('.addProduct').addClass('animated fadeInRight')
            addproductX = true
        }
    })
    $('.cancelbtn').on('click',function(){
        if(addproductX === true){
            addproductX = false
        $('.addProduct').css('z-index','1')
        $('.addProject').removeClass('animated fadeInRight')
        $('.addProduct').addClass('animated fadeOutRight')
        }
    })
    $('#adprx').on('click',function(){
        if(addproductX === true){
        $('.addProduct').css('z-index','1')
            addproductX = false
        $('.addProject').removeClass('animated fadeInRight')
        $('.addProduct').addClass('animated fadeOutRight')
        }
    })




    $(".menu-icon").on("click",function(){
        $("nav ul").toggleClass("showing")
    })
    $(window).on("scroll",function(){
        if($(window).scrollTop() > 1200){
            $('.main-left-menu-in').css({
                position:'fixed',
                top:'100px'
            })
        }
        else{
            $('.main-left-menu-in').css({
                position:'static'
            })
        }
        if($(window).scrollTop() > 200){
            $('header').css('position','fixed')
            $('header').css('background','#fff')
            $('nav').addClass('white')
        }
        else{
            $('header').css('background','transparent')
            $('nav').removeClass('white')
        }
    })
    // qeydiyyat
    $('.myPopRegister form').submit(function (e){
        e.preventDefault();

        var form = new FormData(this);
        if($('[name="image"]')[0].files.length !== 0){
            form.append('image', $('[name="image"]')[0].files[0], $('[name="image"]').val());
        }
        // console.log(form);

        $.ajax({
            url: `${back_end_domain}/accounts/api/register/`,
            method: 'POST',
            data: form,
            enctype: 'multipart/form-data',
            cache:false,
            processData: false,
            contentType: false,
            success: function(result, textStatus, xhr){
                console.log(result);
                if (xhr.status === 201){
                    window.location = 'index.html';
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
                    $(`input[name=${error}]`).css({
                        'background-color':'rgb(194, 112, 112)',
                        'color':'white',
                        'border':'1px dashed rgb(0, 158, 127)'
                    })
                    $(`input[name=${error}]`).siblings('small').text(errors[error]);
                }
                console.log(errorResult);
                console.log(errors);
            },
        })
    });

    $('.myPopLogin form').submit(function (e){
        e.preventDefault();

        // var form = new FormData(this);
        var form = $(this).serializeArray();
console.log(form)
        $.ajax({
            url: `${back_end_domain}/accounts/api/login/`,
            method: 'POST',
            data: form,
            // enctype: 'multipart/form-data',
            // cache:false,
            // processData: false,
            // contentType: false,
            success: function(result, textStatus, xhr){
                console.log(result);
                console.log(JSON.stringify(result));

                localStorage.setItem('user_data', JSON.stringify(result));
                $('.myPopLogin #loginAlert').css('color','green')
                
                if (xhr.status === 200){
                    window.location = 'index.html';  
                }else{
                    alert('Sehvlik var!');
                }
            },
            error: function(errorResult){
                var error = errorResult.non_field_errors

                $('.myPopLogin #loginAlert').text('Login ve Password bir birine uygun gelmir')
                console.log(errorResult.responseText.non_field_errors + 'errordur')
                var errors = errorResult.responseJSON;
                if (errors.hasOwnProperty('non_field_errors')){
                    $('#non_field_errors').text(errors['non_field_errors']);
                }
                for(var error in errors){
                    $(`.myPopLogin input[name=${error}]`).siblings('small').text(errors[error]);
                }
                console.log(errorResult);
                console.log(errors);
            },
        })
    });
    var cartclick 
    $.ajax({
        url: `${back_end_domain}/api/categories/`,
        method: 'GET',
        // enctype: 'multipart/form-data',
        // cache:false,
        // processData: false,
        // contentType: false,
        success: function(result, textStatus, xhr){
            var esas = $('.sticky-outer-wrapper')
            var wrapper = $('.sticky-inner-wrapper')
            var sticky = $('.sticky-inner-wrapper_in')
            for(var i in result){
                esas.append(
                    `<div class="sticky-inner-wrapper">
                    <div class="sticky-inner-wrapper_in">
                        <div class="sticky-inner-wrapper_in_in">
                            <span>${result[i].icon_svg} ${result[i].title}</span>
                        </div>
                        
                    </div>
                    
                </div>`
                )
                wrapper.append(sticky)
                esas.append(wrapper)
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

//cart click ucun
var resultLength
// var cart = $('<div>')
// var cartin = $('<div>')
// var reactreveal = $('<div>')
// var productcartin = $('<div>')
// var productimg = $('<div>')
// var img = $('<img>')
// var span = $('<span>')
// var productdetail = $('<div>')
// var h3 = $('<h3>')
// var span2 = $('<span>')
// var productmeta = $('<div>')
// var discountedPrice = $('<p>')
// var productprice = $('<p>')
// var qiymet
// var button = $('<button>')

// $.ajax({
//     url: `${back_end_domain}/api/products/`,
//     method: 'GET',
//     // enctype: 'multipart/form-data',
//     // cache:false,
//     // processData: false,
//     // contentType: false,
//     success: function(result, textStatus, xhr){
//         for(var i in result){
//                 discount = (result[i].discount_price / result[i].price) * 100
//                 cartin.addClass('cart-in')
//                 reactreveal.addClass('react-reveal') 
//                 productcartin.addClass('product-cart-in') 
//                 img.attr('src',result[i].main_image)
//                 span.addClass('discount')
//                 span.text(discount.toFixed(2) + '%')
//                 productimg.addClass('product-img') 
//                 productcartin.append(productimg)
//                 productcartin.append(productcartin)
//                 reactreveal.append(productcartin)
//                 cartin.append(reactreveal)
//                 productimg.append(img)
//                 productimg.append(span)
//                 productdetail.addClass('product-detail')
//                 h3.text(result[i].title)
//                 span2.text(`${result[i].amount_by_unit} ${result[i].unit}`)
//                 productdetail.append(h3)
//                 productdetail.append(span2)
//                 productmeta.addClass('product-meta')
//                 discountedPrice.addClass('discountedPrice')
//                 discountedPrice.text(result[i].discount_price)
//                 productprice.addClass('product-price')
//                 productprice.text(result[i].price)
//                 qiymet = result[i].price
//                 button.text('cart')
//                 productmeta.append(discountedPrice)
//                 productmeta.append(productprice)
//                 productmeta.append(button)
//                 productdetail.append(productmeta)
//                 productcartin.append(productimg)
//                 productcartin.append(productdetail)
//                     esas.append(cart)      
//             button.on('click',function(){
//                 alert(qiymet)
//             })
            
//         }   

//     },
//     error: function(errorResult){
//         var esas = $('.sticky-outer-wrapper')
//         var wrapper = $('.sticky-inner-wrapper')
//         var sticky = $('.sticky-inner-wrapper_in')
//             esas.append(
//                 `<div class="sticky-inner-wrapper">
//                 <div class="sticky-inner-wrapper_in">
//                     <div class="sticky-inner-wrapper_in_in">
//                         <span>No Category</span>
//                     </div>
                    
//                 </div>
                
//             </div>`
//             )
//             wrapper.append(sticky)
//             esas.append(wrapper)
//         console.log(errorResult)
//     },
// })



    $.ajax({
        url: `${back_end_domain}/api/products/`,
        method: 'GET',
        // enctype: 'multipart/form-data',
        // cache:false,
        // processData: false,
        // contentType: false,
        success: function(result, textStatus, xhr){
            var esas = $('.main-right-content')

            for(var i in result){
                products.push(result[i]);

                resultLength = result.length
                if(result[i].discount_price){
                    discount = (result[i].discount_price / result[i].price) * 100
                    esas.append(
                        `<div class="cart" id="${result[i].id}" onclick="myProduct(${result[i].id})" onclick="sebet(${result[i].id})">
                        <div class="cart-in">
                            <div class="react-reveal">
                                <div class="product-cart-in">
                                    <div class="product-img">
                                        <img src="${result[i].main_image}"  alt="Javarama Cafe Coffee" >
                                            <span class="discount">${discount.toFixed(2)}%</span>
                                    </div>
                                    <div class="product-detail">
                                        <h3>${result[i].title}</h3>
                                        <span>${result[i].amount_by_unit} ${result[i].unit}</span>
                                        <div class="product-meta">
                                            <p class="discountedPrice">${result[i].discount_price}</p>
                                            <p class="product-price">${result[i].price}</p>
                                            <button  ><i class="fa fa-shopping-bag bag" width="18px" height="18px" ></i>Cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `
                    )
                    
                }
                else{
                    $('.productFull img').attr('src',result[i].main_image)
                    esas.append(
                        
                        `<div class="cart" id="${result[i].id}" onclick="myProduct(${result[i].id})" onclick="sebet(${result[i].id})">
                        <div class="cart-in">
                            <div class="react-reveal">
                                <div class="product-cart-in">
                                    <div class="product-img">
                                        <img src="${result[i].main_image}"  alt="Javarama Cafe Coffee" >
                                    </div>
                                    <div class="product-detail">
                                        <h3>${result[i].title}</h3>
                                        <span>${result[i].amount_by_unit} ${result[i].unit}</span>
                                        <div class="product-meta">
                                            <p class="discountedPrice"></p>
                                            <p class="product-price">${result[i].price}</p>
                                            <button><i class="fa fa-shopping-bag bag" width="18px" height="18px" ></i>Cart</button>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `
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
    $(cartclick).on('click',function(){
        alert()
    })

console.log(products)
    function myProduct(s,f){
        console.log(s,f)
    }

})
