import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, OnDestroy {
  user: { id: number; name: string };
  // see comment on ngOnDestroy hook
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    /* this method renders the component using the parameters present at initialization but does not listen for changes to the parameters to trigger a re-render */
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name'],
    };
    /* This way uses the params Observable to listen to changes to the params and reacts to the change by reassigning the user.id and user.name, triggering a rerender to update the data bound in the template */
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.user.id = params['id'];
      this.user.name = params['name'];
    });
  }

  // the code in this hook is not necessary bc Angular handles this behind the scenes; this manually stop listening to changes in the route params when the component is removed from the DOM
  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }
}
