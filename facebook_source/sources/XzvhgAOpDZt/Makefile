NODE:=node
#BEAUTIFY:=cat
BEAUTIFY:=js-beautify --type "javascript" -f
MODULES:=copyProperties Env eprintf ex erx wrapFunction ErrorUtils CallbackDependencyManager EventSubscription EmitterSubscription invariant EventSubscriptionVendor emptyFunction EventEmitter EventEmitterWithHolding EventHolder asyncCallback toArray createArrayFrom Arbiter ArbiterMixin legacy.ArbiterMixin $$ CSSCore CSS legacy.css ge legacy.dom-core Parent legacy.parent CurrentUser Miny QueryString OnloadEvent Run UserAgent DTSG repeatString BitMap replaceTransportMarkers ServerJSDefine URIRFC3986 createObjectFrom URISchemes URIBase PHPQuerySerializer getAsyncParams getSameOriginTransport setTimeoutAcrossTransitions BanzaiAdapter FBJSON WebStorage pageID WebStorageMutex isInIframe Banzai isEmpty CSSLoader Bootloader ix ScriptPath ServerJS legacy.emptyFunction BlueBarController legacy.arbiter event-form-bubbling legacy.onload wait_for_load markJSEnabled JSCC PageletSet invokeCallbacks BigPipe legacy.bootloader legacy.constructor-cache goURI legacy.goURI InitialJSLoader lowerDomain legacy.object-core-utils PlaceholderListener clickRefAction trackReferrer userAction Primer URLFragmentPrelude SidebarPrelude cx LitestandSidebarPrelude SubmitOnEnterListener CommentPrelude legacy.ufi-comment-prelude-js ScriptMonitor
output:=$(addsuffix .js, $(MODULES))

all:$(output)

%.js:%.min
	@$(BEAUTIFY) '$<' -o '$@'
	@echo "replace var name" "$@"
	@$(NODE) "../../var.js" '$@'

%.min:
	$(NODE) "../../unpack.js" "../../compressed/XzvhgAOpDZt.js"

.PHONY:all
