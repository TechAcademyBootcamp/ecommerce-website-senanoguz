const back_end_domain = 'http://35.225.243.133'

    $.ajax({
        url: `${back_end_domain}/api/categories/`,
        method: 'GET',
        success: function(result, textStatus, xhr){
            var esas = $('.bottom')
            for(var i in result){
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
