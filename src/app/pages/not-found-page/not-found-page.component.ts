// not-found.component.ts
import { Component, inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
	selector: "app-not-found",
	standalone: true,
	template: "",
})
export class NotFoundComponent implements OnInit {
	router = inject(Router);

	ngOnInit(): void {
		Swal.fire({
			icon: "error",
			title: "Ruta no válida",
			text: "La página que intentaste visitar no existe.",
			confirmButtonText: "Ir al login",
			customClass: {
				confirmButton: "btn btn-secondary",
			},
			buttonsStyling: false,
		}).then(() => {
			this.router.navigate(["/login"]);
		});
	}
}
