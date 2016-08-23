/**
 * Created by superMoon on 2016-07-14.
 */
var myConfig = {
    "graphset":[
        {
            "type":"wordcloud",
            "options":{
                "text":"Marillion From Wikipedia, the free encyclopedia Marillion  Marillion, 2009. L-R: Ian Mosley, Pete Trewavas, Steve Hogarth, Mark Kelly, and Steve Rothery. Background information Origin Aylesbury, Buckinghamshire, England Genres Progressive rock, neo-progressive rock, alternative rock, pop rock, acoustic rock Years active 1979-present Labels EMI, Capitol, Castle, Racket Records (Intact), IRS, Caroline, Sanctuary, Velvel/Koch, Edel, Liberty, Pony Canyon Associated acts Fish, Steve Hogarth, How We Live, the Europeans, the Wishing Tree, Arena, Iris, Ian Mosley & Ben Castle, Transatlantic, Kino, Edison's Children Website www.marillion.com Members Steve Rothery Mark Kelly Pete Trewavas Ian Mosley Steve Hogarth Past members Mick Pointer Brian Jelliman Doug Irvine Fish Diz Minnett Andy Ward John Marter Jonathan Mover Marillion are a British rock band, formed in Aylesbury, Buckinghamshire, England, in 1979.",
                "max-items":200,
                "min-length":5
            }
        }
    ]
};

zingchart.render({
    id : 'myChart',
    data : myConfig,
    height: "100%",
    width: "100%"
});