$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "dist/xml/products.xml",
        dataType: "xml",
        success: function(xml) {
            generateMenu(xml)
        }
    });
});

function generateMenu(xml) {
    var emptySubMenu = $("<ul />");
    var mainMenu = $("<ul />");
    $(xml).find('menus').children('menu').each(function() {
        var li = generateLiNode($(this).attr("text"), $(this).attr("image"));
        //get subMenu level 1             
        var subMenuLvl1 = $("<ul />");
        $(this).children().each(function() {
            var li2 = generateLiNode($(this).attr("text"), $(this).attr("image"));
            //get subMenu level 2  
            var subMenuLvl2 = $("<ul />");
            $(this).children().each(function() {
                subMenuLvl2.append(generateLiNode($(this).attr("text"), $(this).attr("image")));
            });

            if (subMenuLvl2.html() != emptySubMenu.html())
                li2.append(subMenuLvl2);

            //subMenu level 2 is prepared.
            subMenuLvl1.append(li2);
        });

        if (subMenuLvl1.html() != emptySubMenu.html())
            li.append(subMenuLvl1);
        //subMenu level 1 is prepared.

        mainMenu.append(li);
    });

    $("#nav").append(mainMenu);
}

function generateLiNode(text, image) {

    if (image) {
        return $('<li id="product"><a data-image="' + image + '" onmouseover="displayImage(\'' + image + '\')" href="#">' + text + '</a></li>');
    } else {
        return $('<li id="product"><a href="#">' + text + '</a></li>')
    }
}

function displayImage(imgSrc) {
    $('#productImg').html('<img src="dist/img/' + imgSrc + '"/>');
}