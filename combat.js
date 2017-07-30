// $("#my_div").scrollTop($("#my_div")[0].scrollHeight); //Permet le scroll automatique
//demande le nom du joueur
// var nomJoueur = prompt("Votre Nom ?")
// $("#joueur").text(nomJoueur);
var joueur = {
	niveau : 1,
	dommage : 100,
	precision: 95, // taux de reussite de l'attaque
	critique : 15, // % de chance de critique
	hpMax : 200,
	hpActuel : 200,
	soin : 3
};
var CPU1 = {
	niveau : 1,
	dommage : 10,
	precision: 95, // taux de reussite de l'attaque
	critique : 10, // % de chance de critique
	hpMax : 1000,
	hpActuel : 1000,
	overDriveMax : 100,
	overDriveActuel : 0
};
var CPU2 = {
	niveau : 5,
	dommage : 10,
	precision: 95, // taux de reussite de l'attaque
	critique : 10, // % de chance de critique
	hpMax : 2000,
	hpActuel : 2000,
	overDriveMax : 100,
	overDriveActuel : 0
};
var selectCPU = Math.floor(Math.random() * 2) + 1;
var CPU = CPU1;
//choisi un CPU aléatoirement
$( document ).ready(function() {
	switch (selectCPU) {
		case 1 :
		$("#monstreHP").text("HP : " + CPU1.hpActuel + "/" + CPU1.hpMax)  ;
		$("#monstreLVL").text("NIVEAU " + CPU1.niveau);
		CPU = CPU1;
		break;
		case 2 :
		$("#monstreHP").text("HP : " + CPU2.hpActuel + "/" + CPU2.hpMax)  ;
		$("#monstreLVL").text("NIVEAU " + CPU2.niveau);
		CPU = CPU2;
		break;
		default :
		$("#monstreHP").text("HP : " + CPU1.hpActuel + "/" + CPU1.hpMax)  ;
		$("#monstreHP").text("NIVEAU " + CPU1.niveau);
		CPU = CPU1;
	}
});
//Declaration de mes fonctions
// calcule si le coup sera critique ou non
function chanceCritique(joueurOuCPU){
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
function chanceToucher(joueurOuCPU){
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
function attaqueDmg(joueurOuCPU){
	var dommage =  0;
	var critique = chanceCritique(joueurOuCPU);
	var toucher = chanceToucher(joueurOuCPU);
	if (toucher === true){
		if (critique === true) {
			dommage = joueurOuCPU.dommage * 1.05
		}
		else{
			dommage = joueurOuCPU.dommage
		}
		
	}
	else {
		dommage = 0
	}
	return dommage
};
//calcule les dégat effectuer par le joueur sur le CPU
function attaqueLancerParJoueur(ChoixDuCPU){
	var statut = 0;
	var attaque = attaqueDmg(joueur);
	var resultat = 0;
	// verifi si l'attaque a toucher
	if (attaque > 0){
		resultat = ChoixDuCPU.hpActuel -= attaque ;
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

		$("#log").append("Vous infligez : " + attaque + " points de dégats !<br />")
	}
	//si l'attaque à manquer
	else{
		statut = "L'attaque à manquer"
	}
	return statut
}
// Action des bouttons
$("#attaque").click(function(){
	//verifie qu'il reste des HP a la cible
	if (CPU.hpActuel > 0) {
		attaqueLancerParJoueur(CPU)
	}
	else{
		$("#log").append("Votre cible est morte !!!" + "<br />")
	}
	//permet de scroll automatiquement vers le bas
	$("#log").scrollTop($("#log")[0].scrollHeight);
});