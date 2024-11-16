function makepage(src) {
        return "<html>\n" +
            "<head>\n" +
            "<title>Temporary Printing Window</title>\n" +
            "<script>\n" +
            "function step1() {\n" +
            " setTimeout('step2()', 10);\n" +
            "}\n" +
            "function step2() {\n" +
            " window.print();\n" +
            " window.close();\n" +
            "}\n" +
            "</scr" + "ipt>\n" +
            "</head>\n" +
            "<body onLoad='step1()'>\n" +
            "<img src='" + src + "'/>\n" +
            "</body>\n" +
            "</html>\n";
    }

    function printme(evt) {
        if (!evt) {
            // Old IE
            evt = window.event;
        }
        var image = evt.target;
        if (!image) {
            // Old IE
            image = window.event.srcElement;
        }
        src = image.src;
        link = "about:blank";
        var pw = window.open(link, "_new");
        pw.document.open();
        pw.document.write(makepage(src));
        pw.document.close();
    }

     function PrintElem(elem)
    {
        Popup($(elem).html());
    }

    function Popup(data) 
    {
        var mywindow = window.open('', 'my div', 'height=400,width=600');
        mywindow.document.write('<html><head><title>my div</title>');
        /*optional stylesheet*/ //mywindow.document.write('<link rel="stylesheet" href="main.css" type="text/css" />');
        mywindow.document.write('</head><body >');
        mywindow.document.write(data);
        mywindow.document.write('</body></html>');

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10

        mywindow.print();
        mywindow.close();

        return true;
    }