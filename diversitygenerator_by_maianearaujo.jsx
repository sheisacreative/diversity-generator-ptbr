#target photoshop
//app.bringToFront();

// --------------------------- OPEN PHOTOSHOP FILE --------------------------- //

function isTheRightDocument (document){

    var rightDocumentAux = true;

    if (document.info.title !== "Diversity Generator by Maiane Gabriele") {
        rightDocumentAux = false;
    } else if (document.info.author !== "www.maiane.com.br"){
        rightDocumentAux = false;
    }

    return rightDocumentAux;
    
}

function openCorrectFile() {

            alert("Parece que o arquivo está incorreto. :( \n Para continuar, por favor, abra o documento do Photoshop \"diversitygenerator_by_maianearaujo.psd\" e tente novamente.");
            var inputFile = File.openDialog("Por favor, abra o documento: diversitygenerator_by_maianearaujo.psd", "*.psd", false);
            open(inputFile);
            

}

//Check if the right document is open, if there are more documents opened, sets it as the active document
var hasRightOpenedDocument = false;

if (documents.length > 0) {
    
    for (var i = 0; i <= documents.length-1; i++){        
        
        rightDocument = isTheRightDocument(documents[i]);
        
        if (rightDocument) {
            hasRightOpenedDocument = true;
            activeDocument = documents[i];
            var doc = activeDocument;
            break;
        }
    
    }

    if (!rightDocument) {
        openCorrectFile();
    }

} else if (File(app.path + "/Presets/Scripts/Diversity%20Generator/diversitygenerator_by_maianearaujo.psd").exists || File(app.path + "/Presets/Scripts/diversitygenerator_by_maianearaujo.psd").exists){
    
    try {
        var doc = app.open(File(app.path + "/Presets/Scripts/Diversity%20Generator/diversitygenerator_by_maianearaujo.psd"));
    } catch (e) {
        var doc = app.open(File(app.path + "/Presets/Scripts/diversitygenerator_by_maianearaujo.psd"));
    }

    rightDocument = isTheRightDocument(doc);    

    if (!rightDocument) {
        openCorrectFile();
    }
    
} else {

    alert("Para continuar, por favor, abra o documento do Photoshop \"diversitygenerator_by_maianearaujo.psd\" (disponibilizado junto com o script) e tente novamente.");
    var inputFile = File.openDialog("Por favor, abra o documento: diversitygenerator_by_maianearaujo.psd", "*.psd", false);
    open(inputFile);
    
}

// --------------------------- SET THE MAIN VARIABLES --------------------------- //

doc = app.activeDocument;

var bodyGroup = doc.layerSets.getByName("body");

var fringeGroup = doc.layerSets.getByName("fringe");
var currentFringe = fringeGroup.artLayers[0];

var hairBackGroup = doc.layerSets.getByName("hair back");
var currentHairBack = hairBackGroup.artLayers[0];

var faceGroup = doc.layerSets.getByName("face");
var glassesGroup = faceGroup.layerSets.getByName("glasses");
var currentGlass  = glassesGroup.artLayers[0];

var beardGroup = faceGroup.layerSets.getByName("beard");
var currentBeard  = beardGroup.artLayers[0];

var eyesGroup = faceGroup.layerSets.getByName("eyes");
var rightEyeGroup = eyesGroup.layerSets.getByName("right eye");
var leftEyeGroup = eyesGroup.layerSets.getByName("left eye");
var rightEye = rightEyeGroup.artLayers.getByName("eye color");
var leftEye = leftEyeGroup.artLayers.getByName("eye color");
var rightEyeBrow = rightEyeGroup.artLayers.getByName("eyebrow color");
var leftEyeBrow = leftEyeGroup.artLayers.getByName("eyebrow color");


var skinGroup = faceGroup.layerSets.getByName("skins");
var currentSkin  = skinGroup.artLayers[0];
var skinColor;

var backgroundGroup = doc.layerSets.getByName("BG");


// --------------------------- SUPPORT FUNCTIONS --------------------------- //

