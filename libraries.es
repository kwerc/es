#!/usr/local/bin/es

# es library search path support. This will allow users to share
# libraries globally on a system.

enable-import = 'yes'

fn dprint msg {
	if {~ $#debugging 0} {
		return 0
	} {
		echo 'debug: '^$msg
		return 0
	}
}

fn import-core-lib lib {
	dprint 'import-core-lib exec''d'
	let(libname = <={access -n $lib -1 -r $corelib}) {
		if {! ~ $#libname 0} {
			dprint 'loading '^$corelib^$lib
			. $corelib^$lib
			return 0
		} {
			return 1
		}
	}
}

fn import-user-lib lib {
	dprint 'import-user-lib-exec''d'
	if {~ $#libraries 0} {
		dprint '$libraries not set'
		return 1
	}
	catch @ e {
		return 1
	} {
		let (libname = <={access -n $lib -1 -r $libraries}){
			if {~ $#libname 0} { throw error }
			. $libname
			return 0
		}
	}
}

fn import lib {
	if {~ $#enable-import 0} {
		panic 'import' 'import is not enabled'
		return 1
	}
	if {! ~ <={import-user-lib $lib} 0} {
		dprint 'no userlib named '^$lib
		if {! ~ <={import-core-lib $lib} 0} {
			panic 'import' $lib^' not found'
			return 1
		}
	}
	return 0
}
