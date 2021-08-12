pipeline {
  agent { node { label 'master' } }
  environment {
        NEXUS_CRED = credentials('1986c778-eba7-44d7-b6f6-71e73906d894')
  }
  tools {
    nodejs 'localNodeJS'
  }
  stages {

    stage('Install') {
      steps {
        bitbucketStatusNotify(buildState: 'INPROGRESS')
        echo 'Installing dependencies'
        sh 'npm install'
      }
    }

    stage('Tests NAE') {
      parallel {
        stage('Unit Test') {
          steps {
            echo 'Starting unit tests of netgrif-application-engine'
            sh 'npm run ng test netgrif-application-engine'
          }
        }

        stage('Lint') {
          steps {
            echo 'Starting ts-lint of netgrif-application-engine'
            sh 'npm run ng lint netgrif-application-engine'
          }
        }
      }
    }

    stage('Build NAE') {
      steps {
        echo 'Starting building NAE library'
        sh 'npm run nae:build'
      }
    }

    stage('NAE Local install') {
        steps {
            echo 'Installing NAE for local pipeline use'
            sh 'npm i dist/netgrif-application-engine --save-optional'
        }
    }

    stage('Test NC') {
        parallel {
            stage('Unit Test') {
                steps {
                    echo 'Starting unit tests of netgrif-components'
                    sh 'npm run ng test netgrif-components'
                }
            }
            stage('Lint') {
                steps {
                    echo 'Starting ts-lint of netgrif-components'
                    sh 'npm run ng lint netgrif-components'
                }
            }
        }
    }

    stage('Build NC') {
        steps {
            echo 'Starting building NAE library'
            sh 'npm run nc:build'
        }
    }

    stage('NC Local install') {
        steps {
            echo 'Installing NAE for local pipeline use'
            sh 'npm i dist/netgrif-components --save-optional'
        }
    }

    stage('SonarCloud') {
        steps {
            echo 'Sent to SonarCloud analysis'
            sh 'npm run project:sonar'
        }
    }

    stage('Doc') {
        parallel {
            stage('Doc NAE') {
                steps {
                    echo 'Generating documentation'
                    sh 'npm run nae:doc'
                }
            }
            stage('Doc NC') {
                steps {
                    echo 'Generating documentation'
                    sh 'npm run nc:doc'
                }
            }
        }
    }

    stage('Publish NAE') {
        steps {
            sh '''
                echo "npm publishing"
                mv .npmrc .npmrc_renamed
                echo "registry=https://nexus.netgrif.com/repository/npm-private/" > .npmrc
                echo "email=jenkins@netgrif.com" >> .npmrc
                echo -n "_auth=" >> .npmrc
                echo -n $NEXUS_CRED | openssl base64 >> .npmrc
                cat .npmrc
                npm publish dist/netgrif-application-engine
                rm .npmrc
                mv .npmrc_renamed .npmrc
            '''
        }
    }

    stage('Publish NC') {
        steps {
            sh '''
                echo "npm publishing"
                mv .npmrc .npmrc_renamed
                echo "registry=https://nexus.netgrif.com/repository/npm-private/" > .npmrc
                echo "email=jenkins@netgrif.com" >> .npmrc
                echo -n "_auth=" >> .npmrc
                echo -n $NEXUS_CRED | openssl base64 >> .npmrc
                cat .npmrc
                npm publish dist/netgrif-components
                rm .npmrc
                mv .npmrc_renamed .npmrc
            '''
        }
    }

    stage('Publish NAE docs') {
        steps {
            script {
                packageJson = readJSON(file: 'package.json')
            }
            echo 'Uploading NAE documentation via sshPublisher'
            sshPublisher(
                publishers: [
                    sshPublisherDesc(
                        configName: 'developer.netgrif.com',
                        transfers: [
                            sshTransfer(
                                cleanRemote: true,
                                excludes: '',
                                execCommand: '',
                                execTimeout: 120000,
                                flatten: false,
                                makeEmptyDirs: false,
                                noDefaultExcludes: false,
                                patternSeparator: '[, ]+',
                                remoteDirectory: "/var/www/html/developer/projects/engine-frontend/${packageJson['version']}/nae/docs",
                                remoteDirectorySDF: false,
                                removePrefix: 'docs/netgrif-application-engine',
                                sourceFiles: 'docs/netgrif-application-engine/**')],
                        usePromotionTimestamp: false,
                        useWorkspaceInPromotion: false,
                        verbose: true)])
        }
    }

    stage('Publish NC docs') {
        steps {
            script {
                packageJson = readJSON(file: 'package.json')
            }
            echo 'Uploading NC documentation via sshPublisher'
            sshPublisher(
                publishers: [
                    sshPublisherDesc(
                        configName: 'developer.netgrif.com',
                        transfers: [
                            sshTransfer(
                                cleanRemote: true,
                                excludes: '',
                                execCommand: '',
                                execTimeout: 120000,
                                flatten: false,
                                makeEmptyDirs: false,
                                noDefaultExcludes: false,
                                patternSeparator: '[, ]+',
                                remoteDirectory: "/var/www/html/developer/projects/engine-frontend/${packageJson['version']}/nc/docs",
                                remoteDirectorySDF: false,
                                removePrefix: 'docs/netgrif-components',
                                sourceFiles: 'docs/netgrif-components/**')],
                        usePromotionTimestamp: false,
                        useWorkspaceInPromotion: false,
                        verbose: true)])
        }
    }

    stage('Publish NAE test reports') {
        steps {
            script {
                packageJson = readJSON(file: 'package.json')
            }
            echo 'Uploading NAE test reports via sshPublisher'
            sshPublisher(
                publishers: [
                    sshPublisherDesc(
                        configName: 'developer.netgrif.com',
                        transfers: [
                            sshTransfer(
                                cleanRemote: true,
                                excludes: '',
                                execCommand: '',
                                execTimeout: 120000,
                                flatten: false,
                                makeEmptyDirs: false,
                                noDefaultExcludes: false,
                                patternSeparator: '[, ]+',
                                remoteDirectory: "/var/www/html/developer/projects/engine-frontend/${packageJson['version']}/nae/coverage",
                                remoteDirectorySDF: false,
                                removePrefix: 'coverage/netgrif-application-engine',
                                sourceFiles: 'coverage/netgrif-application-engine/**')],
                        usePromotionTimestamp: false,
                        useWorkspaceInPromotion: false,
                        verbose: true)])
        }
    }

    stage('Publish NC test reports') {
        steps {
            script {
                packageJson = readJSON(file: 'package.json')
            }
            echo 'Uploading NC test reports via sshPublisher'
            sshPublisher(
                publishers: [
                    sshPublisherDesc(
                        configName: 'developer.netgrif.com',
                        transfers: [
                            sshTransfer(
                                cleanRemote: true,
                                excludes: '',
                                execCommand: '',
                                execTimeout: 120000,
                                flatten: false,
                                makeEmptyDirs: false,
                                noDefaultExcludes: false,
                                patternSeparator: '[, ]+',
                                remoteDirectory: "/var/www/html/developer/projects/engine-frontend/${packageJson['version']}/nc/coverage",
                                remoteDirectorySDF: false,
                                removePrefix: 'coverage/netgrif-components',
                                sourceFiles: 'coverage/netgrif-components/**')],
                        usePromotionTimestamp: false,
                        useWorkspaceInPromotion: false,
                        verbose: true)])
        }
    }

     stage('Build Examples') {
        steps {
            script {
                packageJson = readJSON(file: 'package.json')
            }
            sh "npm run example:build -- --base-href=/projects/engine-frontend/${packageJson['version']}/examples/"

        }
     }

     stage('Publish Examples') {
        steps {
            script {
                packageJson = readJSON(file: 'package.json')
            }
            sshPublisher(
                publishers: [
                    sshPublisherDesc(
                        configName: 'developer.netgrif.com',
                        transfers: [
                            sshTransfer(
                                cleanRemote: true,
                                excludes: '',
                                execCommand: '',
                                execTimeout: 120000,
                                flatten: false,
                                makeEmptyDirs: false,
                                noDefaultExcludes: false,
                                patternSeparator: '[, ]+',
                                remoteDirectory: "/var/www/html/developer/projects/engine-frontend/${packageJson['version']}/examples",
                                remoteDirectorySDF: false,
                                removePrefix: 'dist/nae-example-app',
                                sourceFiles: 'dist/nae-example-app/**')],
                        usePromotionTimestamp: false,
                        useWorkspaceInPromotion: false,
                        verbose: true)])
        }
     }
  }

  post {
    always {
        //slackSend channel: '#ops-room',
        //          color: 'good',
        //          message: "The pipeline ${currentBuild.fullDisplayName} completed successfully."

        junit 'coverage/netgrif-application-engine/JUNITX-test-report.xml'
        junit 'coverage/netgrif-components/JUNITX-test-report.xml'
    }

    success {
        bitbucketStatusNotify(buildState: 'SUCCESSFUL')
        script {
            DATETIME_TAG = java.time.LocalDateTime.now().toString().replace(':','_')
        }
        sh '''
            mkdir dist/netgrif
            cp -r dist/netgrif-application-engine dist/netgrif/
            cp -r dist/netgrif-components dist/netgrif/
        '''
        zip zipFile: "NETGRIF-Application_Engine-${packageJson['version']}-Frontend-${DATETIME_TAG}.zip", archive: false, dir: 'dist/netgrif'
        archiveArtifacts artifacts:"NETGRIF-Application_Engine-${packageJson['version']}-Frontend-${DATETIME_TAG}.zip", fingerprint: true
        // archiveArtifacts artifacts: 'dist/netgrif-application-engine/nae-frontend-dist.zip', fingerprint: true
    }

    unstable {
        bitbucketStatusNotify(buildState: 'SUCCESSFUL')
    }

    failure {
        bitbucketStatusNotify(buildState: 'FAILED')
    }
  }
}