//This function creates a random RGB color
function generateRandomColor(colorRangeRED, colorRangeGREEN, colorRangeBLUE) {

    var red = Math.floor(Math.random() * colorRangeRED);
    var green = Math.floor(Math.random() * colorRangeGREEN);
    var blue = Math.floor(Math.random() * colorRangeBLUE);

    return [red, green, blue];

}

//This function creates a random Skin RGB color
function generateRandomNeutralColor(maxRed, minRed, max, min) {
 
    var red = Math.floor(Math.random() * (maxRed - minRed)) + minRed;
    
    var rangeMax = red + max;
    var rangeMin = red - min;    
    
    var green = Math.floor(Math.random() * (rangeMax - rangeMin)) + rangeMin - 30;
    var blue = Math.floor(Math.random() * (rangeMax - rangeMin)) + rangeMin - 30;
    
    if (green > maxRed) {
            green = maxRed;
    } else if (green < 0) {
            green = 0;
    }
 
    if (blue > maxRed) {
         blue = maxRed;
    } else if (blue < 0) {
        blue = 0;
    }
    
    return [red, green, blue];

}

//Change the color of the active layer
function changeColor(red, green, blue) {

var idsetd = charIDToTypeID( "setd" );
    var desc535 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref62 = new ActionReference();
        var idcontentLayer = stringIDToTypeID( "contentLayer" );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref62.putEnumerated( idcontentLayer, idOrdn, idTrgt );
    desc535.putReference( idnull, ref62 );
    var idT = charIDToTypeID( "T   " );
        var desc536 = new ActionDescriptor();
        var idClr = charIDToTypeID( "Clr " );
            var desc537 = new ActionDescriptor();
            var idRd = charIDToTypeID( "Rd  " );
            desc537.putDouble( idRd, red);
            var idGrn = charIDToTypeID( "Grn " );
            desc537.putDouble( idGrn, green);
            var idBl = charIDToTypeID( "Bl  " );
            desc537.putDouble( idBl, blue);
        var idRGBC = charIDToTypeID( "RGBC" );
        desc536.putObject( idClr, idRGBC, desc537 );
    var idsolidColorLayer = stringIDToTypeID( "solidColorLayer" );
    desc535.putObject( idT, idsolidColorLayer, desc536 );
executeAction( idsetd, desc535, DialogModes.NO );

}

function hasElement(percent) {
    
    var hasElement = false;
    var percentValue = percent / 100; 
    
    if (Math.random() < percentValue) {
       hasElement = true;
    }

    return hasElement;
}

function raffleGroup(groupName) {

    var randomNumber = Math.floor(Math.random() * groupName.artLayers.length);
    
    groupName.artLayers[randomNumber].visible = true;
    doc.activeLayer = groupName.artLayers[randomNumber];


}

function makeAllLayersInactive(group) {
    
    for (var i = 0; i < group.artLayers.length; i++) {
        group.artLayers[i].visible = false;
    }
}

function makeCurrentLayersInactive() {

    currentFringe.visible = false;
    currentHairBack.visible = false;
    currentSkin.visible = false;
    currentBeard.visible = false;
    currentGlass.visible = false;

}

function collapseGroups () {
    
    var idcollapseAllGroupsEvent = stringIDToTypeID( "collapseAllGroupsEvent" );
    var desc365 = new ActionDescriptor();
    executeAction( idcollapseAllGroupsEvent, desc365, DialogModes.NO );
    
}

function enableLayerMask() {
    
    var idsetd = charIDToTypeID( "setd" );
    var desc256 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref64 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref64.putEnumerated( idLyr, idOrdn, idTrgt );
    desc256.putReference( idnull, ref64 );
    var idT = charIDToTypeID( "T   " );
        var desc257 = new ActionDescriptor();
        var idUsrM = charIDToTypeID( "UsrM" );
        desc257.putBoolean( idUsrM, true );
    var idLyr = charIDToTypeID( "Lyr " );
    desc256.putObject( idT, idLyr, desc257 );
executeAction( idsetd, desc256, DialogModes.NO );

}

