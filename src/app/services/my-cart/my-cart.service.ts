import {Injectable} from '@angular/core';
import {Membership} from '../../models/membership';
import {Retreat} from '../../models/retreat';
import {TimeSlot} from '../../models/timeSlot';
import {Cart, SelectedProductOption} from '../../models/cart';
import {Coupon} from '../../models/coupon';
import {AppliedCoupon} from '../../models/appliedCoupon';
import {ReservationPackage} from '../../models/reservationPackage';
import {BehaviorSubject, Observable} from 'rxjs';
import {RetreatType} from '../../models/retreatType';

@Injectable({
  providedIn: 'root'
})
export class MyCartService {

  localStorageName = 'cart';

  _cart: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(
    this.localCart
  );

  public cart$: Observable<Cart> = this._cart.asObservable();

  _elementChangeInCart: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public elementChangeInCart$: Observable<boolean> = this._elementChangeInCart.asObservable();

  constructor() {

    this.cart$.subscribe(
      (cart: Cart) => {
        this.setLocalCart(cart);
      }
    );
  }

  cleanLocalCart() {
    this._cart.next(new Cart());
  }

  private elementChangeInCart() {
    this._elementChangeInCart.next(true);
  }

  get localCart(): Cart {
    const cart = JSON.parse(localStorage.getItem(this.localStorageName));
    if ( cart !== undefined ) {
      return new Cart(cart);
    } else {
      return  new Cart();
    }
  }

  setLocalCart(cart: Cart) {
    localStorage.setItem(this.localStorageName, JSON.stringify(cart));
  }

  resetCart() {
    const cart = new Cart();
    this._cart.next(cart);
  }


  setAppliedCoupon(appliedCoupon: AppliedCoupon) {
    const localCart = this.localCart;
    localCart.setAppliedCoupon(appliedCoupon);
    localCart.addCoupon(appliedCoupon.coupon);
    this._cart.next(localCart);
  }


  removeAppliedCoupon() {
    const localCart = this.localCart;
    localCart.removeAppliedCoupon();
    localCart.removeCoupon();
    this._cart.next(localCart);
  }

  setMetadata(product: Retreat | TimeSlot | ReservationPackage | Membership, metadata) {
    const localCart = this.localCart;
    localCart.setMetadata(product, metadata);
    this._cart.next(localCart);
  }

  addMembership(membership: Membership) {
    const localCart = this.localCart;
    localCart.addMembership(membership);
    this._cart.next(localCart);
  }

  addCoupon(coupon: Coupon) {
    const localCart = this.localCart;
    localCart.addCoupon(coupon);
    this._cart.next(localCart);
  }

  removeMembership(membershipId: number) {
    const localCart = this.localCart;
    localCart.removeMembership(membershipId);
    this._cart.next(localCart);
  }

  removeReservationPackage(reservationPackageId: number) {
    const localCart = this.localCart;
    localCart.removeReservationPackage(reservationPackageId);
    this._cart.next(localCart);
    this.elementChangeInCart();
  }

  removeCoupon() {
    const localCart = this.localCart;
    localCart.removeCoupon();
    this._cart.next(localCart);
  }

  addRetreat(retreat: Retreat, productOptions: SelectedProductOption[] = []) {

    const localCart = this.localCart;
    localCart.addRetreat(retreat, productOptions);

    this._cart.next(localCart);
    this.elementChangeInCart();
  }

  removeRetreat(retreatId: number) {
    const localCart = this.localCart;
    localCart.removeRetreat(retreatId);
    this._cart.next(localCart);
    this.elementChangeInCart();
  }

  addTimeslot(timeslot: TimeSlot, productOptions: SelectedProductOption[] = []) {
    const localCart = this.localCart;
    localCart.addTimeslot(timeslot, productOptions);
    this._cart.next(localCart);
    this.elementChangeInCart();
  }

  addReservationPackage(reservationPackage: ReservationPackage) {
    const localCart = this.localCart;
    localCart.addReservationPackage(reservationPackage);
    this._cart.next(localCart);
    this.elementChangeInCart();
  }

  removeTimeslot(timeslotId: number) {
    const localCart = this.localCart;
    localCart.removeTimeslot(timeslotId);
    this._cart.next(localCart);
    this.elementChangeInCart();
  }

  addPaymentToken(token, isNew = false) {
    const localCart = this.localCart;
    if (isNew) {
      localCart.setSingleUseToken(token);
    } else {
      localCart.setPaymentToken(token);
    }
    this._cart.next(localCart);
  }

  removePaymentToken() {
    const localCart = this.localCart;
    localCart.removePaymentToken();
    this._cart.next(localCart);
  }

  get hasMembership(): boolean {
    const localCart = this.localCart;
    return localCart.hasMembership;
  }

  get hasRetreat(): boolean {
    const localCart = this.localCart;
    return localCart.hasRetreat;
  }

  get hasTimeslot(): boolean {
    const localCart = this.localCart;
    return localCart.hasTimeslot;
  }

  containTypeOfRetreat(type: RetreatType) {
    const localCart = this.localCart;
    return localCart.containTypeOfRetreat(type);
  }
}
