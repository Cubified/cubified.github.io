import{K as pt,S as dt,i as ut,s as ht,k as C,a as w,l as y,m as N,c as k,h as b,n as f,L as q,b as E,G as g,f as x,g as X,d as G,t as W,M as mt,o as bt,N as tt,O as Ct,P as et,Q as H,R as it,I as yt,q as I,r as O,B as Q,T as ft,U as gt,w as nt,J as vt,x as st,y as rt,z as ot}from"../../../chunks/index-8ff2c44d.js";import{c as S}from"../../../chunks/shared-23917130.js";import{B as Pt}from"../../../chunks/border-e42bd11d.js";function V(n,{delay:t=0,duration:e=400,easing:s=pt}={}){const l=+getComputedStyle(n).opacity;return{delay:t,duration:e,easing:s,css:i=>`opacity: ${i*l}`}}function wt(n,t){n.postMessage(JSON.stringify(t))}function kt(n){return n.data?JSON.parse(n.data):{}}function Mt(n){return n&&n.id&&n.radius&&n.position&&typeof n.position.x=="number"&&typeof n.position.y=="number"}function _t(n){return n&&typeof n.width=="number"&&typeof n.height=="number"}class At{constructor(t={}){this.worker=new Worker(URL.createObjectURL(new Blob([`// most of this code is taken from here:
// https://github.com/snorpey/CirclePackingJS/blob/master/js-module/web/js/lib/Vector.js
// by @onedayitwillmake / Mario Gonzalez with some changes by @snorpey

class Vector {
	constructor ( x, y ) {
		if ( typeof x === 'object' ) {
			this.x = x.x;
			this.y = x.y;
		} else {
			this.x = x;
			this.y = y;
		}
	}

	cp () {
		return new Vector( this.x, this.y );
	}

	mul ( factor ) {
		this.x *= factor;
		this.y *= factor;
		return this;
	}

	normalize () {
		var l = this.length();
		this.x /= l;
		this.y /= l;
		return this;
	}

	length () {
		var length = Math.sqrt( this.x * this.x + this.y * this.y );
		
		if ( length < 0.005 && length > -0.005 ) {
			return 0.000001;
		}

		return length;
	}

	distance ( vec ) {
		var deltaX = this.x - vec.x;
		var deltaY = this.y - vec.y;
		return Math.sqrt( ( deltaX * deltaX ) + ( deltaY * deltaY ) );
	}

	distanceSquared ( vec ) {
		var deltaX = this.x - vec.x;
		var deltaY = this.y - vec.y;
		return ( deltaX * deltaX ) + ( deltaY * deltaY );
	}
}

// most of this code is taken from here:
// https://github.com/snorpey/CirclePackingJS/blob/master/js-module/web/js/PackedCircle.js
// by @onedayitwillmake / Mario Gonzalez with some changes by @snorpey

class PackedCircle {
	constructor ( { id, radius, x, y, isPulledToCenter, isPinned } ) {
		x = x || 0;
		y = y || 0;

		this.id = id;                      

		// Where we would like to be
		this.targetPosition = new Vector( 0, 0 );
		// Where we really are
		this.position = new Vector( x, y );
		this.previousPosition = new Vector( x, y );

		// For the div stuff  - to avoid superflous movement calls
	  	this.positionWithOffset = new Vector( x, y );
		this.previousPositionWithOffset = new Vector( x, y );

		this.isPulledToCenter = isPulledToCenter;
		this.isPinned = isPinned;

		// Stored because transform3D is relative
		this.setRadius( radius );
	}

	setPosition ( aPosition ) {
		this.previousPosition = this.position;
		this.position = aPosition.cp();
	}

	distanceSquaredFromTargetPosition () {
		var distanceSquared = this.position.distanceSquared( this.targetPosition );
		// if it's shorter than either radi, we intersect
		return distanceSquared < this.radiusSquared;
	}

	setRadius ( aRadius ) {
		this.radius = aRadius;
		this.radiusSquared = aRadius * aRadius;
		this.originalRadius = aRadius;
	}

	get delta () {
		return new Vector(
			this.position.x - this.previousPosition.x,
			this.position.y - this.previousPosition.y
		);
	}
}

// most of this code is taken from here:
// https://github.com/snorpey/CirclePackingJS/blob/master/js-module/web/js/PackedCircleManager.js
// by @onedayitwillmake / Mario Gonzalez with some changes by @snorpey

class PackedCircleManager {
	constructor () {
		this.allCircles = [ ];
		this.pinnedCircleIds = [ ];
		this.desiredTarget = new Vector( 0, 0 );
		this.bounds = { left: 0, top: 0, right: 0, bottom: 0 };
		this.damping = 0.025;

		// Number of passes for the centering and collision
		// algorithms - it's (O)logN^2 so use increase at your own risk!
		// Play with these numbers - see what works best for your project
		this.numberOfCenteringPasses = 1;
		this.numberOfCollisionPasses = 3;

		this.isCenterPullActive = true;
	}

	/**
	 * Set the boundary rectangle for the circle packing.
	 * This is used to locate the 'center'
	 * @param aBoundaryObject
	 */
	setBounds ( aBoundaryObject ) {
		if ( typeof aBoundaryObject.left === 'number' ) {
			this.bounds.left = aBoundaryObject.left;
		}

		if ( typeof aBoundaryObject.right === 'number' ) {
			this.bounds.right = aBoundaryObject.right;
		}

		if ( typeof aBoundaryObject.top === 'number' ) {
			this.bounds.top = aBoundaryObject.top;
		}

		if ( typeof aBoundaryObject.bottom === 'number' ) {
			this.bounds.bottom = aBoundaryObject.bottom;
		}

		if ( typeof aBoundaryObject.width === 'number' ) {
			this.bounds.right = this.bounds.left + aBoundaryObject.width;
		}

		if ( typeof aBoundaryObject.height === 'number' ) {
			this.bounds.bottom = this.bounds.top + aBoundaryObject.height;
		}
	}

	/**
	 * Add a circle
	 * @param aCircle A Circle to add, should already be created.
	 */
	addCircle ( aCircle ) {
		if ( ! ( aCircle instanceof PackedCircle ) ) {
			aCircle = new PackedCircle( {
				id: aCircle.id,
				radius: aCircle.radius,
				x: aCircle.position.x || 0,
				y: aCircle.position.y || 0,
				isPinned: aCircle.isPinned || false,
				isPulledToCenter: typeof aCircle.isPulledToCenter === 'boolean' ? aCircle.isPulledToCenter : true
			} );
		}

		this.allCircles.push( aCircle );
		aCircle.targetPosition = this.desiredTarget.cp();
	}

	/**
	 * Remove a circle
	 * @param circleToRemoveId Id of the circle to remove
	 */
	removeCircle ( circleToRemoveId ) {
		const indicesToRemove = this.allCircles.reduce( ( indices, circle, index ) => {
			if ( circle.id === circleToRemoveId ) {
				indices.push( index );
			}

			return indices;
		}, [ ] );

		for ( let n = indicesToRemove.length - 1; n >= 0; n-- ) {
			this.allCircles.splice( indicesToRemove[n], 1 );
		}
	}

	/**
	 * Recalculate all circle positions
	 */
	updatePositions () {
		var circleList = this.allCircles;
		var circleCount = circleList.length;

		// store information about the previous position
		for ( let i = 0; i < circleCount; ++i ) {
			const circle = circleList[i];

			circle.previousPosition = circle.position.cp();
		}

		if ( this.desiredTarget && this.isCenterPullActive ) {
			// Push all the circles to the target - in my case the center of the bounds
			this.pushAllCirclesTowardTarget( this.desiredTarget );
		}
		
		// Make the circles collide and adjust positions to move away from each other
		this.handleCollisions();

		// store information about the previous position
		for ( let i = 0; i < circleCount; ++i ) {
			const circle = circleList[i];

			this.handleBoundaryForCircle( circle );
		}
	}

	pushAllCirclesTowardTarget ( aTarget ) {
		var v = new Vector( 0, 0 );

		var dragCircle = this.draggedCircle;
		var circleList = this.allCircles;
		var circleCount = circleList.length;

		for ( var n = 0; n < this.numberOfCenteringPasses; n++ ) {			
			for ( var i = 0; i < circleCount; i++ ) {
				var circle = circleList[i];
				
				if ( circle.isPulledToCenter ) {
					// Kinematic circles can't be pushed around.
					const isCircleKinematic = circle === dragCircle || this.isCirclePinned( circle.id );

					if ( isCircleKinematic ) {
						continue;
					}

					v.x = circle.position.x - aTarget.x;
					v.y = circle.position.y - aTarget.y;
					v.mul ( this.damping );
					
					circle.position.x -= v.x;
					circle.position.y -= v.y;
				}
			}
		}
	}

	/**
	 * Packs the circles towards the center of the bounds.
	 * Each circle will have it's own 'targetPosition' later on
	 */
	handleCollisions () {
		var v = new Vector( 0, 0 );

		var dragCircle = this.draggedCircle;
		var circleList = this.allCircles;
		var circleCount = circleList.length;

		// Collide circles
		for ( var n = 0; n < this.numberOfCollisionPasses; n++ ) {
			for ( var i = 0; i < circleCount; i++ ) {
				var circleA = circleList[i];
				
				for ( var j = i + 1; j < circleCount; j++ ) {
					var circleB = circleList[j];

					const isCircleAPinned = this.isCirclePinned( circleA.id );
					const isCircleBPinned = this.isCirclePinned( circleB.id );

					// Kinematic circles can't be pushed around.
					const isCircleAKinematic = circleA === dragCircle || isCircleAPinned;
					const isCircleBKinematic = circleB === dragCircle || isCircleBPinned;
					
					if (
						// It's us!
						circleA === circleB ||

						// Kinematic circles don't interact with eachother
						( isCircleAKinematic && isCircleBKinematic )
					) {
						continue; 
					}

					var dx = circleB.position.x - circleA.position.x;
					var dy = circleB.position.y - circleA.position.y;

					// The distance between the two circles radii, 
					// but we're also gonna pad it a tiny bit 
					var r = ( circleA.radius + circleB.radius ) * 1.08;
					var d = circleA.position.distanceSquared( circleB.position );

					if ( d < ( r * r ) - 0.02 ) {
						v.x = dx;
						v.y = dy;
						v.normalize();

						var inverseForce = ( r - Math.sqrt( d ) ) * 0.5;
						v.mul( inverseForce );
						
						if ( ! isCircleBKinematic ) {
							if ( isCircleAKinematic ) {
								// Double inverse force to make up 
								// for the fact that the other object is fixed
								v.mul( 2.2 );
							}

							circleB.position.x += v.x;
							circleB.position.y += v.y;
						}

						if ( ! isCircleAKinematic ) {
							if ( isCircleBKinematic ) {
								// Double inverse force to make up 
								// for the fact that the other object is fixed
								v.mul( 2.2 );
							}

							circleA.position.x -= v.x;
							circleA.position.y -= v.y;
						}
					}
				}
			}
		}
	}

	handleBoundaryForCircle ( aCircle ) {		
		const x = aCircle.position.x;
		const y = aCircle.position.y;
		const radius = aCircle.radius;
		
		let overEdge = false;

		if ( x + radius >= this.bounds.right ) {
			aCircle.position.x = this.bounds.right - radius;
			overEdge = true;
		} else if ( x - radius < this.bounds.left ) {
			aCircle.position.x = this.bounds.left + radius;
			overEdge = true;
		}

		if ( y + radius > this.bounds.bottom ) {
			aCircle.position.y = this.bounds.bottom - radius;
			overEdge = true;
		} else if ( y - radius < this.bounds.top ) {
			aCircle.position.y = this.bounds.top + radius;
			overEdge = true;
		}

		// end dragging if user dragged over edge
		if ( overEdge && aCircle === this.draggedCircle ) {
			this.draggedCircle = null;
		}
	}

	/**
	 * Force a certain circle to be the 'draggedCircle'.
	 * Can be used to undrag a circle by calling setDraggedCircle(null)
	 * @param aCircle  Circle to start dragging. It's assumed to be part of our list. No checks in place currently.
	 */
	setDraggedCircle ( aCircle ) {
		// Setting to null, and we had a circle before.
		// Restore the radius of the circle as it was previously
		if ( this.draggedCircle && this.draggedCircle !== aCircle ) {
			this.draggedCircle.radius = this.draggedCircle.originalRadius;
		}

		this.draggedCircle = aCircle;
	}

	dragStart ( id ) {
		const draggedCircle = this.allCircles.filter( circle => circle.id === id )[0];
		this.setDraggedCircle( draggedCircle );
	}

	dragEnd ( id ) {
		if ( this.draggedCircle ) {
			this.setDraggedCircle( null );
		}
	}

	drag ( id, position ) {
		if ( this.draggedCircle && position ) {
			this.draggedCircle.position.x = position.x;
			this.draggedCircle.position.y = position.y;
		}
	}

	isCirclePinned ( id ) {
		const circle = this.circleById( id );

		if ( circle ) {
			return circle.isPinned;
		}

		return false;
	}

	pinCircle ( id ) {
		const circle = this.circleById( id );

		if ( circle ) {
			circle.isPinned = true;
		}
	}

	unpinCircle ( id ) {
		const circle = this.circleById( id );

		if ( circle ) {
			circle.isPinned = false;
		}
	}

	setCircleRadius ( id, radius ) {
		const circle = this.circleById( id );

		if ( circle ) {
			circle.setRadius( radius );
		}
	}

	setCircleCenterPull ( id, centerPull ) {
		const circle = this.circleById( id );

		if ( circle ) {
			circle.isPulledToCenter = centerPull;
		}
	}

	setCenterPull ( centerPull ) {
		this.isCenterPullActive = centerPull;
	}

	circleById ( id ) {
		return this.allCircles.filter( circle => circle.id === id )[0];
	}

	/**
	 * Sets the target position where the circles want to be
	 * @param aPosition
	 */
	setTarget ( aPosition ) {
		this.desiredTarget = aPosition;
	}
}

function sendWorkerMessage ( worker, msg ) {
	worker.postMessage( JSON.stringify( msg ) );
}

function processWorkerMessage ( event ) {
	return event.data ? JSON.parse( event.data ) : { };
}

// this code is mostly for message passing between the 
// PackedCircleManager and CirclePacker classes

self.addEventListener( 'message', receivedMessage );

const circleManager = new PackedCircleManager();

function receivedMessage ( event ) {
	const { type, message } = processWorkerMessage( event );

	if ( type === 'bounds' )  {
		circleManager.setBounds( message );
	}

	if ( type === 'target' )  {
		setTarget( message );
	}

	if ( type === 'addcircles' ) {
		addCircles( message );
	}

	if ( type === 'removecircle' ) {
		circleManager.removeCircle( message );
	}

	if ( type === 'update' ) {
		update();
	}

	if ( type === 'dragstart' ) {
		circleManager.dragStart( message.id, message.position );
	}

	if ( type === 'drag' ) {
		circleManager.drag( message.id, message.position );
	}

	if ( type === 'dragend' ) {
		circleManager.dragEnd( message.id );
	}

	if ( type === 'pincircle' ) {
		circleManager.pinCircle( message );
	}

	if ( type === 'unpincircle' ) {
		circleManager.unpinCircle( message );
	}

	if ( type === 'centeringpasses' ) {
		if ( typeof message === 'number' && message > 0 ) {
			circleManager.numberOfCenteringPasses = message;
		}
	}

	if ( type === 'collisionpasses' ) {
		if ( typeof message === 'number' && message > 0 ) {
			circleManager.numberOfCollisionPasses = message;
		}
	}

	if ( type === 'damping' ) {
		if ( typeof message === 'number' && message > 0 ) {
			circleManager.damping = message;
		}
	}

	if ( type === 'circleradius' ) {
		circleManager.setCircleRadius( message.id, message.radius );
	}

	if ( type === 'circlecenterpull' ) {
		circleManager.setCircleCenterPull( message.id, message.centerPull );
	}

	if ( type === 'centerpull' ) {
		circleManager.setCenterPull( message.centerPull );
	}
}

function updatePage ( type, message ) {
	sendWorkerMessage( self, { type, message } );
}

function addCircles ( circles ) {
	if ( Array.isArray( circles ) && circles.length ) {
		circles.forEach( circleManager.addCircle.bind( circleManager ) );
	}
}

function setTarget ( target ) {
	if ( target && typeof target.x === 'number' && typeof target.y === 'number' ) {
		circleManager.setTarget( new Vector( target ) );
	}
}

function update () {
	circleManager.updatePositions();

	sendPositions();
}

function sendPositions () {
	const positions = circleManager.allCircles.reduce( ( result, circle ) => {
		result[circle.id] = {
			position: circle.position,
			previousPosition: circle.previousPosition,
			radius: circle.radius,
			delta: circle.delta,
			isPulledToCenter: circle.isPulledToCenter,
			isPinned: circle.isPinned
		};

		return result;
	}, { } );

	updatePage( 'move', positions );
}
`],{type:"text/javascript"}))),this.worker.addEventListener("message",this.receivedWorkerMessage.bind(this)),this.isContinuousModeActive=typeof t.continuousMode=="boolean"?t.continuousMode:!0,this.onMoveStart=t.onMoveStart||null,this.onMove=t.onMove||null,this.onMoveEnd=t.onMoveEnd||null,this.lastCirclePositions=[],t.centeringPasses&&this.setCenteringPasses(t.centeringPasses),t.collisionPasses&&this.setCollisionPasses(t.collisionPasses),this.addCircles(t.circles||[]),this.setBounds(t.bounds||{width:100,height:100}),this.setTarget(t.target||{x:50,y:50}),this.isLooping=!1,this.areItemsMoving=!0,this.animationFrameId=NaN,this.initialized=!0,this.isContinuousModeActive&&this.startLoop()}receivedWorkerMessage(t){const e=kt(t);if(e.type==="move"){const s=e.message;this.areItemsMoving=this.hasItemMoved(s),!this.areItemsMoving&&this.isLooping&&this.initialized&&this.isContinuousModeActive&&this.stopLoop()}this.updateListeners(e)}updateWorker(t,e){wt(this.worker,{type:t,message:e})}updateListeners({type:t,message:e}){t==="movestart"&&typeof this.onMoveStart=="function"&&this.onMoveStart(e),t==="move"&&typeof this.onMove=="function"&&(this.lastCirclePositions=e,this.onMove(e)),t==="moveend"&&typeof this.onMoveEnd=="function"&&this.onMoveEnd(e)}addCircles(t){if(Array.isArray(t)&&t.length){const e=t.filter(Mt);e.length&&this.updateWorker("addcircles",e)}this.startLoop()}addCircle(t){this.addCircles([t])}removeCircle(t){t&&(t.id?this.updateWorker("removecircle",t.id):this.updateWorker("removecircle",t),this.startLoop())}pinCircle(t){t&&(t.id?this.updateWorker("pincircle",t.id):this.updateWorker("pincircle",t),this.startLoop())}unpinCircle(t){t&&(t.id?this.updateWorker("unpincircle",t.id):this.updateWorker("unpincircle",t),this.startLoop())}setCircleRadius(t,e){t&&e>=0&&(t.id?this.updateWorker("circleradius",{id:t.id,radius:e}):this.updateWorker("circleradius",{id:t,radius:e}),this.startLoop())}setCircleCenterPull(t,e){t&&(t.id?this.updateWorker("circlecenterpull",{id:t.id,centerPull:!!e}):this.updateWorker("circlecenterpull",{id:t,centerPull:!!e}),this.startLoop())}setCenterPull(t){this.updateWorker("centerpull",{centerPull:!!t}),this.startLoop()}setBounds(t){_t(t)&&(this.updateWorker("bounds",t),this.startLoop())}setTarget(t){this.updateWorker("target",t),this.startLoop()}setCenteringPasses(t){this.updateWorker("centeringpasses",t)}setCollisionPasses(t){this.updateWorker("collisionpasses",t)}setDamping(t){this.updateWorker("damping",t)}update(){this.updateWorker("update")}dragStart(t){this.updateWorker("dragstart",{id:t}),this.startLoop()}drag(t,e){this.updateWorker("drag",{id:t,position:e}),this.startLoop()}dragEnd(t){this.updateWorker("dragend",{id:t}),this.startLoop()}updateLoop(){this.update(),this.isLooping&&(this.areItemsMoving?this.animationFrameId=requestAnimationFrame(this.updateLoop.bind(this)):this.stopLoop())}startLoop(){!this.isLooping&&this.initialized&&this.isContinuousModeActive&&(this.isLooping=!0,this.isContinuousModeActive&&(this.areItemsMoving=!0),this.updateListeners({type:"movestart"}),this.animationFrameId=requestAnimationFrame(this.updateLoop.bind(this)))}stopLoop(){this.isLooping&&(this.isLooping=!1,this.updateListeners({type:"moveend",message:this.lastCirclePositions}),cancelAnimationFrame(this.animationFrameId))}hasItemMoved(t){let e=!1;for(let s in t)(Math.abs(t[s].delta.x)>.005||Math.abs(t[s].delta.y)>.005)&&(e=!0);return e}destroy(){this.worker&&this.worker.terminate(),this.stopLoop(),this.onMove=null,this.onMoveStart=null,this.onMoveEnd=null}}function at(n,t,e){const s=n.slice();return s[12]=t[e],s[14]=e,s}function xt(n){let t,e=n[12].name+"",s,l,i,u,a,r,o,c=n[12].desc+"",h,p,v,m,d,M,L=n[12].langs.join(", ")+"",B,z,_,F,K,R,j,$=n[12].url+"",U,J,D,Y;return{c(){t=C("span"),s=I(e),l=w(),i=C("br"),u=w(),a=C("br"),r=w(),o=C("small"),h=I(c),p=w(),v=C("br"),m=w(),d=C("br"),M=I(`
            Built with: `),B=I(L),z=w(),_=C("br"),F=w(),K=C("br"),R=w(),j=C("a"),U=I($),this.h()},l(T){t=y(T,"SPAN",{class:!0});var A=N(t);s=O(A,e),l=k(A),i=y(A,"BR",{}),u=k(A),a=y(A,"BR",{}),r=k(A),o=y(A,"SMALL",{class:!0});var P=N(o);h=O(P,c),p=k(P),v=y(P,"BR",{}),m=k(P),d=y(P,"BR",{}),M=O(P,`
            Built with: `),B=O(P,L),z=k(P),_=y(P,"BR",{}),F=k(P),K=y(P,"BR",{}),R=k(P),j=y(P,"A",{href:!0,class:!0});var Z=N(j);U=O(Z,$),Z.forEach(b),P.forEach(b),A.forEach(b),this.h()},h(){f(j,"href",n[12].url),f(j,"class","svelte-f9qeuv"),f(o,"class","svelte-f9qeuv"),f(t,"class","svelte-f9qeuv")},m(T,A){E(T,t,A),g(t,s),g(t,l),g(t,i),g(t,u),g(t,a),g(t,r),g(t,o),g(o,h),g(o,p),g(o,v),g(o,m),g(o,d),g(o,M),g(o,B),g(o,z),g(o,_),g(o,F),g(o,K),g(o,R),g(o,j),g(j,U),Y=!0},p:Q,i(T){Y||(H(()=>{D&&D.end(1),J=ft(t,V,{delay:300,duration:200}),J.start()}),Y=!0)},o(T){J&&J.invalidate(),D=gt(t,V,{duration:100}),Y=!1},d(T){T&&b(t),T&&D&&D.end()}}}function Lt(n){let t,e=n[12].name+"",s,l,i,u;return{c(){t=C("span"),s=I(e),this.h()},l(a){t=y(a,"SPAN",{class:!0});var r=N(t);s=O(r,e),r.forEach(b),this.h()},h(){f(t,"class","svelte-f9qeuv")},m(a,r){E(a,t,r),g(t,s),u=!0},p:Q,i(a){u||(H(()=>{i&&i.end(1),l=ft(t,V,{delay:300,duration:200}),l.start()}),u=!0)},o(a){l&&l.invalidate(),i=gt(t,V,{duration:100}),u=!1},d(a){a&&b(t),a&&i&&i.end()}}}function lt(n){let t,e,s,l,i,u;const a=[Lt,xt],r=[];function o(h,p){return h[6].ind!==h[14]?0:1}e=o(n),s=r[e]=a[e](n);function c(...h){return n[9](n[14],n[12],...h)}return{c(){t=C("div"),s.c(),this.h()},l(h){t=y(h,"DIV",{class:!0});var p=N(t);s.l(p),p.forEach(b),this.h()},h(){f(t,"class","item svelte-f9qeuv"),q(t,"active",n[6].ind===n[14]),q(t,"faded",n[7]>-1&&n[14]!==n[7])},m(h,p){E(h,t,p),r[e].m(t,null),l=!0,i||(u=[tt(t,"click",c),tt(t,"keydown",Bt)],i=!0)},p(h,p){n=h;let v=e;e=o(n),e===v?r[e].p(n,p):(X(),W(r[v],1,1,()=>{r[v]=null}),G(),s=r[e],s?s.p(n,p):(s=r[e]=a[e](n),s.c()),x(s,1),s.m(t,null)),(!l||p&64)&&q(t,"active",n[6].ind===n[14]),(!l||p&128)&&q(t,"faded",n[7]>-1&&n[14]!==n[7])},i(h){l||(x(s),l=!0)},o(h){W(s),l=!1},d(h){h&&b(t),r[e].d(),i=!1,Ct(u)}}}function ct(n){let t,e,s,l;return{c(){t=C("img"),this.h()},l(i){t=y(i,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){f(t,"class","img svelte-f9qeuv"),et(t.src,e=n[4])||f(t,"src",e),f(t,"alt",n[5])},m(i,u){E(i,t,u),l=!0},p(i,u){(!l||u&16&&!et(t.src,e=i[4]))&&f(t,"src",e),(!l||u&32)&&f(t,"alt",i[5])},i(i){l||(H(()=>{s||(s=it(t,V,{duration:200},!0)),s.run(1)}),l=!0)},o(i){s||(s=it(t,V,{duration:200},!1)),s.run(0),l=!1},d(i){i&&b(t),i&&s&&s.end()}}}function St(n){let t,e,s,l=n[8],i=[];for(let r=0;r<l.length;r+=1)i[r]=lt(at(n,l,r));const u=r=>W(i[r],1,1,()=>{i[r]=null});let a=n[4]&&ct(n);return{c(){t=C("div");for(let r=0;r<i.length;r+=1)i[r].c();e=w(),a&&a.c(),this.h()},l(r){t=y(r,"DIV",{class:!0});var o=N(t);for(let c=0;c<i.length;c+=1)i[c].l(o);e=k(o),a&&a.l(o),o.forEach(b),this.h()},h(){f(t,"class","container svelte-f9qeuv"),q(t,"ready",n[3])},m(r,o){E(r,t,o);for(let c=0;c<i.length;c+=1)i[c].m(t,null);g(t,e),a&&a.m(t,null),n[10](t),s=!0},p(r,[o]){if(o&503){l=r[8];let c;for(c=0;c<l.length;c+=1){const h=at(r,l,c);i[c]?(i[c].p(h,o),x(i[c],1)):(i[c]=lt(h),i[c].c(),x(i[c],1),i[c].m(t,e))}for(X(),c=l.length;c<i.length;c+=1)u(c);G()}r[4]?a?(a.p(r,o),o&16&&x(a,1)):(a=ct(r),a.c(),x(a,1),a.m(t,null)):a&&(X(),W(a,1,1,()=>{a=null}),G()),(!s||o&8)&&q(t,"ready",r[3])},i(r){if(!s){for(let o=0;o<l.length;o+=1)x(i[o]);x(a),s=!0}},o(r){i=i.filter(Boolean);for(let o=0;o<i.length;o+=1)W(i[o]);W(a),s=!1},d(r){r&&b(t),mt(i,r),a&&a.d(),n[10](null)}}}const Bt=n=>{n.key==="Enter"&&n.target.click()};function Tt(n,t,e){const s=[{name:"tuibox",img:"https://raw.githubusercontent.com/Cubified/tuibox/main/demos/demo_colorslide.gif",url:"https://github.com/Cubified/tuibox",langs:["C"],desc:"A single-header terminal UI (TUI) library, capable of creating mouse-driven, interactive applications on the command line."},{name:"mode7",img:`${S}/mode7.gif`,url:"https://github.com/Cubified/mode7",langs:["JavaScript"],desc:"A pure-Javascript perspective transform (a la SNES Mode 7)."},{name:"Trulioo.com",img:`${S}/trulioo.png`,url:"https://www.trulioo.com",langs:["JavaScript","PHP"],desc:"Designed and implemented a custom 3D globe component from scratch using WebGL.  Also created all animations on site homepage with CSS and JS."},{name:"ntwm",img:"https://raw.githubusercontent.com/Cubified/ntwm/master/images/modes/grid.png",url:"https://github.com/Cubified/ntwm",langs:["C"],desc:"A tiny, frameless, keyboard-driven tiling window manager with multimonitor support."},{name:"lush",img:"https://github.com/Cubified/lush/raw/main/demo.gif",url:"https://github.com/Cubified/lush",langs:["x86 Assembly","C"],desc:"A tiny UNIX shell. Supports syntax highlighting and command ghosting/onion skin by default, built on top of a custom line editor written in Assembly."},{name:"Make-A-Wish Volunteer Hub",img:`${S}/maw.png`,url:"https://github.com/TritonSE/MAW-Volunteer-Hub",langs:["React.js","MongoDB"],desc:"A volunteer portal for the San Diego chapter of the Make-A-Wish Foundation, built as part of Triton Software Engineering."},{name:"Y-Stem and Chess",img:`${S}/ysc.png`,url:"https://github.com/TritonSE/YSC-Mobile-Application",langs:["TypeScript","React Native"],desc:"A real-time chess mobile application, built as part of Triton Software Engineering."},{name:"bdfedit",img:"https://github.com/Cubified/bdfedit/raw/main/demo.gif",url:"https://github.com/Cubified/bdfedit",langs:["C"],desc:"A terminal-based, mouse-driven BDF (bitmap) font editor."},{name:"term",img:"https://github.com/Cubified/term/raw/main/demo.gif",url:"https://github.com/Cubified/term",langs:["C"],desc:"A tiny VT-100 terminal emulator for Linux, built with Unicode and Truecolor support."},{name:"React Simple Scheduler",img:"https://github.com/cubified/react-simple-scheduler/raw/main/demo/demo.png",url:"https://github.com/Cubified/react-simple-scheduler",langs:["TypeScript","React","SASS"],desc:"Simple, extensible scheduler and calendar components for React, modeled after Google Calendar."},{name:"Softbody",img:"https://github.com/Cubified/softbody/raw/main/demo.png",url:"https://github.com/Cubified/softbody",langs:["JavaScript"],desc:"A simple soft body physics simulation for n-sided polygons."},{name:"FixNation Landing Page",img:`${S}/fix.png`,url:"https://landing.fixnation.org",langs:["JavaScript","Svelte"],desc:"A landing page for Los Angeles-based spay and neuter clinic FixNation."}],l=(d,M)=>Math.random()*(M-d)+d;let i,u,a,r=!1,o=null,c="";bt(()=>{let d={width:i.offsetWidth,height:i.offsetHeight};e(2,a=s.map(()=>({id:Math.random().toString(),radius:50,position:{x:l(-10,10)+d.width/2,y:l(-10,10)+d.height/2}})));const M=L=>{requestAnimationFrame(()=>{if(!i)return;let B=0;for(let z in L){const _=L[z],F=_.position.x-_.radius,K=_.position.y-_.radius,R=i.children[B++];R.style.width=_.radius*2+"px",R.style.height=_.radius*2+"px",R.style.transform=`translateX(${F}px) translateY(${K}px)`}})};e(1,u=new At({bounds:d,target:{x:d.width/2,y:d.height/2},circles:a,onMove:M,collisionPasses:3,centeringPasses:2})),window.addEventListener("resize",()=>{i&&(d={width:i.offsetWidth,height:i.offsetHeight},u.setBounds(d),h.ind===-1?u.setTarget({x:d.width/2,y:d.height/2}):u.setTarget({x:d.width/2,y:0}))}),e(3,r=!0)});let h={el:null,ind:-1},p=-1;const v=(d,M,L)=>{if(h.ind===d){L.target.classList.remove("active"),u.setCircleRadius(a[d],50),e(6,h={el:null,ind:-1}),e(4,o=null),e(5,c=""),e(7,p=-1);let B={width:i.offsetWidth,height:i.offsetHeight};u.setTarget({x:B.width/2,y:B.height/2})}else h.ind>-1&&(h.el.classList.remove("active"),u.setCircleRadius(a[h.ind],50)),L.target.classList.add("active"),u.setCircleRadius(a[d],150),e(6,h={el:L.target,ind:d}),e(4,o=null),e(5,c=""),setTimeout(()=>{e(4,o=M.img),e(5,c=M.name)},250),e(7,p=d),u.setTarget({x:i.offsetWidth/2,y:0})};function m(d){yt[d?"unshift":"push"](()=>{i=d,e(0,i)})}return[i,u,a,r,o,c,h,p,s,v,m]}class Wt extends dt{constructor(t){super(),ut(this,t,Tt,St,ht,{})}}function Rt(n){let t,e,s,l,i,u,a,r,o,c,h,p,v;return c=new Pt({}),p=new Wt({}),{c(){t=C("meta"),e=C("link"),s=C("link"),l=C("link"),i=C("link"),u=C("meta"),a=C("meta"),r=C("meta"),o=w(),nt(c.$$.fragment),h=w(),nt(p.$$.fragment),this.h()},l(m){const d=vt("svelte-1kj5t3e",document.head);t=y(d,"META",{charset:!0}),e=y(d,"LINK",{rel:!0,sizes:!0,href:!0}),s=y(d,"LINK",{rel:!0,type:!0,sizes:!0,href:!0}),l=y(d,"LINK",{rel:!0,type:!0,sizes:!0,href:!0}),i=y(d,"LINK",{rel:!0,href:!0}),u=y(d,"META",{name:!0,content:!0}),a=y(d,"META",{name:!0,content:!0}),r=y(d,"META",{name:!0,content:!0}),d.forEach(b),o=k(m),st(c.$$.fragment,m),h=k(m),st(p.$$.fragment,m),this.h()},h(){f(t,"charset","utf-8"),f(e,"rel","apple-touch-icon"),f(e,"sizes","180x180"),f(e,"href",S+"/apple-touch-icon.png"),f(s,"rel","icon"),f(s,"type","image/png"),f(s,"sizes","32x32"),f(s,"href",S+"/favicon-32x32.png"),f(l,"rel","icon"),f(l,"type","image/png"),f(l,"sizes","16x16"),f(l,"href",S+"/favicon-16x16.png"),f(i,"rel","manifest"),f(i,"href",S+"/site.webmanifest"),f(u,"name","viewport"),f(u,"content","width=device-width, initial-scale=1"),f(a,"name","apple-mobile-web-app-capable"),f(a,"content","yes"),f(r,"name","description"),f(r,"content","A personal portfolio site for UC San Diego computer science student Andrew Russell."),document.title="Andrew Russell - Projects"},m(m,d){g(document.head,t),g(document.head,e),g(document.head,s),g(document.head,l),g(document.head,i),g(document.head,u),g(document.head,a),g(document.head,r),E(m,o,d),rt(c,m,d),E(m,h,d),rt(p,m,d),v=!0},p:Q,i(m){v||(x(c.$$.fragment,m),x(p.$$.fragment,m),v=!0)},o(m){W(c.$$.fragment,m),W(p.$$.fragment,m),v=!1},d(m){b(t),b(e),b(s),b(l),b(i),b(u),b(a),b(r),m&&b(o),ot(c,m),m&&b(h),ot(p,m)}}}class Ot extends dt{constructor(t){super(),ut(this,t,null,Rt,ht,{})}}export{Ot as default};
