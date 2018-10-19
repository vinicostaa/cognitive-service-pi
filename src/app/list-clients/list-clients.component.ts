import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Client } from '../model/client';

@Component({
  selector: 'cog-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.css']
})
export class ListClientsComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  clients: Client[] = [];

  async ngOnInit() {
    this.clients =  await this.apiService.listClients();
  }

}
