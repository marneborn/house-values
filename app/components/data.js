angular
.module('houseValuesApp')
.factory('data', function ($q, $http, Config, bounds) {
    var rawDate = [
        {
            shortAddress: "936 W OLIVE AVE",
            elementary: "Cumberland",
            listingID: 81235585,
            listPrice: 935000,
            salePrice: 940000,
            listDate: "9/27/2012",
            closeDate: "2/15/2013",
            daysOnMarket: 21,
            bedrooms: 4,
            bathrooms: 2.5,
            houseSize: 1933,
            lotSize: 5985
        },
        {
            shortAddress: "414 CHARLES AVE",
            elementary: "Cumberland",
            listingID: 81302566,
            listPrice: 700000,
            salePrice: 694000,
            listDate: "1/28/2013",
            closeDate: "4/4/2013",
            daysOnMarket: 12,
            bedrooms: 2,
            bathrooms: 1,
            houseSize: 930,
            lotSize: 6500
        },
        {
            shortAddress: "888 KEARNEY TE",
            elementary: "Cumberland",
            listingID: 81305762,
            listPrice: 988800,
            salePrice: 1125000,
            listDate: "2/26/2013",
            closeDate: "4/5/2013",
            daysOnMarket: 8,
            bedrooms: 3,
            bathrooms: 2.5,
            houseSize: 1568,
            lotSize: 3920
        },
        {
            shortAddress: "485 NOVATO AVE",
            elementary: "Cumberland",
            listingID: 81310537,
            listPrice: 825000,
            salePrice: 950000,
            listDate: "4/3/2013",
            closeDate: "5/14/2013",
            daysOnMarket: 11,
            bedrooms: 3,
            bathrooms: 1.5,
            houseSize: 1577,
            lotSize: 5500
        },
        {
            shortAddress: "475 NOVATO AVE",
            elementary: "Cumberland",
            listingID: 81314526,
            listPrice: 925000,
            salePrice: 1160000,
            listDate: "5/1/2013",
            closeDate: "5/24/2013",
            daysOnMarket: 7,
            bedrooms: 4,
            bathrooms: 2,
            houseSize: 1634,
            lotSize: 5500
        },
        {
            shortAddress: "886 W IOWA AVE",
            elementary: "Cumberland",
            listingID: 81307351,
            listPrice: 888000,
            salePrice: 915000,
            listDate: "3/8/2013",
            closeDate: "5/29/2013",
            daysOnMarket: 14,
            bedrooms: 3,
            bathrooms: 2,
            houseSize: 1442,
            lotSize: 5227
        },
        {
            shortAddress: "897 SUTTER AVE",
            elementary: "Cumberland",
            listingID: 81328784,
            listPrice: 825000,
            salePrice: 916000,
            listDate: "8/7/2013",
            closeDate: "9/17/2013",
            daysOnMarket: 7,
            bedrooms: 3,
            bathrooms: 2.5,
            houseSize: 1590,
            lotSize: 6000
        },
        {
            shortAddress: "956 W OLIVE AVE",
            elementary: "Cumberland",
            listingID: 81335472,
            listPrice: 850000,
            salePrice: 915000,
            listDate: "9/25/2013",
            closeDate: "10/31/2013",
            daysOnMarket: 8,
            bedrooms: 3,
            bathrooms: 1.5,
            houseSize: 1558,
            lotSize: 5814
        },
        {
            shortAddress: "290 S MARY AVE",
            elementary: "Cumberland",
            listingID: 81342005,
            listPrice: 979000,
            salePrice: 1150000,
            listDate: "11/29/2013",
            closeDate: "12/31/2013",
            daysOnMarket: 12,
            bedrooms: 3,
            bathrooms: 2,
            houseSize: 1431,
            lotSize: 7424
        },
        {
            shortAddress: "668 W WASHINGTON AVE",
            elementary: "Cumberland",
            listingID: 81342244,
            listPrice: 898000,
            salePrice: 980000,
            listDate: "12/2/2013",
            closeDate: "1/10/2014",
            daysOnMarket: 9,
            bedrooms: 3,
            bathrooms: 1.5,
            houseSize: 1265,
            lotSize: 5000
        },
        {
            shortAddress: "378 DENNIS AVE",
            elementary: "Cumberland",
            listingID: 81403441,
            listPrice: 918000,
            salePrice: 1255000,
            listDate: "2/5/2014",
            closeDate: "2/26/2014",
            daysOnMarket: 7,
            bedrooms: 3,
            bathrooms: 2,
            houseSize: 1571,
            lotSize: 6912
        },
        {
            shortAddress: "352 SARA AVE",
            elementary: "Cumberland",
            listingID: 81405903,
            listPrice: 1098000,
            salePrice: 1440000,
            listDate: "2/26/2014",
            closeDate: "3/21/2014",
            daysOnMarket: 9,
            bedrooms: 3,
            bathrooms: 2,
            houseSize: 1781,
            lotSize: 6804
        },
        {
            shortAddress: "360 SARA AVE",
            elementary: "Cumberland",
            listingID: 81407417,
            listPrice: 980000,
            salePrice: 1370000,
            listDate: "3/10/2014",
            closeDate: "4/14/2014",
            daysOnMarket: 9,
            bedrooms: 3,
            bathrooms: 2,
            houseSize: 1571,
            lotSize: 6804
        },
        {
            shortAddress: "990 W IOWA AVE",
            elementary: "Cumberland",
            listingID: 81411805,
            listPrice: 999000,
            salePrice: 1230000,
            listDate: "4/8/2014",
            closeDate: "5/14/2014",
            daysOnMarket: 16,
            bedrooms: 3,
            bathrooms: 2,
            houseSize: 1265,
            lotSize: 6000
        },
        {
            shortAddress: "468 OSITOS AVE",
            elementary: "Cumberland",
            listingID: 81411625,
            listPrice: 798000,
            salePrice: 1122000,
            listDate: "4/9/2014",
            closeDate: "5/16/2014",
            daysOnMarket: 9,
            bedrooms: 3,
            bathrooms: 1.5,
            houseSize: 1144,
            lotSize: 5500
        },
        {
            shortAddress: "962 W WASHINGTON AVE",
            elementary: "Cumberland",
            listingID: 81415536,
            listPrice: 933000,
            salePrice: 1128000,
            listDate: "5/7/2014",
            closeDate: "5/22/2014",
            daysOnMarket: 8,
            bedrooms: 3,
            bathrooms: 2,
            houseSize: 1210,
            lotSize: 7296
        },
        {
            shortAddress: "850 SUTTER AVE",
            elementary: "Cumberland",
            listingID: 81414276,
            listPrice: 1128500,
            salePrice: 1420000,
            listDate: "4/28/2014",
            closeDate: "5/23/2014",
            daysOnMarket: 11,
            bedrooms: 2,
            bathrooms: 2,
            houseSize: 1524,
            lotSize: 6283
        },
        {
            shortAddress: "833 SUTTER AVE",
            elementary: "Cumberland",
            listingID: 81418554,
            listPrice: 1188000,
            salePrice: 1480000,
            listDate: "5/28/2014",
            closeDate: "7/3/2014",
            daysOnMarket: 8,
            bedrooms: 3,
            bathrooms: 2,
            houseSize: 1615,
            lotSize: 5300
        },
        {
            shortAddress: "494 NOVATO AVE",
            elementary: "Cumberland",
            listingID: 81421709,
            listPrice: 1278000,
            salePrice: 1530494,
            listDate: "6/18/2014",
            closeDate: "7/10/2014",
            daysOnMarket: 7,
            bedrooms: 4,
            bathrooms: 3,
            houseSize: 2374,
            lotSize: 5500
        },
        {
            shortAddress: "417 PALA AVE",
            elementary: "Cumberland",
            listingID: 81423028,
            listPrice: 925000,
            salePrice: 1168000,
            listDate: "6/25/2014",
            closeDate: "7/24/2014",
            daysOnMarket: 7,
            bedrooms: 3,
            bathrooms: 1.5,
            houseSize: 1144,
            lotSize: 5500
        },
        {
            shortAddress: "445 NOVATO AVE",
            elementary: "Cumberland",
            listingID: 81427149,
            listPrice: 1199000,
            salePrice: 1350000,
            listDate: "7/28/2014",
            closeDate: "8/8/2014",
            daysOnMarket: 0,
            bedrooms: 3,
            bathrooms: 2,
            houseSize: 1425,
            lotSize: 5500
        },
        {
            shortAddress: "402 PALA AVE",
            elementary: "Cumberland",
            listingID: 81424370,
            listPrice: 998000,
            salePrice: 1220000,
            listDate: "7/9/2014",
            closeDate: "8/11/2014",
            daysOnMarket: 7,
            bedrooms: 3,
            bathrooms: 1.5,
            houseSize: 1144,
            lotSize: 6000
        },
        {
            shortAddress: "940 W IOWA AVE",
            elementary: "Cumberland",
            listingID: 81427459,
            listPrice: 995000,
            salePrice: 1360000,
            listDate: "7/30/2014",
            closeDate: "8/21/2014",
            daysOnMarket: 8,
            bedrooms: 3,
            bathrooms: 2.5,
            houseSize: 1592,
            lotSize: 6000
        },
        {
            shortAddress: "498 S MARY AVE",
            elementary: "Cumberland",
            listingID: 81430939,
            listPrice: 899000,
            salePrice: 1000000,
            listDate: "8/24/2014",
            closeDate: "9/26/2014",
            daysOnMarket: 2,
            bedrooms: 3,
            bathrooms: 1.5,
            houseSize: 1144,
            lotSize: 6000
        },
        {
            shortAddress: "207 CLARENCE AVE",
            elementary: "Cumberland",
            listingID: 81430384,
            listPrice: 978000,
            salePrice: 1350000,
            listDate: "8/19/2014",
            closeDate: "9/30/2014",
            daysOnMarket: 8,
            bedrooms: 3,
            bathrooms: 2,
            houseSize: 1606,
            lotSize: 6160
        },
        {
            shortAddress: "913 W WASHINGTON AVE",
            elementary: "Vargas",
            listingID: 81242620,
            listPrice: 828000,
            salePrice: 825500,
            listDate: "12/6/2012",
            closeDate: "1/15/2013",
            daysOnMarket: 9,
            bedrooms: 3,
            bathrooms: 2,
            houseSize: 1210,
            lotSize: 8820
        },
        {
            shortAddress: "280 N PASTORIA AVE",
            elementary: "Vargas",
            listingID: 81300869,
            listPrice: 480000,
            salePrice: 435000,
            listDate: "1/11/2013",
            closeDate: "1/31/2013",
            daysOnMarket: 12,
            bedrooms: 2,
            bathrooms: 1,
            houseSize: 845,
            lotSize: 5720
        },
        {
            shortAddress: "140 FLORENCE ST",
            elementary: "Vargas",
            listingID: 81236429,
            listPrice: 700000,
            salePrice: 700000,
            listDate: "10/3/2012",
            closeDate: "3/18/2013",
            daysOnMarket: 1,
            bedrooms: 3,
            bathrooms: 2,
            houseSize: 1798,
            lotSize: 6500
        },
        {
            shortAddress: "1027 MERRITT TE",
            elementary: "Vargas",
            listingID: 81304602,
            listPrice: 1129888,
            salePrice: 1245000,
            listDate: "2/14/2013",
            closeDate: "3/19/2013",
            daysOnMarket: 13,
            bedrooms: 4,
            bathrooms: 2.5,
            houseSize: 2070,
            lotSize: 3484
        },
        {
            shortAddress: "1121 VASQUEZ AVE",
            elementary: "Vargas",
            listingID: 81307397,
            listPrice: 859950,
            salePrice: 850000,
            listDate: "3/10/2013",
            closeDate: "3/22/2013",
            daysOnMarket: 0,
            bedrooms: 3,
            bathrooms: 2,
            houseSize: 1372,
            lotSize: 5985
        },
        {
            shortAddress: "172 PIEDRA DR",
            elementary: "Vargas",
            listingID: 81304874,
            listPrice: 899000,
            salePrice: 1027000,
            listDate: "2/18/2013",
            closeDate: "3/27/2013",
            daysOnMarket: 10,
            bedrooms: 3,
            bathrooms: 2.5,
            houseSize: 1720,
            lotSize: 6099
        },
        {
            shortAddress: "169 SUNSET AVE",
            elementary: "Vargas",
            listingID: 81307147,
            listPrice: 799000,
            salePrice: 905000,
            listDate: "3/7/2013",
            closeDate: "4/11/2013",
            daysOnMarket: 7,
            bedrooms: 3,
            bathrooms: 2,
            houseSize: 1768,
            lotSize: 6000
        },
        {
            shortAddress: "944 BIDWELL AVE",
            elementary: "Vargas",
            listingID: 81308782,
            listPrice: 799000,
            salePrice: 960000,
            listDate: "3/20/2013",
            closeDate: "4/16/2013",
            daysOnMarket: 7,
            bedrooms: 5,
            bathrooms: 3,
            houseSize: 1737,
            lotSize: 6100
        },
        {
            shortAddress: "139 WAVERLY ST",
            elementary: "Vargas",
            listingID: 81308777,
            listPrice: 669000,
            salePrice: 705000,
            listDate: "3/20/2013",
            closeDate: "4/30/2013",
            daysOnMarket: 8,
            bedrooms: 3,
            bathrooms: 1,
            houseSize: 935,
            lotSize: 5750
        },
        {
            shortAddress: "128 SUNSET AVE",
            elementary: "Vargas",
            listingID: 81310352,
            listPrice: 799000,
            salePrice: 855000,
            listDate: "4/2/2013",
            closeDate: "5/2/2013",
            daysOnMarket: 10,
            bedrooms: 3,
            bathrooms: 2,
            houseSize: 1394,
            lotSize: 5000
        },
        {
            shortAddress: "268 S BERNARDO AVE",
            elementary: "Vargas",
            listingID: 81311714,
            listPrice: 849900,
            salePrice: 950000,
            listDate: "4/11/2013",
            closeDate: "5/20/2013",
            daysOnMarket: 9,
            bedrooms: 4,
            bathrooms: 2.5,
            houseSize: 1753,
            lotSize: 5940
        },
        {
            shortAddress: "140 FLORENCE ST",
            elementary: "Vargas",
            listingID: 81311992,
            listPrice: 888000,
            salePrice: 940540,
            listDate: "4/12/2013",
            closeDate: "5/23/2013",
            daysOnMarket: 7,
            bedrooms: 3,
            bathrooms: 2,
            houseSize: 1798,
            lotSize: 6500
        },
        {
            shortAddress: "228 GABILAN AVE",
            elementary: "Vargas",
            listingID: 81315256,
            listPrice: 998000,
            salePrice: 1053000,
            listDate: "5/6/2013",
            closeDate: "6/14/2013",
            daysOnMarket: 9,
            bedrooms: 3,
            bathrooms: 2,
            houseSize: 1543,
            lotSize: 15580
        },
        {
            shortAddress: "174 DONNER CT",
            elementary: "Vargas",
            listingID: 81318584,
            listPrice: 799000,
            salePrice: 890000,
            listDate: "5/29/2013",
            closeDate: "6/26/2013",
            daysOnMarket: 9,
            bedrooms: 3,
            bathrooms: 2,
            houseSize: 1305,
            lotSize: 6060
        },
        {
            shortAddress: "1167 CORRAL AVE",
            elementary: "Vargas",
            listingID: 81319602,
            listPrice: 850000,
            salePrice: 890000,
            listDate: "6/5/2013",
            closeDate: "7/17/2013",
            daysOnMarket: 7,
            bedrooms: 3,
            bathrooms: 2,
            houseSize: 1473,
            lotSize: 6076
        },
        {
            shortAddress: "877 LORI AVE",
            elementary: "Vargas",
            listingID: 81317884,
            listPrice: 850000,
            salePrice: 800000,
            listDate: "5/23/2013",
            closeDate: "7/25/2013",
            daysOnMarket: 19,
            bedrooms: 5,
            bathrooms: 2,
            houseSize: 1657,
            lotSize: 6200
        },
        {
            shortAddress: "156 ENCINO CT",
            elementary: "Vargas",
            listingID: 81324677,
            listPrice: 998500,
            salePrice: 1200000,
            listDate: "7/10/2013",
            closeDate: "8/9/2013",
            daysOnMarket: 9,
            bedrooms: 3,
            bathrooms: 2,
            houseSize: 1806,
            lotSize: 6210
        },
        {
            shortAddress: "139 CARSON CT",
            elementary: "Vargas",
            listingID: 81322743,
            listPrice: 879000,
            salePrice: 874000,
            listDate: "6/25/2013",
            closeDate: "8/21/2013",
            daysOnMarket: 17,
            bedrooms: 3,
            bathrooms: 2,
            houseSize: 1618,
            lotSize: 5453
        },
        {
            shortAddress: "1136 VISCAINO AVE",
            elementary: "Vargas",
            listingID: 81324331,
            listPrice: 995000,
            salePrice: 1077000,
            listDate: "7/8/2013",
            closeDate: "8/21/2013",
            daysOnMarket: 20,
            bedrooms: 3,
            bathrooms: 3,
            houseSize: 1828,
            lotSize: 5795
        },
        {
            shortAddress: "217 CARBONERA AVE",
            elementary: "Vargas",
            listingID: 81325732,
            listPrice: 949000,
            salePrice: 1070000,
            listDate: "7/17/2013",
            closeDate: "8/27/2013",
            daysOnMarket: 11,
            bedrooms: 4,
            bathrooms: 2.5,
            houseSize: 2008,
            lotSize: 5820
        },
        {
            shortAddress: "1099 NORIEGA AVE",
            elementary: "Vargas",
            listingID: 81320757,
            listPrice: 799000,
            salePrice: 799000,
            listDate: "6/12/2013",
            closeDate: "8/29/2013",
            daysOnMarket: 51,
            bedrooms: 4,
            bathrooms: 2,
            houseSize: 1870,
            lotSize: 5600
        },
        {
            shortAddress: "1163 BODEGA DR",
            elementary: "Vargas",
            listingID: 81327802,
            listPrice: 968000,
            salePrice: 1000000,
            listDate: "7/31/2013",
            closeDate: "9/10/2013",
            daysOnMarket: 14,
            bedrooms: 4,
            bathrooms: 2,
            houseSize: 1728,
            lotSize: 6200
        },
        {
            shortAddress: "801 LORI AVE",
            elementary: "Vargas",
            listingID: 81329738,
            listPrice: 649950,
            salePrice: 600000,
            listDate: "8/12/2013",
            closeDate: "9/24/2013",
            daysOnMarket: 11,
            bedrooms: 3,
            bathrooms: 1,
            houseSize: 1003,
            lotSize: 5616
        },
        {
            shortAddress: "188 CARBONERA AVE",
            elementary: "Vargas",
            listingID: 81329247,
            listPrice: 1058000,
            salePrice: 1105000,
            listDate: "8/9/2013",
            closeDate: "10/1/2013",
            daysOnMarket: 18,
            bedrooms: 4,
            bathrooms: 2.5,
            houseSize: 2019,
            lotSize: 7000
        },
        {
            shortAddress: "185 FLORENCE ST",
            elementary: "Vargas",
            listingID: 81322272,
            listPrice: 675000,
            salePrice: 665000,
            listDate: "6/21/2013",
            closeDate: "10/8/2013",
            daysOnMarket: 69,
            bedrooms: 2,
            bathrooms: 1,
            houseSize: 640,
            lotSize: 6000
        },
        {
            shortAddress: "155 S MATHILDA AVE",
            elementary: "Vargas",
            listingID: 81325802,
            listPrice: 649950,
            salePrice: 650000,
            listDate: "7/16/2013",
            closeDate: "11/13/2013",
            daysOnMarket: 96,
            bedrooms: 2,
            bathrooms: 1,
            houseSize: 1144,
            lotSize: 5400
        },
        {
            shortAddress: "1126 POLK AVE",
            elementary: "Vargas",
            listingID: 81339440,
            listPrice: 839000,
            salePrice: 845000,
            listDate: "10/30/2013",
            closeDate: "11/20/2013",
            daysOnMarket: 8,
            bedrooms: 3,
            bathrooms: 2,
            houseSize: 1214,
            lotSize: 5700
        },
        {
            shortAddress: "1031 MERRITT TE",
            elementary: "Vargas",
            listingID: 81337978,
            listPrice: 1199000,
            salePrice: 1200000,
            listDate: "10/16/2013",
            closeDate: "11/22/2013",
            daysOnMarket: 11,
            bedrooms: 4,
            bathrooms: 2.5,
            houseSize: 2070,
            lotSize: 3485
        },
        {
            shortAddress: "1094 NORIEGA AVE",
            elementary: "Vargas",
            listingID: 81335220,
            listPrice: 929888,
            salePrice: 960000,
            listDate: "9/22/2013",
            closeDate: "11/25/2013",
            daysOnMarket: 31,
            bedrooms: 3,
            bathrooms: 2,
            houseSize: 1637,
            lotSize: 5600
        },
        {
            shortAddress: "1169 W MC KINLEY AVE",
            elementary: "Vargas",
            listingID: 81339438,
            listPrice: 998000,
            salePrice: 1100000,
            listDate: "10/30/2013",
            closeDate: "11/26/2013",
            daysOnMarket: 9,
            bedrooms: 4,
            bathrooms: 3,
            houseSize: 1893,
            lotSize: 6270
        },
        {
            shortAddress: "1115 W IOWA AVE",
            elementary: "Vargas",
            listingID: 81338347,
            listPrice: 1098000,
            salePrice: 1100000,
            listDate: "10/18/2013",
            closeDate: "12/12/2013",
            daysOnMarket: 24,
            bedrooms: 4,
            bathrooms: 2.5,
            houseSize: 1794,
            lotSize: 5700
        },
        {
            shortAddress: "161 LEOTA AVE",
            elementary: "Vargas",
            listingID: 81400096,
            listPrice: 959000,
            salePrice: 1118000,
            listDate: "1/2/2014",
            closeDate: "2/5/2014",
            daysOnMarket: 13,
            bedrooms: 4,
            bathrooms: 2,
            houseSize: 1741,
            lotSize: 6300
        },
        {
            shortAddress: "164 CHARLES AVE",
            elementary: "Vargas",
            listingID: 81407473,
            listPrice: 849950,
            salePrice: 880000,
            listDate: "3/10/2014",
            closeDate: "3/26/2014",
            daysOnMarket: 2,
            bedrooms: 3,
            bathrooms: 2,
            houseSize: 1312,
            lotSize: 4550
        },
        {
            shortAddress: "1155 W IOWA AVE",
            elementary: "Vargas",
            listingID: 81410125,
            listPrice: 999888,
            salePrice: 1200000,
            listDate: "3/28/2014",
            closeDate: "3/28/2014",
            daysOnMarket: 0,
            bedrooms: 3,
            bathrooms: 2,
            houseSize: 1305,
            lotSize: 5700
        },
        {
            shortAddress: "228 GABILAN AVE",
            elementary: "Vargas",
            listingID: 81407662,
            listPrice: 1098000,
            salePrice: 1310000,
            listDate: "3/11/2014",
            closeDate: "4/14/2014",
            daysOnMarket: 9,
            bedrooms: 3,
            bathrooms: 2,
            houseSize: 1543,
            lotSize: 5850
        },
        {
            shortAddress: "860 LORI AVE",
            elementary: "Vargas",
            listingID: 81411150,
            listPrice: 655000,
            salePrice: 826000,
            listDate: "4/4/2014",
            closeDate: "5/8/2014",
            daysOnMarket: 12,
            bedrooms: 3,
            bathrooms: 1,
            houseSize: 1000,
            lotSize: 5000
        },
        {
            shortAddress: "1040 W WASHINGTON AVE",
            elementary: "Vargas",
            listingID: 81413292,
            listPrice: 1248000,
            salePrice: 1388000,
            listDate: "4/22/2014",
            closeDate: "6/5/2014",
            daysOnMarket: 16,
            bedrooms: 4,
            bathrooms: 2.5,
            houseSize: 1864,
            lotSize: 3353
        },
        {
            shortAddress: "150 MATADERO DR",
            elementary: "Vargas",
            listingID: 81415306,
            listPrice: 975000,
            salePrice: 1150000,
            listDate: "5/5/2014",
            closeDate: "6/10/2014",
            daysOnMarket: 10,
            bedrooms: 3,
            bathrooms: 2,
            houseSize: 1418,
            lotSize: 5600
        },
        {
            shortAddress: "192 S BERNARDO AVE",
            elementary: "Vargas",
            listingID: 81412848,
            listPrice: 949950,
            salePrice: 1075000,
            listDate: "4/18/2014",
            closeDate: "6/12/2014",
            daysOnMarket: 6,
            bedrooms: 3,
            bathrooms: 2,
            houseSize: 1510,
            lotSize: 6120
        },
        {
            shortAddress: "828 MUENDER AVE",
            elementary: "Vargas",
            listingID: 81404814,
            listPrice: 799000,
            salePrice: 790000,
            listDate: "2/17/2014",
            closeDate: "6/20/2014",
            daysOnMarket: 75,
            bedrooms: 4,
            bathrooms: 2,
            houseSize: 1836,
            lotSize: 6534
        },
        {
            shortAddress: "1120 POLK AVE",
            elementary: "Vargas",
            listingID: 81420685,
            listPrice: 998000,
            salePrice: 1200000,
            listDate: "6/11/2014",
            closeDate: "6/24/2014",
            daysOnMarket: 8,
            bedrooms: 3,
            bathrooms: 2,
            houseSize: 1214,
            lotSize: 5700
        },
        {
            shortAddress: "841 MUENDER AVE",
            elementary: "Vargas",
            listingID: 81418572,
            listPrice: 699000,
            salePrice: 880000,
            listDate: "5/28/2014",
            closeDate: "6/27/2014",
            daysOnMarket: 8,
            bedrooms: 3,
            bathrooms: 1.5,
            houseSize: 1135,
            lotSize: 6500
        },
        {
            shortAddress: "156 S PASTORIA AVE",
            elementary: "Vargas",
            listingID: 81425834,
            listPrice: 1348000,
            salePrice: 1400000,
            listDate: "7/18/2014",
            closeDate: "9/3/2014",
            daysOnMarket: 20,
            bedrooms: 4,
            bathrooms: 3,
            houseSize: 2243,
            lotSize: 5788
        },
        {
            shortAddress: "821 SHIRLEY AVE",
            elementary: "Vargas",
            listingID: 81426014,
            listPrice: 699950,
            salePrice: 652000,
            listDate: "7/18/2014",
            closeDate: "9/18/2014",
            daysOnMarket: 35,
            bedrooms: 3,
            bathrooms: 1,
            houseSize: 1195,
            lotSize: 6200
        },
        {
            shortAddress: "1186 CRESPI DR",
            elementary: "Vargas",
            listingID: 81429474,
            listPrice: 1198000,
            salePrice: 1298000,
            listDate: "8/12/2014",
            closeDate: "9/23/2014",
            daysOnMarket: 10,
            bedrooms: 3,
            bathrooms: 2,
            houseSize: 1656,
            lotSize: 7140
        },
        {
            shortAddress: "498 S MARY AVE",
            elementary: "Vargas",
            listingID: 81430939,
            listPrice: 899000,
            salePrice: 1000000,
            listDate: "8/24/2014",
            closeDate: "9/26/2014",
            daysOnMarket: 2,
            bedrooms: 3,
            bathrooms: 1.5,
            houseSize: 1144,
            lotSize: 6000
        },
        {
            shortAddress: "886 LORI AVE",
            elementary: "Vargas",
            listingID: 81430336,
            listPrice: 829000,
            salePrice: 888000,
            listDate: "8/19/2014",
            closeDate: "9/30/2014",
            daysOnMarket: 9,
            bedrooms: 3,
            bathrooms: 1,
            houseSize: 1000,
            lotSize: 5000
        },
        {
            shortAddress: "885 COOLIDGE AVE",
            elementary: "Vargas",
            listingID: 81429736,
            listPrice: 848888,
            salePrice: 721800,
            listDate: "8/14/2014",
            closeDate: "10/22/2014",
            daysOnMarket: 64,
            bedrooms: 4,
            bathrooms: 1,
            houseSize: 1400,
            lotSize: 3900
        },
        {
            shortAddress: "1144 W MC KINLEY AVE",
            elementary: "Vargas",
            listingID: 81435618,
            listPrice: 1148000,
            salePrice: 1250000,
            listDate: "9/30/2014",
            closeDate: "10/24/2014",
            daysOnMarket: 9,
            bedrooms: 3,
            bathrooms: 2,
            houseSize: 1214,
            lotSize: 6213
        }
    ];

    var allDefer = $q.defer();
    var chain = $q.resolve(true);
    allDefer.resolve(rawData);

    return allDefer.promise;
});
