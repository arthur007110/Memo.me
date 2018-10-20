import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

    items: MenuItem[];
    siape:string;

    ngOnInit(){
        this.siape = localStorage.getItem("siape");
        this.items = [
            {
                label: 'File',
                icon: 'pi pi-fw pi-file',
                items: [{
                        label: 'New', 
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            {label: 'Project'},
                            {label: 'Other'},
                        ]
                    },
                    {label: 'Open'},
                    {separator:true},
                    {label: 'Quit'}
                ]
            },
            {
                label: 'Setor',
                icon: '',
                items: [
                    {label: 'Listar Setores',
                    icon: 'pi pi-fw pi-pencil',
                    command: (event: Event) => { }},
                    {label: 'Atualizar Dados do Setor',
                    icon: 'pi pi-fw pi-refresh',
                    command: (event: Event) => { }}
                ]
            },
            {
                label: 'Help',
                icon: 'pi pi-fw pi-question',
                items: [
                    {
                        label: 'Contents'
                    },
                    {
                        label: 'Search', 
                        icon: 'pi pi-fw pi-search', 
                        items: [
                            {
                                label: 'Text', 
                                items: [
                                    {
                                        label: 'Workspace'
                                    }
                                ]
                            },
                            {
                                label: 'File'
                            }
                    ]}
                ]
            },
            {
                label: 'Actions',
                icon: 'pi pi-fw pi-cog',
                items: [
                    {
                        label: 'Edit',
                        icon: 'pi pi-fw pi-pencil',
                        items: [
                            {label: 'Save', icon: 'pi pi-fw pi-save'},
                            {label: 'Update', icon: 'pi pi-fw pi-save'},
                        ]
                    },
                    {
                        label: 'Other',
                        icon: 'pi pi-fw pi-tags',
                        items: [
                            {label: 'Delete', icon: 'pi pi-fw pi-minus'}
                        ]
                    }
                ]
            },
            {
                label: 'Quit', icon: 'pi pi-fw pi-times'
            }
        ];
    }

    deslogar(){
        this.router.navigate(['/login']);
    }
}