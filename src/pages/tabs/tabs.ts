import { Component } from '@angular/core';

@Component({
    templateUrl: 'tabs.html'
})

export class TabsPage {
    tab1Root = 'HomePage';
    tab2Root = 'ConfiguracaoPage';

    parametros = {
        teste: 'Parametro entregue',
        teste2: 'outro parametro'
    };
}
 