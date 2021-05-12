//@ts-check
Player = function (game, canvas) {
  // La scène du jeu
  this.scene = game.scene;

  // Initialisation de la caméra
  this._initCamera(this.scene, canvas);
};

Player.prototype = {
  _initCamera: function (scene, canvas) {
    // On crée la caméra
    // todo -> definir la cible en fonction du model
    this.camera = new BABYLON.ArcRotateCamera(
      "camera",
      -Math.PI / 2.0,
      (Math.PI / 2.0) * 0.9,
      MEET_CAMERA_RADIUS,
      new BABYLON.Vector3(0, 12, 0),
      scene
    ); // new BABYLON.Vector3(0, 30, -50), scene);

    this.camera.lowerRadiusLimit = MEET_CAMERA_RADIUS;
    this.camera.upperRadiusLimit = MEET_CAMERA_RADIUS;
    this.camera.radius = MEET_CAMERA_RADIUS;
    this.camera.setPosition(new BABYLON.Vector3(0, 0, -MEET_CAMERA_RADIUS));

    this.camera.maxZ = 3000; //  clip

    this.camera.lowerBetaLimit = Math.PI / 2 / 10;
    this.camera.upperBetaLimit = Math.PI / 2.0 - Math.PI / 2 / 10;

    // On affecte le mouvement de la caméra au canvas
    this.camera.attachControl(canvas, true);

    console.debug(this.camera.radius);
    console.debug(this.camera.position);
    if (1) {
      var i = 0;
    } else {
      var j = 1;
    }
  },
};