function unableLayerMask() {
    
var idsetd = charIDToTypeID( "setd" );
    var desc197 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref39 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref39.putEnumerated( idLyr, idOrdn, idTrgt );
    desc197.putReference( idnull, ref39 );
    var idT = charIDToTypeID( "T   " );
        var desc198 = new ActionDescriptor();
        var idUsrM = charIDToTypeID( "UsrM" );
        desc198.putBoolean( idUsrM, false );
    var idLyr = charIDToTypeID( "Lyr " );
    desc197.putObject( idT, idLyr, desc198 );
executeAction( idsetd, desc197, DialogModes.NO );

}

// --------------------------- MANIPULATE DOLLS --------------------------- /

//Starting function
function startCreatingDoll(hasBackgroundColor, hasBackgroundCircle, circleColor, backgroundColorSet){

     if (hasBackgroundColor) {
        backgroundGroup.artLayers.getByName("background fill").visible = true;
        doc.activeLayer = backgroundGroup.artLayers.getByName("background fill");
        changeColor(backgroundColorSet.rgb.red, backgroundColorSet.rgb.green, backgroundColorSet.rgb.blue);
    } else {
        backgroundGroup.artLayers.getByName("background fill").visible = false;
    }

    if (hasBackgroundCircle) {
        backgroundGroup.artLayers.getByName("background circle").visible = true;
        doc.activeLayer = backgroundGroup.artLayers.getByName("background circle");
        changeColor(circleColor.rgb.red, circleColor.rgb.green, circleColor.rgb.blue);
        
    } else {
        backgroundGroup.artLayers.getByName("background circle").visible = false;
    }

    if(insideCircleDoll.value) {
        
        doc.activeLayer = bodyGroup;
        enableLayerMask();
            
    } else {
        
        doc.activeLayer = bodyGroup;
        unableLayerMask();
    
    }

}

//Main creating doll function
function createDoll() {

    //Select fringe or not (10%) if not fringe hairback = none, change fringe color.
    var hasFringe = hasElement(90);
    var hairBack = true;
    var hairColor;

    if (hasFringe) {
        
        raffleGroup(fringeGroup);
        currentFringe = doc.activeLayer;
        hairColor = generateRandomNeutralColor(255, 40, 50, 50);
        changeColor(hairColor[0], hairColor[1], hairColor[2]);
        
    } else {

        hairBack = false;
        hairColor = generateRandomColor(200, 200, 200); //To change eyebrow and beard color

    }


    //Select hair back or not 
    var hasHairBack = hasElement(80);

    if (hasHairBack && hairBack) {
         
        raffleGroup(hairBackGroup);
        currentHairBack = doc.activeLayer;
        changeColor(hairColor[0], hairColor[1], hairColor[2]);    
        
    } else {
        
        currentHairBack.visible = false;
    
    }

    //Select the type of skin and change it's color
    raffleGroup(skinGroup);
    currentSkin = doc.activeLayer;
    
    var skinColor = generateRandomNeutralColor(220, 20, 30, 30);
    changeColor(skinColor[0], skinColor[1], skinColor[2]);   


    //Change color eyes
    var hasBrownEye = hasElement(65);
    var eyeColor;
    
    doc.activeLayer = rightEyeBrow;
    changeColor(hairColor[0], hairColor[1], hairColor[2]);
    
    doc.activeLayer = leftEyeBrow;
    changeColor(hairColor[0], hairColor[1], hairColor[2]);
    
    if (hasBrownEye) {
        
        eyeColor = generateRandomNeutralColor(220, 20, 30, 30);
        
        doc.activeLayer = rightEye;
        changeColor(eyeColor[0], eyeColor[1], eyeColor[2]);

        doc.activeLayer = leftEye;
        changeColor(eyeColor[0], eyeColor[1], eyeColor[2]);
        
    } else {
        
        eyeColor = generateRandomColor(100, 180, 180);
        
        doc.activeLayer = rightEye;
        changeColor(eyeColor[0], eyeColor[1], eyeColor[2]);

        doc.activeLayer = leftEye;
        changeColor(eyeColor[0], eyeColor[1], eyeColor[2]);
    
    }

    //Select beard or not , if beard, change according to the hair color
    var hasBeard = hasElement(18);

    if (hasBeard) {
        
        raffleGroup(beardGroup);
        currentBeard = doc.activeLayer;
        changeColor(hairColor[0], hairColor[1], hairColor[2]);
        
    }

    //Select with or without glasses, if glasses select sun or not
    var hasGlasses = hasElement(30);

    if (hasGlasses) {
        
        raffleGroup(glassesGroup);
        currentGlass = doc.activeLayer;
        
    }
}


