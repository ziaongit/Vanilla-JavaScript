$(function() {
    parseXML();
    generatePDF();
});

function parseXML() {
    $.ajax({
        url: "books.xml",
        dataType: "xml",
        success: function(data) {
            parseXml(data);
        }
    });
}

function parseXml(books) {

    $(books).find("book").each(function()
    {
      //$("#products").append("<li><a href='"+$(this).find("link").text()+"'><img src='"+$(this).find("image").text()+"'/><h2>"+$(this).find("title").text()+"</h2><p>"+$(this).find("title").text()+"</p></a></li>");
    $("#products").append(`
            <div class="row">
                <div class="col-md-8 col-md-offset-2">				
                    <div class="panel panel-default  panel--styled">
                        <div class="panel-body">
                            <div class="col-md-12 panelTop">	
                                <div class="col-md-4">	
                                    <img class="img-responsive" src="http://placehold.it/350x350" alt=""/>
                                </div>
                                <div class="col-md-8">	
                                    <h2>${$(this).find('title').text()}</h2>
                                    <p>${$(this).find('description').text()}</p>
                                </div>
                            </div>
                            <div class="col-md-12 panelBottom">
                                <div class="col-md-4 text-left">
                                    <h5>Price: ${$(this).find('price').text()}</h5>
                                </div>
                                <div class="col-md-4">
                                    <h5>Genre: ${$(this).find('genre').text()}</h5>
                                </div>
                                <div class="col-md-4 text-center">
                                        <h5>Publish Date: ${$(this).find('publish_date').text()}</h5>						
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);
    }); 
}

function generatePDF(){
    var doc = new jsPDF();
    var specialElementHandlers = {
        '#editor': function (element, renderer) {
            return true;
        }
    };
    $('#generatePDF').click(function () {   
        doc.fromHTML($('#products').html(), 15, 15, {
            'width': 250,
            'margin': 1,
            'pagesplit': true, //This will work for multiple pages
            'elementHandlers': specialElementHandlers
        }, function() {
            doc.save('Books.pdf');
        });
        
        
    });
}