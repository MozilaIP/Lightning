window.onload = function(){

    //console.log('started');

    var TabNames = [];
    var URLs = [];

    document.getElementById('clear').onclick = function ()
        {
            localStorage.clear();
            var TabNames = [];
            var URLs = [];
            var TabColors = [];
            location.reload();
            console.log('cleared');
        }

    if (localStorage.getItem('count') != null)
        {
            var TabNames = [];
            var URLs = [];
            TabNames = JSON.parse(localStorage.getItem('TabName'));
            URLs = JSON.parse(localStorage.getItem('url'));
            TabColors = JSON.parse(localStorage.getItem('color'));
            console.log('loaded data');
        }


    if (localStorage.getItem('count') === null)
        {
            localStorage.setItem('count', 0);
        }

        var ItemsCount = localStorage.getItem('count');
        ItemsCount = parseInt(ItemsCount);

        if (ItemsCount >= 1)
        {
            document.getElementById('img_tip').style.display = "none";
        }


    function save_options() {

            var Name = document.getElementById('tabname').value;
            var Url = document.getElementById('taburl').value;
            var Color = document.getElementById("tab_color").value;

            if (!isNaN(parseInt(Name)))
            {
                alert('Invalid name');
            }

            else
            {
                //var input = document.getElementById('tabname').value;
                //var present = TabNames.indexOf(input);

                // if (~input)
                // {
                //     alert('Tab has already been added');
                // }

                //else
                //{
                    var TabNames = [];
                    var URLs = [];
                    var TabColors = [];

                    if (ItemsCount != 0)
                    {
                        var TabNames = JSON.parse(localStorage.getItem('TabName'));
                        var URLs = JSON.parse(localStorage.getItem('url'));
                        var TabColors = JSON.parse(localStorage.getItem('color'));
                    }

                    TabNames.push(Name);
                    URLs.push(Url);
                    TabColors.push(Color);

                    localStorage.setItem("url",JSON.stringify(URLs));
                    localStorage.setItem("TabName",JSON.stringify(TabNames));
                    localStorage.setItem("color",JSON.stringify(TabColors));

                    ItemsCount = ItemsCount + 1;
                    localStorage.setItem('count', ItemsCount);
                    location.reload();
                //}
            }
        }

var BtState = 0;

        for (var i = 0; i < ItemsCount; i++ )
         {
            ///document.getElementById("grid").insertAdjacentHTML( 'beforeEnd', '<div class="el"><div id="edit'+TabNames[i]+'">x</div><div id="'+TabNames[i]+'">'+TabNames[i]+'</div></div>');

            document.getElementById("grid").insertAdjacentHTML( 'beforeEnd', '<div class="el"><div id="'+TabNames[i]+'">'+TabNames[i]+'</div></div>');

            document.getElementById(TabNames[i]).onclick = function ()
                {
                    //alert(TabNames.indexOf(this.id));
                    var link = URLs[TabNames.indexOf(this.id)];
                      chrome.tabs.query({currentWindow: true, active: true}, function(tab) {
                          chrome.tabs.create( { "url": 'http://' + link} );
                          //console.log(TabUrl+'_Link_'+TabName);
                    });
                }

            document.getElementById('delete').onclick = function ()
            {
                var Name2Del = document.getElementById('tabname').value;
                var Url2Del = document.getElementById('taburl').value;

                var nPos = TabNames.indexOf(Name2Del);
                //var uPos = URLs.indexOf(Url2Del);

                //alert(TabNames);

                if (~nPos)
                {
                    TabNames.splice(nPos, 1);
                    URLs.splice(nPos, 1);
                }

                ItemsCount = ItemsCount - 1;

                localStorage.setItem("url",JSON.stringify(URLs));
                localStorage.setItem("TabName",JSON.stringify(TabNames));
                localStorage.setItem("count", ItemsCount);

                location.reload();

                //alert(TabNames);

                // for (i = 0; i < ItemsCount; i++)
                // {
                //     if (Name2Del === TabNames[i] && Url2Del === URLs[i])
                //     {
                //         TabNames[i] = '';
                //         URLs[i] = '';
                //
                //         for (j = i; j < ItemsCount-1; j++)
                //         {
                //
                //         }
                //     }
                // }
            }

            var sheet = document.styleSheets[0];
            sheet.addRule("#"+TabNames[i], "background-color:"+TabColors[i]+" ; ", 1);
            //sheet.addRule("#"+TabNames[i]+"_edit", 'position: absolute; height: 10px; width: 10px; color: grey; font-size: 8pt; line-height: 10px; margin-left: 85px; margin-top: 5px; background-color: white; display: block; ',1);

            document.getElementById(TabNames[i]).onmouseover = function ()
            {
                //alert('mouseover');
                this.style.webkitFilter = "brightness(150%)";
                //document.getElementById(TabNames[i]+'_edit').style.display = "block";

            }

            document.getElementById(TabNames[i]).onmouseout = function ()
            {
                //alert('mouseover');
                this.style.webkitFilter = "brightness(100%)";
            }

        }

        for (var i = 0; i < ItemsCount; i++ )
         {
             document.getElementById(TabNames[i]).oncontextmenu = function ()
                 {   //console.log(TabName[i]);
                     //console.log(TabUrl+'_Context_'+TabName);
                     document.getElementById('grid').style.left = "330px";
                     document.getElementById('article').style.left = "120px";
                     document.getElementById('options').style.left = "0px";
                     document.getElementById('delete').style.display = "inline-block";
                     document.getElementById('save').style.display = "none";

                     document.getElementById('tabname').value = this.id;

                     document.getElementById('taburl').value = URLs[TabNames.indexOf(this.id)];

                     BtState = 1;

                     return false;
                 }
         }

    var SaveButton = document.getElementById('save');

    if (SaveButton){
        SaveButton.addEventListener('click',save_options);
        }



    document.getElementById('article_icon').onclick = function ()
        {


        //chrome.tabs.query({currentWindow: true, active: true}, function(tab) {
              //chrome.tabs.create( { "url": "options.html" } );
              //});
            if (BtState === 1) // make options hidden
            {
              document.getElementById('article').style.left = "0px";
              document.getElementById('grid').style.left = "0px";
              document.getElementById('options').style.left = "-330px";
              BtState = 0;
            }

            else // make options visible
            {
                document.getElementById('grid').style.left = "330px";
                document.getElementById('article').style.left = "120px";
                document.getElementById('options').style.left = "0px";
                document.getElementById('delete').style.display = "none";
                document.getElementById('save').style.display = "inline-block";
                document.getElementById('tabname').value = '';
                document.getElementById('taburl').value = '';

                BtState = 1;
            }

        }


    var line = document.getElementsByClassName("input_line");

    document.getElementById('tabname').onfocus = function ()
    {
        line[0].style.height = "2px";
        line[0].style.marginBottom = "0px";
        line[0].style.backgroundColor = "red";
    }

    document.getElementById('tabname').onblur = function ()
    {
        line[0].style.height = "1px";
        line[0].style.marginBottom = "1px";
        line[0].style.backgroundColor = "grey";
    }

    document.getElementById('taburl').onfocus = function ()
    {
        line[1].style.height = "2px";
        line[1].style.marginBottom = "0px";
        line[1].style.backgroundColor = "red";
    }

    document.getElementById('taburl').onblur = function ()
    {
        line[1].style.height = "1px";
        line[1].style.marginBottom = "1px";
        line[1].style.backgroundColor = "grey";
    }


};