// --------------------------- CREATE THE DIALOG WINDOW --------------------------- //

    var w = new Window ("dialog");
    w.orientation = "column";
    w.alignChildren = "fill";
    
    //Infotext
    var infoText = w.add("panel", undefined, undefined);
    var title = infoText.add("statictext", undefined, "Diversity Generator");
    var info1 = infoText.add("statictext", undefined, "Este é um script para estimular a diversidade nas criações.");
    var info2 = infoText.add("statictext", undefined, "Para utilizá-lo preencha as opções abaixo e divirta-se. :)");
    var info3 = infoText.add("statictext", undefined, "Mais informações: www.maiane.com.br/scripts");
   
    infoText.orientation = "column";
    infoText.graphics.font = "dialog:9";
    title.graphics.font = "dialog:18";
    
    //----- First block
    var firstBlock = w.add("group");
    firstBlock.orientation = "row";
    firstBlock.alignChildren = "fill";
    
    //Select the number of dolls
    var numberGroup = firstBlock.add("panel", undefined, undefined);
    var numberText = numberGroup.add("statictext", undefined, "Número de bonecos:");
    var dropdownNumbers = ["1", "2", "3", "5", "10", "20", "30", "50", "70", "100"];
    var numberList = numberGroup.add("dropdownlist", undefined,  dropdownNumbers);
    var numberText2 = numberGroup.add("statictext", undefined, "Obs.: selecionar quantidades grandes");
    var numberText3 = numberGroup.add("statictext", undefined, "pode demorar um pouco para salvar. ;)");
    infoText.graphics.font = "dialog:6";
    numberList.minimumSize.width = 150;
    numberList.minimumSize.height = 30;
    numberList.selection = 0;
    
    //Sets the doll position
    var dollPositionGroup = firstBlock.add("panel");
    dollPositionGroup.add("statictext", undefined, "Posição do boneco:");
    var isInsideGroup = dollPositionGroup.add("group");
    var insideCircleDoll = isInsideGroup.add ("radiobutton", undefined, "Dentro do círculo");
    var outsideCircleDoll = isInsideGroup.add ("radiobutton", undefined, "Na frente do círculo");
    isInsideGroup.orientation = "column";
    insideCircleDoll.value = true;
    
    // ----- Second block
    var secondBlock = w.add("group");
    secondBlock.orientation = "row";
    secondBlock.alignChildren = ["fill","fill"];
    
    //Select background
    var BackgroundColorGroup = secondBlock.add("panel", undefined, undefined);
    BackgroundColorGroup.orientation = "column";
    var hasBackgroundColorGroup = BackgroundColorGroup.add("group");
    hasBackgroundColorGroup.add("statictext", undefined, "Cor de fundo:");
    var hasBackgroundColor = hasBackgroundColorGroup.add ("radiobutton", undefined, "Sim");
    var hasNotBackgroundColor = hasBackgroundColorGroup.add ("radiobutton", undefined, "Não (transparente)");
    hasBackgroundColorGroup.orientation = "column";
    hasBackgroundColor.value = true;
    var backgroundColorSet = new SolidColor();
    selectColorWindow(BackgroundColorGroup, hasBackgroundColor, hasNotBackgroundColor, backgroundColorSet);
    
    
    //Select Circle
    var circleGroup = secondBlock.add("panel", undefined, undefined);
    circleGroup.orientation = "column";
    var hasCircleGroup = circleGroup.add("group");
    hasCircleGroup.add("statictext", undefined, "Círculo de fundo:");
    var hasCircle = hasCircleGroup.add ("radiobutton", undefined, "Sim");
    var hasNoCircle = hasCircleGroup.add ("radiobutton", undefined, "Não");
    hasCircleGroup.orientation = "column";
    hasCircle.value = true;
    var circleColor = new SolidColor();
    selectColorWindow(circleGroup, hasCircle, hasNoCircle, circleColor);

    //Select color
    function selectColorWindow(objectGroup, hasObject, hasNotObject, pickerColor) {
        
        colorGroup = objectGroup.add ("group");
        colorGroup.alignChildren = ["fill","fill"];
        var p1 = colorGroup.add ("panel"); //Square color
        p1.preferredSize = [30, 30];
        var colorText = p1.add("statictext", undefined, ":|");
        colorText.graphics.font = "dialog:14";
        colorText.graphics.foregroundColor = colorText.graphics.newPen (colorText.graphics.PenType.SOLID_COLOR, [1, 1, 1], 1);
        
        var colorButton = p1.add ("button", undefined, "Selecione a cor");
        
        hasNotObject.onActivate = function () {
             colorButton.enabled = false;
             p1.graphics.backgroundColor = p1.graphics.newBrush (p1.graphics.BrushType.SOLID_COLOR, [0.2, 0.2, 0.2, 1]);
             colorText.text = ":((";
             colorText.graphics.foregroundColor = colorText.graphics.newPen (colorText.graphics.PenType.SOLID_COLOR, [0.5, 0.5, 0.5], 1);
        }
    
        hasObject.onActivate = function () {
             colorButton.enabled = true;
             p1.graphics.backgroundColor = p1.graphics.newBrush (p1.graphics.BrushType.SOLID_COLOR, [0.2, 0.2, 0.2, 1]);
             colorText.graphics.foregroundColor = colorText.graphics.newPen (colorText.graphics.PenType.SOLID_COLOR, [1, 1, 1], 1);
             colorText.text = ":|";
        }

         colorButton.onClick = function () {
             
                app.showColorPicker();
                pickerColor.rgb = app.foregroundColor.rgb;
                
                var result_color = [pickerColor.rgb.red / 255, pickerColor.rgb.green / 255, pickerColor.rgb.blue / 255];
                
                colorText.text = ":D"
                
                if (pickerColor.rgb.red > 175 || pickerColor.rgb.green > 175 || pickerColor.rgb.green > 175) {
                    colorText.graphics.foregroundColor = colorText.graphics.newPen (colorText.graphics.PenType.SOLID_COLOR, [0, 0, 0], 1);
                }
            
                p1.graphics.backgroundColor = p1.graphics.newBrush (p1.graphics.BrushType.SOLID_COLOR, result_color);
                
                return pickerColor;
                
        }
    
        return pickerColor;
    }
     
     
    // ----- Third block
    //Saving options
    var savingPath; //Global variable   
    
    var thirdBlock = w.add("panel", undefined, undefined);
    var savingFolder = thirdBlock.add ("iconbutton", [50,50,50,0], "DestinationFolderIcon");
    var savingText = thirdBlock.add("statictext", undefined, "Selecione a pasta para salvar as imagens");
    var folderWasSelected = false;
    
    savingText.graphics.font = "dialog:12";
    savingText.justify = "center";
    savingFolder.minimumSize.width = 200;
    savingFolder.minimumSize.height = 70;
    savingFolder.onClick = function () {
      
        savingPath = Folder.selectDialog("Por favor, selecione a pasta para salvar as imagens");
        
        if (savingPath !== null) {
            savingText.graphics.foregroundColor = savingText.graphics.newPen (savingText.graphics.PenType.SOLID_COLOR, [0, 0.6, 0], 1);
            savingText.text = "Pasta selecionada :)"
            savingText.graphics.font = "dialog:13";
        } else if (savingPath === null) {
            savingText.graphics.foregroundColor = savingText.graphics.newPen (savingText.graphics.PenType.SOLID_COLOR, [0.9, 0, 0], 1);
            savingText.text = "Heeyy! Selecione uma pasta... :(";
        }
        
        return savingPath;
    
    }
    
    
     //Confirmation buttons
     var pressedOK = false;
     var confirmGroup = w.add("group");
     confirmGroup.alignment = "center";
     
     var cancelButton = confirmGroup.add ("button", undefined, "Cancel");
     cancelButton.preferredSize = [100, 30];
     cancelButton.onClick = function () {
        pressedOK = false;
        w.close();
     }
     
     var okButton = confirmGroup.add ("button", undefined, "OK");
     okButton.graphics.font = "dialog:14";
     okButton.preferredSize = [100, 30];
     okButton.onClick = function (folderWasSelected, okButton) {
         
         if (savingPath !== null && savingPath !== undefined) {  
            folderWasSelected = true;
        }

         if (!folderWasSelected) {
             alert ("Por favor, selecione uma pasta para salvar as imagens");
         } else {
             pressedOK = true;
             w.close();
         }
     }

    w.show();


