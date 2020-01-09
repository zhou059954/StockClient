import { Component, OnInit } from '@angular/core';
import { StockService } from './stock.service';
import { Stock } from './stock';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PagerService } from 'app/_services/app/_services';
import { ConfirmSettings } from 'app/_interface/confirm-settings';
import { ResolveEmit } from '@jaspero/ng2-confirmations/src/interfaces/resolve-emit';
import { ConfirmationService } from '@jaspero/ng2-confirmations';
import { MatDialog } from '@angular/material';
import { CalculeComponent } from './calcule/calcule.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Calcule } from './calcule/calcule';
import { MoinComponent } from './moin/moin.component';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  loading = false;
  allStocks: Stock[];
  statusCode: number;
  requestProcessing = false;
  processValidation = false;
  pager: any = {};
  pagedItems: any[];
  supprimes: Stock;
  plus: number;
  moin: number;
  stockPlus: number;
  stockMoin: number;
  stockIdToUpdate = null;
  id_stock: string;
  quantiteS: number = 0;
  puS: number = 0;
  stockQuantite: number;
  imageS = null;
  nomS = null;
  quantiteStock = null;

  settings: ConfirmSettings | any = {
    overlay: true,
    overlayClickToClose: true,
    showCloseButton: true,
    confirmText: 'Oui',
    declineText: 'Non'
  };

  stockForm = new FormGroup({
    //  _id: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    nom: new FormControl('', Validators.required),
    quantite: new FormControl('', Validators.required),
    PU: new FormControl('', Validators.required)
  });


  constructor(private stockService: StockService,
    private pagerService: PagerService,
    private _confirmation: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getAllStocks();
  }
  getAllStocks() {
    this.stockService.getAllStock()
      .subscribe(
        data => {
          this.allStocks = data;
          this.setPage(1);
        },
        errorCode => this.statusCode = errorCode);
  }


  openDialog(): void {
    let dialogRef = this.dialog.open(CalculeComponent, {
      data: { plus: this.plus }
    }
    );

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      this.stockPlus = result;
      console.log(result);
      this.id_stock = this.route.snapshot.queryParams['id'];
      console.log("fanokafana =" + this.id_stock);
      this.loadStockToEdit(this.id_stock);
      this.onStockFormSubmit(this.stockPlus, this.id_stock);
      if (this.stockPlus != 0) {
        //this.getAllStocks();
      }
    });
  }

  openDialogMoin(): void {
    let dialogRef = this.dialog.open(MoinComponent, {
      data: { moin: this.moin }
    }
    );

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      this.stockMoin = (0 - result) * 1;
      console.log(result);
      this.id_stock = this.route.snapshot.queryParams['id'];
      this.loadStockToEdit(this.id_stock);
      this.onStockFormSubmit(this.stockMoin, this.id_stock);
      if (this.stockMoin != 0) {
        // this.getAllStocks();
      }
    });
  }


  loadStockToEdit(_id: string) {
    console.log("id = " + _id);
    this.stockService.getStockById(_id)
      .subscribe(stock => {
        this.stockIdToUpdate = stock._id;
        this.imageS = stock.image;
        this.nomS = stock.nom;
        this.quantiteS = stock.quantite;
        this.stockForm.setValue({
          image: stock.image,
          nom: stock.nom,
          quantite: stock.quantite,
          PU: stock.PU
        });
      },
        errorCode => this.statusCode = errorCode);
  }

  onStockFormSubmit(stockenplus: number, _id: string) {
    //this.quantiteS = this.stockForm.get('quantite').value;
    this.processValidation = true;
    this.preProcessConfigurations();
    this.loading = true;
    this.stockService.getStockById(_id)
      .subscribe(stock => {
        this.stockIdToUpdate = stock._id;
        this.imageS = stock.image;
        this.nomS = stock.nom;
        this.quantiteS = stock.quantite;
        this.puS = stock.PU;
        this.stockQuantite = this.quantiteS;
        let stocks = new Stock(this.stockIdToUpdate, this.imageS, this.nomS, this.stockQuantite, this.puS);
        console.log(stocks);
        this.stockService.updateStock(stocks, _id, stockenplus)
          .subscribe(successCode => {
            this.getAllStocks();
            this.statusCode = successCode;
          },
            errorCode => this.statusCode = errorCode);
      });

    this.processValidation = false;
    this.preProcessConfigurations();
    this.loading = false;
  }


  setPage(page: number) {
    this.pager = this.pagerService.getPager(this.allStocks.length, page);
    this.pagedItems = this.allStocks.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.router.navigate(['/homepage'], { queryParams: { page: page } });
  }

  deleteStock(id_stock: string) {
    this.stockService.getStockById(id_stock)
      .subscribe(supprimer => {
        this.supprimes = supprimer;
        this._confirmation.create('Stock', 'Voulez-vous vraiment supprmier ' + supprimer.nom, this.settings)
          .subscribe((ans: ResolveEmit) => {
            if (ans.resolved == true) {
              this.preProcessConfigurations();
              this.stockService.deleteStockById(id_stock)
                .subscribe(successCode => {
                  this.statusCode = successCode;
                  this.getAllStocks();
                },
                  errorCode => this.statusCode = errorCode);
              console.log('accepted button clicked');
            } else {
              console.log('decline button clicked');
            }

          });
      });
  }


  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }
}
