import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { RegistreElevage } from '../Models/RegistreElevage'

@Injectable()
export class ExportService {
  
  /**
   * Exporte un registre d'élevage au format Excel
   */
  exportRegistreToExcel(registre: RegistreElevage): Buffer {
    // Créer le workbook
    const workbook = XLSX.utils.book_new();

    // Feuille 1 : Informations générales
    this.addInfosGeneralesSheet(workbook, registre);

    // Feuille 2 : Déplacements
    if (registre.deplacements && registre.deplacements.length > 0) {
      this.addDeplacementsSheet(workbook, registre.deplacements);
    }

    // Feuille 3 : Récoltes
    if (registre.recoltes && registre.recoltes.length > 0) {
      this.addRecoltesSheet(workbook, registre.recoltes);
    }

    // Feuille 4 : Traitements Varroa
    if (registre.traitementsVarroa && registre.traitementsVarroa.length > 0) {
      this.addTraitementsVarroaSheet(workbook, registre.traitementsVarroa);
    }

    // Feuille 5 : Nourrissement
    if (registre.nourrissements && registre.nourrissements.length > 0) {
      this.addNourrisementsSheet(workbook, registre.nourrissements);
    }

    // Feuille 6 : Maladies et Traitements
    if (registre.maladiesTraitements && registre.maladiesTraitements.length > 0) {
      this.addMaladiesTraitementsSheet(workbook, registre.maladiesTraitements);
    }

    // Feuille 7 : Observations
    if (registre.observations && registre.observations.length > 0) {
      this.addObservationsSheet(workbook, registre.observations);
    }

    // Générer le buffer
    return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  }

  /**
   * Génère le nom du fichier Excel
   */
  generateFileName(registre: RegistreElevage): string {
    const timestamp = new Date().toISOString().split('T')[0];
    return `registre-${registre.identificationRuche}-${timestamp}.xlsx`;
  }

  // ============ Méthodes privées pour chaque feuille ============

  private addInfosGeneralesSheet(workbook: XLSX.WorkBook, registre: RegistreElevage) {
    const infosGenerales = [
      ['INFORMATIONS GÉNÉRALES', ''],
      ['', ''],
      ['Nom du rucher', registre.nomRucher],
      ['Adresse du rucher', registre.adresseRucher],
      ['Identification ruche', registre.identificationRuche],
      ['', ''],
      ['INFORMATIONS SUR LA REINE', ''],
      ['Race', registre.race || 'Non spécifiée'],
      ['Marquée', registre.marquee ? 'Oui' : 'Non'],
      ['Origine', registre.origine || 'Non spécifiée'],
      ['', ''],
      ['Date d\'export', new Date().toLocaleDateString('fr-FR')]
    ];

    const ws = XLSX.utils.aoa_to_sheet(infosGenerales);
    
    // Largeur des colonnes
    ws['!cols'] = [
      { wch: 25 },
      { wch: 40 }
    ];

    XLSX.utils.book_append_sheet(workbook, ws, 'Informations');
  }

  private addDeplacementsSheet(workbook: XLSX.WorkBook, deplacements: any[]) {
    const data = [
      ['Date', 'Nouvelle Adresse'],
      ...deplacements.map(d => [
        this.formatDate(d.date),
        d.nouvelleAdresse
      ])
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    ws['!cols'] = [{ wch: 15 }, { wch: 50 }];
    
    XLSX.utils.book_append_sheet(workbook, ws, 'Déplacements');
  }

  private addRecoltesSheet(workbook: XLSX.WorkBook, recoltes: any[]) {
    const data = [
      ['Date', 'Volume (kg)'],
      ...recoltes.map(r => [
        this.formatDate(r.date),
        r.volume
      ])
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    ws['!cols'] = [{ wch: 15 }, { wch: 15 }];
    
    XLSX.utils.book_append_sheet(workbook, ws, 'Récoltes');
  }

  private addTraitementsVarroaSheet(workbook: XLSX.WorkBook, traitements: any[]) {
    const data = [
      ['Date', 'Produit'],
      ...traitements.map(t => [
        this.formatDate(t.date),
        t.produit
      ])
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    ws['!cols'] = [{ wch: 15 }, { wch: 30 }];
    
    XLSX.utils.book_append_sheet(workbook, ws, 'Traitements Varroa');
  }

  private addNourrisementsSheet(workbook: XLSX.WorkBook, nourrissements: any[]) {
    const data = [
      ['Date', 'Produit', 'Quantité'],
      ...nourrissements.map(n => [
        this.formatDate(n.date),
        n.produit,
        n.quantite
      ])
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    ws['!cols'] = [{ wch: 15 }, { wch: 30 }, { wch: 15 }];
    
    XLSX.utils.book_append_sheet(workbook, ws, 'Nourrissements');
  }

  private addMaladiesTraitementsSheet(workbook: XLSX.WorkBook, maladies: any[]) {
    const data = [
      ['Date', 'Maladie', 'Traitement'],
      ...maladies.map(m => [
        this.formatDate(m.date),
        m.maladie,
        m.traitement || 'Aucun'
      ])
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    ws['!cols'] = [{ wch: 15 }, { wch: 30 }, { wch: 40 }];
    
    XLSX.utils.book_append_sheet(workbook, ws, 'Maladies');
  }

  private addObservationsSheet(workbook: XLSX.WorkBook, observations: any[]) {
    const data = [
      ['Date', 'Observation'],
      ...observations.map(o => [
        this.formatDate(o.date),
        o.contenu
      ])
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    ws['!cols'] = [{ wch: 15 }, { wch: 60 }];
    
    XLSX.utils.book_append_sheet(workbook, ws, 'Observations');
  }

  /**
   * Formate une date au format français
   */
  private formatDate(date: any): string {
    if (!date) return '';
    
    let dateObj: Date;
    
    if (date.seconds) {
      // Format Firebase Timestamp
      dateObj = new Date(date.seconds * 1000);
    } else {
      dateObj = new Date(date);
    }
    
    return dateObj.toLocaleDateString('fr-FR');
  }
}