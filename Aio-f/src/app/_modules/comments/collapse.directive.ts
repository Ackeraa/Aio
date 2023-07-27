import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appCollapse]',
})
export class CollapseDirective {
  @HostBinding('class.collapsed') isCollapsed = true;

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
