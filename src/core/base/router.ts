export abstract class Router {
  /**
   * Authentication routes
   * @static
   * @memberof Router
   * @example /auth/register
   */
  static Auth = class {
    /** Authentication */
    static ApiTag = 'Authentication';
    /** auth */
    static Base = 'auth';
    /** signin */
    static Signin = 'signin';
    /** register */
    static Register = 'register';
    /** send-otp */
    static SendOtp = 'send-otp';
    /** * verify-otp */
    static VerifyOtp = 'verify-otp';
  }

  /**
   * Users routes
   * @static
   * @memberof Router
   * @example /users
   */
  static Users = class {
    /** User */
    static ApiTag = 'Users';
    /** user */
    static Base = 'users';
    /** undefined */
    static Profile;
  }

  /**
   * Driver routes
   * @static
   * @memberof Router
   * @example /drivers
   */
  static Driver = class {
    /** Driver */
    static ApiTag = 'Driver';
    /** driver */
    static Base = 'drivers';
    /** settings */
    static Settings = 'settings';
    /** settings */
    static UpdateSettings = 'settings';
    /** update-location */
    static UpdateLocation = 'update-location';
    /** nearst */
    static Nearset = 'nearest';
    /** offer */
    static Offer = 'offer';
    /** offer-action */
    static OfferAction = 'offer-action';
  }

  /**
   * Addresses routes
   * @static
   * @memberof Router
   * @example /addresses
   */
  static Addresses = class {
    /** Address */
    static ApiTag = 'Addresses';
    /** address */
    static Base = 'addresses';
    /** undefined */
    static List;
    /** by-account */
    static ByAccount = 'by-account';
    /** :id */
    static Single = ':id';
    /** undefined */
    static Create;
    /** undefined */
    static Update;
    /** :id/set-favorite */
    static SetFavorite = ':id/set-favorite';
    /** :id/remove-favorite */
    static RemoveFavorite = ':id/remove-favorite';
    /** undefined */
    static Delete = ':id';
  }

  /**
   * Orders routes
   * @static
   * @memberof Router
   * @example /orders
   */
  static Orders = class {
    /** Order */
    static ApiTag = 'Orders';
    /** order */
    static Base = 'orders';
    /** undefined */
    static List;
    /** :id */
    static Single = ':id';
    /** undefined */
    static Create;
    /** confirm */
    static Confirm = 'confirm';
    /** cancel */
    static Cancel = 'cancel';
    /** start */
    static Start = 'start';
    /** complete */
    static Complete = 'complete';
  }

  /**
   * Files routes
   * @static
   * @memberof Router
   * @example /storage/avatar.png
   */
  static Files = class {
    /** Files */
    static ApiTag = 'Storage';
    /** storage */
    static Base = 'storage';
    /** /:dir/:filename */
    static Get = ':dir/:filename';
    /** undefined */
    static Upload;
  }
}