// --------------------------- MAIN FUNCTION --------------------------- //
if(pressedOK){ //Button = OK

        doc.layerSets.getByName("support").visible = false;
        
        makeAllLayersInactive(fringeGroup);
        makeAllLayersInactive(hairBackGroup);
        makeAllLayersInactive(skinGroup);
        makeAllLayersInactive(beardGroup);
        makeAllLayersInactive(glassesGroup);

        var numberOfDolls = numberList.selection.text;
        var existsBackgroundColor = hasBackgroundColor.value;
        var existsCircle = hasCircle.value;
        
        var f = new Folder(savingPath + "/TheDiversityDolls");
            if ( !f.exists ) {
                f.create()
        }
        
         //Starts the progress bar
         win = new Window ('palette')
         var i = 1;
         var pb = win.add('progressbar', undefined, 0, 100);
         win.text = "Gerando bonecos...";
         pb.preferredSize.width = 250;
         win.show(), refresh();
         
         startCreatingDoll(existsBackgroundColor, existsCircle, circleColor, backgroundColorSet)

         for (i = 1; i <= numberOfDolls; i++) {
                
            createDoll();
            savePNG(i);
            win.text = "Gerando bonecos... " + i + " :)";
            pb.value = i / numberOfDolls * 100;
            win.update();
                
            if (i != numberOfDolls) {
                makeCurrentLayersInactive();
            }
        
        }
            
         win.close();
        
        //Ending the process preferences
        collapseGroups();
        
        if (!hasRightOpenedDocument) {
            doc.close(SaveOptions.DONOTSAVECHANGES);
        }
    
        alert("Bonecos gerados! :)\nBom trabalho.\n\n\nDesenvolvido por:\nwww.maiane.com.br");
        f.execute();
            
} else if (!pressedOK){ //Button = cancel
           
           alert("Tudo bem... :(\nEu nem queria gerar bonecos mesmo.");

}


// --------------------------- SET THE SAVING OPTIONS --------------------------- //

function savePNG (fileName){
        
        var myFile = new File(f + "/" + i + "_happyperson" + ".png")
                
        var pngOptions = new ExportOptionsSaveForWeb()
        
        pngOptions.format = SaveDocumentType.PNG;
        pngOptions.PNG8 = false;
        pngOptions.transparency = true;
        pngOptions.includeProfile = false;
        pngOptions.colorReduction = ColorReductionType.SELECTIVE;
        pngOptions.colors = 256;
        pngOptions.dither = Dither.DIFFUSION;
        pngOptions.ditherAmount = 100;
        pngOptions.interlaced = false;
        pngOptions.transparencyDither = Dither.NONE;
        pngOptions.transparencyAmount = 100;
        pngOptions.webSnap = 0;

        doc.exportDocument(myFile, ExportType.SAVEFORWEB, pngOptions);
    
}
