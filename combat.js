// $("#my_div").scrollTop($("#my_div")[0].scrollHeight); //Permet le scroll automatique
//demande le nom du joueur
var nomJoueur = prompt("Votre Nom ?")
$("#joueur").text(nomJoueur);
var joueur = {
	niveau: 1,
	dommage: 100,
	precision: 90, // taux de reussite de l'attaque
	critique: 20, // % de chance de critique
	hpMax: 200,
	hpActuel: 200,
	soin: 3
};
var CPU1 = {
	niveau: 1,
	dommage: 10,
	precision: 95, // taux de reussite de l'attaque
	critique: 10, // % de chance de critique
	hpMax: 1000,
	hpActuel: 1000,
	overDriveMax: 100,
	overDriveActuel: 0
};
var CPU2 = {
	niveau: 2,
	dommage: 10,
	precision: 95, // taux de reussite de l'attaque
	critique: 10, // % de chance de critique
	hpMax: 2000,
	hpActuel: 2000,
	overDriveMax: 100,
	overDriveActuel: 0
};
var CPU3 = {
	niveau: 3,
	dommage: 10,
	precision: 95, // taux de reussite de l'attaque
	critique: 10, // % de chance de critique
	hpMax: 3000,
	hpActuel: 3000,
	overDriveMax: 100,
	overDriveActuel: 0
};
var CPU4 = {
	niveau: 4,
	dommage: 10,
	precision: 95, // taux de reussite de l'attaque
	critique: 10, // % de chance de critique
	hpMax: 4000,
	hpActuel: 4000,
	overDriveMax: 100,
	overDriveActuel: 0
};
var CPU5 = {
	niveau: 5,
	dommage: 10,
	precision: 95, // taux de reussite de l'attaque
	critique: 10, // % de chance de critique
	hpMax: 5000,
	hpActuel: 5000,
	overDriveMax: 100,
	overDriveActuel: 0
};
var selectCPU = Math.floor(Math.random() * 5) + 1;
var CPU = "";
var critiqueReussi = false;
//choisi un CPU aléatoirement au chargement
$(document).ready(function () {
	//aleatoireCPU(selectCPU)
	aleatoireCPU(1)
});
//Declaration de mes fonctions
//affiche si critique
function crit() {
	if (critiqueReussi === true) {
		return " C'est un coup critique !";
	}
	else {
		return ""
	}
}
//fonction qui permet de choisir un CPU aleatoirement
function aleatoireCPU(idCPU) {
	switch (idCPU) {
		case 1:
			$("#monstreHP").text("HP : " + CPU1.hpActuel + "/" + CPU1.hpMax);
			$("#monstreLVL").text("NIVEAU " + CPU1.niveau);
			CPU = CPU1;
			break;
		case 2:
			$("#monstreHP").text("HP : " + CPU2.hpActuel + "/" + CPU2.hpMax);
			$("#monstreLVL").text("NIVEAU " + CPU2.niveau);
			CPU = CPU2;
			break;
		case 3:
			$("#monstreHP").text("HP : " + CPU3.hpActuel + "/" + CPU3.hpMax);
			$("#monstreLVL").text("NIVEAU " + CPU3.niveau);
			CPU = CPU3;
			break;
		case 4:
			$("#monstreHP").text("HP : " + CPU4.hpActuel + "/" + CPU4.hpMax);
			$("#monstreLVL").text("NIVEAU " + CPU4.niveau);
			CPU = CPU4;
			break;
		case 5:
			$("#monstreHP").text("HP : " + CPU5.hpActuel + "/" + CPU5.hpMax);
			$("#monstreLVL").text("NIVEAU " + CPU5.niveau);
			CPU = CPU5;
			break;
		default:
			$("#monstreHP").text("HP : " + CPU1.hpActuel + "/" + CPU1.hpMax);
			$("#monstreHP").text("NIVEAU " + CPU1.niveau);
			CPU = CPU1;
	}
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
			$("#monstreHP").text("HP : " + statut + "/" + CPU.hpMax)
		}
		//Si le CPU n'a plus de HP
		else {
			statut = "Mort"
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
			$("#joueurHP").text("HP : " + statut + "/" + joueur.hpMax)
		}
		//Si le CPU n'a plus de HP
		else {
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
		$("#log").append("OOOPPSSS un nouveau monstre ce présente à vous")
		selectCPU = Math.floor(Math.random() * 5) + 1;
		aleatoireCPU(selectCPU);
	}
	else {
		$("#log").append("Bien combattez !")
	}
});
$("#choixLVL").click(function () {
	var level = $("#choixLVL").val();
	level = parseInt(level, 10)
	aleatoireCPU(level);

});