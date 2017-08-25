# Angular 4 + Redux Seed

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.1.

## Development server

Run `ng serve` for a dev server. This will run in `http://localhost:4200/`.

## Running Protractor E2E Tests

Use npm to install Protractor globally with `npm install -g protractor`. 
This will install two command line tools, protractor and webdriver-manager. Try running protractor --version to make sure it's working.
The webdriver-manager is a helper tool to easily get an instance of a Selenium Server running. Use it to download the necessary binaries with `webdriver-manager update`.

Finally, in one command prompt, run the server with `ng serve` and in another command prompt (a new one) run test with `protractor`

## Comments about the seed

Here we will walk through this seed project in order to explain or at least introduce all the technologies
were used, to get a better idea of the work. Based on @angular/cli starter project, we started adding
all the technologies we consider important in order to develop a big and scalable application without loosing focus on the performance.

We used WebPack in order to perform the bootsraping process of the application and manage correctly
the scripts dependencies. During the bootsrap process, we also configure some global variables to
be accessed from anywhere in the application. All the resoruces are bundled, taken from the assets folder.

In order to implement lazy-loading of the app scripts, we used Angular 4 Router, to lazy load the modules. It aids in the lazy download and registration of services, directives, controllers and filters just-in-time. It supports hierarchies of dependencies within these components. This is a key aspect, it let us develop as many modules to the app as we wish, without afecting its performance nor its loading & bootstraping times! So, thinking that our application can scale without limits, it's always the best approach!

In the App Component (or Root component), we'll find all the initial configurations of the application such as routing rules, the transaltions configuration to support i18n, the initial configuration of web browser push notifications (just as Slack, Whatsapp and Facebook, based on Google Service Worker) and all our common tools that will help us all over the app.

Inside the modules folder, is where the application modules are. Each module, has it's own folder with the component or components used in that module, a views, services, directives, pipes, Redux stuff such as Reducers, Actions, etc... This structure help us keep the MVC (or MVVM) pattern, giving us abstraction and spread of responsabilities, making code more flexible and mantainable.

We use Redux as it help us a lot managing the application state, reducing complexity and keeping full control all over the application. As Redux guys define thereselve, Redux provides an easy way to centralize the state of your application. In addition, in these days, if your use functional programming (Redux, Mobx, Flux) and all the benefits this style provides!

We protect the routes with "Angular Guards", so each route decalred has its own rules to determine if the request is valid or not for that client. We're using Bootsrap Modals for showing extra information or actions needed across the application. It's a better UX and in my opinion,a nicer UI is presented that way. In order to validate the forms, we extend de jQuery validation library inside an Angular factory, so we can create custom messages and extend the library rules, in order to have full cotrol of the forms. This is initiated during the bootrstraping process of the application.