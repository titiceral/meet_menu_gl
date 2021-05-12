<?php 
// redirection mobile || web
require_once './php_file/Mobile_Detect/Mobile_Detect.php';
$detect = new Mobile_Detect();
 ?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
    />
    <title>Subo Design - Configurateur de Veilleuse</title>
    <meta
      name="description"
      content="Le rendu 3D d'une de mes créations : Veilleuse pour enfant sage"
    />
    <link rel="shortcut icon" href="./icone.png" type="image/png">
    <link rel="apple-touch-icon" href="./icone.png" type="image/png">
    <!-- SCRIPTS DE BASE -->
    <script src="https://preview.babylonjs.com/babylon.js"></script>
    <script src="https://preview.babylonjs.com/gui/babylon.gui.min.js"></script>
    <script src="https://code.jquery.com/pep/0.4.1/pep.js"></script>
    <!-- Feuille de style css -->
    <link rel="stylesheet" type="text/css" href="css/mainsStyle.css" />
    <link rel="stylesheet" type="text/css" href="css/subostyle.css" />
  </head>

  <body>
    <header
      style="
        width: 100%;
        position: fixed;
        z-index: 50;
        top: 0px;
        height: 42px;
        left: 0px;
      "
      class="style-j62c8htt"
      data-state=" fixedPosition"
      id="SITE_HEADER"
    >
      <div
        id="SITE_HEADERscreenWidthBackground"
        class="style-j62c8httscreenWidthBackground"
        style="width: 100vw;"
      >
        <div class="style-j62c8htt_bg"></div>
      </div>
      <div
        id="SITE_HEADERcenteredContent"
        class="style-j62c8httcenteredContent"
      >
        <div id="SITE_HEADERbg" class="style-j62c8httbg"></div>
        <div
          id="SITE_HEADERinlineContent"
          class="style-j62c8httinlineContent"
        ></div>
      </div>
    </header>
    <canvas id="renderCanvas"></canvas>
    <!-- menu -->
    <nav
      id="comp-ihm8jbpc"
      data-menuborder-y="0"
      data-menubtn-border="0"
      data-ribbon-els="0"
      data-label-pad="0"
      data-ribbon-extra="0"
      data-drophposition=""
      data-dropalign="center"
      dir="ltr"
      style="
        top: 0px;
        left: 0px;
        right: 0px;
        width: 100%;
        position: fixed;
        margin: auto;
        z-index: 50;
        height: 50px;
      "
      class="style-j6qk8ofs"
      data-state="center notMobile"
      data-dropmode="dropDown"
    >
      <div
        style="text-align: center;"
        role="navigation"
        aria-label="Site navigation"
        id="comp-ihm8jbpcitemsContainer"
        class="style-j6qk8ofsitemsContainer"
      >
        <a
          style="
            display: inherit;
            color: grey;
            width: 100px;
            height: 50px;
            position: relative;
            box-sizing: border-box;
            overflow: visible;
          "
          role="button"
          tabindex="0"
          aria-haspopup="false"
          data-listposition="left"
          data-direction="ltr"
          href="./index.htm"
          class="style-j6qk8ofsrepeaterButton"
          data-state="menu  idle link notMobile"
          id="comp-ihm8jbpc0"
          value="#c1dmpinlineContent"
          data-original-gap-between-text-and-btn="10"
          ><div class="style-j6qk8ofsrepeaterButton_gapper">
            <div
              style="text-align: center;"
              id="comp-ihm8jbpc0bg"
              class="style-j6qk8ofsrepeaterButtonbg"
            >
              <p
                style="text-align: center; line-height: 50px;"
                id="comp-ihm8jbpc0label"
                class="style-j6qk8ofsrepeaterButtonlabel"
              >
                Accueil
              </p>
            </div>
          </div></a
        >
        <?php if( $detect->isMobile() == false ) { ?>
        <a
          style="
            display: inherit;
            color: grey;
            width: 109px;
            height: 50px;
            position: relative;
            box-sizing: border-box;
            overflow: visible;
          "
          role="button"
          tabindex="0"
          aria-haspopup="false"
          data-listposition="center"
          data-direction="ltr"
          href="./index.htm#comp-ihm7xvtq"
          data-keep-roots="true"
          data-anchor="dataItem-ihm86wyv1"
          class="style-j6qk8ofsrepeaterButton"
          data-state="menu  idle link notMobile"
          id="comp-ihm8jbpc1"
          data-original-gap-between-text-and-btn="10"
          ><div
            value="#comp-ihm7xvtq"
            class="style-j6qk8ofsrepeaterButton_gapper"
          >
            <div
              style="text-align: center;"
              id="comp-ihm8jbpc1bg"
              class="style-j6qk8ofsrepeaterButtonbg"
            >
              <p
                style="text-align: center; line-height: 50px;"
                id="comp-ihm8jbpc1label"
                class="style-j6qk8ofsrepeaterButtonlabel"
              >
                Services
              </p>
            </div>
          </div></a
        >
        <a
          style="
            display: inherit;
            color: grey;
            width: 105px;
            height: 50px;
            position: relative;
            box-sizing: border-box;
            overflow: visible;
          "
          role="button"
          tabindex="0"
          aria-haspopup="false"
          data-listposition="center"
          data-direction="ltr"
          href="./index.htm#comp-ihma3j9e"
          data-keep-roots="true"
          data-anchor="dataItem-ihm87xvo1"
          class="style-j6qk8ofsrepeaterButton"
          data-state="menu  idle link notMobile"
          id="comp-ihma3j9e"
          data-original-gap-between-text-and-btn="10"
        >
          <div
            value="#comp-ihma3j9e"
            class="style-j6qk8ofsrepeaterButton_gapper"
          >
            <div
              style="text-align: center;"
              id="comp-ihm8jbpc2bg"
              class="style-j6qk8ofsrepeaterButtonbg"
            >
              <p
                style="text-align: center; line-height: 50px;"
                id="comp-ihm8jbpc2label"
                class="style-j6qk8ofsrepeaterButtonlabel"
              >
                Concept
              </p>
            </div>
          </div></a
        >
        <a
          style="
            display: inherit;
            color: grey;
            width: 130px;
            height: 50px;
            position: relative;
            box-sizing: border-box;
            overflow: visible;
          "
          role="button"
          tabindex="0"
          aria-haspopup="false"
          data-listposition="center"
          data-direction="ltr"
          href="./index.htm#comp-j63mi6tn"
          data-keep-roots="true"
          data-anchor="dataItem-ihm87hmh1"
          class="style-j6qk8ofsrepeaterButton"
          data-state="menu  idle link notMobile"
          id="comp-ihm8jbpc3"
          data-original-gap-between-text-and-btn="10"
          ><div
            value="#comp-j63mi6tn"
            class="style-j6qk8ofsrepeaterButton_gapper"
          >
            <div
              style="text-align: center;"
              id="comp-ihm8jbpc3bg"
              class="style-j6qk8ofsrepeaterButtonbg"
            >
              <p
                style="text-align: center; line-height: 50px;"
                id="comp-ihm8jbpc3label"
                class="style-j6qk8ofsrepeaterButtonlabel"
              >
                Réalisations
              </p>
            </div>
          </div></a
        >
        <a
          style="
            display: inherit;
            color: grey;
            width: 109px;
            height: 50px;
            position: relative;
            box-sizing: border-box;
            overflow: visible;
          "
          role="button"
          tabindex="0"
          aria-haspopup="false"
          data-listposition="right"
          data-direction="ltr"
          href="./index.htm#otd0q"
          data-keep-roots="true"
          data-anchor="dataItem-ihmi8c7g"
          class="style-j6qk8ofsrepeaterButton"
          data-state="menu  idle link notMobile"
          id="comp-ihm8jbpc5"
          data-original-gap-between-text-and-btn="10"
          ><div class="style-j6qk8ofsrepeaterButton_gapper">
            <div
              style="text-align: center;"
              id="comp-ihm8jbpc5bg"
              class="style-j6qk8ofsrepeaterButtonbg"
            >
              <p
                style="text-align: center; line-height: 50px;"
                id="comp-ihm8jbpc5label"
                class="style-j6qk8ofsrepeaterButtonlabel"
              >
                Boutique
              </p>
            </div>
          </div></a
        >
        <a
          style="
            display: inherit;
            color: grey;
            width: 101px;
            height: 50px;
            position: relative;
            box-sizing: border-box;
            overflow: visible;
          "
          role="button"
          tabindex="0"
          aria-haspopup="false"
          data-listposition="center"
          data-direction="ltr"
          href="./index.htm#comp-ihmb3r8m"
          data-keep-roots="true"
          data-anchor="dataItem-ihmi8c7g"
          class="style-j6qk8ofsrepeaterButton"
          data-state="menu  idle link notMobile"
          id="comp-ihm8jbpc4"
          data-original-gap-between-text-and-btn="10"
          ><div
            value="#comp-ihmb3r8m"
            class="style-j6qk8ofsrepeaterButton_gapper"
          >
            <div
              style="text-align: center;"
              id="comp-ihm8jbpc4bg"
              class="style-j6qk8ofsrepeaterButtonbg"
            >
              <p
                style="text-align: center; line-height: 50px;"
                id="comp-ihm8jbpc4label"
                class="style-j6qk8ofsrepeaterButtonlabel"
              >
                Contact
              </p>
            </div>
          </div>
        </a>
        <?php } ?>
        <a
          style="
            display: inherit;
            color: grey;
            width: 101px;
            height: 50px;
            position: relative;
            box-sizing: border-box;
            overflow: visible;
          "
          role="button"
          tabindex="0"
          aria-haspopup="false"
          data-listposition="center"
          data-direction="ltr"
          target="_self"
          data-keep-roots="true"
          data-anchor="dataItem-ihmi8c7g"
          class="style-j6qk8ofsrepeaterButton"
          data-state="menu  idle link notMobile selected"
          id="comp-ihm8jbpc4"
          data-original-gap-between-text-and-btn="10"
          ><div
            value="#comp-ihmb3r8m"
            class="style-j6qk8ofsrepeaterButton_gapper"
          >
            <div
              style="text-align: center;"
              id="comp-ihm8jbpc4bg"
              class="style-j6qk8ofsrepeaterButtonbg"
            >
              <p
                style="text-align: center; line-height: 50px;"
                id="comp-ihm8jbpc4label"
                class="style-j6qk8ofsrepeaterButtonlabel"
              >
                Configurateur
              </p>
            </div>
          </div>
        </a>
      </div>
    </nav>
  </body>

  <!-- scripts bablon -->
  <script src="js/constantes.js"></script>
  <script src="js/meet_menu.min.js"></script>
  <script src="js/Renderer.js"></script>
  <script src="js/Player.js"></script>
  <script src="js/Gui.js"></script>
  <meta name="robots" content="index" />
  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script
    async
    src="https://www.googletagmanager.com/gtag/js?id=UA-108659303-1"
  ></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());

    gtag("config", "UA-108659303-1");
  </script>
</html>
