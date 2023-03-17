import { Routes } from "@angular/router";
import { ListTracksComponent } from "src/app/components/list-tracks/list-tracks.component";
import { HomeComponent } from "../home/home.component";
import { PlayerComponent } from "./player.component";

export const PlayerRoutes: Routes = [
    {
        path: '',
        component: PlayerComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'list/:type/:id',
                component: ListTracksComponent
            }
        ]
    }
]