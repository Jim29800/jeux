// $("#my_div").scrollTop($("#my_div")[0].scrollHeight); //Permet le scroll automatique
$("#suivant").hide()
//demande le nom du joueur
//var nomJoueur = prompt("Votre Nom ?")
//$("#joueur").text(nomJoueur);
var joueur = {
	niveau: 1,
	dommage: 100,
	precision: 90, // taux de reussite de l'attaque
	critique: 20, // % de chance de critique
	hpMax: 200,
	hpActuel: 200,
	soin: 3
};
//definition des CPU
//objet cpus qui contient tous les cpus
var cpus = {
}
//definitation de nombre de cpu
for (var i = 1; i < 10; i++) {
	cpus[i] = new creationCPU(i, (i * 10), (i / 8 + 85), (i / 8 + 10), (i * 1000), 100)
}
//ajout du nombre de CPU dans la liste dans le HTML
for (var i = 1; i < Object.keys(cpus).length + 1; i++) {
	$("#choixLVL").append("<option value= '" + i + "' >" + i + "</option >")
}
//attribue le CPU courant
var CPU = "";
var critiqueReussi = false;
//choisi un CPU au chargement
$(document).ready(function () {
	choixCPU(1)
});
//Declaration de mes fonctions
function afficheHPcpu() {
	if (CPU.hpActuel / CPU.hpMax * 100 > 50) {
		$('#barreHPcpu').removeClass("orange")
		$('#barreHPcpu').removeClass("red")
		$('#barreHPcpu').addClass("blue")
		$('#barreHPcpu').show()
	}
	else if (CPU.hpActuel / CPU.hpMax * 100 > 15) {
		$('#barreHPcpu').removeClass("blue")
		$('#barreHPcpu').removeClass("red")
		$('#barreHPcpu').addClass("orange")
		$('#barreHPcpu').show()
	}
	else if (CPU.hpActuel / CPU.hpMax * 100 > 0) {
		$('#barreHPcpu').removeClass("blue")
		$('#barreHPcpu').removeClass("orange")
		$('#barreHPcpu').addClass("red")
		$('#barreHPcpu').show()
	}
	else if (CPU.hpActuel <=0) { 
		$('#barreHPcpu').hide()
	}
	$('#barreHPcpu').data("value", CPU.hpActuel)
	$('#barreHPcpu').data("total", CPU.hpMax)
	$('#barreHPcpu').progress({
	});
}
function afficheHPjoueur() {
	if (joueur.hpActuel / joueur.hpMax * 100 > 50) {
		$('#barreHPjoueur').removeClass("orange")
		$('#barreHPjoueur').removeClass("red")
		$('#barreHPjoueur').addClass("blue")
		$('#barreHPjoueur').show()
	}
	else if (joueur.hpActuel / joueur.hpMax * 100 > 15) {
		$('#barreHPjoueur').removeClass("blue")
		$('#barreHPjoueur').removeClass("red")
		$('#barreHPjoueur').addClass("orange")
		$('#barreHPjoueur').show()
	}
	else if (joueur.hpActuel / joueur.hpMax * 100 > 0) {
		$('#barreHPjoueur').removeClass("blue")
		$('#barreHPjoueur').removeClass("orange")
		$('#barreHPjoueur').addClass("red")
		$('#barreHPjoueur').show()
	}
	else if (joueur.hpActuel <=0) { 
		$('#barreHPjoueur').hide()
	}
	$('#barreHPjoueur').data("value", joueur.hpActuel)
	$('#barreHPjoueur').data("total", joueur.hpMax)
	$('#barreHPjoueur').progress({
	});
}
function creationCPU(niveau, dmg, precision, critique, hpMax, overDriveMax) {
	this.niveau = niveau,
		this.dommage = dmg,
		this.precision = precision, // taux de reussite de l'attaque
		this.critique = critique, // % de chance de critique
		this.hpMax = hpMax,
		this.hpActuel = hpMax,
		this.overDriveMax = overDriveMax,
		this.overDriveActuel = overDriveMax,
		this.exp = true;
}
//affiche si critique
function crit() {
	if (critiqueReussi === true) {
		return " C'est un coup critique !";
	}
	else {
		return ""
	}
}
//fonction qui permet de choisir un CPU 
function choixCPU(lvl) {
	$("#monstreHP").text("HP : " + cpus[lvl].hpActuel + "/" + cpus[lvl].hpMax);
	$("#monstreLVL").text("NIVEAU " + cpus[lvl].niveau);
	CPU = cpus[lvl];
	afficheHPcpu()
	afficheHPjoueur()
}
// calcule si le coup sera critique ou non
function chanceCritique(joueurOuCPU) {
	var critiqueChance = Math.floor(Math.random() * 100) + 1;
	var critiqueReussite = false;
	if (critiqueChance <= joueurOuCPU.critique) {
		return critiqueReussite = true;
	}
	else {
		return critiqueReussite = false;
	}
}
//calcule avec le taux de precision si l'on touche la cible
function chanceToucher(joueurOuCPU) {
	var toucherChance = Math.floor(Math.random() * 100) + 1;
	var toucherReussite = false;
	if (toucherChance <= joueurOuCPU.precision) {
		return toucherReussite = true;
	}
	else {
		return toucherReussite = false;
	}
}
//Calcule en fonction de la precision et du critique les dommages effectuer
function attaqueDmg(joueurOuCPU) {
	var dommage = 0;
	var critique = chanceCritique(joueurOuCPU);
	var toucher = chanceToucher(joueurOuCPU);
	if (toucher === true) {
		if (critique === true) {
			//% de dommage en plus en cas de critique
			dommage = joueurOuCPU.dommage * 1.3;
			critiqueReussi = true;
		}
		else {
			dommage = joueurOuCPU.dommage;
			critiqueReussi = false;
		}

	}
	else {
		dommage = 0;
		critiqueReussi = false;
	}
	return dommage
};
//calcule les dégat effectuer par le joueur sur le CPU
function attaqueLancerParJoueur(ChoixDuCPU) {
	var statut = 0;
	var attaque = attaqueDmg(joueur);
	var resultat = 0;
	// verifi si l'attaque a toucher
	if (attaque > 1) {
		resultat = ChoixDuCPU.hpActuel -= attaque;
		//verifie si il reste des HP au CPU
		if (resultat > 0) {
			statut = resultat
			//affihce hp CPU
			afficheHPcpu()
			$("#monstreHP").text("HP : " + statut + "/" + CPU.hpMax)
		}
		//Si le CPU n'a plus de HP
		else {
			$("#suivant").show()
			statut = "Mort"
			afficheHPcpu()
			$("#monstreHP").text(statut)
		}

		$("#log").append("Vous infligez : " + attaque + " points de dégats !" + crit() + "<br />")
	}
	//si l'attaque à manquer
	else {
		statut = $("#log").append("Votre attaque à manquer <br />")
	}
	return statut
};
function attaqueLancerParCPU(ChoixDuJoueur) {
	var statut = 0;
	var attaque = attaqueDmg(CPU);
	var resultat = 0;
	// verifi si l'attaque a toucher
	if (attaque > 1) {
		resultat = ChoixDuJoueur.hpActuel -= attaque;
		//verifie si il reste des HP au CPU
		if (resultat > 0) {
			statut = resultat
			afficheHPjoueur()
			$("#joueurHP").text("HP : " + statut + "/" + joueur.hpMax)
		}
		//Si le CPU n'a plus de HP
		else {
			afficheHPjoueur()
			statut = "Mort"
			$("#joueurHP").text(statut)
		}

		$("#log").append("L'ennemi vous inflige : " + attaque + " points de dégats !" + crit() + "<br />")
	}
	//si l'attaque à manquer
	else {
		statut = $("#log").append("L'attaque ennemi à manquer <br />")
	}
	return statut
};
function levelUP(selectJoueur) {
	selectJoueur.niveau++;
	selectJoueur.dommage += 100;
	selectJoueur.precision *= 1.005;
	selectJoueur.critique *= 1.005;
	selectJoueur.hpMax += 100;
	selectJoueur.hpActuel = selectJoueur.hpMax
	$("#joueurHP").text("HP : " + selectJoueur.hpActuel + "/" + selectJoueur.hpMax)
	$("#joueurLVL").text("Niveau " + selectJoueur.niveau)
}
// Action des bouttons
$("#attaque").click(function () {
	//verifi qu'il reste des HP au joueur
	if (joueur.hpActuel > 0) {
		//verifie qu'il reste des HP a la cible
		if (CPU.hpActuel > 0) {
			//attaque joueur
			attaqueLancerParJoueur(CPU)
			//attaque ennemi	
			attaqueLancerParCPU(joueur)

		}
		else {
			$("#log").append("Votre cible est morte !!!" + "<br />")
		}
	}
	else {
		$("#log").append("Vous êtes mort" + "<br />")
	}
	//permet de scroll automatiquement vers le bas
	$("#log").scrollTop($("#log")[0].scrollHeight);
});
$("#fuite").click(function () {
	var fuite = confirm("Voulez vous vraiment fuir ?")
	if (fuite === true) {
		$("#log").append("OOOPPSSS un nouveau monstre ce présente à vous"+ "<br />")
		var selectCPU = Math.floor(Math.random() * 5) + 1;
		choixCPU(selectCPU);
	}
	else {
		$("#log").append("Bien combattez !"+ "<br />")
	}
	//permet de scroll automatiquement vers le bas
	$("#log").scrollTop($("#log")[0].scrollHeight);
});
$("#choixLVL").click(function () {
	var level = $("#choixLVL").val();
	level = parseInt(level, 10)
	choixCPU(level);
});
$("#suivant").click(function () {
	if (CPU.exp) {
		levelUP(joueur);
		CPU.exp = false;
	}
	$("#suivant").hide()
	var sui = CPU.niveau + 1
	choixCPU(sui)
})





//demonstration par pierre-francois
// var chiffre = 2;
// test = "CPU" + chiffre;
// console.log(window["CPU" + chiffre]);
// console.log(CPU2);
// ou creer un objet contenant mes CPU
// var cpus = {
// 	1: new creationCPU(1, 10, 95, 10, 1000, 100),
// 	2: new creationCPU(2, 10, 95, 10, 2000, 100),
// 	3: new creationCPU(3, 10, 95, 10, 3000, 100),
// 	4: new creationCPU(4, 10, 95, 10, 4000, 100),
// 	5: new creationCPU(5, 10, 95, 10, 5000, 100)
// }
// //pour l'appeler
// console.log(cpus[3])


// $('#barreHPcpu').data("value", CPU.hpActuel)
// $('#barreHPcpu').data("total", CPU.hpMax)
// $('#barreHPcpu').progress({
// 	label: 'ratio',
// 	text: {
// 		ratio: '{value} de {total}'
// 	}
// });




console.log(cpus)